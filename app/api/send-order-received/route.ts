import { NextResponse } from "next/server";
import { sendOrderReceivedMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const order = await request.json();

    await sendOrderReceivedMail(order);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Mail gönderilemedi.",
      },
      {
        status: 500,
      }
    );
  }
}