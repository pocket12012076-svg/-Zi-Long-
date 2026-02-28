import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookModal({ isOpen, onClose }: BookModalProps) {
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
            <div className="p-6 md:px-12 md:py-8 border-b border-accent/10 flex items-center justify-between bg-bg/50 backdrop-blur-sm sticky top-0 z-10">
              <div>
                <h3 className="text-accent mono-label mb-1">小說作品</h3>
                <h2 className="text-[18px] font-serif font-bold">傾聽我 接住我</h2>
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
                <h4 className="text-accent font-bold mb-8 border-b border-accent/10 pb-2 inline-block">內容簡介</h4>
                <div className="space-y-6 text-ink/80 leading-loose">
                  <p className="font-bold text-ink">★面對生前的暴力，她在死後化身貓咪，以柔軟回報生命中的苦痛。</p>
                  <p>
                    一次和家人的爭吵中，艾麗雅因不明原因意外墜樓，她在昏迷不醒的期間回到靈界，也回歸當初下凡受盡折磨前的樣子。在艾麗雅還沒搞清楚狀況時，就被上帝指派了任務──解救一個人。她醒來後化身成一隻名叫「莉婭」的黑色貓咪，並且必須在接下來的二十四個月中找出自己必須解救的對象。
                  </p>
                  <p>
                    貓咪莉婭重生後遇見了新主人、主人的朋友，和兩個徬徨的孩子──生活遭受暴力與冷漠的侵犯，他們只能舔舐傷痕累累的彼此，以尋求一絲慰藉；而貓咪看似旁觀一切，實則也不禁身陷其中，記憶深處彷彿有什麼準備破繭而出……
                  </p>
                  <p>
                    被分散的痛苦，最後如何拼湊回原狀？身為一隻貓的牠，又該如何完成上帝指派的任務？
                  </p>
                </div>
              </section>

              {/* Features */}
              <section>
                <h4 className="text-accent font-bold mb-8 border-b border-accent/10 pb-2 inline-block">本書特色</h4>
                <div className="space-y-4 text-ink/80 italic">
                  <p>★假使我們死前尚有未竟之事，在死後是否還能有機會放手一搏？</p>
                  <p>★生活以暴力及冷漠待我，我則化身為貓咪，給予生活柔軟和安寧。</p>
                </div>
              </section>

              {/* TOC */}
              <section>
                <h4 className="text-accent font-bold mb-8 border-b border-accent/10 pb-2 inline-block">目錄</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-ink/70 font-serif">
                  <p>落下</p>
                  <p>第一章 下課鐘響</p>
                  <p>第二章 新家</p>
                  <p>第三章 畫畫比賽</p>
                  <p>第四章 抽絲剝繭</p>
                  <p>第五章 刺青</p>
                  <p>第六章 冒險</p>
                  <p>第七章 約翰</p>
                  <p>第八章 去處</p>
                  <p>後記</p>
                </div>
              </section>

              {/* Details */}
              <section className="bg-accent/[0.03] p-8 rounded-2xl border border-accent/5">
                <h4 className="text-accent font-bold mb-6">詳細資料</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm text-ink/60">
                  <p><span className="mono-label mr-4">ISBN</span> 9789864458103</p>
                  <p><span className="mono-label mr-4">規格</span> 平裝 / 202頁 / 14.8 x 21 x 1.05 cm</p>
                  <p><span className="mono-label mr-4">叢書系列</span> 釀小說</p>
                  <p><span className="mono-label mr-4">分級</span> 普通級 / 單色印刷 / 初版</p>
                  <p><span className="mono-label mr-4">出版地</span> 台灣</p>
                  <p><span className="mono-label mr-4">分類</span> 文學小說 {">"} 華文創作 {">"} 溫馨療癒小說</p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-accent/10 bg-bg/50 backdrop-blur-sm flex justify-center">
              <button 
                onClick={onClose}
                className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-transform"
              >
                關閉作品集
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
