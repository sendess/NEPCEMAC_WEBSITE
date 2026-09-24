import type { L } from '~/i18n/utils';

// Every entry here comes from a record: NEPCEMAC's own earlier websites (2009, 2013, 2021, 2024)
// or the independent documents listed in `studies`. Keep it that way — add a partner only with a source.

export type Partner = {
  id: string;
  name: L;
  /** File name in public/images/partners (without .webp). */
  logo?: string;
  /** When the work together started or took place. */
  period?: L;
  /** One line: what NEPCEMAC and this partner did together. */
  role: L;
  details?: L[];
  href?: string;
};

export type PartnerGroup = { id: string; title: L; intro: L; partners: Partner[] };

export const partnerGroups: PartnerGroup[] = [
  {
    id: 'local-government',
    title: { en: 'Local governments', ne: 'स्थानीय सरकार' },
    intro: {
      en: 'NEPCEMAC has worked under agreements with five municipalities, starting with its home city of Lalitpur.',
      ne: 'नेप्सेम्याकले आफ्नै सहर ललितपुरबाट सुरु गरी पाँच नगरपालिकासँग सम्झौताअन्तर्गत काम गरेको छ।',
    },
    partners: [
      {
        id: 'lalitpur',
        name: { en: 'Lalitpur Metropolitan City', ne: 'ललितपुर महानगरपालिका' },
        period: { en: 'Since April 1997', ne: 'वि.सं. २०५४ वैशाखदेखि' },
        role: {
          en: 'Door-to-door collection, composting, street cleaning, training and awareness in wards 2, 3, 4, 5, 13, 14, 19 and 20 (then Lalitpur Sub-Metropolitan City).',
          ne: 'वडा २, ३, ४, ५, १३, १४, १९ र २० (तत्कालीन ललितपुर उपमहानगरपालिका) मा घरदैलो सङ्कलन, कम्पोस्ट, सडक सफाइ, तालिम तथा जनचेतना।',
        },
        details: [
          {
            en: 'The city provided waste containers in NEPCEMAC’s working areas; a 2005 JICA action plan for the city records NEPCEMAC serving wards 2 (Jawalakhel to Pulchowk), 3, 4, 5 and 13.',
            ne: 'महानगरले नेप्सेम्याकको कार्यक्षेत्रमा फोहोर कन्टेनर उपलब्ध गरायो; सन् २००५ को जाइकाको कार्ययोजनाले नेप्सेम्याकले वडा २ (जावलाखेलदेखि पुल्चोकसम्म), ३, ४, ५ र १३ मा सेवा दिएको उल्लेख गरेको छ।',
          },
        ],
      },
      {
        id: 'kathmandu',
        name: { en: 'Kathmandu Metropolitan City', ne: 'काठमाडौं महानगरपालिका' },
        logo: 'kmc',
        period: { en: 'Since November 2001', ne: 'वि.सं. २०५८ मंसिरदेखि' },
        role: {
          en: 'Door-to-door collection, composting, street and river cleaning, training and awareness in wards 2, 3, 4, 5, 7, 15 and 16 and neighbouring areas; later clean-up programmes with wards 4 and 16.',
          ne: 'वडा २, ३, ४, ५, ७, १५, १६ र छिमेकी क्षेत्रमा घरदैलो सङ्कलन, कम्पोस्ट, सडक तथा नदी सफाइ, तालिम र जनचेतना; पछि वडा ४ र १६ सँग सरसफाइ कार्यक्रम।',
        },
        details: [
          {
            en: 'Waste was carried in NEPCEMAC’s own tipper trucks to the Sisdol landfill.',
            ne: 'सङ्कलित फोहोर नेप्सेम्याककै टिपरमार्फत सिसडोल ल्यान्डफिल साइट पुर्‍याइन्थ्यो।',
          },
        ],
      },
      {
        id: 'biratnagar',
        name: { en: 'Biratnagar Metropolitan City', ne: 'विराटनगर महानगरपालिका' },
        period: { en: 'Since May 2004', ne: 'वि.सं. २०६१ जेठदेखि' },
        role: {
          en: 'Door-to-door collection and public awareness in wards 2, 3, 10 and 11, with a branch office in Biratnagar.',
          ne: 'वडा २, ३, १० र ११ मा घरदैलो सङ्कलन र जनचेतना; विराटनगरमा शाखा कार्यालय।',
        },
      },
      {
        id: 'itahari',
        name: { en: 'Itahari Sub-Metropolitan City', ne: 'इटहरी उपमहानगरपालिका' },
        period: { en: 'Since July 2004', ne: 'वि.सं. २०६१ साउनदेखि' },
        role: {
          en: 'Environmental awareness programmes, with a branch office in Itahari.',
          ne: 'वातावरणीय जनचेतना कार्यक्रम; इटहरीमा शाखा कार्यालय।',
        },
      },
      {
        id: 'triyuga',
        name: { en: 'Triyuga Municipality, Udayapur', ne: 'त्रियुगा नगरपालिका, उदयपुर' },
        period: { en: 'Since May 2006', ne: 'वि.सं. २०६३ वैशाखदेखि' },
        role: {
          en: 'Waste management activities started with a branch office in Triyuga-3.',
          ne: 'त्रियुगा–३ मा शाखा कार्यालयसहित फोहोर व्यवस्थापनका गतिविधि सुरु।',
        },
      },
    ],
  },
  {
    id: 'government',
    title: { en: 'Government of Nepal', ne: 'नेपाल सरकार' },
    intro: {
      en: 'NEPCEMAC is registered, affiliated and recognised by national government bodies.',
      ne: 'नेप्सेम्याक नेपाल सरकारका निकायमा दर्ता, आबद्ध र सम्मानित संस्था हो।',
    },
    partners: [
      {
        id: 'swc',
        name: { en: 'Social Welfare Council', ne: 'समाज कल्याण परिषद्' },
        logo: 'nepal-government',
        period: { en: 'Since 1999', ne: 'वि.सं. २०५६ देखि' },
        role: {
          en: 'Affiliated since 1 October 1999 (no. 9485). The Council was the third party to NEPCEMAC’s 2008 project agreement with Amici dei Bambini.',
          ne: 'वि.सं. २०५६ असोज १४ देखि आबद्ध (नं. ९४८५)। अमिची देइ बाम्बिनीसँगको २०६४ को परियोजना सम्झौतामा परिषद् तेस्रो पक्ष थियो।',
        },
      },
      {
        id: 'moest',
        name: { en: 'Ministry of Environment, Science and Technology', ne: 'वातावरण, विज्ञान तथा प्रविधि मन्त्रालय' },
        logo: 'nepal-government',
        period: { en: '2005', ne: 'वि.सं. २०६२' },
        role: {
          en: 'Named NEPCEMAC the best NGO on World Environment Day 2005 for its work in environmental management and pollution control.',
          ne: 'वातावरण व्यवस्थापन र प्रदूषण नियन्त्रणमा योगदानका लागि विश्व वातावरण दिवस २०६२ मा नेप्सेम्याकलाई उत्कृष्ट गैरसरकारी संस्थाको सम्मान।',
        },
      },
      {
        id: 'dao',
        name: { en: 'District Administration Office, Lalitpur', ne: 'जिल्ला प्रशासन कार्यालय, ललितपुर' },
        logo: 'nepal-government',
        period: { en: 'Since 1997', ne: 'वि.सं. २०५४ देखि' },
        role: {
          en: 'Registration no. 759, dated 28 April 1997 (2054/01/16 BS). Its chief district officer was among the guests of the 2019 Lalitpur ring-road clean-up.',
          ne: 'दर्ता नं. ७५९, मिति २०५४/०१/१६। २०७५ को ललितपुर चक्रपथ सरसफाइ अभियानमा प्रमुख जिल्ला अधिकारी विशेष अतिथि हुनुहुन्थ्यो।',
        },
      },
      {
        id: 'health-directorate',
        name: { en: 'Central Regional Health Directorate, Hetauda', ne: 'केन्द्रीय क्षेत्रीय स्वास्थ्य निर्देशनालय, हेटौंडा' },
        logo: 'nepal-government',
        role: {
          en: 'NEPCEMAC is also registered with the directorate for its health services.',
          ne: 'स्वास्थ्य सेवाका लागि नेप्सेम्याक यस निर्देशनालयमा पनि दर्ता छ।',
        },
      },
    ],
  },
  {
    id: 'international',
    title: { en: 'International organisations and embassies', ne: 'अन्तर्राष्ट्रिय संस्था र दूतावास' },
    intro: {
      en: 'INGOs and embassies have supported NEPCEMAC projects in water, sanitation, recycling and organisational development.',
      ne: 'खानेपानी, सरसफाइ, पुनःप्रशोधन तथा संस्थागत विकासका परियोजनामा अन्तर्राष्ट्रिय संस्था र दूतावासले सहयोग गरेका छन्।',
    },
    partners: [
      {
        id: 'aibi',
        name: { en: 'Amici dei Bambini (AiBi), Italy', ne: 'अमिची देइ बाम्बिनी (एआईबीआई), इटाली' },
        logo: 'aibi',
        period: { en: 'January 2008 – May 2010', ne: 'वि.सं. २०६४ पुस – २०६७ जेठ' },
        role: {
          en: '“Water is Life: Promoting the Health of Children through Water, Sanitation and Health Activities” — a tripartite project of AiBi, NEPCEMAC and the Social Welfare Council, approved on 8 January 2008.',
          ne: '“पानी नै जीवन: खानेपानी, सरसफाइ तथा स्वास्थ्य गतिविधिमार्फत बालस्वास्थ्य प्रवर्द्धन” — एआईबीआई, नेप्सेम्याक र समाज कल्याण परिषद्‌बीचको त्रिपक्षीय परियोजना, वि.सं. २०६४ पुस २४ मा स्वीकृत।',
        },
        details: [
          {
            en: 'Safe drinking water: repaired wells and taps, new tube wells, purification units and overhead tanks, plus purified water in the dry season.',
            ne: 'सुरक्षित खानेपानी: इनार र धाराको मर्मत, नयाँ ट्युबवेल, शुद्धीकरण प्रणाली र ओभरहेड ट्यांकी, सुक्खा याममा शुद्ध पानी आपूर्ति।',
          },
          {
            en: 'Clean toilets built and maintained; composting plants to manage each institution’s own waste.',
            ne: 'सफा शौचालय निर्माण तथा मर्मत; हरेक संस्थाको फोहोर व्यवस्थापनका लागि कम्पोस्ट प्लान्ट।',
          },
          {
            en: 'Hygiene training for children, caretakers and teachers; regular health check-ups and de-worming.',
            ne: 'बालबालिका, हेरचाहकर्ता र शिक्षकलाई स्वच्छता तालिम; नियमित स्वास्थ्य जाँच र जुकाको औषधि।',
          },
          {
            en: 'Beneficiaries: Adarsha Saral Secondary School (Nagbahal, Lalitpur), Buddhist Child Home (Jorpati), a day-care centre (Jadibuti), Adarsha Saula Yuwak Higher Secondary School (Saibu, Lalitpur) and the NEPCEMAC Community Health Centre (Kusunti).',
            ne: 'लाभान्वित: आदर्श सरल माध्यमिक विद्यालय (नागबहाल, ललितपुर), बौद्ध बाल गृह (जोरपाटी), दिवा सेवा केन्द्र (जडिबुटी), आदर्श सौल युवक उच्च माध्यमिक विद्यालय (सैबु, ललितपुर) र नेप्सेम्याक सामुदायिक स्वास्थ्य केन्द्र (कुसुन्ती)।',
          },
        ],
        href: 'https://www.aibi.it',
      },
      {
        id: 'japan',
        name: { en: 'Embassy of Japan in Nepal', ne: 'नेपालस्थित जापानी दूतावास' },
        logo: 'japan-embassy',
        role: {
          en: 'Supported NEPCEMAC’s paper recycling unit in Gokarna, Kathmandu, which turns waste paper into envelopes, tea mats and file holders.',
          ne: 'रद्दी कागजबाट खाम, टि-म्याट र फाइल होल्डर बनाउने गोकर्ण, काठमाडौंस्थित नेप्सेम्याकको कागज पुनःप्रशोधन केन्द्रमा सहयोग।',
        },
      },
      {
        id: 'germany',
        name: { en: 'German Embassy Kathmandu and GIZ', ne: 'जर्मन दूतावास काठमाडौं र जीआईजेड' },
        logo: 'german-embassy',
        period: { en: '13 November 2019', ne: 'वि.सं. २०७६ कात्तिक २७' },
        role: {
          en: 'Dr. Claudia Hiepe, Head of German Development Cooperation at the German Embassy, and Pasma Dahal of GIZ Nepal visited NEPCEMAC to discuss strengthening the organisation.',
          ne: 'जर्मन दूतावासका जर्मन विकास सहयोग प्रमुख डा. क्लाउडिया हिपे र जीआईजेड नेपालकी पस्मा दाहालले संस्थाको सुदृढीकरणबारे छलफल गर्न नेप्सेम्याकको भ्रमण गर्नुभयो।',
        },
      },
    ],
  },
  {
    id: 'national',
    title: { en: 'National institutions and networks', ne: 'राष्ट्रिय संस्था र सञ्जाल' },
    intro: {
      en: 'Research bodies, conservation trusts and waste-sector networks NEPCEMAC has worked alongside.',
      ne: 'नेप्सेम्याकले सहकार्य गरेका अनुसन्धान निकाय, संरक्षण कोष र फोहोर व्यवस्थापन क्षेत्रका सञ्जाल।',
    },
    partners: [
      {
        id: 'ntnc',
        name: { en: 'National Trust for Nature Conservation — Central Zoo', ne: 'राष्ट्रिय प्रकृति संरक्षण कोष — केन्द्रीय चिडियाखाना' },
        logo: 'ntnc',
        period: { en: 'Since 2004', ne: 'वि.सं. २०६१ देखि' },
        role: {
          en: 'A 1-tonne-a-day composting plant at the Central Zoo in Jawalakhel turns the zoo’s organic waste into compost; NEPCEMAC also studied waste generation at the zoo in 2004.',
          ne: 'जावलाखेलस्थित केन्द्रीय चिडियाखानामा दैनिक १ टन क्षमताको कम्पोस्ट प्लान्टले चिडियाखानाको कुहिने फोहोरबाट मल बनाउँछ; सन् २००४ मा नेप्सेम्याकले चिडियाखानाको फोहोर उत्पादनबारे अध्ययन पनि गर्‍यो।',
        },
      },
      {
        id: 'nhrc',
        name: { en: 'Nepal Health Research Council', ne: 'नेपाल स्वास्थ्य अनुसन्धान परिषद्' },
        logo: 'nhrc',
        role: {
          en: 'The government’s health research body, listed by NEPCEMAC among its partners.',
          ne: 'नेपाल सरकारको स्वास्थ्य अनुसन्धान निकाय; नेप्सेम्याकका साझेदारमध्ये एक।',
        },
      },
      {
        id: 'swman',
        name: { en: 'Solid Waste Management Association of Nepal (SWMAN)', ne: 'ठोस फोहोरमैला व्यवस्थापन सङ्घ नेपाल (स्वम्यान)' },
        logo: 'swman',
        role: {
          en: 'The national association of organisations working in solid waste management, listed by NEPCEMAC among its partners.',
          ne: 'ठोस फोहोरमैला व्यवस्थापनमा काम गर्ने संस्थाहरूको राष्ट्रिय सङ्घ; नेप्सेम्याकका साझेदारमध्ये एक।',
        },
      },
      {
        id: 'ciud',
        name: { en: 'Centre for Integrated Urban Development (CIUD)', ne: 'सेन्टर फर इन्टिग्रेटेड अर्बन डेभलपमेन्ट (सीआईयूडी)' },
        logo: 'ciud',
        role: {
          en: 'A Nepali NGO working on sustainable cities, listed by NEPCEMAC among its partners.',
          ne: 'दिगो सहरका लागि काम गर्ने नेपाली गैरसरकारी संस्था; नेप्सेम्याकका साझेदारमध्ये एक।',
        },
      },
    ],
  },
  {
    id: 'private',
    title: { en: 'Private sector', ne: 'निजी क्षेत्र' },
    intro: {
      en: 'Companies in recycling and vehicles that support the waste chain, besides the sister organisations in our circle.',
      ne: 'हाम्रो परिवारका संस्थाबाहेक फोहोर व्यवस्थापनको शृङ्खलामा सहयोग गर्ने पुनःप्रशोधन तथा सवारी साधन क्षेत्रका कम्पनी।',
    },
    partners: [
      {
        id: 'everest-eco-polymers',
        name: { en: 'Everest Eco Polymers Pvt. Ltd.', ne: 'एभरेस्ट इको पोलिमर्स प्रा.लि.' },
        logo: 'everest-eco-polymers',
        role: { en: 'Plastic recycling, Lalitpur.', ne: 'प्लास्टिक पुनःप्रशोधन, ललितपुर।' },
      },
      {
        id: 'nepal-valley',
        name: { en: 'Nepal Valley Engineering and Auto Works Pvt. Ltd.', ne: 'नेपाल भ्याली इन्जिनियरिङ एन्ड अटो वर्क्स प्रा.लि.' },
        logo: 'nepal-valley',
        role: { en: 'Vehicle engineering and repair, Balaju, Kathmandu.', ne: 'सवारी साधन इन्जिनियरिङ तथा मर्मत, बालाजु, काठमाडौं।' },
      },
    ],
  },
];

/** Community groups and institutions named in NEPCEMAC’s campaign records. */
export const communityPartners: L[] = [
  { en: 'Bagdol Bikas Samaj Sewa', ne: 'बागडोल विकास समाज सेवा' },
  { en: 'Brahmayani Tole Bikas Sanstha', ne: 'ब्रह्मायणी टोल विकास संस्था' },
  { en: 'Dobhan Mahila Samuha', ne: 'दोभान महिला समूह' },
  { en: 'Ranibari Society, Kathmandu', ne: 'रानीबारी सोसाइटी, काठमाडौं' },
  { en: 'Nepal Red Cross Society, Jawalakhel sub-branch', ne: 'नेपाल रेडक्रस सोसाइटी, जावलाखेल उपशाखा' },
  { en: 'Nagarjun Samuha', ne: 'नागार्जुन समूह' },
  { en: 'Hanumante River Cleaning Campaign', ne: 'हनुमन्ते नदी सफाइ अभियान' },
  { en: 'Metro FM 94.6', ne: 'मेट्रो एफएम ९४.६' },
  { en: 'Alka Institute of Medical Sciences', ne: 'अल्का इन्स्टिच्युट अफ मेडिकल साइन्सेज' },
  { en: 'Nepal Army, Armed Police Force and Nepal Police (campaign partners)', ne: 'नेपाली सेना, सशस्त्र प्रहरी बल र नेपाल प्रहरी (अभियानका सहभागी)' },
];

export type Study = {
  id: string;
  year: string;
  title: string;
  publisher: L;
  finding: L;
  href: string;
  pages?: string;
};

/** Independent documents that record NEPCEMAC’s work. */
export const studies: Study[] = [
  {
    id: 'jica-2005-valley',
    year: '2005',
    title: 'The Study on the Solid Waste Management for the Kathmandu Valley — Final Report',
    publisher: {
      en: 'Ministry of Local Development, Government of Nepal, and Japan International Cooperation Agency (JICA)',
      ne: 'स्थानीय विकास मन्त्रालय, नेपाल सरकार र जापान अन्तर्राष्ट्रिय सहयोग नियोग (जाइका)',
    },
    finding: {
      en: 'Lists NEPCEMAC among the organisations working in solid waste management in the Kathmandu Valley.',
      ne: 'काठमाडौं उपत्यकामा ठोस फोहोर व्यवस्थापनमा काम गर्ने संस्थामा नेप्सेम्याकलाई सूचीकृत गरेको छ।',
    },
    href: 'https://openjicareport.jica.go.jp/pdf/11808656_01.pdf',
  },
  {
    id: 'jica-2005-lalitpur',
    year: '2005',
    title: 'Action Plan on Solid Waste Management of Lalitpur Sub-Metropolitan City',
    publisher: {
      en: 'Lalitpur Sub-Metropolitan City, Ministry of Local Development and JICA',
      ne: 'ललितपुर उपमहानगरपालिका, स्थानीय विकास मन्त्रालय र जाइका',
    },
    finding: {
      en: 'Records NEPCEMAC’s collection area — wards 2 (Jawalakhel to Pulchowk), 3, 4, 5 and 13 — and its use of the municipal container at Bagmati Bridge.',
      ne: 'नेप्सेम्याकको सङ्कलन क्षेत्र — वडा २ (जावलाखेलदेखि पुल्चोक), ३, ४, ५ र १३ — र बागमती पुलको नगर कन्टेनर प्रयोग गरेको उल्लेख।',
    },
    href: 'https://openjicareport.jica.go.jp/pdf/11808680.pdf',
  },
  {
    id: 'practical-action-2008',
    year: '2008',
    title: 'Best Practices on Solid Waste Management of Nepalese Cities',
    publisher: {
      en: 'Practical Action Nepal, with the European Union’s Asia Pro Eco II programme',
      ne: 'प्राक्टिकल एक्सन नेपाल, युरोपेली सङ्घको एसिया प्रो इको २ कार्यक्रमको सहयोगमा',
    },
    finding: {
      en: 'A full case study, “NEPCEMAC involvement in door-to-door waste collection”, calls the financially self-sustaining model a replicable best practice and NEPCEMAC one of the best examples of an NGO in urban waste management.',
      ne: '“घरदैलो फोहोर सङ्कलनमा नेप्सेम्याकको संलग्नता” शीर्षकको विस्तृत केस स्टडीले आर्थिक रूपमा आत्मनिर्भर मोडेललाई अनुकरणीय उत्कृष्ट अभ्यास र नेप्सेम्याकलाई सहरी फोहोर व्यवस्थापनमा गैरसरकारी संस्थाको उत्कृष्ट उदाहरण भनेको छ।',
    },
    href: 'https://www.nswai.org/docs/Best%20practices%20on%20solid%20waste%20management%20of%20Nepalese%20cities.pdf',
    pages: '29–32',
  },
  {
    id: 'gsj-2019',
    year: '2019',
    title: 'Review on Participatory Approach of Solid Waste Management with Special Focus on Lalitpur Metropolitan City, Nepal',
    publisher: { en: 'Global Scientific Journal, vol. 7, issue 8', ne: 'ग्लोबल साइन्टिफिक जर्नल, भाग ७, अङ्क ८' },
    finding: {
      en: 'Names NEPCEMAC among the largest private-sector organisations in Lalitpur’s waste management, running ward-level education programmes and household segregation pilots.',
      ne: 'ललितपुरको फोहोर व्यवस्थापनमा वडा स्तरीय शिक्षा कार्यक्रम र घरधुरी स्तरमा फोहोर छुट्याउने परीक्षण चलाउने ठूला निजी क्षेत्रका संस्थामा नेप्सेम्याकको नाम।',
    },
    href: 'https://www.globalscientificjournal.com/researchpaper/REVIEW_ON_PARTICIPATORY_APPROACH_OF_SOLID_WASTE_MANAGEMENT_WITH_SPECIAL_FOCUS_ON_LALITPUR_METROPOLITAN_CITY_NEPAL.pdf',
  },
  {
    id: 'aepc',
    year: '2023',
    title: 'A Review of Electronic and Solar PV Waste Management in Nepal (working paper)',
    publisher: {
      en: 'Alternative Energy Promotion Centre, Government of Nepal',
      ne: 'वैकल्पिक ऊर्जा प्रवर्द्धन केन्द्र, नेपाल सरकार',
    },
    finding: {
      en: 'Interviews NEPCEMAC as a waste organisation with ward contracts in Lalitpur that asks households to sort waste at source.',
      ne: 'ललितपुरका वडासँग सम्झौता गरी काम गर्ने र घरधुरीलाई स्रोतमै फोहोर छुट्याउन लगाउने संस्थाका रूपमा नेप्सेम्याकसँग अन्तर्वार्ता।',
    },
    href: 'https://www.aepc.gov.np/doc/review-of-solar-pv-e-waste-in-nepal-posted-working-paper',
  },
];

/** Figures reported for Lalitpur in the 2008 Practical Action case study. */
export const lalitpur2008: { value: string; label: L }[] = [
  { value: '13,000', label: { en: 'households served door to door', ne: 'घरधुरीमा घरदैलो सेवा' } },
  { value: '72%', label: { en: 'of household waste was organic', ne: 'घरायसी फोहोर कुहिने प्रकृतिको' } },
  { value: '0.37 kg', label: { en: 'waste per person per day', ne: 'प्रतिव्यक्ति प्रतिदिन फोहोर' } },
  { value: '174', label: { en: 'full-time staff, plus daily-wage workers', ne: 'पूर्णकालीन कर्मचारी, दैनिक ज्यालादारीबाहेक' } },
];
