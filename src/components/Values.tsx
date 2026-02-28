import { motion } from "motion/react";
import React, { useState } from "react";
import { Shield, Target, Zap, Heart } from "lucide-react";
import ValueDetailModal from "./ValueDetailModal";
import { VALUE_TRANSLATIONS } from "../constants/valueTranslations";

interface ValuesProps {
  lang?: string;
}

export default function Values({ lang = "zh" }: ValuesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const t = {
    zh: {
      coreValues: "核心價值地圖",
      noteTitle: "生存筆記",
      noteDesc: "在理性的邊界內，重建你的心理主權。"
    },
    en: {
      coreValues: "Core Value Map",
      noteTitle: "Survival Notes",
      noteDesc: "Within the boundaries of rationality, rebuild your psychological sovereignty."
    },
    ja: {
      coreValues: "コアバリューマップ",
      noteTitle: "生存ノート",
      noteDesc: "理性の境界内で、あなたの心理的主権を再構築します。"
    }
  }[lang as 'zh' | 'en' | 'ja'];

  const values = [
    { id: "01", icon: <Target size={24} /> },
    { id: "02", icon: <Shield size={24} /> },
    { id: "03", icon: <Heart size={24} /> },
    { id: "04", icon: <Zap size={24} /> }
  ];

  const currentTranslations = VALUE_TRANSLATIONS[lang as 'zh' | 'en' | 'ja'].values;
  const selectedContent = selectedId ? currentTranslations[selectedId as keyof typeof currentTranslations] : null;

  return (
    <section id="values" className="py-32 px-6 bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="mono-label mb-6 block text-accent">Strategic Framework</span>
            <h2 className="text-[36px] md:text-[42px] font-serif font-bold text-white">{t.coreValues}</h2>
          </div>
          <div className="max-w-md text-right">
            <p className="text-[18px] text-white/80 font-serif italic mb-2">{t.noteTitle}</p>
            <p className="text-white/60 text-sm">{t.noteDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-accent/10 border border-accent/10">
          {values.map((value) => {
            const trans = currentTranslations[value.id as keyof typeof currentTranslations];
            return (
              <motion.div
                key={value.id}
                whileHover={{ backgroundColor: "rgba(194, 178, 128, 0.03)" }}
                onClick={() => setSelectedId(value.id)}
                className="bg-bg p-12 cursor-pointer transition-colors group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <span className="text-[10px] font-mono text-accent/40 mb-8 block group-hover:text-accent transition-colors">
                    {value.id}
                  </span>
                  <div className="text-accent mb-8 transform group-hover:scale-110 transition-transform duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-[20px] font-serif font-bold mb-4 text-white group-hover:text-accent transition-colors">
                    {trans.title}
                  </h3>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <ValueDetailModal 
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        title={selectedContent?.title || ""}
        content={selectedContent?.content || []}
        lang={lang}
      />
    </section>
  );
}
