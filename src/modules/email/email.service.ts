import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

/**
 * Transactional email delivery backed by Resend (https://resend.com).
 *
 * Resend is initialized lazily from `RESEND_API_KEY`. If the key is missing
 * the service degrades gracefully — emails are logged as `[EMAIL-STUB]`
 * instead of sent — so the app keeps working in development before email
 * credentials are provisioned. Callers treat every method as fire-and-forget.
 */
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend | null = null;
  private readonly from: string;
  private readonly frontendUrl: string;

  constructor(private readonly config: ConfigService) {
    this.from =
      this.config.get<string>("EMAIL_FROM") ||
      "Ghar Sewa <onboarding@resend.dev>";
    this.frontendUrl =
      this.config.get<string>("FRONTEND_URL") || "http://localhost:3000";

    const apiKey = this.config.get<string>("RESEND_API_KEY");
    if (apiKey) {
      this.resend = new Resend(apiKey);
    } else {
      this.logger.warn(
        "Resend not configured (RESEND_API_KEY missing). " +
          "Emails will be logged as [EMAIL-STUB] without a real send.",
      );
    }
  }

  /**
   * Core send. Never throws — delivery problems are logged so the request
   * flow (signup, reset request, ...) is never blocked by email hiccups.
   */
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    if (!this.resend) {
      this.logger.log(
        `[EMAIL-STUB] to=${to} subject="${subject}"`,
        EmailService.name,
      );
      return;
    }

    const { error } = await this.resend.emails.send({
      from: this.from,
      to,
      subject,
      html,
    });

    if (error) {
      this.logger.error(
        `Email send failed (${to}, ${subject}): ${error.message}`,
        EmailService.name,
      );
      return;
    }

    this.logger.log(`Email sent to ${to} — ${subject}`, EmailService.name);
  }

  async sendWelcomeEmail(to: string, fullName: string): Promise<void> {
    const firstName = fullName.split(" ")[0] || fullName;
    await this.sendEmail(
      to,
      "Welcome to Ghar Sewa! 🎉",
      this.layout(
        `Hello ${this.escapeHtml(firstName)},`,
        `
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
          Your Ghar Sewa account is ready. Post a job and find trusted,
          verified service providers near you — or start your own service
          business and grow with us.
        </p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#374151;">
          Assalam-o-Alaikum! We're glad to have you on board.
        </p>
        <a href="${this.frontendUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:8px;">
          Explore Ghar Sewa
        </a>
        `,
      ),
    );
  }

  async sendEmailVerificationEmail(
    to: string,
    fullName: string,
    token: string,
  ): Promise<void> {
    const firstName = fullName.split(" ")[0] || fullName;
    const verifyLink = `${this.frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;
    await this.sendEmail(
      to,
      "Verify your email address — Ghar Sewa",
      this.layout(
        `Hi ${this.escapeHtml(firstName)},`,
        `
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
          Thanks for signing up with Google. Please confirm your email address
          to finish securing your account.
        </p>
        <a href="${verifyLink}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:8px;">
          Verify my email
        </a>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#6b7280;">
          This link expires in 24 hours. If you didn't sign up for Ghar Sewa,
          you can safely ignore this email.
        </p>
        `,
      ),
    );
  }

  async sendPasswordResetEmail(
    to: string,
    fullName: string,
    token: string,
  ): Promise<void> {
    const firstName = fullName.split(" ")[0] || fullName;
    const resetLink = `${this.frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;
    await this.sendEmail(
      to,
      "Reset your password — Ghar Sewa",
      this.layout(
        `Hi ${this.escapeHtml(firstName)},`,
        `
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
          We received a request to reset your Ghar Sewa password. Click the
          button below to choose a new one.
        </p>
        <a href="${resetLink}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:8px;">
          Reset my password
        </a>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#6b7280;">
          This link expires in 1 hour. If you didn't request a reset, you can
          safely ignore this email — your password stays unchanged.
        </p>
        `,
      ),
    );
  }

  /**
   * Sent when someone requests a password reset for an account that has no
   * password (registered via Google).
   */
  async sendPasswordNotSetEmail(to: string, fullName: string): Promise<void> {
    const firstName = fullName.split(" ")[0] || fullName;
    await this.sendEmail(
      to,
      "Password reset request — Ghar Sewa",
      this.layout(
        `Hi ${this.escapeHtml(firstName)},`,
        `
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
          You asked to reset your Ghar Sewa password, but your account was
          created with <strong>Sign in with Google</strong> and doesn't use a
          password.
        </p>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;">
          Just use the Google sign-in button the next time you log in. No
          action is needed.
        </p>
        `,
      ),
    );
  }

  // ─── Template helpers ────────────────────────────────────────────────

  /** Shared email shell: brand header, content block, footer. */
  private layout(heading: string, bodyHtml: string): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
          <div style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <div style="background:#4f46e5;padding:24px 32px;">
              <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.3px;">🏠 Ghar Sewa</span>
            </div>
            <div style="padding:32px;">
              <h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#111827;">${heading}</h1>
              ${bodyHtml}
            </div>
          </div>
          <p style="margin:24px 0 0;text-align:center;font-size:12px;line-height:1.5;color:#9ca3af;">
            You are receiving this email because you have an account with Ghar Sewa.<br/>
            If you have questions, contact our support team.
          </p>
        </div>
      </body>
    </html>
    `;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}
