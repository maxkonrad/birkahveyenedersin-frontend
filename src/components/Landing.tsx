import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, UserPlus, Users, ChevronRight, X, Instagram } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Component() {
  const [activeStep, setActiveStep] = useState(0)
  const [showCookieNotice, setShowCookieNotice] = useState(true)

  const steps = [
    { icon: <UserPlus className="w-8 h-8" />, title: "Profilini Oluştur", description: "Profilini Oluştur ve Keşfetmeye Başla" },
    { icon: <Coffee className="w-8 h-8" />, title: "Bir Kahve Daveti Gönder", description: "İlk Adımı Sen At" },
    { icon: <Users className="w-8 h-8" />, title: "Buluş & Tadını Çıkar", description: "Bir fincan kahve eşliğinde tanış ve yeni dostluklar kur" },
  ]

  return (
    <div className="min-h-screen bg-[#FFF5E6] text-[#4A3728] flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Kahve Buluşmaları Logo"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">Kahve Buluşmalarının İlk Adımı</h1>
          <p className="text-xl">Bir fincan kahve etrafında, ortak bir tutku ile buluşalım</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl"
        >
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col items-center ${index === activeStep ? 'text-[#FFA500]' : ''}`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveStep(index)}
              >
                <div className={`rounded-full p-3 ${index === activeStep ? 'bg-[#FFA500]' : 'bg-[#E0E0E0]'}`}>
                  {step.icon}
                </div>
                <p className="mt-2 font-semibold">{index + 1}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#FFA500] rounded-full p-4 mr-4">
                {steps[activeStep].icon}
              </div>
              <h2 className="text-2xl font-bold">{steps[activeStep].title}</h2>
            </div>
            <p className="mb-6">{steps[activeStep].description}</p>
            {activeStep === steps.length - 1 ? (
              <Link href="/register" passHref>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FFA500] text-white px-6 py-1 rounded-full font-semibold flex items-center justify-center mx-auto"
                >
                  Haydi Başlayalım
                  <ChevronRight className="ml-2 w-5 h-5" />
                </motion.a>
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFA500] text-white px-6 py-2 rounded-full font-semibold flex items-center justify-center mx-auto"
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              >
                Devam Et
                <ChevronRight className="ml-2 w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex space-x-4"
        >
          <Link href="/login" passHref>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#4A3728] text-white px-4 py-2 rounded-full font-semibold"
          >
            Giriş Yap
          </motion.a>
        </Link>
        <Link href="/register" passHref>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-[#4A3728] text-[#4A3728] px-4 py-2 rounded-full font-semibold"
          >
            Üye Ol
          </motion.a>
          </Link>
        </motion.div>
      </main>

      <footer className="bg-[#4A3728] text-white w-full py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bir Kahveye Ne Dersin?</h3>
              <p className="text-sm mb-4">Ortak tutkularla insanları bir araya getiriyoruz.</p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/whataboutacupofcoffee" className="text-white hover:text-[#FFA500] transition-colors duration-300">
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
              <ul className="space-y-2">
                  <li>
                    <a href="https://birkahveyenedersin.com/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {'Hakkımızda'}
                    </a>
                  </li>
                
                  <li>
                    <a href="https://birkahveyenedersin.com/faq" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {'SSS'}
                    </a>
                  </li>
                
                  <li>
                    <a href="https://birkahveyenedersin.com/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {'İletişim'}
                    </a>
                  </li>
                
                  <li>
                    <a href="https://birkahveyenedersin.com/policies" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {'Gizlilik Politikası'}
                    </a>
                  </li>
                
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <address className="not-italic text-sm text-gray-300">
                <p>Urla-İzmir, Türkiye</p>
                <p className="mt-2">
                  <a href="mailto:info@kahvebulusmalari.com" className="hover:text-[#FFA500] transition-colors duration-300">
                    birkahveyenedersin0@gmail.com
                  </a>
                </p>
              </address>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Bültenimize Katılın</h4>
              <p className="text-sm mb-4">En son haberler ve etkinlikler için bültenimize abone olun.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="bg-[#3A2A1F] text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#FFA500] flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#FFA500] text-white px-4 py-2 rounded-r-full hover:bg-[#FF9000] transition-colors duration-300"
                >
                  Abone Ol
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
            <p>&copy; 2024 birkahveyenedersin. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showCookieNotice && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 bg-[#4A3728] text-white p-4"
          >
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <p className="text-sm mr-4">
                Bu web sitesi, en iyi deneyimi yaşamanız için çerezleri kullanmaktadır. Sitemizi kullanmaya devam ederek, çerez kullanımımızı kabul etmiş olursunuz.
              </p>
              <button
                onClick={() => setShowCookieNotice(false)}
                className="bg-[#FFA500] text-white px-4 py-2 rounded-full font-semibold flex items-center"
              >
                Anladım
                <X className="ml-2 w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}