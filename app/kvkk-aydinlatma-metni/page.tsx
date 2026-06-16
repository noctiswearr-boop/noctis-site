export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#031B4E] via-[#020B1F] to-black px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-10">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
          KVKK Aydınlatma Metni
        </h1>

        <div className="space-y-7 text-[15px] leading-8 text-gray-300 md:text-base">

          <p>
            NOCTIS olarak, müşterilerimizin kişisel verilerinin güvenliğine
            önem veriyoruz. İşbu Aydınlatma Metni, 6698 sayılı Kişisel
            Verilerin Korunması Kanunu ("KVKK") kapsamında kişisel
            verilerinizin işlenmesine ilişkin sizleri bilgilendirmek amacıyla
            hazırlanmıştır.
          </p>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              1. Veri Sorumlusu
            </h2>

            <p>
              KVKK kapsamında veri sorumlusu NOCTIS'tir.
            </p>

            <p className="mt-2">
              E-posta: noctiswear.tr@gmail.com
              <br />
              Telefon: [Telefon Numaranız]
              <br />
              Adres: [Şirket Adresiniz]
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              2. İşlenen Kişisel Veriler
            </h2>

            <p>
              İnternet sitemiz üzerinden aşağıdaki kişisel verileriniz
              işlenebilmektedir:
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Ad ve soyad bilgisi,</li>
              <li>E-posta adresi,</li>
              <li>Telefon numarası,</li>
              <li>Teslimat ve fatura adresi,</li>
              <li>Sipariş bilgileri,</li>
              <li>Ödeme işlemine ilişkin bilgiler.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              3. Kişisel Verilerin İşlenme Amaçları
            </h2>

            <p>
              Toplanan kişisel veriler aşağıdaki amaçlarla işlenmektedir:
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Sipariş süreçlerinin yürütülmesi,</li>
              <li>Ürünlerin teslim edilmesi,</li>
              <li>Müşteri destek hizmetlerinin sağlanması,</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi,</li>
              <li>İade ve değişim işlemlerinin yürütülmesi,</li>
              <li>Talep ve şikayetlerin değerlendirilmesi.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              4. Kişisel Verilerin Aktarılması
            </h2>

            <p>
              Kişisel verileriniz, yasal yükümlülükler kapsamında yetkili
              kamu kurum ve kuruluşlarına; sipariş süreçlerinin yürütülmesi
              amacıyla kargo firmalarına ve ödeme hizmet sağlayıcılarına
              aktarılabilmektedir.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              5. Kişisel Veri Sahibinin Hakları
            </h2>

            <p>
              KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>İşlenme amacını öğrenme,</li>
              <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme,</li>
              <li>Kişisel verilerin silinmesini veya yok edilmesini talep etme,</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız halinde tazminat talep etme.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-white">
              6. Başvuru Yöntemi
            </h2>

            <p>
              KVKK kapsamındaki taleplerinizi aşağıdaki iletişim kanallarından
              NOCTIS'e iletebilirsiniz:
            </p>

            <p className="mt-2">
              E-posta: noctiswear.tr@gmail.com
              <br />
              Telefon: [Telefon Numaranız]
              <br />
              Adres: [Şirket Adresiniz]
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}