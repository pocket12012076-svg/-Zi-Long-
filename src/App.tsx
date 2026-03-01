import React, { useState, useEffect, FormEvent, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Menu, X, Facebook, Instagram, AtSign, Globe, ChevronDown, 
  Shield, Eye, Filter, Zap, MessageSquareQuote, BellRing, CheckCircle2,
  ArrowUp, ArrowRight, ExternalLink, ChevronRight, ChevronLeft
} from "lucide-react";

// --- 預留 VALUE_TRANSLATIONS_DATA 變數 (下一輪補全) ---
// 這裡預留了結構，確保骨架能正常讀取資料
const VALUE_TRANSLATIONS_DATA: any = {
  zh: { author: {}, book: {}, values: {}, dialogues: {} },
  en: { author: {}, book: {}, values: {}, dialogues: {} },
  ja: { author: {}, book: {}, values: {}, dialogues: {} }
};

// --- 基礎圖示元件 ---
const MinimalCat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
    <path d="M12 18c-4 0-5-2-5-6s1-8 5-8 5 4 5 8-1 6-5 6z" />
    <path d="M8 6L7 4M16 6l1-2" />
    <circle cx="10" cy="11" r="0.5" fill="currentColor" />
    <circle cx="14" cy="11" r="0.5" fill="currentColor" />
    <path d="M12 13v1" />
  </svg>
);

// --- UI 基礎翻譯內容 ---
const UI_CONTENT = {
  zh: {
    nav: { contact: "聯絡我們", subscribe: "訂閱子瓏", about: "關於作家" },
    hero: {
      title: <>跟著作家子瓏一起自剖內心<br/>將察覺練成<span className="italic text-accent">反射</span>。</>,
      sub: <>在憤怒與傷痛的喧嘩之下，我負責聽見那些被淹沒的聲音。<br/>在理性的邊界內，重建你的心理主權。</>,
      btnAuthor: "關於作家-子瓏",
      btnBook: "小說-傾聽我 接住我"
    },
    about: {
      label: "The Persona",
      title: "關於作家—子瓏",
      text: [
        "26歲時獨自去日本生活兩年，28歲回國，30歲時意外出了小說，書名為:「傾聽我 接住我」。",
        "我是一個「非討好型」的人性觀察者，喜歡學習且樂於嘗試新事物的人，在我的世界觀裡，我追求冷靜且客觀的覺察。主張「人的行為皆具有目的性」來進行觀察和反思。"
      ],
      stats: { readers: "Monthly Readers", cases: "Case Studies" }
    },
    values: {
      label: "Core Values",
      noteTitle: "【子瓏的深度察覺筆記：24 則生存對話】",
      noteDesc: "在別人的劇本裡，你只是個被命名的角色。這 24 則對話分為兩部。第一部【關於我如何成為作家的 10 個 QA】記錄了我創作和覺察的真實過程；第二部為進階版【子瓏的深度察覺筆記】。",
      cards: [
        { id: "01", title: "認知脫鉤術", quote: "很多人都想看戲，但當你意識到那是別人想看的，你就有權脫掉那層外衣。", tags: ["投影", "投射", "自我察覺"] },
        { id: "02", title: "暗示過濾與邊界建構", quote: "有一種傷，是連求救的力氣都沒有。當你足夠了解自己，外界的暗示與操控就無法傷你。", tags: ["心理暗示", "情緒勒索", "認知主權"] },
        { id: "03", title: "理性的接住", quote: "採取「我就爛」的心理策略，承認遭遇的當下，情緒就失去了操控你的力量。", tags: ["原生家庭", "非典型療癒", "邊界感"] },
        { id: "04", title: "生存效率", quote: "管好自己就是對這個社會最大的貢獻。", tags: ["管好自己", "防禦性智慧", "冷靜"] }
      ]
    },
    contact: {
      title: "試著讓我接住你的聲音",
      quote: "「合作是價值的對等交換。為了確保我們的時間都用在最有意義的察覺與建構上，請在來信前確認你的意圖。」",
      labels: { category: "1. 分類選項", name: "2. 姓名", email: "3. 電子信箱", content: "4. 內容" },
      placeholders: { category: "請選擇合作或諮詢類別", name: "你的稱呼", content: "在此輸入你的描述...", email: "email@example.com" },
      submit: "送出聲音",
      footer: "「我會認真傾聽每一個被淹沒的聲音。通常會在 3 個工作天內，由我的理性做出回應。」"
    },
    footer: {
      desc: "理性的邊界建構者。致力於在紛擾的人性中，為你聽見被淹沒的聲音，找回你的選擇權。",
      subTitle: "Subscription",
      subDesc: "訂閱《人性觀察週報》，每週一次理性覺察筆記。我們將深入探討認知主權與邊界建構。",
      subBtn: "訂閱週報",
      placeholder: "Your email",
      rights: "© 2024 Zi Long. All Rights Reserved."
    }
  },
  en: {
    nav: { contact: "Contact", subscribe: "Subscribe", about: "About" },
    hero: {
      title: <>Dissect your inner self with Zi Long<br/>Turn awareness into a <span className="italic text-accent">Reflex</span>.</>,
      sub: <>Amidst the noise of anger and pain, I am responsible for hearing the submerged voices.<br/>Within the boundaries of rationality, rebuild your psychological sovereignty.</>,
      btnAuthor: "About Author",
      btnBook: "Novel - Listen to Me"
    },
    about: {
      label: "The Persona",
      title: "About Author — Zi Long",
      text: [
        "Lived alone in Japan for two years at age 26, returned home at 28, and unexpectedly published a novel titled 'Listen to Me, Catch Me' at 30.",
        "I am a 'non-people-pleasing' observer of humanity, someone who loves learning and is eager to try new things."
      ],
      stats: { readers: "Monthly Readers", cases: "Case Studies" }
    },
    values: {
      label: "Core Values",
      noteTitle: "[Zi Long's Deep Awareness Notes: 24 Survival Dialogues]",
      noteDesc: "In others' scripts, you are just a named character. These 24 dialogues record the authentic process of creation and awareness.",
      cards: [
        { id: "01", title: "Cognitive Decoupling", quote: "Many people want to watch the show, but when you realize it's what others want to see, you have the right to take off that coat.", tags: ["Projection", "Self-Awareness"] },
        { id: "02", title: "Suggestion Filtering", quote: "There is a kind of wound where you don't even have the strength to call for help. When you understand yourself enough, external suggestions cannot hurt you.", tags: ["Sovereignty", "Boundaries"] },
        { id: "03", title: "Rational Catching", quote: "Adopt the strategy of 'I'm just bad.' The moment you acknowledge the encounter, emotions lose power to manipulate you.", tags: ["Healing", "Rationality"] },
        { id: "04", title: "Survival Efficiency", quote: "Taking care of yourself is the greatest contribution to this society.", tags: ["Efficiency", "Calmness"] }
      ]
    },
    contact: {
      title: "Let Me Catch Your Voice",
      quote: "\"Collaboration is an equal exchange of value. Please confirm your intention before writing.\"",
      labels: { category: "1. Category", name: "2. Name", email: "3. Email", content: "4. Content" },
      placeholders: { category: "Select category", name: "Your name", content: "Enter description...", email: "email@example.com" },
      submit: "Send Voice",
      footer: "\"I will listen carefully to every submerged voice. I usually respond within 3 business days.\""
    },
    footer: {
      desc: "Rational boundary builder. Dedicated to hearing submerged voices and reclaiming your choices.",
      subTitle: "Subscription",
      subDesc: "Subscribe to the 'Humanity Observation Weekly'.",
      subBtn: "Subscribe",
      placeholder: "Your email",
      rights: "© 2024 Zi Long. All Rights Reserved."
    }
  },
  ja: {
    nav: { contact: "お問い合わせ", subscribe: "購読する", about: "作家について" },
    hero: {
      title: <>作家・子瓏と共に內面を解剖し<br/>気づきを<span className="italic text-accent">反射神経</span>に変える。</>,
      sub: <>怒りと痛みの喧騒の下で、私はかき消された声を聴き届けます。<br/>理性の境界內で、あなたの心理的主權を再構築します。</>,
      btnAuthor: "作家について",
      btnBook: "小說 - 私を聴いて"
    },
    about: {
      label: "ペルソナ",
      title: "作家について — 子瓏（ズーロン）",
      text: [
        "26歳の時に単身で日本へ渡り2年間生活し、28歳で帰國。30歳の時に思いがけず小說『傾聴我 接住我』を出版しました。",
        "私は「非迎合型」の人間観察者であり、学ぶことが好きで新しいことに挑戦することに意欲的な人間です。"
      ],
      stats: { readers: "月間読者數", cases: "ケーススタディ" }
    },
    values: {
      label: "Core Values",
      noteTitle: "【子瓏の深度察覚ノート：24の生存対話】",
      noteDesc: "他人の台本の中では、あなたは単に名前を付けられた登場人物に過ぎません。この24の対話は二部構成です。",
      cards: [
        { id: "01", title: "認知デカップリング術", quote: "それが他人の見たいものだと気づいたとき、あなたはその上着を脱ぐ権利があります。", tags: ["投影", "自己認識"] },
        { id: "02", title: "暗示フィルタリング", quote: "助けを求める力さえないような傷があります。自分自身を十分に理解したとき、外部からの暗示はあなたを傷つけることはできません。", tags: ["主権", "境界構築"] },
        { id: "03", title: "理性的キャッチ", quote: "「私はダメだ」という心理戦略を採用し、感情はあなたを操作する力を失います。", tags: ["癒やし", "理性"] },
        { id: "04", title: "生存効率", desc: "自分を律することこそが、この社会への最大の貢献です。", tags: ["効率", "冷静"] }
      ]
    },
    contact: {
      title: "あなたの声を聴き届けさせてください",
      quote: "「コラボレーションは価値の対等な交換です。ご連絡の前にご自身の意圖をご確認ください。」",
      labels: { category: "1. カテゴリ", name: "2. お名前", email: "3. メールアドレス", content: "4. 内容" },
      placeholders: { category: "カテゴリを選択", name: "お名前", content: "内容を入力...", email: "email@example.com" },
      submit: "声を送る",
      footer: "「かき消されたすべての声に真摯に耳を傾けます。通常、3営業日以内に理性的にお返事いたします。」"
    },
    footer: {
      desc: "理性的な境界の構築者。人間性の喧騒の中で、かき消されたあなたの声を聞き取り、選択権を取り戻すお手伝いをします。",
      subTitle: "購読",
      subDesc: "『人間性観察週報』を購読して、週に一度の理性的気づきノートを受け取りましょう。",
      subBtn: "購読する",
      placeholder: "メールアドレス",
      rights: "© 2024 Zi Long. All Rights Reserved."
    }
  }
};

// --- 彈窗組件 (Modals) ---

const AuthorModal = ({ isOpen, onClose, lang }: any) => {
  const data = VALUE_TRANSLATIONS_DATA[lang]?.author || {};
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-2xl bg-[#1A1A1A] border border-accent/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 text-accent hover:bg-accent/10 p-2 rounded-full"><X size={24} /></button>
            <h3 className="text-accent mono-label mb-2">{data.label || "Author"}</h3>
            <h2 className="text-2xl font-serif font-bold text-white mb-8">{data.name || "Zi Long"}</h2>
            <div className="space-y-6 text-white/80 leading-loose text-lg">
              <p className="italic text-accent/80 border-l-2 border-accent/20 pl-6">{data.birth}</p>
              <p>{data.desc}</p>
            </div>
            <div className="mt-12 flex justify-center"><button onClick={onClose} className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-all">{data.close || "Close"}</button></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const BookModal = ({ isOpen, onClose, lang }: any) => {
  const data = VALUE_TRANSLATIONS_DATA[lang]?.book || {};
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl max-h-[90vh] bg-[#1A1A1A] border border-accent/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-accent/10 flex justify-between items-center bg-accent/5">
              <div><h3 className="text-accent mono-label mb-1">{data.label || "Book"}</h3><h2 className="text-xl font-serif font-bold text-white">{data.title || "Listen to Me"}</h2></div>
              <button onClick={onClose} className="text-accent p-2 hover:bg-accent/10 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 custom-scrollbar">
              <section>
                <h4 className="text-accent font-bold mb-6 border-b border-accent/10 pb-2 inline-block">{data.introTitle || "Intro"}</h4>
                <div className="space-y-6 text-white/80 leading-loose">
                  <p className="font-bold text-white">{data.introSub}</p>
                  <p>{data.introP1}</p><p>{data.introP2}</p><p>{data.introP3}</p>
                </div>
              </section>
              {data.tocItems && (
                <section>
                  <h4 className="text-accent font-bold mb-6 border-b border-accent/10 pb-2 inline-block">{data.tocTitle || "TOC"}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70 font-serif max-h-48 overflow-y-auto pr-4 custom-scrollbar">
                    {data.tocItems.map((item: string, i: number) => <p key={i}>{item}</p>)}
                  </div>
                </section>
              )}
            </div>
            <div className="p-6 border-t border-accent/10 bg-bg/5 flex justify-center"><button onClick={onClose} className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-all">{data.close || "Close"}</button></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DialogueModal = ({ isOpen, onClose, id, lang, onNext }: any) => {
  const dialogues = VALUE_TRANSLATIONS_DATA[lang]?.dialogues || {};
  const content = dialogues[id] || { q: "Loading...", a: "...", title: "Interview" };
  const allIds = Object.keys(dialogues);
  const currentIndex = allIds.indexOf(id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-bg/95 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-5xl max-h-[90vh] bg-bg border border-accent/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* TOC Sidebar */}
              <div className="hidden md:block w-64 border-r border-accent/10 bg-accent/[0.02] overflow-y-auto custom-scrollbar p-6">
                <span className="mono-label mb-6 block text-accent/60">Questions</span>
                <div className="space-y-2">
                  {allIds.map((qid) => (
                    <button key={qid} onClick={() => onNext(qid)} className={`w-full text-left text-xs p-2 rounded transition-colors ${id === qid ? 'bg-accent text-bg font-bold' : 'text-white/40 hover:bg-accent/5 hover:text-accent'}`}>
                      {qid}. {dialogues[qid].title}
                    </button>
                  ))}
                </div>
              </div>
              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-8 md:p-16 relative custom-scrollbar">
                <button onClick={onClose} className="absolute top-8 right-8 text-muted hover:text-accent p-2"><X size={28} /></button>
                <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent"><MessageSquareQuote size={20} /></div><span className="mono-label">{content.title}</span></div>
                <h2 className="text-2xl md:text-3xl mb-12 leading-relaxed text-white font-serif">{content.q}</h2>
                <div className="flex gap-6 mb-12"><div className="w-px bg-accent/20 shrink-0" /><div className="text-lg md:text-xl text-white/80 leading-loose whitespace-pre-wrap">{content.a}</div></div>
                {/* Next Button */}
                {currentIndex < allIds.length - 1 && (
                  <div className="flex justify-end">
                    <button onClick={() => onNext(allIds[currentIndex + 1])} className="flex items-center gap-2 px-8 py-4 bg-accent/10 border border-accent/20 rounded-full text-accent hover:bg-accent hover:text-bg transition-all font-bold">
                      {lang === 'zh' ? '下一題' : lang === 'ja' ? '次へ' : 'Next Question'} <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ValueDetailModal = ({ isOpen, onClose, title, content, lang }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl max-h-[85vh] bg-[#1A1A1A] border border-accent/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="p-6 border-b border-accent/10 flex justify-between items-center bg-accent/5"><h2 className="text-2xl font-serif font-bold text-accent">{title}</h2><button onClick={onClose} className="text-accent p-2 hover:bg-accent/10 rounded-full"><X size={24} /></button></div>
          <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-16 custom-scrollbar">
            {content?.map((section: any, idx: number) => (
              <div key={idx} className="space-y-8">
                <h3 className="text-xl font-serif font-bold text-white border-l-4 border-accent pl-4">{section.section}</h3>
                <div className="space-y-12">
                  {section.qa.map((item: any, qIdx: number) => (
                    <div key={qIdx} className="space-y-4">
                      <div className="flex gap-4"><span className="text-accent/40 font-bold font-mono">{item.id}</span><h4 className="text-white font-serif text-lg">{item.q}</h4></div>
                      <div className="pl-10 border-l border-accent/10"><p className="text-white/70 leading-relaxed text-lg whitespace-pre-line">{item.a}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-accent/10 bg-accent/5 flex justify-center"><button onClick={onClose} className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-all">關閉內容</button></div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const SubscriptionModal = ({ isOpen, onClose }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-md bg-[#1A1A1A] border border-accent/30 rounded-3xl p-10 text-center shadow-2xl">
          <button onClick={onClose} className="absolute top-6 right-6 text-accent p-2 hover:bg-accent/10 rounded-full"><X size={24} /></button>
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-8"><BellRing size={32} /></div>
          <h2 className="text-xl font-serif font-bold text-white mb-4">訂閱子瓏</h2>
          <p className="text-white/60 mb-8">加入我們的深度察覺體系，定期接收關於心理主權與邊界建立的生存筆記。</p>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('訂閱成功！'); onClose(); }}>
            <input type="email" required placeholder="輸入你的電子信箱" className="w-full px-6 py-4 bg-accent/5 border border-accent/10 rounded-xl text-white outline-none focus:border-accent/30" />
            <button type="submit" className="w-full py-4 bg-accent text-bg rounded-xl font-bold hover:bg-accent/90 transition-colors">立即訂閱</button>
          </form>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- 主程式 (Main App) ---

export default function App() {
  const [lang, setLang] = useState("zh");
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [currentDialogueId, setCurrentDialogueId] = useState("Q1");
  const [selectedValueId, setSelectedValueId] = useState<string | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = UI_CONTENT[lang as keyof typeof UI_CONTENT];
  const valueIcons = [Eye, Filter, Shield, Zap];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-bg text-ink font-sans antialiased selection:bg-accent selection:text-bg overflow-x-hidden">
      {/* Custom Scrollbar Style */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(194, 178, 128, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(194, 178, 128, 0.4); }
      `}</style>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-accent/10 z-[100]">
        <motion.div className="h-full bg-accent origin-left relative" style={{ scaleX }}>
          <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" style={{ opacity: scrollYProgress }}>
            <MinimalCat className="w-4 h-4 text-accent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-accent/10 bg-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MinimalCat className="w-6 h-6 text-accent" />
            <span className="font-serif text-2xl font-bold tracking-widest text-white">子瓏</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={scrollToContact} className="text-muted hover:text-accent transition-colors text-lg">{t.nav.contact}</button>
            <div className="flex items-center gap-2 px-4 py-2 border border-accent/20 rounded-full text-accent hover:bg-accent/5 transition-all">
              <Globe size={18} />
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent outline-none text-sm font-bold cursor-pointer">
                <option value="zh">繁體中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>
            <button onClick={() => setIsSubModalOpen(true)} className="px-5 py-2 border border-accent/30 rounded-full text-accent hover:bg-accent hover:text-bg transition-all text-lg">{t.nav.subscribe}</button>
          </nav>
          {/* Mobile Menu Toggle (Simplified) */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : lang === 'en' ? 'ja' : 'zh')} className="text-accent p-2 border border-accent/20 rounded-full"><Globe size={20} /></button>
            <button onClick={() => setIsSubModalOpen(true)} className="text-accent p-2 border border-accent/20 rounded-full"><BellRing size={20} /></button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="mono-label mb-6 block text-accent">Brand Manifesto</span>
                <h1 className="text-[32px] md:text-[42px] lg:text-[52px] font-serif leading-[1.3] mb-8 font-bold text-white">{t.hero.title}</h1>
                <p className="text-[18px] md:text-[20px] text-white/80 leading-[1.8] max-w-2xl mb-12">{t.hero.sub}</p>
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <button onClick={() => setIsAuthorOpen(true)} className="px-8 py-4 bg-accent text-bg rounded-full font-bold text-[18px] hover:scale-105 transition-transform shadow-lg shadow-accent/10">{t.hero.btnAuthor}</button>
                  <button onClick={() => setIsBookOpen(true)} className="px-8 py-4 border border-accent/20 rounded-full text-accent font-bold text-[18px] hover:bg-accent/5 transition-all">{t.hero.btnBook}</button>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-accent/10 bg-white/5 group shadow-2xl">
                <a href="https://www.books.com.tw/products/0010958872?sloc=main" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                  <img src="/hero_cat.jpg.png" alt="Book Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6"><span className="text-accent flex items-center gap-2 font-bold">立即購買 <ExternalLink size={16} /></span></div>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 border-t border-accent/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="mono-label mb-6 block text-accent">{t.about.label}</span>
              <h2 className="text-[28px] md:text-[32px] font-serif font-bold mb-8 text-white">{t.about.title}</h2>
              <div className="space-y-6 text-white/70 leading-[1.8] text-lg text-justify">
                {t.about.text.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="mt-12 flex gap-12">
                <div><p className="text-4xl font-serif font-bold text-accent">100k+</p><p className="mono-label text-accent/60">{t.about.stats.readers}</p></div>
                <div><p className="text-4xl font-serif font-bold text-accent">500+</p><p className="mono-label text-accent/60">{t.about.stats.cases}</p></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 border border-accent/10 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-12 rounded-full overflow-hidden border border-accent/20 shadow-2xl">
                <img src="/作者_潛水.jpg.jpg" alt="Author" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="values" className="py-32 px-6 border-y border-accent/10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-20">
              <span className="mono-label mb-4 block text-accent">{t.values.label}</span>
              <button onClick={() => setIsDialogueOpen(true)} className="group relative px-8 py-4 border border-accent/30 rounded-xl text-accent font-serif text-xl md:text-2xl mb-8 hover:bg-accent hover:text-bg transition-all duration-500 text-left shadow-lg">
                {t.values.noteTitle}
              </button>
              <p className="text-white/80 text-lg leading-loose">{t.values.noteDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-accent/10 border border-accent/10 rounded-2xl overflow-hidden">
              {t.values.cards.map((card, idx) => {
                const Icon = valueIcons[idx];
                return (
                  <motion.div key={card.id} onClick={() => setSelectedValueId(card.id)} className="bg-bg p-10 md:p-16 group hover:bg-accent/[0.03] transition-all cursor-pointer relative overflow-hidden">
                    <div className="flex justify-between items-start mb-12">
                      <div className="p-4 rounded-2xl bg-accent/5 text-accent group-hover:bg-accent group-hover:text-bg transition-all"><Icon size={28} /></div>
                      <span className="font-mono text-4xl opacity-10 text-accent group-hover:opacity-30 transition-opacity">{card.id}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-accent">{card.title}</h3>
                    <p className="text-white/80 leading-relaxed mb-8 text-lg italic border-l-2 border-accent/20 pl-6 group-hover:border-accent transition-colors">{card.quote}</p>
                    <div className="flex flex-wrap gap-2">{card.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 border border-accent/20 rounded-full text-accent/60">{tag}</span>)}</div>
                    <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity text-accent"><ArrowRight size={24} /></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 bg-accent/[0.02]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[32px] font-serif font-bold mb-8 text-accent">{t.contact.title}</h2>
            <p className="text-white/60 italic mb-16 text-lg max-w-2xl mx-auto">{t.contact.quote}</p>
            <form className="space-y-8 text-left max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div><label className="block mono-label text-accent mb-4">{t.contact.labels.name}</label><input type="text" placeholder={t.contact.placeholders.name} className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent/30 transition-colors" /></div>
                <div><label className="block mono-label text-accent mb-4">{t.contact.labels.email}</label><input type="email" placeholder={t.contact.placeholders.email} className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent/30 transition-colors" /></div>
              </div>
              <div><label className="block mono-label text-accent mb-4">{t.contact.labels.content}</label><textarea rows={4} placeholder={t.contact.placeholders.content} className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent/30 resize-none transition-colors" /></div>
              <button className="w-full py-5 bg-accent text-bg rounded-full font-bold text-xl hover:scale-[1.02] transition-transform shadow-xl shadow-accent/10">{t.contact.submit}</button>
            </form>
            <p className="mt-12 text-white/40 text-sm max-w-md mx-auto leading-relaxed">{t.contact.footer}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <h2 className="text-[36px] font-serif font-bold mb-6 text-white">子瓏 Zi Long</h2>
              <p className="text-white/60 leading-loose max-w-sm mb-8">{t.footer.desc}</p>
              <div className="flex gap-6">
                <a href="https://www.facebook.com/profile.php?id=61550052641350&locale=zh_TW" target="_blank" rel="noopener noreferrer" className="text-accent/60 hover:text-accent transition-colors"><Facebook size={24} /></a>
                <a href="https://www.instagram.com/avanda_7/" target="_blank" rel="noopener noreferrer" className="text-accent/60 hover:text-accent transition-colors"><Instagram size={24} /></a>
                <a href="https://www.threads.com/@avanda_7" target="_blank" rel="noopener noreferrer" className="text-accent/60 hover:text-accent transition-colors"><AtSign size={24} /></a>
              </div>
            </div>
            <div>
              <span className="mono-label mb-6 block text-accent">{t.footer.nav}</span>
              <ul className="space-y-4 text-white/70 text-lg">
                <li><button onClick={scrollToContact} className="hover:text-accent">{t.footer.contact || "Contact"}</button></li>
                <li><button onClick={() => setIsAuthorOpen(true)} className="hover:text-accent">{t.footer.about || "About"}</button></li>
              </ul>
            </div>
            <div>
              <span className="mono-label mb-6 block text-accent">{t.footer.subTitle}</span>
              <p className="text-sm text-white/50 mb-6">{t.footer.subDesc}</p>
              <button onClick={() => setIsSubModalOpen(true)} className="w-full py-3 bg-accent text-bg rounded-lg font-bold hover:bg-accent/90 transition-colors">{t.footer.subBtn}</button>
            </div>
          </div>
          <div className="pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] mono-label text-accent/40">{t.footer.rights}</p>
            <p className="text-[10px] mono-label text-accent/40 uppercase tracking-widest">Rational Boundary Builder</p>
          </div>
        </div>
      </footer>

      {/* TOP Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-[100] p-4 bg-accent text-bg rounded-full shadow-2xl hover:scale-110 transition-transform">
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AuthorModal isOpen={isAuthorOpen} onClose={() => setIsAuthorOpen(false)} lang={lang} />
      <BookModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} lang={lang} />
      <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />
      <DialogueModal 
        isOpen={isDialogueOpen} 
        onClose={() => setIsDialogueOpen(false)} 
        lang={lang} 
        id={currentDialogueId} 
        onNext={(nextId: string) => setCurrentDialogueId(nextId)} 
      />
      {selectedValueId && (
        <ValueDetailModal 
          isOpen={!!selectedValueId} 
          onClose={() => setSelectedValueId(null)} 
          title={t.values.cards.find(c => c.id === selectedValueId)?.title || ""}
          content={VALUE_TRANSLATIONS_DATA[lang]?.values?.[selectedValueId]?.content}
          lang={lang}
        />
      )}
    </div>
  );
}
