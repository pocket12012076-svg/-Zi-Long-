import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, BellRing, CheckCircle2 } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setEmail("");
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-bg border border-accent/20 rounded-3xl p-8 md:p-10 shadow-2xl text-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-accent/10 rounded-full transition-colors text-accent"
            >
              <X size={20} />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10"
              >
                <CheckCircle2 size={64} className="text-accent mx-auto mb-6" />
                <h2 className="text-2xl font-serif font-bold mb-2">訂閱成功</h2>
                <p className="text-muted">我們將在有新筆記時第一時間通知你。</p>
              </motion.div>
            ) : (
              <>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-8">
                  <BellRing size={32} />
                </div>
                
                <h2 className="text-[18px] font-serif font-bold mb-4">訂閱子瓏</h2>
                <p className="text-ink/60 mb-8 leading-relaxed">
                  加入我們的深度察覺體系，定期接收關於心理主權與邊界建立的生存筆記。
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    type="email" 
                    required
                    placeholder="輸入你的電子信箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-accent/5 border border-accent/10 rounded-xl focus:outline-none focus:border-accent/30 transition-colors text-ink"
                  />
                  <button 
                    type="submit"
                    className="w-full py-4 bg-accent text-bg rounded-xl font-bold hover:bg-accent/90 transition-colors"
                  >
                    立即訂閱
                  </button>
                </form>
                
                <p className="mt-6 text-[10px] mono-label text-muted">
                  我們承諾不發送垃圾郵件，你可以隨時取消訂閱。
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
