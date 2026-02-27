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
    q: "從童年在圖書館集章閱讀，到現在維持讀後書寫的習慣，閱讀似乎一直是你生活中不曾中斷的節奏。是什麼魅力讓你在快速的時代裡，仍選擇慢慢讀、慢慢想？", 
    a: "小時候在閱讀上獲得的成就感，來自國小導師的要求。他讓我們每星期在圖書館選一本書，閱畢後寫一篇心得便能累積點數，集滿就能領獎狀。因為這樣，我們全班常常集體上台領獎，我也在這個過程中發現，完成閱讀與書寫本身是一件令人滿足的事。\n這個節奏伴隨著我長大。現在回頭看，閱讀故事不只是吸收內容，而是促使我不斷思考，也讓我願意放慢腳步，把想法整理成文字。久而久之，書寫成了我理解自己、整理情緒，並與世界溝通的一種方式。",
    title: "閱讀的節奏"
  },
  { 
    id: "Q2", 
    part: 1,
    q: "你曾提到王永慶的一句話影響了你對小說的看法，那是如何植入腦海的？又為什麼依然相信「小說」更有拯救人的力量？", 
    a: "高中時我在王永慶的書裡讀到，他認為小說是作者經驗的延伸。這讓我默默認為在小說世界可以學到很多事。長大後工具書盛行，但我觀察著自己越發覺得小說創造的世界能學到的比工具書更多。\n\n虛構源於現實，說的都是人與人的故事；小說有情境，我可以和主角一起感受、驚訝、甚至覺察彼此的不同，然後再內化成自己的經驗。就像國小老師就教過「禮、義、廉、恥」怎麼寫，但理解意思的人有多少？真正實踐的人，又有多少人？",
    title: "小說的力量"
  },
  { 
    id: "Q3", 
    part: 1,
    q: "很多作家是為了「夢想」而下筆，但聽說你的契機是一場「失望」所帶來的意外收穫？", 
    a: "我曾讀到一本很紅的翻譯文學，讀完卻因為完全找不到共鳴而感到失望（當然，這與文化背景和個人偏好有關）。\n當時我就想：「如果這類型的作品能讓許多人產生共鳴，那我是不是也能寫出屬於自己風格的作品？」我甚至覺得，就算寫得不夠成熟也無妨，或許還能刺激別人產生「我也能寫」的動力，這樣看來，嘗試寫作怎樣都不算虧。",
    title: "失望的收穫"
  },
  { 
    id: "Q4", 
    part: 1,
    q: "你的作品中有一種很特殊的「人生劇本論」，這個靈感是從何而來的？", 
    a: "當時我還看了另一本書，提到小孩出生後仍擁有與上帝對話的記憶。這讓我感覺人天生就是上帝的演員，各自拿著劇本發展人生。也就是說我們的靈魂本來是相親相愛的，只是喝了孟婆湯、演了戲才影響了對彼此的態度。",
    title: "人生劇本論"
  },
  { 
    id: "Q5", 
    part: 1,
    q: "第一次下筆的你是如何摸索出小說的節奏感？", 
    a: "我只是小說讀多了，下筆時直覺哪裡該停、哪裡該換場。一開始我甚至不知道要表達什麼，所以「先寫再說」，事後才分章節。直到出版社定下書名，我才恍然大悟：對！我想說的就是——「我想被傾聽和接納，而不是指責或說教。」",
    title: "創作的節奏"
  },
  { 
    id: "Q6", 
    part: 1,
    q: "你的故事中似乎看不到希望，是因為你觀察到這社會對受害者要求很高，例如要活得勵志，或是對受害者的表現有一定的看法？", 
    a: "是的，我不想寫得太完美（簡單），我所謂的完美是，好像你只要求救了就會有人理你；你只要說「不」，對方就會停止；或是只要找到對的人就能獲救。因為在現實中，根本不會是那樣。\n其中一個令人失望的事，是社會對受傷的人有太多期待，總認為唯一出路是「活得勵志」，一旦你做不到，就被認為是你的問題。這讓我意識到其實很多人只是想看戲。這種期待會讓痛苦的人更困惑，因為總有人認為你活得不夠勵志，或認為你不可能這麼快走出來。但這其實都是一種「暗示」，我們都是在家庭和社會的暗示下長大，如果意識到自己的行為是受他人暗示的驅使，那麼脫掉這層外衣是必要的。只要察覺到了，你就有選擇權。",
    title: "社會的暗示"
  },
  { 
    id: "Q7", 
    part: 1,
    q: "作品深受《第十四道門》中黑貓名言的影響——「我們知道自己是誰，所以不需要名字」。這如何連結到你說的「當有人比你更了解你時，處境會變得很危險」？", 
    a: "那句「我們知道自己是誰，所以不需要名字」就是我想說的「自我察覺」。這社會充滿了想幫你命名（暗示）的人，他們懷疑你的情緒，又要求你樂觀，甚至表現得比你還懂該怎麼痛。若你允許這些「名字」在身上紮根，你就離真正的自己越遠。\n透過自我察覺，我奪回了定義權。當我足夠了解自己，我就不再需要依賴別人給的名字，也有能力判斷對方的「行為」究竟是真心，還是純粹的惡意。\n我對人性其實是相當悲觀的。因為人終究是動物，在弱肉強食的潛意識基因裡，求救會被視為弱的表現。這也是危險所在——當你釋放弱點時，有些人會意識到你是可以被欺負的，甚至把求救者當成笨蛋，趁機操控你。但求救有很多種呈現方式，不一定都要傷痕累累、楚楚可憐。有時候受傷太重，就像身體遭受重創，你連回應的力氣都沒有。這種「沉默的呼救」，其實很少人能看得出來。",
    title: "名字與定義權"
  },
  { 
    id: "Q8", 
    part: 1,
    q: "在面對創傷帶來的負面情緒時，你提到的「我就爛」態度，是一種什麼樣的心理策略？", 
    a: "情緒是一種本能反應，而人身為動物無法控制本能是正常的。但情緒隨之帶來的是力量，那股力量能驅使我們的行為，也能傷害自己本身。\n所以當過往中，已成事實的傷痛又來襲擊你時，唯一能做的就是對那情緒坦白——或者說是「擺爛」：「我就是被如何了」、「我就是遭遇了什麼」。\n當你承認的當下，情緒就無法再操控你的行為或攻擊你的思想，壓力反而會獲得紓解。接下來，才談得上所謂的面對與放下。",
    title: "我就爛策略"
  },
  { 
    id: "Q9", 
    part: 1,
    q: "這部作品裡，隱藏了多少你真實人生的「私貨」？", 
    a: "當靈感不足時，我拿了在日本生活的經驗來豐富角色的背景，那部分很多是真的。後來以為小說寫完了，而開始寫短篇，覺得有幾篇寫得真好，就乾脆把其中一個角色改成詩人，趁機把自己的詩作放進去。",
    title: "真實的私貨"
  },
  { 
    id: "Q10", 
    part: 1,
    q: "你常提到察覺使你改變，當你思想產生變化時，會影響你看待這部處女作嗎？", 
    a: "我習慣把每次的讀後心得當日記看待，用心得代表那個年紀對該書的看法。因為隨著成長，看同一本書的心情一定不同。這部小說也是，它記錄了我 30 歲時對社會和生命的看法。這很美好。\n只是隨著文筆進步，我一定也會看見越多這部小說的缺點，但這也是對未來所埋下的彩蛋。",
    title: "變化的視角"
  },
  { 
    id: "Q11", 
    displayId: "Q1",
    part: 2,
    q: "在「關於我成為作家的10個QA」採訪Q6中，你提到「人是在暗示下長大」，有沒有甚麼例子可以讓人更深刻的體會到甚麼叫暗示呢？", 
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
    q: "呈上題，你似乎都把所有情感區分得很有界限，連同理性都擬人化成有意識的情感，這是否是你看事情的一個特點？", 
    a: "我想是的，這也是保護自己的一種方式，自我察覺如果可以快速到變成一種下意識的反射動作，你會發現你除了傷痛、憤怒以外，還有很多情緒都被這些激烈的情緒給淹沒了，被淹沒的情緒久了也會有壓力，甚至會潛移默化的影響你的身體。自我察覺也包含那些被忽略的聲音，只要聽到你就會發現你的選擇其實很多。",
    title: "情感的界限"
  },
  { 
    id: "Q15", 
    displayId: "Q5",
    part: 2,
    q: "你主張人是動物，行為背後的目的比對方說的言語還重要，具體是甚麼意思呢？", 
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
    q: "你在「關於我成為作家的10個QA」的Q4提到「靈魂本來就是相親相愛的」但現實中，許多傷害卻來自最親近的原生家庭。當「愛的本質」與「錯誤的教育」衝突時，我們該如何自處？", 
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
    q: "你在「關於我成為作家的10個QA」的Q7提到被了解很危險，那你會因為害怕被看透，而在社交中「隱藏」真實的自己嗎？", 
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
    q: "你強調的自我察覺，能不能舉個例子你是怎麼做的？", 
    a: "當我有些情緒產生時，不論是正面或負面，我都會停下來思考剛剛發生了甚麼事情，假設是雨天讓我回家時把玄關弄得濕答答的而感到煩躁，或是過去那些陰影偶爾襲來的恐慌感出現導致，我會意識到那些「原因」是我無法改變的事實時，我就不會再被過去控制。\n其實很簡單就是先去認清甚麼是事實，理解情緒。人對未知是會有恐懼的，所以當你不了解你的情緒時，你的無知會放大你的感受。\n再來是多去聽聽自己說了甚麼、做了甚麼，用自己的行為去觀察自己想要甚麼，有時候我們會在某些情況下做出自身都無法預料的事情，導致氣氛尷尬或傷到別人，你除了觀察自己以外也要多看看別人的反應，不斷去反思原因。我覺得有意識的覺醒是對自己負責任的方式。",
    title: "察覺的實踐"
  },
  { 
    id: "Q22", 
    displayId: "Q12",
    part: 2,
    q: "讀者想知道，在「關於我成為作家的10個QA」的Q3提到小說是場意外的收穫，你還有沒有其他的意外收穫呢？", 
    a: "意外收穫了對「人性的清醒」。當我越看清楚事實，越理解自己，我就能活得越輕鬆。有時候遭受惡意並非是受害者的問題，是對方的行為偏差導致，也就是說，今天換作是別人其實事件也是會發生，所以在我的小說裡，我才會認為是天使來人間代替人類受罪的。",
    title: "意外的收穫"
  },
  { 
    id: "Q23", 
    displayId: "Q13",
    part: 2,
    q: "你對人性的觀察常帶有一種「動物性」的冷靜。對於社會大眾普遍歌頌的「自我犧牲」或「無私的愛」，你是否抱持著不同的看法？", 
    a: "人是動物，為了生存與滿足自我，什麼事都做得出來。\n我認為，社會之所以如此用力地歌頌「犧牲」與「愛」，正是因為缺乏這些特質，才需要透過不斷的強調來掩飾。但這種歌頌偉大，反而成了人為本惡的鐵證，就如前面Q5所說「人不會過度強調事實」，也因此我在Q2強調「要讓感性去承認黑暗的存在，同時讓理性去守住那一點點後天選擇的良善。」。\n又或許，人是盲目的，只是一味跟從，久了就會變成一種要求；而那要求曾剝奪了許多人的聲音，只為了滿足大眾想看的一場秀。",
    title: "犧牲與愛"
  },
  { 
    id: "Q24", 
    displayId: "Q14",
    part: 2,
    q: "你常提到要優先了解自己、收回定義權。在受傷後的自保過程中，這些是否都有其必要性？還是會過於自我中心？", 
    a: "我在小說的後記裡提過，我曾聽過一句話：「你的一切行為都有影響力」，所以我認為身而為人，在這個社會上生活，不論你的社會地位還是性別，只要你是個成年人，所說的話所做的事情，都要考慮到「社會責任」的問題，我甚至認為很多時候只要管好自己就是對這社會最大的貢獻。",
    title: "定義權與責任"
  }
];

export default function DialogueModal({ isOpen, onClose }: DialogueModalProps) {
  const [activeId, setActiveId] = useState("Q1");
  const [visibleCount, setVisibleCount] = useState(3);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPart2, setIsPart2] = useState(false);
  const [showMobileIndex, setShowMobileIndex] = useState(false);

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
      
      const currentQA = dialogues.find(d => d.id === currentId);
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
    setVisibleCount(prev => Math.min(prev + 3, dialogues.length));
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/95 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
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
                  <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight">【子瓏的深度察覺筆記】</h2>
                  <p className="text-[10px] mono-label text-accent opacity-60 mt-1">子瓏：24 則關於認知主權的深層對話</p>
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
                      <h3 className="mono-label text-accent">目錄導覽</h3>
                      <button onClick={() => setShowMobileIndex(false)} className="text-accent">
                        <X size={24} />
                      </button>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <p className="mono-label text-accent/40 mb-4 text-[9px]">第一部：作家之路</p>
                        <div className="space-y-4">
                          {dialogues.slice(0, 10).map(d => (
                            <button
                              key={d.id}
                              onClick={() => {
                                setVisibleCount(dialogues.length); // Show all to allow scrolling
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
                        <p className="mono-label text-accent/40 mb-4 text-[9px]">第二部：深度察覺</p>
                        <div className="space-y-4">
                          {dialogues.slice(10).map(d => (
                            <button
                              key={d.id}
                              onClick={() => {
                                setVisibleCount(dialogues.length);
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
                    <p className="mono-label text-accent/40 mb-4 text-[9px]">第一部：作家之路</p>
                    <div className="space-y-2">
                      {dialogues.slice(0, 10).map(d => (
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
                    <p className="mono-label text-accent/40 mb-4 text-[9px]">第二部：深度察覺</p>
                    <div className="space-y-2">
                      {dialogues.slice(10).map(d => (
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
                    「在別人的劇本裡，你只是個被命名的角色。」
                  </p>
                  <p className="text-ink/60 text-[18px] leading-[1.8] whitespace-pre-line">
                    這 24 則對話分為兩部。第一部【關於我如何成為作家的 10 個 QA】記錄了我創作和覺察的真實過程；第二部為進階版【子瓏的深度察覺筆記】。{"\n\n"}
                    為了幫你找回失落的原初聲音，你可以由【子瓏的深度察覺筆記】 Q1 循序進入，剝離那些不屬於你的裝扮；或者利用以下「價值地圖」，在你需要的生存座標上，重新定義自己。
                  </p>
                </div>

                {/* QA Sections */}
                <div className="space-y-32 pb-32">
                  {/* Part 1 Header */}
                  <div className="border-l-4 border-accent pl-6 py-2 mb-16">
                    <h3 className="text-2xl font-serif font-bold">第一部：關於我如何成為作家的 10 個 QA</h3>
                  </div>

                  {dialogues.map((d, index) => {
                    // Mobile progressive disclosure
                    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                    if (isMobile && index >= visibleCount) return null;

                    return (
                      <div key={d.id} id={d.id} data-qa-id={d.id} className="scroll-mt-32">
                        {index === 10 && (
                          <div className="border-l-4 border-accent pl-6 py-2 mb-16 mt-32">
                            <h3 className="text-2xl font-serif font-bold">第二部：子瓏的深度察覺筆記（14 題）</h3>
                          </div>
                        )}
                        
                        <div className="max-w-3xl">
                          <div className="flex items-start gap-4 mb-8">
                            <span className="font-mono text-accent/40 text-[18px] mt-1">{d.displayId || d.id}.</span>
                            <h4 className="text-ink/50 text-[18px] md:text-[20px] font-serif leading-relaxed">
                              {d.q}
                            </h4>
                          </div>
                          
                          <div className="pl-12 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-accent/10" />
                            <div className="text-ink text-[18px] md:text-[20px] leading-[1.8] font-serif">
                              <span className="block text-[18px] font-serif text-accent/40 mb-4">子瓏：</span>
                              <div className="text-[#E0E0E0]">
                                {renderAnswer(d.a)}
                              </div>
                            </div>
                          </div>

                          {index < dialogues.length - 1 && (
                            <button 
                              onClick={() => scrollToId(dialogues[index + 1].id)}
                              className="mt-12 ml-12 group flex items-center gap-3 text-accent/60 hover:text-accent transition-all duration-300"
                            >
                              <span className="text-[18px] font-serif">下一則察覺：關於 {dialogues[index + 1].title}</span>
                              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Mobile Load More */}
                  {visibleCount < dialogues.length && (
                    <div className="flex justify-center pt-12 md:hidden">
                      <button 
                        onClick={loadMore}
                        className="px-8 py-4 border border-accent/30 rounded-full text-accent flex items-center gap-3"
                      >
                        <span className="font-bold">深呼吸，繼續下三則察覺</span>
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
                回到現實
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

