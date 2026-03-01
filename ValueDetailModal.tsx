import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface DialogueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const dialogues = [
  { 
    id: "Q1", 
    part: 1,
    q: "從童年在圖書館集章閱讀，到現在維持讀後書寫的習慣，閱讀似乎一直是妳生活中不曾中斷的節奏。是什麼魅力讓妳在快速的時代裡，仍選擇慢慢讀、慢慢想？", 
    a: "小時候在閱讀上獲得的成就感，來自國小導師的要求。他讓我們每星期在圖書館選一本書，閱畢後寫一篇心得便能累積點數，集滿就能領獎狀。因為這樣，我們全班常常集體上台領獎，我也在這個過程中發現，完成閱讀與書寫本身是一件令人滿足的事。\n這個節奏伴隨著我長大。現在回頭看，閱讀故事不只是吸收內容，而是促使我不斷思考，也讓我願意放慢腳步，把想法整理成文字。久而久之，書寫成了我理解自己、整理情緒，並與世界溝通的一種方式。",
    title: "閱讀的節奏"
  },
  { 
    id: "Q2", 
    part: 1,
    q: "妳曾提到王永慶的一句話影響了妳對小說的看法，那是如何植入腦海的？又為什麼依然相信「小說」更有拯救人的力量？", 
    a: "高中時我在王永慶的書裡讀到，他認為小說是作者經驗的延伸。這讓我默默認為在小說世界可以學到很多事。長大後工具書盛行，但我觀察著自己越發覺得小說創造的世界能學到的比工具書更多。\n\n虛構源於現實，說的都是人與人的故事；小說有情境，我可以和主角一起感受、驚訝、甚至覺察彼此的不同，然後再內化成自己的經驗。就像國小老師就教過「禮、義、廉、恥」怎麼寫，但理解意思的人有多少？真正實踐的人，又有多少人？",
    title: "小說的力量"
  },
  { 
    id: "Q3", 
    part: 1,
    q: "很多作家是為了「夢想」而下筆，但聽說妳的契機是一場「失望」所帶來的意外收穫？", 
    a: "我曾讀到一本很紅的翻譯文學，讀完卻因為完全找不到共鳴而感到失望（當然，這與文化背景和個人偏好有關）。\n當時我就想：「如果這類型的作品能讓許多人產生共鳴，那我是不是也能寫出屬於自己風格的作品？」我甚至覺得，就算寫得不夠成熟也無妨，或許還能刺激別人產生「我也能寫」的動力，這樣看來，嘗試寫作怎樣都不算虧。",
    title: "失望的收穫"
  },
  { 
    id: "Q4", 
    part: 1,
    q: "妳的作品中有一種很特殊的「人生劇本論」，這個靈感是從何而來的？", 
    a: "當時我還看了另一本書，提到小孩出生後仍擁有與上帝對話的記憶。這讓我感覺人天生就是上帝的演員，各自拿著劇本發展人生。也就是說我們的靈魂本來是相親相愛的，只是喝了孟婆湯、演了戲才影響了對彼此的態度。",
    title: "人生劇本論"
  },
  { 
    id: "Q5", 
    part: 1,
    q: "第一次下筆的妳是如何摸索出小說的節奏感？", 
    a: "我只是小說讀多了，下筆時直覺哪裡該停、哪裡該換場。一開始我甚至不知道要表達什麼，所以「先寫再說」，事後才分章節。直到出版社定下書名，我才恍然大悟：對！我想說的就是——「我想被傾聽和接納，而不是指責或說教。」",
    title: "創作的節奏"
  },
  { 
    id: "Q6", 
    part: 1,
    q: "妳的故事中似乎看不到希望，是因為妳觀察到這社會對受害者要求很高，例如要活得勵志，或是對受害者的表現有一定的看法？", 
    a: "是的，我不想寫得太完美（簡單），我所謂的完美是，好像你只要求救了就會有人理你；你只要說「不」，對方就會停止；或是只要找到對的人就能獲救。因為在現實中，根本不會是那樣。\n其中一個令人失望的事，是社會對受傷的人有太多期待，總認為唯一出路是「活得勵志」，一旦你做不到，就被認為是你的問題。這讓我意識到其實很多人只是想看戲。這種期待會讓痛苦的人更困惑，因為總有人認為你活得不夠勵志，或認為你不可能這麼快走出來。但這其實都是一種「暗示」，我們都是在家庭和社會的暗示下長大，如果意識到自己的行為是受他人暗示的驅使，那麼脫掉這層外衣是必要的。只要察覺到了，你就有選擇權。",
    title: "社會的暗示"
  },
  { 
    id: "Q7", 
    part: 1,
    q: "作品深受《第十四道門》中黑貓名言的影響——「我們知道自己是誰，所以不需要名字」。這如何連結到妳說的「當有人比妳更了解妳時，處境會變得很危險」？", 
    a: "那句「我們知道自己是誰，所以不需要名字」就是我想說的「自我察覺」。這社會充滿了想幫你命名（暗示）的人，他們懷疑你的情緒，又要求你樂觀，甚至表現得比你還懂該怎麼痛。若你允許這些「名字」在身上紮根，你就離真正的自己越遠。\n透過自我察覺，我奪回了定義權。當我足夠了解自己，我就不再需要依賴別人給的名字，也有能力判斷對方的「行為」究竟是真心，還是純粹的惡意。\n我對人性其實是相當悲觀的。因為人終究是動物，在弱肉強食的潛意識基因裡，求救會被視為弱的表現。這也是危險所在——當你釋放弱點時，有些人會意識到你是可以被欺負的，甚至把求救者當成笨蛋，趁機操控你。但求救有很多種呈現方式，不一定都要傷痕累累、楚楚可憐。有時候受傷太重，就像身體遭受重創，你連回應的力氣都沒有。這種「沉默的呼救」，其實很少人能看得出來。",
    title: "名字與定義權"
  },
  { 
    id: "Q8", 
    part: 1,
    q: "在面對創傷帶來的負面情緒時，妳提到的「我就爛」態度，是一種什麼樣的心理策略？", 
    a: "情緒是一種本能反應，而人身為動物無法控制本能是正常的。但情緒隨之帶來的是力量，那股力量能驅使我們的行為，也能傷害自己本身。\n所以當過往中，已成事實的傷痛又來襲擊你時，唯一能做的就是對那情緒坦白——或者說是「擺爛」：「我就是被如何了」、「我就是遭遇了什麼」。\n當你承認的當下，情緒就無法再操控你的行為或攻擊你的思想，壓力反而會獲得紓解。接下來，才談得上所謂的面對與放下。",
    title: "我就爛策略"
  },
  { 
    id: "Q9", 
    part: 1,
    q: "這部作品裡，隱藏了多少妳真實人生的「私貨」？", 
    a: "當靈感不足時，我拿了在日本生活的經驗來豐富角色的背景。後來以為小說寫完了，而開始寫短篇，覺得有幾篇寫得真好，就乾脆把其中一個角色改成詩人，趁機把自己的詩作放進去。",
    title: "真實的私貨"
  },
  { 
    id: "Q10", 
    part: 1,
    q: "妳常提到察覺使妳改變，當妳思想產生變化時，會影響妳看待這部處女作嗎？", 
    a: "我習慣把每次的讀後心得當日記看待，用心得代表那個年紀對該書的看法。因為隨著成長，看同一本書的心情一定不同。這部小說也是，它記錄了我 30 歲時對社會和生命的看法。這很美好。\n只是隨著文筆進步，我一定也會看見越多這部小說的缺點，但這也是對未來所埋下的彩蛋。",
    title: "變化的視角"
  },
  { 
    id: "Q11", 
    displayId: "Q1",
    part: 2,
    q: "在「關於我成為作家的10個QA」採訪Q6中，妳提到「人是在暗示下長大」，有沒有甚麼例子可以讓人更深刻的體會到甚麼叫暗示呢？", 
    a: "我遇過一個女孩，家裡重男輕女極深，母親因為懷了女孩導致被婆婆虐待、被丈夫背叛，所以媽媽把一切仇恨都發洩在女孩的身上，後來弟弟誕生了，一切暴力似乎可以停止了。但弟弟因為感受的到媽媽的怨恨也變得非常憎恨姊姊，甚至會動手打她。\n她跟我說她從不怪她弟弟，弟弟只是聽媽媽的話，是個孝順的孩子。她說她的媽媽並不知道她有多討厭她；她的弟弟不知道他其實很愛她。她認為他們姊弟都是乖孩子，她意識到這個家不需要她，所以滿足媽媽的暗示離得他們遠遠的，但他們姊弟倆誰都沒有錯。\n以上正如我所說的「人是在暗示下長大」，你認為那位姊姊究竟做錯了甚麼？可以讓她弟弟恨到如此？而弟弟又為何可以膨脹到無法無邊？",
    title: "暗示的實例"
  },
  { 
    id: "Q12", 
    displayId: "Q2",
    part: 2,
    q: "呈上題，除了意識到暗示以外，讀者們也想知道還有甚麼其他保護自己的方式？", 
    a: "試著讓感性無限延伸地去體會這世界所擁有的黑暗面並接受和承認；讓理性保有權利去看見世界的良善面。\n我不否認傷痛的存在、不合理化惡的行為，暴力是一定且必然的存在，但我也必須捍衛自己的理性，讓理性引領我活下去。\n這也許很矛盾且困難，但其實這樣可以給自己有很多權利去選擇你的下一步，就像Q1的姊姊選擇理性地離開和活下去。",
    title: "保護的方式"
  },
  { 
    id: "Q13", 
    displayId: "Q3",
    part: 2,
    q: "呈上題，在受傷後還要「理性地看見美好」，這要怎麼做到呢？", 
    a: "你還記得在最初期時，當你被人攻擊和污蔑、誤導的最一開始，在你真的相信對方口中的你之前，你心裡的聲音是否反抗過？有的話，請保留並且帶著它質疑一切，再透過察覺漸漸找回真正的自己，直至你死去。",
    title: "理性的美好"
  },
  { 
    id: "Q14", 
    displayId: "Q4",
    part: 2,
    q: "呈上題，妳似乎都把所有情感區分得很有界限，連同理性都擬人化成有意識的情感，這是否是妳看事情的一個特點？", 
    a: "我想是的，這也是保護自己的一種方式，自我察覺如果可以快速到變成一種下意識的反射動作，你會發現你除了傷痛、憤怒以外，還有很多情緒都被這些激烈的情緒給淹沒了，被淹沒的情緒久了也會有壓力，甚至會潛移默化的影響你的身體。自我察覺也包含那些被忽略的聲音，只要聽到你就會發現你的選擇其實很多。",
    title: "情感的界限"
  },
  { 
    id: "Q15", 
    displayId: "Q5",
    part: 2,
    q: "妳主張人是動物，行為背後的目的比對方說的言語還重要，具體是甚麼意思呢？", 
    a: "因為不是每個人的自覺能力都很強，每個人都有盲點，但透過自覺你的盲點會越來越小。回歸到你問的，舉例來說：「你會一直跟別人強調你有一對雙眼嗎？」當你出生時就和其他人一樣擁有一對雙眼，你會一直向人說：「我有一對眼睛喔」。在我的觀察裡人不會過度強調事實，那對方又為什麼要這樣做？我認為那才是該去思考的部分。",
    title: "行為的目的"
  },
  { 
    id: "Q16", 
    displayId: "Q6",
    part: 2,
    q: "承接「關於我成為作家的10個QA」採訪Q8中「我就爛」的理念，很多人在問，那接下來呢？", 
    a: "休息吧。忙著生存的你或許已耗掉非常多的精力。我在學鋼琴的過程中學到一件事：「休息非常的重要」，當我有幾個音一直彈不好時，我會做點其他的事情去轉移注意力來休息，而每當我繼續回來練習時，我發現我總是可以有明顯的進步。\n許多人認為休息和快樂是不長進的表現，但我們身心都需要一個平衡，給自己一點喘息的空間、跟自己相處，等精神和體力恢復，你才能夠繼續前進。",
    title: "休息的重要"
  },
  { 
    id: "Q17", 
    displayId: "Q7",
    part: 2,
    q: "妳在「關於我成為作家的10個QA」的Q4提到「靈魂本來就是相親相愛的」但現實中，許多傷害卻來自最親近的原生家庭。當「愛的本質」與「錯誤的教育」衝突時，我們該如何自處？", 
    a: "首先我要說關於「愛」沒有一定的答案，只是在我的觀察中有些人在原生家庭中學到的愛是錯的。有人可能認為愛是控制、是改變、是犧牲，或是給予金錢，這也是為什麼有許多啃老族在父母要求他獨立時，他會感到不安，或是看見父母把錢給了別人，他會感到憤怒。\n再來，網路上曾有人說：「你的原生家庭會影響你選擇的另一半」這句話沒有錯，但我關心的是：「那接下來呢？」預判自己的選擇可以說是命、是上帝給的劇本內容，但既然知道自己容易這樣，那就需要察覺了。透過各種方式了解自己很好，但要繼續思考。\n最後，當你的原生家庭是地獄級別的，如果還有人用情緒勒索的方式要你回家，把戲演到「快樂結局」時，例如「父母沒把你丟在路邊」，請遠離這樣要求你的人，他們的道德觀和施暴者沒兩樣。我們感謝父母給我們生命這個事實，但也不要為了自己想擁有平安長大的權利而感到愧疚。接著再以情勒者所說的邏輯把自己給供起來好好養著，感謝自己還活著。",
    title: "原生家庭的愛"
  },
  { 
    id: "Q18", 
    displayId: "Q8",
    part: 2,
    q: "在成長過程中，我們常被教導要善良。但為什麼有時候我們釋出的善意，卻會被對方以惡意或不信任回報？這是否代表善良是有條件的？", 
    a: "有時候你的善良不被信任，也許是因為對方都是以惡待人。就跟鏡子一樣，對方把自己的行為套用在你身上，然後以此去預判和批評你，但對方不了解真正的你。此時你不需要多想為什麼總是解釋不清或是怎麼做都達不到對方的要求，你只需要意識到：「他正在防備他自己內心那個惡的投影。」轉身離開吧，因為你不可能期望鏡子做出和你不同的動作。\n這其實就回歸到我在「關於我成為作家的10個QA」的Q7所說的「當有人比你更了解你時，處境會變得很危險」，只是現在角色對調了過來。",
    title: "善良與鏡子"
  },
  { 
    id: "Q19", 
    displayId: "Q9",
    part: 2,
    q: "妳在「關於我成為作家的10個QA」的Q7提到被了解很危險，那妳會因為害怕被看透，而在社交中「隱藏」真實的自己嗎？", 
    a: "我想我們需要把焦點放在自己身上，我說的是要了解自己為優先，讓你自己成為最了解你的那個人，你就不必擔心自身被人給暗示。\n惡意會存在，走到哪都會遇到，唯一能掌控的就是你自己，所以我不會害怕「被看透」，只要我自己知道自己為什麼有那樣的反應就足夠了。\n「活得簡單」也是我想說的，不要把自己活得太複雜。我可以明白當過去陰影重現時，內心會感受到恐慌，反應會變得激烈，因為你想保護過去那個無法保護自己的你，但請保留理性的權利，讓理性在當下的時空多點觀察，再慢慢透過自覺活出單純的你。",
    title: "社交與真實"
  },
  { 
    id: "Q20", 
    displayId: "Q10",
    part: 2,
    q: "呈上題，「你為什麼不能選擇忘記？」、「你原諒不就沒事了？」這種也算一種暗示嗎？", 
    a: "這算一種要求，對情感不合理的要求。情感是本能所產生的，一種自發性的產物，身為動物的我們無法為此做出「選擇」，就像你無法選擇你要愛誰或是厭惡誰，「選擇」是理性在做的事情。\n但傷痛不是只是傷痛，它是有意義的，傷痛是你可以察覺自己過去遭受到甚麼影響的機會，那是你了解自己的契機，你的身體在向你求救，像個孩子不會說話只會讓你感到不舒服，所以你的理性就必須要去意識到這個不舒服，讓這個不快被看見，去承認它，你才能接住自己。",
    title: "原諒的暗示"
  },
  { 
    id: "Q21", 
    displayId: "Q11",
    part: 2,
    q: "妳強調的自我察覺，能不能舉個例子妳是怎麼做的？", 
    a: "當我有些情緒產生時，不論是正面或負面，我都會停下來思考剛剛發生了甚麼事情，假設是雨天讓我回家時把玄關弄得濕答答的而感到煩躁，或是過去那些陰影偶爾襲來的恐慌感出現導致，我會意識到那些「原因」是我無法改變的事實時，我就不會再被過去控制。\n其實很簡單就是先去認清甚麼是事實，理解情緒。人對未知是會有恐懼的，所以當你不了解你的情緒時，你的無知會放大你的感受。\n再來是多去聽聽自己說了甚麼、做了甚麼，用自己的行為去觀察自己想要甚麼，有時候我們會在某些情況下做出自身都無法預料的事情，導致氣氛尷尬或傷到別人，你除了觀察自己以外也要多看看別人的反應，不斷去反思原因。我覺得有意識的覺醒是對自己負責任的方式。",
    title: "察覺的實踐"
  },
  { 
    id: "Q22", 
    displayId: "Q12",
    part: 2,
    q: "讀者想知道，在「關於我成為作家的10個QA」的Q3提到小說是場意外的收穫，妳還有沒有其他的意外收穫呢？", 
    a: "意外收穫了對「人性的清醒」。當我越看清楚事實，越理解自己，我就能活得越輕鬆。有時候遭受惡意並非是受害者的問題，是對方的行為偏差導致，也就是說，今天換作是別人其實事件也是會發生，所以在我的小說裡，我才會認為是天使來人間代替人類受罪的。",
    title: "意外的收穫"
  },
  { 
    id: "Q23", 
    displayId: "Q13",
    part: 2,
    q: "妳對人性的觀察常帶有一種「動物性」的冷靜。對於社會大眾普遍歌頌的「自我犧牲」或「無私的愛」，妳是否抱持著不同的看法？", 
    a: "人是動物，為了生存與滿足自我，什麼事都做得出來。\n我認為，社會之所以如此用力地歌頌「犧牲」與「愛」，正是因為缺乏這些特質，才需要透過不斷的強調來掩飾。但這種歌頌偉大，反而成了人為本惡的鐵證，就如前面Q5所說「人不會過度強調事實」，也因此我在Q2強調「要讓感性去承認黑暗的存在，同時讓理性去守住那一點點後天選擇的良善。」。\n又或許，人是盲目的，只是一味跟從，久了就會變成一種要求；而那要求曾剝奪了許多人的聲音，只為了滿足大眾想看的一場秀。",
    title: "犧牲與愛"
  },
  { 
    id: "Q24", 
    displayId: "Q14",
    part: 2,
    q: "妳常提到要優先了解自己、收回定義權。在受傷後的自保過程中，這些是否都有其必要性？還是會過於自我中心？", 
    a: "我在小說的後記裡提過，我曾聽過一句話：「你的一切行為都有影響力」，所以我認為身而為人，在這個社會上生活，不論你的社會地位還是性別，只要你是個成年人，所說的話所做的事情，都要考慮到「社會責任」的問題，我甚至認為很多時候只要管好自己就是對這社會最大的貢獻。",
    title: "定義權與責任"
  }
];

interface DialogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
}

export default function DialogueModal({ isOpen, onClose, lang }: DialogueModalProps) {
  const [activeId, setActiveId] = useState("Q1");
  const [visibleCount, setVisibleCount] = useState(3);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPart2, setIsPart2] = useState(false);
  const [showMobileIndex, setShowMobileIndex] = useState(false);

  const translations = {
    en: {
      Q1: { q: "From collecting stamps in the library as a child to maintaining a post-reading writing habit now, reading seems to have been an uninterrupted rhythm in your life. What charm makes you still choose to read slowly and think slowly in this fast-paced era?", a: "The sense of achievement I gained in reading as a child came from my elementary school teacher's requirements. He had us pick a book in the library every week, and after reading it, write a reflection to accumulate points; once full, we could receive a certificate. Because of this, our whole class often went on stage together to receive awards, and I also discovered in this process that completing reading and writing itself is a satisfying thing.\nThis rhythm has accompanied me as I grew up. Looking back now, reading stories is not just about absorbing content, but prompting me to think constantly, and making me willing to slow down and organize my thoughts into words. Over time, writing became a way for me to understand myself, organize my emotions, and communicate with the world.", title: "Rhythm of Reading" },
      Q2: { q: "You once mentioned that a quote from Wang Yung-ching influenced your view on novels. How was that implanted in your mind? And why do you still believe that 'novels' have more power to save people?", a: "In high school, I read in Wang Yung-ching's book that he believed novels are an extension of the author's experience. This made me silently believe that one can learn many things in the world of novels. As I grew up, practical books became popular, but as I observed myself, I felt more and more that the world created by novels could teach more than practical books.\n\nFiction originates from reality, and it's all about stories of people; novels have contexts, I can feel, be surprised, and even perceive each other's differences with the protagonist, and then internalize them into my own experience. Just like elementary school teachers taught how to write 'propriety, justice, integrity, and honor', but how many people understand the meaning? How many people truly practice them?", title: "Power of Novels" },
      Q3: { q: "Many writers write for 'dreams', but I heard your opportunity was an unexpected gain brought by a 'disappointment'?", a: "I once read a very popular translated literature, but after reading it, I felt disappointed because I couldn't find any resonance at all (of course, this is related to cultural background and personal preference).\nAt that time, I thought: 'If this type of work can resonate with many people, then can I also write works with my own style?' I even felt that even if the writing was not mature enough, it wouldn't matter; perhaps it could even stimulate others to have the motivation of 'I can also write'. In this way, trying to write is not a loss anyway.", title: "Gain from Disappointment" },
      Q4: { q: "There is a very special 'Life Script Theory' in your work. Where did this inspiration come from?", a: "At that time, I read another book mentioning that children still have memories of talking to God after birth. This made me feel that people are born as God's actors, each holding a script to develop their lives. That is to say, our souls were originally loving each other, but it was only after drinking the Soup of Forgetfulness and acting in plays that our attitudes towards each other were affected.", title: "Life Script Theory" },
      Q5: { q: "As a first-time writer, how did you figure out the sense of rhythm in a novel?", a: "I just read many novels, and when I started writing, I intuitively knew where to stop and where to change scenes. At first, I didn't even know what I wanted to express, so I 'wrote first and talked later', and divided chapters afterwards. It wasn't until the publisher decided on the title that I suddenly realized: Yes! What I wanted to say was—'I want to be listened to and accepted, not criticized or lectured.'", title: "Rhythm of Creation" },
      Q6: { q: "There seems to be no hope in your stories. Is it because you observed that this society has high demands on victims, such as living inspirationally, or having certain views on the performance of victims?", a: "Yes, I don't want to write too perfectly (simply). What I mean by perfect is as if as long as you ask for help, someone will care; as long as you say 'no', the other party will stop; or as long as you find the right person, you can be saved. Because in reality, it's not like that at all.\nOne of the disappointing things is that society has too many expectations for injured people, always thinking the only way out is to 'live inspirationally'. Once you can't do it, it's considered your problem. This made me realize that many people actually just want to watch a show. This kind of expectation will make suffering people more confused, because someone always thinks you are not living inspirationally enough, or thinks you can't come out so quickly. But this is actually a kind of 'suggestion'. We all grow up under the suggestions of family and society. If we realize that our behavior is driven by others' suggestions, then taking off this layer of clothing is necessary. As long as you perceive it, you have the right to choose.", title: "Social Suggestions" },
      Q7: { q: "Your work is deeply influenced by the famous quote of the black cat in 'Coraline'—'We know who we are, so we don't need names'. How does this connect to what you said 'When someone knows you better than you do, the situation becomes very dangerous'?", a: "That sentence 'We know who we are, so we don't need names' is what I mean by 'self-awareness'. This society is full of people who want to help you name (suggest) yourself. They doubt your emotions, demand you to be optimistic, and even act as if they understand how to hurt better than you do. If you allow these 'names' to take root in you, you are further away from your true self.\nThrough self-awareness, I reclaimed the right of definition. When I understand myself enough, I no longer need to rely on the names given by others, and I have the ability to judge whether the other party's 'behavior' is sincere or pure malice.\nI am actually quite pessimistic about humanity. Because humans are animals after all, in the subconscious genes of the law of the jungle, asking for help will be seen as a sign of weakness. This is also where the danger lies—when you release your weakness, some people will realize that you can be bullied, and even treat the help-seeker as a fool, taking the opportunity to manipulate you. But there are many ways to present asking for help, not necessarily all scarred and pitiful. Sometimes the injury is too heavy, just like the body suffering a heavy blow, you don't even have the strength to respond. This 'silent cry for help' is actually rarely seen by people.", title: "Names and Right of Definition" },
      Q8: { q: "When facing negative emotions brought by trauma, the 'I'm just bad' attitude you mentioned is what kind of psychological strategy?", a: "Emotion is an instinctive reaction, and it's normal for humans as animals to be unable to control instinct. But what emotion brings is power; that power can drive our behavior and can also hurt ourselves.\nSo when in the past, the pain that has become a fact attacks you again, the only thing you can do is to be honest with that emotion—or 'let it be': 'I was just treated like this', 'I just encountered something'.\nThe moment you admit it, the emotion can no longer manipulate your behavior or attack your thoughts, and the pressure will be relieved instead. Next, we can talk about so-called facing and letting go.", title: "I'm Just Bad Strategy" },
      Q9: { q: "How much of your real life 'private goods' are hidden in this work?", a: "When inspiration was insufficient, I took the experience of living in Japan to enrich the characters' backgrounds. Later I thought the novel was finished and started writing short stories. I felt a few of them were really good, so I simply changed one of the characters to a poet and took the opportunity to put my own poems in.", title: "Real Private Goods" },
      Q10: { q: "You often mention that awareness changes you. When your thoughts change, will it affect how you look at this debut work?", a: "I'm used to treating each post-reading reflection as a diary, using reflections to represent my views on the book at that age. Because as I grow up, the mood of reading the same book will definitely be different. This novel is the same; it records my views on society and life at the age of 30. This is beautiful.\nIt's just that as my writing improves, I will definitely see more shortcomings of this novel, but this is also an Easter egg buried for the future.", title: "Changing Perspectives" },
      Q11: { q: "In Q6 of the '10 QAs on How I Became a Writer' interview, you mentioned 'people grow up under suggestions'. Are there any examples that can make people feel more deeply what suggestions are?", a: "I met a girl whose family favored boys over girls extremely deeply. The mother was abused by her mother-in-law and betrayed by her husband because she was pregnant with a girl, so the mother vented all her hatred on the girl. Later a brother was born, and all violence seemed to stop. But because the brother could feel the mother's resentment, he also became very hateful towards the sister, and would even hit her.\nShe told me she never blamed her brother; the brother just listened to the mother and was a filial child. She said her mother didn't know how much she hated her; her brother didn't know he actually loved her very much. She thought they were both good children. She realized this family didn't need her, so she satisfied the mother's suggestion and stayed far away from them, but neither of them was wrong.\nAs I said above, 'people grow up under suggestions'. What do you think that sister did wrong? To make her brother hate her so much? And why could the brother expand to be so lawless?", title: "Examples of Suggestions" },
      Q12: { q: "Following the previous question, besides realizing suggestions, what other ways can readers protect themselves?", a: "Try to let sensibility extend infinitely to experience the dark side of this world and accept and admit it; let rationality have the right to see the good side of the world.\nI don't deny the existence of pain, I don't rationalize evil behavior; violence is a certain and inevitable existence, but I must also defend my rationality and let rationality lead me to live on.\nThis may be contradictory and difficult, but actually this can give yourself many rights to choose your next step, just like the sister in Q1 chose to leave and live on rationally.", title: "Ways of Protection" },
      Q13: { q: "Following the previous question, how can one 'rationally see beauty' after being hurt?", a: "Do you still remember in the very early stage, when you were first attacked, slandered, and misled, before you really believed the you in the other party's mouth, did the voice in your heart ever resist? If so, please keep it and take it to question everything, and then gradually find your true self through awareness until you die.", title: "Rational Beauty" },
      Q14: { q: "Following the previous question, you seem to distinguish all emotions with very clear boundaries, even characterizing rationality as conscious emotion. Is this a characteristic of how you see things?", a: "I think so, and this is also a way to protect yourself. If self-awareness can be fast enough to become a subconscious reflex action, you will find that besides pain and anger, many of your other emotions are submerged by these intense emotions. Submerged emotions will also have pressure over time, and even imperceptibly affect your body. Self-awareness also includes those ignored voices. As long as you hear them, you will find that your choices are actually many.", title: "Boundaries of Emotion" },
      Q15: { q: "You advocate that humans are animals, and the purpose behind behavior is more important than the words the other party says. What does that specifically mean?", a: "Because not everyone's self-awareness ability is very strong, everyone has blind spots, but through self-awareness, your blind spots will become smaller and smaller. Returning to what you asked, for example: 'Will you keep emphasizing to others that you have a pair of eyes?' When you are born with a pair of eyes like everyone else, will you keep saying to people: 'I have a pair of eyes'. In my observation, people don't over-emphasize facts, so why does the other party do that? I think that's the part that should be thought about.", title: "Purpose of Behavior" },
      Q16: { q: "Following the 'I'm just bad' concept in Q8 of '10 QAs on How I Became a Writer', many people are asking, what's next?", a: "Take a rest. You who are busy surviving may have exhausted a lot of energy. I learned one thing in the process of learning piano: 'Rest is very important'. When I have a few notes that I can't play well, I will do something else to shift my attention to rest, and whenever I come back to practice, I find that I can always make significant progress.\nMany people think rest and happiness are signs of not making progress, but our body and mind both need a balance. Give yourself a little breathing space, spend time with yourself, and wait for your spirit and physical strength to recover before you can continue to move forward.", title: "Importance of Rest" },
      Q17: { q: "In Q4 of '10 QAs on How I Became a Writer', you mentioned 'souls were originally loving each other', but in reality, many injuries come from the closest original family. When 'the essence of love' conflicts with 'wrong education', how should we deal with it?", a: "First of all, I want to say there is no definite answer about 'love', but in my observation, some people learn the wrong love in their original family. Some may think love is control, change, sacrifice, or giving money. This is also why many NEETs feel uneasy when their parents require them to be independent, or feel angry when they see their parents giving money to others.\nFurthermore, someone once said on the internet: 'Your original family will affect the partner you choose'. This sentence is not wrong, but what I care about is: 'What's next?' Predicting your own choice can be said to be fate, the script content given by God, but since you know you are prone to this, then you need awareness. Understanding yourself through various ways is good, but you must continue to think.\nFinally, when your original family is at a hellish level, if someone still uses emotional blackmail to ask you to go home and act out a 'happy ending', such as 'your parents didn't throw you on the roadside', please stay away from such people who demand this of you. Their moral values are no different from those of the abusers. We thank our parents for the fact that they gave us life, but don't feel guilty for wanting to have the right to grow up peacefully. Then, use the logic of the emotional blackmailer to enshrine and take good care of yourself, thanking yourself for still being alive.", title: "Love of Original Family" },
      Q18: { q: "In the process of growing up, we are often taught to be kind. But why sometimes the kindness we release is returned with malice or distrust by the other party? Does this mean kindness is conditional?", a: "Sometimes your kindness is not trusted, perhaps because the other party treats everyone with malice. Just like a mirror, the other party applies their own behavior to you, and then uses this to predict and criticize you, but the other party doesn't understand the real you. At this time, you don't need to think too much about why you can't always explain clearly or why you can't meet the other party's requirements no matter what you do. You just need to realize: 'He is defending himself against the projection of evil in his own heart.' Turn around and leave, because you can't expect the mirror to make movements different from yours.\nThis actually returns to what I said in Q7 of '10 QAs on How I Became a Writer': 'When someone knows you better than you do, the situation becomes very dangerous', it's just that the roles are reversed now.", title: "Kindness and Mirror" },
      Q19: { q: "In Q7 of '10 QAs on How I Became a Writer', you mentioned being understood is dangerous. Then will you 'hide' your true self in social interaction for fear of being seen through?", a: "I think we need to focus on ourselves. What I'm saying is to prioritize understanding yourself, making yourself the person who understands you best, so you don't have to worry about being suggested by others.\nMalice will exist, you will encounter it wherever you go. The only thing you can control is yourself, so I won't be afraid of 'being seen through'. As long as I know why I have that reaction, it's enough.\n'Living simply' is also what I want to say, don't live your life too complicatedly. I can understand that when past shadows reappear, the heart will feel panic and the reaction will become intense because you want to protect the you in the past who couldn't protect yourself, but please keep the right of rationality, let rationality observe more in the current time and space, and then slowly live out a simple you through self-awareness.", title: "Social and Truth" },
      Q20: { q: "Following the previous question, 'Why can't you choose to forget?', 'Won't everything be fine if you forgive?' Is this also a kind of suggestion?", a: "This is a kind of demand, an unreasonable demand for emotions. Emotion is produced by instinct, a spontaneous product. As animals, we cannot make 'choices' for this, just as you cannot choose who you want to love or hate. 'Choice' is what rationality does.\nBut pain is not just pain, it is meaningful. Pain is an opportunity for you to perceive what influence you suffered in the past. That is the turning point for you to understand yourself. Your body is asking you for help, like a child who cannot speak and only makes you feel uncomfortable, so your rationality must realize this discomfort, let this unpleasantness be seen, and admit it, so you can catch yourself.", title: "Suggestion of Forgiveness" },
      Q21: { q: "You emphasize self-awareness. Can you give an example of how you do it?", a: "When some emotions arise, whether positive or negative, I will stop and think about what happened just now. Suppose it's a rainy day that makes me feel irritable when I come home and make the entrance wet, or the panic caused by those shadows occasionally attacking. When I realize those 'reasons' are facts I cannot change, I will no longer be controlled by the past.\nActually, it's very simple: first recognize what the facts are, and understand the emotions. Humans have fear of the unknown, so when you don't understand your emotions, your ignorance will amplify your feelings.\nFurthermore, listen more to what you said and what you did, and use your own behavior to observe what you want. Sometimes we do things we didn't expect in certain situations, leading to an awkward atmosphere or hurting others. Besides observing yourself, you should also look at others' reactions and constantly reflect on the reasons. I think conscious awakening is a way to be responsible for yourself.", title: "Practice of Awareness" },
      Q22: { q: "Readers want to know, in Q3 of '10 QAs on How I Became a Writer', you mentioned novels were an unexpected gain. Do you have any other unexpected gains?", a: "Unexpectedly gained 'sobriety of humanity'. The more I see the facts clearly and the more I understand myself, the more easily I can live. Sometimes suffering malice is not the victim's problem, it's caused by the other party's behavioral deviation. That is to say, if it were someone else today, the event would still happen. Therefore, in my novel, I think it's angels coming to the human world to suffer for humans.", title: "Unexpected Gains" },
      Q23: { q: "Your observation of humanity often carries a 'zoological' calmness. Do you hold different views on 'self-sacrifice' or 'selfless love' generally praised by the public?", a: "Humans are animals. To survive and satisfy themselves, they can do anything.\nI think the reason why society praises 'sacrifice' and 'love' so vigorously is precisely because of the lack of these qualities, and it needs to cover them up through constant emphasis. But this praise of greatness actually becomes ironclad proof of human inherent evil, just as said in Q5 'people don't over-emphasize facts'. Therefore, I emphasized in Q2 'to let sensibility admit the existence of darkness, and at the same time let rationality guard that little bit of post-selection goodness'.\nOr perhaps, people are blind and just follow blindly. Over time, it will become a demand; and that demand has deprived many people of their voices, just to satisfy a show the public wants to see.", title: "Sacrifice and Love" },
      Q24: { q: "You often mention prioritizing understanding yourself and reclaiming the right of definition. In the process of self-protection after being hurt, are these all necessary? Or will it be too self-centered?", a: "I mentioned in the afterword of the novel that I once heard a sentence: 'All your actions have influence'. So I think as a human being living in this society, regardless of your social status or gender, as long as you are an adult, what you say and what you do must consider the issue of 'social responsibility'. I even think that most of the time, just taking care of yourself is the greatest contribution to this society.", title: "Definition and Responsibility" }
    },
    ja: {
      Q1: { q: "子供の頃に図書館でスタンプを集めて読書をしていたことから、今でも読後の執筆習慣を維持していることまで、読書はあなたの生活の中で途切れることのないリズムのようです。このスピードの速い時代に、あえてゆっくり読み、ゆっくり考えることを選ぶのは、どのような魅力があるからでしょうか？", a: "子供の頃に読書で得た達成感は、小学校の担任の先生の要求から来ました。先生は私たちに毎週図書館で本を一冊選ばせ、読み終えた後に感想文を書くとポイントが貯まり、満点になると賞状がもらえるようにしました。そのおかげで、私たちのクラスはよく集団で壇上に上がって表彰されました。私もその過程で、読書と執筆を完了すること自体が満足感を得られることだと気づきました。\nこのリズムは私が成長するにつれてずっと寄り添ってくれました。今振り返ると、物語を読むことは単に内容を吸収することではなく、私に絶えず思考を促し、足を止めて考えを言葉に整理することをいとわなくさせてくれました。いつしか、執筆は自分を理解し、感情を整理し、世界とコミュニケーションをとるための一つの方法となりました。", title: "読書のリズム" },
      Q2: { q: "かつて王永慶氏の言葉があなたの小説に対する見方に影響を与えたとおっしゃっていましたが、それはどのように脳裏に植え付けられたのでしょうか？また、なぜ今でも「小説」には人を救う力がある信じているのでしょうか？", a: "高校時代、王永慶氏の本の中で、彼は小説を作者の経験の延長線上にあるものだと考えていると読みました。これにより、小説の世界では多くのことを学べると密かに思うようになりました。大人になると実用書が流行しましたが、自分自身を観察しているうちに、小説が作り出す世界で学べることは実用書よりも多いとますます感じるようになりました。\n\n虚構は現実に根ざしており、語られているのはすべて人と人の物語です。小説にはシチュエーションがあり、私は主人公と一緒に感じ、驚き、さらにはお互いの違いに気づき、それを自分の経験として内面化することができます。小学校の先生が「礼・義・廉・恥」の書き方を教えてくれたのと同じですが、その意味を理解している人がどれだけいるでしょうか？本当に実践している人は、どれだけいるでしょうか？", title: "小説の力" },
      Q3: { q: "多くの作家は「夢」のために執筆しますが、あなたのきっかけはある「失望」がもたらした予期せぬ収穫だったと聞きましたが？", a: "かつて非常に人気のある翻訳文学を読みましたが、読み終えた後、全く共感できずに失望してしまいました（もちろん、これは文化的な背景や個人の好みに関係しています）。\nその時、私はこう思いました。「もしこのタイプの作品が多くの人の共感を得られるなら、私も自分自身のスタイルを持った作品を書けるのではないか？」と。未熟な書き方であっても構わない、むしろ「私にも書ける」という動機を他人に刺激することになるかもしれない、と考えれば、執筆に挑戦することは決して損ではないと感じました。", title: "失望の収穫" },
      Q4: { q: "あなたの作品には非常に特殊な「人生脚本論」がありますが、このインスピレーションはどこから来たのでしょうか？", a: "当時、別の本も読んでいて、そこには子供は生まれた後も神様と対話した記憶を持っていると書かれていました。これにより、人間は生まれながらにして神様の役者であり、各自が脚本を持って人生を展開しているのだと感じるようになりました。つまり、私たちの魂はもともと愛し合っていたのですが、孟婆のスープを飲み、劇を演じることで、お互いに対する態度に影響が出ただけなのです。", title: "人生脚本論" },
      Q5: { q: "初めて筆を執ったあなたは、どのようにして小説のリズム感を模索したのでしょうか？", a: "私はただ小説をたくさん読んでいたので、書き始めた時にどこで止めるべきか、どこで場面を切り替えるべきかを直感的に知っていました。最初は自分が何を表現したいのかさえ分からなかったので、「まずは書く」ことから始め、後で章を分けました。出版社がタイトルを決めて初めて、私はハッと気づきました。そう！私が言いたかったのは――「私は指図されたり説教されたりするのではなく、耳を傾けられ、受け入れられたいのだ」ということでした。", title: "創作のリズム" },
      Q6: { q: "あなたの物語には希望が見えないように思えます。それは、この社会が被害者に対して、例えば励みになるように生きることや、被害者の振る舞いに対して一定の見方をすることなど、高い要求を課しているのを観察したからでしょうか？", a: "はい、私は完璧（単純）に書きすぎたくありません。私の言う完璧とは、助けを求めれば誰かが構ってくれる、あなたが「ノー」と言えば相手が止まる、あるいは正しい人を見つければ救われる、というようなことです。なぜなら現実には、決してそんな風にはいかないからです。\n失望させられることの一つは、社会が傷ついた人に対してあまりにも多くの期待を抱き、唯一の出口は「励みになるように生きること」だと考え、それができないとあなたの問題だと見なされることです。これにより、多くの人は実はただ劇を見たいだけなのだと気づきました。このような期待は、苦しんでいる人をさらに混乱させます。なぜなら、誰かが常にあなたの生き方が十分に励みにならないと考えたり、そんなに早く立ち直れるはずがないと考えたりするからです。しかし、これは実は一種の「暗示」です。私たちは皆、家庭や社会の暗示の下で育ちます。もし自分の行動が他人の暗示によって突き動かされていることに気づけば、その上着を脱ぎ捨てることが必要です。気づきさえすれば、あなたには選択権があります。", title: "社会の暗示" },
      Q7: { q: "作品は『コララインとボタンの魔女』の黒猫の名言――「私たちは自分が誰であるかを知っているから、名前は必要ない」から深い影響を受けています。これは、あなたが言う「誰かがあなた以上にあなたを理解しているとき、状況は非常に危険になる」という言葉とどのように結びついているのでしょうか？", a: "その「私たちは自分が誰であるかを知っているから、名前は必要ない」という言葉こそが、私の言う「自己察覚」です。この社会には、あなたに名前を付け（暗示を与え）ようとする人々で溢れています。彼らはあなたの感情を疑い、楽観的であることを要求し、さらにはあなた以上にどう痛むべきかを理解しているかのように振る舞います。もしこれらの「名前」が自分の中に根付くことを許してしまえば、あなたは本当の自分から遠ざかってしまいます。\n自己察覚を通じて、私は定義権を取り戻しました。自分自身を十分に理解したとき、もはや他人が付けた名前に依存する必要はなくなり、相手の「行動」が真心なのか、それとも純粋な悪意なのかを判断する能力を持つことができます。\n私は実は人間性に対してかなり悲観的です。人間は結局のところ動物であり、弱肉強食の潜在意識の遺伝子の中では、助けを求めることは弱さの表現と見なされます。これこそが危険な点です――あなたが弱みを見せたとき、一部の人々はあなたが虐められる対象であると認識し、助けを求める人を馬鹿扱いして、隙あらばあなたをコントロールしようとします。しかし、助けを求めることには多くの表現方法があり、必ずしも傷だらけで可哀想である必要はありません。時には傷が深すぎて、体が大きなダメージを受けた時のように、反応する力さえないこともあります。このような「沈黙の叫び」は、実は気づける人はほとんどいません。", title: "名前と定義権" },
      Q8: { q: "トラウマがもたらすネガティブな感情に直面したとき、あなたが言及した「私はダメだ」という態度は、どのような心理的戦略なのでしょうか？", a: "感情は本能的な反応であり、人間が動物として本能をコントロールできないのは当然のことです。しかし、感情が同時にもたらすのは力であり、その力は私たちの行動を突き動かすこともあれば、自分自身を傷つけることもあります。\nですから、過去において、すでに事実となった痛みが再びあなたを襲ってきたとき、唯一できることはその感情に対して正直になること――あるいは「投げ出す」ことです。「私は単にこうされたのだ」、「私は単に何かに遭遇したのだ」と。\nあなたがそれを認めた瞬間、感情はもはやあなたの行動をコントロールしたり思考を攻撃したりすることはできなくなり、逆にプレッシャーは解消されます。その次に、ようやく向き合うことや手放すことについて語ることができるのです。", title: "「私はダメだ」戦略" },
      Q9: { q: "この作品には、あなたの実生活の「私物」がどれくらい隠されているのでしょうか？", a: "インスピレーションが足りない時、日本での生活経験を借りてキャラクターの背景を豊かにしました。後で小説を書き終えたと思い、短編を書き始めましたが、そのうちの数編が本当に良い出来だと思ったので、思い切ってそのうちの一人のキャラクターを詩人に変え、自分の詩をそこに入れました。", title: "真実の私物" },
      Q10: { q: "気づきがあなたを変えるとよくおっしゃっていますが、あなたの思考が変化したとき、この処女作に対する見方に影響はありますか？", a: "私は毎回の読後の感想を日記のように扱う習慣があり、感想はその年齢でのその本に対する見方を代表するものとしています。成長するにつれて、同じ本を読んでも心境は必ず異なるからです。この小説も同じで、30歳の時の社会や生命に対する見方を記録しています。それはとても素晴らしいことです。\nただ、文章が上達するにつれて、この小説の欠点もより多く見えるようになるでしょうが、それも未来に向けた伏線（イースターエッグ）なのです。", title: "変化する視点" },
      Q11: { q: "「私が作家になるまでの10のQA」のインタビューQ6で、あなたは「人間は暗示の下で育つ」とおっしゃっていましたが、暗示とは何かをより深く体感できるような例はありますか？", a: "私はある女の子に出会いました。その家は男尊女卑が非常に激しく、母親は女の子を身ごもったために姑から虐待され、夫から裏切られました。そのため、母親はすべての憎しみをその女の子にぶつけました。その後、弟が誕生し、すべての暴力は止まるかのように見えました。しかし、弟は母親の怨念を感じ取ったため、姉を非常に憎むようになり、手を上げるようにさえなりました。\n彼女は私に、弟を一度も責めたことはないと言いました。弟はただ母親の言うことを聞いているだけで、親孝行な子なのだと。彼女は、母親は自分がどれほど彼女を嫌っているかを知らないし、弟は自分が実は彼女をとても愛していることを知らないのだと言いました。彼女は、自分たち姉弟は二人とも良い子だと思っていました。彼女はこの家には自分が必要ないことに気づき、母親の暗示を満たすために彼らから遠く離れましたが、姉弟のどちらも間違っていないと考えていました。\n以上のことは、私が言った「人間は暗示の下で育つ」という通りです。あなたはそのお姉さんが一体何を間違えたと思いますか？弟にこれほどまで憎まれるようなことをしたのでしょうか？そして弟はなぜこれほどまでに傍若無人に膨れ上がることができたのでしょうか？", title: "暗示の実例" },
      Q12: { q: "前問に続き、暗示に気づくこと以外に、読者が自分を守るための他の方法はありますか？", a: "感性を無限に広げて、この世界が持つ暗い面を体験し、それを受け入れ認めるように努めてください。そして、理性には世界の善良な面を見る権利を保持させてください。\n私は痛みの存在を否定しませんし、悪の行為を正当化もしません。暴力は一定であり必然的な存在ですが、私は自分の理性を守り、理性が私を導いて生きていけるようにしなければなりません。\nこれは矛盾していて困難かもしれませんが、実はこれによって、Q1のお姉さんが理性的に立ち去り生きることを選んだように、自分の次のステップを選択するための多くの権利を自分に与えることができるのです。", title: "保護の方法" },
      Q13: { q: "前問に続き、傷ついた後に「理性的に美しさを見る」には、どうすればいいのでしょうか？", a: "一番最初の時期、あなたが攻撃され、汚され、誤解されたその最初、相手の言う通りの自分を本当に信じてしまう前に、あなたの心の中の声は反抗しませんでしたか？もしそうなら、どうかそれを持ち続け、すべてを疑ってください。そして察覚を通じて、死ぬまで本当の自分を少しずつ取り戻していってください。", title: "理性の美しさ" },
      Q14: { q: "前問に続き、あなたはすべての感情を非常に明確に境界線で区切っているようで、理性さえも意識的な感情として擬人化していますが、これはあなたの物事の見方の特徴ですか？", a: "そう思います。これも自分を守るための一つの方法です。自己察覚が下意識の反射動作になるほど速くなれば、痛みや怒り以外にも、多くの感情がこれらの激しい感情に飲み込まれていることに気づくでしょう。飲み込まれた感情は時間が経つとストレスになり、さらには潜在的に体に影響を与えます。自己察覚には、無視されてきた声も含まれます。その声を聴きさえすれば、自分の選択肢が実はたくさんあることに気づくはずです。", title: "感情の境界線" },
      Q15: { q: "あなたは人間は動物であり、行動の背後にある目的は相手が言う言葉よりも重要だと主張していますが、具体的にはどういう意味でしょうか？", a: "すべての人の自覚能力が強いわけではなく、誰にでも盲点がありますが、自覚を通じて盲点はどんどん小さくなっていきます。あなたの質問に戻ると、例えば：『あなたは一対の目を持っていることを他人に強調し続けますか？』生まれた時から他の人と同じように一対の目を持っているなら、人に『私には目がありますよ』と言い続けることはないでしょう。私の観察では、人は事実を過度に強調することはありません。では、なぜ相手はそうするのでしょうか？私はそれこそが考えるべき部分だと思います。", title: "行動の目的" },
      Q16: { q: "「私が作家になるまでの10のQA」のQ8にある「私はダメだ」という理念を引き継いで、多くの人が「その次は？」と尋ねていますが？", a: "休みましょう。生きることに追われているあなたは、おそらく非常に多くのエネルギーを消耗しています。私はピアノを習う過程で一つのことを学びました：『休息は非常に重要である』ということです。何度弾いてもうまくいかない音があるとき、私は他のことをして注意をそらし、休みます。そして再び練習に戻るたびに、常に明らかな進歩があることに気づきます。\n多くの人は、休息や楽しみは向上心のない表れだと考えますが、私たちの心身にはバランスが必要です。自分に少しの息抜きの空間を与え、自分自身と向き合い、精神と体力が回復するのを待って初めて、前進し続けることができるのです。", title: "休息的重要" },
      Q17: { q: "「私が作家になるまでの10のQA」のQ4で「魂はもともと愛し合っている」とおっしゃっていましたが、現実には多くの傷が最も身近な原家族から生じます。「愛の本質」と「誤った教育」が衝突したとき、私たちはどう身を処すべきでしょうか？", a: "まず、『愛』について決まった答えはないと言っておきます。ただ私の観察では、原家族の中で学んだ愛が間違っている人がいます。愛とは支配すること、変えること、犠牲にすること、あるいは金銭を与えることだと考えている人がいるかもしれません。だからこそ、多くのパラサイト・シングルは親から自立を求められた時に不安を感じたり、親が他の人に金を渡すのを見て怒りを感じたりするのです。\nまた、ネット上で『あなたの原家族は、あなたが選ぶパートナーに影響を与える』という言葉がありますが、これは間違いではありません。しかし私が関心があるのは、『その次は？』ということです。自分の選択を予測することは運命であり、神が与えた台本の内容だと言えますが、自分がそうなりやすいと分かっているなら、察覚が必要です。様々な方法で自分を知ることは良いことですが、考え続ける必要があります。\n最後に、あなたの原家族が地獄レベルである場合、もし誰かが感情的なゆすりを使ってあなたを家に帰らせ、『ハッピーエンド』の芝居を演じさせようとするなら（例えば『親はあなたを道端に捨てなかった』など）、そんな要求をする人からは離れてください。彼らの道徳観は加害者と何ら変わりません。私たちは親が命をくれたという事実に感謝しますが、自分が平安に育つ権利を持ちたいと願うことに罪悪感を感じる必要もありません。そして、感情的なゆすりをする人が言う論理に従って、自分自身を大切に祀り上げ、生きていることに感謝してください。", title: "原生家庭の愛" },
      Q18: { q: "成長の過程で、私たちはよく親切であるように教えられます。しかし、なぜ時として私たちが差し出した善意が、相手から悪意や不信感で返されることがあるのでしょうか？これは親切には条件があるということですか？", a: "時としてあなたの親切が信頼されないのは、おそらく相手が誰に対しても悪意を持って接しているからかもしれません。鏡と同じように、相手は自分の行動をあなたに当てはめ、それによってあなたを予測し批判しますが、相手は本当のあなたを理解していません。この時、なぜいつもはっきりと説明できないのか、あるいはどうやっても相手の要求に届かないのかを考えすぎる必要はありません。ただ、『彼は自分自身の心の内の悪の投影を警戒しているのだ』と気づくだけでいいのです。背を向けて立ち去りましょう。鏡があなたと異なる動きをすることを期待することはできないからです。\nこれは実は、『私が作家になるまでの10のQA』のQ7で言った『誰かがあなた以上にあなたのことを知っているとき、状況は非常に危険になる』ということに戻りますが、今は役割が入れ替わっただけです。", title: "親切と鏡" },
      Q19: { q: "「私が作家になるまでの10のQA」のQ7で、理解されることは危険だと言及されていました。では、あなたは人から見透かされるのを恐れて、社交の場で本当の自分を「隠す」ことがありますか？", a: "自分自身に焦点を当てる必要があると思います。私が言っているのは、自分を理解することを優先し、自分が自分を最もよく知る人間になることで、他人の暗示を心配する必要がなくなるということです。\n悪意は存在し、どこへ行っても遭遇します。唯一コントロールできるのは自分自身だけです。だから私は「見透かされる」ことを恐れません。自分がなぜそのような反応をするのかを自分自身が知っていれば、それで十分なのです。\n「シンプルに生きる」ということも私が言いたいことです。自分を複雑にしすぎないでください。過去の影が再来したとき、心がパニックを感じ、反応が激しくなるのは理解できます。それは過去の自分を守れなかった自分を守りたいからです。しかし、理性の権利を保持し、理性に現在の時空でもっと観察させ、自己察覚を通じてゆっくりと純粋な自分を生きてください。", title: "社交と真実" },
      Q20: { q: "前問に続き、「なぜ忘れることを選べないのか？」「許せば済むことじゃないか？」というのも一種の暗示ですか？", a: "それは一種の要求であり、感情に対する不合理な要求です。感情は本能から生じる自発的な産物であり、動物である私たちはそれに対して「選択」をすることはできません。誰を愛し、誰を嫌うかを選べないのと同じです。「選択」は理性がすることです。\nしかし、痛みはただの痛みではなく、意味があります。痛みは、過去に自分がどのような影響を受けたかに気づくための機会であり、自分を知るためのきっかけです。あなたの体はあなたに助けを求めています。言葉を話せず、ただ不快感を与えるだけの子供のようなものです。ですから、あなたの理性がその不快感に気づき、その不快さを見えるようにし、それを認めてあげることで、初めて自分自身をキャッチできるのです。", title: "原諒の暗示" },
      Q21: { q: "あなたが強調する自己察覚について、どのように行っているか例を挙げてもらえますか？", a: "ポジティブであれネガティブであれ、何らかの感情が生じたとき、私は立ち止まって今何が起こったのかを考えます。例えば、雨の日に帰宅して玄関を濡らしてしまったことにイライラしたり、過去の影が時折襲ってくるパニックが原因だったりする場合、それらの「原因」が自分では変えられない事実であると気づけば、もはや過去に支配されることはありません。\n実はとてもシンプルです。まず何が事実かを見極め、感情を理解することです。人間は未知のものに対して恐怖を抱きます。ですから、自分の感情を理解していないとき、無知があなたの感情を増幅させてしまうのです。\nさらに、自分が何を言い、何をしたかをもっと聴き、自分の行動から自分が何を望んでいるかを観察してください。時として、私たちは特定の状況で自分でも予想外のことをしてしまい、気まずい雰囲気になったり他人を傷つけたりすることがあります。自分を観察するだけでなく、他人の反応もよく見て、その原因を絶えず反省すべきです。意識的な目覚めこそが、自分に対する責任の取り方だと思います。", title: "察覚の実践" },
      Q22: { q: "読者は、「私が作家になるまでの10のQA」のQ3で小説は意外な収穫だったと言及されていましたが、他に意外な収穫はありましたか？と知りたがっています。", a: "「人間性に対する覚醒」を予期せず収穫しました。事実をはっきりと見れば見るほど、自分自身を理解すればするほど、より楽に生きることができます。時として悪意を受けるのは被害者の問題ではなく、相手の行動の偏りによるものです。つまり、今日それが別の人であっても、事件は起こっていたということです。だから私の小説では、天使が人類の代わりに苦しむために人間界に来たのだと考えているのです。", title: "意外の収穫" },
      Q23: { q: "人間性に対するあなたの観察は、しばしば「動物的」な冷静さを帯びています。社会一般で広く称賛されている「自己犠牲」や「無私の愛」について、異なる見解をお持ちですか？", a: "人間は動物であり、生き残り、自己を満たすためなら何でもします。\n社会がこれほどまでに「犠牲」や「愛」を声高に称賛するのは、まさにそれらの資質が欠けているからこそ、絶え間ない強調を通じて覆い隠す必要があるからだと私は考えています。しかし、このような偉大さの称賛は、かえって人間が本来悪であることの鉄の証拠となってしまいました。前述のQ5で言ったように「人は事実を過度に強調しない」からです。だからこそQ2で「感性には闇の存在を認めさせ、同時に理性には後天的に選択したわずかな善良さを守らせるべきだ」と強調したのです。\nあるいは、人間は盲目であり、ただ盲目的に従っているだけなのかもしれません。時間が経てばそれは一種の要求となり、その要求はかつて多くの人々の声を奪ってきました。ただ大衆が見たいショーを満足させるためだけに。", title: "犠牲と愛" },
      Q24: { q: "あなたはよく、自分を理解することを優先し、定義権を取り戻すべきだと言及されています。傷ついた後の自己防衛の過程において、これらはすべて必要不可欠なものですか？それとも自己中心的すぎますか？", a: "小説の後書きで、「あなたのすべての行動には影響力がある」という言葉を聞いたことがあると言及しました。ですから、人間としてこの社会で生きる以上、社会的な地位や性別に関わらず、成人であるならば、発する言葉や行う行動はすべて「社会的責任」の問題を考慮すべきだと考えています。私は、多くの場合、自分自身を律することこそがこの社会に対する最大の貢献であるとさえ思っています。", title: "定義権と責任" }
    }
  };

  const getTranslatedDialogues = (l: string) => {
    if (l === 'zh') return dialogues;
    const langTrans = translations[l as 'en' | 'ja'];
    return dialogues.map(d => {
      const trans = langTrans[d.id as keyof typeof langTrans];
      if (trans) {
        return {
          ...d,
          q: trans.q,
          a: trans.a,
          title: trans.title
        };
      }
      return d;
    });
  };

  const currentDialogues = getTranslatedDialogues(lang);

  const t = {
    zh: {
      modalTitle: "【子瓏的深度察覺筆記】",
      modalSub: "子瓏：24 則關於認知主權的深層對話",
      indexTitle: "目錄導覽",
      part1Title: "第一部：作家之路",
      part2Title: "第二部：深度察覺",
      part1Full: "第一部：關於我如何成為作家的 10 個 QA",
      part2Full: "第二部：子瓏的深度察覺筆記（14 題）",
      introQuote: "「在別人的劇本裡，你只是個被命名的角色。」",
      introDesc: "這 24 則對話分為兩部。第一部【關於我如何成為作家的 10 個 QA】記錄了我創作和覺察的真實過程；第二部為進階版【子瓏的深度察覺筆記】。\n\n為了幫你找回失落的原初聲音，你可以由【子瓏的深度察覺筆記】 Q1 循序進入，剝離那些不屬於你的裝扮；或者利用以下「價值地圖」，在你需要的生存座標上，重新定義自己。",
      authorLabel: "子瓏：",
      nextLabel: "下一則察覺：關於 ",
      loadMore: "深呼吸，繼續下三則察覺",
      backToReality: "回到現實"
    },
    en: {
      modalTitle: "[Zi Long's Deep Awareness Notes]",
      modalSub: "Zi Long: 24 Deep Dialogues on Cognitive Sovereignty",
      indexTitle: "Index",
      part1Title: "Part I: Writer's Path",
      part2Title: "Part II: Deep Awareness",
      part1Full: "Part I: 10 QAs on How I Became a Writer",
      part2Full: "Part II: Zi Long's Deep Awareness Notes (14 QAs)",
      introQuote: "\"In others' scripts, you are just a named character.\"",
      introDesc: "These 24 dialogues are divided into two parts. Part I [10 QAs on How I Became a Writer] records the authentic process of my creation and awareness; Part II is the advanced version [Zi Long's Deep Awareness Notes].\n\nTo help you find your lost original voice, you can enter sequentially from Q1 of [Zi Long's Deep Awareness Notes] to strip away the costumes that don't belong to you; or use the \"Value Map\" below to redefine yourself on the survival coordinates you need.",
      authorLabel: "Zi Long:",
      nextLabel: "Next Awareness: About ",
      loadMore: "Take a deep breath, continue with next 3 awarenesses",
      backToReality: "Back to Reality"
    },
    ja: {
      modalTitle: "【子瓏の深度察覚ノート】",
      modalSub: "子瓏：認知的主権に関する24の深層対話",
      indexTitle: "目次",
      part1Title: "第一部：作家への道",
      part2Title: "第二部：深度察覚",
      part1Full: "第一部：私が作家になるまでの10のQA",
      part2Full: "第二部：子瓏の深度察覚ノート（14題）",
      introQuote: "「他人の台本の中では、あなたは単に名前を付けられた登場人物に過ぎません。」",
      introDesc: "この24の対話は二部構成です。第一部【私が作家になるまでの10のQA】は、私の創作と気づきの真実のプロセスを記録しています。第二部は上級編【子瓏の深度察覚ノート】です。\n\n失われた本来の声を取り戻すために、【子瓏の深度察覚ノート】のQ1から順に入り、自分のものではない装いを取り除くことができます。あるいは、以下の「バリューマップ」を利用して、必要な生存座標の上で自分を再定義してください。",
      authorLabel: "子瓏：",
      nextLabel: "次の気づき：",
      loadMore: "深呼吸して、次の3つの気づきへ",
      backToReality: "現実に戻る"
    }
  }[lang as 'zh' | 'en' | 'ja'];

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const elements = contentRef.current.querySelectorAll("[data-qa-id]");
      let currentId = activeId;
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          currentId = el.getAttribute("data-qa-id") || currentId;
        }
      });
      
      setActiveId(currentId);
      
      const currentQA = currentDialogues.find(d => d.id === currentId);
      setIsPart2(currentQA?.part === 2);
    };

    const scrollArea = contentRef.current;
    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll);
    }
    return () => scrollArea?.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, currentDialogues.length));
  };

  const renderAnswer = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (i === 0) {
        // Highlight first sentence
        const parts = line.split("。");
        if (parts.length > 1) {
          return (
            <p key={i} className="mb-4">
              <span className="text-accent font-bold">{parts[0]}。</span>
              {parts.slice(1).join("。")}
            </p>
          );
        }
      }
      return <p key={i} className="mb-4">{line}</p>;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] overflow-y-auto bg-bg/80 backdrop-blur-md flex items-center justify-center p-0 md:p-4 md:py-12"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full h-full md:h-[90vh] md:max-w-6xl bg-bg md:border md:border-accent/20 md:rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-colors duration-1000 ${isPart2 ? 'bg-black' : 'bg-[#1A1A1A]'}`}
          >
            {/* Background Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* Header */}
            <div className="relative z-10 p-6 md:px-12 md:py-8 border-b border-accent/10 flex items-center justify-between bg-bg/50 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowMobileIndex(!showMobileIndex)}
                  className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors text-accent border border-accent/20"
                >
                  <BookOpen size={20} />
                </button>
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight">{t.modalTitle}</h2>
                  <p className="text-[10px] mono-label text-accent opacity-60 mt-1">{t.modalSub}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-accent/10 rounded-full transition-colors text-accent"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative z-10 flex flex-1 overflow-hidden">
              {/* Mobile Index Overlay */}
              <AnimatePresence>
                {showMobileIndex && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="absolute inset-0 z-50 bg-bg md:hidden overflow-y-auto p-8 custom-scrollbar"
                  >
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="mono-label text-accent">{t.indexTitle}</h3>
                      <button onClick={() => setShowMobileIndex(false)} className="text-accent">
                        <X size={24} />
                      </button>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <p className="mono-label text-accent/40 mb-4 text-[9px]">{t.part1Title}</p>
                        <div className="space-y-4">
                          {currentDialogues.slice(0, 10).map(d => (
                            <button
                              key={d.id}
                              onClick={() => {
                                setVisibleCount(currentDialogues.length); // Show all to allow scrolling
                                scrollToId(d.id);
                                setShowMobileIndex(false);
                              }}
                              className={`block w-full text-left text-[18px] transition-all duration-300 ${activeId === d.id ? 'text-accent font-bold pl-2 border-l-2 border-accent' : 'text-muted'}`}
                            >
                              {d.id}. {d.title}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mono-label text-accent/40 mb-4 text-[9px]">{t.part2Title}</p>
                        <div className="space-y-4">
                          {currentDialogues.slice(10).map(d => (
                            <button
                              key={d.id}
                              onClick={() => {
                                setVisibleCount(currentDialogues.length);
                                scrollToId(d.id);
                                setShowMobileIndex(false);
                              }}
                              className={`block w-full text-left text-[18px] transition-all duration-300 ${activeId === d.id ? 'text-accent font-bold pl-2 border-l-2 border-accent' : 'text-muted'}`}
                            >
                              {d.displayId || d.id}. {d.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sidebar Index - Desktop */}
              <div className="hidden md:block w-64 border-r border-accent/10 overflow-y-auto p-8 custom-scrollbar bg-bg/30">
                <div className="space-y-8">
                  <div>
                    <p className="mono-label text-accent/40 mb-4 text-[9px]">{t.part1Title}</p>
                    <div className="space-y-2">
                      {currentDialogues.slice(0, 10).map(d => (
                        <button
                          key={d.id}
                          onClick={() => scrollToId(d.id)}
                          className={`block w-full text-left text-[18px] transition-all duration-300 ${activeId === d.id ? 'text-accent font-bold translate-x-2' : 'text-muted hover:text-accent/60'}`}
                        >
                          {d.id}. {d.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mono-label text-accent/40 mb-4 text-[9px]">{t.part2Title}</p>
                    <div className="space-y-2">
                      {currentDialogues.slice(10).map(d => (
                        <button
                          key={d.id}
                          onClick={() => scrollToId(d.id)}
                          className={`block w-full text-left text-[18px] transition-all duration-300 ${activeId === d.id ? 'text-accent font-bold translate-x-2' : 'text-muted hover:text-accent/60'}`}
                        >
                          {d.displayId || d.id}. {d.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div 
                ref={contentRef}
                className="flex-1 overflow-y-auto p-6 md:p-16 custom-scrollbar scroll-smooth"
              >
                {/* Intro Declaration */}
                <div className="max-w-2xl mb-24">
                  <p className="text-accent font-serif text-xl md:text-2xl italic leading-relaxed mb-8">
                    {t.introQuote}
                  </p>
                  <p className="text-white/60 text-[18px] leading-[1.8]" style={{ whiteSpace: 'pre-wrap' }}>
                    {t.introDesc}
                  </p>
                </div>

                {/* QA Sections */}
                <div className="space-y-32 pb-32">
                  {/* Part 1 Header */}
                  <div className="border-l-4 border-accent pl-6 py-2 mb-16">
                    <h3 className="text-2xl font-serif font-bold">{t.part1Full}</h3>
                  </div>

                  {currentDialogues.map((d, index) => {
                    // Mobile progressive disclosure
                    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                    if (isMobile && index >= visibleCount) return null;

                    return (
                      <div key={d.id} id={d.id} data-qa-id={d.id} className="scroll-mt-32">
                        {index === 10 && (
                          <div className="border-l-4 border-accent pl-6 py-2 mb-16 mt-32">
                            <h3 className="text-2xl font-serif font-bold">{t.part2Full}</h3>
                          </div>
                        )}
                        
                        <div className="max-w-3xl">
                          <div className="flex items-start gap-4 mb-8">
                            <span className="font-mono text-accent/40 text-[18px] mt-1">{d.displayId || d.id}.</span>
                            <h4 className="text-white/80 text-[18px] md:text-[20px] font-serif leading-relaxed">
                              {d.q}
                            </h4>
                          </div>
                          
                          <div className="pl-12 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-accent/10" />
                            <div className="text-white text-[18px] md:text-[20px] leading-[1.8] font-serif" style={{ whiteSpace: 'pre-wrap' }}>
                              <span className="block text-[18px] font-serif text-accent/40 mb-4">{t.authorLabel}</span>
                              <div className="text-[#E0E0E0]">
                                {renderAnswer(d.a)}
                              </div>
                            </div>
                          </div>

                          {index < currentDialogues.length - 1 && (
                            <button 
                              onClick={() => scrollToId(currentDialogues[index + 1].id)}
                              className="mt-12 ml-12 group flex items-center gap-3 text-accent/60 hover:text-accent transition-all duration-300"
                            >
                              <span className="text-[18px] font-serif">{t.nextLabel}{currentDialogues[index + 1].title}</span>
                              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Mobile Load More */}
                  {visibleCount < currentDialogues.length && (
                    <div className="flex justify-center pt-12 md:hidden">
                      <button 
                        onClick={loadMore}
                        className="px-8 py-4 border border-accent/30 rounded-full text-accent flex items-center gap-3"
                      >
                        <span className="font-bold">{t.loadMore}</span>
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 p-6 border-t border-accent/10 bg-bg/50 backdrop-blur-sm flex justify-center">
              <button 
                onClick={onClose}
                className="px-10 py-3 bg-accent text-bg rounded-full font-bold hover:scale-105 transition-transform"
              >
                {t.backToReality}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

