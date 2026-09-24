import type { L } from '~/i18n/utils';

export type Person = {
  name: L;
  role: L;
  /** File name in public/images/team (without .webp). No photo shows initials. */
  photo?: string;
  note?: L;
};

const member: L = { en: 'Board member', ne: 'कार्यसमिति सदस्य' };
const advisor: L = { en: 'Advisor', ne: 'सल्लाहकार' };
const legalAdvisor: L = { en: 'Legal advisor', ne: 'कानुनी सल्लाहकार' };

/** Executive committee, as listed on the organisation's current site. */
export const board: Person[] = [
  { name: { en: 'Tika Ram Dahal', ne: 'टीकाराम दाहाल' }, role: { en: 'Chairman', ne: 'अध्यक्ष' }, photo: 'tika-ram-dahal', note: { en: 'Secretary in earlier committees', ne: 'यसअघिका कार्यसमितिमा सचिव' } },
  { name: { en: 'Laxmi Prasad Ghimire', ne: 'लक्ष्मीप्रसाद घिमिरे' }, role: { en: 'Programme Coordinator', ne: 'कार्यक्रम संयोजक' }, photo: 'laxmi-prasad-ghimire' },
  { name: { en: 'Saraswati Acharya', ne: 'सरस्वती आचार्य' }, role: member, photo: 'saraswati-acharya' },
  { name: { en: 'Laxmi Prasad Gelal', ne: 'लक्ष्मीप्रसाद गेलाल' }, role: member, photo: 'laxmi-prasad-gelal' },
  { name: { en: 'Baburam Ghimire', ne: 'बाबुराम घिमिरे' }, role: member, photo: 'baburam-ghimire' },
  { name: { en: 'Govinda Prasad Acharya', ne: 'गोविन्दप्रसाद आचार्य' }, role: member, photo: 'govinda-prasad-acharya' },
  { name: { en: 'Meetra Prasad Ghimire', ne: 'मित्रप्रसाद घिमिरे' }, role: member, photo: 'meetra-prasad-ghimire' },
  { name: { en: 'Baburam Chaulagain', ne: 'बाबुराम चौलागाईं' }, role: member, photo: 'baburam-chaulagain' },
  { name: { en: 'Somnath Dhakal', ne: 'सोमनाथ ढकाल' }, role: member, photo: 'somnath-dhakal' },
  { name: { en: 'Tulsiram Sitaula', ne: 'तुलसीराम सिटौला' }, role: member, photo: 'tulsiram-sitaula' },
  { name: { en: 'Rabindra Prasad Niraula', ne: 'रवीन्द्रप्रसाद निरौला' }, role: member, photo: 'rabindra-prasad-niraula' },
];

export const advisors: Person[] = [
  { name: { en: 'Devi Prasad Acharya', ne: 'देवीप्रसाद आचार्य' }, role: advisor, photo: 'devi-prasad-acharya', note: { en: 'Former president', ne: 'पूर्व अध्यक्ष' } },
  { name: { en: 'Bhupal Acharya', ne: 'भूपाल आचार्य' }, role: advisor, photo: 'bhupal-acharya', note: { en: 'Former president', ne: 'पूर्व अध्यक्ष' } },
  { name: { en: 'Bhushan Tuladhar', ne: 'भूषण तुलाधर' }, role: advisor, photo: 'bhushan-tuladhar' },
  { name: { en: 'Ramesh Badal', ne: 'रमेश बडाल' }, role: legalAdvisor, photo: 'ramesh-badal' },
  { name: { en: 'Yubraj Luitel', ne: 'युवराज लुइटेल' }, role: legalAdvisor },
  { name: { en: 'Dr. Krishna Bahadur Karki', ne: 'डा. कृष्णबहादुर कार्की' }, role: advisor, note: { en: 'Soil science', ne: 'माटो विज्ञान' } },
  { name: { en: 'Dr. Meghnath Dhimal', ne: 'डा. मेघनाथ धिमाल' }, role: advisor, note: { en: 'Environmental health', ne: 'वातावरणीय स्वास्थ्य' } },
  { name: { en: 'Krishna Kumar Bhurtel', ne: 'कृष्णकुमार भुर्तेल' }, role: advisor },
  { name: { en: 'Gunaraj Ghimire', ne: 'गुणराज घिमिरे' }, role: advisor },
  { name: { en: 'Bishnu Prasad Chaulagain', ne: 'विष्णुप्रसाद चौलागाईं' }, role: advisor },
  { name: { en: 'Rajendra Thapa Magar', ne: 'राजेन्द्र थापा मगर' }, role: advisor },
  { name: { en: 'Pradip Amatya', ne: 'प्रदीप अमात्य' }, role: advisor },
];

export type Message = { id: string; person: L; role: L; photo: string; excerpt: L; body: L[] };

export const messages: Message[] = [
  {
    id: 'chairman',
    person: { en: 'Tika Ram Dahal', ne: 'टीकाराम दाहाल' },
    role: { en: 'Chairman, NEPCEMAC', ne: 'अध्यक्ष, नेप्सेम्याक' },
    photo: 'chairman',
    excerpt: {
      en: 'Together, we can be the promoters of change — for a cleaner, healthier environment for present and future generations.',
      ne: 'हामी मिलेर परिवर्तनका संवाहक बन्न सक्छौं — वर्तमान र भावी पुस्ताका लागि सफा र स्वस्थ वातावरणका लागि।',
    },
    body: [
      {
        en: 'As the Chairman of NEPCEMAC, I want to highlight the importance of solid waste management. This problem affects our surroundings, our well-being and our societies, and it needs our joint effort and commitment to eco-friendly solutions.',
        ne: 'नेप्सेम्याकको अध्यक्षका नाताले म ठोस फोहोरमैला व्यवस्थापनको महत्त्वमा जोड दिन चाहन्छु। यो समस्याले हाम्रो वरिपरिको वातावरण, स्वास्थ्य र समाजलाई नै असर गर्छ, त्यसैले वातावरणमैत्री समाधानका लागि हामी सबैको साझा प्रयास र प्रतिबद्धता आवश्यक छ।',
      },
      {
        en: 'NEPCEMAC is dedicated to responsible waste management. We must raise awareness of the harm improper disposal does — pollution, emissions and the loss of resources — and promote reduction and recycling to keep waste out of landfill. That takes community education, partnerships and new ways of working.',
        ne: 'नेप्सेम्याक जिम्मेवार फोहोर व्यवस्थापनप्रति समर्पित छ। फोहोरको अनुचित विसर्जनले निम्त्याउने प्रदूषण, उत्सर्जन र स्रोतको क्षयबारे जनचेतना जगाउनुपर्छ, र ल्यान्डफिलमा जाने फोहोर घटाउन फोहोर न्यूनीकरण र पुनःप्रशोधन प्रवर्द्धन गर्नुपर्छ। यसका लागि सामुदायिक शिक्षा, साझेदारी र नवीन अभ्यास चाहिन्छ।',
      },
      {
        en: 'Together we can be the promoters of change, encouraging responsible behaviour and urging governments to make waste management a priority. I urge each of you to take personal responsibility for your daily waste. Let us create a cleaner, healthier environment for present and future generations. Thank you for your support.',
        ne: 'हामी मिलेर परिवर्तनका संवाहक बन्न सक्छौं — वातावरणप्रति जिम्मेवार व्यवहार प्रवर्द्धन गर्दै र सरकारलाई फोहोर व्यवस्थापनलाई प्राथमिकतामा राख्न आग्रह गर्दै। दैनिक फोहोरप्रति आफैं जिम्मेवार बन्न म सबैमा अनुरोध गर्छु। वर्तमान र भावी पुस्ताका लागि सफा र स्वस्थ वातावरण बनाऔँ। तपाईंहरूको साथका लागि धन्यवाद।',
      },
    ],
  },
  {
    id: 'coordinator',
    person: { en: 'Laxmi Prasad Ghimire', ne: 'लक्ष्मीप्रसाद घिमिरे' },
    role: { en: 'Programme Coordinator, NEPCEMAC', ne: 'कार्यक्रम संयोजक, नेप्सेम्याक' },
    photo: 'coordinator',
    excerpt: {
      en: 'Let’s embrace “reduce, reuse and recycle” for a cleaner, healthier and more sustainable future.',
      ne: 'सफा, स्वस्थ र दिगो भविष्यका लागि “घटाऔँ, पुनः प्रयोग गरौँ, पुनःप्रशोधन गरौँ” भन्ने सिद्धान्त अपनाऔँ।',
    },
    body: [
      {
        en: 'Improper waste disposal harms community health and the environment. It pollutes air, water and soil, endangers people and wildlife, and adds to climate change through greenhouse gas emissions.',
        ne: 'फोहोरको अनुचित विसर्जनले सामुदायिक स्वास्थ्य र वातावरणमा ठूलो असर गर्छ। यसले हावा, पानी र माटो प्रदूषित गर्छ, मानिस र वन्यजन्तुलाई जोखिममा पार्छ, र हरितगृह ग्यास उत्सर्जनमार्फत जलवायु परिवर्तनमा पनि योगदान गर्छ।',
      },
      {
        en: 'For over two decades NEPCEMAC has worked with local authorities and communities to set up waste systems built on reduction, reuse and recycling, alongside awareness campaigns and education that change behaviour.',
        ne: 'दुई दशकभन्दा बढी समयदेखि नेप्सेम्याकले स्थानीय निकाय र समुदायसँग मिलेर फोहोर न्यूनीकरण, पुनः प्रयोग र पुनःप्रशोधनमा आधारित प्रणाली स्थापना गर्दै आएको छ, साथै बानी परिवर्तन गर्ने जनचेतना अभियान र शिक्षा कार्यक्रम पनि सञ्चालन गरेको छ।',
      },
      {
        en: 'I urge each of you to play an active part in sustainable waste management at home and at work. Thank you.',
        ne: 'घर र कार्यस्थलमा दिगो फोहोर व्यवस्थापनमा सक्रिय भूमिका खेल्न म सबैमा अनुरोध गर्छु। धन्यवाद।',
      },
    ],
  },
];
