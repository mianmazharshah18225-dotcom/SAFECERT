import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL, FROM_EMAIL } = process.env;

    const missing: string[] = [];
    if (!SMTP_HOST) missing.push("SMTP_HOST");
    if (!SMTP_PORT) missing.push("SMTP_PORT");
    if (!SMTP_USER) missing.push("SMTP_USER");
    if (!SMTP_PASS) missing.push("SMTP_PASS");

    if (missing.length) {
        return NextResponse.json(
            {
                ok: false,
                missing,
            },
            { status: 500 },
        );
    }

    // Do not actually send mail here—just confirm config is present.
    return NextResponse.json({
        ok: true,
        fromHeader: `${"SafeCert Skills"} <${SMTP_FROM_EMAIL || FROM_EMAIL || ""}>`,
        smtp: {
            host: SMTP_HOST,
            port: SMTP_PORT ? Number(SMTP_PORT) : null,
            user: SMTP_USER,
        },
    });
}
