import type { L } from '~/i18n/utils';
import type { IconName } from '~/components/icons';

export type Programme = {
  id: string;
  icon: IconName;
  title: L;
  text: L;
  /** Short figures or facts shown as chips under the text. */
  facts?: L[];
};

export type Theme = {
  id: string;
  icon: IconName;
  title: L;
  summary: L;
  photo: string;
  photoAlt: L;
  programmes: Programme[];
};

export const themes: Theme[] = [
  {
    id: 'cleaner-neighbourhoods',
    icon: 'house',
    title: { en: 'Cleaner neighbourhoods', ne: 'सफा टोल र बस्ती' },
    summary: {
      en: 'Getting waste off the streets and sorted at the doorstep.',
      ne: 'फोहोरलाई सडकबाट हटाउने र घरदैलोमै छुट्याउने।',
    },
    photo: 'segregation-buckets',
    photoAlt: {
      en: 'Stacks of green and red buckets ready to be handed out to households for sorting waste',
      ne: 'फोहोर छुट्याउन घरधुरीलाई वितरणका लागि तयार हरिया र राता बाल्टिनका थाक',
    },
    programmes: [
      {
        id: 'door-to-door',
        icon: 'truck',
        title: { en: 'Door-to-door collection and transfer', ne: 'घरदैलो सङ्कलन तथा ढुवानी' },
        text: {
          en: 'NEPCEMAC began door-to-door collection in Lalitpur in 1997 and in Kathmandu in 2001, and still works with communities and collection crews to make collection and transport cleaner and more efficient — so that every household plays its part.',
          ne: 'नेप्सेम्याकले वि.सं. २०५४ मा ललितपुर र २०५८ मा काठमाडौंमा घरदैलो फोहोर सङ्कलन सुरु गरेको थियो। अहिले पनि समुदाय र सङ्कलन टोलीसँग मिलेर सङ्कलन र ढुवानीलाई सफा र प्रभावकारी बनाउन काम गर्छ, ताकि हरेक घरले आफ्नो भूमिका निर्वाह गरोस्।',
        },
        facts: [
          { en: 'Started with 50 households in 1997', ne: '२०५४ मा ५० घरधुरीबाट सुरु' },
          { en: '13,000 households served by 2008', ne: '२०६५ सम्म १३,००० घरधुरीमा सेवा' },
        ],
      },
      {
        id: 'segregation',
        icon: 'recycle',
        title: { en: 'Sorting waste at source', ne: 'स्रोतमै फोहोर छुट्याउने' },
        text: {
          en: 'For more than 15 years NEPCEMAC has promoted sorting in household kitchens: a green bucket for waste that rots, a red one for waste that does not. Around 50,000 families in municipalities across the Kathmandu Valley now sort this way, and the aim is 300,000 families within five years.',
          ne: '१५ वर्षभन्दा बढी समयदेखि नेप्सेम्याकले भान्सामै फोहोर छुट्याउने अभियान चलाउँदै आएको छ: कुहिने फोहोरका लागि हरियो र नकुहिने फोहोरका लागि रातो बाल्टिन। अहिले काठमाडौं उपत्यकाका विभिन्न नगरपालिकाका करिब ५०,००० परिवारले यसरी फोहोर छुट्याउँछन्, र लक्ष्य पाँच वर्षभित्र ३,००,००० परिवार पुर्‍याउने हो।',
        },
        facts: [
          { en: '≈ 50,000 families sorting', ne: 'करिब ५०,००० परिवारले छुट्याउँछन्' },
          { en: 'Target: 300,000 families', ne: 'लक्ष्य: ३,००,००० परिवार' },
        ],
      },
      {
        id: 'clean-ups',
        icon: 'brush-cleaning',
        title: { en: 'Street sweeping and river clean-ups', ne: 'सडक बढारो तथा नदी सफाइ' },
        text: {
          en: 'Streets are swept in all areas with door-to-door collection, and NEPCEMAC organises and joins riverbank clean-ups — including the weekly Hanumante River and Lalitpur ring-road campaigns — and manages the waste they gather. Its crews have also long handled the safe disposal of dead animals found on the streets.',
          ne: 'घरदैलो सङ्कलन हुने सबै क्षेत्रमा सडक बढारिन्छ। नेप्सेम्याकले हनुमन्ते नदी र ललितपुर चक्रपथ साप्ताहिक अभियान लगायत नदी किनार सफाइ अभियान आयोजना गर्छ वा त्यसमा सहभागी हुन्छ, र सङ्कलित फोहोरको व्यवस्थापन गर्छ। सडकमा भेटिने मृत पशुको सुरक्षित व्यवस्थापन पनि लामो समयदेखि गर्दै आएको छ।',
        },
      },
      {
        id: 'bush-clearing',
        icon: 'leaf',
        title: { en: 'Roadside bush clearing', ne: 'सडक किनारका झाडी फाँडने' },
        text: {
          en: 'Each summer, campaigns clear overgrown bushes along roads to keep public spaces clean and safe.',
          ne: 'हरेक गर्मीयाममा सार्वजनिक स्थल सफा र सुरक्षित राख्न सडक किनारका झाडी फाँडने अभियान चलाइन्छ।',
        },
      },
    ],
  },
  {
    id: 'awareness',
    icon: 'megaphone',
    title: { en: 'Awareness and education', ne: 'जनचेतना र शिक्षा' },
    summary: {
      en: 'Changing habits through schools, women’s groups, street theatre, radio and print.',
      ne: 'विद्यालय, आमा समूह, सडक नाटक, रेडियो र प्रकाशनमार्फत बानी परिवर्तन।',
    },
    photo: 'students-compost',
    photoAlt: {
      en: 'NEPCEMAC’s programme coordinator explaining the composting plant to nursing students',
      ne: 'नेप्सेम्याकका कार्यक्रम संयोजकले नर्सिङ विद्यार्थीलाई कम्पोस्ट प्लान्टबारे जानकारी दिँदै',
    },
    programmes: [
      {
        id: 'public-awareness',
        icon: 'megaphone',
        title: { en: 'Public awareness campaigns', ne: 'जनचेतना अभियान' },
        text: {
          en: 'Hundreds of programmes a year: orientations, mass campaigns, exhibitions, street drama, songs and poetry, documentaries and pamphlets. NEPCEMAC also produced the radio programme “Batabaran Chautari” on Metro FM 94.6 and invested in the television serial “Sabhyata”.',
          ne: 'वर्षेनी सयौँ कार्यक्रम: अभिमुखीकरण, जनअभियान, प्रदर्शनी, सडक नाटक, गीत तथा कविता, वृत्तचित्र र पर्चा। नेप्सेम्याकले मेट्रो एफएम ९४.६ मा “वातावरण चौतारी” रेडियो कार्यक्रम सञ्चालन गर्‍यो र “सभ्यता” टेलिशृङ्खलामा लगानी गर्‍यो।',
        },
      },
      {
        id: 'training',
        icon: 'graduation-cap',
        title: { en: 'Training in waste management and composting', ne: 'फोहोर व्यवस्थापन तथा कम्पोस्ट तालिम' },
        text: {
          en: 'Hands-on training that gives people the skills to manage waste and make compost in their own communities.',
          ne: 'आफ्नै समुदायमा फोहोर व्यवस्थापन र कम्पोस्ट बनाउन सक्ने सीप दिने व्यावहारिक तालिम।',
        },
        facts: [
          { en: '20,000+ students', ne: '२०,००० भन्दा बढी विद्यार्थी' },
          { en: '8,000 women', ne: '८,००० महिला' },
          { en: '5,000 community leaders', ne: '५,००० सामुदायिक अगुवा' },
        ],
      },
      {
        id: 'community',
        icon: 'users',
        title: { en: 'Community mobilisation', ne: 'सामुदायिक परिचालन' },
        text: {
          en: 'Residents, tole committees, women’s groups and youth clubs are brought together to tackle pollution in their own area, so that people feel the local environment is theirs to look after.',
          ne: 'टोलवासी, टोल विकास संस्था, आमा समूह र युवा क्लबलाई आफ्नै क्षेत्रको प्रदूषण घटाउन एकजुट गराइन्छ, ताकि स्थानीय वातावरणको हेरचाह आफ्नै जिम्मेवारी हो भन्ने भावना बढोस्।',
        },
      },
      {
        id: 'publications',
        icon: 'newspaper',
        title: { en: 'Publications', ne: 'प्रकाशन' },
        text: {
          en: 'The annual newsletter “NEPCEMAC Sandesh”, training manuals, pamphlets, bulletins and articles in the media share what works in waste management.',
          ne: 'वार्षिक समाचारपत्र “नेप्सेम्याक सन्देश”, तालिम पुस्तिका, पर्चा, बुलेटिन तथा सञ्चारमाध्यममा प्रकाशित लेखमार्फत फोहोर व्यवस्थापनका सफल अभ्यास बाँडिन्छ।',
        },
      },
    ],
  },
  {
    id: 'compost-recycling',
    icon: 'sprout',
    title: { en: 'Compost and recycling', ne: 'कम्पोस्ट र पुनःप्रशोधन' },
    summary: {
      en: 'Turning kitchen waste into compost and waste paper into products.',
      ne: 'भान्साको फोहोरबाट मल र रद्दी कागजबाट उपयोगी सामग्री।',
    },
    photo: 'zoo-compost',
    photoAlt: {
      en: 'Covered composting beds at the Central Zoo composting plant in Jawalakhel',
      ne: 'जावलाखेलस्थित केन्द्रीय चिडियाखानाको कम्पोस्ट प्लान्टका छानोसहितका कम्पोस्ट बेड',
    },
    programmes: [
      {
        id: 'composting',
        icon: 'sprout',
        title: { en: 'Community composting plants', ne: 'सामुदायिक कम्पोस्ट प्लान्ट' },
        text: {
          en: 'Composting plants at the Central Zoo, Chalnakhel, Radhe Radhe and Lapuli (and earlier Handigaun) turn organic waste into manure that is sold to farmers and households. Families who sort their kitchen waste receive 5 kg of compost free every year.',
          ne: 'केन्द्रीय चिडियाखाना, चालनाखेल, राधे राधे र लपुली (र यसअघि हाँडीगाउँ) का कम्पोस्ट प्लान्टले कुहिने फोहोरबाट मल बनाउँछन्, जुन किसान र घरधुरीलाई बिक्री गरिन्छ। भान्साको फोहोर छुट्याउने परिवारले वर्षेनी ५ केजी कम्पोस्ट मल निःशुल्क पाउँछन्।',
        },
        facts: [
          { en: 'Central Zoo plant since 2004', ne: 'चिडियाखाना प्लान्ट २०६१ देखि' },
          { en: '5 kg free compost a year', ne: 'वर्षेनी ५ केजी निःशुल्क मल' },
        ],
      },
      {
        id: 'compost-bins',
        icon: 'trash',
        title: { en: 'Compost bins and vermicomposting', ne: 'कम्पोस्ट बिन र गँड्यौले मल' },
        text: {
          en: 'Wooden vermicompost boxes and low-cost plastic compost bins are designed and distributed so households can compost at home and improve their soil.',
          ne: 'घरमै कम्पोस्ट बनाई माटोको उर्वराशक्ति बढाउन काठका गँड्यौले मल बाकस र सस्ता प्लास्टिक कम्पोस्ट बिन डिजाइन तथा वितरण गरिन्छ।',
        },
      },
      {
        id: 'paper-recycling',
        icon: 'recycle',
        title: { en: 'Paper recycling', ne: 'कागज पुनःप्रशोधन' },
        text: {
          en: 'At its recycling unit in Gokarna, Kathmandu, supported by the Embassy of Japan, NEPCEMAC turns waste paper into envelopes, tea mats and file holders.',
          ne: 'जापान दूतावासको सहयोगमा काठमाडौंको गोकर्णस्थित पुनःप्रशोधन केन्द्रमा नेप्सेम्याकले रद्दी कागजबाट खाम, टि-म्याट र फाइल होल्डर बनाउँछ।',
        },
      },
    ],
  },
  {
    id: 'greener-city',
    icon: 'leaf',
    title: { en: 'A greener city', ne: 'हरियाली सहर' },
    summary: {
      en: 'Nurseries, planting and organic farming.',
      ne: 'नर्सरी, वृक्षरोपण र प्राङ्गारिक खेती।',
    },
    photo: 'organic-farm',
    photoAlt: {
      en: 'Students picking organic greens grown on the NEPCEMAC farm at Chobhar',
      ne: 'चोभारस्थित नेप्सेम्याकको फार्ममा फलेको प्राङ्गारिक रायोको साग टिप्दै विद्यार्थी',
    },
    programmes: [
      {
        id: 'greenery',
        icon: 'sprout',
        title: { en: 'Greenery and urban afforestation', ne: 'हरियाली तथा सहरी वृक्षरोपण' },
        text: {
          en: 'Plantation drives, a tree nursery and rooftop-gardening demonstrations add green space to the Kathmandu Valley. Compost from our plants feeds an organic farm at Chobhar that students visit to see the full cycle from waste to food.',
          ne: 'वृक्षरोपण, नर्सरी र छत बगैँचाको प्रदर्शनमार्फत काठमाडौं उपत्यकामा हरियाली थपिन्छ। हाम्रो प्लान्टको कम्पोस्ट चोभारको प्राङ्गारिक फार्ममा प्रयोग हुन्छ, जहाँ विद्यार्थीहरू फोहोरदेखि खानासम्मको पूरा चक्र हेर्न आउँछन्।',
        },
      },
    ],
  },
  {
    id: 'health',
    icon: 'heart-pulse',
    title: { en: 'Health and sanitation', ne: 'स्वास्थ्य र सरसफाइ' },
    summary: {
      en: 'Care for waste workers and safe water and toilets for children.',
      ne: 'फोहोर व्यवस्थापनमा काम गर्नेको स्वास्थ्य र बालबालिकाका लागि सफा पानी तथा शौचालय।',
    },
    photo: 'students-visit',
    photoAlt: {
      en: 'Nursing students from Alka Institute of Medical Sciences on a visit to NEPCEMAC',
      ne: 'नेप्सेम्याकको भ्रमणमा अल्का इन्स्टिच्युट अफ मेडिकल साइन्सेजका नर्सिङ विद्यार्थी',
    },
    programmes: [
      {
        id: 'health-services',
        icon: 'heart-pulse',
        title: { en: 'Health services for waste workers and marginalised communities', ne: 'फोहोर व्यवस्थापनमा काम गर्ने श्रमिक र सीमान्तकृत समुदायका लागि स्वास्थ्य सेवा' },
        text: {
          en: 'Regular health camps for waste workers, their families and marginalised communities. After health work began in 2007, the NEPCEMAC Community Health Centre in Kusunti offered affordable care.',
          ne: 'फोहोर व्यवस्थापनमा काम गर्ने श्रमिक, उनीहरूका परिवार र सीमान्तकृत समुदायका लागि नियमित स्वास्थ्य शिविर। वि.सं. २०६३ मा स्वास्थ्यसम्बन्धी काम सुरु भएपछि कुसुन्तीस्थित नेप्सेम्याक सामुदायिक स्वास्थ्य केन्द्रले सुलभ सेवा दियो।',
        },
      },
      {
        id: 'wash',
        icon: 'droplets',
        title: { en: 'Water, sanitation and hygiene for children', ne: 'बालबालिकाका लागि खानेपानी, सरसफाइ र स्वच्छता' },
        text: {
          en: 'With Amici dei Bambini (2008–2010), NEPCEMAC brought safe drinking water, clean toilets, composting, hygiene lessons and de-worming to public schools, child homes and a day-care centre.',
          ne: 'अमिची देइ बाम्बिनीसँग (२०६४–२०६७) नेप्सेम्याकले सामुदायिक विद्यालय, बाल गृह र दिवा सेवा केन्द्रमा सुरक्षित खानेपानी, सफा शौचालय, कम्पोस्ट, स्वच्छता शिक्षा र जुकाको औषधि पुर्‍यायो।',
        },
      },
    ],
  },
];

/** Home-sorting guide, shown on the home and resources pages. */
export const sortingGuide = {
  green: {
    label: { en: 'Green bucket — waste that rots', ne: 'हरियो बाल्टिन — कुहिने फोहोर' },
    items: [
      { en: 'Vegetable and fruit peels', ne: 'तरकारी र फलफूलका बोक्रा' },
      { en: 'Leftover food and tea leaves', ne: 'बाँकी खाना र चियापत्ती' },
      { en: 'Flowers, leaves and garden waste', ne: 'फूल, पात र बगैँचाको फोहोर' },
      { en: 'Egg shells', ne: 'अन्डाका बोक्रा' },
    ] satisfies L[],
    note: { en: 'Becomes compost.', ne: 'कम्पोस्ट मल बन्छ।' },
  },
  red: {
    label: { en: 'Red bucket — waste that does not rot', ne: 'रातो बाल्टिन — नकुहिने फोहोर' },
    items: [
      { en: 'Plastic bags, wrappers and bottles', ne: 'प्लास्टिकका झोला, खोल र बोतल' },
      { en: 'Paper and cardboard (kept dry)', ne: 'कागज र कार्टुन (सुक्खा राखेर)' },
      { en: 'Glass, metal and cans', ne: 'सिसा, धातु र टिनका बट्टा' },
      { en: 'Old clothes and rubber', ne: 'पुराना कपडा र रबर' },
    ] satisfies L[],
    note: { en: 'Much of it can be recycled.', ne: 'धेरैजसो पुनःप्रशोधन गर्न सकिन्छ।' },
  },
};
