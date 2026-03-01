import { motion } from "motion/react";
import { MinimalCat } from "./Icons";
import { useState, FormEvent } from "react";

export default function Contact({ lang }: { lang: string }) {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    email: "",
    scenario: ""
  });

  const t = {
    zh: {
      title: "試著讓我接住你的聲音",
      quote: "「合作是價值的對等交換。為了確保我們的時間都用在最有意義的察覺與建構上，請在來信前確認你的意圖。」",
      labelCategory: "1. 分類選項",
      labelName: "2. 姓名",
      labelEmail: "3. 電子信箱",
      labelContent: "4. 內容",
      placeholderCategory: "請選擇合作或諮詢類別",
      placeholderName: "你的稱呼",
      placeholderContent: "在此輸入你的描述...",
      submit: "送出聲音",
      submitting: "傳送中...",
      footerNote: "「我會認真傾聽每一個被淹沒的聲音。通常會在 3 個工作天內，由我的理性做出回應。」",
      categories: [
        { label: "【內容合作】：專欄邀稿、採訪需求、小說改編。", value: "content" },
        { label: "【專業諮詢】：邊界建構指導、認知主權恢復建議。", value: "consulting" },
        { label: "【異業合作】：品牌聯名。", value: "business" },
        { label: "【分享給我我對你產生的影響】", value: "feedback" },
        { label: "【其他】", value: "other" }
      ],
      abilityTags: [
        { title: "【精準止損】", desc: "在混亂關係中劃清界線。" },
        { title: "【認知解碼】", desc: "看穿暗示背後的真實動機。" },
        { title: "【情緒主權】", desc: "將被動的痛苦轉化為主動的察覺反射。" }
      ]
    },
    en: {
      title: "Let Me Catch Your Voice",
      quote: "\"Collaboration is an equal exchange of value. To ensure our time is spent on the most meaningful awareness and construction, please confirm your intention before writing.\"",
      labelCategory: "1. Category",
      labelName: "2. Name",
      labelEmail: "3. Email",
      labelContent: "4. Content",
      placeholderCategory: "Select a category for collaboration or consulting",
      placeholderName: "Your name",
      placeholderContent: "Enter your description here...",
      submit: "Send Voice",
      submitting: "Sending...",
      footerNote: "\"I will listen carefully to every submerged voice. I usually respond within 3 business days with my rationality.\"",
      categories: [
        { label: "[Content]: Column, interview, novel adaptation.", value: "content" },
        { label: "[Consulting]: Boundary construction, cognitive sovereignty.", value: "consulting" },
        { label: "[Business]: Brand collaboration.", value: "business" },
        { label: "[Feedback]: Share the impact I've had on you.", value: "feedback" },
        { label: "[Other]: Miscellaneous.", value: "other" }
      ],
      abilityTags: [
        { title: "[Stop Loss]", desc: "Draw clear lines in chaotic relationships." },
        { title: "[Cognitive Decoding]", desc: "See the real motives behind suggestions." },
        { title: "[Emotional Sovereignty]", desc: "Turn passive pain into active awareness." }
      ]
    },
    ja: {
      title: "あなたの声を聴き届けさせてください",
      quote: "「コラボレーションは価値の対等な交換です。私たちの時間を最も有意義な気づきと構築に充てるために、ご連絡の前にご自身の意図をご確認ください。」",
      labelCategory: "1. カテゴリ",
      labelName: "2. お名前",
      labelEmail: "3. メールアドレス",
      labelContent: "4. 内容",
      placeholderCategory: "コラボレーションまたは相談のカテゴリを選択してください",
      placeholderName: "お名前",
      placeholderContent: "ここに内容を入力してください...",
      submit: "声を送る",
      submitting: "送信中...",
      footerNote: "「かき消されたすべての声に真摯に耳を傾けます。通常、3営業日以内に理性的にお返事いたします。」",
      categories: [
        { label: "【コンテンツ】：コラム執筆、取材、小説のアダプテーション。", value: "content" },
        { label: "【専門相談】：境界構築指導、認知的主権の回復アドバイス。", value: "consulting" },
        { label: "【ビジネス】：ブランドコラボレーション。", value: "business" },
        { label: "【フィードバック】：私から受けた影響を共有する。", value: "feedback" },
        { label: "【その他】：その他のお問い合わせ。", value: "other" }
      ],
      abilityTags: [
        { title: "【精確な損切り】", desc: "混乱した関係の中で明確な一線を畫す。" },
        { title: "【認知デコード】", desc: "暗示の背後にある真の動機を見抜く。" },
        { title: "【感情的主権】", desc: "受動的な苦痛を能動的な気づきの反射に変える。" }
      ]
    }
  }[lang as 'zh' | 'en' | 'ja'];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({ category: "", name: "", email: "", scenario: "" });
      } else {
        const errorMsg = lang === 'zh' ? '送出失敗，請稍後再試。' : lang === 'ja' ? '送信に失敗しました。後でもう一度お試しください。' : 'Failed to send, please try again later.';
        throw new Error(data.message || errorMsg);
      }
    } catch (error) {
      const errorMsg = lang === 'zh' ? '連線失敗，請檢查網路。' : lang === 'ja' ? '接続に失敗しました。ネットワークを確認してください。' : 'Connection failed, please check your network.';
      setSubmitStatus({ type: 'error', message: error instanceof Error ? error.message : errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-gradient-to-br from-bg to-[#22211F]">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[18px] font-serif text-accent/60 hover:text-accent transition-colors flex items-center gap-2 group"
          >
            <span className="w-8 h-[1px] bg-accent/20 group-hover:w-12 transition-all" />
            TOP
          </button>
        </div>
        <div className="text-center mb-16">
          <span className="mono-label mb-6 block text-accent">Contact & Collaboration</span>
          <h2 className="text-[24px] md:text-[28px] font-serif font-bold mb-8 text-accent">{t.title}</h2>
          <p className="text-ink/70 text-[18px] leading-[1.8] max-w-2xl mx-auto italic">
            {t.quote}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg/50 border border-accent/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm"
        >
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Category Dropdown */}
            <div>
              <label className="block mono-label text-accent mb-4 text-[18px]">{t.labelCategory}</label>
              <select 
                required
                className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-ink text-[18px] focus:outline-none focus:border-accent/30 transition-colors appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="" disabled>{t.placeholderCategory}</option>
                {t.categories.map((cat) => (
                  <option key={cat.value} value={cat.value} className="bg-bg text-ink">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mono-label text-accent mb-4 text-[18px]">{t.labelName}</label>
                <input 
                  type="text" 
                  required
                  placeholder={t.placeholderName}
                  className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-ink text-[18px] focus:outline-none focus:border-accent/30 transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block mono-label text-accent mb-4 text-[18px]">{t.labelEmail}</label>
                <input 
                  type="email" 
                  required
                  placeholder="email@example.com"
                  className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-ink text-[18px] focus:outline-none focus:border-accent/30 transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block mono-label text-accent mb-4 text-[18px]">{t.labelContent}</label>
              <textarea 
                required
                rows={3}
                placeholder={t.placeholderContent}
                className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-ink text-[18px] focus:outline-none focus:border-accent/30 transition-colors resize-none"
                value={formData.scenario}
                onChange={(e) => setFormData({...formData, scenario: e.target.value})}
              />
            </div>

            <div className="pt-4 flex flex-col items-center gap-6">
              {submitStatus && (
                <div className={`text-sm font-serif ${submitStatus.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {submitStatus.message}
                </div>
              )}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center gap-4 px-12 py-5 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                <MinimalCat className="w-5 h-5" />
                <span>{isSubmitting ? t.submitting : t.submit}</span>
              </button>
              
              <p className="text-[18px] text-muted text-center max-w-md leading-relaxed">
                {t.footerNote}
              </p>
            </div>
          </form>
        </motion.div>

        {/* Ability Tags */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 md:gap-8">
          {t.abilityTags.map((tag, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <span className="text-accent font-serif font-bold text-sm block mb-1">{tag.title}</span>
              <span className="text-[10px] mono-label opacity-40">{tag.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
