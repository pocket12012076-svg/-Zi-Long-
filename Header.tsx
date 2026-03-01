export default function Footer({ lang }: { lang: string }) {
  const t = {
    zh: {
      name: "子瓏 Zi Long",
      desc: "理性的邊界建構者。致力於在紛擾的人性中，為你聽見被淹沒的聲音，找回你的選擇權。",
      nav: "Navigation",
      contact: "聯絡我們",
      about: "關於作家-子瓏",
      subscription: "Subscription",
      subDesc: "訂閱《人性觀察週報》，每週一次理性覺察筆記。我們將深入探討認知主權與邊界建構。",
      subBtn: "訂閱週報",
      placeholder: "Your email",
      rights: "© 2024 Zi Long. All Rights Reserved.",
      tagline: "Designed for Rational Boundary Builders."
    },
    en: {
      name: "Zi Long",
      desc: "Rational boundary builder. Dedicated to hearing submerged voices and reclaiming your choices amidst the chaos of humanity.",
      nav: "Navigation",
      contact: "Contact",
      about: "About Zi Long",
      subscription: "Subscription",
      subDesc: "Subscribe to the 'Humanity Observation Weekly' for weekly rational awareness notes. We explore cognitive sovereignty and boundary construction.",
      subBtn: "Subscribe",
      placeholder: "Your email",
      rights: "© 2024 Zi Long. All Rights Reserved.",
      tagline: "Designed for Rational Boundary Builders."
    },
    ja: {
      name: "子瓏 Zi Long",
      desc: "理性的な境界の構築者。人間性の喧騒の中で、かき消されたあなたの声を聞き取り、選択権を取り戻すお手伝いをします。",
      nav: "ナビゲーション",
      contact: "お問い合わせ",
      about: "作家・子瓏について",
      subscription: "購読",
      subDesc: "『人間性観察週報』を購読して、週に一度の理性的気づきノートを受け取りましょう。認知的主権と境界構築を深く探求します。",
      subBtn: "購読する",
      placeholder: "メールアドレス",
      rights: "© 2024 Zi Long. All Rights Reserved.",
      tagline: "Designed for Rational Boundary Builders."
    }
  }[lang as 'zh' | 'en' | 'ja'];

  return (
    <footer className="py-20 px-6 border-t border-accent/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-[36px] font-serif font-bold mb-6">{t.name}</h2>
            <p className="text-ink/70 font-normal max-w-sm leading-[1.8] mb-8">
              {t.desc}
            </p>
            <div className="flex gap-4">
              {[
                { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61550052641350&locale=zh_TW' },
                { name: 'Instagram', href: 'https://www.instagram.com/avanda_7/' },
                { name: 'Threads', href: 'https://www.threads.com/@avanda_7' }
              ].map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-xs mono-label text-accent/60 hover:text-accent transition-colors">
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <span className="mono-label mb-6 block text-accent">{t.nav}</span>
            <ul className="space-y-4 text-[18px] font-normal text-ink/70">
              <li><a href="#contact" className="hover:text-accent">{t.contact}</a></li>
              <li><a href="#about" className="hover:text-accent">{t.about}</a></li>
            </ul>
          </div>

          <div>
            <span className="mono-label mb-6 block text-accent">{t.subscription}</span>
            <p className="text-[14px] text-ink/60 mb-4 leading-relaxed">
              {t.subDesc}
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder={t.placeholder}
                className="bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 text-sm text-ink focus:outline-none focus:border-accent/50 w-full"
              />
              <button className="px-4 py-3 bg-accent text-bg rounded-lg text-sm font-bold hover:bg-accent/90 transition-all">
                {t.subBtn}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-accent/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] mono-label text-accent/40">{t.rights}</p>
          <p className="text-[10px] mono-label text-accent/40">{t.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
