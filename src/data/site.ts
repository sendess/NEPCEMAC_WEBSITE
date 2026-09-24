import type { L } from '~/i18n/utils';

export const org = {
  name: { en: 'NEPCEMAC', ne: 'नेप्सेम्याक' } satisfies L,
  /** As written on the organisation's seal: "Nepal Pollution Control & Environment Management Center, Lalitpur, Estd. 2054". */
  legalName: {
    en: 'Nepal Pollution Control and Environment Management Center',
    ne: 'नेपाल प्रदूषण नियन्त्रण तथा वातावरण निर्माण केन्द्र',
  } satisfies L,
  /** The motto printed under the logo. */
  motto: {
    en: 'Clean City, Civilized Citizen & Healthy Society',
    ne: 'सफा सहर, सभ्य नागरिक र स्वस्थ समाज',
  } satisfies L,
  description: {
    en: 'NEPCEMAC is a non-profit organisation in Lalitpur, Nepal, working since 1997 on solid waste management, composting, recycling, public awareness and environmental health.',
    ne: 'नेप्सेम्याक ललितपुरस्थित गैरनाफामूलक संस्था हो, जसले वि.सं. २०५४ देखि ठोस फोहोरमैला व्यवस्थापन, कम्पोस्ट, पुनःप्रशोधन, जनचेतना तथा वातावरणीय स्वास्थ्यका क्षेत्रमा काम गर्दै आएको छ।',
  } satisfies L,
  /** 2054/01/16 BS — registration at the District Administration Office, Lalitpur. */
  foundedOn: '1997-04-28',
  email: 'nepcemac@gmail.com',
  phones: ['01-5432827', '01-5520512'],
  address: {
    en: 'Bagdol Road, Lalitpur 44600, Nepal',
    ne: 'बागडोल सडक, ललितपुर ४४६००, नेपाल',
  } satisfies L,
  hours: {
    en: 'Sunday to Friday, 7:00 am – 3:00 pm',
    ne: 'आइतबारदेखि शुक्रबार, बिहान ७:०० – दिउँसो ३:००',
  } satisfies L,
  /** Office pin (shared building with Nepsemyak Sewa's central office). */
  location: { lat: 27.6654319, lng: 85.2976023 },
  facebook: 'https://www.facebook.com/nepcemac.lalitpur',
  /** "NEPCEMAC Documentary — an organization in solid waste management". */
  documentaryId: 'wMr3Olocqvo',
};

/** Registration and legal records, from the organisation's 2009 profile. */
export const legal = {
  registration: {
    office: { en: 'District Administration Office, Lalitpur', ne: 'जिल्ला प्रशासन कार्यालय, ललितपुर' } satisfies L,
    number: '759',
    dateAd: '1997-04-28',
    dateBs: { en: '2054/01/16 BS', ne: 'वि.सं. २०५४/०१/१६' } satisfies L,
  },
  swc: {
    office: { en: 'Social Welfare Council', ne: 'समाज कल्याण परिषद्' } satisfies L,
    number: '9485',
    dateAd: '1999-10-01',
    dateBs: { en: '2056/06/14 BS', ne: 'वि.सं. २०५६/०६/१४' } satisfies L,
  },
  pan: {
    office: { en: 'Inland Revenue Office, Lalitpur', ne: 'आन्तरिक राजस्व कार्यालय, ललितपुर' } satisfies L,
    number: '101469430',
    dateAd: '2003-09-18',
    dateBs: { en: '2060/06/01 BS', ne: 'वि.सं. २०६०/०६/०१' } satisfies L,
  },
};

/** Sister organisations shown as "Our circle". */
export const circle: { name: L; note: L; logo: string; href?: string }[] = [
  {
    name: { en: 'Nepsemyak Sewa Pvt. Ltd.', ne: 'नेप्सेम्याक सेवा प्रा.लि.' },
    note: { en: 'Door-to-door waste collection since 2009', ne: 'वि.सं. २०६६ देखि घरदैलो फोहोर सङ्कलन' },
    logo: 'nepsemyak',
    href: 'https://nepsemyak.com.np',
  },
  {
    name: { en: 'Pariwartan Sewa Pvt. Ltd.', ne: 'परिवर्तन सेवा प्रा.लि.' },
    note: { en: 'Waste services, Kathmandu (est. 2062 BS)', ne: 'फोहोर व्यवस्थापन सेवा, काठमाडौं (स्था. २०६२)' },
    logo: 'pariwartan',
    href: 'https://www.facebook.com/pariwartan.sewa',
  },
  {
    name: { en: 'Green City Sanitation Pvt. Ltd.', ne: 'ग्रिन सिटी सेनिटेसन प्रा.लि.' },
    note: { en: 'Sanitation services, Balaju, Kathmandu', ne: 'सरसफाइ सेवा, बालाजु, काठमाडौं' },
    logo: 'green-city',
  },
  {
    name: { en: 'Swastha Samaj', ne: 'स्वस्थ समाज' },
    note: { en: 'Pollution control and a healthy society', ne: 'प्रदूषण नियन्त्रण तथा स्वस्थ समाज' },
    logo: 'swastha-samaj',
  },
];

export type NavItem = { key: 'about' | 'programmes' | 'partners' | 'activities' | 'team' | 'resources' | 'contact'; href: string };

export const nav: NavItem[] = [
  { key: 'about', href: '/about/' },
  { key: 'programmes', href: '/programmes/' },
  { key: 'partners', href: '/partners/' },
  { key: 'activities', href: '/activities/' },
  { key: 'team', href: '/team/' },
  { key: 'resources', href: '/resources/' },
];

export function directionsUrl({ lat, lng }: { lat: number; lng: number }): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/** mailto: link with a subject line filled in. */
export function mailto(subject: string): string {
  return `mailto:${org.email}?subject=${encodeURIComponent(subject)}`;
}
