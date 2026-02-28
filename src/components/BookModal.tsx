import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
}

export default function BookModal({ isOpen, onClose, lang = "zh" }: BookModalProps) {
  const t = {
    zh: {
      label: "小說作品",
      title: "傾聽我 接住我",
      introTitle: "內容簡介",
      introSub: "★面對生前的暴力，她在死後化身貓咪，以柔軟回報生命中的苦痛。",
      introP1: "一次和家人的爭吵中，艾麗雅因不明原因意外墜樓，她在昏迷不醒的期間回到靈界，也回歸當初下凡受盡折磨前的樣子。在艾麗雅還沒搞清楚狀況時，就被上帝指派了任務──解救一個人。她醒來後化身成一隻名叫「莉婭」的黑色貓咪，並且必須在接下來的二十四個月中找出自己必須解救的對象。",
      introP2: "貓咪莉婭重生後遇見了新主人、主人的朋友，和兩個徬徨的孩子──生活遭受暴力與冷漠的侵犯，他們只能舔舐傷痕累累的彼此，以尋求一絲慰藉；而貓咪看似旁觀一切，實則也不禁身陷其中，記憶深處彷彿有什麼準備破繭而出……",
      introP3: "被分散的痛苦，最後如何拼湊回原狀？身為一隻貓的牠，又該如何完成上帝指派的任務？",
      featureTitle: "本書特色",
      feature1: "★假使我們死前尚有未竟之事，在死後是否還能有機會放手一搏？",
      feature2: "★生活以暴力及冷漠待我，我則化身為貓咪，給予生活柔軟和安寧。",
      tocTitle: "目錄",
      tocItems: ["落下", "第一章 下課鐘響", "第二章 新家", "第三章 畫畫比賽", "第四章 抽絲剝繭", "第五章 刺青", "第六章 冒險", "第七章 約翰", "第八章 去處", "後記"],
      detailTitle: "詳細資料",
      detailItems: [
        { label: "ISBN", value: "9789864458103" },
        { label: "規格", value: "平裝 / 202頁 / 14.8 x 21 x 1.05 cm" },
        { label: "叢書系列", value: "釀小說" },
        { label: "分級", value: "普通級 / 單色印刷 / 初版" },
        { label: "出版地", value: "台灣" },
        { label: "分類", value: "文學小說 > 華文創作 > 溫馨療癒小說" }
      ],
      close: "關閉作品集"
    },
    en: {
      label: "Novel Work",
      title: "Listen to Me, Catch Me",
      introTitle: "Introduction",
      introSub: "★ Facing violence in life, she transforms into a cat after death, repaying life's pain with softness.",
      introP1: "During a quarrel with her family, Aria accidentally fell from a building for unknown reasons. While unconscious, she returned to the spiritual realm and to her original form before descending to earth to suffer. Before Aria could figure out the situation, she was assigned a task by God—to save a person. She woke up as a black cat named 'Leah' and must find the person she needs to save within the next twenty-four months.",
      introP2: "After being reborn, the cat Leah met her new owner, the owner's friend, and two wandering children—their lives violated by violence and indifference, they could only lick each other's scarred bodies for a sliver of comfort. While the cat seemed to be an observer, she couldn't help but get involved, as if something in the depths of her memory was about to break out of its cocoon...",
      introP3: "How will the scattered pain eventually be pieced back together? As a cat, how will she complete the task assigned by God?",
      featureTitle: "Book Features",
      feature1: "★ If we still have unfinished business before death, can we still have a chance to give it our all after death?",
      feature2: "★ Life treats me with violence and indifference; I transform into a cat, giving life softness and peace.",
      tocTitle: "Table of Contents",
      tocItems: ["The Fall", "Chapter 1: The School Bell Rings", "Chapter 2: New Home", "Chapter 3: Drawing Competition", "Chapter 4: Unraveling the Threads", "Chapter 5: Tattoo", "Chapter 6: Adventure", "Chapter 7: John", "Chapter 8: Where to Go", "Afterword"],
      detailTitle: "Details",
      detailItems: [
        { label: "ISBN", value: "9789864458103" },
        { label: "Format", value: "Paperback / 202 pages / 14.8 x 21 x 1.05 cm" },
        { label: "Series", value: "Brewing Novels" },
        { label: "Rating", value: "General / Monochrome Printing / First Edition" },
        { label: "Origin", value: "Taiwan" },
        { label: "Category", value: "Literary Fiction > Chinese Creation > Healing Fiction" }
      ],
      close: "Close"
    },
    ja: {
      label: "小説作品",
      title: "傾聽我 接住我（私を聴いて、私を受け止めて）",
      introTitle: "内容紹介",
      introSub: "★生前の暴力に直面し、死後に猫へと転生。人生の苦痛を柔らかさで報いる。",
      introP1: "家族との喧嘩の最中、アリアは原因不明のままビルから転落した。意識不明の間、彼女は霊界に戻り、地上に降りて苦しむ前の本来の姿へと帰った。状況を把握する間もなく、アリアは神から「ある人を救う」という任務を授けられた。彼女が目覚めると、「リヤ」という名の黒猫になっていた。彼女はこれからの24ヶ月の間に、自分が救わなければならない相手を見つけ出さなければならない。",
      introP2: "転生した猫のリヤは、新しい飼い主、飼い主の友人、そして二人の彷徨える子供たちに出会った。暴力と無関心に侵された生活の中で、彼らは互いの傷だらけの体を舐め合い、一筋の慰めを求めることしかできなかった。猫は傍観しているように見えたが、実は彼女自身も深く関わらざるを得なくなり、記憶の奥底で何かが繭を破って出てこようとしているかのようだった……。",
      introP3: "分散された苦痛は、最終的にどのように元の形に繋ぎ合わされるのか？一匹の猫として、彼女はどのようにして神から授けられた任務を遂行するのか？",
      featureTitle: "本書の特色",
      feature1: "★もし死ぬ前にやり残したことがあるとしたら、死後にもう一度勝負するチャンスはあるだろうか？",
      feature2: "★人生が暴力と無関心で私に接するなら、私は猫になり、人生に柔らかさと安らぎを与える。",
      tocTitle: "目次",
      tocItems: ["落下", "第一章 下校のチャイム", "第二章 新しい家", "第三章 絵画コンクール", "第四章 糸を解く", "第五章 タトゥー", "第六章 冒険", "第七章 ジョン", "第八章 行き先", "後書き"],
      detailTitle: "詳細情報",
      detailItems: [
        { label: "ISBN", value: "9789864458103" },
        { label: "仕様", value: "ソフトカバー / 202ページ / 14.8 x 21 x 1.05 cm" },
        { label: "シリーズ", value: "醸小説" },
        { label: "等級", value: "一般 / モノクロ印刷 / 初版" },
        { label: "出版地", value: "台湾" },
        { label: "分類", value: "文学小説 > 華文創作 > 癒やし小説" }
      ],
      close: "閉じる"
    }
  }[lang as 'zh' | 'en' | 'ja'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] overflow-y-auto bg-bg/80 backdrop-blur-md flex items-center justify-center p-4 py-12 md:py-20"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#1A1A1A] border border-accent/30 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-6 md:px-12 md:py-8 border-b border-accent/10 flex items-center justify-between bg-bg/5 backdrop-blur-sm sticky top-0 z-10">
              <div>
                <h3 className="text-accent mono-label mb-1">{t.label}</h3>
                <h2 className="text-[18px] font-serif font-bold text-white">{t.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-accent/10 rounded-full transition-colors text-accent"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar space-y-16">
              {/* Intro */}
              <section>
                <h4 className="text-accent font-bold mb-8 border-b border-accent/10 pb-2 inline-block">{t.introTitle}</h4>
                <div className="space-y-6 text-white/80 leading-loose">
                  <p className="font-bold text-white">{t.introSub}</p>
                  <p>{t.introP1}</p>
                  <p>{t.introP2}</p>
                  <p>{t.introP3}</p>
                </div>
              </section>

              {/* Features */}
              <section>
                <h4 className="text-accent font-bold mb-8 border-b border-accent/10 pb-2 inline-block">{t.featureTitle}</h4>
                <div className="space-y-4 text-white/80 italic">
                  <p>{t.feature1}</p>
                  <p>{t.feature2}</p>
                </div>
              </section>

              {/* TOC */}
              <section>
                <h4 className="text-accent font-bold mb-8 border-b border-accent/10 pb-2 inline-block">{t.tocTitle}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70 font-serif">
                  {t.tocItems.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </div>
              </section>

              {/* Details */}
              <section className="bg-accent/[0.03] p-8 rounded-2xl border border-accent/5">
                <h4 className="text-accent font-bold mb-6">{t.detailTitle}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm text-white/60">
                  {t.detailItems.map((item, i) => (
                    <p key={i}><span className="mono-label mr-4">{item.label}</span> {item.value}</p>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-accent/10 bg-bg/5 backdrop-blur-sm flex justify-center">
              <button 
                onClick={onClose}
                className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-transform"
              >
                {t.close}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
