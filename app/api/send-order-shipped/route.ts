import { NextResponse } from "next/server";
import { sendOrderShippedMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const order = await request.json();

    await sendOrderShippedMail(order);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Kargo maili gönderme hatası:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Kargo maili gönderilemedi.",
      },
      {
        status: 500,
      }
    );
  }
}