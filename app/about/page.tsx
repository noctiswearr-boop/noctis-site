import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#061326] to-black px-8 py-10 text-white">
      <Link href="/" className="text-sm tracking-[0.25em] text-blue-200">
        ← ANA SAYFA
      </Link>

      <section className="mx-auto max-w-4xl py-24">
        <p className="mb-5 text-xs uppercase tracking-[0.45em] text-blue-200">
          Hakkımızda
        </p>

        <h1 className="font-serif text-5xl tracking-[0.35em] md:text-7xl">
          NOCTIS
        </h1>

        <p className="mt-4 text-sm uppercase tracking-[0.35em] text-gray-400">
          EST. 2026
        </p>

        <div className="mt-14 space-y-7 text-lg leading-9 text-gray-300">
          <p>
            NOCTIS, zamansız tasarımı ve sade estetiği bir araya getiren
            modern bir giyim markasıdır.
          </p>

          <p>
            Günlük yaşamın temposundan ilham alırken, geçici trendlerin
            ötesinde kalabilen parçalar üretmeyi hedefler. Her koleksiyon;
            sadelik, işlevsellik ve detaylara verilen özen etrafında
            şekillenir.
          </p>

          <p>
            Bizim için giyim, yalnızca bir ihtiyaç değil; kişinin kendini ifade
            etme biçimlerinden biridir. Bu nedenle tasarımlarımız, dikkat
            çekmek için değil, uzun süre sizinle kalmak için oluşturulur.
          </p>

          <p>
            NOCTIS; koyu tonların dinginliğini, şehir yaşamının dinamizmini ve
            zamansız stil anlayışını bir araya getirir.
          </p>

          <p className="pt-6 font-serif text-3xl tracking-[0.25em] text-white">
            Sade. Güçlü. Kalıcı.
          </p>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="font-serif text-2xl tracking-[0.35em]">NOCTIS</p>
          <p className="mt-2 text-sm tracking-[0.3em] text-gray-400">
            EST. 2026
          </p>
        </div>
      </section>
    </main>
  );
}