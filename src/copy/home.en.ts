import type { HomeCopy } from './home';
import { bronnen } from './home.nl';

/** Dezelfde corporate namen en bronnen als NL: dit zijn feiten, geen copy. */
const proof = ['HEINEKEN', 'Philips', 'Ahold Delhaize', 'Shell', 'AkzoNobel', 'Bosch'];

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
    sub: 'From bookkeeping and month-end close to controlling and management reporting. One team with several areas of expertise, without having to build all those roles yourself.',
    cta: { href: '/en/book-a-call', label: 'Book a call' },
    secondary: { href: '/en/how-it-works', label: 'See how Finable works' },
    imgAlt: 'A video call with a spreadsheet on screen',
  },
  herken: {
    h2: 'Sound familiar?',
    aside: 'Three situations that bring companies to us.',
    items: [
      { h3: 'Your finance vacancy stays open.', p: 'Good people are scarce and expensive.' },
      { h3: 'Finance depends on one person.', p: 'Too much risk if that person is unavailable.' },
      { h3: 'You steer too much on gut feel.', p: 'You lack the current insight you need to grow.' },
    ],
  },
  // De twee doelgroeppagina's bestaan alleen in het Nederlands; deze sectie blijft daarom leeg.
  doelgroepen: null,
  ervaring: { label: 'Experience of the team behind Finable' },
  functie: {
    label: 'The finance function',
    h2: 'Finable runs your day-to-day finance.',
    flow: ['Day-to-day finance', 'Month-end close', 'Controlling', 'Reporting & insight'],
    trio: ['One team.', 'One point of contact.', 'One fixed monthly fee.'],
  },
  verandert: {
    label: 'Finance is changing',
    h2: 'Large organisations have worked this way for years.',
    body: 'Large organisations have long divided their work across local teams, international specialists and their own dedicated service centres.',
    concl: 'Finable makes that way of working available to growing companies.',
    proof,
    bronnenLabel: 'View sources',
    bronnen,
    // Het kennisartikel bestaat alleen in het Nederlands; deze verwijzing komt terug zodra er een
    // Engelse versie is. Een link naar de Nederlandse tekst zou een Engelstalige bezoeker misleiden.
    read: null,
  },
  situatie: {
    h2: 'What fits your situation?',
    compare: { href: '/en/finance-hire', label: 'See the full comparison' },
    items: [
      { label: 'Hiring someone', p: 'Close by, but dependent on one person.' },
      { label: 'An interim professional', p: 'Capacity quickly, but temporary.' },
      { label: 'Extending your accountant', p: 'Familiar, but not set up for day-to-day finance.' },
      { label: 'Finable', p: 'A fixed team that takes over the finance function.', link: { href: '/en/finance-team', label: 'More about outsourcing finance' } },
    ],
  },
  case: {
    logoAlt: 'The Good Roll logo',
    label: 'Client case · The Good Roll',
    persoon: 'Sander de Klerk',
    quoteA: 'From sceptical to ',
    quoteB: '“I would recommend it to anyone.”',
    body: 'Sander was hesitant at first about handing over his finance. So he started small: just the bookkeeping. Trust grew and Finable took on more and more. Today the team handles almost all of his day-to-day finance.',
    link: { href: '/en/cases/the-good-roll', label: 'Read the case' },
    fotoAlt: 'Sander de Klerk of The Good Roll',
  },
  zekerheden: {
    h2: 'What you can count on',
    aside: 'A partnership that grows with you.',
    items: [
      { label: 'A fixed team', p: 'A fixed team that gets to know your organisation.' },
      { label: 'One point of contact', p: 'One person who knows the collaboration and talks you through what matters.' },
      { label: 'Control in the process', p: 'Substantive checks and reviews are part of the standard way of working.' },
      { label: 'A fixed monthly fee', p: 'Clear upfront about what we take over and what it costs.' },
    ],
  },
  faq: {
    label: 'Frequently asked questions',
    items: [
      { q: 'What kind of companies is Finable for?', a: 'Finable is built for growing companies that want to organise their finance more professionally without immediately building a full in-house finance department. Often these are organisations where the day-to-day administration has started to demand more, where the dependence on one person has become too great, or where there is no structural capacity for month-end close, controlling and reporting. We look not only at the size of an organisation, but above all at the work and the complexity behind the finance function.' },
      { q: 'What finance work can Finable take over?', a: 'That differs per organisation. Finable can handle work ranging from day-to-day finance and month-end close to controlling and reporting for management and other stakeholders. So we do not start with a standard package, but with what is already in place today. What works well can stay; where capacity or expertise is missing, Finable can take over. That can be one part of finance, but equally almost the entire day-to-day finance function. The division can be adjusted later when the organisation or the need changes.' },
      { q: 'Does Finable replace our bookkeeper or accountant?', a: 'Not necessarily. We first look at which parts of the current setup are working well and how Finable can build on them. An accountant can, for example, stay involved in the annual accounts, tax work or other specialist matters, while Finable handles the day-to-day finance, month-end close, controlling and reporting. Before the start we agree clearly which work sits with which party, so that responsibilities are clear and work is not done twice.' },
      { q: 'How is the monthly fee determined?', a: 'The monthly fee depends on the work Finable takes over and on the size and complexity of the finance organisation. Think of the work that falls within the collaboration, the volume that has to be processed and the complexity around close, controlling and reporting. Based on the current situation and the division you want, we prepare a suitable indication upfront.' },
    ],
    alle: { href: '/en/how-it-works', label: 'See all frequently asked questions' },
  },
  eind: {
    label: 'A personal introduction',
    timAlt: 'Tim Samsom, founder of Finable',
    h2: 'Curious whether Finable fits your organisation?',
    p: 'Book 30 minutes with Tim to talk through how your finance is organised today and where Finable could take over or strengthen it.',
    cta: { href: '/en/book-a-call', label: 'Book a call' },
    timNaam: 'Tim Samsom',
    timRol: 'Founder, Finable',
  },
};
