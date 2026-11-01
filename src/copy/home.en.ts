import type { HomeCopy } from './home';

export const en: HomeCopy = {
  meta: {
    title: 'Finable | Finance-as-a-Service for growing companies',
    description: 'Finable is your external finance team for day-to-day finance, month-end close, controlling and reporting. One fixed team for one fixed monthly fee.',
  },
  hero: {
    // De merkregel is in beide talen Engels en blijft identiek aan NL.
    eyebrowA: 'Outsourced that feels like ',
    eyebrowB: 'in-house.',
    h1a: 'We run your finance.',
    h1b: 'Every month.',
    sub: 'From day-to-day bookkeeping and month-end close to controlling and reporting. One experienced finance team, with a fixed point of contact in the Netherlands.',
    start: 'Start with a single part, strengthen your existing team, or let us take on more of your day-to-day finance.',
    cta: { href: '/en/book-a-call', label: 'Book an introduction' },
    secondary: { href: '#werk', label: 'This is what we can take on' },
    veldenLabel: 'What we handle',
    velden: ['Day-to-day finance', 'Month-end close', 'Controlling', 'Reporting & planning'],
  },
  bewijs: {
    items: [
      { k: '20+', p: 'finance specialists behind Finable' },
      { k: 'CA', p: 'Chartered Accountants in the senior team' },
      { k: 'EY', p: 'EY background within the team leadership' },
    ],
    note: 'This describes the expertise available behind Finable, not the staffing every client receives. Who does the work and who reviews it is agreed with you beforehand.',
  },
  herken: {
    label: 'When Finable fits',
    h2: 'More keeps coming in. Who picks it up?',
    items: [
      { h3: 'More than one set of books', p: 'Entities, currencies, stock or sales channels call for extra reconciliations and checks.' },
      { h3: 'Your team is at capacity', p: 'Day-to-day processing and closing work leave little room for analysis and looking ahead.' },
      { h3: 'Someone drops away', p: 'A vacancy, a departure or leave. You have work that has to keep running properly.' },
    ],
  },
  werk: {
    label: 'What we take on',
    h2: 'The work and what it delivers.',
    sub: 'Alongside your controller, CFO or bookkeeper. Or as a broader team for your day-to-day finance.',
    items: [
      { h3: 'Day-to-day finance', p: 'Books kept up to date and a clear view of outstanding items.' },
      { h3: 'Month-end close', p: 'Substantiated monthly figures and clarity on what is still open.' },
      { h3: 'Controlling', p: 'Balance sheet accounts reconciled and variances explained.' },
      { h3: 'Reporting & planning', p: 'Management reporting and a cash outlook as agreed.' },
    ],
    verderLezenLabel: 'Read on',
    // Het kennisartikel en /finance-uitbesteden bestaan alleen in het Nederlands; een link naar
    // Nederlandse tekst zou een Engelstalige bezoeker misleiden.
    verderLezen: [
      { href: '/en/finance-hire', label: 'hiring, interim and Finable compared' },
    ],
  },
  case: {
    logoAlt: 'The Good Roll logo',
    label: 'In practice · The Good Roll',
    h2: 'Started small. Grew together from there.',
    persoon: 'Sander de Klerk',
    quoteA: 'From sceptical to ',
    quoteB: '“I would recommend it to anyone.”',
    body: 'Sander started small: just the bookkeeping. Trust grew and Finable took on more and more. Today, almost all of his day-to-day finance is handled by the team.',
    link: { href: '/en/cases/the-good-roll', label: 'Read the case' },
    fotoAlt: 'Sander de Klerk of The Good Roll',
  },
  mensen: {
    label: 'The people behind the work',
    h2: 'Experienced specialists. A committed team.',
    body: 'Behind Finable is a team of more than twenty finance specialists. With Chartered Accountants and an EY background within the team leadership, and experience with international organisations, multiple entities and currencies.',
    toelichting: 'Our team works from India. Tim is your point of contact in the Netherlands. Beforehand we agree who does the work, who reviews it and who talks it through with you.',
    personen: [
      { naam: 'Tim Samsom', rol: 'Client relationship and progress', sub: 'Your point of contact in the Netherlands', foto: '/images/tim-samsom.webp', alt: 'Tim Samsom, founder of Finable' },
      { naam: 'Janesh Gupta', rol: 'Chartered Accountant · EY alumnus', sub: 'Technical direction', foto: '/images/janesh-gupta.webp', alt: 'Janesh Gupta, Chartered Accountant' },
    ],
    link: { href: '/en/about', label: 'Meet the team' },
  },
  // /voor-boekhouders bestaat alleen in het Nederlands; de banner blijft daarom leeg.
  kantoren: null,
  faq: {
    label: 'Frequently asked questions',
    items: [
      { q: 'Can we start with a single part?', a: 'Yes. With reconciliations, a backlog or the month-end close, for example. We set the scope beforehand and can extend it later.' },
      { q: 'How do you work with our controller or accountant?', a: 'We agree which work Finable handles and what stays with your existing team or adviser. As part of that we record who does the work, who reviews it and who decides.' },
      { q: 'What does working together cost?', a: 'For recurring work we agree a fixed monthly fee based on the activities, the volume and the complexity. One-off clean-up or set-up work is quoted separately.' },
    ],
    alle: { href: '/en/how-it-works', label: 'See all frequently asked questions' },
  },
  starten: {
    label: 'A clear first step',
    h2: 'Which work do you want to hand over?',
    p: 'A backlog, a recurring process or the month-end close. We agree what we take on and what it costs.',
    stappen: [
      { h3: 'Talk through your situation', p: 'What runs well, and where do you want help?' },
      { h3: 'Agree the work and the price', p: 'Concrete tasks, deliverables and responsibilities.' },
      { h3: 'Take it over carefully', p: 'In your existing systems, at an agreed rhythm.' },
    ],
    cta: { href: '/en/book-a-call', label: 'Book an introduction with Tim' },
    gerust: 'You decide what you hand over. We organise the work we agreed on.',
    timAlt: 'Tim Samsom, founder of Finable',
    timNaam: 'Tim Samsom',
    timRol: 'Founder of Finable',
  },
};
