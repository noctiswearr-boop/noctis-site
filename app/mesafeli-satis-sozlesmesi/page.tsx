export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#031B4E] via-[#020B1F] to-black px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-10">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Mesafeli Satış Sözleşmesi
        </h1>

        <div className="space-y-7 text-[15px] leading-8 text-gray-300 md:text-base">

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              1. Taraflar
            </h2>
            <p>
              İşbu sözleşme, aşağıda bilgileri bulunan satıcı ile
              www.noctiswear.com üzerinden sipariş veren alıcı arasında
              elektronik ortamda kurulmuştur.
            </p>

            <p className="mt-2">
              Satıcı: NOCTIS
              <br />
              E-posta: noctiswear.tr@gmail.com
              <br />
              Telefon: [Telefon Numarası]
              <br />
              Adres: [Şirket Adresi]
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              2. Konu
            </h2>

            <p>
              İşbu sözleşmenin konusu, alıcının satıcıya ait internet
              sitesi üzerinden elektronik ortamda sipariş verdiği ürünün
              satışı ve teslimine ilişkin tarafların hak ve yükümlülüklerinin
              belirlenmesidir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              3. Ürün ve Ödeme Bilgileri
            </h2>

            <p>
              Ürün türü, miktarı, satış bedeli, ödeme şekli ve teslimat
              bilgileri sipariş sırasında alıcı tarafından onaylanan
              sipariş özetinde belirtildiği şekildedir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              4. Teslimat
            </h2>

            <p>
              Ürünler, stok durumuna bağlı olarak yasal süreler içerisinde
              alıcının sipariş sırasında belirttiği teslimat adresine
              gönderilir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              5. Cayma Hakkı
            </h2>

            <p>
              Alıcı, ürünü teslim aldığı tarihten itibaren 14 gün içerisinde
              herhangi bir gerekçe göstermeksizin cayma hakkını kullanabilir.
            </p>

            <p className="mt-2">
              Cayma hakkına ilişkin detaylar "İptal, İade ve Değişim
              Politikası" sayfasında belirtilmiştir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              6. Cayma Hakkı İstisnaları
            </h2>

            <p>
              Tüketicinin özel istekleri doğrultusunda hazırlanan veya
              kişiye özel hale getirilen ürünlerde cayma hakkı
              kullanılamaz.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              7. Uyuşmazlıkların Çözümü
            </h2>

            <p>
              İşbu sözleşmeden doğabilecek uyuşmazlıklarda, Ticaret
              Bakanlığı tarafından ilan edilen parasal sınırlar dahilinde
              tüketici hakem heyetleri ve tüketici mahkemeleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              8. Yürürlük
            </h2>

            <p>
              Alıcı, internet sitesi üzerinden siparişini tamamlayarak
              işbu sözleşmenin tüm koşullarını okuyup kabul ettiğini beyan
              etmiş sayılır.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}