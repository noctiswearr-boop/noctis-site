import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatPrice(price: number) {
  return `${Number(price || 0).toLocaleString("tr-TR")} TL`;
}

export async function sendOrderReceivedMail(order: any) {
  if (!order?.email) return;

  const itemsHtml = Array.isArray(order.items)
    ? order.items
        .map(
          (item: any) => `
          <tr>
            <td>${item.name || item.title || "Ürün"}</td>
            <td>${item.size || "-"}</td>
            <td>${item.quantity || 1}</td>
            <td>${formatPrice((item.price || 0) * (item.quantity || 1))}</td>
          </tr>
        `
        )
        .join("")
    : "";

  await resend.emails.send({
    from: process.env.NOCTIS_FROM_EMAIL || "NOCTIS <onboarding@resend.dev>",
    to: order.email,
    subject: "NOCTIS Siparişiniz Alındı",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111;">
        <h1>NOCTIS</h1>
        <h2>Siparişiniz alındı</h2>

        <p>Merhaba ${order.full_name || order.name || "NOCTIS müşterisi"},</p>

        <p>Siparişiniz başarıyla alınmıştır. Ürününüz hazırlanmaya başlanacaktır.</p>

        <p><b>Sipariş No:</b> #${order.id}</p>

        <h3>Sipariş Detayları</h3>

        <table width="100%" cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;">
          <thead>
            <tr>
              <th align="left">Ürün</th>
              <th align="left">Beden</th>
              <th align="left">Adet</th>
              <th align="left">Tutar</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p><b>Toplam:</b> ${formatPrice(order.total_price)}</p>

        <h3>Teslimat Adresi</h3>
        <p>${order.address || "-"}</p>

        <p>Kargo bilgileri ayrıca mail ile iletilecektir.</p>

        <p>Destek için: ${process.env.NOCTIS_SUPPORT_EMAIL}</p>

        <p>Teşekkürler,<br/><b>NOCTIS</b></p>
      </div>
    `,
  });
}

export async function sendOrderShippedMail(order: any) {
  if (!order?.email) return;

  await resend.emails.send({
    from: process.env.NOCTIS_FROM_EMAIL || "NOCTIS <onboarding@resend.dev>",
    to: order.email,
    subject: "NOCTIS Siparişiniz Kargoya Verildi",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111;">
        <h1>NOCTIS</h1>
        <h2>Siparişiniz kargoya verildi</h2>

        <p>Merhaba ${order.full_name || order.name || "NOCTIS müşterisi"},</p>

        <p>#${order.id} numaralı siparişiniz kargoya teslim edilmiştir.</p>

        <p><b>Kargo Firması:</b> ${order.cargo_company || "-"}</p>
        <p><b>Takip Numarası:</b> ${order.tracking_number || "-"}</p>

        ${
          order.tracking_link
            ? `<p><a href="${order.tracking_link}" target="_blank">Kargonuzu takip edin</a></p>`
            : ""
        }

        <p>Destek için: ${process.env.NOCTIS_SUPPORT_EMAIL}</p>

        <p>NOCTIS'i tercih ettiğiniz için teşekkür ederiz.</p>

        <p>Sevgiler,<br/><b>NOCTIS</b></p>
      </div>
    `,
  });
}