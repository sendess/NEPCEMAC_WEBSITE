import type { L } from '~/i18n/utils';

/** green = waste that rots, red = waste that does not rot, special = hazardous, keep out of both buckets. */
export type Bin = 'green' | 'red' | 'special';

export type SortItem = {
  id: string;
  bin: Bin;
  name: L;
  /** Extra words people might type: romanised Nepali, brand names, synonyms. */
  terms?: string;
  tip?: L;
  /** Shown on the printable kitchen poster. */
  poster?: boolean;
};

export const bins: Record<Bin, { title: L; short: L; rule: L }> = {
  green: {
    title: { en: 'Green bucket', ne: 'हरियो बाल्टिन' },
    short: { en: 'Waste that rots', ne: 'कुहिने फोहोर' },
    rule: {
      en: 'Food and anything from plants or animals that rots. It becomes compost.',
      ne: 'खाना र बोटबिरुवा वा जनावरबाट आएका कुहिने सबै फोहोर। यसबाट कम्पोस्ट मल बन्छ।',
    },
  },
  red: {
    title: { en: 'Red bucket', ne: 'रातो बाल्टिन' },
    short: { en: 'Waste that does not rot', ne: 'नकुहिने फोहोर' },
    rule: {
      en: 'Plastic, paper, glass, metal, cloth and rubber. Keep it clean and dry — much of it can be recycled.',
      ne: 'प्लास्टिक, कागज, सिसा, धातु, कपडा र रबर। सफा र सुक्खा राख्नुहोस् — धेरैजसो पुनःप्रशोधन गर्न सकिन्छ।',
    },
  },
  special: {
    title: { en: 'Keep separate', ne: 'छुट्टै राख्नुहोस्' },
    short: { en: 'Hazardous waste', ne: 'हानिकारक फोहोर' },
    rule: {
      en: 'Not in either bucket. Store it safely in its own box or bag, hand it over separately, and never burn it.',
      ne: 'कुनै पनि बाल्टिनमा होइन। छुट्टै बाकस वा झोलामा सुरक्षित राखी अलग्गै हस्तान्तरण गर्नुहोस्, कहिल्यै नजलाउनुहोस्।',
    },
  },
};

export const sortItems: SortItem[] = [
  // ---- Green: waste that rots ----
  { id: 'veg', bin: 'green', poster: true, name: { en: 'Vegetable peels and scraps', ne: 'तरकारीका बोक्रा र टुक्रा' }, terms: 'vegetable tarkari sabji sag peel potato aalu alu cauliflower cabbage साग आलु' },
  { id: 'fruit', bin: 'green', poster: true, name: { en: 'Fruit peels and cores', ne: 'फलफूलका बोक्रा' }, terms: 'fruit phal banana kera orange suntala apple syau mango aanp केरा सुन्तला स्याउ आँप' },
  { id: 'food', bin: 'green', poster: true, name: { en: 'Leftover food — rice, dal, curry, roti', ne: 'बाँकी खाना — भात, दाल, तरकारी, रोटी' }, terms: 'bhat rice dal daal curry roti bread biscuit jutho leftover meal जुठो भात दाल रोटी' },
  { id: 'tea', bin: 'green', poster: true, name: { en: 'Used tea leaves and tea bags', ne: 'प्रयोग भएको चियापत्ती र टी-ब्याग' }, terms: 'tea chiya chiyapatti teabag चिया', tip: { en: 'Pull the staple out of tea bags first.', ne: 'टी-ब्यागको स्टेपल पहिले झिक्नुहोस्।' } },
  { id: 'coffee', bin: 'green', name: { en: 'Used coffee grounds', ne: 'प्रयोग भएको कफीको धुलो' }, terms: 'coffee kafi' },
  { id: 'eggshell', bin: 'green', poster: true, name: { en: 'Egg shells', ne: 'अन्डाका बोक्रा' }, terms: 'egg anda phul फुल अण्डा', tip: { en: 'Crush them so they compost faster.', ne: 'छिटो कुहिन टुक्र्याएर हाल्नुहोस्।' } },
  { id: 'flowers', bin: 'green', poster: true, name: { en: 'Flowers, garlands and puja offerings', ne: 'फूल, माला र पूजाका सामग्री' }, terms: 'phool ful flower mala garland puja prasad फूल माला पूजा', tip: { en: 'Take off plastic, foil and threads first.', ne: 'प्लास्टिक, पन्नी र धागो पहिले झिक्नुहोस्।' } },
  { id: 'garden', bin: 'green', poster: true, name: { en: 'Leaves, grass and garden trimmings', ne: 'पात, घाँस र बगैँचाको झारपात' }, terms: 'leaf leaves pat ghas grass garden plant weed jharpat पात घाँस' },
  { id: 'onion', bin: 'green', name: { en: 'Onion and garlic skins', ne: 'प्याज र लसुनका बोक्रा' }, terms: 'onion pyaj garlic lasun प्याज लसुन' },
  { id: 'corn', bin: 'green', name: { en: 'Corn cobs and husks', ne: 'मकैको खोया र बोक्रा' }, terms: 'corn makai maize bhutta मकै' },
  { id: 'nutshell', bin: 'green', name: { en: 'Peanut and nut shells', ne: 'बदाम र ओखरका बोक्रा' }, terms: 'peanut badam nut okhar walnut बदाम ओखर' },
  { id: 'tissue', bin: 'green', name: { en: 'Used tissues and paper napkins', ne: 'प्रयोग भएको टिस्यु र पेपर न्याप्किन' }, terms: 'tissue napkin kitchen paper टिस्यु' },
  { id: 'bones', bin: 'green', name: { en: 'Bones, meat and fish scraps', ne: 'हड्डी, मासु र माछाका टुक्रा' }, terms: 'bone haddi meat masu chicken kukhura fish machha mutton हड्डी मासु माछा', tip: { en: 'Fine in the green bucket; in a home compost bin use only small amounts, as they attract animals.', ne: 'हरियो बाल्टिनमा ठीक छ; घरको कम्पोस्ट बिनमा भने जनावर आकर्षित हुने भएकाले थोरै मात्र हाल्नुहोस्।' } },
  { id: 'spoiled', bin: 'green', name: { en: 'Spoiled or mouldy food (out of its packet)', ne: 'कुहिएको वा ढुसी परेको खाना (प्याकेटबाट निकालेर)' }, terms: 'spoiled rotten mould mold expired food kuhiyeko कुहिएको' },
  { id: 'dung', bin: 'green', name: { en: 'Cow dung', ne: 'गोबर' }, terms: 'gobar dung manure गोबर' },
  { id: 'ash', bin: 'green', name: { en: 'Sawdust and cold wood ash', ne: 'काठको धुलो र सेलाएको खरानी' }, terms: 'sawdust ash kharani खरानी', tip: { en: 'Only cold ash, a little at a time.', ne: 'सेलाएको खरानी मात्र, थोरै–थोरै।' } },

  // ---- Red: waste that does not rot ----
  { id: 'plastic-bag', bin: 'red', poster: true, name: { en: 'Plastic bags', ne: 'प्लास्टिकका झोला' }, terms: 'plastic bag jhola polythene poly thaili झोला पोलिथिन थैली', tip: { en: 'Shake them clean and keep them dry.', ne: 'झट्कारेर सफा र सुक्खा राख्नुहोस्।' } },
  { id: 'plastic-bottle', bin: 'red', poster: true, name: { en: 'Plastic bottles and containers', ne: 'प्लास्टिकका बोतल र भाँडा' }, terms: 'bottle botal water coke pepsi pet jar container dabba बोतल डब्बा', tip: { en: 'Empty, rinse and squash them.', ne: 'खाली गरी पखालेर थिच्नुहोस्।' } },
  { id: 'wrappers', bin: 'red', poster: true, name: { en: 'Noodle, chips and biscuit wrappers', ne: 'चाउचाउ, चिप्स र बिस्कुटका खोल' }, terms: 'wrapper packet noodles chauchau wai wai rara chips kurkure biscuit candy chocolate चाउचाउ खोल' },
  { id: 'milk-pouch', bin: 'red', poster: true, name: { en: 'Milk and curd pouches', ne: 'दूध र दहीका प्याकेट' }, terms: 'milk dudh curd dahi pouch packet दूध दही', tip: { en: 'Rinse them first so they do not smell.', ne: 'गन्हाउन नदिन पहिले पखाल्नुहोस्।' } },
  { id: 'paper', bin: 'red', poster: true, name: { en: 'Newspaper, notebooks and office paper', ne: 'पत्रिका, कापी र कागज' }, terms: 'paper kagaj newspaper patrika copy kapi book notebook magazine कागज पत्रिका कापी', tip: { en: 'Keep it dry — clean paper can be recycled.', ne: 'सुक्खा राख्नुहोस् — सफा कागज पुनःप्रशोधन हुन्छ।' } },
  { id: 'cardboard', bin: 'red', name: { en: 'Cardboard boxes', ne: 'कार्टुन र बाकस' }, terms: 'cardboard carton kartun box baksa कार्टुन', tip: { en: 'Flatten them.', ne: 'थिचेर चेप्टो बनाउनुहोस्।' } },
  { id: 'tetra', bin: 'red', name: { en: 'Juice and milk cartons (Tetra Pak)', ne: 'जुस र दूधका कार्टुन (टेट्रा प्याक)' }, terms: 'juice frooti real tetra carton' },
  { id: 'glass', bin: 'red', poster: true, name: { en: 'Glass bottles and jars', ne: 'सिसाका बोतल र बट्टा' }, terms: 'glass sisa bottle jar beer achar सिसा बोतल' },
  { id: 'broken-glass', bin: 'red', name: { en: 'Broken glass and mirrors', ne: 'फुटेको सिसा र ऐना' }, terms: 'broken glass mirror aina ऐना', tip: { en: 'Wrap it in thick paper and mark it, so collectors do not get cut.', ne: 'सङ्कलन गर्नेको हात नकाटियोस् भनी बाक्लो कागजमा बेरेर चिनो लगाउनुहोस्।' } },
  { id: 'metal', bin: 'red', poster: true, name: { en: 'Tins, cans, foil and metal', ne: 'टिनका बट्टा, पन्नी र धातु' }, terms: 'tin can metal dhatu foil aluminium steel iron falam फलाम पन्नी' },
  { id: 'clothes', bin: 'red', name: { en: 'Old clothes, bags and shoes', ne: 'पुराना कपडा, झोला र जुत्ता' }, terms: 'clothes kapada kapda shoes juta bag cloth कपडा जुत्ता', tip: { en: 'Give away anything that can still be worn.', ne: 'लगाउन मिल्ने कपडा अरूलाई दिनुहोस्।' } },
  { id: 'rubber', bin: 'red', name: { en: 'Rubber and slippers', ne: 'रबर र चप्पल' }, terms: 'rubber chappal slipper tyre चप्पल' },
  { id: 'thermocol', bin: 'red', name: { en: 'Thermocol (styrofoam) and packing foam', ne: 'थर्मोकोल र प्याकिङ फोम' }, terms: 'thermocol styrofoam foam packing' },
  { id: 'disposables', bin: 'red', name: { en: 'Plastic cups, plates and straws', ne: 'प्लास्टिकका कप, प्लेट र स्ट्र' }, terms: 'disposable cup plate straw spoon party' },
  { id: 'sanitary', bin: 'red', name: { en: 'Sanitary pads and diapers', ne: 'स्यानिटरी प्याड र डाइपर' }, terms: 'pad sanitary diaper daipar nappy प्याड डाइपर', tip: { en: 'Wrap them in paper or a bag first.', ne: 'पहिले कागज वा झोलामा बेर्नुहोस्।' } },
  { id: 'ceramics', bin: 'red', name: { en: 'Broken cups, plates and clay pots', ne: 'फुटेका कप, प्लेट र माटाका भाँडा' }, terms: 'ceramic cup plate pot clay mato bhanda भाँडा', tip: { en: 'Wrap sharp pieces.', ne: 'धारिला टुक्रा बेरेर राख्नुहोस्।' } },
  { id: 'small-plastic', bin: 'red', name: { en: 'Toothbrushes, pens and small plastic items', ne: 'टुथब्रस, कलम र साना प्लास्टिक सामान' }, terms: 'toothbrush pen toy khelauna plastic कलम खेलौना' },
  { id: 'cigarette', bin: 'red', name: { en: 'Cigarette butts', ne: 'चुरोटका ठुटा' }, terms: 'cigarette churot butt चुरोट' },

  // ---- Keep separate: hazardous ----
  { id: 'batteries', bin: 'special', poster: true, name: { en: 'Batteries and cells', ne: 'ब्याट्री र सेल' }, terms: 'battery betri cell button watch remote torch ब्याट्री', tip: { en: 'Keep them in a closed box; never burn or bury them.', ne: 'बन्द बाकसमा राख्नुहोस्; कहिल्यै नजलाउनुहोस् वा नगाड्नुहोस्।' } },
  { id: 'e-waste', bin: 'special', poster: true, name: { en: 'Mobile phones, chargers and electronics', ne: 'मोबाइल, चार्जर र इलेक्ट्रोनिक सामान' }, terms: 'mobile phone charger laptop computer tv wire cable electronic e-waste मोबाइल चार्जर', tip: { en: 'Give them to e-waste recyclers or repair shops.', ne: 'ई-वेस्ट पुनःप्रशोधक वा मर्मत पसललाई दिनुहोस्।' } },
  { id: 'bulbs', bin: 'special', poster: true, name: { en: 'CFL bulbs and tube lights', ne: 'सीएफएल बल्ब र ट्युबलाइट' }, terms: 'bulb light tube cfl lamp बल्ब', tip: { en: 'They contain mercury — do not break them.', ne: 'यसमा पारो हुन्छ — नफुटाउनुहोस्।' } },
  { id: 'medicines', bin: 'special', poster: true, name: { en: 'Expired medicines', ne: 'म्याद नाघेका औषधि' }, terms: 'medicine ausadhi aushadhi tablet goli syrup capsule औषधि चक्की', tip: { en: 'Keep them in their packets; never pour them into drains.', ne: 'प्याकेटमै राख्नुहोस्; ढलमा नफाल्नुहोस्।' } },
  { id: 'sharps', bin: 'special', name: { en: 'Needles, syringes and blades', ne: 'सुई, सिरिन्ज र ब्लेड' }, terms: 'needle sui syringe injection blade razor insulin सुई', tip: { en: 'Put them in a hard bottle with a lid and label it.', ne: 'बिर्कोसहितको कडा बोतलमा राखी लेबल लगाउनुहोस्।' } },
  { id: 'chemicals', bin: 'special', name: { en: 'Paint, pesticide and chemical containers', ne: 'रङ, कीटनाशक र रसायनका भाँडा' }, terms: 'paint rang pesticide insecticide chemical acid phenyl cleaner रङ विषादी', tip: { en: 'Close them tightly; never pour leftovers into drains.', ne: 'राम्ररी बन्द गर्नुहोस्; बाँकी रसायन ढलमा नखन्याउनुहोस्।' } },
  { id: 'spray', bin: 'special', name: { en: 'Spray cans', ne: 'स्प्रे क्यान' }, terms: 'spray aerosol deodorant can', tip: { en: 'Do not puncture or burn them.', ne: 'प्वाल नपार्नुहोस्, नजलाउनुहोस्।' } },
  { id: 'thermometer', bin: 'special', name: { en: 'Mercury thermometers', ne: 'पारो भएको थर्मोमिटर' }, terms: 'thermometer mercury paro' },
];

/** Quick suggestions shown before anyone types. */
export const popularItems = ['plastic-bag', 'tea', 'milk-pouch', 'sanitary', 'batteries', 'eggshell', 'wrappers', 'medicines'];
