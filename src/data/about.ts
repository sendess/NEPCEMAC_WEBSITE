import type { L } from '~/i18n/utils';

// Sources: NEPCEMAC's own websites of 2009, 2013, 2021 and 2024, and the records listed in partners.ts.

export const intro: L[] = [
  {
    en: 'In the 1990s, unplanned urbanisation and fast population growth left Nepal’s cities — Kathmandu, Lalitpur, Biratnagar, Dharan, Birgunj, Nepalgunj — struggling with waste thrown on riverbanks, roadsides and around temples. Most people had a “throw and forget” attitude, and there was no clear policy on private or community participation in waste management.',
    ne: 'सन् १९९० को दशकमा अव्यवस्थित सहरीकरण र द्रुत जनसङ्ख्या वृद्धिका कारण काठमाडौं, ललितपुर, विराटनगर, धरान, वीरगञ्ज, नेपालगञ्ज जस्ता सहरमा खोला किनार, सडक छेउ र मन्दिर वरपर फोहोर फाल्ने समस्या बढ्दै गयो। “फाल्ने र बिर्सने” प्रवृत्ति व्यापक थियो र फोहोर व्यवस्थापनमा निजी तथा सामुदायिक सहभागिताबारे स्पष्ट नीति थिएन।',
  },
  {
    en: 'NEPCEMAC was founded in 1997 by a group of young people in Lalitpur who wanted to change that. It began with fifty households in Kusunti, collecting waste door to door and asking neighbours to clean their own streets together. Within a decade it was collecting from more than 13,000 households, working in five municipalities, running composting plants and employing over 250 people from low-income families — funded by the households it served rather than by donors.',
    ne: 'यही अवस्था बदल्ने उद्देश्यले ललितपुरका केही उत्साही युवाहरूले वि.सं. २०५४ मा नेप्सेम्याक स्थापना गरे। कुसुन्तीका पचास घरधुरीबाट घरदैलो फोहोर सङ्कलन र टोलवासीलाई आफ्नै गल्ली सफा गर्न आह्वान गर्दै काम सुरु भयो। एक दशकभित्रै संस्थाले १३,००० भन्दा बढी घरधुरीबाट फोहोर सङ्कलन गर्दै पाँच नगरपालिकामा काम गर्‍यो, कम्पोस्ट प्लान्ट सञ्चालन गर्‍यो र न्यून आय भएका परिवारका २५० भन्दा बढी व्यक्तिलाई रोजगारी दियो — दाताको सहयोगमा होइन, सेवाग्राहीकै शुल्कबाट।',
  },
  {
    en: 'Since 2013 the daily collection work has been carried by Nepsemyak Sewa Pvt. Ltd., and NEPCEMAC has focused on what an NGO does best: awareness, training, segregation at source, composting, clean-up campaigns, research and the health of waste workers and their communities.',
    ne: 'वि.सं. २०७० देखि दैनिक फोहोर सङ्कलनको काम नेप्सेम्याक सेवा प्रा.लि. ले सम्हालेको छ भने नेप्सेम्याक गैरसरकारी संस्थाको मूल भूमिकामा केन्द्रित छ: जनचेतना, तालिम, स्रोतमै फोहोर छुट्याउने अभियान, कम्पोस्ट, सरसफाइ अभियान, अनुसन्धान तथा फोहोर व्यवस्थापनमा काम गर्ने श्रमिक र समुदायको स्वास्थ्य।',
  },
];

export const vision: L = {
  en: 'Contributing to sustainable social development through environment, health and education.',
  ne: 'वातावरण, स्वास्थ्य र शिक्षामार्फत दिगो सामाजिक विकासमा योगदान पुर्‍याउने।',
};

export const mission: L[] = [
  {
    en: 'Build the capacity of communities to recover resources from solid waste efficiently.',
    ne: 'ठोस फोहोरबाट प्रभावकारी रूपमा स्रोत पुनःप्राप्ति गर्न समुदायको क्षमता विकास गर्ने।',
  },
  {
    en: 'Promote people’s right to good health services, a sound living environment and education.',
    ne: 'असल स्वास्थ्य सेवा, स्वच्छ वातावरण र शिक्षामा आम नागरिकको पहुँच र अधिकार प्रवर्द्धन गर्ने।',
  },
];

export const goals: L[] = [
  { en: 'Generate income for communities from discarded materials.', ne: 'फालिएका वस्तुबाट सामुदायिक स्तरमा आयआर्जन गर्ने।' },
  { en: 'Help make urban society neat, clean, green and healthy.', ne: 'सहरी समाजलाई सफा, हरियाली र स्वस्थ बनाउने सामाजिक दायित्व पूरा गर्ने।' },
  { en: 'Provide education with a focus on the environment.', ne: 'वातावरणप्रति केन्द्रित गुणस्तरीय शिक्षा दिने।' },
  { en: 'Make good, affordable health services available.', ne: 'सस्तो र असल स्वास्थ्य सेवा तथा अभ्यास उपलब्ध गराउने।' },
];

export const values: { title: L; text: L }[] = [
  {
    title: { en: 'Community focus', ne: 'समुदायप्रति समर्पण' },
    text: {
      en: 'We care that every community gets a lasting partnership for managing its waste.',
      ne: 'हरेक समुदायले फोहोर व्यवस्थापनमा दिगो साझेदारी पाओस् भन्नेमा हामी सधैं चिन्तित रहन्छौं।',
    },
  },
  {
    title: { en: 'Equity', ne: 'समानता' },
    text: {
      en: 'We are fair in all our dealings, whatever a person’s ethnicity, religion, politics, disability, gender or age.',
      ne: 'जात, धर्म, राजनीतिक आस्था, अपाङ्गता, लिङ्ग वा उमेर जे भए पनि सबैसँग निष्पक्ष व्यवहार गर्छौं।',
    },
  },
  {
    title: { en: 'Quality', ne: 'गुणस्तर' },
    text: { en: 'We aim for high-quality results in everything we do.', ne: 'हरेक काममा उच्च गुणस्तरको नतिजा खोज्छौं।' },
  },
  {
    title: { en: 'Integrity', ne: 'इमानदारी' },
    text: { en: 'We hold ourselves to the highest ethical standards.', ne: 'हरेक काममा उच्चतम नैतिक मापदण्ड अपनाउँछौं।' },
  },
];

export const objectives: L[] = [
  { en: 'Encourage people to take part in waste management through regular awareness programmes.', ne: 'निरन्तर जनचेतना कार्यक्रममार्फत फोहोर व्यवस्थापनमा जनसहभागिता बढाउने।' },
  { en: 'Train people in composting, recycling and other waste management methods.', ne: 'कम्पोस्ट, पुनःप्रशोधन लगायत फोहोर व्यवस्थापनका विधिमा तालिम दिने।' },
  { en: 'Carry out and promote research on environmental protection and health.', ne: 'वातावरण संरक्षण तथा स्वास्थ्य व्यवस्थापनमा अनुसन्धान गर्ने र प्रवर्द्धन गर्ने।' },
  { en: 'Promote composting and recycling at household and community level.', ne: 'घर तथा समुदाय स्तरमा कम्पोस्ट र पुनःप्रशोधन प्रवर्द्धन गर्ने।' },
  { en: 'Run tree-planting and greenery programmes.', ne: 'वृक्षरोपण तथा हरियाली प्रवर्द्धन कार्यक्रम सञ्चालन गर्ने।' },
  { en: 'Promote organic farming and rooftop gardening.', ne: 'प्राङ्गारिक खेती र करेसाबारी (छत बगैँचा) प्रवर्द्धन गर्ने।' },
  { en: 'Create jobs by extending waste management services.', ne: 'फोहोर व्यवस्थापन सेवा विस्तार गरी रोजगारी सिर्जना गर्ने।' },
  { en: 'Work with government, INGOs and NGOs for effective partnerships in solid waste management.', ne: 'ठोस फोहोर व्यवस्थापनमा प्रभावकारी साझेदारीका लागि सरकार, अन्तर्राष्ट्रिय तथा राष्ट्रिय गैरसरकारी संस्थासँग समन्वय गर्ने।' },
  { en: 'Share information and research through leaflets, newsletters, booklets, reports and articles.', ne: 'पर्चा, समाचारपत्र, पुस्तिका, प्रतिवेदन र लेखमार्फत सूचना तथा अनुसन्धानका निष्कर्ष प्रचारप्रसार गर्ने।' },
  { en: 'Give education priority to poor and orphaned children and children of families in hardship.', ne: 'गरिब, टुहुरा तथा विभिन्न कारणले पीडित परिवारका बालबालिकालाई शिक्षामा प्राथमिकता दिने।' },
  { en: 'Deliver public health services such as environmental health and clinical services.', ne: 'वातावरणीय स्वास्थ्य तथा क्लिनिकल सेवा जस्ता जनस्वास्थ्य सेवा उपलब्ध गराउने।' },
];

export type Milestone = { year: L; title: L; text: L; photo?: string };

export const milestones: Milestone[] = [
  {
    year: { en: '1997', ne: '2054' },
    title: { en: 'Founded in Lalitpur', ne: 'ललितपुरमा स्थापना' },
    text: {
      en: 'Registered at the District Administration Office, Lalitpur on 28 April 1997 (Baisakh 16, 2054 BS). Door-to-door collection starts with fifty households in Kusunti.',
      ne: 'वि.सं. २०५४ वैशाख १६ मा जिल्ला प्रशासन कार्यालय, ललितपुरमा दर्ता। कुसुन्तीका पचास घरधुरीबाट घरदैलो फोहोर सङ्कलन सुरु।',
    },
  },
  {
    year: { en: '1999', ne: '2056' },
    title: { en: 'Affiliated with the Social Welfare Council', ne: 'समाज कल्याण परिषद्‌मा आबद्ध' },
    text: {
      en: 'Affiliation no. 9485, on 1 October 1999.',
      ne: 'वि.सं. २०५६ असोज १४ मा आबद्धता नम्बर ९४८५।',
    },
  },
  {
    year: { en: '2001', ne: '2058' },
    title: { en: 'Work begins in Kathmandu', ne: 'काठमाडौंमा काम सुरु' },
    text: {
      en: 'From 30 November 2001, in Kathmandu Metropolitan City wards 2, 3, 4, 5, 7, 15 and 16 and parts of Sitapaila, Khadka Bhadrakali, Dhapasi, Mahankal, Kapan and Ichangu Narayan.',
      ne: 'वि.सं. २०५८ मंसिर १५ देखि काठमाडौं महानगरपालिकाका वडा २, ३, ४, ५, ७, १५ र १६ तथा सीतापाइला, खड्कभद्रकाली, धापासी, महाँकाल, कपन र इचङ्गुनारायणका केही भागमा।',
    },
  },
  {
    year: { en: '2004', ne: '2061' },
    title: { en: 'Composting plants and new cities', ne: 'कम्पोस्ट प्लान्ट र नयाँ सहर' },
    text: {
      en: 'Composting plants open at the Central Zoo, Jawalakhel and at Handigaun. Programmes begin in Biratnagar (May) and Itahari (July).',
      ne: 'केन्द्रीय चिडियाखाना, जावलाखेल र हाँडीगाउँमा कम्पोस्ट प्लान्ट सञ्चालन। विराटनगर (जेठ) र इटहरी (साउन) मा कार्यक्रम सुरु।',
    },
    photo: 'zoo-compost',
  },
  {
    year: { en: '2005', ne: '2062' },
    title: { en: 'Best NGO award', ne: 'उत्कृष्ट गैरसरकारी संस्था पुरस्कार' },
    text: {
      en: 'The Ministry of Environment, Science and Technology names NEPCEMAC the best NGO on World Environment Day.',
      ne: 'विश्व वातावरण दिवसको अवसरमा वातावरण, विज्ञान तथा प्रविधि मन्त्रालयद्वारा उत्कृष्ट गैरसरकारी संस्थाको सम्मान।',
    },
  },
  {
    year: { en: '2006', ne: '2063' },
    title: { en: 'Triyuga, Udayapur', ne: 'त्रियुगा, उदयपुर' },
    text: {
      en: 'Activities start in Triyuga Municipality on 2 May 2006 — the fifth municipality NEPCEMAC works in.',
      ne: 'वि.सं. २०६३ वैशाख १९ देखि त्रियुगा नगरपालिकामा काम सुरु — नेप्सेम्याकले काम गरेको पाँचौँ नगरपालिका।',
    },
  },
  {
    year: { en: '2007', ne: '2063' },
    title: { en: 'Health, sanitation and education', ne: 'स्वास्थ्य, सरसफाइ र शिक्षा' },
    text: {
      en: 'NEPCEMAC starts work in health, sanitation and education and sets up a Community Health Centre in Kusunti for waste workers, their families and poor households.',
      ne: 'स्वास्थ्य, सरसफाइ र शिक्षाका क्षेत्रमा काम सुरु; फोहोर व्यवस्थापनमा काम गर्ने श्रमिक, उनीहरूका परिवार र विपन्न घरधुरीका लागि कुसुन्तीमा नेप्सेम्याक सामुदायिक स्वास्थ्य केन्द्र स्थापना।',
    },
  },
  {
    year: { en: '2008', ne: '2064' },
    title: { en: '“Water is Life” with Amici dei Bambini', ne: 'अमिची देइ बाम्बिनीसँग “पानी नै जीवन”' },
    text: {
      en: 'A two-and-a-half-year water, sanitation and health project for children, agreed with the Italian INGO and the Social Welfare Council. The same year Practical Action Nepal publishes NEPCEMAC’s door-to-door model as a national best practice.',
      ne: 'इटालेली अन्तर्राष्ट्रिय संस्था र समाज कल्याण परिषद्‌सँगको सम्झौतामा बालबालिकाका लागि अढाई वर्षे खानेपानी, सरसफाइ तथा स्वास्थ्य परियोजना। सोही वर्ष प्राक्टिकल एक्सन नेपालले नेप्सेम्याकको घरदैलो सङ्कलन मोडेललाई राष्ट्रिय उत्कृष्ट अभ्यासका रूपमा प्रकाशित गर्‍यो।',
    },
  },
  {
    year: { en: '2009', ne: '2066' },
    title: { en: 'Nepsemyak Sewa is established', ne: 'नेप्सेम्याक सेवा प्रा.लि. स्थापना' },
    text: {
      en: 'A company is set up to run collection and transport on a larger scale.',
      ne: 'सङ्कलन र ढुवानी ठूलो स्तरमा सञ्चालन गर्न कम्पनी स्थापना।',
    },
  },
  {
    year: { en: '2013', ne: '2070' },
    title: { en: 'Focus on awareness and training', ne: 'जनचेतना र तालिममा केन्द्रित' },
    text: {
      en: 'Daily collection is handed to Nepsemyak Sewa; NEPCEMAC concentrates on awareness, training, segregation, composting and research.',
      ne: 'दैनिक सङ्कलन नेप्सेम्याक सेवालाई हस्तान्तरण; नेप्सेम्याक जनचेतना, तालिम, फोहोर छुट्याउने अभियान, कम्पोस्ट र अनुसन्धानमा केन्द्रित।',
    },
  },
  {
    year: { en: '2019', ne: '2076' },
    title: { en: 'Weekly clean-up campaigns', ne: 'साप्ताहिक सरसफाइ अभियान' },
    text: {
      en: 'NEPCEMAC takes part in the weekly Lalitpur ring-road and Hanumante River campaigns and manages the waste they collect.',
      ne: 'ललितपुर चक्रपथ र हनुमन्ते नदी साप्ताहिक सरसफाइ अभियानमा सहभागिता र सङ्कलित फोहोरको व्यवस्थापन।',
    },
    photo: 'river-cleanup',
  },
  {
    year: { en: 'Today', ne: 'आज' },
    title: { en: 'Today', ne: 'आज' },
    text: {
      en: 'About 50,000 families in the Kathmandu Valley sort their waste at home with green and red buckets. The goal: 300,000 families within five years.',
      ne: 'काठमाडौं उपत्यकाका करिब ५०,००० परिवारले हरियो र रातो बाल्टिनमा घरमै फोहोर छुट्याउँछन्। लक्ष्य: पाँच वर्षभित्र ३,००,००० परिवार।',
    },
    photo: 'segregation-buckets',
  },
];

/** Organisation chart, from the 2009 profile. */
export const structure = {
  top: [
    { en: 'General Assembly', ne: 'साधारण सभा' },
    { en: 'Central Executive Committee', ne: 'केन्द्रीय कार्यसमिति' },
    { en: 'Central Secretariat', ne: 'केन्द्रीय सचिवालय' },
  ] satisfies L[],
  advisory: { en: 'Advisory Council', ne: 'सल्लाहकार परिषद्' } satisfies L,
  departments: [
    { en: 'Administration', ne: 'प्रशासन' },
    { en: 'Field management', ne: 'क्षेत्र व्यवस्थापन' },
    { en: 'Accounts', ne: 'लेखा' },
    { en: 'Branch offices', ne: 'शाखा कार्यालय' },
    { en: 'Research, development & documentation', ne: 'अनुसन्धान, विकास तथा अभिलेख' },
  ] satisfies L[],
};
