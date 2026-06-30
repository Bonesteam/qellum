/**
 * src/backend/utils/emailTemplates.ts — ПОВНИЙ ФАЙЛ
 *
 * Включає ВСІ функції які використовуються в коді:
 * - buildWelcomeEmail         (auth.service.ts)
 * - buildPasswordResetEmail   (auth.service.ts)
 * - buildWalletTopUpEmail     (user.controller.ts) ← БУЛ ВІДСУТНІЙ — додано
 * - buildOrderConfirmationEmail (загальне використання)
 */

const BRAND_GREEN  = "#1B4332";
const BRAND_TERRA  = "#C25E3A";
const BRAND_BG     = "#FAF8F5";
const COMPANY      = process.env.NEXT_PUBLIC_COMPANY_NAME || "Qellum";
const LEGAL_NAME   = "RISEWYNN LIMITED";
const COMPANY_NO   = "15799659";
const ADDRESS      = "Academy House, 11 Dunraven Place, Bridgend, CF31 1JF, UK";
const SITE_URL     = process.env.APP_URL || "https://qellum.co.uk";

function baseHtml(title: string, body: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND_BG};font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND_BG};padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="background:#fff;border-radius:4px;overflow:hidden;max-width:600px;width:100%;border:1px solid #E4DDD6;">

        <!-- Header -->
        <tr>
          <td style="background:${BRAND_GREEN};padding:24px 40px;">
            <p style="margin:0;font-size:20px;font-weight:900;color:#fff;letter-spacing:-0.02em;">${COMPANY}</p>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:36px 40px;">${body}</td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F0EDE8;padding:18px 40px;border-top:1px solid #E4DDD6;">
            <p style="margin:0;font-size:11px;color:#7A8A82;line-height:1.7;">
              © ${new Date().getFullYear()} ${LEGAL_NAME} &nbsp;·&nbsp; Company no. ${COMPANY_NO}<br/>
              ${ADDRESS}<br/>
              <a href="${SITE_URL}/privacy-policy" style="color:${BRAND_GREEN};">Privacy Policy</a> &nbsp;·&nbsp;
              <a href="${SITE_URL}/terms-and-conditions" style="color:${BRAND_GREEN};">Terms &amp; Conditions</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(text: string, href: string, bg = BRAND_GREEN): string {
    return `<a href="${href}"
       style="display:inline-block;background:${bg};color:#fff;
              padding:12px 26px;border-radius:4px;font-weight:700;
              font-size:14px;text-decoration:none;margin-top:20px;"
    >${text}</a>`;
}

function h1(text: string): string {
    return `<h1 style="margin:0 0 14px;font-size:24px;font-weight:900;
                       color:#1A1F1C;letter-spacing:-0.02em;">${text}</h1>`;
}

function p(text: string, muted = false): string {
    return `<p style="margin:0 0 12px;font-size:14px;
                      color:${muted ? "#7A8A82" : "#3D4D45"};line-height:1.7;">${text}</p>`;
}

function tableRow(label: string, value: string): string {
    return `<tr>
      <td style="padding:8px 0;font-size:12px;color:#7A8A82;font-weight:700;
                 text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #E4DDD6;
                 width:40%;">${label}</td>
      <td style="padding:8px 0;font-size:13px;color:#1A1F1C;font-weight:600;
                 border-bottom:1px solid #E4DDD6;text-align:right;">${value}</td>
    </tr>`;
}

// ─── Welcome ─────────────────────────────────────────────────────────────────

export function buildWelcomeEmail(firstName: string) {
    const subject = `Welcome to ${COMPANY}, ${firstName}!`;
    const text = `Hi ${firstName},\n\nWelcome to ${COMPANY}! Your account has been successfully created.\n\nYou can now top up your balance and start exploring personalised meal plans from our certified chefs and AI assistant.\n\nLog in: ${SITE_URL}/sign-in\n\nBest,\nThe ${COMPANY} Team`;
    const html = baseHtml(subject, `
        ${h1(`Welcome, ${firstName}!`)}
        ${p("Your account has been successfully created. You can now top up your balance and start exploring personalised meal plans from our certified chefs and AI assistant.")}
        ${p("Accepted payment methods: Visa, Mastercard.", true)}
        ${btn("Go to Dashboard", `${SITE_URL}/dashboard`)}
    `);
    return { subject, text, html };
}

// ─── Password Reset ───────────────────────────────────────────────────────────

export function buildPasswordResetEmail(firstName: string, resetUrl: string) {
    const subject = `${COMPANY} — Reset Your Password`;
    const text = `Hi ${firstName},\n\nWe received a request to reset your password.\n\nReset link (valid 1 hour): ${resetUrl}\n\nIf you did not request this, ignore this email.\n\nBest,\nThe ${COMPANY} Team`;
    const html = baseHtml(subject, `
        ${h1("Password Reset Request")}
        ${p(`Hi ${firstName},`)}
        ${p("We received a request to reset the password for your account. Click the button below — the link is valid for <strong>1 hour</strong>.")}
        ${btn("Reset Password", resetUrl)}
        ${p('<span style="font-size:12px;">If you did not request this, you can safely ignore this email.</span>', true)}
    `);
    return { subject, text, html };
}

// ─── Wallet Top-Up (використовується в user.controller.ts) ───────────────────

export interface WalletTopUpEmailData {
    firstName: string;
    amountGBP: number;
    balanceAfterGBP: number;
    chargedAmount?: number | null;
    chargedCurrency?: string | null;
    referenceId?: string | null;
    invoiceNumber?: string | null;
}

export function buildWalletTopUpEmail(data: WalletTopUpEmailData) {
    const sign   = data.chargedCurrency === "EUR" ? "€" : "£";
    const charged = data.chargedAmount != null
        ? `${sign}${Number(data.chargedAmount).toFixed(2)} ${data.chargedCurrency || "GBP"}`
        : `£${data.amountGBP.toFixed(2)} GBP`;

    const subject = `${COMPANY} — Balance Topped Up${data.invoiceNumber ? ` · ${data.invoiceNumber}` : ""}`;

    const text = `Hi ${data.firstName},\n\nYour balance has been topped up.\n\nCharged: ${charged}\nNew balance: £${data.balanceAfterGBP.toFixed(2)}\n${data.referenceId ? `Reference: ${data.referenceId}\n` : ""}${data.invoiceNumber ? `Invoice: ${data.invoiceNumber}\n` : ""}\nA PDF invoice is attached.\n\nBest,\nThe ${COMPANY} Team`;

    const rows = [
        data.invoiceNumber ? tableRow("Invoice", data.invoiceNumber) : "",
        tableRow("Charged", charged),
        tableRow("New Balance", `£${data.balanceAfterGBP.toFixed(2)} GBP`),
        data.referenceId ? tableRow("Reference", data.referenceId) : "",
        tableRow("Date", new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })),
    ].filter(Boolean).join("");

    const html = baseHtml(subject, `
        ${h1("Balance Topped Up")}
        ${p(`Hi ${data.firstName}, your Qellum balance has been successfully credited.`)}
        <table style="width:100%;border-collapse:collapse;margin:16px 0 20px;">${rows}</table>
        ${p("A PDF invoice is attached to this email for your records.", true)}
        ${btn("Go to Dashboard", `${SITE_URL}/dashboard`)}
    `);

    return { subject, text, html };
}

// ─── Order Confirmation ───────────────────────────────────────────────────────

export interface OrderEmailData {
    firstName: string;
    referenceId: string;
    amount: number;
    currency: "GBP" | "EUR";
    date?: string;
    pdfBuffer?: Buffer;
}

export function buildOrderConfirmationEmail(data: OrderEmailData) {
    const sign    = data.currency === "GBP" ? "£" : "€";
    const dateStr = data.date || new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    const subject = `${COMPANY} — Payment Confirmed #${data.referenceId}`;
    const text = `Hi ${data.firstName},\n\nPayment of ${sign}${data.amount.toFixed(2)} confirmed.\nReference: ${data.referenceId}\nDate: ${dateStr}\n\nPDF invoice attached.\n\nThank you,\nThe ${COMPANY} Team`;
    const html = baseHtml(subject, `
        ${h1("Payment Confirmed")}
        ${p(`Hi ${data.firstName}, your payment has been successfully processed.`)}
        <table style="width:100%;border-collapse:collapse;margin:16px 0 20px;">
            ${tableRow("Reference", data.referenceId)}
            ${tableRow("Date", dateStr)}
            ${tableRow("Amount", `<strong style="font-size:18px;color:${BRAND_GREEN};">${sign}${data.amount.toFixed(2)}</strong>`)}
        </table>
        ${p("A PDF invoice is attached to this email.", true)}
        ${btn("View Dashboard", `${SITE_URL}/dashboard`)}
    `);
    return { subject, text, html };
}