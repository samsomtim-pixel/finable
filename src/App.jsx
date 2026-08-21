import { useState } from 'react'
import { Logo, LogoMark } from './components/Logo'

const NAV_LINKS = [
  { label: 'Aanpak', href: '#aanpak' },
  { label: 'Niveaus', href: '#niveaus' },
  { label: 'Contact', href: '#contact' },
]

function CheckIcon({ className = "text-green" }) {
  return (
    <svg className={`w-4 h-4 mt-0.5 shrink-0 ${className}`} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-green/5">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-18 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-dark/70 hover:text-green transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="bg-green text-cream text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-green-light transition-colors">
            Plan een kennismaking
          </a>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-green"
          aria-label="Menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-cream border-t border-green/5 px-5 pb-5 pt-3 flex flex-col gap-3">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base font-medium text-dark/70 py-2">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="bg-green text-cream text-center font-semibold px-5 py-3 rounded-xl mt-1">
            Plan een kennismaking
          </a>
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-5 sm:px-8 max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-green/5 text-green text-xs sm:text-sm font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
          Finance, uitbesteed
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green leading-tight tracking-tight">
          Je finance-afdeling, uitbesteed.{' '}
          <span className="text-gold">Met een Nederlands gezicht</span>{' '}
          dat verantwoordelijk is.
        </h1>
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
          Eén team voor je hele administratie, controle en duiding — voor Nederlandse merken met eigen product en €1–10M omzet.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a href="#contact" className="bg-green text-cream font-semibold px-7 py-3.5 rounded-xl text-center hover:bg-green-light transition-colors shadow-md shadow-green/10">
            Plan een kennismaking
          </a>
          <a href="#niveaus" className="border-2 border-green/15 text-green font-semibold px-7 py-3.5 rounded-xl text-center hover:bg-green/5 transition-colors">
            Bekijk de niveaus
          </a>
        </div>
      </div>
      <div className="absolute top-24 right-8 opacity-[0.04] hidden lg:block pointer-events-none">
        <LogoMark className="w-80 h-80" color="#1E4536" />
      </div>
    </section>
  )
}

function Problem() {
  const pains = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      ),
      title: 'Schaars en duur',
      text: 'Goede finance-mensen zijn moeilijk te vinden, duur om aan te nemen en lastig te behouden.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/></svg>
      ),
      title: 'Een emmer met cijfers',
      text: 'Traditionele kantoren leveren rapportages zonder context. Je krijgt cijfers, maar geen duiding.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
      ),
      title: 'Geen tijd om het aan te sturen',
      text: 'Als founder heb je al genoeg op je bord. Een finance-team erbij aansturen zit er niet in.',
    },
  ]

  return (
    <section className="bg-cream-light py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold mb-3">Herkenbaar?</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green mb-12 sm:mb-16 max-w-xl">
          Finance regelen als groeiend merk is niet eenvoudig
        </h2>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {pains.map((p, i) => (
            <div key={i} className="bg-cream rounded-2xl p-7 sm:p-8">
              <div className="w-12 h-12 bg-green/5 text-green rounded-xl flex items-center justify-center mb-5">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">{p.title}</h3>
              <p className="text-muted leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Approach() {
  const steps = [
    {
      num: '01',
      title: 'Uitvoering door een vast team',
      text: 'Een toegewijd team draait je volledige boekhouding, BTW, bankreconciliatie en meer — consistent en betrouwbaar.',
    },
    {
      num: '02',
      title: 'Nederlandse review & kwaliteitsborging',
      text: 'Elke maand controleren wij de cijfers op juistheid en volledigheid. Geen verrassingen achteraf.',
    },
    {
      num: '03',
      title: 'Jouw vaste aanspreekpunt',
      text: 'Eén persoon die de cijfers duidt, verantwoordelijk is en meedenkt — in het Nederlands, dichtbij.',
    },
  ]

  return (
    <section id="aanpak" className="py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold mb-3">Onze aanpak</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green mb-5 max-w-xl">
          Eén team. Eén aanspreekpunt. Eén vaste maandprijs.
        </h2>
        <p className="text-muted text-lg mb-12 sm:mb-16 max-w-2xl">
          Wij wachten niet tot je belt — we duiden je cijfers elke maand en een tussentijdse vraag stellen kost nooit extra. Geen tikkende teller.
        </p>
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map(s => (
            <div key={s.num} className="relative bg-cream-light rounded-2xl p-7 sm:p-8 border border-green/5">
              <span className="text-5xl font-bold text-green/[0.06] absolute top-5 right-6">{s.num}</span>
              <h3 className="text-lg font-bold text-dark mb-3">{s.title}</h3>
              <p className="text-muted leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 sm:mt-14 bg-green rounded-2xl p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
          <div className="w-12 h-12 bg-gold/20 text-gold rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-cream mb-1">Proactief, niet reactief</h3>
            <p className="text-cream/70 leading-relaxed">
              Wij signaleren afwijkingen en kansen vóórdat jij ernaar hoeft te vragen. Dat is het verschil met een traditioneel kantoor.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Tiers() {
  const tiers = [
    {
      label: 'FOUNDATION',
      name: 'Grip',
      desc: 'Voor een merk dat zijn administratie op orde, kloppend en op tijd wil.',
      highlighted: false,
      features: [
        'Boekhouding & factuurverwerking',
        'Bankreconciliatie',
        'BTW / OSS-aangifte',
        'Fiscale aangiften',
        'Jaarrekening + deponering',
        'Maandcijfers + dashboard',
        'Loonjournaalposten in de boeken',
        'Nederlandse review',
        'Eén vast aanspreekpunt',
      ],
    },
    {
      label: 'STEERING',
      name: 'Insights',
      desc: 'Voor een merk dat zijn cijfers ook wil begrijpen en erop wil sturen.',
      highlighted: true,
      base: 'Alles uit Grip, plus:',
      features: [
        'Multi-channel + PSP-reconciliatie',
        'Cashflow- & margesturing',
        'Marge per kanaal',
        'Wekelijks bijgewerkte cijfers',
        'Maandrapportage + duidingsgesprek',
        'Proactieve signalering',
      ],
    },
    {
      label: 'GROWTH',
      name: 'Groei',
      desc: 'Voor een merk dat opschaalt of toewerkt naar investering of overname.',
      highlighted: false,
      base: 'Alles uit Insights, plus:',
      features: [
        'Meerdere entiteiten + consolidatie',
        'Geconsolideerd dashboard: alle BV\'s + holding',
        'Wekelijkse cashflow + scenario\'s',
        'Financieringsplan voor investeerders/banken',
        'Voorbereiding groei / overname / due diligence',
        'Strategisch meedenken op directieniveau',
      ],
    },
  ]

  return (
    <section id="niveaus" className="bg-cream-light py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold mb-3">Drie niveaus</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green mb-4 max-w-xl">
          Kies het niveau dat bij je past
        </h2>
        <p className="text-muted text-lg mb-12 sm:mb-16 max-w-2xl">
          Elk niveau bouwt voort op het vorige. Zo groei je mee zonder van partner te hoeven wisselen.
        </p>
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {tiers.map(t => (
            <div
              key={t.label}
              className={`rounded-2xl p-7 sm:p-8 flex flex-col relative ${
                t.highlighted
                  ? 'bg-green text-cream ring-2 ring-gold/30 shadow-xl shadow-green/10'
                  : 'bg-cream border border-green/8'
              }`}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-7 bg-gold text-dark text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full">
                  Meest gekozen
                </span>
              )}
              <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${t.highlighted ? 'text-gold' : 'text-gold'}`}>
                {t.label}
              </p>
              <h3 className={`text-2xl font-bold mb-2 ${t.highlighted ? 'text-cream' : 'text-dark'}`}>
                {t.name}
              </h3>
              <p className={`text-sm leading-relaxed mb-6 ${t.highlighted ? 'text-cream/70' : 'text-muted'}`}>
                {t.desc}
              </p>
              {t.base && (
                <p className={`text-sm font-semibold mb-3 ${t.highlighted ? 'text-cream/80' : 'text-dark/70'}`}>
                  {t.base}
                </p>
              )}
              <ul className="space-y-2.5 mb-8 flex-1">
                {t.features.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                    <CheckIcon className={t.highlighted ? 'text-gold' : 'text-green'} />
                    <span className={t.highlighted ? 'text-cream/90' : ''}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`text-center font-semibold py-3 rounded-xl transition-colors ${
                  t.highlighted
                    ? 'bg-gold text-dark hover:bg-gold-light'
                    : 'bg-green text-cream hover:bg-green-light'
                }`}
              >
                Plan een kennismaking
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Modules() {
  const modules = [
    {
      title: 'Voorraad & kostprijs',
      desc: 'Voor merken met eigen product.',
      features: [
        'Kostprijsberekening (COGS)',
        'Voorraadwaardering',
        'Inkoop in vreemde valuta',
        'Vracht & invoerrechten',
        'Voorraadverschillen en retouren',
      ],
    },
    {
      title: 'Salarisadministratie',
      desc: 'Het volledig draaien van de maandelijkse salarisrun.',
      features: [
        'Volledige salarisverwerking',
        'Aansluiting met de boekhouding',
        'Altijd up-to-date met wet- en regelgeving',
      ],
    },
  ]

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold mb-3">Optionele modules</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green mb-4 max-w-xl">
          Voeg toe wat je nodig hebt
        </h2>
        <p className="text-muted text-lg mb-12 sm:mb-16 max-w-2xl">
          Bij te boeken op elk niveau. De verwerking van looncijfers in de boeken zit altijd in de basis.
        </p>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {modules.map(m => (
            <div key={m.title} className="bg-cream-light rounded-2xl p-7 sm:p-8 border border-green/5">
              <h3 className="text-xl font-bold text-dark mb-1">{m.title}</h3>
              <p className="text-muted text-sm mb-5">{m.desc}</p>
              <ul className="space-y-2.5">
                {m.features.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CustomSection() {
  return (
    <section className="bg-cream-light py-14 sm:py-18">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold mb-3">Op maat</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-green mb-3">
            Past geen enkel niveau precies?
          </h2>
          <p className="text-muted leading-relaxed max-w-lg">
            Meerdere entiteiten, buitenlandse voorraad, consolidatie over landen, of waar uitvoering en gewenste begeleiding niet samenvallen — we stellen een team op maat samen.
          </p>
        </div>
        <a href="#contact" className="bg-green text-cream font-semibold px-7 py-3.5 rounded-xl hover:bg-green-light transition-colors shrink-0">
          Neem contact op
        </a>
      </div>
    </section>
  )
}

function ICP() {
  const traits = [
    'Nederlandse manufacturing-, e-commerce- en D2C-merken',
    'Eigen product (fysiek of digitaal)',
    '€1–10M omzet',
    'Vaak internationaal, met voorraad',
    '0–2 mensen intern op finance',
  ]

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold mb-3">Voor wie</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green mb-10 sm:mb-12 max-w-xl">
          Finable is er voor merken als deze
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {traits.map((t, i) => (
            <div key={i} className="flex gap-3 items-start bg-cream-light rounded-xl p-5 border border-green/5">
              <div className="w-8 h-8 bg-green/5 text-green rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <CheckIcon />
              </div>
              <span className="text-dark font-medium leading-relaxed">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = encodeURIComponent(`Kennismaking – ${data.get('bedrijf')}`)
    const body = encodeURIComponent(
      `Naam: ${data.get('naam')}\nBedrijf: ${data.get('bedrijf')}\nE-mail: ${data.get('email')}\n\n${data.get('bericht') || ''}`
    )
    window.location.href = `mailto:info@finable.nl?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-green py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-gold mb-3">Contact</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cream mb-5">
              Plan een kennismaking
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-8">
              Benieuwd wat Finable voor jouw merk kan betekenen? Laat je gegevens achter en we nemen binnen twee werkdagen contact op.
            </p>
            <div className="flex items-center gap-3 text-cream/50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              <span>info@finable.nl</span>
            </div>
          </div>
          <div>
            {submitted ? (
              <div className="bg-cream/10 rounded-2xl p-8 text-center">
                <p className="text-cream text-lg font-semibold mb-2">Bedankt!</p>
                <p className="text-cream/70">Je e-mailclient zou geopend moeten zijn. We kijken uit naar je bericht.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-cream/60 text-sm font-medium mb-1.5">Naam</label>
                  <input name="naam" required className="w-full bg-cream/10 text-cream placeholder-cream/30 border border-cream/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/40" placeholder="Je volledige naam" />
                </div>
                <div>
                  <label className="block text-cream/60 text-sm font-medium mb-1.5">Bedrijf</label>
                  <input name="bedrijf" required className="w-full bg-cream/10 text-cream placeholder-cream/30 border border-cream/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/40" placeholder="Bedrijfsnaam" />
                </div>
                <div>
                  <label className="block text-cream/60 text-sm font-medium mb-1.5">E-mail</label>
                  <input name="email" type="email" required className="w-full bg-cream/10 text-cream placeholder-cream/30 border border-cream/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/40" placeholder="je@bedrijf.nl" />
                </div>
                <div>
                  <label className="block text-cream/60 text-sm font-medium mb-1.5">Bericht <span className="text-cream/30">(optioneel)</span></label>
                  <textarea name="bericht" rows="3" className="w-full bg-cream/10 text-cream placeholder-cream/30 border border-cream/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold/40 resize-none" placeholder="Waar kunnen we je mee helpen?" />
                </div>
                <button type="submit" className="w-full bg-gold text-dark font-semibold py-3.5 rounded-xl hover:bg-gold-light transition-colors mt-2">
                  Verstuur
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 sm:py-14 border-t border-green/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <Logo className="mb-3" />
            <p className="text-sm text-muted">Je finance-afdeling, uitbesteed.</p>
          </div>
          <div className="text-sm text-muted text-right space-y-1">
            <p>info@finable.nl</p>
            <p>KvK: [wordt aangevuld]</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-green/5 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Finable. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Approach />
        <Tiers />
        <Modules />
        <CustomSection />
        <ICP />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
