import { NextRequest, NextResponse } from "next/server";
import { COMPANY } from "@/lib/data";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, course, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Name, email, and message are required",
                },
                { status: 400 },
            );
        }

        // Validate email shape early (prevents nodemailer envelope failures)
        if (!email.includes("@")) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Please provide a valid email address.",
                },
                { status: 400 },
            );
        }

        const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
      .header { background: linear-gradient(135deg, #0066cc 0%, #004999 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
      .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
      .field:last-child { border-bottom: none; }
      .label { font-weight: bold; color: #0066cc; display: block; margin-bottom: 5px; }
      .value { color: #333; }
      .message-box { background: #f0f7ff; border-left: 4px solid #0066cc; padding: 15px; margin-top: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Contact Form Submission</h2>
      </div>
      <div class="content">
        <div class="field">
          <span class="label">Name:</span>
          <span class="value">${name}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value"><a href="mailto:${email}">${email}</a></span>
        </div>
        ${
            phone
                ? `
        <div class="field">
          <span class="label">Phone:</span>
          <span class="value"><a href="tel:${phone}">${phone}</a></span>
        </div>
        `
                : ""
        }
        ${
            course
                ? `
        <div class="field">
          <span class="label">Course Interested In:</span>
          <span class="value">${course}</span>
        </div>
        `
                : ""
        }
        <div class="field">
          <span class="label">Message:</span>
          <div class="message-box">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
        <p style="margin-top: 20px; color: #666; font-size: 14px;">
          <strong>Tip:</strong> You can reply directly to this email to respond to ${name}.
        </p>
      </div>
    </div>
  </body>
</html>
`;

        const to = COMPANY.email; // info@safecertskillsltd.co.uk

        // SMTP sending only (no Resend)
        // Configure SMTP in .env.local:
        // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, optionally SMTP_FROM_EMAIL or FROM_EMAIL
        const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL, FROM_EMAIL } = process.env;

        const missing: string[] = [];
        if (!SMTP_HOST) missing.push("SMTP_HOST");
        if (!SMTP_PORT) missing.push("SMTP_PORT");
        if (!SMTP_USER) missing.push("SMTP_USER");
        if (!SMTP_PASS) missing.push("SMTP_PASS");

        if (missing.length) {
            console.warn("Contact form SMTP not configured. Missing:", missing);
            return NextResponse.json(
                {
                    success: false,
                    error: "Contact form email sending is not configured on the server (SMTP missing).",
                },
                { status: 500 },
            );
        }

        const port = Number(SMTP_PORT);
        if (!Number.isFinite(port) || port <= 0) {
            console.warn("Invalid SMTP_PORT:", SMTP_PORT);
            return NextResponse.json(
                {
                    success: false,
                    error: "Server misconfiguration: invalid SMTP_PORT.",
                },
                { status: 500 },
            );
        }

        const nodemailer = await import("nodemailer");

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port,
            secure: port === 465,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        const fromAddress = SMTP_FROM_EMAIL || FROM_EMAIL || "noreply@safecertskillsltd.co.uk";
        const fromName = "SafeCert Skills";
        const fromHeader = `${fromName} <${fromAddress}>`;

        // Basic sender validation: prevents nodemailer from failing with bad envelope
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Please provide a valid email address.",
                },
                { status: 400 },
            );
        }

        await transporter.sendMail({
            from: fromHeader,
            to,
            subject: `New Contact Form Submission from ${name}`,
            html,
            replyTo: email,
        });

        return NextResponse.json({
            success: true,
            message: "Contact form submitted successfully",
        });
    } catch (error) {
        console.error("Error processing contact form:", error);

        // Return a sanitized error message for debugging.
        const message = error instanceof Error ? error.message : String(error);

        return NextResponse.json(
            {
                error: "Internal server error",
                debug: message,
            },
            { status: 500 },
        );
    }
}
