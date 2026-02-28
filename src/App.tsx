/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import Hero from "./components/Hero";
import Values from "./components/Values";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion, useScroll, useSpring } from "motion/react";
import { MinimalCat } from "./components/Icons";
import { useState } from "react";
import SubscriptionModal from "./components/SubscriptionModal";

export default function App() {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [lang, setLang] = useState("zh");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const content = {
    zh: {
      heroTitle: <>跟著作家子瓏一起自剖內心<br/>將察覺練成<span className="italic text-accent">反射</span>。</>,
      heroSub: <>在憤怒與傷痛的喧嘩之下，我負責聽見那些被淹沒的聲音。<br/>在理性的邊界內，重建你的心理主權。</>,
      aboutTitle: "關於作家—子瓏",
      aboutText: [
        "26歲時獨自去日本生活兩年，28歲回國，30歲時意外出了小說，書名為:「傾聽我 接住我」。",
        "我是一個「非討好型」的人性觀察者，喜歡學習且樂於嘗試新事物的人，在我的世界觀裡，我追求冷靜且客觀的覺察。主張「人的行為皆具有目的性」來進行觀察 and 反思。"
      ],
      persona: "The Persona",
      readers: "Monthly Readers",
      cases: "Case Studies",
      quote: "「當你足夠了解自己，你將發現：在別人的劇本之外，你其實擁有更多選擇。」",
      ctaTitle: <>準備好奪回你的<br/><span className="italic text-accent">認知主權</span>了嗎？</>,
      ctaDesc: "不再被情緒勒索，不再為別人的劇本演出。從今天起，把察覺練成反射。",
      subscribe: "訂閱子瓏",
      btnAuthor: "關於作家-子瓏",
      btnBook: "小說-傾聽我 接住我"
    },
    en: {
      heroTitle: <>Dissect your inner self with Zi Long<br/>Turn awareness into a <span className="italic text-accent">Reflex</span>.</>,
      heroSub: <>Amidst the noise of anger and pain, I am responsible for hearing the submerged voices.<br/>Within the boundaries of rationality, rebuild your psychological sovereignty.</>,
      aboutTitle: "About Author — Zi Long",
      aboutText: [
        "Lived alone in Japan for two years at age 26, returned home at 28, and unexpectedly published a novel titled 'Listen to Me, Catch Me' at 30.",
        "I am a 'non-people-pleasing' observer of humanity, someone who loves learning and is eager to try new things. In my worldview, I pursue calm and objective awareness. I advocate that 'human behavior is purposeful' as the core of my observation and reflection."
      ],
      persona: "The Persona",
      readers: "Monthly Readers",
      cases: "Case Studies",
      quote: "\"When you understand yourself enough, you will discover: outside of others' scripts, you actually have more choices.\"",
      ctaTitle: <>Ready to reclaim your<br/><span className="italic text-accent">Cognitive Sovereignty</span>?</>,
      ctaDesc: "No more emotional blackmail, no more acting for others' scripts. From today, turn awareness into a reflex.",
      subscribe: "Subscribe",
      btnAuthor: "About Author",
      btnBook: "Novel - Listen to Me"
    },
    ja: {
      heroTitle: <>作家・子瓏と共に内面を解剖し<br/>気づきを<span className="italic text-accent">反射神経</span>に変える。</>,
      heroSub: <>怒りと痛みの喧騒の下で、私はかき消された声を聴き届けます。<br/>理性の境界内で、あなたの心理的主権を再構築します。</>,
      aboutTitle: "作家について — 子瓏（ズーロン）",
      aboutText: [
        "26歳の時に単身で日本へ渡り2年間生活し、28歳で帰国。30歳の時に思いがけず小説『傾聴我 接住我（私を聴いて、私を受け止めて）』を出版しました。",
        "私は「非迎合型」の人間観察者であり、学ぶことが好きで新しいことに挑戦することに意欲的な人間です。私の世界観では、冷静かつ客観的な気づきを追求しています。「人間の行動にはすべて目的がある」という主張を、観察と内省の核心としています。"
      ],
      persona: "ペルソナ",
      readers: "月間読者数",
      cases: "ケーススタディ",
      quote: "「自分自身を十分に理解したとき、他人の台本の外に、実はもっと多くの選択肢があることに気づくでしょう。」",
      ctaTitle: <>あなたの<span className="italic text-accent">認知的主権</span>を<br/>取り戻す準備はできていますか？</>,
      ctaDesc: "感情的なゆすりに屈することなく、他人の台本のために演じることもありません。今日から、気づきを反射神経に変えましょう。",
      subscribe: "購読する",
      btnAuthor: "作家について",
      btnBook: "小説 - 私を聴いて"
    }
  };

  const t = content[lang as keyof typeof content];

  return (
    <div className="relative min-h-screen light-guide selection:bg-accent selection:text-bg">
      {/* Progress Bar with Cat */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-accent/10 z-[60]">
        <motion.div
          className="h-full bg-accent origin-left relative"
          style={{ scaleX }}
        >
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
            style={{ opacity: scrollYProgress }}
          >
            <MinimalCat className="w-4 h-4 text-accent" />
          </motion.div>
        </motion.div>
      </div>

      <Header currentLang={lang} onLangChange={setLang} />
      
      <main>
        <Hero 
          title={t.heroTitle} 
          subtitle={t.heroSub} 
          subscribeText={t.subscribe}
          btnAuthor={t.btnAuthor}
          btnBook={t.btnBook}
          lang={lang}
        />
        
        {/* About Section */}
        <section id="about" className="py-32 px-6 border-t border-accent/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="mono-label mb-6 block text-accent">{t.persona}</span>
              <h2 className="text-[18px] font-serif font-bold mb-8">{t.aboutTitle}</h2>
              <div className="space-y-6 text-[18px] font-normal text-ink/70 leading-[1.8] text-justify">
                {t.aboutText.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              
              <div className="mt-12 flex gap-8">
                <div>
                  <p className="text-3xl font-serif font-bold text-accent">100k+</p>
                  <p className="mono-label text-accent/60">{t.readers}</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-accent">500+</p>
                  <p className="mono-label text-accent/60">{t.cases}</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative aspect-square">
              <div className="absolute inset-0 border border-accent/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border border-accent/5 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
              <div className="absolute inset-12 rounded-full overflow-hidden border border-accent/20">
                <img 
                  src="/作者_潛水.jpg.jpg" 
                  alt="About Zi Long - Diving"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-40 px-6 bg-accent/[0.02] border-y border-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-[24px] md:text-[36px] font-serif italic leading-[1.8] text-white font-medium"
            >
              {t.quote}
            </motion.p>
          </div>
        </section>

        <Values lang={lang} />
        
        <Contact lang={lang} />
        
        {/* CTA Section */}
        <section className="py-40 px-6 text-center relative overflow-hidden border-t border-accent/10">
          <div className="absolute inset-0 bg-accent/[0.03] -z-10" />
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[36px] md:text-[42px] font-serif font-bold mb-8 leading-[1.4]">{t.ctaTitle}</h2>
            <p className="text-[18px] text-ink/60 mb-12 font-normal leading-[1.8]">
              {t.ctaDesc}
            </p>
            <button 
              onClick={() => setIsSubModalOpen(true)}
              className="px-12 py-5 bg-accent text-bg rounded-full font-bold text-[18px] hover:scale-105 transition-transform duration-300"
            >
              {t.subscribe}
            </button>
          </div>
        </section>
      </main>

      <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />

      <Footer lang={lang} />
    </div>
  );
}
