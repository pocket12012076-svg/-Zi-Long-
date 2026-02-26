import { motion } from "motion/react";
import { Menu, X, Facebook, Instagram, AtSign } from "lucide-react";
import { useState } from "react";
import { MinimalCat } from "./Icons";
import SubscriptionModal from "./SubscriptionModal";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const navItems = [
    { name: "聯絡我們", href: "#contact" },
  ];

  return (
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

          <button 
            onClick={() => setIsSubModalOpen(true)}
            className="px-5 py-2 border border-accent/30 rounded-full text-[18px] text-accent hover:bg-accent hover:text-bg transition-all duration-500"
          >
            訂閱子瓏
          </button>
        </nav>

        <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-ink"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
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
            訂閱子瓏
          </button>
        </motion.div>
      )}
    </header>
  );
}
