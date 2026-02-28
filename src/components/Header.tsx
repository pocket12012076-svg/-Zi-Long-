import { motion } from "motion/react";
import { Globe } from "lucide-react";

interface HeaderProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
}

export default function Header({ currentLang, onLangChange }: HeaderProps) {
  const languages = [
    { code: "zh", label: "繁中" },
    { code: "en", label: "EN" },
    { code: "ja", label: "日本語" }
  ];

  const navItems = {
    zh: [
      { name: "關於我", href: "#about" },
      { name: "價值地圖", href: "#values" },
      { name: "聯絡子瓏", href: "#contact" }
    ],
    en: [
      { name: "About", href: "#about" },
      { name: "Value Map", href: "#values" },
      { name: "Contact", href: "#contact" }
    ],
    ja: [
      { name: "著者について", href: "#about" },
      { name: "バリューマップ", href: "#values" },
      { name: "お問い合わせ", href: "#contact" }
    ]
  }[currentLang as 'zh' | 'en' | 'ja'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-accent/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-tighter text-accent"
        >
          ZI LONG
        </motion.div>

        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="text-sm mono-label hover:text-accent transition-colors"
            >
              {item.name}
            </a>
          ))}
          
          <div className="flex items-center gap-4 pl-6 border-l border-accent/20">
            <Globe size={16} className="text-accent/60" />
            <div className="flex gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLangChange(lang.code)}
                  className={`text-[11px] font-mono transition-colors ${
                    currentLang === lang.code ? "text-accent font-bold" : "text-muted hover:text-accent"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <button className="md:hidden text-accent">
          <div className="w-6 h-[1px] bg-current mb-2" />
          <div className="w-6 h-[1px] bg-current" />
        </button>
      </div>
    </header>
  );
}
