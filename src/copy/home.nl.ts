import type { HomeCopy } from './home';

/** Corporate namen als context, niet als klantenlijst: alleen typografisch, geen logo's of badges.
 *  Zes organisaties die hun eigen finance- en businessserviceswerk bundelen. Eerder stonden hier ook
 *  EY, KPMG, PwC en Deloitte; die zetten hun deliverycapaciteit mede in voor klantwerk en zijn dus
 *  een ander bewijstype. Zie /kennis/hoe-grote-organisaties-finance-organiseren. */
const proof = ['HEINEKEN', 'Philips', 'Ahold Delhaize', 'Shell', 'AkzoNobel', 'Bosch'];

/** Primaire bronnen bij de corporate proof, identiek aan de bronnenlijst van het kennisartikel.
 *  Taalonafhankelijk: dit zijn de titels van de bronnen zelf. */
export const bronnen = [
  { label: 'HEINEKEN — Business Services & Finance Operations', url: 'https://www.theheinekencompany.com/newsroom/heineken-strengthens-global-capability-footprint-with-official-opening-of-business-services-centre-in-india/' },
  { label: 'Philips — Global Business Services', url: 'https://www.careers.philips.com/global/en/gbs-global-business-services' },
  { label: 'Ahold Delhaize — European Business Services', url: 'https://careers.aholddelhaize.com/option/brand/european-business-services' },
  { label: 'Shell — Business Operations Kraków (PAIH)', url: 'https://www.paih.gov.pl/en/news/20210504-shell_investment_krakow/' },
  { label: 'AkzoNobel — Global Business Services', url: 'https://careers.akzonobel.com/go/Finance/3998601/' },
  { label: 'Bosch — Global Business Services', url: 'https://www.bosch.us/careers/bosch-global-business-services/' },
];

export const nl: HomeCopy = {
  meta: {
    title: 'Finable | Finance-as-a-Service voor groeiende bedrijven',
    description: 'Finable is je externe finance-team voor dagelijkse finance, maandafsluiting, controlling en rapportage. Een vast team voor één vaste maandprijs.',
  },
  hero: {
    eyebrowA: 'Outsourced that feels like ',
    eyebrowB: 'in-house.',
    h1a: 'Wij runnen je finance.',
    h1b: 'Elke maand.',
    sub: 'Van financiële administratie en maandafsluiting tot controlling en managementrapportage. Één team met verschillende expertises, zonder dat je al die rollen zelf hoeft op te bouwen.',
    cta: { href: '/gesprek', label: 'Plan een gesprek' },
    secondary: { href: '/hoe-het-werkt', label: 'Bekijk hoe Finable werkt' },
    imgAlt: 'Overleg via videobellen, met een spreadsheet op het scherm',
  },
  herken: {
    h2: 'Herken je dit?',
    aside: 'Drie situaties waarin bedrijven ons bellen.',
    items: [
      { h3: 'Je finance-vacature blijft open.', p: 'Goede mensen zijn schaars en duur.' },
      { h3: 'Finance hangt aan één persoon.', p: 'Te veel risico als iemand uitvalt.' },
      { h3: 'Je stuurt te veel op gevoel.', p: 'Je mist actuele inzichten om te groeien.' },
    ],
  },
  ervaring: { label: 'Ervaring van het team achter Finable' },
  functie: {
    label: 'De finance-functie',
    h2: 'Finable runt je dagelijkse finance.',
    flow: ['Dagelijkse finance', 'Maandafsluiting', 'Controlling', 'Rapportage & inzicht'],
    trio: ['Eén team.', 'Eén aanspreekpunt.', 'Eén vaste maandprijs.'],
  },
  verandert: {
    label: 'Finance verandert',
    h2: 'Grote organisaties organiseren werk allang zo.',
    body: 'Grote organisaties verdelen werk al jaren over lokale teams, internationale specialisten en eigen gespecialiseerde servicecenters.',
    concl: 'Finable maakt die manier van werken toegankelijk voor groeiende bedrijven.',
    proof,
    bronnenLabel: 'Bronnen bekijken',
    bronnen,
    read: { href: '/kennis/hoe-grote-organisaties-finance-organiseren', label: 'Lees hoe grote organisaties hun finance organiseren' },
  },
  situatie: {
    h2: 'Wat past bij jouw situatie?',
    compare: { href: '/finance-hire', label: 'Bekijk de volledige vergelijking' },
    items: [
      { label: 'Iemand aannemen', p: 'Dichtbij, maar afhankelijk van één persoon.' },
      { label: 'Een interimmer', p: 'Snel capaciteit, maar tijdelijk.' },
      { label: 'Accountant uitbreiden', p: 'Vertrouwd, maar niet op dagelijkse finance ingericht.' },
      { label: 'Finable', p: 'Een vast team dat de finance-functie overneemt.', link: { href: '/finance-uitbesteden', label: 'Meer over finance uitbesteden' } },
    ],
  },
  case: {
    logoAlt: 'Logo The Good Roll',
    label: 'Klantcase · The Good Roll',
    persoon: 'Sander de Klerk',
    quoteA: 'Van sceptisch naar ',
    quoteB: '“ik zou het iedereen aanraden.”',
    body: 'Sander was eerst huiverig om zijn finance uit handen te geven. Dus begon hij klein: alleen het inboeken. Het vertrouwen groeide en Finable nam steeds meer over. Inmiddels wordt vrijwel zijn hele dagelijkse finance door het team gedaan.',
    link: { href: '/cases/the-good-roll', label: 'Bekijk de case' },
    fotoAlt: 'Sander de Klerk van The Good Roll',
  },
  zekerheden: {
    h2: 'Waar je op kunt rekenen',
    aside: 'Een samenwerking die met je meegroeit.',
    items: [
      { label: 'Vast team', p: 'Een vaste bezetting die je organisatie leert kennen.' },
      { label: 'Vast aanspreekpunt', p: 'Eén persoon die de samenwerking kent en met je bespreekt wat er speelt.' },
      { label: 'Controle in het proces', p: 'Inhoudelijke controles en reviews horen bij het vaste werkproces.' },
      { label: 'Vaste maandprijs', p: 'Vooraf duidelijk wat we overnemen en wat het kost.' },
    ],
  },
  faq: {
    label: 'Veelgestelde vragen',
    items: [
      { q: 'Voor welke bedrijven is Finable bedoeld?', a: 'Finable is bedoeld voor groeiende bedrijven die hun finance professioneler willen organiseren zonder direct een volledige interne finance-afdeling op te bouwen. Vaak gaat het om organisaties waar de dagelijkse administratie inmiddels meer vraagt, de afhankelijkheid van één persoon te groot wordt of waar structurele capaciteit ontbreekt voor maandafsluiting, controlling en rapportage. We kijken daarbij niet alleen naar de omvang van een organisatie, maar vooral naar de werkzaamheden en complexiteit achter de finance-functie.' },
      { q: 'Welke finance-werkzaamheden kan Finable overnemen?', a: 'Dat verschilt per organisatie. Finable kan werkzaamheden verzorgen van dagelijkse finance en maandafsluiting tot controlling en rapportage voor management en andere stakeholders. We beginnen daarom niet met een standaardpakket, maar met wat er vandaag al staat. Wat goed werkt kan blijven staan; waar capaciteit of expertise ontbreekt, kan Finable overnemen. Dat kan één onderdeel van finance zijn, maar ook vrijwel de volledige dagelijkse finance. De verdeling kan later worden aangepast wanneer de organisatie of behoefte verandert.' },
      { q: 'Vervangt Finable onze boekhouder of accountant?', a: 'Niet noodzakelijk. We kijken eerst welke onderdelen van de huidige inrichting goed functioneren en hoe Finable daarop kan aansluiten. Een accountant kan bijvoorbeeld betrokken blijven bij de jaarrekening, fiscale werkzaamheden of andere specialistische vraagstukken, terwijl Finable de dagelijkse finance, maandafsluiting, controlling en rapportage verzorgt. Voor de start spreken we duidelijk af welke werkzaamheden bij welke partij liggen, zodat verantwoordelijkheden helder zijn en werkzaamheden niet dubbel worden uitgevoerd.' },
      { q: 'Hoe wordt de maandprijs bepaald?', a: 'De maandprijs hangt af van het werk dat Finable overneemt en de omvang en complexiteit van de finance-organisatie. Denk bijvoorbeeld aan de werkzaamheden die binnen de samenwerking vallen, het volume dat verwerkt moet worden en de complexiteit rondom afsluiting, controlling en rapportage. Op basis van de huidige situatie en de gewenste verdeling maken we vooraf een passende indicatie.' },
    ],
    alle: { href: '/hoe-het-werkt', label: 'Bekijk alle veelgestelde vragen' },
  },
  eind: {
    label: 'Persoonlijk kennismaken',
    timAlt: 'Tim Samsom, oprichter van Finable',
    h2: 'Benieuwd of Finable bij jouw organisatie past?',
    p: 'Plan 30 minuten met Tim om te bespreken hoe je finance nu is georganiseerd en waar Finable kan overnemen of versterken.',
    cta: { href: '/gesprek', label: 'Plan een gesprek' },
    timNaam: 'Tim Samsom',
    timRol: 'Oprichter Finable',
  },
};
