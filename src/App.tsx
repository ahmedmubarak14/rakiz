import { startTransition, useEffect, useState } from 'react'
import './App.css'

const BASE = import.meta.env.BASE_URL

type Language = 'en' | 'ar'

type IconProps = {
  className?: string
}

type Service = {
  id: string
  title: string
  description: string
}

type Partner =
  | {
      key: string
      kind: 'image'
      src: string
      alt: string
      className?: string
    }
  | {
      key: string
      kind: 'wordmark'
      variant:
        | 'ideal'
        | 'schneider'
        | 'rs-pro'
        | 'sancura'
        | 'richmond'
        | 'urban-life'
        | 'aquaeco'
        | 'aquadrain'
        | 'bagnodesign'
        | 'bystro'
        | 'gymkhana'
        | 'surfaces'
      label: string
      secondary?: string
    }

const CALL_NUMBER = '+966115079131'
const WHATSAPP_NUMBER = '966115079131'
const COMMERCIAL_REGISTRATION = '7051733512'
const VAT_NUMBER = '314244915200003'

const partners: Partner[] = [
  {
    key: 'ideal-standard',
    kind: 'wordmark',
    variant: 'ideal',
    label: 'Ideal',
    secondary: 'Standard',
  },
  {
    key: 'saci',
    kind: 'image',
    src: 'partners/saci.svg',
    alt: 'SACI',
    className: 'partner-image-saci',
  },
  {
    key: 'iguzzini',
    kind: 'image',
    src: 'partners/iguzzini.svg',
    alt: 'iGuzzini',
    className: 'partner-image-iguzzini',
  },
  {
    key: 'schneider-electric',
    kind: 'wordmark',
    variant: 'schneider',
    label: 'Schneider',
    secondary: 'Electric',
  },
  {
    key: 'mk-electric',
    kind: 'image',
    src: 'partners/mk-electric.jpg',
    alt: 'MK Electric by Honeywell',
    className: 'partner-image-mk',
  },
  {
    key: 'rs-pro',
    kind: 'wordmark',
    variant: 'rs-pro',
    label: 'RS',
    secondary: 'PRO',
  },
  {
    key: 'binzagr',
    kind: 'image',
    src: 'partners/binzagr.png',
    alt: 'Binzagr',
    className: 'partner-image-binzagr',
  },
  {
    key: 'alfanar',
    kind: 'image',
    src: 'partners/alfanar-official.png',
    alt: 'alfanar',
    className: 'partner-image-alfanar',
  },
  {
    key: 'sancura',
    kind: 'wordmark',
    variant: 'sancura',
    label: 'Sancura',
  },
  {
    key: 'richmond',
    kind: 'wordmark',
    variant: 'richmond',
    label: 'RICHMOND',
  },
  {
    key: 'urban-life',
    kind: 'wordmark',
    variant: 'urban-life',
    label: 'URBAN',
    secondary: 'LIFE',
  },
  {
    key: 'aquaeco',
    kind: 'wordmark',
    variant: 'aquaeco',
    label: 'AQUA',
    secondary: 'ECO',
  },
  {
    key: 'aquadrain',
    kind: 'wordmark',
    variant: 'aquadrain',
    label: 'AQUA',
    secondary: 'DRAIN',
  },
  {
    key: 'bagnodesign',
    kind: 'wordmark',
    variant: 'bagnodesign',
    label: 'BAGNO',
    secondary: 'DESIGN',
  },
  {
    key: 'bystro',
    kind: 'wordmark',
    variant: 'bystro',
    label: 'BYSTRO',
  },
  {
    key: 'gymkhana',
    kind: 'wordmark',
    variant: 'gymkhana',
    label: 'GYMKHANA',
  },
  {
    key: 'surfaces',
    kind: 'wordmark',
    variant: 'surfaces',
    label: 'Surfaces',
    secondary: 'BAGNODESIGN',
  },
  {
    key: 'balubaid',
    kind: 'image',
    src: 'partners/balubaid-official.png',
    alt: 'Balubaid Group',
    className: 'partner-image-balubaid',
  },
  {
    key: 'dolphin',
    kind: 'image',
    src: 'partners/dolphin.svg',
    alt: 'Dolphin',
    className: 'partner-image-dolphin',
  },
  {
    key: 'dyson',
    kind: 'image',
    src: 'partners/dyson.svg',
    alt: 'Dyson',
    className: 'partner-image-dyson',
  },
]

const partnerAccessibilityLabel = {
  en: 'Success partners: Ideal Standard, SACI, iGuzzini, Schneider Electric, MK Electric, RS PRO, Binzagr, alfanar, Sancura, Richmond, Urban Life, Aquaeco, Aquadrain, BagnoDesign, Bystro, Gymkhana, Surfaces, Balubaid Group, Dolphin, and Dyson.',
  ar: 'شركاء النجاح: Ideal Standard وSACI وiGuzzini وSchneider Electric وMK Electric وRS PRO وBinzagr وalfanar وSancura وRichmond وUrban Life وAquaeco وAquadrain وBagnoDesign وBystro وGymkhana وSurfaces وBalubaid Group وDolphin وDyson.',
} as const

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined' && window.location.hash === '#ar') {
    return 'ar'
  }

  return 'en'
}

const copy = {
  en: {
    switchLanguage: 'العربية',
    menu: 'Menu',
    closeMenu: 'Close',
    navigation: [
      { label: 'What We Do', href: '#what-we-do' },
      { label: 'Services', href: '#services' },
      { label: 'Why Rakiz', href: '#why-rakiz' },
      { label: 'Partners', href: '#partners' },
      { label: 'Contact', href: '#contact' },
    ],
    hero: {
      label: '',
      tagline: 'Your needs. Our responsibility.',
      title: 'Your needs, fully covered.',
      description:
        'From MEP systems to office supplies, one partner, one contract, full accountability.',
      primaryCta: 'Talk to us',
      secondaryCta: 'Our services',
      chips: [
        'One contract',
        'One point of contact',
        'Full accountability',
        'Across Saudi Arabia',
      ],
      panelTitle: 'Operational scope',
      panelItems: [
        'MEP Works',
        'Maintenance & Facilities',
        'IT Tools & Equipment',
        'Office Supplies',
      ],
      noteTitle: 'Built for Saudi operations',
      noteBody:
        'Procurement, field coordination, compliance, and closeout handled under one accountable team.',
      proofCards: [
        { value: '+500', label: 'Projects delivered' },
        { value: '8', label: 'Integrated services' },
      ],
    },
    partners: {
      label: 'Success partners',
      title: 'Partner brands behind successful execution.',
      description:
        'A selection of brands and partner ecosystems Rakiz works with across project delivery and operational support.',
    },
    overview: {
      label: 'What we do',
      title: 'Rakiz handles the operational side of your business.',
      lead:
        'MEP, maintenance, IT equipment, office supplies, and specialized services, all so your team can stay focused on what they were hired to do.',
      body: 'One contract. One point of contact. We own the process start to finish.',
      pillars: [
        {
          title: 'One contract',
          description:
            'Technical work, supply, and support can move through one relationship instead of fragmented vendors.',
        },
        {
          title: 'One point of contact',
          description:
            'Your team gets clearer communication, faster follow-up, and fewer operational handoffs.',
        },
        {
          title: 'Start-to-finish ownership',
          description:
            'We do not disappear mid-process. Rakiz follows the request through execution and closeout.',
        },
      ],
    },
    services: {
      label: 'Services',
      title: 'Coverage that spans technical work, facilities, and daily supply.',
      description:
        'Rakiz combines engineering support, maintenance, equipment sourcing, and office essentials under one operational umbrella.',
      items: [
        {
          id: 'mep',
          title: 'MEP Works',
          description:
            'Mechanical, electrical, and plumbing execution for projects, upgrades, and operational support.',
        },
        {
          id: 'hvac',
          title: 'HVAC Systems',
          description:
            'Installation, maintenance, and repair for heating, ventilation, and air-conditioning systems.',
        },
        {
          id: 'plumbing',
          title: 'Plumbing & Water',
          description:
            'Water systems, plumbing infrastructure, and responsive repair coverage for facilities.',
        },
        {
          id: 'fire',
          title: 'Safety & Fire Protection',
          description:
            'Protection systems, safety compliance support, and maintenance for critical environments.',
        },
        {
          id: 'maintenance',
          title: 'Maintenance & Facilities',
          description:
            'Hands-on facility maintenance to keep operations stable, responsive, and ready for daily use.',
        },
        {
          id: 'it',
          title: 'IT Tools & Equipment',
          description:
            'Computers, accessories, networking gear, and modern workplace technology for business teams.',
        },
        {
          id: 'office',
          title: 'Office Supplies',
          description:
            'Recurring office essentials sourced and delivered efficiently to keep teams moving.',
        },
        {
          id: 'special',
          title: 'Special Requests',
          description:
            'Tailored sourcing and execution support for urgent, custom, or hard-to-place operational needs.',
        },
      ] as Service[],
    },
    reasons: {
      label: 'Why Rakiz',
      title: 'Built for operators who want fewer handoffs and better follow-through.',
      items: [
        {
          icon: '01',
          title: 'One partner. Full scope.',
          description:
            'You stop managing four vendors and start managing one accountable partner.',
        },
        {
          icon: '02',
          title: 'We know Saudi operations.',
          description:
            'Local regulations, procurement cycles, and on-ground logistics are not theory for us. They are daily practice.',
        },
        {
          icon: '03',
          title: 'Accountability at every step.',
          description: 'We do not hand off the problem. We own the outcome.',
        },
      ],
    },
    trust: {
      label: 'Trusted in KSA',
      title: 'Trusted by organizations across the Kingdom.',
      description:
        "From government contractors to the private sector, we've been on the ground executing since day one.",
      metrics: [
        { value: '+500', label: 'Projects delivered' },
        { value: '8', label: 'Integrated services' },
        { value: 'KSA', label: 'Nationwide coverage' },
        { value: '1', label: 'Point of contact' },
      ],
    },
    contact: {
      label: 'Contact',
      title: 'Let Rakiz carry the operational load.',
      description:
        'Reach out for procurement support, technical execution, special sourcing, or long-term operational coverage.',
      primaryCta: 'Contact us',
      cards: [
        {
          label: 'Contact',
          value: CALL_NUMBER,
          note: 'Call or WhatsApp',
          href: `tel:${CALL_NUMBER}`,
          kind: 'contact',
        },
        {
          label: 'Email',
          value: 'info@rakiz.com.sa',
          href: 'mailto:info@rakiz.com.sa',
          kind: 'email',
        },
        { label: 'Location', value: 'Riyadh, Saudi Arabia', kind: 'location' },
      ],
    },
    footer: {
      tagline: 'Your needs. Our responsibility.',
      meta: [
        { label: 'CR', value: COMMERCIAL_REGISTRATION },
        { label: 'VAT', value: VAT_NUMBER },
      ],
      rights: '© 2026 Rakiz. All rights reserved.',
    },
  },
  ar: {
    switchLanguage: 'English',
    menu: 'القائمة',
    closeMenu: 'إغلاق',
    navigation: [
      { label: 'وش نسوي', href: '#what-we-do' },
      { label: 'الخدمات', href: '#services' },
      { label: 'ليش راكز', href: '#why-rakiz' },
      { label: 'الشركاء', href: '#partners' },
      { label: 'تواصل معنا', href: '#contact' },
    ],
    hero: {
      label: '',
      tagline: 'احتياجاتك، مسؤوليتنا.',
      title: 'احتياجاتك مغطاة بالكامل.',
      description:
        'من أعمال الميكانيكا والكهرباء والسباكة لمستلزمات المكاتب، شريك واحد، عقد واحد، ومسؤولية كاملة.',
      primaryCta: 'تواصل معنا',
      secondaryCta: 'خدماتنا',
      chips: ['عقد واحد', 'جهة تواصل واحدة', 'مسؤولية كاملة', 'تغطية في المملكة'],
      panelTitle: 'نطاق التشغيل',
      panelItems: [
        'أعمال الميكانيكا والكهرباء والسباكة',
        'الصيانة والمنشآت',
        'معدات تقنية المعلومات',
        'مستلزمات المكاتب',
      ],
      noteTitle: 'تنفيذ يفهم السوق السعودي',
      noteBody:
        'التوريد، التنسيق الميداني، الامتثال، وإقفال الأعمال تحت فريق واحد يتحمّل النتيجة.',
      proofCards: [
        { value: '+500', label: 'مشروع منجز' },
        { value: '8', label: 'خدمات متكاملة' },
      ],
    },
    partners: {
      label: 'شركاء النجاح',
      title: 'علامات وشراكات تدعم التنفيذ على أرض الواقع.',
      description:
        'مجموعة من العلامات والجهات التي يعمل معها راكز في المشاريع ودعم التشغيل.',
    },
    overview: {
      label: 'وش نسوي',
      title: 'راكز تتولى التشغيل اليومي لمنشأتك.',
      lead:
        'أعمال الميكانيكا والكهرباء والسباكة، الصيانة، معدات تقنية المعلومات، مستلزمات المكاتب، والخدمات المتخصصة، وأنت تركّز على شغلك الأساسي.',
      body: 'عقد واحد. جهة تواصل واحدة. ونحن نتابع كل شيء من البداية للنهاية.',
      pillars: [
        {
          title: 'عقد واحد',
          description:
            'الخدمات الفنية، التوريد، والتنفيذ تمشي تحت علاقة تشغيلية واحدة أوضح وأسهل.',
        },
        {
          title: 'جهة تواصل واحدة',
          description:
            'بدل ما تلاحق عدة موردين، عندك جهة تعرف الصورة كاملة وترد بسرعة.',
        },
        {
          title: 'متابعة للنهاية',
          description:
            'ما نختفي في منتصف الشغل. راكز يفتح الطلب ويتابعه حتى الإقفال.',
        },
      ],
    },
    services: {
      label: 'الخدمات',
      title: 'تغطية تشمل التشغيل الفني وجميع الاحتياجات اليومية للمنشآت.',
      description:
        'راكز تجمع بين الدعم الهندسي، الصيانة، التوريد التقني، ومستلزمات العمل تحت مظلة تشغيلية واحدة.',
      items: [
        {
          id: 'mep',
          title: 'أعمال الميكانيكا والكهرباء والسباكة',
          description:
            'تنفيذ أعمال الميكانيكا والكهرباء والسباكة للمشاريع، التحديثات، واحتياجات التشغيل اليومية.',
        },
        {
          id: 'hvac',
          title: 'أنظمة التكييف والتهوية',
          description:
            'تركيب وصيانة وإصلاح أنظمة التدفئة والتهوية وتكييف الهواء للمرافق.',
        },
        {
          id: 'plumbing',
          title: 'أنظمة السباكة والمياه',
          description:
            'خدمات السباكة، أنظمة المياه، وأعمال الإصلاح والاستجابة للمرافق.',
        },
        {
          id: 'fire',
          title: 'السلامة والحماية من الحريق',
          description:
            'أنظمة الحماية والسلامة، دعم الامتثال، وصيانة البيئات الحساسة.',
        },
        {
          id: 'maintenance',
          title: 'الصيانة وإدارة المنشآت',
          description:
            'صيانة تشغيلية تحافظ على جاهزية المنشأة واستقرار الأعمال يوميًا.',
        },
        {
          id: 'it',
          title: 'أدوات ومعدات تقنية المعلومات',
          description:
            'أجهزة، ملحقات، معدات شبكات، وتقنيات عمل حديثة لفرق التشغيل.',
        },
        {
          id: 'office',
          title: 'مستلزمات المكاتب',
          description:
            'توريد مستمر وسريع لمستلزمات المكاتب التي تحتاجها الفرق كل يوم.',
        },
        {
          id: 'special',
          title: 'طلبات خاصة',
          description:
            'تأمين وتنفيذ احتياجات خاصة أو عاجلة أو متطلبات تشغيل يصعب توفيرها بسرعة.',
        },
      ] as Service[],
    },
    reasons: {
      label: 'ليش راكز',
      title: 'مبنيين للي يبغى متابعة أوضح وتسليم أفضل.',
      items: [
        {
          icon: '01',
          title: 'شريك واحد يكفي.',
          description:
            'بدل ما تتابع أربعة موردين، تتعامل مع جهة واحدة تعرف وش تسوي وتتحمل المسؤولية.',
        },
        {
          icon: '02',
          title: 'نعرف السوق السعودي.',
          description:
            'الأنظمة، دورات الشراء، واللوجستيك على أرض الواقع في المملكة. هذا شغلنا اليومي.',
        },
        {
          icon: '03',
          title: 'نتابع لما الشغل يخلص.',
          description: 'ما نحيل الموضوع لأحد ثاني. نحن نفتح الطلب ونقفله.',
        },
      ],
    },
    trust: {
      label: 'الثقة',
      title: 'شركات كثيرة من جميع انحاء الممكلة تثق فينا',
      description:
        'من المقاولين الحكوميين للقطاع الخاص، نحن على أرض الواقع ننفّذ من اليوم الأول.',
      metrics: [
        { value: '+500', label: 'مشروع منجز' },
        { value: '8', label: 'خدمات متكاملة' },
        { value: 'KSA', label: 'تغطية شاملة في المملكة' },
        { value: '1', label: 'جهة تواصل واحدة' },
      ],
    },
    contact: {
      label: 'تواصل معنا',
      title: 'خلّ راكز تشيل عنك الحمل التشغيلي.',
      description:
        'تواصل معنا لطلبات التوريد، التنفيذ الفني، الطلبات الخاصة، أو التغطية التشغيلية المستمرة.',
      primaryCta: 'تواصل معنا',
      cards: [
        {
          label: 'التواصل',
          value: CALL_NUMBER,
          note: 'اتصال أو واتساب',
          href: `tel:${CALL_NUMBER}`,
          kind: 'contact',
        },
        {
          label: 'البريد الإلكتروني',
          value: 'info@rakiz.com.sa',
          href: 'mailto:info@rakiz.com.sa',
          kind: 'email',
        },
        {
          label: 'الموقع',
          value: 'الرياض، المملكة العربية السعودية',
          kind: 'location',
        },
      ],
    },
    footer: {
      tagline: 'احتياجاتك، مسؤوليتنا.',
      meta: [
        { label: 'السجل التجاري', value: COMMERCIAL_REGISTRATION },
        { label: 'الرقم الضريبي', value: VAT_NUMBER },
      ],
      rights: '© 2026 راكز. جميع الحقوق محفوظة.',
    },
  },
} as const

function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 4.5h3L11.5 8l-2 1.8a16.2 16.2 0 0 0 4.7 4.7l1.8-2 3.5 1.5v3c0 .8-.6 1.5-1.4 1.6-6 .5-12.7-6.2-12.2-12.2C5.5 5.1 6.2 4.5 7 4.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 6.5h16v11H4zM4.5 7l7.5 6 7.5-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function PinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s5.5-5.2 5.5-10A5.5 5.5 0 1 0 6.5 10c0 4.8 5.5 10 5.5 10Zm0-7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function WhatsappIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20a8 8 0 1 0-4.2-1.2L4 20l1.3-3.7A8 8 0 0 0 12 20Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.3 8.7c.2 1.2 1.8 3.5 4 4.4l1.2-1.1c.3-.2.6-.3 1-.2l1 .3c.3.1.5.4.5.8v1c0 .4-.3.8-.7.9-.6.2-1.4.3-2.4 0a9 9 0 0 1-5.8-5.8c-.3-1-.2-1.8 0-2.4.1-.4.5-.7.9-.7h1c.4 0 .7.2.8.5l.3 1c.1.4 0 .7-.2 1l-.6.3Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function PartnerMark({ partner }: { partner: Partner }) {
  if (partner.kind === 'image') {
    return (
      <img
        className={`partner-image ${partner.className ?? ''}`.trim()}
        src={BASE + partner.src}
        alt=""
        loading="lazy"
        aria-hidden="true"
      />
    )
  }

  if (partner.variant === 'rs-pro') {
    return (
      <div className="partner-wordmark partner-wordmark-rspro" aria-hidden="true">
        <span className="partner-rs-box">{partner.label}</span>
        <span className="partner-rs-text">{partner.secondary}</span>
      </div>
    )
  }

  return (
    <div
      className={`partner-wordmark partner-wordmark-${partner.variant}`}
      aria-hidden="true"
    >
      <span>{partner.label}</span>
      {partner.secondary ? <span>{partner.secondary}</span> : null}
    </div>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [menuOpen, setMenuOpen] = useState(false)
  const isArabic = language === 'ar'
  const t = copy[language]
  const marqueeItems = [...partners, ...partners, ...partners]

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.title = isArabic ? 'راكز | شريكك التشغيلي' : 'Rakiz | Your Operational Partner'

    const nextHash = language === 'ar' ? '#ar' : ''
    const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`
    window.history.replaceState(null, '', nextUrl)
  }, [isArabic, language])

  // Show sticky CTA once user scrolls past the hero
  const [pastHero, setPastHero] = useState(false)
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const toggleLanguage = () => {
    startTransition(() => {
      setLanguage((current) => (current === 'en' ? 'ar' : 'en'))
      setMenuOpen(false)
    })
  }

  return (
    <div className={`app-shell ${isArabic ? 'is-ar' : 'is-en'}`}>
      <a className="skip-link" href="#main-content">
        {isArabic ? 'تخطى إلى المحتوى' : 'Skip to main content'}
      </a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand-lockup" href="#top" aria-label="Rakiz home" onClick={closeMenu}>
            <img className="brand-mark" src={BASE + 'brand/logos/primary-white.svg'} alt="Rakiz" />
          </a>

          <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
            {t.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button className="language-toggle" type="button" onClick={toggleLanguage}>
              {t.switchLanguage}
            </button>
            <a className="button button-primary button-compact" href="#contact">
              <span>{t.contact.label}</span>
              <ArrowIcon className="button-icon" />
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.closeMenu : t.menu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-toggle-label">{menuOpen ? t.closeMenu : t.menu}</span>
              <MenuIcon className="menu-icon" />
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-section" id="top">
          <div className="hero-pattern" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="hero-label-group">
                {t.hero.label ? (
                  <span className="section-label section-label-light">{t.hero.label}</span>
                ) : null}
                <p className="hero-tagline">{t.hero.tagline}</p>
              </div>

              <h1>{t.hero.title}</h1>
              <p className="hero-description">{t.hero.description}</p>

              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  <span>{t.hero.primaryCta}</span>
                  <ArrowIcon className="button-icon" />
                </a>
                <a className="button button-secondary" href="#services">
                  <span>{t.hero.secondaryCta}</span>
                </a>
              </div>

              <ul className="hero-chip-list" aria-label="Rakiz highlights">
                {t.hero.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>

            <div className="hero-visual">
              <div className="hero-art-shell">
                <div className="hero-art-glow" aria-hidden="true" />
                <img
                  className="hero-art"
                  src={BASE + 'brand/art/cover-hero.jpeg'}
                  alt=""
                  aria-hidden="true"
                  width="760"
                  height="608"
                />
                <div className="hero-plate hero-plate-primary">
                  <img
                    className="hero-plate-logo"
                    src={BASE + 'brand/logos/primary-white.svg'}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="hero-plate-title">{t.hero.panelTitle}</span>
                  <ul className="hero-plate-list">
                    {t.hero.panelItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="hero-plate hero-plate-secondary">
                  <span className="hero-note-kicker">{t.hero.noteTitle}</span>
                  <p>{t.hero.noteBody}</p>
                </div>

                <div className="hero-proof-grid">
                  {t.hero.proofCards.map((card) => (
                    <article className="hero-proof-card" key={card.label}>
                      <strong>{card.value}</strong>
                      <span>{card.label}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="partner-section" id="partners">
          <div className="shell">
            <div className="section-heading section-heading-centered">
              <span className="section-label">{t.partners.label}</span>
              <h2>{t.partners.title}</h2>
              <p>{t.partners.description}</p>
            </div>

            <p className="sr-only">{partnerAccessibilityLabel[language]}</p>

            <div className="marquee-shell" dir="ltr">
              <div className="marquee-track" aria-hidden="true">
                {marqueeItems.map((partner, index) => (
                  <div
                    className={`marquee-card marquee-card-${partner.key}`}
                    key={`${partner.key}-${index}`}
                  >
                    <PartnerMark partner={partner} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-light" id="what-we-do">
          <div className="shell">
            <div className="section-heading">
              <span className="section-label">{t.overview.label}</span>
              <h2>{t.overview.title}</h2>
              <p>{t.overview.lead}</p>
            </div>

            <div className="overview-grid">
              <article className="overview-story">
                <p>{t.overview.body}</p>
                <div className="overview-callout">
                  <span>{isArabic ? 'التركيز على شغلك الأساسي' : 'Keep your team focused'}</span>
                  <p>
                    {isArabic
                      ? 'راكز تغطي الخلفية التشغيلية حتى يشتغل فريقك على الأولويات الأساسية.'
                      : 'Rakiz takes care of the operational background so your team can stay on the work that matters most.'}
                  </p>
                </div>
              </article>

              <div className="overview-pillar-grid">
                {t.overview.pillars.map((item) => (
                  <article className="overview-pillar" key={item.title}>
                    <span className="overview-pillar-accent" aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-pattern" id="services">
          <div className="services-pattern" aria-hidden="true" />
          <div className="shell">
            <div className="section-heading">
              <span className="section-label">{t.services.label}</span>
              <h2>{t.services.title}</h2>
              <p>{t.services.description}</p>
            </div>

            <div className="service-grid">
              {t.services.items.map((service, index) => (
                <article className="service-card" key={service.id}>
                  <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="why-rakiz">
          <div className="section-dark-pattern" aria-hidden="true" />
          <div className="shell">
            <div className="section-heading section-heading-dark">
              <span className="section-label section-label-light">{t.reasons.label}</span>
              <h2>{t.reasons.title}</h2>
            </div>

            <div className="reason-grid">
              {t.reasons.items.map((item) => (
                <article className="reason-card" key={item.title}>
                  <span className="reason-index">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-highlight">
          <div className="shell trust-grid">
            <div className="trust-copy">
              <span className="section-label">{t.trust.label}</span>
              <h2>{t.trust.title}</h2>
              <p>{t.trust.description}</p>
            </div>

            <div className="trust-metric-grid">
              {t.trust.metrics.map((metric) => (
                <article className="trust-metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="shell contact-grid">
            <div className="contact-copy">
              <span className="section-label">{t.contact.label}</span>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.description}</p>

              <div className="contact-actions">
                <a
                  className="button button-primary"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(isArabic ? 'مرحباً، أود الاستفسار عن خدمات راكز.' : 'Hello, I would like to inquire about Rakiz services.')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsappIcon className="button-icon" />
                  <span>{t.contact.primaryCta}</span>
                </a>
              </div>
            </div>

            <div className="contact-card-grid">
              {t.contact.cards.map((card) => {
                const icon =
                  card.kind === 'contact' ? (
                    <div className="contact-icon-pair" aria-hidden="true">
                      <PhoneIcon className="contact-icon" />
                      <WhatsappIcon className="contact-icon" />
                    </div>
                  ) : card.kind === 'email' ? (
                    <MailIcon className="contact-icon" />
                  ) : (
                    <PinIcon className="contact-icon" />
                  )

                const content = (
                  <>
                    <div className="contact-card-top">
                      {icon}
                      <span>{card.label}</span>
                    </div>
                    <strong dir={card.kind !== 'location' ? 'ltr' : undefined}>{card.value}</strong>
                    {'note' in card ? <p className="contact-card-note">{card.note}</p> : null}
                  </>
                )

                const cardClassName =
                  card.kind === 'location'
                    ? 'contact-card contact-card-wide'
                    : 'contact-card'

                return 'href' in card ? (
                  <a
                    className={`${cardClassName} contact-card-link`}
                    key={card.label}
                    href={card.href}
                    target={card.href.startsWith('https://') ? '_blank' : undefined}
                    rel={card.href.startsWith('https://') ? 'noreferrer' : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <article className={cardClassName} key={card.label}>
                    {content}
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA bar — appears once user scrolls past hero */}
      <div className={`sticky-cta${pastHero ? '' : ' is-hidden'}`} aria-hidden={!pastHero}>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(isArabic ? 'مرحباً، أود الاستفسار عن خدمات راكز.' : 'Hello, I would like to inquire about Rakiz services.')}`}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsappIcon className="button-icon" />
          <span>{t.contact.primaryCta}</span>
        </a>
      </div>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <img src={BASE + 'brand/logos/primary-white.svg'} alt="Rakiz" />
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-meta" aria-label={isArabic ? 'بيانات الشركة' : 'Company details'}>
            {t.footer.meta.map((item) => (
              <p className="footer-meta-item" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </p>
            ))}
          </div>
          <p className="footer-rights">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
