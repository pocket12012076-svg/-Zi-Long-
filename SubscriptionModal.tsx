import { motion } from "motion/react";
import { useState } from "react";
import AuthorModal from "./AuthorModal";
import BookModal from "./BookModal";

export default function Hero() {
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="mono-label mb-6 block">Brand Manifesto</span>
            <h1 className="text-[36px] md:text-[42px] font-serif leading-[1.4] mb-8 font-bold">
              跟著作家子瓏一起自剖內心<br/>
              將察覺練成<span className="italic text-accent">反射</span>。
            </h1>
            <p className="text-[18px] font-normal text-ink leading-[1.8] max-w-2xl mb-12">
              在憤怒與傷痛的喧嘩之下，我負責聽見那些被淹沒的聲音。<br/>
              在理性的邊界內，重建你的心理主權。
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => setIsAuthorOpen(true)}
                className="group relative px-8 py-4 bg-accent text-bg rounded-full overflow-hidden transition-all duration-500 inline-block"
              >
                <span className="relative z-10 font-bold text-[18px]">關於作家-子瓏</span>
                <div className="absolute inset-0 bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
              <button 
                onClick={() => setIsBookOpen(true)}
                className="px-8 py-4 border border-accent/20 rounded-full hover:border-accent/50 transition-all duration-300 text-accent font-bold text-[18px]"
              >
                小說-傾聽我 接住我
              </button>
            </div>
          </motion.div>
        </div>

        <AuthorModal isOpen={isAuthorOpen} onClose={() => setIsAuthorOpen(false)} />
        <BookModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />

        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden group border border-accent/10 bg-white/5"
          >
            <a 
              href="https://www.books.com.tw/products/0010958872?sloc=main" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img 
                src="/hero_cat.jpg.png" 
                alt="The Watcher - Black Cat"
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image is not found
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop";
                }}
              />
            </a>
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-40 pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-12 bg-accent" />
        <span className="mono-label text-accent">Scroll</span>
      </motion.div>
    </section>
  );
}
