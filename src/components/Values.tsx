import { motion } from "motion/react";
import { Shield, Eye, Filter, Zap } from "lucide-react";
import { useState } from "react";
import DialogueModal from "./DialogueModal";
import ValueDetailModal from "./ValueDetailModal";
import { VALUE_TRANSLATIONS } from "../constants/valueTranslations";

const values = [
  {
    id: "01",
    icon: Eye,
  },
  {
    id: "02",
    icon: Filter,
  },
  {
    id: "03",
    icon: Shield,
  },
  {
    id: "04",
    icon: Zap,
  }
];

export default function Values({ lang }: { lang: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValueId, setSelectedValueId] = useState<string | null>(null);

  const t = {
    zh: {
      coreValues: "Core Values",
      noteTitle: "【子瓏的深度察覺筆記：24 則生存對話】",
      noteDesc: <>在別人的劇本裡，你只是個被命名的角色。<br/><br/>這 24 則對話分為兩部。第一部【關於我如何成為作家的 10 個 QA】記錄了我創作和覺察的真實過程；第二部為進階版【子瓏的深度察覺筆記】。<br/><br/>為了幫你找回失落的原初聲音，你可以由【子瓏的深度察覺筆記】 Q1 循序進入，剝離那些不屬於你的裝扮；或者利用以下「價值地圖」，在你需要的生存座標上，重新定義自己。</>,
      values: [
        {
          id: "01",
          title: "認知脫鉤術",
          description: "很多人都想看戲，但當你意識到那是別人想看的，你就有權脫掉那層外衣。",
          tags: ["投影", "投射", "自我察覺"]
        },
        {
          id: "02",
          title: "暗示過濾與邊界建構",
          description: "有一種傷，是連求救的力氣都沒有。\n當你足夠了解自己，外界的暗示與操控就無法傷你",
          tags: ["心理暗示", "情緒勒索", "認知主權"]
        },
        {
          id: "03",
          title: "理性的接住",
          description: "採取「我就爛」的心理策略，承認遭遇的當下，情緒就失去了操控你的力量。",
          tags: ["原生家庭", "非典型療癒", "邊界感"]
        },
        {
          id: "04",
          title: "生存效率",
          description: "管好自己就是對這個社會最大的貢獻",
          tags: ["管好自己", "防禦性智慧", "冷靜"]
        }
      ]
    },
    en: {
      coreValues: "Core Values",
      noteTitle: "[Zi Long's Deep Awareness Notes: 24 Survival Dialogues]",
      noteDesc: <>In others' scripts, you are just a named character.<br/><br/>These 24 dialogues are divided into two parts. Part I [10 QAs on How I Became a Writer] records the authentic process of my creation and awareness; Part II is the advanced version [Zi Long's Deep Awareness Notes].<br/><br/>To help you find your lost original voice, you can enter sequentially from Q1 of [Zi Long's Deep Awareness Notes] to strip away the costumes that don't belong to you; or use the "Value Map" below to redefine yourself on the survival coordinates you need.</>,
      values: [
        {
          id: "01",
          title: "Cognitive Decoupling",
          description: "Many people want to watch the show, but when you realize it's what others want to see, you have the right to take off that coat.",
          tags: ["Projection", "Transference", "Self-Awareness"]
        },
        {
          id: "02",
          title: "Suggestion Filtering & Boundary Construction",
          description: "There is a kind of wound where you don't even have the strength to call for help.\nWhen you understand yourself enough, external suggestions and manipulation cannot hurt you.",
          tags: ["Psychological Suggestion", "Emotional Blackmail", "Cognitive Sovereignty"]
        },
        {
          id: "03",
          title: "Rational Catching",
          description: "Adopt the psychological strategy of \"I'm just bad.\" The moment you acknowledge the encounter, emotions lose the power to manipulate you.",
          tags: ["Family of Origin", "Atypical Healing", "Sense of Boundaries"]
        },
        {
          id: "04",
          title: "Survival Efficiency",
          description: "Taking care of yourself is the greatest contribution to this society.",
          tags: ["Mind Your Own Business", "Defensive Wisdom", "Calmness"]
        }
      ]
    },
    ja: {
      coreValues: "Core Values",
      noteTitle: "【子瓏の深度察覚ノート：24の生存対話】",
      noteDesc: <>他人の台本の中では、あなたは単に名前を付けられた登場人物に過ぎません。<br/><br/>この24の対話は二部構成です。第一部【私が作家になるまでの10のQA】は、私の創作と気づきの真実のプロセスを記録しています。第二部は上級編【子瓏の深度察覚ノート】です。<br/><br/>失われた本来の声を取り戻すために、【子瓏の深度察覚ノート】のQ1から順に入り、自分のものではない装いを取り除くことができます。あるいは、以下の「バリューマップ」を利用して、必要な生存座標の上で自分を再定義してください。</>,
      values: [
        {
          id: "01",
          title: "認知デカップリング術",
          description: "多くの人が見物したがりますが、それが他人の見たいものだと気づいたとき、あなたはその上着を脱ぐ権利があります。",
          tags: ["投影", "投射", "自己認識"]
        },
        {
          id: "02",
          title: "暗示フィルタリングと境界構築",
          description: "助けを求める力さえないような傷があります。\n自分自身を十分に理解したとき、外部からの暗示や操作はあなたを傷つけることはできません。",
          tags: ["心理的暗示", "感情的ゆすり", "認知的主権"]
        },
        {
          id: "03",
          title: "理性的キャッチ",
          description: "「私はダメだ」という心理戦略を採用し、遭遇した瞬間を認めることで、感情はあなたを操作する力を失います。",
          tags: ["原家族", "非典型的癒やし", "境界感"]
        },
        {
          id: "04",
          title: "生存効率",
          description: "自分を律することこそが、この社会への最大の貢献です。",
          tags: ["自分を律する", "防御的知恵", "冷静"]
        }
      ]
    }
  }[lang as 'zh' | 'en' | 'ja'];

  const selectedContent = selectedValueId ? (VALUE_TRANSLATIONS[lang as keyof typeof VALUE_TRANSLATIONS].values as any)[selectedValueId] : null;

  return (
    <section id="values" className="py-32 px-6 border-y border-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="mono-label mb-4 block text-accent">{t.coreValues}</span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative px-8 py-4 border border-accent/30 rounded-xl text-accent font-serif text-[20px] md:text-[24px] font-medium mb-8 hover:bg-accent hover:text-bg transition-all duration-500 text-left"
            >
              {t.noteTitle}
            </button>
            <p className="text-white text-[18px] font-normal leading-[1.8]">
              {t.noteDesc}
            </p>
          </div>
        </div>

        <DialogueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} lang={lang} />
        
        {selectedContent && (
          <ValueDetailModal 
            isOpen={!!selectedValueId} 
            onClose={() => setSelectedValueId(null)} 
            title={selectedContent.title}
            content={selectedContent.content}
            lang={lang}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-accent/10 border border-accent/10">
          {t.values.map((value, index) => {
            const Icon = values[index].icon;
            return (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedValueId(value.id)}
                className="bg-gradient-to-br from-bg to-[#22211F] p-10 md:p-16 group hover:to-[#2A2926] transition-all duration-500 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="p-4 rounded-2xl bg-accent/5 group-hover:bg-accent group-hover:text-bg transition-all duration-500">
                    <Icon size={28} strokeWidth={1.5} className="text-accent group-hover:text-bg" />
                  </div>
                  <span className="font-mono text-4xl opacity-10 text-accent group-hover:opacity-30 transition-opacity duration-500">
                    {value.id}
                  </span>
                </div>
                
                <h3 className="text-[24px] md:text-[28px] font-serif font-medium mb-6 text-accent group-hover:translate-x-2 transition-transform duration-500">
                  {value.title}
                </h3>
                <p className="text-white/80 font-normal leading-[1.8] mb-8 whitespace-pre-line">
                  {value.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {value.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 border border-accent/20 rounded-full text-accent/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
