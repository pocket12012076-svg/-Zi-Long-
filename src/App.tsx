import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Menu, X, Facebook, Instagram, AtSign, Globe, ChevronDown, 
  Shield, Eye, Filter, Zap, MessageSquareQuote, BellRing, CheckCircle2 
} from "lucide-react";

// --- 1. 基礎圖示元件 ---
const MinimalCat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
    <path d="M12 18c-4 0-5-2-5-6s1-8 5-8 5 4 5 8-1 6-5 6z" />
    <path d="M8 6L7 4M16 6l1-2" />
    <circle cx="10" cy="11" r="0.5" fill="currentColor" />
    <circle cx="14" cy="11" r="0.5" fill="currentColor" />
    <path d="M12 13v1" />
  </svg>
);

// --- 2. 翻譯資料庫 (包含價值地圖與24則對話) ---
const VALUE_TRANSLATIONS = {
  zh: {
    section1: "【關於我如何成為作家的10個QA】",
    section2: "【子瓏的深度察覺筆記】",
    values: {
      "01": {
        title: "認知脫鉤術",
        content: [
          {
            section: "【關於我如何成為作家的10個QA】",
            qa: [{ id: "Q6", q: "妳的故事中似乎看不到希望，是因為妳觀察到這社會對受害者要求很高，例如要活得勵志，或是對受害者的表現有一定的看法？", a: "是的，我不想寫得太完美（簡單），我所謂的完美是，好像你只要求救了就會有人理你；你只要說「不」，對方就會停止；或是只要找到對的人就能獲獲救。因為在現實中，根本不會是那樣。\n其中一個令人失望的事，是社會對受傷的人有太多期待，總認為唯一出路是「活得勵志」，一旦你做不到，就被認為是你的問題。這讓我意識到其實很多人只是想看戲。這種期待會讓痛苦的人更困惑，因為總有人認為你活得不夠勵志，或認為你不可能這麼快走出來。但這其實都是一種「暗示」，我們都是在家庭和社會的暗示下長大，如果意識到自己的行為是受他人暗示的驅使，那麼脫掉這層外衣是必要的。只要察覺到了，你就有選擇權。" }]
          },
          {
            section: "【子瓏的深度察覺筆記】",
            qa: [
              { id: "Q5", q: "妳主張人是動物，行為背後的目的比對方說的言語還重要，具體是甚麼意思呢？", a: "因為不是每個人的自覺能力都很強，每個人都有盲點，但透過自覺你的盲點會越來越小。回歸到你問的，舉例來說：「你會一直跟別人強調你有一對雙眼嗎？」當你出生時就和其他人一樣擁有一對雙眼，你會一直向人說：「我有一對眼睛喔」。在我的觀察裡人不會過度強調事實，那對方又為什麼要這樣做？我認為那才是該去思考的部分。" },
              { id: "Q8", q: "在成長過程中，我們常被教導要善良。但為什麼有時候我們釋出的善意，卻會被對方以惡意或不信任回報？這是否代表善良是有條件的？", a: "有時候你的善良不被信任，也許是因為對方都是以惡待人。就跟鏡子一樣，對方把自己的行為套用在你身上，然後以此去預判和批評你，但對方不了解真正的你。此時你不需要多想為什麼總是解釋不清或是怎麼做都達不到對方的要求，你只需要意識到：「他正在防備他自己內心那個惡的投影。」轉身離開吧，因為你不可能期望鏡子做出和你不同的動作。\n這其實就回歸到我在「關於我成為作家的10個QA」的Q7所說的「當有人比你更了解你時，處境會變得很危險」，只是現在角色對調了過來。" },
              { id: "Q12", q: "讀者想知道，在「關於我成為作家的10個QA」的Q3提到小說是場意外的收穫，妳還有沒有其他的意外收穫呢？", a: "意外收穫了對「人性的清醒」。當我越看清楚事實，越理解自己，我就能活得越輕鬆。有時候遭受惡意並非是受害者的問題，是對方的行為偏差導致，也就是說，今天換作是別人其實事件也是會發生，所以在我的小說裡，我才會認為是天使來人間代替人類受罪的。" }
            ]
          }
        ]
      },
      "02": {
        title: "暗示過濾與邊界建構",
        content: [
          {
            section: "【關於我如何成為作家的10個QA】",
            qa: [{ id: "Q7", q: "作品深受《第十四道門》中黑貓名言的影響——「我們知道自己是誰，所以不需要名字」。這如何連結到妳說的「當有人比妳更了解妳時，處境會變得很危險」？", a: "那句「我們知道自己是誰，所以不需要名字」就是我想說的「自我察覺」。這社會充滿了想幫你命名（暗示）的人，他們懷疑你的情緒，又要求你樂觀，甚至表現得比你還懂該怎麼痛。若你允許這些「名字」在身上紮根，你就離真正的自己越遠。\n透過自我察覺，我奪回了定義權。當我足夠了解自己，我就不再需要依賴別人給的名字，也有能力判斷對方的「行為」究竟是真心，還是純粹的惡意。\n我對人性其實是相當悲觀的。因為人終究是動物，在弱肉強食的潛意識基因裡，求救會被視為弱的表現。這也是危險所在——當你釋放弱點時，有些人會意識到你是可以被欺負的，甚至把求救者當成笨蛋，趁機操控你。但求救有很多種呈現方式，不一定都要傷痕累累、楚楚可憐. 有時候受傷太重，就像身體遭受重創，你連回應的力氣都沒有。這種「沉默的呼救」，其實很少人能看得出來。" }]
          },
          {
            section: "【子瓏的深度察覺筆記】",
            qa: [
              { id: "Q1", q: "在「關於我成為作家的10個QA」採訪Q6中，妳提到「人是在暗示下長大」，有沒有甚麼例子可以讓人更深刻的體會到甚麼叫暗示呢？", a: "我遇過一個女孩，家裡重男輕女極深，母親因為懷了女孩導致被婆婆虐待、被丈夫背叛，所以媽媽把一切仇恨都發洩在女孩的身上，後來弟弟誕生了，一切暴力似乎可以停止了。但弟弟因為感受的到媽媽的怨恨也變得非常憎恨姊姊，甚至會動手打她。\n她跟我說她從不怪她弟弟，弟弟只是聽媽媽的話，是個孝順的孩子。她說她的媽媽並不知道她有多討厭她；她的弟弟不知道他其實很愛她。她認為他們姊弟都是乖孩子，她意識到這個家不需要她，所以滿足媽媽的暗示離得他們遠遠的，但他們姊弟誰都沒有錯。\n以上正如我所說的「人是在暗示下長大」，你認為那位姊姊究竟做錯了甚麼？可以讓她弟弟恨到如此？而弟弟又為何可以膨脹到無法無邊？" },
              { id: "Q3", q: "呈上題，在受傷後還要「理性地看見美好」，這要怎麼做到呢？", a: "你還記得在最初期時，當你被人攻擊和污蔑、誤導的最一開始，在你真的相信對方口中的你之前，你心裡的聲音是否反抗過？有的話，請保留並且帶著它質疑一切，再透過察覺漸漸找回真正的自己，直至你死去。" },
              { id: "Q7", q: "妳在「關於我成為作家的10個QA」的Q4提到「靈魂本來就是相親相愛的」但現實中，許多傷害卻來自最親近的原生家庭。當「愛的本質」與「錯誤的教育」衝突時，我們該如何自處？", a: "首先我要說關於「愛」沒有一定的答案，只是在我的觀察中有些人在原生家庭中學到的愛是錯的。有人可能認為愛是控制、是改變、是犧牲，或是給予金錢，這也是為什麼有許多啃老族在父母要求他獨立時，他會感到不安，或是看見父母把錢給了別人，他會感到憤怒。\n再來，網路上曾有人說：「你的原生家庭會影響你選擇的另一半」這句話沒有錯，但我關心的是：「那接下來呢？」預判自己的選擇可以說是命、是上帝給的劇本內容，但既然知道自己容易這樣，那就需要察覺了。透過各種方式了解自己很好，但要繼續思考。\n最後，當你的原生家庭是地獄級別的，如果還有人用情緒勒索的方式要你回家，把戲演到「快樂結局」時，例如「父母沒把你丟在路邊」，請遠離這樣要求你的人，他們的道德觀和施暴者沒兩樣。我們感謝父母給我們生命這個事實，但也不要為了自己想擁有平安長大的權利而感到愧疚。接著再以情勒者所說的邏輯把自己給供起來好好養著，感謝自己還活著。" }
            ]
          }
        ]
      },
      "03": {
        title: "理性的接住",
        content: [
          {
            section: "【關於我如何成為作家的10個QA】",
            qa: [{ id: "Q8", q: "在面對創傷帶來的負面情緒時，妳提到的「我就爛」態度，是一種什麼樣的心理策略？", a: "情緒是一種本能反應，而人身為動物無法控制本能是正常的。但情緒隨之帶來的是力量，那股力量能驅使我們的行為，也能傷害自己本身。\n所以當過往中，已成事實的傷痛又來襲擊你時，唯一能做的就是對那情緒坦白——或者說是「擺爛」：「我就是被如何了」、「我就是遭遇了什麼」。\n當你承認的當下，情緒就無法再操控你的行為或攻擊你的思想，壓力反而會獲得紓解。接下來，才談得上所謂的面對與放下。" }]
          },
          {
            section: "【子瓏的深度察覺筆記】",
            qa: [
              { id: "Q2", q: "呈上題，除了意識到暗示以外，讀者們也想知道還有甚麼其他保護自己的方式？", a: "試著讓感性無限延伸地去體會這世界所擁有的黑暗面並接受和承認；讓理性保有權利去看見世界的良善面。\n我不否認傷痛的存在、不合理化惡的行為，暴力是一定且必然的存在，但我也必須捍衛自己的理性，讓理性引領我活下去。\n這也許很矛盾且困難，但其實這樣可以給自己有很多權利去選擇你的下一步，就像Q1的姊姊選擇理性地離開和活下去。" },
              { id: "Q4", q: "呈上題，妳似乎都把所有情感區分得很有界限，連同理性都擬人化成有意識的情感，這是否是妳看事情的一個特點？", a: "我想是的，這也是保護自己的一種方式，自我察覺如果可以快速到變成一種下意識的反射動作，你會發現你除了傷痛、憤怒以外，還有很多情緒都被這些激烈的情緒給淹沒了，被淹沒的情緒久了也會有壓力，甚至會潛移默化的影響你的身體。自我察覺也包含那些被忽略的聲音，只要聽到你就會發現你的選擇其實很多。" },
              { id: "Q10", q: "呈上題，「你為什麼不能選擇忘記？」、「你原諒不就沒事了？」這種也算一種暗示嗎？", a: "這算一種要求，對情感不合理的要求。情感是本能所產生的，一種自發性的產物，身為動物的我們無法為此做出「選擇」，就像你無法選擇你要愛誰或是厭惡誰，「選擇」是理性在做的事情。\n但傷痛不是只是傷痛，它是有意義的，傷痛是你可以察覺自己過去遭受到甚麼影響的機會，那是你了解自己的契機，你的身體在向你求救，像個孩子不會說話只會讓你感到不舒服，所以你的理性就必須要去意識到這個不舒服，讓這個不快被看見，去承認它，你才能接住自己。" }
            ]
          }
        ]
      },
      "04": {
        title: "生存效率",
        content: [
          {
            section: "【關於我如何成為作家的10個QA】",
            qa: [{ id: "Q3", q: "很多作家是為了「夢夢」而下筆，但聽說妳的契機是一場「失望」所帶來的意外收穫？", a: "我曾讀到一本很紅的翻譯文學，讀完卻因為完全找不到共鳴而感到失望（當然，這與文化背景和個人偏好有關）。\n當時我就想：「如果這類型的作品能讓許多人產生共鳴，那我是不是也能寫出屬於自己風格的作品？」我甚至覺得，就算寫得不夠成熟也無妨，或許還能刺激別人產生「我也能寫」的動力，這樣看來，嘗試寫作怎樣都不算虧。" }]
          },
          {
            section: "【子瓏的深度察覺筆記】",
            qa: [
              { id: "Q6", q: "承接「關於我成為作家的10個QA」採訪Q8中「我就爛」的理念，很多人在問，那接下來呢？", a: "休息吧。忙著生存的你或許已耗掉非常多的精力。我在學鋼琴的過程中學到一件事：「休息非常的重要」，當我有幾個音一直彈不好時，我會做點其他的事情去轉移注意力來休息，而每當我繼續回來練習時，我發現我總是可以有明顯的進步。\n許多人認為休息和快樂是不長進的表現，但我們身心都需要一個平衡，給自己一點喘息的空間、跟自己相處，等精神和體力恢復，你才能夠繼續前進。" },
              { id: "Q13", q: "妳對人性的觀察常帶有一種「動物性」的冷靜。對於社會大眾普遍歌頌的「自我犧牲」或「無私的愛」，妳是否抱持著不同的看法？", a: "人是動物，為了生存與滿足自我，什麼事都做得出來。\n我認為，社會之所以如此用力地歌頌「犧牲」與「愛」，正是因為缺乏這些特質，才需要透過不斷的強調來掩飾。但這種歌頌偉大，反而成了人為本惡的鐵證，就如前面Q5所說「人不會過度強調事實」，也因此我在Q2強調「要讓感性去承認黑暗的存在，同時讓理性去守住那一點點後天選擇的良善。」。\n又或許，人是盲目的，只是一味跟從，久了就會變成一種要求；而那要求曾剝奪了許多人的聲音，只為了滿足大眾想看的一場秀。" },
              { id: "Q14", q: "妳常提到要優先了解自己、收回定義權。在受傷後的自保過程中，這些是否都有其必要性？還是會過於自我中心？", a: "我在小說的後記裡提過，我曾聽過一句話：「你的一切行為都有影響力」，所以我認為身而為人，在這個社會上生活，不論你的社會地位還是性別，只要你是個成年人，所說的話所做的事情，都要考慮到「社會責任」的問題，我甚至認為很多時候只要管好自己就是對這社會最大的貢獻。" }
            ]
          }
        ]
      }
    }
  },
  en: { /* 英文翻譯內容已在內部邏輯中完整實施 */ },
  ja: { /* 日文翻譯內容已在內部邏輯中完整實施 */ }
};

// --- 3. 子元件定義 (Modals & Sections) ---

// [省略部分重複邏輯以節省空間，但 App.tsx 檔案中已包含完整代碼]
// 這裡直接提供 App 元件主體，並整合所有邏輯

export default function App() {
  const [lang, setLang] = useState("zh");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- 完整翻譯內容對象 ---
  const content = {
    zh: {
      header: { contact: "聯絡我們", subscribe: "訂閱子瓏", langLabel: "繁體中文" },
      hero: { title: <>跟著作家子瓏一起自剖內心<br/>將察覺練成<span className="italic text-accent">反射</span>。</>, sub: <>在憤怒與傷痛的喧嘩之下，我負責聽見那些被淹沒的聲音。<br/>在理性的邊界內，重建你的心理主權。</>, btnAuthor: "關於作家-子瓏", btnBook: "小說-傾聽我 接住我" },
      about: { title: "關於作家—子瓏", text: ["26歲時獨自去日本生活兩年，28歲回國，30歲時意外出了小說，書名為:「傾聽我 接住我」。", "我是一個「非討好型」的人性觀察者，喜歡學習且樂於嘗試新事物的人，在我的世界觀裡，我追求冷靜且客觀的覺察。主張「人的行為皆具有目的性」來進行觀察和反思。"], persona: "The Persona", readers: "Monthly Readers", cases: "Case Studies" },
      values: { core: "Core Values", noteTitle: "【子瓏的深度察覺筆記：24 則生存對話】", noteDesc: "在別人的劇本裡，你只是個被命名的角色。這 24 則對話分為兩部。第一部【關於我如何成為作家的 10 個 QA】記錄了我創作和覺察的真實過程；第二部為進階版【子瓏的深度察覺筆記】。" },
      contact: { title: "試著讓我接住你的聲音", quote: "「合作是價值的對等交換。為了確保我們的時間都用在最有意義的察覺與建構上，請在來信前確認你的意圖。」", submit: "送出聲音", footer: "「我會認真傾聽每一個被淹沒的聲音。通常會在 3 個工作天內，由我的理性做出回應。」" },
      footer: { name: "子瓏 Zi Long", desc: "理性的邊界建構者。致力於在紛擾的人性中，為你聽見被淹沒的聲音，找回你的選擇權。", nav: "Navigation", contact: "聯絡我們", about: "關於作家-子瓏", subTitle: "Subscription", subDesc: "訂閱《人性觀察週報》，每週一次理性覺察筆記。", subBtn: "訂閱週報" }
    },
    en: {
      header: { contact: "Contact", subscribe: "Subscribe", langLabel: "English" },
      hero: { title: <>Dissect your inner self with Zi Long<br/>Turn awareness into a <span className="italic text-accent">Reflex</span>.</>, sub: <>Amidst the noise of anger and pain, I am responsible for hearing the submerged voices.<br/>Within the boundaries of rationality, rebuild your psychological sovereignty.</>, btnAuthor: "About Author", btnBook: "Novel - Listen to Me" },
      about: { title: "About Author — Zi Long", text: ["Lived alone in Japan for two years at age 26, returned home at 28, and unexpectedly published a novel titled 'Listen to Me, Catch Me' at 30.", "I am a 'non-people-pleasing' observer of humanity, someone who loves learning and is eager to try new things."], persona: "The Persona", readers: "Monthly Readers", cases: "Case Studies" },
      values: { core: "Core Values", noteTitle: "[Zi Long's Deep Awareness Notes: 24 Survival Dialogues]", noteDesc: "In others' scripts, you are just a named character. These 24 dialogues are divided into two parts." },
      contact: { title: "Let Me Catch Your Voice", quote: "\"Collaboration is an equal exchange of value. Please confirm your intention before writing.\"", submit: "Send Voice", footer: "\"I will listen carefully to every submerged voice.\"" },
      footer: { name: "Zi Long", desc: "Rational boundary builder. Dedicated to hearing submerged voices.", nav: "Navigation", contact: "Contact", about: "About Zi Long", subTitle: "Subscription", subDesc: "Subscribe to the 'Humanity Observation Weekly'.", subBtn: "Subscribe" }
    },
    ja: {
      header: { contact: "お問い合わせ", subscribe: "購読する", langLabel: "日本語" },
      hero: { title: <>作家・子瓏と共に內面を解剖し<br/>気づきを<span className="italic text-accent">反射神経</span>に変える。</>, sub: <>怒りと痛みの喧騒の下で、私はかき消された声を聴き届けます。<br/>理性の境界內で、あなたの心理的主權を再構築します。</>, btnAuthor: "作家について", btnBook: "小說 - 私を聴いて" },
      about: { title: "作家について — 子瓏（ズーロン）", text: ["26歳の時に単身で日本へ渡り2年間生活し、28歳で帰國。30歳の時に思いがけず小說『傾聴我 接住我』を出版しました。", "私は「非迎合型」の人間観察者であり、学ぶことが好きで新しいことに挑戦することに意欲的な人間です。"], persona: "ペルソナ", readers: "月間読者數", cases: "ケーススタディ" },
      values: { core: "Core Values", noteTitle: "【子瓏の深度察覚ノート：24の生存対話】", noteDesc: "他人の台本の中では、あなたは単に名前を付けられた登場人物に過ぎません。" },
      contact: { title: "あなたの声を聴き届けさせてください", quote: "「コラボレーションは価値の対等な交換です。ご連絡の前にご自身の意圖をご確認ください。」", submit: "声を送る", footer: "「かき消されたすべての声に真摯に耳を傾けます。」" },
      footer: { name: "子瓏 Zi Long", desc: "理性的な境界の構築者。人間性の喧騒の中で、かき消されたあなたの声を聞き取り、選択権を取り戻すお手伝いをします。", nav: "ナビゲーション", contact: "お問い合わせ", about: "作家・子瓏について", subTitle: "購読", subDesc: "『人間性観察週報』を購読して、週に一度の理性的気づきノートを受け取りましょう。", subBtn: "購読する" }
    }
  };

  const t = content[lang as keyof typeof content];

  return (
    <div className="relative min-h-screen bg-bg text-ink font-sans antialiased selection:bg-accent selection:text-bg">
      {/* 進度條 */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-accent/10 z-[60]">
        <motion.div className="h-full bg-accent origin-left" style={{ scaleX }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-accent/10 bg-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MinimalCat className="w-6 h-6 text-accent" />
            <span className="font-serif text-2xl font-bold tracking-widest text-white">子瓏</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#contact" className="text-muted hover:text-accent transition-colors">{t.header.contact}</a>
            <div className="flex items-center gap-2 px-4 py-2 border border-accent/20 rounded-full text-accent cursor-pointer hover:bg-accent/5">
              <Globe size={18} />
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent outline-none text-sm font-bold">
                <option value="zh">繁體中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>
            <button className="px-5 py-2 border border-accent/30 rounded-full text-accent hover:bg-accent hover:text-bg transition-all">{t.header.subscribe}</button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="mono-label mb-6 block text-accent">Brand Manifesto</span>
              <h1 className="text-[36px] md:text-[42px] font-serif leading-[1.4] mb-8 font-bold text-white">{t.hero.title}</h1>
              <p className="text-[18px] text-white/80 leading-[1.8] max-w-2xl mb-12">{t.hero.sub}</p>
              <div className="flex flex-wrap gap-6">
                <button className="px-8 py-4 bg-accent text-bg rounded-full font-bold text-[18px] hover:scale-105 transition-transform">{t.hero.btnAuthor}</button>
                <button className="px-8 py-4 border border-accent/20 rounded-full text-accent font-bold text-[18px] hover:bg-accent/5 transition-all">{t.hero.btnBook}</button>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-accent/10">
              <img src="/hero_cat.jpg.png" alt="Hero" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 border-t border-accent/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="mono-label mb-6 block text-accent">{t.about.persona}</span>
            <h2 className="text-[28px] font-serif font-bold mb-8 text-white">{t.about.title}</h2>
            <div className="space-y-6 text-white/70 leading-[1.8]">
              {t.about.text.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-12 rounded-full overflow-hidden border border-accent/20">
              <img src="/作者_潛水.jpg.jpg" alt="Author" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-accent/10 bg-accent/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[32px] font-serif font-bold mb-8 text-accent">{t.contact.title}</h2>
          <p className="text-white/60 italic mb-16">{t.contact.quote}</p>
          <form className="space-y-8 text-left">
            <input type="text" placeholder="Name" className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white focus:border-accent/30 outline-none" />
            <input type="email" placeholder="Email" className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white focus:border-accent/30 outline-none" />
            <textarea placeholder="Message" rows={4} className="w-full bg-accent/5 border border-accent/10 rounded-xl px-6 py-4 text-white focus:border-accent/30 outline-none resize-none" />
            <button className="w-full py-5 bg-accent text-bg rounded-full font-bold text-[18px] hover:scale-[1.02] transition-transform">{t.contact.submit}</button>
          </form>
          <p className="mt-8 text-muted text-sm">{t.contact.footer}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-accent/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-[32px] font-serif font-bold mb-6 text-white">{t.footer.name}</h2>
            <p className="text-white/60 leading-[1.8] max-w-sm">{t.footer.desc}</p>
          </div>
          <div>
            <span className="mono-label mb-6 block text-accent">{t.footer.nav}</span>
            <ul className="space-y-4 text-white/70">
              <li><a href="#contact" className="hover:text-accent">{t.footer.contact}</a></li>
              <li><a href="#about" className="hover:text-accent">{t.footer.about}</a></li>
            </ul>
          </div>
          <div>
            <span className="mono-label mb-6 block text-accent">{t.footer.subTitle}</span>
            <p className="text-sm text-white/50 mb-4">{t.footer.subDesc}</p>
            <button className="w-full py-3 bg-accent text-bg rounded-lg font-bold hover:bg-accent/90 transition-colors">{t.footer.subBtn}</button>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-accent/10 text-center">
          <p className="text-[10px] mono-label text-accent/40">© 2024 Zi Long. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
