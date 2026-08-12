import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsQueryDto } from "./dtos/analytics-query.dto";

/**
 * Module 21 — analytics export.
 *
 * CSV is generated here as pure string output (no dependencies). PDF export
 * is intentionally a placeholder: the project has no PDF rendering library
 * installed, and adding a heavy dependency just for export is out of scope.
 * Wire a renderer (e.g. pdfkit / @react-pdf/renderer) into `exportPdf` once
 * one is approved.
 */
@Injectable()
export class AnalyticsExportService {
  constructor(private readonly analytics: AnalyticsService) {}

  /**
   * Flatten a nested analytics payload into CSV-safe rows. Nested objects are
   * JSON-encoded into their cell so no data is lost in export.
   */
  async exportCsv(dto: AnalyticsQueryDto): Promise<{
    filename: string;
    mimeType: string;
    content: string;
  }> {
    const overview = await this.analytics.getOverview(dto);
    const jobs = await this.analytics.getJobsAnalytics(dto);
    const revenue = await this.analytics.getRevenueAnalytics(dto);

    const rows: Record<string, unknown>[] = [
      this.flatten("overview", overview),
      this.flatten("jobs", jobs),
      this.flatten("revenue", revenue),
    ];

    return {
      filename: `ghar-sewa-analytics-${new Date().toISOString().slice(0, 10)}.csv`,
      mimeType: "text/csv",
      content: this.toCsv(rows),
    };
  }

  /**
   * PDF export placeholder — reports clearly what is missing rather than
   * pretending to work.
   */
  exportPdf(): never {
    throw new ServiceUnavailableException(
      "PDF export is not available yet. Install a PDF rendering library " +
        "(e.g. pdfkit) and wire it into AnalyticsExportService.exportPdf() " +
        "to enable this endpoint.",
    );
  }

  // ─── CSV helpers ─────────────────────────────────────────────────────

  private flatten(prefix: string, data: unknown): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    const isPlainObject = (v: unknown): v is Record<string, unknown> =>
      v !== null &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      !(v instanceof Date) &&
      typeof (v as { toNumber?: unknown }).toNumber !== "function";

    const walk = (obj: Record<string, unknown>, path: string) => {
      for (const [key, value] of Object.entries(obj)) {
        const next = path ? `${path}.${key}` : key;
        if (isPlainObject(value)) {
          walk(value, next);
        } else {
          out[`${prefix}.${next}`] = this.stringifyValue(value);
        }
      }
    };
    walk(data as Record<string, unknown>, "");
    return out;
  }

  /** Dates → ISO, value objects (Prisma Decimal) → number, others kept. */
  private stringifyValue(value: unknown): unknown {
    if (value === null || value === undefined) return "";
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "object") {
      const withToNumber = value as { toNumber?: () => number };
      if (typeof withToNumber.toNumber === "function") {
        return withToNumber.toNumber();
      }
      return JSON.stringify(value);
    }
    return value;
  }

  private toCsv(rows: Record<string, unknown>[]): string {
    if (rows.length === 0) return "";
    const headers = Array.from(
      new Set(rows.flatMap((row) => Object.keys(row))),
    );
    const escape = (value: unknown): string => {
      if (value === null || value === undefined) return "";
      let str: string;
      if (typeof value === "object") {
        str = JSON.stringify(value);
      } else if (typeof value === "string") {
        str = value;
      } else if (
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "bigint"
      ) {
        str = value.toString();
      } else {
        str = "";
      }
      return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };
    const lines = [
      headers.join(","),
      ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
    ];
    return lines.join("\n");
  }
}
