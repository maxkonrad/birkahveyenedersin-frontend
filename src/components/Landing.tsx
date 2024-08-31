import Link from "next/link"

export default function Landing() {
  return (
    <div className="bg-[#FFF8F0] text-[#3B2314] min-h-[100dvh] flex flex-col">
      <header className="container mx-auto px-4 md:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#FFC107] rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold">
            K
          </div>
          <h1 className="text-xl font-bold">birkahveyenedersin.com</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-[#FFC107] px-4 py-2 text-sm font-medium text-[#3B2314] shadow-sm transition-colors hover:bg-[#FFD54F] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2"
            prefetch={false}
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-md border border-[#FFC107] bg-transparent px-4 py-2 text-sm font-medium text-[#3B2314] shadow-sm transition-colors hover:bg-[#FFC107] hover:text-[#3B2314] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2"
            prefetch={false}
          >
            Üye Ol
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold">Kahve Buluşmalarının İlk Adımı</h2>
          <p className="text-lg md:text-xl text-[#5C4534]">
          "Bir fincan kahve etrafında, ortak bir tutku ile buluşalım."</p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-md bg-[#FFC107] px-6 py-3 text-sm font-medium text-[#3B2314] shadow-sm transition-colors hover:bg-[#FFD54F] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2"
            prefetch={false}
          >
            Haydi Başlayalım
          </Link>
        </div>
      </main>
      <section id="how-it-works" className="bg-[#F5E6D4] py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-[#FFC107] rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold">
              1
            </div>
            <h3 className="text-2xl font-bold">Profilini Oluştur</h3>
            <p className="text-[#5C4534]">Profilini Oluştur ve Keşfetmeye Başla</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-[#FFC107] rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold">
              2 
            </div>
            <h3 className="text-2xl font-bold">Bir Kahve Daveti Gönder</h3>
            <p className="text-[#5C4534]">İlk Adımı Sen At</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-[#FFC107] rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold">
              3
            </div>
            <h3 className="text-2xl font-bold">Buluş & Tadını Çıkar</h3>
            <p className="text-[#5C4534]">Bir fincan kahve eşliğinde tanış ve yeni dostluklar kur</p>
          </div>
        </div>
      </section>
      <footer className="bg-[#3B2314] text-[#FFF8F0] py-6">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm">&copy; 2024 birkahveyenedersin</p>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-[#FFC107] px-4 py-2 text-sm font-medium text-[#3B2314] shadow-sm transition-colors hover:bg-[#FFD54F] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2"
              prefetch={false}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md border border-[#FFC107] bg-transparent px-4 py-2 text-sm font-medium text-[#FFC107] shadow-sm transition-colors hover:bg-[#FFC107] hover:text-[#3B2314] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2"
              prefetch={false}
            >
              Üye Ol
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}