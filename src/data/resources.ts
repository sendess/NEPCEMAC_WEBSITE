import type { L } from '~/i18n/utils';
import type { IconName } from '~/components/icons';

export type Publication = {
  id: string;
  icon: IconName;
  title: L;
  text: L;
  /** Put the PDF in public/files and set its path here to show a download button. */
  file?: string;
};

export const publications: Publication[] = [
  {
    id: 'sandesh',
    icon: 'newspaper',
    title: { en: 'NEPCEMAC Sandesh', ne: 'नेप्सेम्याक सन्देश' },
    text: {
      en: 'Our annual newsletter on environmental issues and waste management, for communities, local governments and partner organisations.',
      ne: 'समुदाय, स्थानीय सरकार र साझेदार संस्थाका लागि वातावरण तथा फोहोर व्यवस्थापनसम्बन्धी हाम्रो वार्षिक समाचारपत्र।',
    },
  },
  {
    id: 'book',
    icon: 'book-open',
    title: { en: 'Urban Solid Waste: A Great Problem & Simple Solution', ne: 'सहरी ठोस फोहोर: ठूलो समस्या, सरल समाधान' },
    text: {
      en: 'A book on the waste problem in Nepal’s cities and practical ways households and communities can solve it.',
      ne: 'नेपालका सहरमा फोहोरको समस्या र घरधुरी तथा समुदायले अपनाउन सक्ने व्यावहारिक समाधानबारे पुस्तक।',
    },
  },
  {
    id: 'manure',
    icon: 'sprout',
    title: { en: 'Composting manual: compost manure', ne: 'कम्पोस्ट पुस्तिका: कम्पोस्ट मल' },
    text: {
      en: 'Step-by-step pile and bin composting for homes, schools and communities.',
      ne: 'घर, विद्यालय र समुदायमा थुप्रो तथा बिन विधिबाट कम्पोस्ट बनाउने तरिका।',
    },
  },
  {
    id: 'bokashi',
    icon: 'sprout',
    title: { en: 'Composting manual: EM and Bokashi', ne: 'कम्पोस्ट पुस्तिका: ईएम र बोकासी' },
    text: {
      en: 'Using effective micro-organisms (EM) and Bokashi to compost kitchen waste quickly and without smell.',
      ne: 'प्रभावकारी सूक्ष्म जीवाणु (ईएम) र बोकासी प्रयोग गरी भान्साको फोहोरबाट छिटो र गन्धरहित कम्पोस्ट बनाउने तरिका।',
    },
  },
  {
    id: 'vermi',
    icon: 'sprout',
    title: { en: 'Composting manual: vermicompost', ne: 'कम्पोस्ट पुस्तिका: गँड्यौले मल' },
    text: {
      en: 'Keeping composting worms in a box to turn kitchen waste into rich manure.',
      ne: 'बाकसमा गँड्यौला पालेर भान्साको फोहोरबाट उत्कृष्ट मल बनाउने तरिका।',
    },
  },
  {
    id: 'training-manual',
    icon: 'graduation-cap',
    title: { en: 'Training manual on solid waste management', ne: 'ठोस फोहोर व्यवस्थापन तालिम पुस्तिका' },
    text: {
      en: 'The material behind our trainings for students, women’s groups and community leaders.',
      ne: 'विद्यार्थी, आमा समूह र सामुदायिक अगुवाका लागि सञ्चालित तालिमको सामग्री।',
    },
  },
  {
    id: 'pamphlets',
    icon: 'file-text',
    title: { en: 'Pamphlets and bulletins', ne: 'पर्चा र बुलेटिन' },
    text: {
      en: 'Short, illustrated guides used in door-to-door and school awareness programmes.',
      ne: 'घरदैलो तथा विद्यालय जनचेतना कार्यक्रममा प्रयोग हुने छोटा, चित्रसहितका मार्गदर्शन।',
    },
  },
];

export const research: { year?: string; title: L }[] = [
  { year: '2004', title: { en: 'Solid waste generation and management in the Central Zoo, Jawalakhel', ne: 'केन्द्रीय चिडियाखाना, जावलाखेलमा ठोस फोहोर उत्पादन र व्यवस्थापन' } },
  { title: { en: 'Waste generation in the Kathmandu Valley', ne: 'काठमाडौं उपत्यकामा फोहोर उत्पादन' } },
  { title: { en: 'Composting by different processes', ne: 'विभिन्न विधिबाट कम्पोस्ट निर्माण' } },
  { title: { en: 'Quality of compost made by different processes', ne: 'विभिन्न विधिबाट बनेको कम्पोस्टको गुणस्तर' } },
];

/** Ways to compost at home, from our training programmes. */
export const compostMethods: { icon: IconName; title: L; text: L }[] = [
  {
    icon: 'trash',
    title: { en: 'Bin composting', ne: 'बिन कम्पोस्ट' },
    text: {
      en: 'A closed plastic bin with air holes. Add kitchen waste in layers with dry leaves or soil; compost is ready in about two to three months.',
      ne: 'हावा छिर्ने प्वालसहितको बन्द प्लास्टिक बिन। भान्साको फोहोरलाई सुकेका पात वा माटोसँग तह–तह मिलाएर राख्नुहोस्; करिब दुईदेखि तीन महिनामा मल तयार हुन्छ।',
    },
  },
  {
    icon: 'sprout',
    title: { en: 'Vermicomposting', ne: 'गँड्यौले मल' },
    text: {
      en: 'Red composting worms in a shaded wooden box eat kitchen scraps and leave fine, rich manure. Keep it moist, not wet, and away from sun and rain.',
      ne: 'छहारीमा राखिएको काठको बाकसमा राता गँड्यौलाले भान्साको फोहोर खाएर मसिनो, पोषिलो मल बनाउँछन्। बाकस ओसिलो राख्नुहोस्, भिजेको होइन; घाम र पानीबाट जोगाउनुहोस्।',
    },
  },
  {
    icon: 'leaf',
    title: { en: 'Pile composting', ne: 'थुप्रो कम्पोस्ट' },
    text: {
      en: 'For gardens and schools with space: heap green and brown waste in layers, turn it every week or two, and cover it from heavy rain.',
      ne: 'ठाउँ भएका बगैँचा र विद्यालयका लागि: हरियो र सुक्खा फोहोर तह–तह थुपार्नुहोस्, एक–दुई हप्तामा पल्टाउनुहोस् र भारी वर्षाबाट छोप्नुहोस्।',
    },
  },
];
