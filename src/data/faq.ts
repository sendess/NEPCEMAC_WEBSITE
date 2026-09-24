import type { L } from '~/i18n/utils';

export type Faq = {
  id: string;
  q: L;
  a: L[];
  /** Optional link shown under the answer. Internal paths are localised automatically. */
  link?: { href: string; label: L };
};

export type FaqGroup = { id: string; title: L; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: 'at-home',
    title: { en: 'Waste at home', ne: 'घरको फोहोर' },
    items: [
      {
        id: 'who-collects',
        q: { en: 'Does NEPCEMAC collect the waste from my house?', ne: 'के नेप्सेम्याकले मेरो घरको फोहोर उठाउँछ?' },
        a: [
          {
            en: 'No. Since 2013 daily door-to-door collection has been run by our sister company, Nepsemyak Sewa Pvt. Ltd. For a missed collection, fees or a new connection, contact Nepsemyak Sewa.',
            ne: 'होइन। वि.सं. २०७० देखि घरदैलो फोहोर सङ्कलन हाम्रो भगिनी कम्पनी नेप्सेम्याक सेवा प्रा.लि. ले गर्छ। फोहोर नउठेको, शुल्क वा नयाँ सेवाबारे नेप्सेम्याक सेवालाई सम्पर्क गर्नुहोस्।',
          },
          {
            en: 'NEPCEMAC works on awareness, training, sorting at source, composting and clean-up campaigns.',
            ne: 'नेप्सेम्याक जनचेतना, तालिम, स्रोतमै फोहोर छुट्याउने, कम्पोस्ट र सरसफाइ अभियानमा काम गर्छ।',
          },
        ],
        link: { href: 'https://nepsemyak.com.np/contact/', label: { en: 'Contact Nepsemyak Sewa', ne: 'नेप्सेम्याक सेवालाई सम्पर्क गर्नुहोस्' } },
      },
      {
        id: 'how-sort',
        q: { en: 'How do I sort waste at home?', ne: 'घरमा फोहोर कसरी छुट्याउने?' },
        a: [
          {
            en: 'Use two buckets: green for waste that rots (food, peels, tea leaves, flowers) and red for waste that does not (plastic, paper, glass, metal, cloth). Keep batteries, medicines, chemicals and electronics out of both.',
            ne: 'दुईवटा बाल्टिन प्रयोग गर्नुहोस्: कुहिने फोहोर (खाना, बोक्रा, चियापत्ती, फूल) का लागि हरियो र नकुहिने फोहोर (प्लास्टिक, कागज, सिसा, धातु, कपडा) का लागि रातो। ब्याट्री, औषधि, रसायन र इलेक्ट्रोनिक सामान दुवैमा नहाल्नुहोस्।',
          },
        ],
        link: { href: '/resources/#finder', label: { en: 'Look up any item', ne: 'कुनै पनि सामान खोज्नुहोस्' } },
      },
      {
        id: 'buckets',
        q: { en: 'Where can I get green and red buckets?', ne: 'हरियो र रातो बाल्टिन कहाँ पाइन्छ?' },
        a: [
          {
            en: 'We hand out buckets through ward and tole programmes. Any two containers work just as well — what matters is keeping the two kinds of waste apart. Ask us if a distribution is planned in your area.',
            ne: 'हामी वडा र टोल स्तरीय कार्यक्रममार्फत बाल्टिन वितरण गर्छौं। जुनसुकै दुईवटा भाँडाले पनि काम चल्छ — मुख्य कुरा दुई किसिमका फोहोर अलग राख्नु हो। तपाईंको क्षेत्रमा वितरण हुँदैछ कि भनेर हामीलाई सोध्नुहोस्।',
          },
        ],
      },
      {
        id: 'hazardous',
        q: { en: 'What do I do with batteries, medicines and old phones?', ne: 'ब्याट्री, औषधि र पुराना मोबाइल के गर्ने?' },
        a: [
          {
            en: 'Keep them out of both buckets. Store them safely in their own box or bag and hand them over separately — electronics can go to e-waste recyclers or repair shops. Never burn them or pour chemicals into drains.',
            ne: 'दुवै बाल्टिनमा नहाल्नुहोस्। छुट्टै बाकस वा झोलामा सुरक्षित राखी अलग्गै हस्तान्तरण गर्नुहोस् — इलेक्ट्रोनिक सामान ई-वेस्ट पुनःप्रशोधक वा मर्मत पसललाई दिन सकिन्छ। कहिल्यै नजलाउनुहोस्, रसायन ढलमा नखन्याउनुहोस्।',
          },
        ],
      },
      {
        id: 'compost-home',
        q: { en: 'Can I make compost at home, even in a flat?', ne: 'फ्ल्याटमा बसे पनि घरमै कम्पोस्ट बनाउन सकिन्छ?' },
        a: [
          {
            en: 'Yes. A closed compost bin or a small vermicompost box fits on a balcony or roof. Kitchen waste becomes manure in about two to three months.',
            ne: 'सकिन्छ। बन्द कम्पोस्ट बिन वा सानो गँड्यौले मल बाकस बार्दली वा छतमा अटाउँछ। भान्साको फोहोर करिब दुईदेखि तीन महिनामा मल बन्छ।',
          },
        ],
        link: { href: '/resources/#composting', label: { en: 'Three ways to compost at home', ne: 'घरमै कम्पोस्ट बनाउने तीन तरिका' } },
      },
    ],
  },
  {
    id: 'programmes',
    title: { en: 'Programmes and getting involved', ne: 'कार्यक्रम र सहभागिता' },
    items: [
      {
        id: 'invite',
        q: { en: 'Can NEPCEMAC run a programme at our school or tole?', ne: 'के नेप्सेम्याकले हाम्रो विद्यालय वा टोलमा कार्यक्रम गर्न सक्छ?' },
        a: [
          {
            en: 'Yes. We run awareness sessions, composting training, bucket distribution and clean-up campaigns for schools, tole committees, women’s groups and local governments. Tell us your area, the group and your preferred dates.',
            ne: 'सक्छ। हामी विद्यालय, टोल विकास संस्था, आमा समूह र स्थानीय सरकारका लागि जनचेतना कार्यक्रम, कम्पोस्ट तालिम, बाल्टिन वितरण र सरसफाइ अभियान सञ्चालन गर्छौं। तपाईंको ठाउँ, समूह र उपयुक्त मिति जानकारी दिनुहोस्।',
          },
        ],
        link: { href: '/contact/?type=programme#request', label: { en: 'Request a programme', ne: 'कार्यक्रमका लागि अनुरोध गर्नुहोस्' } },
      },
      {
        id: 'volunteer',
        q: { en: 'How can I volunteer?', ne: 'स्वयंसेवक कसरी बन्ने?' },
        a: [
          {
            en: 'Join one of our street, river or neighbourhood clean-ups. Send us your name and phone number and we will tell you the next date, the place and what to bring.',
            ne: 'हाम्रो सडक, नदी वा टोल सरसफाइ अभियानमा सहभागी हुनुहोस्। नाम र फोन नम्बर पठाउनुहोस्, हामी अर्को अभियानको मिति, स्थान र ल्याउनुपर्ने सामग्रीबारे जानकारी दिनेछौँ।',
          },
        ],
        link: { href: '/contact/?type=volunteer#request', label: { en: 'Sign up to volunteer', ne: 'स्वयंसेवकका लागि नाम लेखाउनुहोस्' } },
      },
      {
        id: 'visit',
        q: { en: 'Can students and researchers visit your composting plants?', ne: 'के विद्यार्थी र अनुसन्धानकर्ताले कम्पोस्ट प्लान्ट हेर्न सक्छन्?' },
        a: [
          {
            en: 'Yes — nursing, science and environment students have visited our office, composting plants and organic farm. Write to us with your institution, the number of students and the dates you have in mind.',
            ne: 'सक्छन् — नर्सिङ, विज्ञान र वातावरण विषयका विद्यार्थीले हाम्रो कार्यालय, कम्पोस्ट प्लान्ट र प्राङ्गारिक फार्मको भ्रमण गरेका छन्। संस्था, विद्यार्थी सङ्ख्या र मितिसहित हामीलाई लेख्नुहोस्।',
          },
        ],
        link: { href: '/contact/?type=research#request', label: { en: 'Plan a visit', ne: 'भ्रमणको योजना बनाउनुहोस्' } },
      },
      {
        id: 'partner',
        q: { en: 'How can our organisation work with NEPCEMAC?', ne: 'हाम्रो संस्थाले नेप्सेम्याकसँग कसरी काम गर्न सक्छ?' },
        a: [
          {
            en: 'We have worked with five municipalities, government bodies, INGOs such as Amici dei Bambini, and embassies. Get in touch about projects in waste, sanitation and environmental health — we can share our registration documents and past project records.',
            ne: 'हामीले पाँच नगरपालिका, सरकारी निकाय, अमिची देइ बाम्बिनी जस्ता अन्तर्राष्ट्रिय संस्था र दूतावाससँग काम गरेका छौँ। फोहोर, सरसफाइ र वातावरणीय स्वास्थ्यका परियोजनाबारे सम्पर्क गर्नुहोस् — दर्ताका कागजात र विगतका परियोजनाका अभिलेख उपलब्ध गराउन सक्छौँ।',
          },
        ],
        link: { href: '/partners/', label: { en: 'See our partners and records', ne: 'हाम्रा साझेदार र अभिलेख हेर्नुहोस्' } },
      },
      {
        id: 'publications',
        q: { en: 'Can I get your newsletter or composting manuals?', ne: 'के तपाईंहरूको समाचारपत्र वा कम्पोस्ट पुस्तिका पाउन सकिन्छ?' },
        a: [
          {
            en: 'Yes. Printed copies of NEPCEMAC Sandesh and our manuals are kept at the office. Ask for the one you need and we will send what we have.',
            ne: 'सकिन्छ। नेप्सेम्याक सन्देश र पुस्तिकाका छापिएका प्रति कार्यालयमा राखिएका छन्। चाहिएको प्रकाशन माग्नुहोस्, भएसम्म पठाउनेछौँ।',
          },
        ],
        link: { href: '/resources/#publications', label: { en: 'Our publications', ne: 'हाम्रा प्रकाशन' } },
      },
    ],
  },
  {
    id: 'about',
    title: { en: 'About NEPCEMAC', ne: 'नेप्सेम्याकबारे' },
    items: [
      {
        id: 'registered',
        q: { en: 'Is NEPCEMAC a registered organisation?', ne: 'के नेप्सेम्याक दर्ता भएको संस्था हो?' },
        a: [
          {
            en: 'Yes. NEPCEMAC is a non-profit NGO registered at the District Administration Office, Lalitpur on 28 April 1997 (no. 759) and affiliated with the Social Welfare Council since 1999 (no. 9485). It keeps double-entry accounts and is audited every year.',
            ne: 'हो। नेप्सेम्याक वि.सं. २०५४ वैशाख १६ मा जिल्ला प्रशासन कार्यालय, ललितपुरमा दर्ता (नं. ७५९) भएको र वि.सं. २०५६ देखि समाज कल्याण परिषद्‌मा आबद्ध (नं. ९४८५) गैरनाफामूलक संस्था हो। संस्थाले दोहोरो लेखा प्रणाली अपनाउँछ र वर्षेनी लेखापरीक्षण गराउँछ।',
          },
        ],
        link: { href: '/about/#structure', label: { en: 'Registration details', ne: 'दर्ताको विवरण' } },
      },
      {
        id: 'nepsemyak',
        q: { en: 'How are NEPCEMAC and Nepsemyak Sewa related?', ne: 'नेप्सेम्याक र नेप्सेम्याक सेवाबीच के सम्बन्ध छ?' },
        a: [
          {
            en: 'NEPCEMAC, the NGO, started door-to-door collection in 1997. Nepsemyak Sewa Pvt. Ltd. was set up in 2009 to run collection and transport on a larger scale, and took over that work in 2013. NEPCEMAC now focuses on awareness, training and composting.',
            ne: 'गैरसरकारी संस्था नेप्सेम्याकले वि.सं. २०५४ मा घरदैलो सङ्कलन सुरु गरेको थियो। सङ्कलन र ढुवानी ठूलो स्तरमा सञ्चालन गर्न वि.सं. २०६६ मा नेप्सेम्याक सेवा प्रा.लि. स्थापना भयो र २०७० देखि त्यो काम सम्हाल्यो। नेप्सेम्याक अहिले जनचेतना, तालिम र कम्पोस्टमा केन्द्रित छ।',
          },
        ],
        link: { href: '/about/#timeline', label: { en: 'Our timeline', ne: 'हाम्रो समयरेखा' } },
      },
      {
        id: 'office',
        q: { en: 'Where is your office and when is it open?', ne: 'कार्यालय कहाँ छ र कहिले खुल्छ?' },
        a: [
          {
            en: 'Bagdol Road, Lalitpur. Sunday to Friday, 7:00 am to 3:00 pm.',
            ne: 'बागडोल सडक, ललितपुर। आइतबारदेखि शुक्रबार, बिहान ७:०० देखि दिउँसो ३:०० सम्म।',
          },
        ],
        link: { href: '/contact/', label: { en: 'Map and phone numbers', ne: 'नक्सा र फोन नम्बर' } },
      },
    ],
  },
];
