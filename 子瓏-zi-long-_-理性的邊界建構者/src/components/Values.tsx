import { motion } from "motion/react";
import { Shield, Eye, Filter, Zap } from "lucide-react";
import { useState } from "react";
import DialogueModal from "./DialogueModal";
import ValueDetailModal from "./ValueDetailModal";
import { VALUE_CONTENTS } from "../constants/valueContent";

const values = [
  {
    id: "01",
    title: "認知脫鉤術",
    description: "很多人都想看戲，但當你意識到那是別人想看的，你就有權脫掉那層外衣。",
    icon: Eye,
    tags: ["投影", "投射", "自我察覺"]
  },
  {
    id: "02",
    title: "暗示過濾與邊界建構",
    description: "有一種傷，是連求救的力氣都沒有。\n當你足夠了解自己，外界的暗示與操控就無法傷你",
    icon: Filter,
    tags: ["心理暗示", "情緒勒索", "認知主權"]
  },
  {
    id: "03",
    title: "理性的接住",
    description: "採取「我就爛」的心理策略，承認遭遇的當下，情緒就失去了操控你的力量。",
    icon: Shield,
    tags: ["原生家庭", "非典型療癒", "邊界感"]
  },
  {
    id: "04",
    title: "社會責任與生存效率",
    description: "管好自己就是對這個社會最大的貢獻",
    icon: Zap,
    tags: ["管好自己", "防禦性智慧", "冷靜"]
  }
];

export default function Values() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValueId, setSelectedValueId] = useState<string | null>(null);

  const selectedContent = selectedValueId ? (VALUE_CONTENTS as any)[selectedValueId] : null;

  return (
    <section id="values" className="py-32 px-6 border-y border-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="mono-label mb-4 block text-accent">Core Values</span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative px-8 py-4 border border-accent/30 rounded-xl text-accent font-serif text-[24px] md:text-[28px] font-medium mb-8 hover:bg-accent hover:text-bg transition-all duration-500"
            >
              【子瓏的深度察覺筆記：24 則生存對話】
            </button>
            <p className="text-ink text-[18px] font-normal leading-[1.8] whitespace-pre-line">
              在別人的劇本裡，你只是個被命名的角色。{"\n\n"}
              這 24 則對話分為兩部。第一部【關於我如何成為作家的 10 個 QA】記錄了我創作和覺察的真實過程；第二部為進階版【子瓏的深度察覺筆記】。{"\n\n"}
              為了幫你找回失落的原初聲音，你可以由【子瓏的深度察覺筆記】 Q1 循序進入，剝離那些不屬於你的裝扮；或者利用「價值地圖」，在你需要的生存座標上，重新定義自己。
            </p>
          </div>
        </div>

        <DialogueModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        
        {selectedContent && (
          <ValueDetailModal 
            isOpen={!!selectedValueId} 
            onClose={() => setSelectedValueId(null)} 
            title={selectedContent.title}
            content={selectedContent.content}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-accent/10 border border-accent/10">
          {values.map((value, index) => (
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
                  <value.icon size={28} strokeWidth={1.5} className="text-accent group-hover:text-bg" />
                </div>
                <span className="font-mono text-4xl opacity-10 text-accent group-hover:opacity-30 transition-opacity duration-500">
                  {value.id}
                </span>
              </div>
              
              <h3 className="text-[24px] md:text-[28px] font-serif font-medium mb-6 text-accent group-hover:translate-x-2 transition-transform duration-500">
                {value.title}
              </h3>
              <p className="text-ink font-normal leading-[1.8] mb-8 whitespace-pre-line">
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
          ))}
        </div>
      </div>
    </section>
  );
}
