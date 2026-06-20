import { ENV } from "@/backend/config/env";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Qellum";
const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || COMPANY_NAME;
const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || ENV.EMAIL_FROM;

function baseTemplate(title: string, preview: string, content: string) {
    return `
    <div style="margin:0;padding:32px 16px;background:#f4f7f5;font-family:Arial,sans-serif;color:#1a2f22;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #d2dfd6;border-radius:24px;overflow:hidden;">
        <div style="padding:28px 32px;background:linear-gradient(135deg,#e8f0eb 0%,#f6faf8 100%);border-bottom:1px solid #d2dfd6;">
          <div style="font-size:14px;letter-spacing:0.18em;text-transform:uppercase;color:#3a6047;font-weight:700;">${COMPANY_NAME}</div>
          <h1 style="margin:14px 0 0;font-size:30px;line-height:1.2;color:#1a2f22;">${title}</h1>
          <p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:#506658;">${preview}</p>
        </div>
        <div style="padding:32px;">
          ${content}
          <div style="margin-top:32px;">
            <a href="${ENV.APP_URL}/dashboard" style="display:inline-block;padding:14px 22px;background:#2e5a3c;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:700;">Open dashboard</a>
          </div>
        </div>
        <div style="padding:20px 32px;border-top:1px solid #d2dfd6;background:#f2f6f3;font-size:13px;line-height:1.7;color:#6b7e71;">
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
            "Your account is ready. You can now sign in, manage your profile and top up your wallet.",
            `
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">
              Your account has been created successfully. You can now access your dashboard, manage your profile and top up your wallet when needed.
            </p>
            <p style="margin:0;font-size:16px;line-height:1.8;">
              If you did not create this account, please reply to this email immediately.
            </p>
          `
        ),
    };
}

export function buildPasswordResetEmail(firstName: string, resetUrl: string) {
    const safeName = firstName || "there";

    return {
        subject: `${COMPANY_NAME} password reset`,
        text: `Hi ${safeName}, reset your password using this link (valid for 1 hour): ${resetUrl}`,
        html: baseTemplate(
            "Reset your password",
            "Use the button below to choose a new password. This link expires in 1 hour.",
            `
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">
              We received a request to reset your password. If you did not request this, you can ignore this email.
            </p>
            <a href="${resetUrl}" style="display:inline-block;padding:14px 22px;background:#2e5a3c;color:#ffffff;text-decoration:none;border-radius:999px;font-weight:700;">Reset password</a>
          `
        ),
    };
}

export function buildWalletTopUpEmail(input: {
    firstName: string;
    amountGBP: number;
    balanceAfterGBP: number;
    chargedAmount?: number | null;
    chargedCurrency?: string | null;
    referenceId?: string | null;
    invoiceNumber: string;
}) {
    const safeName = input.firstName || "there";
    const amountLine =
        typeof input.chargedAmount === "number" && input.chargedCurrency
            ? `${input.chargedAmount.toFixed(2)} ${input.chargedCurrency}`
            : `${input.amountGBP.toFixed(2)} GBP`;

    return {
        subject: `${COMPANY_NAME} wallet top-up receipt`,
        text: `Hi ${safeName}, your wallet top-up was confirmed. Amount: ${amountLine}. Balance: £${input.balanceAfterGBP.toFixed(2)}. Invoice: ${input.invoiceNumber}.`,
        html: baseTemplate(
            "Wallet top-up confirmed",
            "Your wallet has been credited successfully. The invoice PDF is attached to this email.",
            `
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">
              We have confirmed your payment and credited your wallet.
            </p>
            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Invoice</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${input.invoiceNumber}</td>
              </tr>
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Charged</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${amountLine}</td>
              </tr>
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Balance after top-up</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">£${input.balanceAfterGBP.toFixed(2)}</td>
              </tr>
              ${input.referenceId ? `
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Reference</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${input.referenceId}</td>
              </tr>` : ""}
            </table>
          `
        ),
    };
}

/** @deprecated Use buildWalletTopUpEmail */
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
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Invoice</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${input.invoiceNumber}</td>
              </tr>
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Charged</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${amountLine}</td>
              </tr>
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Balance after purchase</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${input.balanceAfter} tokens</td>
              </tr>
              ${input.referenceId ? `
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Reference</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${input.referenceId}</td>
              </tr>` : ""}
            </table>
          `
        ),
    };
}

export function buildOrderConfirmationEmail(firstName: string, planName: string, amount: string, invoiceNumber: string) {
    const safeName = firstName || "there";
    return {
        subject: `${COMPANY_NAME} — Order Confirmation`,
        text: `Hi ${safeName}, your order for ${planName} was confirmed. Amount: ${amount}. Invoice: ${invoiceNumber}.`,
        html: baseTemplate(
            `Order Confirmed`,
            `Thank you for choosing ${COMPANY_NAME}. We are preparing your personalized plan.`,
            `
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">
              Your order for <strong>${planName}</strong> has been received and confirmed.
            </p>
            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Plan</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${planName}</td>
              </tr>
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Invoice ID</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${invoiceNumber}</td>
              </tr>
              <tr>
                <td style="padding:12px;border:1px solid #dae3db;color:#4a5f51;">Price</td>
                <td style="padding:12px;border:1px solid #dae3db;color:#1a2f22;font-weight:700;">${amount}</td>
              </tr>
            </table>
            <p style="margin:20px 0 0;font-size:16px;line-height:1.8;">
              If you ordered a Chef-reviewed plan, one of our certified culinary experts will begin crafting your meal plan shortly. You'll receive an email as soon as it's ready.
            </p>
            `
        ),
    };
}

export function buildChefAssignedEmail(firstName: string, chefName: string) {
    const safeName = firstName || "there";
    return {
        subject: `${COMPANY_NAME} — Chef Assigned`,
        text: `Hi ${safeName}, Chef ${chefName} has been assigned to your meal plan!`,
        html: baseTemplate(
            `Chef Assigned`,
            `Your personalized meal plan is in expert hands.`,
            `
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">Hi ${safeName},</p>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.8;">
              We are excited to let you know that <strong>Chef ${chefName}</strong> has been assigned to create and review your personalized meal plan.
            </p>
            <p style="margin:0;font-size:16px;line-height:1.8;">
              Chef ${chefName} will review your preferences and craft a custom plan designed to meet your specific dietary goals, allergies, and tastes. We will email you once the plan is fully ready.
            </p>
            `
        ),
    };
}

