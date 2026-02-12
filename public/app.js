(() => {
  /** @typedef {'in' | 'out'} Direction */
  /** @typedef {'sending' | 'sent' | 'delivered' | 'seen'} Status */

  const appEl = document.getElementById('app');
  const chatListEl = document.getElementById('chatList');
  const searchInputEl = document.getElementById('searchInput');

  const emptyStateEl = document.getElementById('emptyState');
  const chatHeaderEl = document.getElementById('chatHeader');
  const chatTitleEl = document.getElementById('chatTitle');
  const chatSubtitleEl = document.getElementById('chatSubtitle');
  const messagesEl = document.getElementById('messages');
  const composerEl = document.getElementById('composer');
  const messageInputEl = document.getElementById('messageInput');
  const sendBtnEl = document.getElementById('sendBtn');
  const backBtnEl = document.getElementById('backBtn');


  // Each user has a list of replies
  const userReplies = {

    u2: ['لو محتاج فلوس فالرقم مشغول'],
    u3: ['ماشي يا سكر!', 'تمام يا جميل!'],
    u4: ['😒😒😒😒😒😒😒', 'امشي يا مهزئ!'],
    u5: ['يااااااهههه'],
    u6: ['الأكل في الفرن!', 'لسه شوية و يكون جاهز!'],
    u7: ['ظبط و قولي'],
    u8: ['صباح الفل عليك !', 'يومك جميل!'],
    u9:[
  "مين على القهوة ؟",
  "أنا واصل في سكة، حد عايز أجيب له حاجة معايا؟",
  "حد معاه شاحن طيب؟ الموبايل بيفصل شحن.",
  "الماتش هيبدأ امتى؟ أنا لسه لابس ونازل.",
  "القهوة زحمة ولا في مكان نقعد فيه؟",
  "يا جماعة حد شاف وليد؟ بقاله ساعة مش بيرد.",
  "أنا قاعد على الترابيزة اللي في الركن، تعالوا.",
  "مين هيلعب طاولة؟ أنا جاي وعايز أغلب حد.",
  "إحنا متجمعين فين؟ قهوة السنترال ولا اللي ورا؟",
  "أنا سهران للصبح، مين مكمل معايا؟",
  "المكان هنا بقا دوشة قوي، تعالوا ننقل على قهوة تانية.",
  "أنا وصلت، أنتم فين بالظبط؟ مش شايف حد."
],
    u10: ['انا مسامحك يا صاحبي',  'تعالي ننزل مع صاحبك الاهلاوي', 'ولا يهمك!'],
    u11: [
  "كبير وعايزه الأسبوع الجاي assignment دكتور أحمد ادانا",
  "في جروب بروجكت 4 اشخاص، لازم نلحق نكون مع بعض يا بطل.",
  "سمعت آخر خبر؟ أحمد فركش مع سارة والكلية كلها بتتكلم!",
  "في رحلة دهب من اتحاد الطلبة ليلة الميدترم، حد بيعمل كدة؟",
  "المحاضرة اتلغت يا بنى، متجيش وتتعب نفسك وتصحى بدري.",
  "الجدول نزل وفيه يومين ورا بعض من 8 الصبح، تعب بجد!",
  "وسهل، يا رب الكلام يطلع صح MCQ بيقولوا الميدترم هيجي",
  "شوفت عمر كان لابس إيه النهارده؟ بجد مش قادر أصدق ذوقه!",
  "في ملخص نزل للمادة عند المكتبة اللي ورا الكلية، روح هاته.",
  "يا جماعة اتحاد الطلبة عامل حفلة بكره وفيها مفاجأة جامدة.",
  "بتاعة المنهج كله على الجروب slides الدكتور نزل الـ",
  "بيقولوا في درجات رأفة نزلت للناس اللي شالت المادة الترم اللي فات.",
  "الحق، ده المعيد بتاعنا خطب ندى اللي كانت في تانية!",
  "أنا بدأت أذاكر وخايفة قوي، المنهج طلع طويل جداً يا صاحبي.",
  "تعالى بدري بكره عشان نحجز مكان قدام قبل ما المدرج يتملي.",
  "مش عارفة ألم المنهج خالص، الدكاترة نازلين Assignments فينا.",
  "المعيد قال إن الحضور عليه بونص، لازم نكلم نور يحضرلنا.",
  "أنت شوفت جروب الدفعة؟ خناقة مروان والدكتور بقت تريند.",
  "الامتحان اتأجل أسبوع يا جماعة، أحلى خبر سمعته النهارده!",
  "حد معاه شيت المادة؟ المكتبة قفلت ومش عارفة أصوره."
],
    u12: [
      '🔴عرض كليوباترا\nنص فرخة مشوية بالرز + بطاطس شيبسي + وجبة كرسبي 3 قطع بالرز + وجبة شاورما عربي فراخ 6 قطع + محمرة + عيش + تومية + تومية سبايسي + مخلل (285ج)',
      '🔴عرض ميامي\n3 قطع شاورما عربي فراخ + 3 قطع شاورما عربي لحمة + 3 قطع عربي كرسبي + بطاطس شيبسي + تومية + تومية سبايسي + مشروب(125ج)',
      '🔴عرض محرم بك\nماريا شاورما فراخ + ماريا كرسبي(185ج)',
      '🔴عرض الموسم\n6 قطع شاورما فراخ + 6 قطع شاورما لحمة + 2 قطعة كرسبي + عيش محمص + محمرة + بطاطس + تومية + تومية سبايسي + مخلل (٢١٠ج)',
      '🔴عرض بحري\nربع فرخة مشوية بالرز + بطاطس شيبسي + وجبة كرسبي 3 قطع بالرز + وجبة شاورما عربي فراخ 6 قطع + محمرة + عيش(235ج)',
      '🔴عرض الصيف\n3 قطع شاورما فراخ + 2 قطعة كرسبي + رز + بطاطس + تومية + تومية سبايسي (١١٠ج)',
      '🔴 عرض الشتاء\nنص فرخة مشوية + رز + بطاطس + عيش + فتة شاورما فراخ لارج + فتة كرسبي بالباربيكيو لارج + تومية + تومية سبايسي + مخلل (٢٦٠ج)',
      '🔴عرض الخريف\n2 كايزر شاورما فراخ + 2 كايزر كرسبي + بطاطس + عيش محمص (١٢٥ج)',
      '🔴عرض صيدله\n٢ فتة شاورما فراخ لارج +ربع فرخه ورك +بطاطس +تومية +رز+مخلل+عيش) ١٨٥ج',
      '🔴 عرض فنون جميله\n٢ قطعة كرسبي +رز +بطاطس +محمرة +تومية اسبايسي +تومية عادي+ مخلل( ٩٠ ج)',
      '🔴 عرض مكتبه اسكندريه\nنص فرخه +٢قطعه كرسبي +٢قطعه ماريا +٦ قطع شاورما فراخ +محمرة +توميه عادي +توميه اسبايسي +مخلل (٣١٠ج',
      '🔴 عرض السن \n٢فتة شاورما فراخ لارج +٢ ساندوتش شاورما فراخ بالبطاطس (٢١٠ ج)',
      '🔴عرض هندسة\n(نص فرخة مشوية + رز + بطاطس + عيش + بيتزا مارجريتا + تومية + تومية سبايسي + مخلل) ب٢١٠ج',
      '🔴عرض طب\n(وجبة شاورما عربي فراخ + فتة شاورما فراخ لارج + فتة كرسبي بصوص الباربكيو لارج + علبة تومية) 185ج',
      '🔴عرض اداب \n(نص فرخة مشوية + رز + بطاطس + عيش + ماريا شاورما فراخ + تومية + تومية سبايسي + مخلل) 225ج',
      '🔴عرض تجارة \n(فتة ميكس ( شاورما فراخ + فاهيتا + كرسبي بصوص الشيدر + كرسبي بصوص الباربيكو )) ١١٠ج',
      '🔴 عرض المتدلعه  \n(ربع فرخة ورك + قطعة كرسبي + رز + بطاطس + تومية + تومية سبايسي + مخلل )ب ١١٠ج',
      '🔴عرض الثلاثي الخطير \n(3 ساندوتش شاورما فراخ بالبطاطس اكس  لارج )ب ١٤٠ج',
      '🔴عرض الفخامة (نص كيلو شاورما فراخ + بطاطس + عيش + تومية + تومية سبايسي)ب ٢٢٥ج',
      '🔴عرض الدبل \n(ربع فرخة ورك + رز + بطاطس + عيش + وجبة كرسبي 3 قطع + رز + بطاطس + تومية + تومية سبايسي + مخلل)ب ١٨٥ج',
      '🔴عرض السلطنة\n(نص فرخة مشوية + رز + بطاطس + عيش + تومية + تومية سبايسي + مخلل + فتة ميكس ( نص شاورما فراخ - نص كرسبي ) + بيتزا خضار )\nب ٢٦٠ج',
      '🔴 عرض العظمه (بيتزا مارجريتا +وجبه عربي شورما فراخ )140ج بدل من 160ج',
      '🔴عرض البرنس  (سيخ شيش+ قطعه كريسبي+٣ قطع شاورما+ رز بسمتي+ بطاطس محمره+ توميه) 110ج بدل من 150ج',
      '🔴عرض التوينز :  ( 2 وجبة عربي شاورما فراخ + بطاطس + تومية + تومية سبايسي + مخلل )140 بدل 190',
      '🔴عرض الجامد 3 (2فتة شورما لارج )ب 125ج بدل 170 ج',
      '🔴صينية اصل الشام ١\n٤ قطع ماريا شاورما فراخ + ٦ قطع شاورما فراخ + ٢ قطعة كرسبي + بطاطس + عيش + عيش محمص + تومية + تومية سبايسي + مخلل\n200ج',
      '🔴 صينية اصل الشام ٢\nربع فرخة مشوية + ٤ قطع شاورما فراخ + ٢ قطع كرسبي + رز + عيش محمص + بطاطس + تومية + تومية سبايسي\n200ج',
      '🔴عرض اللمة : (نص فرخة مع  رز مع بطاطس و عيش و تومية و تومية سبايسي و مخلل + وجبة شاورما عربي فراخ + فتة شاورما فراخ لارج)260 بدل ب 350ج',
      '🔴صينية اصل الشام ٣\nنص فرخة مشوية + رز + عيش + ٢ قطع كرسبي + ٢ سيخ شيش طاووق + بطاطس + عيش محمص + مخلل + تومية + تومية سبايسي\n250ج',
      '🔴صينية اصل الشام ٤\n٦ مناقيش ( زعتر سادة + محمرة سادة + شيكولاتة + بسطرمة موتزريلا + جبنة شامية + بيتزا كيدز )\n150ج',
      '🔴عرض الكومبو :  ( ساندوتش شاورما فراخ بطاطس  اكس لارج + سبيروسباتس أو كراش   + تومية + مخلل+طبق بطاطس  )  ب 70ج بدل من 80ج',
      '🔴عرض سطلانه (وجبة شورما عربي 6قطع +وجبة كرسبي(3قطع كرسبي +رز +بطاطس +تومية +مخلل+كلوسلو )ب185ج\nبدل210ج',
      '🔴عرض الكرم ( 3 سندوتش شورما فراخ اكس لارج  بطاطس) ب  130ج بدل من 140ج',
      '🔴عرض القنبلة ( ٣ فتة شورما لارج  )١٨٥ج بدل 255ج',
      '🔴عرض الجامد 2 (2كرسبي +2قطعه ماريا +رز +بطاطس +تومية +مخلل) 110 بدل 150ج',
      '🔴عرض السيطرة (4سندوتشات شورما بطاطس اكس لارج+2كراش) 200ج بدل من 225 ج',
      '🔴عرض ميني قنبلة ( 3 فتة شورما ميديام )ب 125ج ',
      '🔴عرض الروقان ( رز + شورما فراخ +3قطع شورما عربي +تومية +بطاطس )١١٠ج'
    ],
    u13:['يلا بينا انا مع الدوك بظبط سناني, تعالوا عند العيادة و نتحرك سوا'],
    u14: [
  "أنا أخدتلك الغياب خلاص، متقلقش.",
  "الدكتور سأل عليك بالاسم النهارده، كنت فين؟",
  "الغياب النهارده كان بالورقة، بس كتبتك معايا.",
  "يا ابني الدكتور رخم، عمال يبص في الوشوش وأنا بكتب اسمك.",
  "الحق انزل، لسه بياخدوا الغياب حالا!",
  "أنا كتبت اسمك في السكشن، بس الدكتور قال هيعمل كويز فجأة.",
  "المعيد رخم ورفض يخليني أمضي لحد غير نفسي.",
  "أنت كدة عديت نسبة الغياب، لازم تحضر المحاضرة الجاية ضروري.",
  "بص أنا خليت حد يوقعلك مكانه عشان المعيد عارفني.",
  "الغياب النهارده كان عليه بونص، ضاع عليك يا بطل."
],
    u15: [
  "يا جماعة حد نسي مفتاحه في باب الأسانسير؟",
  "لو سمحت يا كابتن بلاش ركنة صف تاني عشان الناس تخرج.",
  "يا سكان العمارة، حد يعرف بتاع السباكة رقم تليفونه كام؟",
  "يا ريت اللي عنده تصليح في الشقة يبطل تكسير بعد الساعة 10.",
  "الأسانسير عطلان تاني يا جماعة، حد يكلم الشركة.",
  "لو سمحتوا بلاش حد يرمي زبالة في المنور، المنظر بقى وحش.",
  "يا جيران الخير، حد عنده شاحن آيفون سلف لثواني؟",
  "صوت المزيكا عالي جداً يا فندم، مش عارفين ننام.",
  "يا جماعة في حد ركن قدام الجراج بتاعي، يا ريت يحرك العربية.",
  "بواب العمارة فين؟ بقالي ساعة بنده عليه.",
  "يا ريت نلتزم بمواعيد دفع فلوس الأمن والنظافة.",
  "حد يعرف السوبر ماركت اللي بيوصل بسرعة هنا؟",
  "الكهرباء قطعت عندي بس ولا عند العمارة كلها؟",
  "يا ريت يا جماعة اللي عنده كلب يمسكه وهو طالع في الأسانسير.",
  "ممكن نوطي الصوت شوية عشان في ناس عندها امتحانات؟",
  "يا جيران، حد جرب بتاع المكوجي اللي في أول الشارع؟",
  "الأستاذ اللي ساكن في الخامس، المية بتنقط من عندك علينا.",
  "يا ريت محدش يقفل الأسانسير ويسيبه مفتوح في الدور بتاعه.",
  "في طرد وصل للعمارة باسم 'أستاذ محمد'، هو موجود في المدخل.",
  "جمعة مباركة يا جيران، يا ريت ندعي لعم فلان مريض جداً."
],
    u16: [
  "جيبلي البيكرولز الاخضر اللي بالبيتزا لو سمحت",
  "ماما بتقول لك جيب معاك عيش وأنت جاي",
  "في كيكة اسمها تورتة لو لقيتها في السوبر ماركت حاتها",
  "هات 2 اندومي خضار الحراقة",
  "هات معاك كيس شيبسي عائلي بالخل والملح",
  "م تنساش تجيب زبادي عشان العشا بتاع ماما",
  "لو لقيت  XL  جيبلي اتنين معاك مولتو",
  "هات إزازة حاجة ساقعة كبيرة مشبرة",
  "جيب لب وسوداني وأنت معدي من المقلى",
  "ماما بتسأل أنت فين؟ وهات معاك كيس سكر",
  "هات لي كاندي اللي هي على شكل تماسيح دي",
  "لو ملقيتش البيكرولز جيب صن بايتس بالجبنة المتبلة",
  "جيب مناديل عشان اللي عندنا خلصت",
  "هات معاك واحد ميكس شوكولاتة",
  "ماما بتقول لك هات ربع جبنة تركي قديمة",
  "هات إزازة مياه معدنية كبيرة وأنت طالع",
  "جيبلي شوكولاتة كورونا بالبندق ضروري",
  "لو لقيت عروض على المسحوق جيب واحد",
  "هات كيس مكرونة قلم عشان ماما هتعمل بشاميل"
],
    u17: [
  "عاش يا وحش! كمل متبطلش!",
  "فين العزيمة؟ لسه فاضل عدتين، متريحش دلوقتي!",
  "عاش يا كابتن، الفورمة بدأت تظهر أهي.",
  "Muscle ups شد حيلك في الـ، مش عايز مرجحة، اطلع بالباور كله!",
  "رزق، ركز وجيب آخرك Pull-ups الـ",
  "وسعت منك ليه؟ انزل للأخر واطلع افرد كوعك Dips الـ",
  "بتركيز، مش بنلعب في المراجيح إحنا SBD عايز الـ",
  "دي بتعمل عضلات من حديد Push-ups clap عاش يا فورمة الـ",
  "دي اللي بتطلع السكس باك Crunches البطن أهم حاجة، الـ",
  "اثبت! الدقيقة دي هي اللي بتعمل الرجال Plank في الـ",
  "ومسمعش صوتك V-ups ارمي الحمل على الله وخلص الـ",
  "أيوة كدة، هو ده الشغل الصح، الله ينور يا وحش الكون.",
  "لسه 3 أدوار؟ ولا يهمك، إنت قدها وقدود!",
  "متدلعش! مفيش راحة غير لما نخلص المجموعة دي.",
  "عاش يا بطل، بكرة هتدعيلي لما تشوف العضلات في المراية.",
  "محتاجة قلب ميت High pull-ups الـ",
  "دي صعبة بس هي اللي هتعملك عصب Hollow body الـ",
  "متشغلش بالك بالعدد، ركز في الأداء، الجودة أهم من الكمية.",
  "عاش يا كابتن، اضرب عصير وقوم كمل، لسه قدامنا شغل كتير.", 
  "وعايز الدقن تعدي العقلة Chin-ups كمل الـ"
],
    u18:['Busy, at work right now !!'],
    u19:[
  "أحسنت! بارك الله فيك يا بطل.",
  "أين الواجب؟ هل نسيته مرة أخرى؟",
  "ركز معي قليلاً، هذا الدرس مهم جداً.",
  "التكرار يعلّم الشطار، أعد القراءة مرة ثانية.",
  "ممتاز، نطقك للغة العربية يتحسن كثيراً.",
  "لا تقلق من الخطأ، المهم أن تستمر في المحاولة.",
  "انتبه إلى الحركات، الفتحة والضمة تغير المعنى!",
  "أعد كتابة هذه الجملة بخط جميل.",
  "ما شاء الله، إجابة نموذجية.",
  "هل راجعت كلمات الدرس الماضي؟",
  "اسمع جيداً ثم ردد ورائي.",
  "لماذا لم تحضر الدرس في موعده اليوم؟",
  "هذا مجهود رائع، استمر على هذا المستوى.",
  "نكتفي بهذا القدر اليوم، نلتقي غداً إن شاء الله.",
  "اقرأ بصوت عالٍ وبكل ثقة.",
  "يا بني، اللغة العربية تحتاج إلى صبر وممارسة.",
  "هل لديك أي سؤال قبل أن ننهي الحصة؟",
  "افتح الكتاب صفحة عشرة وابدأ بالقراءة.",
  "حاول أن تستخدم هذه الكلمة في جملة من عندك.",
  "أحسنت صنعاً، أنت تتقدم بسرعة!"
],
    u20:['عميلنا العزيز\n في انتظارك عند ال متحف Greco Roman']
    // ...add more for each user as needed
  };

  // Egyptian names for contacts
  const egyptianNames = [
    '+201001234567', 'elHag', 'My Love', 'Mariam elex', 'Hassan', 'Mama', 'Bichoo', '5alto 2', 'Ahwa',
    'Mostafa elTe5in', 'Fatma koleya', 'مطعم دلع كرشك', 'Ahmed', 'Nour attendance', 'جروب سكان برج المدينة المنورة', 'O5ty', 'كابتن الجيم', 'doctor Samir',
    'Mr reda Arabie', 'Samir 3eyada'
  ];

  /** @type {{id: string, name: string, subtitle: string, avatarSeed: number}[]} */
  const contacts = egyptianNames.map((name, i) => {
    return {
      id: `u${i+1}`,
      name,
      subtitle: i % 2 === 0 ? 'online' : 'last seen recently',
      avatarSeed: 1000 + i,
    };
  });

  // Each user has a list of trigger keywords (case-insensitive, match anywhere in message)
  const userTriggers = {
    u1: [],
    u2: [''],
    u3: [''],
    u4: [''],
    u5: [''],
    u6: [''],
    u7: [''],
    u8: [''],
    u9: [''],
    u10:['assef', 'sorry', 'اسف', ' آسف', 'أسف','asef', 'samehni','samehny', 'same7ni', 'same7ny', 'سامحني'],
    u11: [''],
    u12: [''],
    u13:['nenzel','mostafa','ne5rog','net2abel','n5rog','nt2abel','nt2abl','nnzel','نزل','نخرج','نتقابل','نروح','مصطفى', 'tenzel', 'تنزل','tenzl','nnzl'],
    u14: [''],
    u15: [''],
    u16: [''],
    u17: [''],
    u18: [''],
    u20: ['عنوان','location','مكان','3enwan','3nwan','makan','mkan','لوكيشن','لوكشن','feen','fin','fen','فين']
    // ...add more for each user as needed
  };

  /** @type {Record<string, {id: string, dir: Direction, text: string, time: number, status?: Status}[]>} */
  const conversations = {};
  const now = Date.now();
  // Assign profile pictures for some users (add your own images in /profiles)
  const profilePics = {
    u1: 'profiles/blank.png',
    u2: 'profiles/dad.webp',
    u3: 'profiles/girl.jpeg',
    u4: 'profiles/Angry.jpeg',
    u5: 'profiles/blank.png',
    u6: 'profiles/flower.jpeg',
    u7: 'profiles/bicho.jpg',
    u8: 'profiles/cat.jpeg',
    u9: 'profiles/group.webp',
    u10: 'profiles/burger.webp',
    u11:'profiles/blank.png',
    u12:'profiles/mat3am.jpeg',
    u13:'profiles/images.jpeg',
    u14:'profiles/Nerd.jpeg',
    u15:'profiles/3omara.jpg',
    u16:'profiles/blank.png',
    u17:'profiles/BigRamy.jpeg',
    u18:'profiles/dentist.jpeg',
    u19:'profiles/Arabic.jpeg',
    u20:'profiles/Dental.jpg',

  };

  contacts.forEach((c, i) => {
    if (i === 0) {
      // Only first user has a starter message
      conversations[c.id] = [
        {
          id: cryptoRandomId(),
          dir: 'in',
          text: 'مكنش ينفغ تعمل كدا مع مصطفى, اعتذر له ',
          time: now - 1000 * 60 * 2,
        },
        {
          id: cryptoRandomId(),
          dir: 'in',
          text: 'ما يفسده الهزار, يصلحه الاعتزار',
          time: now - 1000 * 60 * 2,
        },
      ];
    } else {
      conversations[c.id] = [];
    }
  });

  /** @type {string | null} */
  let activeContactId = null;

  function cryptoRandomId() {
    if (window.crypto?.randomUUID) return crypto.randomUUID();
    return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  }

  function formatTime(ts) {
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  function lastMessagePreview(contactId) {
    const msgs = conversations[contactId] ?? [];
    const last = msgs[msgs.length - 1];
    if (!last) return { text: 'Tap to start chatting', time: '' };
    return {
      text: last.dir === 'out' ? `You: ${last.text}` : last.text,
      time: formatTime(last.time),
    };
  }

  // function avatarGradient(seed) {
  //   // Stable color-ish gradients.
  //   const a = (seed * 37) % 360;
  //   const b = (a + 45) % 360;
  //   return `linear-gradient(135deg, hsla(${a}, 70%, 55%, 0.35), hsla(${b}, 70%, 55%, 0.14))`;
  // }

  function renderChatList(filterText = '') {
    const q = filterText.trim().toLowerCase();
    const filtered = q
      ? contacts.filter((c) => c.name.toLowerCase().includes(q))
      : contacts;

    chatListEl.innerHTML = '';
    for (const contact of filtered) {
      const { text, time } = lastMessagePreview(contact.id);
      const li = document.createElement('li');
      li.className = 'chatListItem';

      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      // Use profilePics directly
      const profilePic = (typeof profilePics !== 'undefined' ? profilePics[contact.id] : '') || '';
      if (profilePic) {
        const img = document.createElement('img');
        img.src = profilePic;
        img.alt = contact.name + ' profile';
        img.className = 'avatar__img';
        avatar.appendChild(img);
        avatar.style.background = '';
      } else {
        avatar.style.background = avatarGradient(contact.avatarSeed);
      }

      const textWrap = document.createElement('div');
      textWrap.className = 'chatListItem__text';
      const name = document.createElement('div');
      name.className = 'chatListItem__name';
      name.textContent = contact.name;
      const last = document.createElement('div');
      last.className = 'chatListItem__last';
      last.textContent = text;
      textWrap.appendChild(name);
      textWrap.appendChild(last);

      const meta = document.createElement('div');
      meta.className = 'chatListItem__meta';
      const timeEl = document.createElement('div');
      timeEl.className = 'chatListItem__time';
      timeEl.textContent = time;

      // Unread badge: count trailing inbound messages after last outbound seen.
      const unread = computeUnread(contact.id);
      meta.appendChild(timeEl);
      if (unread > 0 && contact.id !== activeContactId) {
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = unread;
        meta.appendChild(badge);
      }

      li.appendChild(avatar);
      li.appendChild(textWrap);
      li.appendChild(meta);

      li.addEventListener('click', () => openChat(contact.id));
      chatListEl.appendChild(li);
    }
  }

  function computeUnread(contactId) {
    const msgs = conversations[contactId] ?? [];
    // Simple heuristic: count inbound messages since last time chat opened (tracked in memory).
    // We’ll track per contact a lastRead timestamp.
    const lastRead = lastReadByContact[contactId] ?? 0;
    return msgs.filter((m) => m.dir === 'in' && m.time > lastRead).length;
  }

  /** @type {Record<string, number>} */
  const lastReadByContact = {};

  function openChat(contactId) {
    activeContactId = contactId;
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) return;

    // Mobile: switch view to chat
    appEl.dataset.view = 'chat';

    emptyStateEl.hidden = true;
    chatHeaderEl.hidden = false;
    messagesEl.hidden = false;
    composerEl.hidden = false;

    chatTitleEl.textContent = contact.name;
    // Set avatar in chat header (chat panel): always use colored gradient, no image
    const avatarHeader = document.getElementById('activeAvatar');
    if (avatarHeader) {
      avatarHeader.innerHTML = '';
      const profilePic = (typeof profilePics !== 'undefined' ? profilePics[contact.id] : '') || '';
      if (profilePic) {
        const img = document.createElement('img');
        img.src = profilePic;
        img.alt = contact.name + ' profile';
        img.className = 'avatar__img';
        avatarHeader.appendChild(img);
        avatarHeader.style.background = '';
      } else {
        avatarHeader.style.background = avatarGradient(contact.avatarSeed);
      }
    }

    // Only show 'typing…' if this contact is currently replying
    if (typingContactId === contactId) {
      chatSubtitleEl.textContent = 'typing…';
    } else {
      chatSubtitleEl.textContent = contact.subtitle;
    }

    // Mark as read
    lastReadByContact[contactId] = Date.now();

    renderChatList(searchInputEl.value);
    renderMessages(contactId);

    messageInputEl.focus();
    // On mobile, ensure messages are scrolled to bottom when keyboard appears
    setTimeout(scrollToBottom, 300);
  }

  function closeChatToList() {
    activeContactId = null;
    appEl.dataset.view = 'list';

    chatHeaderEl.hidden = true;
    messagesEl.hidden = true;
    composerEl.hidden = true;
    emptyStateEl.hidden = false;

    renderChatList(searchInputEl.value);
  }

  function renderMessages(contactId) {
    const msgs = conversations[contactId] ?? [];
    messagesEl.innerHTML = '';

    for (const msg of msgs) {
      messagesEl.appendChild(renderMessageBubble(msg));
    }

    scrollToBottom();
    // On mobile, also scroll to bottom when input is focused
    messageInputEl.addEventListener('focus', () => {
      setTimeout(scrollToBottom, 200);
    }, { once: true });
  }

  function renderMessageBubble(msg) {
    const wrap = document.createElement('div');
    wrap.className = `msg msg--${msg.dir}`;
    wrap.dataset.msgId = msg.id;

    // If message has image, render it
    if (msg.image) {
      const img = document.createElement('img');
      img.src = msg.image;
      img.className = 'msg__image';
      img.alt = 'Image';
      img.style.maxWidth = '200px';
      img.style.maxHeight = '200px';
      img.style.borderRadius = '12px';
      img.style.display = 'block';
      img.style.margin = '4px 0';
      wrap.appendChild(img);
    }

    // If message is a reply, render quoted message
    if (msg.replyTo) {
      // Find quoted message in this conversation
      const quotedMsg = (conversations[activeContactId] || []).find(m => m.id === msg.replyTo);
      if (quotedMsg) {
        const quoteWrap = document.createElement('div');
        quoteWrap.className = 'msg__quote';
        if (quotedMsg.image) {
          const quoteImg = document.createElement('img');
          quoteImg.src = quotedMsg.image;
          quoteImg.className = 'msg__image--quote';
          quoteImg.alt = 'Quoted image';
          quoteWrap.appendChild(quoteImg);
        }
        if (quotedMsg.text) {
          const quoteText = document.createElement('div');
          quoteText.className = 'msg__quoteText';
          quoteText.textContent = quotedMsg.text;
          quoteWrap.appendChild(quoteText);
        }
        wrap.appendChild(quoteWrap);
      }
    }

    const text = document.createElement('div');
    text.className = 'msg__text';
    text.textContent = msg.text;

    const meta = document.createElement('div');
    meta.className = 'msg__meta';

    const time = document.createElement('span');
    time.textContent = formatTime(msg.time);

    meta.appendChild(time);

    if (msg.dir === 'out') {
      const ticks = document.createElement('span');
      ticks.className = 'ticks';
      ticks.appendChild(renderTicks(msg.status ?? 'sent'));
      meta.appendChild(ticks);
    }

    wrap.appendChild(text);
    wrap.appendChild(meta);
    return wrap;
  }

  function renderTicks(status) {
    const frag = document.createDocumentFragment();

    // Use text glyphs so we don't need images.
    // sent: ✓
    // delivered/seen: ✓✓ (seen colored)
    const tick1 = document.createElement('span');
    tick1.className = 'tick';
    tick1.textContent = '✓';

    frag.appendChild(tick1);

    if (status === 'delivered' || status === 'seen') {
      const tick2 = document.createElement('span');
      tick2.className = 'tick' + (status === 'seen' ? ' tick--seen' : '');
      tick2.textContent = '✓';
      frag.appendChild(tick2);
    }

    return frag;
  }

  function updateMessageStatus(contactId, msgId, status) {
    const msgs = conversations[contactId] ?? [];
    const msg = msgs.find((m) => m.id === msgId);
    if (!msg || msg.dir !== 'out') return;

    msg.status = status;

    const bubble = messagesEl.querySelector(`[data-msg-id="${CSS.escape(msgId)}"]`);
    if (!bubble) return;

    const ticksWrap = bubble.querySelector('.ticks');
    if (!ticksWrap) return;

    ticksWrap.innerHTML = '';
    ticksWrap.appendChild(renderTicks(status));
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // Track which contact is 'typing…' for reply
  let typingContactId = null;

  // Track which users have already replied
  const hasReplied = {};

  function sendMessage() {
    if (!activeContactId) return;
    const raw = messageInputEl.value;
    const text = raw.trim();
    if (!text) return;

    messageInputEl.value = '';

    const msgId = cryptoRandomId();
    const msg = {
      id: msgId,
      dir: 'out',
      text,
      time: Date.now(),
      status: 'sent',
    };

    conversations[activeContactId].push(msg);
    messagesEl.appendChild(renderMessageBubble(msg));
    scrollToBottom();
    renderChatList(searchInputEl.value);

    // Progress the status like WhatsApp-ish.
    window.setTimeout(() => updateMessageStatus(activeContactId, msgId, 'delivered'), 1000);

    // Reply logic: if trigger list is empty, reply to every message. If not, reply only if any trigger matches (case-insensitive, substring)
    const triggers = userTriggers[activeContactId] || [];
    const replies = userReplies[activeContactId] || [];
    let shouldReply = false;
    if (triggers.length === 0) {
      shouldReply = true;
    } else {
      const lowerText = text.toLowerCase();
      shouldReply = triggers.some(word => lowerText.includes(word.toLowerCase()));
    }
    if (shouldReply) {
      // Save the contactId for reply, not just activeContactId
      const replyToContactId = activeContactId;
      typingContactId = replyToContactId;
      if (activeContactId === replyToContactId) {
        chatSubtitleEl.textContent = 'typing…';
      }
      renderChatList(searchInputEl.value);

      // After 3 sec: mark as seen + send a random reply and remove 'typing…'
      window.setTimeout(() => {
        updateMessageStatus(replyToContactId, msgId, 'seen');
        addIncomingReply(replyToContactId);
        typingContactId = null;
        // Only update subtitle if still in this chat
        if (activeContactId === replyToContactId) {
          const contact = contacts.find((c) => c.id === replyToContactId);
          if (contact) chatSubtitleEl.textContent = contact.subtitle;
        }
        renderChatList(searchInputEl.value);
      }, 3000);
    } else {
      // No reply, but still mark as seen after 3s
      const replyToContactId = activeContactId;
      window.setTimeout(() => {
        updateMessageStatus(replyToContactId, msgId, 'seen');
        renderChatList(searchInputEl.value);
      }, 3000);
    }
  }

  function addIncomingReply(contactId) {
    // Special logic for u10: send two messages in sequence after trigger
    if (contactId === 'u10') {
      // First message
      const msg1 = {
        id: cryptoRandomId(),
        dir: 'in',
        text: 'انا مسامحك يا صاحبي',
        time: Date.now(),
      };
      conversations[contactId].push(msg1);
      if (activeContactId === contactId) {
        messagesEl.appendChild(renderMessageBubble(msg1));
        scrollToBottom();
        lastReadByContact[contactId] = Date.now();
      }
      renderChatList(searchInputEl.value);

      // Second message after 2 seconds
      setTimeout(() => {
        const msg2 = {
          id: cryptoRandomId(),
          dir: 'in',
          text: 'تعالي ننزل مع صاحبك الاهلاوي, ولا يهمك!',
          time: Date.now(),
        };
        conversations[contactId].push(msg2);
        if (activeContactId === contactId) {
          messagesEl.appendChild(renderMessageBubble(msg2));
          scrollToBottom();
          lastReadByContact[contactId] = Date.now();
        }
        renderChatList(searchInputEl.value);
      }, 2000);
      return;
    }
    // Special logic for u20: send image, then message
    if (contactId === 'u20') {
      const imgMsg = {
        id: cryptoRandomId(),
        dir: 'in',
        text: '',
        time: Date.now(),
        image: 'icons/greco roman.jpeg',
      };
      conversations[contactId].push(imgMsg);
      if (activeContactId === contactId) {
        messagesEl.appendChild(renderMessageBubble(imgMsg));
        scrollToBottom();
        lastReadByContact[contactId] = Date.now();
      }
      renderChatList(searchInputEl.value);

      setTimeout(() => {
        const msg = {
          id: cryptoRandomId(),
          dir: 'in',
          text: 'عميلنا العزيز \n Greco roman في انتظارك امام المتحف' ,
          time: Date.now(),
        };
        conversations[contactId].push(msg);
        if (activeContactId === contactId) {
          messagesEl.appendChild(renderMessageBubble(msg));
          scrollToBottom();
          lastReadByContact[contactId] = Date.now();
        }
        renderChatList(searchInputEl.value);
      }, 1200);
      return;
    }
    // Default: pick a random reply from the user's list
    const replies = userReplies[contactId] || [];
    if (!replies.length) return;
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const inMsg = {
      id: cryptoRandomId(),
      dir: 'in',
      text: reply,
      time: Date.now(),
    };

    conversations[contactId].push(inMsg);

    if (activeContactId === contactId) {
      messagesEl.appendChild(renderMessageBubble(inMsg));
      scrollToBottom();
      lastReadByContact[contactId] = Date.now();
    }
    renderChatList(searchInputEl.value);
  }

  function updateSendButtonState() {
    const canSend = Boolean(activeContactId) && messageInputEl.value.trim().length > 0;
    sendBtnEl.disabled = !canSend;
  }

  // Events
  searchInputEl.addEventListener('input', () => renderChatList(searchInputEl.value));

  sendBtnEl.addEventListener('click', sendMessage);
  messageInputEl.addEventListener('input', updateSendButtonState);
  messageInputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
      updateSendButtonState();;
    }
  });

  backBtnEl.addEventListener('click', closeChatToList);

  // Initial render
  appEl.dataset.view = 'list';
  renderChatList('');
  updateSendButtonState();
})();
