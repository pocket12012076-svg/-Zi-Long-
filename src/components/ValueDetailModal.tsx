import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ValueDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    section: string;
    qa: { q: string; a: string; id: string }[];
  }[];
  lang: string;
}

export default function ValueDetailModal({ isOpen, onClose, title, content, lang }: ValueDetailModalProps) {
  const t = {
    zh: {
      authorLabel: "子瓏：",
      closeBtn: "關閉內容"
    },
    en: {
      authorLabel: "Zi Long:",
      closeBtn: "Close"
    },
    ja: {
      authorLabel: "子瓏：",
      closeBtn: "閉じる"
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[85vh] bg-[#1A1A1A] border border-accent/30 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-6 border-b border-accent/10 flex justify-between items-center bg-accent/5">
              <h2 className="text-2xl font-serif font-bold text-accent">{title}</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-accent/10 rounded-full transition-colors text-accent"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-16 custom-scrollbar">
              {content.map((section, sIdx) => (
                <div key={sIdx} className="space-y-12">
                  <h3 className="text-xl font-serif font-bold text-white/90 border-l-4 border-accent pl-4">
                    {section.section}
                  </h3>
                  <div className="space-y-16">
                    {section.qa.map((item, qIdx) => (
                      <div key={qIdx} className="space-y-6">
                        <div className="flex items-start gap-4">
                          <span className="text-2xl font-serif font-bold text-accent/40 shrink-0">{item.id}</span>
                          <h4 className="text-[18px] font-serif font-medium leading-relaxed text-white">
                            {item.q}
                          </h4>
                        </div>
                        <div className="pl-12 space-y-4">
                          <span className="text-[18px] font-serif font-bold text-accent block">{t.authorLabel}</span>
                          <p className="text-[22px] md:text-[24px] text-white/80 leading-[1.8]" style={{ whiteSpace: 'pre-wrap' }}>
                            {item.a}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-accent/10 bg-accent/5 text-center">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-all"
              >
                {t.closeBtn}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
