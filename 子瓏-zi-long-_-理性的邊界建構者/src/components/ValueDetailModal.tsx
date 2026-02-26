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
}

export default function ValueDetailModal({ isOpen, onClose, title, content }: ValueDetailModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/95 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-bg border border-accent/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
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
                  <h3 className="text-xl font-serif font-bold text-accent/80 border-l-4 border-accent pl-4">
                    {section.section}
                  </h3>
                  <div className="space-y-16">
                    {section.qa.map((item, qIdx) => (
                      <div key={qIdx} className="space-y-6">
                        <div className="flex items-start gap-4">
                          <span className="text-2xl font-serif font-bold text-accent/40 shrink-0">{item.id}</span>
                          <h4 className="text-[18px] font-serif font-medium leading-relaxed text-ink">
                            {item.q}
                          </h4>
                        </div>
                        <div className="pl-12 space-y-4">
                          <span className="text-[18px] font-serif font-bold text-accent block">子瓏：</span>
                          <p className="text-[22px] md:text-[24px] text-ink/80 leading-[1.8] whitespace-pre-line">
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
                關閉內容
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
