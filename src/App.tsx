import React, { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Menu, X, Facebook, Instagram, AtSign, Globe, ChevronDown, 
  Shield, Eye, Filter, Zap, MessageSquareQuote, BellRing, CheckCircle2,
  ArrowRight, ExternalLink
} from "lucide-react";

// --- 1. 預留詳細對話翻譯資料庫 (稍後補上) ---
const VALUE_TRANSLATIONS_DATA: any = {
  zh: {
    author: {
      label: "作者介紹",
      name: "子瓏",
      birth: "1992年生，現居台灣。",
      desc: "不喜歡一成不變的生活，喜歡徜徉在自己的想像世界，跳入文字的異世界中展開無數場驚奇冒險；如果遇上觸動內心、發自靈魂而渴望的事物，則會義無反顧地投入、身體力行去實踐。",
      close: "關閉介紹"
    },
    book: {
      label: "小說作品",
      title: "傾聽我 接住我",
      introTitle: "內容簡介",
      introSub: "★面對生前的暴力，她在死後化身貓咪，以柔軟回報生命中的苦痛。",
      introP1: "一次和家人的爭吵中，艾麗雅因不明原因意外墜樓，她在昏迷不醒的期間回到靈界，也回歸當初下凡受盡折磨前的樣子。在艾麗雅還沒搞清楚狀況時，就被上帝指派了任務──解救一個人。她醒來後化身成一隻名叫「莉婭」的黑色貓咪，並且必須在接下來的二十四個月中找出自己必須解救的對象。",
      introP2: "貓咪莉婭重生後遇見了新主人、主人的朋友，和兩個徬徨的孩子──生活遭受暴力與冷漠的侵犯，他們只能舔舐傷痕累累的彼此，以尋求一絲慰藉；而貓咪看似旁觀一切，實則也不禁身陷其中，記憶深處彷彿有什麼準備破繭而出……",
      introP3: "被分散的痛苦，最後如何拼湊回原狀？身為一隻貓的牠，又該如何完成上帝指派的任務？",
      close: "關閉作品集"
    },
    values: {
      "01": {
        title: "認知脫鉤術",
        content: [
          {
            section: "【關於我如何成為作家的10個QA】",
            qa: [{ id: "Q6", q: "妳的故事中似乎看不到希望，是因為妳觀察到這社會對受害者要求很高，例如要活得勵志，或是對受害者的表現有一定的看法？", a: "是的，我不想寫得太完美（簡單），我所謂的完美是，好像你只要求救了就會有人理你；你只要說「不」，對方就會停止；或是只要找到對的人就能獲獲救。因為在現實中，根本不會是那樣。\n其中一個令人失望的事，是社會對受傷的人有太多期待，總認為唯一出路是「活得勵志」，一旦你做不到，就被認為是你的問題。這讓我意識到其實很多人只是想看戲。這種期待會讓痛苦的人更困惑，因為總有人認為你活得不夠勵志，或認為你不可能這麼快走出來。但這其實都是一種「暗示」，我們都是在家庭和社會的暗示下長大，如果意識到自己的行為是受他人暗示的驅使，那麼脫掉這層外衣是必要的。只要察覺到了，你就有選擇權。" }]
          }
        ]
      },
      "02": {
        title: "暗示過濾與邊界建構",
        content: [
          {
            section: "【關於我如何成為作家的10個QA】",
            qa: [{ id: "Q7", q: "作品深受《第十四道門》中黑貓名言的影響——「我們知道自己是誰，所以不需要名字」。這如何連結到妳說的「當有人比妳更了解妳時，處境會變得很危險」？", a: "那句「我們知道自己是誰，所以不需要名字」就是我想說的「自我察覺」。這社會充滿了想幫你命名（暗示）的人，他們懷疑你的情緒，又要求你樂觀，甚至表現得比你還懂該怎麼痛。若你允許這些「名字」在身上紮根，你就離真正的自己越遠。\n透過自我察覺，我奪回了定義權。當我足夠了解自己，我就不再需要依賴別人給的名字，也有能力判斷對方的「行為」究竟是真心，還是純粹的惡意。\n我對人性其實是相當悲觀的。因為人終究是動物，在弱肉強食的潛意識基因裡，求救會被視為弱的表現。這也是危險所在——當你釋放弱點時，有些人會意識到你是可以被欺負的，甚至把求救者當成笨蛋，趁機操控你。但求救有很多種呈現方式，不一定都要傷痕累累、楚楚可憐. 有時候受傷太重，就像身體遭受重創，你連回應的力氣都沒有。這種「沉默的呼救」，其實很少人能看得出來。" }]
          }
        ]
      },
      "03": {
        title: "理性的接住",
        content: [
          {
            section: "【關於我如何成為作家的10個QA】",
            qa: [{ id: "Q8", q: "在面對創傷帶來的負面情緒時，妳提到的「我就爛」態度，是一種什麼樣的心理策略？", a: "情緒是一種本能反應，而人身為動物無法控制本能是正常的。但情緒隨之帶來的是力量，那股力量能驅使我們的行為，也能傷害自己本身。\n所以當過往中，已成事實的傷痛又來襲擊你時，唯一能做的就是對那情緒坦白——或者說是「擺爛」：「我就是被如何了」、「我就是遭遇了什麼」。\n當你承認的當下，情緒就無法再操控你的行為或攻擊你的思想，壓力反而會獲得紓解。接下來，才談得上所謂的面對與放下。" }]
          }
        ]
      },
      "04": {
        title: "生存效率",
        content: [
          {
            section: "【關於我如何成為作家的10個QA】",
            qa: [{ id: "Q3", q: "很多作家是為了「夢想」而下筆，但聽說妳的契機是一場「失望」所帶來的意外收穫？", a: "我曾讀到一本很紅的翻譯文學，讀完卻因為完全找不到共鳴而感到失望（當然，這與文化背景和個人偏好有關）。\n當時我就想：「如果這類型的作品能讓許多人產生共鳴，那我是不是也能寫出屬於自己風格的作品？」我甚至覺得，就算寫得不夠成熟也無妨，或許還能刺激別人產生「我也能寫」的動力，這樣看來，嘗試寫作怎樣都不算虧。" }]
          }
        ]
      }
    },
    dialogues: {
      Q1: { q: "從童年在圖書館集點讀書，到現在維持讀後書寫的習慣，閱讀似乎是妳生命中不曾間斷的節奏。在這個快節奏的時代，選擇慢讀、慢思，對妳而言有什麼樣的魅力？", a: "童年時在閱讀中獲得的成就感，源自於國小導師的要求。老師讓我們每週去圖書館選一本書，讀完後寫下心得就能集點，滿點後可以換取獎狀。這讓我們班經常集體上台領獎，我也在過程中發現，完成閱讀與書寫這件事本身就能帶來滿足感。\n這份節奏隨著我成長一直陪伴著我。現在回頭看，閱讀故事不只是吸收內容，它讓我能不斷地思考，並願意停下腳步將想法整理成文字。不知不覺中，書寫成了我了解自己、整理情緒，並與世界溝通的一種方式。", title: "閱讀的節奏" },
      Q2: { q: "妳曾提到王永慶的一段話影響了妳對小說的看法，那是如何植入妳腦海的？為什麼妳至今仍相信「小說」具有救贖的力量？", a: "高中時，在王永慶的書中讀到，他認為小說是作者經驗的延伸。這讓我私下覺得，在小說的世界裡可以學到很多東西。長大後實用工具書盛行，但在觀察自己的過程中，我愈發覺得在小說建構的世界裡能學到的，遠比工具書來得多。\n\n虛構紮根於現實，講述的都是人與人的故事。小說有情境，我能跟著主角一起感受、驚訝，甚至察覺彼此的不同，並內化成自己的經驗。就像國小老師教我們寫「禮義廉恥」，但有多少人真的理解其中的含義？又有多少人真的在實踐呢？", title: "小說的力量" },
      Q3: { q: "許多作家是為了「夢想」而下筆，但聽說妳的契機是一場「失望」所帶來的意外收穫？", a: "我曾讀到一本很紅的翻譯文學，讀完卻因為完全找不到共鳴而感到失望（當然，這與文化背景和個人偏好有關）。\n當時我就想：「如果這類型的作品能讓許多人產生共鳴，那我是不是也能寫出屬於自己風格的作品？」我甚至覺得，就算寫得不夠成熟也無妨，或許還能刺激別人產生「我也能寫」的動力，這樣看來，嘗試寫作怎樣都不算虧。", title: "失望的收穫" },
      Q4: { q: "妳的作品中有一套很特殊的「人生劇本論」，這份靈感從何而來？", a: "當時我也在讀另一本書，書中提到孩子出生後仍保有與神對話的記憶。這讓我感覺人出生就是神的演員，各自帶著劇本來展開人生。也就是說，我們的靈魂本來是相親相愛的，只是喝了孟婆湯、演了戲，才影響了對彼此的態度。", title: "人生劇本論" },
      Q5: { q: "第一次提筆的妳，是如何摸索出小說的節奏感？", a: "我只是因為讀了很多小說，所以動筆時直覺地知道哪裡該停頓、哪裡該切換場景。一開始我甚至不知道自己想表達什麼，只是「先寫再說」，事後才分章節。直到出版社定下書名，我才恍然大悟：對！我想說的是——「我不想被指手畫腳或說教，我想要被傾聽、被接住」。", title: "創作的節奏" },
      Q6: { q: "妳的故事中似乎看不到希望，是因為妳觀察到這社會對受害者要求很高，例如要活得勵志，或是對受害者的表現有一定的看法？", a: "是的，我不想寫得太完美（簡單），我所謂的完美是，好像你只要求救了就會有人理你；你只要說「不」，對方就會停止；或是只要找到對的人就能獲獲救。因為在現實中，根本不會是那樣。\n其中一個令人失望的事，是社會對受傷的人有太多期待，總認為唯一出路是「活得勵志」，一旦你做不到，就被認為是你的問題。這讓我意識到其實很多人只是想看戲。這種期待會讓痛苦的人更困惑，因為總有人認為你活得不夠勵志，或認為你不可能這麼快走出來。但這其實都是一種「暗示」，我們都是在家庭和社會的暗示下長大，如果意識到自己的行為是受他人暗示的驅使，那麼脫掉這層外衣是必要的。只要察覺到了，你就有選擇權。", title: "社會的暗示" },
      Q7: { q: "作品深受《第十四道門》中黑貓名言的影響——「我們知道自己是誰，所以不需要名字」。這如何連結到妳說的「當有人比妳更了解妳時，處境會變得很危險」？", a: "那句「我們知道自己是誰，所以不需要名字」就是我想說的「自我察覺」。這社會充滿了想幫你命名（暗示）的人，他們懷疑你的情緒，又要求你樂觀，甚至表現得比你還懂該怎麼痛。若你允許這些「名字」在身上紮根，你就離真正的自己越遠。\n透過自我察覺，我奪回了定義權。當我足夠了解自己，我就不再需要依賴別人給的名字，也有能力判斷對方的「行為」究竟是真心，還是純粹的惡意。\n我對人性其實是相當悲觀的。因為人終究是動物，在弱肉強食的潛意識基因裡，求救會被視為弱的表現。這也是危險所在——當你釋放弱點時，有些人會意識到你是可以被欺負的，甚至把求救者當成笨蛋，趁機操控你。但求救有很多種呈現方式，不一定都要傷痕累累、楚楚可憐. 有時候受傷太重，就像身體遭受重創，你連回應的力氣都沒有。這種「沉默的呼救」，其實很少人能看得出來。", title: "名字與定義權" },
      Q8: { q: "在面對創傷帶來的負面情緒時，妳提到的「我就爛」態度，是一種什麼樣的心理策略？", a: "情緒是一種本能反應，而人身為動物無法控制本能是正常的。但情緒隨之帶來的是力量，那股力量能驅使我們的行為，也能傷害自己本身。\n所以當過往中，已成事實的傷痛又來襲擊你時，唯一能做的就是對那情緒坦白——或者說是「擺爛」：「我就是被如何了」、「我就是遭遇了什麼」。\n當你承認的當下，情緒就無法再操控你的行為或攻擊你的思想，壓力反而會獲得紓解。接下來，才談得上所謂的面對與放下。", title: "「我就爛」策略" },
      Q9: { q: "這部作品中，隱藏了多少妳現實生活的「私物」？", a: "靈感不足時，我借用了在日本的生活經驗來豐富角色的背景。後來以為小說寫完了，開始寫短篇，發現其中幾篇真的寫得很好，就乾脆把其中一個角色改成詩人，把自己的詩放了進去。", title: "真實的私物" },
      Q10: { q: "妳常說覺察會改變妳，當妳的思考產生質變時，會影響妳對這部處女作的看法嗎？", a: "我有把每次讀後感當成日記的習慣，心得代表那個年紀對那本書的看法。隨著成長，讀同一本書的心境一定會不同。這部小說也一樣，記錄了我三十歲時對社會與生命的看法，那是非常美好的。\n只是隨著文筆進步，我會看到這部小說更多缺點，但那也是留給未來的彩蛋。", title: "變動的視角" },
      Q11: { q: "在「關於我成為作家的10個QA」採訪Q6中，妳提到「人是在暗示下長大」，有沒有甚麼例子可以讓人更深刻的體會到甚麼叫暗示呢？", a: "我遇過一個女孩，家裡重男輕女極深，母親因為懷了女孩導致被婆婆虐待、被丈夫背叛，所以媽媽把一切仇恨都發洩在女孩的身上，後來弟弟誕生了，一切暴力似乎可以停止了。但弟弟因為感受的到媽媽的怨恨也變得非常憎恨姊姊，甚至會動手打她。\n她跟我說她從不怪她弟弟，弟弟只是聽媽媽的話，是個孝順的孩子。她說她的媽媽並不知道她有多討厭她；她的弟弟不知道他其實很愛她。她認為他們姊弟都是乖孩子，她意識到這個家不需要她，所以滿足媽媽的暗示離得他們遠遠的，但他們姊弟誰都沒有錯。\n以上正如我所說的「人是在暗示下長大」，你認為那位姊姊究竟做錯了甚麼？可以讓她弟弟恨到如此？而弟弟又為何可以膨脹到無法無邊？", title: "暗示實例" },
      Q12: { q: "呈上題，除了意識到暗示以外，讀者們也想知道還有甚麼其他保護自己的方式？", a: "試著讓感性無限延伸地去體會這世界所擁有的黑暗面並接受和承認；讓理性保有權利去看見世界的良善面。\n我不否認傷痛的存在、不合理化惡的行為，暴力是一定且必然的存在，但我也必須捍衛自己的理性，讓理性引領我活下去。\n這也許很矛盾且困難，但其實這樣可以給自己有很多權利去選擇你的下一步，就像Q1的姊姊選擇理性地離開和活下去。", title: "保護的方法" }
    }
  },
  en: {
    author: { label: "About Author", name: "Zi Long", birth: "Born in 1992, Taiwan.", desc: "Dislikes a monotonous life, loves to wander in her own imaginary world...", close: "Close" },
    book: { label: "Novel Work", title: "Listen to Me, Catch Me", introTitle: "Introduction", introSub: "★ Facing violence in life, she transforms into a cat after death.", introP1: "Aria accidentally fell from a building. While unconscious, she woke up as a black cat named 'Leah'...", introP2: "Leah met her new owner and two wandering children...", introP3: "How will she complete the task assigned by God?", close: "Close" },
    values: {
      "01": { title: "Cognitive Decoupling", content: [{ section: "[10 QAs on How I Became a Writer]", qa: [{ id: "Q6", q: "There seems to be no hope in your story...", a: "Yes, I don't want to write too perfectly. Society expects victims to 'live inspirationally'..." }] }] }
    },
    dialogues: {
      Q1: { q: "From childhood reading to writing habits now...", a: "The sense of achievement I gained from reading in childhood stemmed from my elementary school tutor's requirements...", title: "Reading Rhythm" },
      Q2: { q: "Why do you believe 'novels' have the power of redemption?", a: "In high school, I felt that novels are an extension of experience. Fiction is rooted in reality...", title: "Power of Novels" },
      Q3: { q: "Was your writing journey started by 'disappointment'?", a: "I once read a popular translated work but felt no resonance. I thought: 'Can I write something in my own style?'", title: "Gain of Disappointment" },
      Q4: { q: "Where did 'Life Script Theory' come from?", a: "I read that children retain memories of talking with God. This makes me feel people are born as God's actors.", title: "Life Script Theory" },
      Q5: { q: "How did you find the rhythm for your first novel?", a: "I instinctively knew where to pause. At first, I just 'wrote first and talked later'.", title: "Creation Rhythm" },
      Q6: { q: "Why is there little hope in your stories?", a: "I don't want to write too perfectly. Society expects victims to 'live inspirationally'. Awareness gives you choice.", title: "Social Suggestions" },
      Q7: { q: "How does 'We know who we are' connect to danger?", a: "Self-awareness is key. By knowing myself, I take back the right to define.", title: "Names and Definition" },
      Q8: { q: "What is the 'I'm just bad' strategy?", a: "Emotion is an instinctive reaction. When past pain attacks, be honest with that emotion.", title: "I'm Just Bad" },
      Q9: { q: "How much of your real life is in the work?", a: "I borrowed my living experience in Japan to enrich characters.", title: "Real Private Items" },
      Q10: { q: "Will your changing thoughts affect your view of this debut?", a: "Thoughts represent the view at a certain age. This novel records my views at thirty.", title: "Changing Perspectives" },
      Q11: { q: "Can you give an example of growing up under suggestions?", a: "I met a girl whose family favored boys. They were all 'good children' following suggestions.", title: "Example of Suggestion" },
      Q12: { q: "How can readers protect themselves?", a: "Let sensibility experience the dark side; let rationality see the goodness.", title: "Methods of Protection" }
    }
  },
  ja: {
    author: { label: "作家紹介", name: "子瓏", birth: "1992年生まれ、台湾在住。", desc: "単調な生活を好まず、想像の世界に浸ることを好む...", close: "閉じる" },
    book: { label: "小説作品", title: "傾聴我 接住我", introTitle: "内容紹介", introSub: "★生前の暴力に直面し、死後に猫へと転生。", introP1: "アリアは原因不明のままビルから転落した。目覚めると、「リヤ」という名の黒猫になっていた...", introP2: "転生した猫のリヤは、新しい飼い主と二人の子供たちに出会った...", introP3: "一匹の猫として、彼女はどのようにして神から授けられた任務を遂行するのか？", close: "閉じる" },
    values: {
      "01": { title: "認知デカップリング術", content: [{ section: "【私が作家になるまでの10のQA】", qa: [{ id: "Q6", q: "あなたの物語には希望が見えないようです...", a: "はい、完璧に書きすぎたくないのです。社会は被害者に『励みになる生き方』を求めますが..." }] }] }
    },
    dialogues: {
      Q1: { q: "図書館で本を読んでいた子供時代から現在まで...", a: "子供の頃の読書での達成感は、小学校の先生の要求から始まりました...", title: "読書のリズム" },
      Q2: { q: "なぜ「小説」には救済の力があると信じているのですか？", a: "高校時代、小説は著者の経験の延長であると感じました。フィクションは現実に根ざし...", title: "小説の力" },
      Q3: { q: "執筆のきっかけは「失望」だったのですか？", a: "ある人気作品に共感できず失望した時、「自分なりのスタイルの作品を書けるのではないか」と思いました。", title: "失望の収穫" },
      Q4: { q: "「人生脚本論」はどこから来たのですか？", a: "子供は神と対話した記憶を保持しているという本を読みました。人間は神の役者として脚本を持って生まれてくるのだと感じました。", title: "人生脚本論" },
      Q5: { q: "最初の小説のリズムはどう掴みましたか？", a: "多くの小説を読んでいたので、直感的に休止やシーンの切り替えが分かりました。", title: "創作のリズム" },
      Q6: { q: "なぜ物語に希望が見えないのですか？", a: "完璧に書きすぎたくないからです。社会は被害者に『励みになる生き方』を求めますが、それは暗示です。", title: "社会の暗示" },
      Q7: { q: "「名前は必要ない」という言葉と危険はどう結びつきますか？", a: "自己察覚が重要です。自分を知ることで定義権を取り戻せます。", title: "名前と定義権" },
      Q8: { q: "「私はダメだ」という戦略は何ですか？", a: "感情は本能的な反応です。過去の痛みが襲ってきた時、その感情に正直になってください。", title: "私はダメだ" },
      Q9: { q: "実生活の「私物」はどれくらい隠されていますか？", a: "日本での生活経験をキャラクターの背景に借用しました。", title: "真実の私物" },
      Q10: { q: "思考の変化はデビュー作への見方に影響しますか？", a: "感想はその年齢での見方を表します。この小説は三十歳の時の社会と人生への見方を記録したものです。", title: "変化する視点" },
      Q11: { q: "暗示の下で育つ例を教えてください。", a: "男尊女卑の激しい家庭の女の子に会いました。彼らは暗示に従う「良い子」でした。", title: "暗示の実例" },
      Q12: { q: "自分を守るための他の方法はありますか？", a: "感性で闇を認め、理性で世界の善良さを見る権利を持ってください。", title: "保護の方法" }
    }
  }
};

// --- 2. 基礎圖示元件 ---
const MinimalCat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
    <path d="M12 18c-4 0-5-2-5-6s1-8 5-8 5 4 5 8-1 6-5 6z" />
    <path d="M8 6L7 4M16 6l1-2" />
    <circle cx="10" cy="11" r="0.5" fill="currentColor" />
    <circle cx="14" cy="11" r="0.5" fill="currentColor" />
    <path d="M12 13v1" />
  </svg>
);

// --- 3. 介面翻譯內容 ---
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
        { id: "01", title: "認知脫鉤術", desc: "很多人都想看戲，但當你意識到那是別人想看的，你就有權脫掉那層外衣。", tags: ["投影", "投射", "自我察覺"] },
        { id: "02", title: "暗示過濾與邊界建構", desc: "有一種傷，是連求救的力氣都沒有。當你足夠了解自己，外界的暗示與操控就無法傷你。", tags: ["心理暗示", "情緒勒索", "認知主權"] },
        { id: "03", title: "理性的接住", desc: "採取「我就爛」的心理策略，承認遭遇的當下，情緒就失去了操控你的力量。", tags: ["原生家庭", "非典型療癒", "邊界感"] },
        { id: "04", title: "生存效率", desc: "管好自己就是對這個社會最大的貢獻。", tags: ["管好自己", "防禦性智慧", "冷靜"] }
      ]
    },
    contact: {
      title: "試著讓我接住你的聲音",
      quote: "「合作是價值的對等交換。為了確保我們的時間都用在最有意義的察覺與建構上，請在來信前確認你的意圖。」",
      labels: { category: "1. 分類選項", name: "2. 姓名", email: "3. 電子信箱", content: "4. 內容" },
      placeholders: { category: "請選擇類別", name: "你的稱呼", content: "在此輸入描述..." },
      submit: "送出聲音",
      footer: "「我會認真傾聽每一個被淹沒的聲音。通常會在 3 個工作天內做出回應。」"
    },
    footer: {
      desc: "理性的邊界建構者。致力於在紛擾的人性中，為你聽見被淹沒的聲音，找回你的選擇權。",
      subTitle: "Subscription",
      subDesc: "訂閱《人性觀察週報》，每週一次理性覺察筆記。",
      subBtn: "訂閱週報",
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
        { id: "01", title: "Cognitive Decoupling", desc: "When you realize it's what others want to see, you have the right to take off that coat.", tags: ["Projection", "Self-Awareness"] },
        { id: "02", title: "Suggestion Filtering", desc: "When you understand yourself enough, external suggestions cannot hurt you.", tags: ["Sovereignty", "Boundaries"] },
        { id: "03", title: "Rational Catching", desc: "Adopt the strategy of 'I'm just bad.' Emotions lose power to manipulate you.", tags: ["Healing", "Rationality"] },
        { id: "04", title: "Survival Efficiency", desc: "Taking care of yourself is the greatest contribution to society.", tags: ["Efficiency", "Calmness"] }
      ]
    },
    contact: {
      title: "Let Me Catch Your Voice",
      quote: "\"Collaboration is an equal exchange of value. Please confirm your intention before writing.\"",
      labels: { category: "1. Category", name: "2. Name", email: "3. Email", content: "4. Content" },
      placeholders: { category: "Select category", name: "Your name", content: "Enter description..." },
      submit: "Send Voice",
      footer: "\"I will listen carefully to every submerged voice.\""
    },
    footer: {
      desc: "Rational boundary builder. Dedicated to hearing submerged voices and reclaiming your choices.",
      subTitle: "Subscription",
      subDesc: "Subscribe to the 'Humanity Observation Weekly'.",
      subBtn: "Subscribe",
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
        { id: "01", title: "認知デカップリング術", desc: "それが他人の見たいものだと気づいたとき、あなたはその上着を脱ぐ権利があります。", tags: ["投影", "自己認識"] },
        { id: "02", title: "暗示フィルタリング", desc: "自分自身を十分に理解したとき、外部からの暗示はあなたを傷つけることはできません。", tags: ["主権", "境界構築"] },
        { id: "03", title: "理性的キャッチ", desc: "「私はダメだ」という心理戦略を採用し、感情はあなたを操作する力を失います。", tags: ["癒やし", "理性"] },
        { id: "04", title: "生存効率", desc: "自分を律することこそが、この社会への最大の貢献です。", tags: ["効率", "冷静"] }
      ]
    },
    contact: {
      title: "あなたの声を聴き届けさせてください",
      quote: "「コラボレーションは価値の対等な交換です。ご連絡の前にご自身の意圖をご確認ください。」",
      labels: { category: "1. カテゴリ", name: "2. お名前", email: "3. メールアドレス", content: "4. 内容" },
      placeholders: { category: "カテゴリを選択", name: "お名前", content: "内容を入力..." },
      submit: "声を送る",
      footer: "「かき消されたすべての声に真摯に耳を傾けます。」"
    },
    footer: {
      desc: "理性的な境界の構築者。人間性の喧騒の中で、かき消されたあなたの声を聞き取り、選択権を取り戻すお手伝いをします。",
      subTitle: "購読",
      subDesc: "『人間性観察週報』を購読して、週に一度の理性的気づきノートを受け取りましょう。",
      subBtn: "購読する",
      rights: "© 2024 Zi Long. All Rights Reserved."
    }
  }
};

// --- 4. 彈窗組件 (Modals) ---

const AuthorModal = ({ isOpen, onClose, lang }: any) => {
  const t: any = {
    zh: { label: "作者介紹", name: "子瓏", birth: "1992年生，現居台灣。", desc: "不喜歡一成不變的生活，喜歡徜徉在自己的想像世界...", close: "關閉介紹" },
    en: { label: "About Author", name: "Zi Long", birth: "Born in 1992, Taiwan.", desc: "Dislikes a monotonous life, loves imaginary worlds...", close: "Close" },
    ja: { label: "作家紹介", name: "子瓏", birth: "1992年生まれ、台湾在住。", desc: "単調な生活を好まず、想像の世界に浸ることを好む...", close: "閉じる" }
  }[lang] || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-2xl bg-[#1A1A1A] border border-accent/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 text-accent hover:bg-accent/10 p-2 rounded-full"><X size={24} /></button>
            <h3 className="text-accent mono-label mb-2">{t.label}</h3>
            <h2 className="text-2xl font-serif font-bold text-white mb-8">{t.name}</h2>
            <div className="space-y-6 text-white/80 leading-loose">
              <p className="italic text-accent/80 border-l-2 border-accent/20 pl-6">{t.birth}</p>
              <p>{t.desc}</p>
            </div>
            <div className="mt-12 flex justify-center"><button onClick={onClose} className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-all">{t.close}</button></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const BookModal = ({ isOpen, onClose, lang }: any) => {
  const t: any = {
    zh: { label: "小說作品", title: "傾聽我 接住我", intro: "內容簡介", close: "關閉作品集" },
    en: { label: "Novel Work", title: "Listen to Me, Catch Me", intro: "Introduction", close: "Close" },
    ja: { label: "小説作品", title: "傾聴我 接住我", intro: "内容紹介", close: "閉じる" }
  }[lang] || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl max-h-[90vh] bg-[#1A1A1A] border border-accent/30 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-8 border-b border-accent/10 flex justify-between items-center bg-accent/5">
              <div><h3 className="text-accent mono-label mb-1">{t.label}</h3><h2 className="text-xl font-serif font-bold text-white">{t.title}</h2></div>
              <button onClick={onClose} className="text-accent p-2 hover:bg-accent/10 rounded-full"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
              <h4 className="text-accent font-bold border-b border-accent/10 pb-2 inline-block">{t.intro}</h4>
              <p className="text-white/80 leading-loose">★面對生前的暴力，她在死後化身貓咪，以柔軟回報生命中的苦痛...</p>
            </div>
            <div className="p-6 border-t border-accent/10 bg-bg/5 flex justify-center"><button onClick={onClose} className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-all">{t.close}</button></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SubscriptionModal = ({ isOpen, onClose }: any) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-md bg-[#1A1A1A] border border-accent/30 rounded-3xl p-10 text-center shadow-2xl">
          <button onClick={onClose} className="absolute top-6 right-6 text-accent p-2 hover:bg-accent/10 rounded-full"><X size={24} /></button>
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mx-auto mb-8"><BellRing size={32} /></div>
          <h2 className="text-xl font-serif font-bold text-white mb-4">訂閱子瓏</h2>
          <p className="text-white/60 mb-8">加入我們的深度察覺體系，定期接收生存筆記。</p>
          <form className="space-y-4">
            <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-accent/5 border border-accent/10 rounded-xl text-white outline-none focus:border-accent/30" />
            <button className="w-full py-4 bg-accent text-bg rounded-xl font-bold hover:bg-accent/90 transition-colors">立即訂閱</button>
          </form>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const DialogueModal = ({ isOpen, onClose, id, lang }: any) => {
  const content = VALUE_TRANSLATIONS_DATA[lang]?.dialogues?.[id] || { q: "Loading...", a: "Please wait.", title: "Interview" };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-bg/95 backdrop-blur-md" onClick={onClose}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg border border-accent/20 rounded-2xl p-8 md:p-16 shadow-2xl">
            <button onClick={onClose} className="absolute top-8 right-8 text-muted hover:text-accent"><X size={28} /></button>
            <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent"><MessageSquareQuote size={20} /></div><span className="mono-label">{content.title}</span></div>
            <h2 className="text-2xl md:text-3xl mb-12 leading-relaxed text-white">{content.q}</h2>
            <div className="flex gap-6"><div className="w-px bg-accent/20 shrink-0" /><div className="text-lg md:text-xl text-white/80 leading-loose whitespace-pre-wrap">{content.a}</div></div>
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
          <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
            {content?.map((section: any, idx: number) => (
              <div key={idx} className="space-y-8">
                <h3 className="text-xl font-serif font-bold text-white border-l-4 border-accent pl-4">{section.section}</h3>
                {section.qa.map((item: any, qIdx: number) => (
                  <div key={qIdx} className="space-y-4">
                    <div className="flex gap-4"><span className="text-accent/40 font-bold">{item.id}</span><h4 className="text-white font-serif">{item.q}</h4></div>
                    <div className="pl-8"><p className="text-white/70 leading-relaxed">{item.a}</p></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-accent/10 bg-accent/5 flex justify-center"><button onClick={onClose} className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-all">關閉內容</button></div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

// --- 5. 主程式 (Main App) ---

export default function App() {
  const [lang, setLang] = useState("zh");
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [selectedValueId, setSelectedValueId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const t = UI_CONTENT[lang as keyof typeof UI_CONTENT];

  const valueIcons = [Eye, Filter, Shield, Zap];

  return (
    <div className="relative min-h-screen bg-bg text-ink font-sans antialiased selection:bg-accent selection:text-bg">
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-accent/10 z-[60]">
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
            <a href="#contact" className="text-muted hover:text-accent transition-colors text-lg">{t.nav.contact}</a>
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
                <h1 className="text-[36px] md:text-[42px] font-serif leading-[1.4] mb-8 font-bold text-white">{t.hero.title}</h1>
                <p className="text-[18px] text-white/80 leading-[1.8] max-w-2xl mb-12">{t.hero.sub}</p>
                <div className="flex flex-wrap gap-6">
                  <button onClick={() => setIsAuthorOpen(true)} className="px-8 py-4 bg-accent text-bg rounded-full font-bold text-[18px] hover:scale-105 transition-transform">{t.hero.btnAuthor}</button>
                  <button onClick={() => setIsBookOpen(true)} className="px-8 py-4 border border-accent/20 rounded-full text-accent font-bold text-[18px] hover:bg-accent/5 transition-all">{t.hero.btnBook}</button>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-4">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="aspect-[3/4] rounded-2xl overflow-hidden border border-accent/10 bg-white/5">
                <img src="/hero_cat.jpg.png" alt="Hero" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 border-t border-accent/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="mono-label mb-6 block text-accent">{t.about.label}</span>
              <h2 className="text-[28px] font-serif font-bold mb-8 text-white">{t.about.title}</h2>
              <div className="space-y-6 text-white/70 leading-[1.8] text-lg">
                {t.about.text.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="mt-12 flex gap-12">
                <div><p className="text-4xl font-serif font-bold text-accent">100k+</p><p className="mono-label text-accent/60">{t.about.stats.readers}</p></div>
                <div><p className="text-4xl font-serif font-bold text-accent">500+</p><p className="mono-label text-accent/60">{t.about.stats.cases}</p></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square">
              <div className="absolute inset-0 border border-accent/10 rounded-full animate-[spin_30s_linear_infinite]" />
              <div className="absolute inset-12 rounded-full overflow-hidden border border-accent/20">
                <img src="/作者_潛水.jpg.jpg" alt="Author" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section (Skeleton) */}
        <section id="values" className="py-32 px-6 border-y border-accent/10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-20">
              <span className="mono-label mb-4 block text-accent">{t.values.label}</span>
              <button onClick={() => setIsDialogueOpen(true)} className="group relative px-8 py-4 border border-accent/30 rounded-xl text-accent font-serif text-xl md:text-2xl mb-8 hover:bg-accent hover:text-bg transition-all duration-500 text-left">
                {t.values.noteTitle}
              </button>
              <p className="text-white/80 text-lg leading-loose">{t.values.noteDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-accent/10 border border-accent/10">
              {t.values.cards.map((card, idx) => {
                const Icon = valueIcons[idx];
                return (
                  <motion.div key={card.id} onClick={() => setSelectedValueId(card.id)} className="bg-bg p-12 md:p-16 group hover:bg-accent/[0.02] transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-12">
                      <div className="p-4 rounded-2xl bg-accent/5 text-accent group-hover:bg-accent group-hover:text-bg transition-all"><Icon size={28} /></div>
                      <span className="font-mono text-4xl opacity-10 text-accent">{card.id}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-accent">{card.title}</h3>
                    <p className="text-white/70 leading-relaxed mb-8 text-lg">{card.desc}</p>
                    <div className="flex flex-wrap gap-2">{card.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 border border-accent/20 rounded-full text-accent/60">{tag}</span>)}</div>
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
            <p className="text-white/60 italic mb-16 text-lg">{t.contact.quote}</p>
            <form className="space-y-8 text-left max-w-2xl mx-auto">
              <div><label className="block mono-label text-accent mb-4">{t.contact.labels.name}</label><input type="text" placeholder={t.contact.placeholders.name} className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent/30" /></div>
              <div><label className="block mono-label text-accent mb-4">{t.contact.labels.email}</label><input type="email" placeholder="email@example.com" className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent/30" /></div>
              <div><label className="block mono-label text-accent mb-4">{t.contact.labels.content}</label><textarea rows={4} placeholder={t.contact.placeholders.content} className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white outline-none focus:border-accent/30 resize-none" /></div>
              <button className="w-full py-5 bg-accent text-bg rounded-full font-bold text-xl hover:scale-[1.02] transition-transform">{t.contact.submit}</button>
            </form>
            <p className="mt-12 text-white/40 text-sm max-w-md mx-auto">{t.contact.footer}</p>
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
                <a href="#" className="text-accent/60 hover:text-accent transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-accent/60 hover:text-accent transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-accent/60 hover:text-accent transition-colors"><AtSign size={20} /></a>
              </div>
            </div>
            <div>
              <span className="mono-label mb-6 block text-accent">{t.footer.nav}</span>
              <ul className="space-y-4 text-white/70 text-lg">
                <li><a href="#contact" className="hover:text-accent">{t.footer.contact}</a></li>
                <li><a href="#about" className="hover:text-accent">{t.footer.about}</a></li>
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
            <p className="text-[10px] mono-label text-accent/40">Rational Boundary Builder</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthorModal isOpen={isAuthorOpen} onClose={() => setIsAuthorOpen(false)} lang={lang} />
      <BookModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} lang={lang} />
      <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />
      <DialogueModal isOpen={isDialogueOpen} onClose={() => setIsDialogueOpen(false)} lang={lang} id="Q1" />
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
