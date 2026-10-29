// Words and figures for the interactive tools on the Resources page (sorting game, household waste,
// compost doctor), the tools menu under "Resources" and the "Try it yourself" band on the home page.
import type { IconName } from '~/components/icons';
import type { L } from '~/i18n/utils';

/* ---------------- The tools, as listed in the menu and on the home page ---------------- */

export type Tool = { id: string; icon: IconName; href: string; title: L; text: L };

export const tools: Tool[] = [
  {
    id: 'finder',
    icon: 'search',
    href: '/resources/#finder',
    title: { en: 'Which bucket?', ne: 'कुन बाल्टिनमा?' },
    text: { en: 'Look up where more than 40 everyday things go.', ne: 'दैनिक प्रयोगका ४० भन्दा बढी सामान कहाँ हाल्ने, खोज्नुहोस्।' },
  },
  {
    id: 'quiz',
    icon: 'gamepad-2',
    href: '/resources/#quiz',
    title: { en: 'Sorting game', ne: 'फोहोर छुट्याउने खेल' },
    text: { en: 'Ten quick questions. How well do you sort?', ne: 'दसवटा छिटा प्रश्न। तपाईं कत्तिको राम्रोसँग छुट्याउनुहुन्छ?' },
  },
  {
    id: 'your-waste',
    icon: 'calculator',
    href: '/resources/#your-waste',
    title: { en: 'Household waste', ne: 'घरको फोहोर' },
    text: { en: 'How much your home throws away, and where it ends up.', ne: 'घरबाट कति फोहोर निस्कन्छ र त्यो कहाँ पुग्छ।' },
  },
  {
    id: 'compost-doctor',
    icon: 'stethoscope',
    href: '/resources/#compost-doctor',
    title: { en: 'Compost doctor', ne: 'कम्पोस्ट डाक्टर' },
    text: { en: 'Smelly, soggy or slow compost — and how to fix it.', ne: 'गन्हाउने, धेरै भिजेको वा ढिलो कुहिने कम्पोस्ट — र यसको उपाय।' },
  },
  {
    id: 'poster',
    icon: 'printer',
    href: '/poster/',
    title: { en: 'Kitchen poster', ne: 'भान्साको पोस्टर' },
    text: { en: 'Print a one-page sorting guide.', ne: 'एक पृष्ठको फोहोर छुट्याउने मार्गदर्शन छाप्नुहोस्।' },
  },
];

export const toolsCopy = {
  menuOpen: { en: 'Show the resources menu', ne: 'सामग्री मेनु देखाउनुहोस्' },
  menuAll: { en: 'All resources', ne: 'सबै सामग्री' },
  label: { en: 'Interactive tools', ne: 'अन्तरक्रियात्मक साधन' },
  open: { en: 'Open', ne: 'खोल्नुहोस्' },
  homeEyebrow: { en: 'Try it yourself', ne: 'आफैं प्रयास गर्नुहोस्' },
  homeTitle: { en: 'Learn by doing', ne: 'गरेर सिकौँ' },
  homeIntro: {
    en: 'Quick tools for sorting, composting and seeing what your home throws away — handy at home and in the classroom.',
    ne: 'फोहोर छुट्याउन, कम्पोस्ट बनाउन र घरबाट कति फोहोर निस्कन्छ हेर्न सजिला साधन — घर र कक्षाकोठा दुवैका लागि।',
  },
} satisfies Record<string, L>;

/* ---------------- Sorting game ---------------- */

export const quizCopy = {
  eyebrow: { en: 'Sorting game', ne: 'फोहोर छुट्याउने खेल' },
  title: { en: 'How well do you sort?', ne: 'तपाईं कत्तिको राम्रोसँग फोहोर छुट्याउनुहुन्छ?' },
  intro: {
    en: 'Ten everyday things from a Nepali home. Pick the right bucket for each — it takes about two minutes, and works well in a classroom too.',
    ne: 'नेपाली घरमा निस्कने दसवटा दैनिक फोहोर। हरेकका लागि सही बाल्टिन छान्नुहोस् — करिब दुई मिनेट लाग्छ, कक्षाकोठामा खेल्न पनि उपयुक्त छ।',
  },
  start: { en: 'Start the game', ne: 'खेल सुरु गर्नुहोस्' },
  startNote: { en: '4 green, 4 red and 2 hazardous items, picked at random each time.', ne: 'हरेकपटक नयाँ: ४ हरियो, ४ रातो र २ हानिकारक सामान।' },
  question: { en: 'Question {n} of {total}', ne: '{total} मध्ये प्रश्न {n}' },
  prompt: { en: 'Where does this go?', ne: 'यो कहाँ जान्छ?' },
  right: { en: 'Right!', ne: 'सही!' },
  wrong: { en: 'Not quite.', ne: 'मिलेन।' },
  answer: { en: 'Correct answer: {bin}', ne: 'सही उत्तर: {bin}' },
  next: { en: 'Next question', ne: 'अर्को प्रश्न' },
  finish: { en: 'See my score', ne: 'मेरो नतिजा हेर्नुहोस्' },
  score: { en: '{n} out of {total}', ne: '{total} मा {n}' },
  perfect: { en: 'Perfect! You sort like a pro.', ne: 'उत्कृष्ट! तपाईं त फोहोर छुट्याउने विज्ञ हुनुहुन्छ।' },
  great: { en: 'Great sorting — just a few to remember.', ne: 'धेरै राम्रो — केहीवटा मात्र सम्झिनुपर्ने।' },
  good: { en: 'A good start. The notes below will help.', ne: 'राम्रो सुरुवात। तलका टिपोटले सहयोग गर्नेछन्।' },
  low: { en: 'Sorting takes practice — look through the guide above and try again.', ne: 'फोहोर छुट्याउन अभ्यास चाहिन्छ — माथिको मार्गदर्शन हेरेर फेरि प्रयास गर्नुहोस्।' },
  missed: { en: 'Worth remembering', ne: 'सम्झिनलायक' },
  best: { en: 'Your best so far: {n} out of {total}', ne: 'अहिलेसम्मको तपाईंको उत्कृष्ट: {total} मा {n}' },
  again: { en: 'Play again', ne: 'फेरि खेल्नुहोस्' },
  share: { en: 'Challenge a friend', ne: 'साथीलाई चुनौती दिनुहोस्' },
  shareText: {
    en: 'I scored {n} out of {total} in NEPCEMAC’s waste sorting game. Can you beat me?',
    ne: 'नेप्सेम्याकको फोहोर छुट्याउने खेलमा मैले {total} मा {n} ल्याएँ। तपाईं कति ल्याउनुहुन्छ?',
  },
  copied: { en: 'Link copied — paste it in a message.', ne: 'लिङ्क कपी भयो — सन्देशमा टाँस्नुहोस्।' },
  noScript: { en: 'The game needs JavaScript. The list above works without it.', ne: 'यो खेल चलाउन JavaScript चाहिन्छ। माथिको सूची भने यसबिनै चल्छ।' },
  // Home page teaser: one question at a time.
  quick: { en: 'Quick question', ne: 'छिटो प्रश्न' },
  quickPrompt: { en: 'Which bucket does this go in?', ne: 'यो कुन बाल्टिनमा जान्छ?' },
  quickHint: { en: 'Tap a bucket — you’ll see straight away if you’re right.', ne: 'एउटा बाल्टिन थिच्नुहोस् — सही भयो कि भएन, तुरुन्तै थाहा हुन्छ।' },
  another: { en: 'Another one', ne: 'अर्को' },
  playAll: { en: 'Play all ten', ne: 'दसवटै खेल्नुहोस्' },
} satisfies Record<string, L>;

/* ---------------- Household waste ---------------- */

/**
 * From the Asian Development Bank's 2012 survey of 3,233 households in Nepal's 58 municipalities
 * ("Solid Waste Management in Nepal: Current Status and Policy Recommendations", 2013, Figure 4):
 * 170 g per person per day; composition organic 66, plastics 12, paper 9, glass 3, metals 2,
 * textiles 2, rubber and leather 1, others 5 (%). The same report quotes JICA's 2004 study of
 * Kathmandu households: 223 g (dry season) and 248 g (wet season) per person per day.
 */
export const householdWaste = {
  nepalGrams: 170,
  kathmanduGrams: 235,
  share: { organic: 66, recyclable: 29, other: 5 },
  sources: [
    {
      label: 'Asian Development Bank (2013), Solid Waste Management in Nepal: Current Status and Policy Recommendations',
      href: 'https://www.adb.org/publications/solid-waste-management-nepal-current-status-and-policy-recommendations',
    },
    {
      // Sisdol is about 27 km from Kathmandu; every Valley municipality except Bhaktapur, Lalitpur included, dumps there.
      label: 'The Kathmandu Post (7 February 2017), Valley municipalities explore new landfill site',
      href: 'https://kathmandupost.com/valley/2017/02/07/valley-municipalities-explore-new-landfill-site',
    },
    {
      // In use since 2005; Banchare Danda lies about 2 km west of it in Nuwakot.
      label: 'The Kathmandu Post (3 November 2017), Sisdole dumping ground nearing its full capacity',
      href: 'https://kathmandupost.com/national/2017/11/03/sisdole-dumping-ground-nearing-its-full-capacity',
    },
  ],
};

export const wasteCopy = {
  eyebrow: { en: 'Your waste', ne: 'तपाईंको फोहोर' },
  title: { en: 'How much does your home throw away?', ne: 'तपाईंको घरबाट कति फोहोर निस्कन्छ?' },
  intro: {
    en: 'Tell us a little about your home to see an estimate — and how much of it could be put to use instead of thrown away.',
    ne: 'आफ्नो घरबारे अलिकति जानकारी दिएर अनुमानित फोहोर हेर्नुहोस् — र त्यसमध्ये कति फाल्नुको सट्टा काममा लगाउन सकिन्छ।',
  },
  people: { en: 'People living in your home', ne: 'तपाईंको घरमा बस्ने मानिस' },
  personOne: { en: '1 person', ne: '१ जना' },
  personMany: { en: '{n} people', ne: '{n} जना' },
  fewer: { en: 'One person fewer', ne: 'एक जना घटाउनुहोस्' },
  more: { en: 'One person more', ne: 'एक जना थप्नुहोस्' },
  rate: { en: 'Waste per person', ne: 'प्रतिव्यक्ति फोहोर' },
  rateNepal: { en: 'Nepal’s average — 170 g a day', ne: 'नेपालको औसत — दैनिक १७० ग्राम' },
  rateCity: { en: 'A Kathmandu city home — about 235 g a day', ne: 'काठमाडौंको सहरी घर — दैनिक करिब २३५ ग्राम' },
  habits: { en: 'What does your home already do?', ne: 'तपाईंको घरमा अहिले के गरिन्छ?' },
  habitRecycle: {
    en: 'We keep plastic, paper, glass and metal clean and dry, and give them to a scrap dealer (kabadi)',
    ne: 'हामी प्लास्टिक, कागज, सिसा र धातु सफा–सुक्खा राखेर कबाडीलाई दिन्छौँ',
  },
  habitCompost: { en: 'We compost our kitchen and garden waste', ne: 'हामी भान्सा र बगैँचाको फोहोरबाट कम्पोस्ट बनाउँछौँ' },
  perDay: { en: 'a day', ne: 'दैनिक' },
  perMonth: { en: 'a month', ne: 'मासिक' },
  perYear: { en: 'a year', ne: 'वार्षिक' },
  kg: { en: 'kg', ne: 'किलो' },
  sacks: {
    en: 'Every year, about as heavy as {n} sacks of rice (25 kg each).',
    ne: 'हरेक वर्ष करिब {n} बोरा चामल (२५ किलोको बोरा) जत्तिकै तौल।',
  },
  madeOf: { en: 'What it is made of', ne: 'यसमा के–के हुन्छ' },
  organic: { en: 'Food and garden waste', ne: 'खाना र बगैँचाको फोहोर' },
  organicHint: { en: 'can become compost', ne: 'कम्पोस्ट बनाउन सकिन्छ' },
  recyclable: { en: 'Plastic, paper, glass, metal and cloth', ne: 'प्लास्टिक, कागज, सिसा, धातु र कपडा' },
  recyclableHint: { en: 'can be recycled', ne: 'पुनःप्रशोधन गर्न सकिन्छ' },
  other: { en: 'Other waste', ne: 'अन्य फोहोर' },
  otherHint: { en: 'has to be thrown away', ne: 'फाल्नैपर्ने' },
  leaves: { en: 'Still leaves your home as waste', ne: 'अझै फोहोरका रूपमा घरबाहिर जाने' },
  leavesValue: { en: '{kg} kg a year — {pct}% of it', ne: 'वार्षिक {kg} किलो — कुलको {pct}%' },
  verdictNone: {
    en: 'Everything goes out in one bag. Sorting and composting could cut this by up to 95%.',
    ne: 'सबै फोहोर एउटै झोलामा बाहिर जान्छ। छुट्याएर र कम्पोस्ट बनाएर यसलाई ९५% सम्म घटाउन सकिन्छ।',
  },
  verdictRecycle: {
    en: 'Good — your recyclables are back in use. Composting would take care of most of what is left.',
    ne: 'राम्रो — पुनःप्रशोधन हुने सामान फेरि प्रयोगमा पुग्छ। कम्पोस्ट बनाउनुभयो भने बाँकीको धेरैजसो भाग पनि घरमै व्यवस्थापन हुन्छ।',
  },
  verdictCompost: {
    en: 'Great — your kitchen waste stays at home as manure. Giving recyclables to a kabadi would leave very little.',
    ne: 'उत्कृष्ट — भान्साको फोहोर घरमै मल बन्छ। पुनःप्रशोधन हुने सामान कबाडीलाई दिनुभयो भने फाल्ने फोहोर निकै थोरै हुन्छ।',
  },
  verdictBoth: {
    en: 'Excellent — only about one twentieth of your waste is left to throw away.',
    ne: 'उत्कृष्ट — तपाईंको फोहोरको करिब बीस भागमा एक भाग मात्र फाल्न बाँकी रहन्छ।',
  },
  note: {
    en: 'An estimate, based on a 2012 survey of 3,233 households in Nepal’s 58 municipalities by the Asian Development Bank: each person throws away about 170 g a day, of which 66% is food and garden waste, 29% recyclable material and 5% other waste. A 2004 JICA study measured 223–248 g a day in Kathmandu homes. Your home may differ.',
    ne: 'एसियाली विकास बैंकले सन् २०१२ मा नेपालका ५८ नगरपालिकाका ३,२३३ घरधुरीमा गरेको सर्वेक्षणमा आधारित अनुमान: प्रतिव्यक्ति दैनिक करिब १७० ग्राम फोहोर निस्कन्छ, जसमध्ये ६६% खाना र बगैँचाको फोहोर, २९% पुनःप्रशोधन हुने सामग्री र ५% अन्य फोहोर हुन्छ। जाइकाको सन् २००४ को अध्ययनले काठमाडौंका घरमा दैनिक २२३–२४८ ग्राम मापन गरेको थियो। तपाईंको घरको परिमाण फरक हुन सक्छ।',
  },
  sources: { en: 'Sources', ne: 'स्रोत' },
} satisfies Record<string, L>;

/* ---------------- Where it goes ---------------- */

export type JourneyStep = { icon: IconName; title: L; text: L };

export const journeyCopy = {
  title: { en: 'Where does it go?', ne: 'फोहोर कहाँ पुग्छ?' },
  intro: {
    en: 'Follow your waste out of the door, and compare the two ways it can leave your home.',
    ne: 'घरबाट निस्केको फोहोरको यात्रा हेर्नुहोस्, र घरबाट फोहोर निस्कने दुई तरिकाको तुलना गर्नुहोस्।',
  },
  mixed: { en: 'All in one bag', ne: 'सबै एउटै झोलामा' },
  sorted: { en: 'Sorted at home', ne: 'घरमै छुट्याएर' },
  mixedEnd: { en: 'Reaches the landfill: all of it', ne: 'ल्यान्डफिल पुग्ने: सबै' },
  sortedEnd: { en: 'Left to throw away: about 5 kg in every 100', ne: 'फाल्न बाँकी: हरेक १०० किलोमा करिब ५ किलो' },
  yourHome: { en: 'From your home: {kg} kg a year', ne: 'तपाईंको घरबाट: वार्षिक {kg} किलो' },
} satisfies Record<string, L>;

export const journey: { mixed: JourneyStep[]; sorted: JourneyStep[] } = {
  mixed: [
    {
      icon: 'shopping-bag',
      title: { en: 'Into one bag', ne: 'एउटै झोलामा' },
      text: {
        en: 'Food scraps, plastic, paper and batteries are thrown out together. Wet food soils the paper and plastic, so little of it can be recycled.',
        ne: 'खानाका टुक्रा, प्लास्टिक, कागज र ब्याट्री सबै सँगै फालिन्छन्। भिजेको खानाले कागज र प्लास्टिक फोहोर बनाउने भएकाले थोरै मात्र पुनःप्रशोधन हुन्छ।',
      },
    },
    {
      icon: 'truck',
      title: { en: 'Collected', ne: 'सङ्कलन' },
      text: {
        en: 'A collection crew takes it away — in parts of Lalitpur door to door, by our sister company Nepsemyak Sewa. Where nobody collects, it ends up by the road or in a river.',
        ne: 'सङ्कलन टोलीले लैजान्छ — ललितपुरका केही भागमा हाम्रो भगिनी संस्था नेप्सेम्याक सेवाले घरदैलोबाटै। सङ्कलन नहुने ठाउँमा यो सडकछेउ वा खोलामा पुग्छ।',
      },
    },
    {
      icon: 'mountain',
      title: { en: 'A long ride', ne: 'लामो यात्रा' },
      text: {
        en: 'Trucks carry it out of the Valley to the landfill at Sisdol, in use since 2005, and the newer Banchare Danda site beside it in Nuwakot — about 27 km from Kathmandu.',
        ne: 'ट्रकले यसलाई उपत्यकाबाहिर नुवाकोटको सिसडोल ल्यान्डफिल (सन् २००५ देखि प्रयोगमा) र त्यसकै छेउको नयाँ बन्चरेडाँडा साइटसम्म पुर्‍याउँछन् — काठमाडौंबाट करिब २७ किलोमिटर टाढा।',
      },
    },
    {
      icon: 'triangle-alert',
      title: { en: 'Buried', ne: 'पुरिन्छ' },
      text: {
        en: 'In the landfill, rotting food gives off methane and dirty water (leachate) that seeps into the ground. When the landfill or its road is blocked, collection stops and waste piles up in the streets.',
        ne: 'ल्यान्डफिलमा कुहिएको खानाबाट मिथेन ग्यास र जमिनमा चुहिने फोहोर पानी (लिचेट) निस्कन्छ। ल्यान्डफिल वा त्यहाँ जाने बाटो अवरुद्ध हुँदा सङ्कलन रोकिन्छ र सडकमा फोहोर थुप्रिन्छ।',
      },
    },
  ],
  sorted: [
    {
      icon: 'house',
      title: { en: 'Three containers', ne: 'तीनवटा भाँडा' },
      text: {
        en: 'A green bucket for waste that rots, a red one for waste that does not, and a box for batteries, medicines and other hazardous things.',
        ne: 'कुहिने फोहोरका लागि हरियो बाल्टिन, नकुहिनेका लागि रातो, र ब्याट्री, औषधि जस्ता हानिकारक सामानका लागि छुट्टै बाकस।',
      },
    },
    {
      icon: 'sprout',
      title: { en: 'Green bucket → compost', ne: 'हरियो बाल्टिन → कम्पोस्ट' },
      text: {
        en: 'Kitchen and garden waste goes into a compost bin and becomes manure for your plants in about two to three months.',
        ne: 'भान्सा र बगैँचाको फोहोर कम्पोस्ट बिनमा राख्दा करिब दुईदेखि तीन महिनामा बोटबिरुवाका लागि मल बन्छ।',
      },
    },
    {
      icon: 'recycle',
      title: { en: 'Red bucket → recycling', ne: 'रातो बाल्टिन → पुनःप्रशोधन' },
      text: {
        en: 'Clean, dry plastic, paper, glass and metal are sold or given to a scrap dealer (kabadi) and made into new things.',
        ne: 'सफा र सुक्खा प्लास्टिक, कागज, सिसा र धातु कबाडीलाई बेचिन्छ वा दिइन्छ, र त्यसबाट नयाँ सामान बन्छ।',
      },
    },
    {
      icon: 'battery',
      title: { en: 'Hazardous → handled apart', ne: 'हानिकारक → छुट्टै व्यवस्थापन' },
      text: {
        en: 'Batteries, medicines and electronics are handed over separately, so their poisons stay out of the soil and water.',
        ne: 'ब्याट्री, औषधि र इलेक्ट्रोनिक सामान छुट्टै हस्तान्तरण गरिन्छ, ताकि तिनका विषालु तत्त्व माटो र पानीमा नमिसिऊन्।',
      },
    },
  ],
};

/* ---------------- Compost doctor ---------------- */

export type CompostProblem = { id: string; icon: IconName; label: L; why: L; fixes: L[] };

export const doctorCopy = {
  eyebrow: { en: 'Compost doctor', ne: 'कम्पोस्ट डाक्टर' },
  title: { en: 'Something not right with your compost?', ne: 'कम्पोस्टमा केही गडबड छ?' },
  intro: { en: 'Pick what you see, and we’ll tell you why it happens and what to do.', ne: 'तपाईंले देखेको समस्या छान्नुहोस् — किन हुन्छ र के गर्ने, हामी बताउँछौँ।' },
  choose: { en: 'What do you see?', ne: 'के देख्नुभयो?' },
  why: { en: 'Why it happens', ne: 'किन हुन्छ' },
  fix: { en: 'What to do', ne: 'के गर्ने' },
  readyWhy: { en: 'How to tell', ne: 'कसरी थाहा पाउने' },
  readyFix: { en: 'Then', ne: 'त्यसपछि' },
  stuck: { en: 'Still stuck? We run composting trainings for homes, schools and groups.', ne: 'अझै समस्या छ? हामी घर, विद्यालय र समूहका लागि कम्पोस्ट तालिम सञ्चालन गर्छौँ।' },
  ask: { en: 'Ask about a training', ne: 'तालिमबारे सोध्नुहोस्' },
} satisfies Record<string, L>;

export const compostProblems: CompostProblem[] = [
  {
    id: 'smell',
    icon: 'wind',
    label: { en: 'It smells bad', ne: 'गन्हाउँछ' },
    why: {
      en: 'It is too wet, or there is too much fresh kitchen waste and not enough air.',
      ne: 'धेरै भिजेको छ, वा ताजा भान्साको फोहोर धेरै र हावा कम भयो।',
    },
    fixes: [
      { en: 'Mix in a few handfuls of dry leaves, sawdust or torn cardboard.', ne: 'केही मुठी सुकेका पात, काठको धुलो वा च्यातिएको कार्टुन मिसाउनुहोस्।' },
      { en: 'Stir or turn it to let air in, and check that the air holes are open.', ne: 'हावा छिर्न चलाउनुहोस् वा पल्टाउनुहोस्, र हावा छिर्ने प्वाल खुला छन् कि हेर्नुहोस्।' },
      { en: 'Add fresh scraps a little at a time and cover each layer.', ne: 'ताजा फोहोर थोरै–थोरै हाल्नुहोस् र हरेक तह छोप्नुहोस्।' },
    ],
  },
  {
    id: 'wet',
    icon: 'droplet',
    label: { en: 'It is soggy or leaking', ne: 'धेरै भिजेको छ वा पानी चुहिन्छ' },
    why: { en: 'Too much wet waste has gone in, or rain is getting in.', ne: 'भिजेको फोहोर धेरै भयो, वा भित्र पानी छिरिरहेको छ।' },
    fixes: [
      { en: 'Add dry material — leaves, straw, sawdust or shredded paper — and mix it through.', ne: 'सुक्खा सामग्री — पात, पराल, काठको धुलो वा टुक्र्याइएको कागज — हालेर राम्ररी मिसाउनुहोस्।' },
      { en: 'Keep the lid on and move the bin out of the rain.', ne: 'बिर्को बन्द राख्नुहोस् र बिनलाई पानी नपर्ने ठाउँमा सार्नुहोस्।' },
      { en: 'Drain off any liquid that collects at the bottom.', ne: 'फेदमा जम्मा भएको पानी निकाल्नुहोस्।' },
    ],
  },
  {
    id: 'flies',
    icon: 'bug',
    label: { en: 'Flies or maggots', ne: 'झिँगा वा किरा' },
    why: { en: 'Fresh food has been left uncovered on top.', ne: 'ताजा खाना माथि खुला छाडिएको छ।' },
    fixes: [
      { en: 'Bury new scraps under a layer of soil, dry leaves or finished compost.', ne: 'नयाँ फोहोरलाई माटो, सुकेका पात वा पाकेको कम्पोस्टको तहले छोप्नुहोस्।' },
      { en: 'Keep the lid closed.', ne: 'बिर्को बन्द राख्नुहोस्।' },
      { en: 'A few larvae inside a closed bin do no harm — they help break the waste down.', ne: 'बन्द बिनभित्रका केही लार्भाले हानि गर्दैनन् — बरु फोहोर कुहाउन मद्दत गर्छन्।' },
    ],
  },
  {
    id: 'slow',
    icon: 'timer',
    label: { en: 'Nothing is happening', ne: 'कुहिँदै कुहिँदैन' },
    why: { en: 'It is too dry, the pieces are too big, or there is too much dry material.', ne: 'धेरै सुक्खा छ, टुक्रा ठूला छन्, वा सुक्खा सामग्री धेरै भयो।' },
    fixes: [
      { en: 'Chop scraps into small pieces before adding them.', ne: 'हाल्नुअघि फोहोरलाई सानो–सानो टुक्रा पार्नुहोस्।' },
      { en: 'Sprinkle water until it feels like a wrung-out sponge.', ne: 'निचोरिएको स्पन्जजस्तो ओसिलो नहुन्जेल पानी छर्कनुहोस्।' },
      { en: 'Mix in fresh kitchen waste and a handful of soil or old compost.', ne: 'ताजा भान्साको फोहोर र एक मुठी माटो वा पुरानो कम्पोस्ट मिसाउनुहोस्।' },
    ],
  },
  {
    id: 'ants',
    icon: 'sun',
    label: { en: 'Ants have moved in', ne: 'कमिला लागे' },
    why: { en: 'The compost is too dry.', ne: 'कम्पोस्ट धेरै सुक्खा छ।' },
    fixes: [
      { en: 'Sprinkle water and mix it in.', ne: 'पानी छर्केर मिसाउनुहोस्।' },
      { en: 'Add more fresh kitchen waste.', ne: 'अझ ताजा भान्साको फोहोर थप्नुहोस्।' },
      { en: 'Turn it more often.', ne: 'धेरैपटक पल्टाउनुहोस्।' },
    ],
  },
  {
    id: 'animals',
    icon: 'rat',
    label: { en: 'Rats, dogs or cats dig in it', ne: 'मुसा, कुकुर वा बिरालोले खोस्रिन्छन्' },
    why: { en: 'Meat, fish, bones or oily food are attracting them.', ne: 'मासु, माछा, हड्डी वा तेलिलो खानाले तिनलाई आकर्षित गरेको छ।' },
    fixes: [
      { en: 'Use a closed bin with a lid.', ne: 'बिर्कोसहितको बन्द बिन प्रयोग गर्नुहोस्।' },
      {
        en: 'Keep meat, fish and bones out of a home compost bin — they are fine in the green bucket for collection.',
        ne: 'घरको कम्पोस्ट बिनमा मासु, माछा र हड्डी नहाल्नुहोस् — सङ्कलनका लागि हरियो बाल्टिनमा भने ठीक छ।',
      },
      { en: 'Bury fresh food scraps in the middle of the pile.', ne: 'ताजा खानाको फोहोर थुप्रोको बीचमा पुर्नुहोस्।' },
    ],
  },
  {
    id: 'ready',
    icon: 'sprout',
    label: { en: 'Is it ready yet?', ne: 'मल तयार भयो?' },
    why: {
      en: 'Ready compost is dark brown and crumbly, and smells like a forest floor. You can no longer tell what went in. In a bin this takes about two to three months.',
      ne: 'तयार कम्पोस्ट गाढा खैरो र बुरबुराउने हुन्छ, र जङ्गलको माटोजस्तो गन्ध आउँछ। भित्र के हालेको थियो, चिनिँदैन। बिनमा यसका लागि करिब दुईदेखि तीन महिना लाग्छ।',
    },
    fixes: [
      { en: 'Sieve out pieces that have not broken down and put them back in the bin.', ne: 'नकुहिएका टुक्रा चालेर निकाल्नुहोस् र फेरि बिनमा हाल्नुहोस्।' },
      { en: 'Let it rest for a week or two before using it around young plants.', ne: 'साना बिरुवामा प्रयोग गर्नुअघि एक–दुई हप्ता थन्क्याउनुहोस्।' },
      { en: 'Mix it into the soil of your pots and vegetable beds.', ne: 'गमला र करेसाबारीको माटोमा मिसाएर प्रयोग गर्नुहोस्।' },
    ],
  },
];
