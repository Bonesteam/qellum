import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "Qellum";
const COMPANY_LEGAL_NAME = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME || COMPANY_NAME;
const COMPANY_ADDRESS = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "";
const COMPANY_EMAIL = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "";

export async function generateTokenInvoicePDF(input: {
    invoiceNumber: string;
    createdAt: Date;
    customerName: string;
    customerEmail: string;
    tokens: number;
    chargedAmount?: number | null;
    chargedCurrency?: string | null;
    balanceAfter: number;
    referenceId?: string | null;
}) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const left = 48;
    let y = 780;

    page.drawText(COMPANY_NAME, {
        x: left,
        y,
        size: 26,
        font: bold,
        color: rgb(0.29, 0.2, 0.17),
    });

    y -= 34;
    page.drawText(`Invoice ${input.invoiceNumber}`, {
        x: left,
        y,
        size: 18,
        font: bold,
        color: rgb(0.41, 0.29, 0.22),
    });

    y -= 26;
    page.drawText(`Issue date: ${input.createdAt.toISOString().slice(0, 10)}`, {
        x: left,
        y,
        size: 11,
        font,
        color: rgb(0.45, 0.36, 0.32),
    });

    y -= 18;
    page.drawText(`Seller: ${COMPANY_LEGAL_NAME}`, {
        x: left,
        y,
        size: 11,
        font,
        color: rgb(0.45, 0.36, 0.32),
    });

    if (COMPANY_ADDRESS) {
        y -= 18;
        page.drawText(`Address: ${COMPANY_ADDRESS}`, {
            x: left,
            y,
            size: 11,
            font,
            color: rgb(0.45, 0.36, 0.32),
            maxWidth: 500,
        });
    }

    if (COMPANY_EMAIL) {
        y -= 18;
        page.drawText(`Email: ${COMPANY_EMAIL}`, {
            x: left,
            y,
            size: 11,
            font,
            color: rgb(0.45, 0.36, 0.32),
        });
    }

    y -= 42;
    page.drawText("Bill to", {
        x: left,
        y,
        size: 14,
        font: bold,
        color: rgb(0.29, 0.2, 0.17),
    });

    y -= 20;
    page.drawText(input.customerName || "-", {
        x: left,
        y,
        size: 11,
        font,
        color: rgb(0.29, 0.2, 0.17),
    });

    y -= 18;
    page.drawText(input.customerEmail, {
        x: left,
        y,
        size: 11,
        font,
        color: rgb(0.45, 0.36, 0.32),
    });

    y -= 50;
    page.drawRectangle({
        x: left,
        y: y - 12,
        width: 500,
        height: 28,
        color: rgb(0.98, 0.95, 0.91),
    });

    page.drawText("Description", { x: left + 12, y, size: 11, font: bold, color: rgb(0.29, 0.2, 0.17) });
    page.drawText("Amount", { x: 420, y, size: 11, font: bold, color: rgb(0.29, 0.2, 0.17) });

    y -= 34;
    page.drawText(`${input.tokens} Qellum tokens`, {
        x: left + 12,
        y,
        size: 11,
        font,
        color: rgb(0.29, 0.2, 0.17),
    });

    page.drawText(
        typeof input.chargedAmount === "number" && input.chargedCurrency
            ? `${input.chargedAmount.toFixed(2)} ${input.chargedCurrency}`
            : "Paid",
        {
            x: 420,
            y,
            size: 11,
            font,
            color: rgb(0.29, 0.2, 0.17),
        }
    );

    y -= 46;
    page.drawText(`Balance after purchase: ${input.balanceAfter} tokens`, {
        x: left,
        y,
        size: 12,
        font: bold,
        color: rgb(0.29, 0.2, 0.17),
    });

    if (input.referenceId) {
        y -= 20;
        page.drawText(`Payment reference: ${input.referenceId}`, {
            x: left,
            y,
            size: 11,
            font,
            color: rgb(0.45, 0.36, 0.32),
        });
    }

    y -= 36;
    page.drawText("Thank you for your purchase.", {
        x: left,
        y,
        size: 11,
        font,
        color: rgb(0.45, 0.36, 0.32),
    });

    return Buffer.from(await pdfDoc.save()).toString("base64");
}
