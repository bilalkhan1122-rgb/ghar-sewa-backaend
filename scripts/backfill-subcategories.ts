/**
 * Adds the sub-types to categories that already exist.
 *
 *   npx ts-node scripts/backfill-subcategories.ts
 *   npx ts-node scripts/backfill-subcategories.ts --dry-run
 *
 * `prisma/seed.ts` also loads these, but it is not the tool for a database that
 * already has real data: it creates admin, customer and provider accounts with
 * published passwords. This script touches nothing but `service_subcategories`.
 *
 * Safe to re-run. Categories are matched by slug, and a sub-type whose slug is
 * already present under its parent is left exactly as it is — so renames,
 * reordering and hidden sub-types done from the dashboard survive. Categories
 * added by an admin and not in the catalogue are skipped rather than guessed at.
 *
 * Point DATABASE_URL at the right database before running, e.g.
 *   set -a && . ./.env.migrate && set +a && npx ts-node scripts/backfill-subcategories.ts
 */
import { PrismaClient } from "../generated/prisma/client";
import { SERVICE_CATALOGUE } from "../prisma/service-catalogue";

const prisma = new PrismaClient();

/** The rule the API applies when an admin types a name, so slugs match. */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/-+/g, "-");
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  const categories = await prisma.serviceCategory.findMany({
    select: { id: true, name: true, slug: true },
  });
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

  let created = 0;
  let skipped = 0;
  const missingCategories: string[] = [];

  for (const entry of SERVICE_CATALOGUE) {
    const category = categoryBySlug.get(entry.slug);
    if (!category) {
      missingCategories.push(entry.slug);
      continue;
    }

    const existing = await prisma.serviceSubcategory.findMany({
      where: { categoryId: category.id },
      select: { slug: true },
    });
    const existingSlugs = new Set(existing.map((s) => s.slug));

    // Positions continue after whatever is already there, so a backfill onto a
    // category an admin has already populated appends rather than interleaves.
    let nextOrder = existing.length;

    for (const name of entry.subcategories) {
      const slug = slugify(name);
      if (existingSlugs.has(slug)) {
        skipped++;
        continue;
      }

      nextOrder++;
      created++;
      console.log(
        `  ${dryRun ? "would add" : "adding"}  ${category.name} / ${name}`,
      );

      if (!dryRun) {
        await prisma.serviceSubcategory.create({
          data: {
            categoryId: category.id,
            name,
            slug,
            displayOrder: nextOrder,
            isActive: true,
          },
        });
      }
    }
  }

  console.log(
    `\n${dryRun ? "Would create" : "Created"} ${created} subcategor${created === 1 ? "y" : "ies"}; ` +
      `${skipped} already present.`,
  );

  if (missingCategories.length > 0) {
    console.log(
      `\nNot in this database, so skipped: ${missingCategories.join(", ")}`,
    );
  }

  if (dryRun) {
    console.log("\nDry run — nothing was written.");
  }
}

main()
  .catch((error) => {
    console.error(
      `\n${error instanceof Error ? error.message : String(error)}`,
    );
    process.exitCode = 1;
  })
  .finally(() => void prisma.$disconnect());
