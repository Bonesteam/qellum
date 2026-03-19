import { ENV } from "@/backend/config/env";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Qellum";
const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || COMPANY_NAME;
const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || ENV.EMAIL_FROM;

function baseTemplate(title: string, preview: string, content: string) {
    return `
    <div style="margin:0;padding:32px 16px;background:#fff7ef;font-family:Arial,sans-serif;color:#4b342c;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #f2dcc6;border-radius:24px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#fff1e2 0%,#fff8f1 100%);border-bottom:1px solid #f4dfcd;">
          <div style="font-size:14px;letter-spacing:0.18em;text-transform:uppercase;color:#c3875f;font-weight:700;">${COMPANY_NAME}</div>
          <h1 style="margin:14px 0 0;font-size:30px;line-height:1.2;color:#4b342c;">${title}</h1>
          <p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:#7c6357;">${preview}</p>
        </div>
        <div style="padding:32px;">
          ${content}
          <div style="margin-top:32px;">
            <a href="${ENV.APP_URL}/dashboard" style="display:inline-block;padding:14px 22px;background:#ec7331;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:700;">Open dashboard</a>
          </div>
        </div>
        <div style="padding:20px 32px;border-top:1px solid #f4dfcd;background:#fffaf5;font-size:13px;line-height:1.7;color:#8b6c5d;">
          <div>${COMPANY_LEGAL_NAME}</div>
          <div>${COMPANY_EMAIL}</div>
        </div>
      </div>
    </div>
  `;
}

export function buildWelcomeEmail(firstName: string) {
    const safeName = firstName || "there";

    return {
        subject: `Welcome to ${COMPANY_NAME}`,
        text: `Hi ${safeName}, welcome to ${COMPANY_NAME}. Your account is active and you can now sign in and start using your dashboard.`,
        html: baseTemplate(
            `Welcome to ${COMPANY_NAME}`,
            "Your account is ready. You can now sign in, manage your profile and start using tokens.",
            `
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">
              Your account has been created successfully. You can now access your dashboard, manage your profile and purchase tokens when needed.
            </p>
            <p style="margin:0;font-size:16px;line-height:1.8;">
              If you did not create this account, please reply to this email immediately.
            </p>
          `
        ),
    };
}

export function buildTokenPurchaseEmail(input: {
    firstName: string;
    tokens: number;
    balanceAfter: number;
    chargedAmount?: number | null;
    chargedCurrency?: string | null;
    referenceId?: string | null;
    invoiceNumber: string;
}) {
    const safeName = input.firstName || "there";
    const amountLine =
        typeof input.chargedAmount === "number" && input.chargedCurrency
            ? `${input.chargedAmount.toFixed(2)} ${input.chargedCurrency}`
            : "confirmed by payment provider";

    return {
        subject: `${COMPANY_NAME} purchase receipt`,
        text: `Hi ${safeName}, your purchase was confirmed. ${input.tokens} tokens were credited. Current balance: ${input.balanceAfter}. Invoice: ${input.invoiceNumber}.`,
        html: baseTemplate(
            "Payment confirmed",
            "Your token purchase was completed successfully. The invoice PDF is attached to this email.",
            `
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">
              We have confirmed your payment and credited <strong>${input.tokens} tokens</strong> to your account.
            </p>
            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
              <tr>
                <td style="padding:12px;border:1px solid #f1dfcf;color:#8b6c5d;">Invoice</td>
                <td style="padding:12px;border:1px solid #f1dfcf;color:#4b342c;font-weight:700;">${input.invoiceNumber}</td>
              </tr>
              <tr>
                <td style="padding:12px;border:1px solid #f1dfcf;color:#8b6c5d;">Charged</td>
                <td style="padding:12px;border:1px solid #f1dfcf;color:#4b342c;font-weight:700;">${amountLine}</td>
              </tr>
              <tr>
                <td style="padding:12px;border:1px solid #f1dfcf;color:#8b6c5d;">Balance after purchase</td>
                <td style="padding:12px;border:1px solid #f1dfcf;color:#4b342c;font-weight:700;">${input.balanceAfter} tokens</td>
              </tr>
              ${input.referenceId ? `
              <tr>
                <td style="padding:12px;border:1px solid #f1dfcf;color:#8b6c5d;">Reference</td>
                <td style="padding:12px;border:1px solid #f1dfcf;color:#4b342c;font-weight:700;">${input.referenceId}</td>
              </tr>` : ""}
            </table>
          `
        ),
    };
}
