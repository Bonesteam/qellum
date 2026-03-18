import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generateInvoicePDF(order: any) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();

    const left = 40;
    let y = height - 60;

    page.drawText("INVOICE", {
        x: left,
        y,
        size: 24,
        font,
        color: rgb(0, 0, 0),
    });

    y -= 36;
    page.drawText(`Invoice ID: ${order._id}`, { x: left, y, size: 10, font });
    y -= 18;
    page.drawText(`Date: ${new Date().toISOString().slice(0, 10)}`, { x: left, y, size: 10, font });
    y -= 18;
    page.drawText(`Billed to: ${order.email || "-"}`, { x: left, y, size: 10, font });
    y -= 24;

    page.drawText("Order details:", { x: left, y, size: 12, font });
    y -= 18;

    const lines = [
        `Category: ${order.category || "-"}`,
        `Full name: ${order.fields?.fullName || "-"}`,
        `Plan type: ${order.planType || "-"}`,
        `Tokens charged: ${order.totalTokens || 0}`,
    ];

    for (const l of lines) {
        page.drawText(l, { x: left + 8, y, size: 10, font });
        y -= 16;
    }

    y -= 12;
    page.drawText("Thank you for your order.", { x: left, y, size: 10, font });

    const pdfBytes = await pdfDoc.save();
    const base64 = Buffer.from(pdfBytes).toString("base64");
    return base64;
}

export default generateInvoicePDF;
