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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

      <Header />
      
      <main>
        <Hero />
        
        {/* Quote Section */}
        <section className="py-40 px-6 bg-accent/[0.02] border-y border-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-[28px] md:text-[36px] font-serif italic leading-[1.8] text-ink/90 font-medium"
            >
              「當你足夠了解自己，你將發現：在別人的劇本之外，你其實擁有更多選擇。」
            </motion.p>
          </div>
        </section>

        <Values />
        
        <Contact />
        
        {/* About Section */}
        <section id="about" className="py-32 px-6 border-t border-accent/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="mono-label mb-6 block text-accent">The Persona</span>
              <h2 className="text-[18px] font-serif font-bold mb-8">關於作家-子瓏</h2>
              <div className="space-y-6 text-[18px] font-normal text-ink/70 leading-[1.8]">
                <p>
                  我是子瓏，26歲時獨自去日本生活兩年，28歲回國，30歲時意外出了小說，書名為:「傾聽我 接住我」。我是一位喜歡學習且樂於嘗試新事物的人，在我的世界觀裡，我追求冷靜且客觀的覺察。主張「人的行為皆具有目的性」來進行觀察和反思。
                </p>
                <p>
                  我是一個非討好型的人性觀察者。我負責聽見那些被憤怒、傷痛與社會期待所淹沒的、你內心最真實的聲音。
                </p>
              </div>
              
              <div className="mt-12 flex gap-8">
                <div>
                  <p className="text-3xl font-serif font-bold text-accent">100k+</p>
                  <p className="mono-label text-accent/60">Monthly Readers</p>
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-accent">500+</p>
                  <p className="mono-label text-accent/60">Case Studies</p>
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

        {/* CTA Section */}
        <section className="py-40 px-6 text-center relative overflow-hidden border-t border-accent/10">
          <div className="absolute inset-0 bg-accent/[0.03] -z-10" />
          <div className="max-w-2xl mx-auto">
            <h2 className="text-[36px] md:text-[42px] font-serif font-bold mb-8 leading-[1.4]">準備好奪回你的<br/><span className="italic text-accent">認知主權</span>了嗎？</h2>
            <p className="text-[18px] text-ink/60 mb-12 font-normal leading-[1.8]">
              不再被情緒勒索，不再為別人的劇本演出。從今天起，把察覺練成反射。
            </p>
            <button 
              onClick={() => setIsSubModalOpen(true)}
              className="px-12 py-5 bg-accent text-bg rounded-full font-bold text-[18px] hover:scale-105 transition-transform duration-300"
            >
              訂閱子瓏
            </button>
          </div>
        </section>
      </main>

      <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />

      <Footer />
    </div>
  );
}
