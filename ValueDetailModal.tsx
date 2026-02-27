import { motion } from "motion/react";
import { MinimalCat } from "./Icons";
import { useState, FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    email: "",
    scenario: ""
  });

  const categories = [
    { label: "【內容合作】：專欄邀稿、採訪需求、小說改編。", value: "content" },
    { label: "【專業諮詢】：邊界建構指導、認知主權恢復建議。", value: "consulting" },
    { label: "【異業合作】：品牌聯名。", value: "business" },
    { label: "【分享給我我對你產生的影響】", value: "feedback" },
    { label: "【其他】", value: "other" }
  ];

  const abilityTags = [
    { title: "【精準止損】", desc: "在混亂關係中劃清界線。" },
    { title: "【認知解碼】", desc: "看穿暗示背後的真實動機。" },
    { title: "【情緒主權】", desc: "將被動的痛苦轉化為主動的察覺反射。" }
  ];

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
        throw new Error(data.message || '送出失敗，請稍後再試。');
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error instanceof Error ? error.message : '連線失敗，請檢查網路。' });
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
          <h2 className="text-[24px] md:text-[28px] font-serif font-bold mb-8 text-accent">試著讓我接住你的聲音</h2>
          <p className="text-ink/70 text-[18px] leading-[1.8] max-w-2xl mx-auto italic">
            「合作是價值的對等交換。為了確保我們的時間都用在最有意義的察覺與建構上，請在來信前確認你的意圖。」
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
              <label className="block mono-label text-accent mb-4 text-[18px]">1. 分類選項</label>
              <select 
                required
                className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-ink text-[18px] focus:outline-none focus:border-accent/30 transition-colors appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="" disabled>請選擇合作或諮詢類別</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} className="bg-bg text-ink">
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mono-label text-accent mb-4 text-[18px]">2. 姓名</label>
                <input 
                  type="text" 
                  required
                  placeholder="你的稱呼"
                  className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-ink text-[18px] focus:outline-none focus:border-accent/30 transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block mono-label text-accent mb-4 text-[18px]">3. 電子信箱</label>
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
              <label className="block mono-label text-accent mb-4 text-[18px]">4. 內容</label>
              <textarea 
                required
                rows={3}
                placeholder="在此輸入你的描述..."
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
                <span>{isSubmitting ? '傳送中...' : '送出聲音'}</span>
              </button>
              
              <p className="text-[18px] text-muted text-center max-w-md leading-relaxed">
                「我會認真傾聽每一個被淹沒的聲音。通常會在 3 個工作天內，由我的理性做出回應。」
              </p>
            </div>
          </form>
        </motion.div>

        {/* Ability Tags */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 md:gap-8">
          {abilityTags.map((tag, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
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
