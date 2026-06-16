export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#031B4E] via-[#020B1F] to-black px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-10">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
          İptal, İade ve Değişim Politikası
        </h1>

        <div className="space-y-7 text-[15px] leading-8 text-gray-300 md:text-base">
          <p>
            NOCTIS olarak müşteri memnuniyetini ön planda tutuyoruz. 6502
            sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli
            Sözleşmeler Yönetmeliği kapsamında aşağıdaki şartlar uygulanır.
          </p>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              1. Cayma Hakkı
            </h2>
            <p>
              Tüketiciler, satın aldıkları ürünü teslim aldıkları tarihten
              itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin
              iade etme hakkına sahiptir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              2. İade Şartları
            </h2>
            <p>İade edilecek ürünün aşağıdaki şartları taşıması gerekir:</p>

            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Kullanılmamış ve yıkanmamış olması,</li>
              <li>Tekrar satışa uygun durumda olması,</li>
              <li>Orijinal ambalajı ve etiketleriyle gönderilmesi,</li>
              <li>
                Siparişle birlikte gönderilen promosyon veya hediyeler varsa
                eksiksiz şekilde iade edilmesi.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              3. İade Süreci
            </h2>
            <p>
              Cayma hakkının kullanıldığına ilişkin bildirimin tarafımıza
              ulaşmasından sonra ürün, 10 gün içerisinde tarafımıza
              gönderilmelidir. Ürün tarafımıza ulaştıktan sonra gerekli
              kontroller yapılır.
            </p>

            <p className="mt-2">
              İade şartlarına uygun ürünlerin bedeli, yasal süre içerisinde
              ödeme yapılan yöntem kullanılarak müşteriye iade edilir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              4. İade Kargo Ücreti
            </h2>
            <p>
              Yasal cayma hakkı kapsamında gerçekleştirilen iadelerde iade
              kargo ücreti NOCTIS tarafından karşılanır. Ayıplı, hatalı veya
              yanlış gönderilen ürünlerde tüm iade ve değişim kargo masrafları
              NOCTIS’e aittir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              5. Değişim İşlemleri
            </h2>
            <p>
              Beden değişimi talepleri, ürün teslim tarihinden itibaren 14 gün
              içerisinde yapılabilir. Değişim talep edilen ürünün kullanılmamış,
              yıkanmamış ve tekrar satışa uygun durumda olması gerekir.
            </p>

            <p className="mt-2">
              Talep edilen beden veya ürün stokta mevcutsa değişim yapılır.
              Stok bulunmaması halinde ürün bedeli müşteriye iade edilir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              6. Cayma Hakkının Kullanılamayacağı Durumlar
            </h2>
            <p>Aşağıdaki ürünlerde cayma hakkı kullanılamaz:</p>

            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Müşterinin özel isteği doğrultusunda hazırlanan ürünler,</li>
              <li>
                Kişiye özel baskı, isim veya özel tasarım ile üretilen ürünler,
              </li>
              <li>
                Hijyen açısından tekrar satışı uygun olmayan ve koruyucu
                unsurları açılmış ürünler,
              </li>
              <li>
                Mevzuatta cayma hakkı istisnası olarak belirtilen diğer ürün ve
                hizmetler.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              7. İletişim
            </h2>
            <p>
              İade ve değişim talepleriniz için bizimle aşağıdaki iletişim
              kanallarından iletişime geçebilirsiniz:
            </p>

            <p className="mt-2">
              E-posta: noctiswear.tr@gmail.com
              <br />
              Telefon: [Telefon numarası]
              <br />
              Adres: [Şirket adresi]
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}