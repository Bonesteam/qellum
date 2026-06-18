import { Resend } from "resend";
import { ENV } from "@/backend/config/env";

const resend = new Resend(ENV.RESEND_API);

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachments?: Array<{ filename: string; type?: string; data: string }>
) {
  try {
    const payload: any = {
      from: ENV.EMAIL_FROM,
      to,
      subject,
      text: text || "",
      html: html || defaultTemplate(subject, text),
    };

    if (attachments && attachments.length > 0) {
      // Resend expects each attachment to have either `content` (base64) or `path`.
      payload.attachments = attachments.map((a) => {
        const raw = a.data || "";
        const content = String(raw).replace(/^data:.*;base64,/, "");
        const out: any = { filename: a.filename, content };
        if (a.type) out.type = a.type;
        return out;
      });
    }

    const response = await resend.emails.send(payload);

    console.log("✅ Email sent via Resend:", response);
    return response;
  } catch (error) {
    console.error("❌ Resend email failed:", error);
    throw error;
  }
}

function defaultTemplate(title: string, message: string) {
    const company = process.env.NEXT_PUBLIC_COMPANY_NAME || "Qellum";
    return `
    <div style="font-family: Arial, sans-serif; background:#f4f9f4; padding:20px; color:#1e2b1a;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
        <h2 style="color:#2D5A27; text-align:center;">${title}</h2>
        <p style="font-size:16px; line-height:1.6; color:#1e2b1a;">
          ${message}
        </p>
        <div style="text-align:center; margin:30px 0;">
          <a href="${ENV.APP_URL}/dashboard" 
             style="background:#2D5A27; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold;">
             Go to Dashboard
          </a>
        </div>
        <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />
        <p style="font-size:14px; color:#777; text-align:center;">
          © ${new Date().getFullYear()} ${company} – All rights reserved.
        </p>
      </div>
    </div>
  `;
}
