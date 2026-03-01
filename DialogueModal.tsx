import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, BellRing, CheckCircle2 } from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
}

export default function SubscriptionModal({ isOpen, onClose, lang = "zh" }: SubscriptionModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const t = {
    zh: {
      title: "訂閱子瓏",
      desc: "加入我們的深度察覺體系，定期接收關於心理主權與邊界建立的生存筆記。",
      placeholder: "輸入你的電子信箱",
      submit: "立即訂閱",
      submitting: "處理中...",
      successTitle: "訂閱成功",
      successDesc: "我們將在有新筆記時第一時間通知你。",
      footer: "我們承諾不發送垃圾郵件，你可以隨時取消訂閱。",
      error: "訂閱失敗，請稍後再試。",
      connectionError: "連線失敗"
    },
    en: {
      title: "Subscribe Zi Long",
      desc: "Join our deep awareness system and receive survival notes on psychological sovereignty and boundary construction regularly.",
      placeholder: "Enter your email",
      submit: "Subscribe Now",
      submitting: "Processing...",
      successTitle: "Subscription Successful",
      successDesc: "We will notify you as soon as there are new notes.",
      footer: "We promise not to send spam, you can unsubscribe at any time.",
      error: "Subscription failed, please try again later.",
      connectionError: "Connection failed"
    },
    ja: {
      title: "子瓏を購読する",
      desc: "私たちの深い気づきの体系に加わり、心理的主権と境界構築に関する生存ノートを定期的に受け取ってください。",
      placeholder: "メールアドレスを入力してください",
      submit: "今すぐ購読",
      submitting: "処理中...",
      successTitle: "購読完了",
      successDesc: "新しいノートができ次第、いち早くお知らせします。",
      footer: "スパムメールは送信しません。いつでも購読を解除できます。",
      error: "購読に失敗しました。後でもう一度お試しください。",
      connectionError: "接続失敗"
    }
  }[lang as 'zh' | 'en' | 'ja'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
          setEmail("");
        }, 3000);
      } else {
        throw new Error(data.message || t.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.connectionError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] overflow-y-auto bg-bg/80 backdrop-blur-md flex items-center justify-center p-4 py-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#1A1A1A] border border-accent/30 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-accent/10 rounded-full transition-colors text-accent"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10"
              >
                <CheckCircle2 size={64} className="text-accent mx-auto mb-6" />
                <h2 className="text-2xl font-serif font-bold mb-2 text-white">{t.successTitle}</h2>
                <p className="text-muted">{t.successDesc}</p>
              </motion.div>
            ) : (
              <>
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-8">
                  <BellRing size={32} />
                </div>
                
                <h2 className="text-[18px] font-serif font-bold mb-4 text-white">{t.title}</h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  {t.desc}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    type="email" 
                    required
                    disabled={isSubmitting}
                    placeholder={t.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-accent/5 border border-accent/10 rounded-xl focus:outline-none focus:border-accent/30 transition-colors text-white disabled:opacity-50"
                  />
                  {error && <p className="text-rose-500 text-xs mt-2">{error}</p>}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent text-bg rounded-xl font-bold hover:bg-accent/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? t.submitting : t.submit}
                  </button>
                </form>
                
                <p className="mt-6 text-[10px] mono-label text-muted">
                  {t.footer}
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
