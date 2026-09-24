import type { L } from '~/i18n/utils';

export type Activity = {
  id: string;
  /** ISO date (AD). Leave out when the record has no date. */
  date?: string;
  /** Show only the month or year when the exact day is not known. */
  approx?: 'month' | 'year';
  kind: 'campaign' | 'visit' | 'training' | 'notice' | 'compost';
  title: L;
  text: L[];
  /** Photo slugs from public/images/photos. */
  photos: string[];
  facts?: { label: L; value: L }[];
  /** Said under the photos when they come from another day of the same campaign. */
  photoNote?: L;
};

// Taken from NEPCEMAC's notices and activity posts (2012–2021). Newest first.
export const activities: Activity[] = [
  {
    id: 'lockdown-2020',
    date: '2020-04-01',
    approx: 'year',
    kind: 'notice',
    title: {
      en: 'Keeping waste collection safe during the COVID-19 lockdown',
      ne: 'कोभिड–१९ लकडाउनमा सुरक्षित फोहोर सङ्कलन',
    },
    text: [
      {
        en: 'With the landfill only partly working during the nationwide lockdown, NEPCEMAC asked households to keep waste safely packed until collection staff arrived, sort degradable from non-degradable waste and compost at home where possible, never dump waste outside, and hand waste over only in bags — not in buckets they take back inside.',
        ne: 'देशव्यापी लकडाउनमा ल्यान्डफिल साइट आंशिक रूपमा मात्र सञ्चालनमा रहँदा नेप्सेम्याकले घरधुरीलाई सङ्कलन कर्मचारी नआउन्जेल फोहोर सुरक्षित रूपमा पोको पारेर राख्न, कुहिने र नकुहिने फोहोर छुट्याई सकेसम्म घरमै कम्पोस्ट बनाउन, घरबाहिर फोहोर नफाल्न र फिर्ता लैजाने बाल्टिनबाट होइन, झोलामा मात्र फोहोर दिन अनुरोध गर्‍यो।',
      },
      {
        en: 'Collection staff stopped blowing whistles to avoid touching their faces, using the vehicle horn instead, and residents were asked to report any worker seen without a mask or gloves.',
        ne: 'मुखमा हात लैजाँदा संक्रमणको जोखिम हुने भएकाले सङ्कलन कर्मचारीले सिट्ठी नफुकी गाडीको हर्न मात्र बजाउने व्यवस्था गरियो, र मास्क वा पन्जा नलगाएका कर्मचारी देखिए खबर गर्न अनुरोध गरियो।',
      },
    ],
    photos: [],
  },
  {
    id: 'german-embassy-giz-visit',
    date: '2019-11-13',
    kind: 'visit',
    title: {
      en: 'Visit from the German Embassy and GIZ',
      ne: 'जर्मन दूतावास र जीआईजेडको भ्रमण',
    },
    text: [
      {
        en: 'Dr. Claudia Hiepe, Head of German Development Cooperation at the German Embassy Kathmandu, and Pasma Dahal of GIZ Nepal visited NEPCEMAC and discussed ways to strengthen the organisation.',
        ne: 'जर्मन दूतावास काठमाडौंका जर्मन विकास सहयोग प्रमुख डा. क्लाउडिया हिपे र जीआईजेड नेपालकी पस्मा दाहालले नेप्सेम्याकको भ्रमण गरी संस्था सुदृढीकरणका उपायबारे छलफल गर्नुभयो।',
      },
    ],
    photos: ['german-embassy-visit'],
  },
  {
    id: 'hanumante-week-88',
    date: '2019-11-02',
    kind: 'campaign',
    title: {
      en: 'Hanumante River clean-up, week 88',
      ne: 'हनुमन्ते नदी सफाइ अभियान, ८८औँ हप्ता',
    },
    text: [
      {
        en: 'The 88th weekly campaign cleaned the Araniko Highway from Sallaghari Chowk to Ghalate Chowk in Suryabinayak-5, Bhaktapur. Social worker Shakti Mohan Paudel, a leading campaigner, was chief guest, joined by the Nepal Army, Armed Police Force, Nepal Police and local volunteers. NEPCEMAC managed the waste collected.',
        ne: '८८औँ साप्ताहिक अभियानअन्तर्गत भक्तपुरको सूर्यविनायक–५ स्थित सल्लाघारी चोकदेखि घलाटे चोकसम्म अरनिको राजमार्ग सफा गरियो। अभियानका अगुवा समाजसेवी शक्तिमोहन पौडेल प्रमुख अतिथि हुनुहुन्थ्यो; नेपाली सेना, सशस्त्र प्रहरी बल, नेपाल प्रहरी र स्थानीय स्वयंसेवक सहभागी थिए। सङ्कलित फोहोरको व्यवस्थापन नेप्सेम्याकले गर्‍यो।',
      },
    ],
    photos: ['river-cleanup', 'river-cleanup-banner', 'river-cleanup-walk', 'river-cleanup-crowd'],
    photoNote: { en: 'Photos from other weeks of the Hanumante campaign.', ne: 'तस्बिर हनुमन्ते अभियानका अन्य हप्ताका हुन्।' },
    facts: [
      { label: { en: 'People taking part', ne: 'सहभागी' }, value: { en: 'about 200', ne: 'करिब २००' } },
      { label: { en: 'Waste collected', ne: 'सङ्कलित फोहोर' }, value: { en: 'about 500 kg', ne: 'करिब ५०० केजी' } },
      { label: { en: 'Time', ne: 'समय' }, value: { en: '7–9 am', ne: 'बिहान ७–९' } },
    ],
  },
  {
    id: 'ringroad-week-5',
    date: '2019-02-23',
    kind: 'campaign',
    title: {
      en: 'Lalitpur ring-road clean-up and beautification, week 5',
      ne: 'ललितपुर चक्रपथ सरसफाइ तथा सौन्दर्यीकरण अभियान, पाँचौँ हप्ता',
    },
    text: [
      {
        en: 'The ring road was cleaned from the Bagdol overhead bridge to Nakhu Dobato in Lalitpur Metropolitan City ward 4. Member of Parliament Pampha Bhusal was chief guest; the chief district officer, the mayor and deputy mayor, police, army, the Red Cross and local groups — Bagdol Bikas Samaj Sewa, Brahmayani Tole Bikas Sanstha and Dobhan Mahila Samuha among them — joined in.',
        ne: 'ललितपुर महानगरपालिका वडा ४ स्थित बागडोल आकाशे पुलदेखि नख्खु दोबाटोसम्म चक्रपथ सफा गरियो। प्रतिनिधि सभा सदस्य पम्फा भुसाल प्रमुख अतिथि हुनुहुन्थ्यो; प्रमुख जिल्ला अधिकारी, नगर प्रमुख र उपप्रमुख, प्रहरी, सेना, रेडक्रस र बागडोल विकास समाज सेवा, ब्रह्मायणी टोल विकास संस्था, दोभान महिला समूह लगायतका स्थानीय संस्था सहभागी थिए।',
      },
    ],
    photos: [],
  },
  {
    id: 'chakrapath-2018',
    date: '2018-03-05',
    kind: 'campaign',
    title: {
      en: 'Ring-road clean-up from Sukedhara to Chakrapath',
      ne: 'सुकेधारादेखि चक्रपथसम्म सरसफाइ अभियान',
    },
    text: [
      {
        en: 'NEPCEMAC took part in the ring-road cleanliness campaign in Kathmandu, from Sukedhara Chowk to Chakrapath Chowk.',
        ne: 'नेप्सेम्याक काठमाडौंको सुकेधारा चोकदेखि चक्रपथ चोकसम्मको चक्रपथ सरसफाइ अभियानमा सहभागी भयो।',
      },
    ],
    photos: ['chakrapath-2018-team'],
  },
  {
    id: 'kmc-ward4-2017',
    date: '2017-07-08',
    kind: 'campaign',
    title: {
      en: 'Clean-up with Kathmandu ward 4',
      ne: 'काठमाडौं वडा ४ सँग सरसफाइ कार्यक्रम',
    },
    text: [
      {
        en: 'A sanitation programme organised by Kathmandu Metropolitan City ward 4, with special participation from NEPCEMAC, cleaned the road from Bishalnagar Chowk onwards.',
        ne: 'काठमाडौं महानगरपालिका वडा ४ को आयोजना र नेप्सेम्याकको विशेष सहभागितामा विशालनगर चोकदेखि सरसफाइ कार्यक्रम सम्पन्न भयो।',
      },
    ],
    photos: [],
  },
  {
    id: 'compost-nursery-2012',
    date: '2012-08-15',
    kind: 'compost',
    title: {
      en: 'Composting plants and tree nursery',
      ne: 'कम्पोस्ट प्लान्ट र नर्सरी',
    },
    text: [
      {
        en: 'Photos from NEPCEMAC’s composting sites — the Central Zoo and Handigaun plants — and its tree nursery.',
        ne: 'नेप्सेम्याकका कम्पोस्ट स्थल — केन्द्रीय चिडियाखाना र हाँडीगाउँ प्लान्ट — तथा नर्सरीका तस्बिर।',
      },
    ],
    photos: ['zoo-compost', 'handigaun-compost', 'compost-shed', 'nursery'],
  },
  {
    id: 'environment-day-2012',
    date: '2012-06-05',
    approx: 'month',
    kind: 'campaign',
    title: {
      en: 'World Environment Day 2012 clean-up',
      ne: 'विश्व वातावरण दिवस २०१२ विशेष सरसफाइ',
    },
    text: [
      {
        en: 'A special clean-up and environmental campaign on World Environment Day, whose theme that year was “Green Economy: Does it include you?”.',
        ne: '“हरित अर्थतन्त्र: दिगो विकासको मूलमन्त्र” नारासहित विश्व वातावरण दिवसको अवसरमा विशेष सरसफाइ तथा वातावरण अभियान।',
      },
    ],
    photos: ['environment-day-2012', 'environment-day-2012-group'],
  },
  {
    id: 'dustbin-awareness-2012',
    date: '2012-04-25',
    kind: 'training',
    title: {
      en: 'Awareness on using dustbins properly',
      ne: 'डस्टबिनको सही प्रयोगबारे जनचेतना',
    },
    text: [
      {
        en: 'A neighbourhood programme on using dustbins properly and managing household waste, with the collection cart on hand.',
        ne: 'डस्टबिनको सही प्रयोग र घरायसी फोहोर व्यवस्थापनबारे टोल स्तरीय जनचेतना कार्यक्रम।',
      },
    ],
    photos: ['awareness-cart'],
  },
  {
    id: 'alka-students',
    kind: 'training',
    title: {
      en: 'Nursing students learn about composting',
      ne: 'नर्सिङ विद्यार्थीलाई कम्पोस्टबारे जानकारी',
    },
    text: [
      {
        en: 'Students of Alka Institute of Medical Sciences visited the NEPCEMAC office, where programme coordinator Laxmi Prasad Ghimire explained the composting plant, and picked organic greens grown on the NEPCEMAC farm at Chobhar.',
        ne: 'अल्का इन्स्टिच्युट अफ मेडिकल साइन्सेजका विद्यार्थीले नेप्सेम्याक कार्यालयको भ्रमण गरे, जहाँ कार्यक्रम संयोजक लक्ष्मीप्रसाद घिमिरेले कम्पोस्ट प्लान्टबारे जानकारी दिनुभयो; विद्यार्थीले चोभारस्थित नेप्सेम्याक फार्ममा फलेको प्राङ्गारिक रायोको साग पनि टिपे।',
      },
    ],
    photos: ['students-compost', 'students-visit', 'organic-farm'],
  },
  {
    id: 'kmc-ward16-metropolitan-day',
    kind: 'campaign',
    title: {
      en: 'Mass clean-up on the 21st Metropolitan Day, Kathmandu ward 16',
      ne: '२१औँ महानगर दिवसमा काठमाडौं वडा १६ मा बृहत् सरसफाइ',
    },
    text: [
      {
        en: 'A mass clean-up and awareness programme organised jointly by Kathmandu Metropolitan City ward 16 and Nagarjun Samuha, with students and local organisations.',
        ne: 'काठमाडौं महानगरपालिका वडा १६ र नागार्जुन समूहको संयुक्त आयोजनामा विद्यार्थी तथा स्थानीय संस्थाको सहभागितामा बृहत् सरसफाइ तथा जनचेतनामूलक कार्यक्रम।',
      },
    ],
    photos: ['kmc-ward16-campaign'],
  },
  {
    id: 'roadside-clearing',
    kind: 'campaign',
    title: {
      en: 'Community mobilisation: clearing a roadside',
      ne: 'सामुदायिक परिचालन: सडक किनार सफाइ',
    },
    text: [
      {
        en: 'Local people and NEPCEMAC staff clear rubble and rubbish from a roadside, with an excavator brought in for the heavy work.',
        ne: 'स्थानीयवासी र नेप्सेम्याकका कर्मचारी मिलेर सडक किनारको ढुङ्गा–माटो र फोहोर हटाउँदै; गह्रौँ कामका लागि डोजर प्रयोग गरियो।',
      },
    ],
    photos: ['roadside-clearing', 'roadside-clearing-machine'],
  },
  {
    id: 'community-bush-clearing',
    kind: 'campaign',
    title: {
      en: 'Neighbours clear their lane together',
      ne: 'छिमेकी मिलेर गल्ली सफा',
    },
    text: [
      {
        en: 'Residents young and old weed and clean their lane in a community campaign led by NEPCEMAC staff.',
        ne: 'नेप्सेम्याकका कर्मचारीको अगुवाइमा साना–ठूला सबै टोलवासी मिलेर आफ्नो गल्लीको झारपात उखेल्दै र सफा गर्दै।',
      },
    ],
    photos: ['community-cleanup'],
  },
  {
    id: 'bucket-distribution',
    kind: 'campaign',
    title: {
      en: 'Green and red buckets for sorting at home',
      ne: 'घरमै फोहोर छुट्याउन हरियो र रातो बाल्टिन',
    },
    text: [
      {
        en: 'Buckets are handed out to households in ward programmes: green for waste that rots, red for waste that does not.',
        ne: 'वडा स्तरीय कार्यक्रममा घरधुरीलाई बाल्टिन वितरण गरिन्छ: कुहिने फोहोरका लागि हरियो, नकुहिने फोहोरका लागि रातो।',
      },
    ],
    photos: ['segregation-buckets', 'bucket-stock', 'bucket-handover', 'segregation-pair'],
  },
];
