import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
}

export default function AuthorModal({ isOpen, onClose, lang = "zh" }: AuthorModalProps) {
  const t = {
    zh: {
      label: "作者介紹",
      name: "子瓏",
      birth: "1992年生，現居台灣。",
      desc: "不喜歡一成不變的生活，喜歡徜徉在自己的想像世界，跳入文字的異世界中展開無數場驚奇冒險；如果遇上觸動內心、發自靈魂而渴望的事物，則會義無反顧地投入、身體力行去實踐。",
      close: "關閉介紹"
    },
    en: {
      label: "About Author",
      name: "Zi Long",
      birth: "Born in 1992, currently living in Taiwan.",
      desc: "Dislikes a monotonous life, loves to wander in her own imaginary world, and jumps into the different worlds of words to embark on countless amazing adventures. If she encounters something that touches her heart and soul, she will throw herself into it without hesitation and practice it personally.",
      close: "Close"
    },
    ja: {
      label: "作家紹介",
      name: "子瓏（ズーロン）",
      birth: "1992年生まれ、台湾在住。",
      desc: "単調な生活を好まず、自分の想像の世界に浸ることを好み、言葉の異世界に飛び込んで数え切れないほどの驚くべき冒険を繰り広げます。もし心や魂に触れる、切望するものに出会えば、迷わず身を投じ、自ら実践します。",
      close: "閉じる"
    }
  }[lang as 'zh' | 'en' | 'ja'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] overflow-y-auto bg-bg/80 backdrop-blur-md flex items-center justify-center p-4 py-12 md:py-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#1A1A1A] border border-accent/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-accent mono-label mb-2">{t.label}</h3>
                  <h2 className="text-[18px] font-serif font-bold text-white">{t.name}</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-accent/10 rounded-full transition-colors text-accent"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8 text-white/80 leading-loose text-lg">
                <p className="font-serif italic text-accent/80 border-l-2 border-accent/20 pl-6">
                  {t.birth}
                </p>
                <p>
                  {t.desc}
                </p>
              </div>

              <div className="mt-16 pt-8 border-t border-accent/10 flex justify-center">
                <button 
                  onClick={onClose}
                  className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-transform"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
