import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Facebook, Instagram, AtSign, Globe, ChevronDown } from "lucide-react";
import { useState } from "react";
import { MinimalCat } from "./Icons";
import SubscriptionModal from "./SubscriptionModal";

interface HeaderProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
}

export default function Header({ currentLang, onLangChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { 
      name: currentLang === 'zh' ? "聯絡我們" : currentLang === 'ja' ? "お問い合わせ" : "Contact", 
      href: "#contact" 
    },
  ];

  const languages = [
    { code: 'zh', label: '繁體中文' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' }
  ];

  const subscribeText = currentLang === 'zh' ? "訂閱子瓏" : currentLang === 'ja' ? "購読する" : "Subscribe";

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 border-b border-accent/10 bg-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MinimalCat className="w-6 h-6 text-accent" />
            <span className="font-serif text-2xl font-bold tracking-widest">子瓏</span>
            <div className="hidden md:block h-4 w-[1px] bg-border" />
            <span className="hidden md:block mono-label">Rational Boundary Builder</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[18px] font-medium text-muted hover:text-accent transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
            
            <div className="flex items-center gap-4 border-l border-accent/10 pl-6">
              <a href="https://www.facebook.com/profile.php?id=61550052641350&locale=zh_TW" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/avanda_7/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="https://www.threads.com/@avanda_7" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                <AtSign size={18} strokeWidth={1.5} />
              </a>
            </div>

            {/* Language Switcher Desktop */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-accent/20 rounded-full text-accent hover:bg-accent/5 transition-all text-[16px]"
              >
                <Globe size={18} />
                <span>{languages.find(l => l.code === currentLang)?.label}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-bg border border-accent/20 rounded-xl shadow-xl overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLangChange(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-accent/10 ${
                          currentLang === lang.code ? 'text-accent font-bold bg-accent/5' : 'text-ink/60'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsSubModalOpen(true)}
              className="px-5 py-2 border border-accent/30 rounded-full text-[18px] text-accent hover:bg-accent hover:text-bg transition-all duration-500"
            >
              {subscribeText}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-accent p-1"
            >
              <Globe size={20} />
            </button>
            <button 
              className="text-ink"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 w-full bg-bg border-b border-border p-6 flex flex-col gap-6"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-serif"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="flex items-center gap-6 py-4 border-y border-accent/10">
                <a href="https://www.facebook.com/profile.php?id=61550052641350&locale=zh_TW" target="_blank" rel="noopener noreferrer" className="text-accent">
                  <Facebook size={24} strokeWidth={1.5} />
                </a>
                <a href="https://www.instagram.com/avanda_7/" target="_blank" rel="noopener noreferrer" className="text-accent">
                  <Instagram size={24} strokeWidth={1.5} />
                </a>
                <a href="https://www.threads.com/@avanda_7" target="_blank" rel="noopener noreferrer" className="text-accent">
                  <AtSign size={24} strokeWidth={1.5} />
                </a>
              </div>

              <button 
                onClick={() => setIsSubModalOpen(true)}
                className="w-full py-4 border border-accent/30 rounded-xl text-sm text-accent"
              >
                {subscribeText}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Language Menu Overlay */}
        <AnimatePresence>
          {isLangOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[60] bg-bg/95 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setIsLangOpen(false)}
            >
              <div className="w-full max-w-xs space-y-4" onClick={e => e.stopPropagation()}>
                <div className="text-center mb-8">
                  <Globe className="mx-auto mb-2 text-accent" size={32} />
                  <h3 className="text-xl font-serif">選擇語言 / Language</h3>
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLangChange(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full py-4 rounded-xl border transition-all ${
                      currentLang === lang.code 
                        ? 'bg-accent text-bg border-accent font-bold' 
                        : 'bg-transparent text-ink border-accent/20'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
                <button 
                  onClick={() => setIsLangOpen(false)}
                  className="w-full py-4 text-muted"
                >
                  關閉 / Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />
    </>
  );
}
