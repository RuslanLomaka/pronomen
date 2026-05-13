const STORAGE_KEY = "pronounForgeProgress";
const THEME_KEY = "pronounForgeTheme";

const levelDescriptions = {
  1: "Einfache Sätze mit Nominativ und Akkusativ.",
  2: "Dativ-Verben wie helfen, danken, antworten, gehören und folgen.",
  3: "Persönliche Pronomen: ich, du, wir, ihr und formelles Sie.",
  4: "Zwei Objekte im Satz: Dativ-Person und Akkusativ-Sache.",
  5: "Präpositionen mit Dativ oder Akkusativ.",
  6: "Orte und Wechselpräpositionen: wo = Dativ, wohin = Akkusativ.",
  7: "Gemischte Wiederholung aus allen bisherigen Stufen.",
  8: "Boss-Stufe mit längeren Sätzen, Fallen und zwei Pronomen."
};

const modeHelp = {
  classic: "Normale Übung ohne Zeitdruck.",
  speed: "60 Sekunden Zeit. Beantworte so viele Aufgaben wie möglich.",
  minimalPair: "Sehr ähnliche Sätze. Du siehst, wie der Fall das Pronomen ändert.",
  context: "Übt Pronomen, die eine Situation brauchen: uns, Sie/Ihnen und sie/ihnen.",
  nano: "Sehr kurzer Kontext. Danach ersetzt du die Namen durch Pronomen.",
  boss: "Schwere Aufgaben mit Fallen, zwei Pronomen und gemischten Fällen.",
  mistakes: "Übt nur Aufgaben, die du vorher falsch beantwortet hast."
};

const tasks = [
  {
    id: "l1-001",
    level: 1,
    modeTags: ["classic", "akkusativ", "minimalPair"],
    original: "Der Mann sieht den Hund.",
    correct: "Er sieht ihn.",
    options: ["Er sieht ihn.", "Ihn sieht er.", "Er sieht ihm.", "Sie sieht ihn."],
    explanation: "Der Mann is masculine nominative -> er. Den Hund is masculine accusative -> ihn. Sehen takes accusative.",
    replacements: [
      { noun: "Der Mann", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Hund", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "sehen + Akkusativ"
  },
  {
    id: "l1-002",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Die Frau sieht die Katze.",
    correct: "Sie sieht sie.",
    options: ["Sie sieht sie.", "Sie sieht ihr.", "Er sieht sie.", "Sie sieht ihn."],
    explanation: "Die Frau is feminine nominative -> sie. Die Katze is feminine accusative -> sie.",
    replacements: [
      { noun: "Die Frau", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "die Katze", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" }
    ],
    hint: "die Katze = Akkusativ feminin"
  },
  {
    id: "l1-003",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Das Kind sieht das Auto.",
    correct: "Es sieht es.",
    options: ["Es sieht es.", "Er sieht es.", "Es sieht ihn.", "Ihm sieht es."],
    explanation: "Das Kind is neuter nominative -> es. Das Auto is neuter accusative -> es.",
    replacements: [
      { noun: "Das Kind", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "das Auto", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" }
    ],
    hint: "das Auto = Akkusativ neutral"
  },
  {
    id: "l1-004",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Die Kinder sehen den Lehrer.",
    correct: "Sie sehen ihn.",
    options: ["Sie sehen ihn.", "Sie sehen ihm.", "Er sehen ihn.", "Sie sehen sie."],
    explanation: "Die Kinder is plural nominative -> sie. Den Lehrer is masculine accusative -> ihn.",
    replacements: [
      { noun: "Die Kinder", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "den Lehrer", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "den Lehrer = Akkusativ maskulin"
  },
  {
    id: "l1-005",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Der Lehrer besucht die Eltern.",
    correct: "Er besucht sie.",
    options: ["Er besucht sie.", "Er besucht ihnen.", "Ihn besucht sie.", "Sie besucht ihn."],
    explanation: "Der Lehrer is masculine nominative -> er. Die Eltern is plural accusative -> sie.",
    replacements: [
      { noun: "Der Lehrer", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "die Eltern", pronoun: "sie", case: "Akkusativ", gender: "plural", number: "plural" }
    ],
    hint: "besuchen usually takes Akkusativ"
  },
  {
    id: "l1-006",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Die Lehrerin findet das Handy.",
    correct: "Sie findet es.",
    options: ["Sie findet es.", "Sie findet ihn.", "Ihr findet es.", "Er findet sie."],
    explanation: "Die Lehrerin is feminine nominative -> sie. Das Handy is neuter accusative -> es.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "das Handy", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" }
    ],
    hint: "das Handy = Akkusativ neutral"
  },
  {
    id: "l1-007",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Der Schüler kauft die Tasche.",
    correct: "Er kauft sie.",
    options: ["Er kauft sie.", "Er kauft ihr.", "Ihn kauft sie.", "Sie kauft ihn."],
    explanation: "Der Schüler is masculine nominative -> er. Die Tasche is feminine accusative -> sie.",
    replacements: [
      { noun: "Der Schüler", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "die Tasche", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" }
    ],
    hint: "kaufen takes Akkusativ for the thing bought"
  },
  {
    id: "l1-008",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Die Schülerin liest das Buch.",
    correct: "Sie liest es.",
    options: ["Sie liest es.", "Sie liest ihn.", "Ihr liest es.", "Er liest sie."],
    explanation: "Die Schülerin is feminine nominative -> sie. Das Buch is neuter accusative -> es.",
    replacements: [
      { noun: "Die Schülerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "das Buch", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" }
    ],
    hint: "das Buch = Akkusativ neutral"
  },
  {
    id: "l1-009",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Das Mädchen besucht den Arzt.",
    correct: "Es besucht ihn.",
    options: ["Es besucht ihn.", "Sie besucht ihn.", "Es besucht ihm.", "Er besucht sie."],
    explanation: "Das Mädchen is grammatically neuter -> es. Den Arzt is masculine accusative -> ihn.",
    replacements: [
      { noun: "Das Mädchen", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "den Arzt", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "das Mädchen is grammatically neutral"
  },
  {
    id: "l1-010",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Die Mutter ruft den Vater.",
    correct: "Sie ruft ihn.",
    options: ["Sie ruft ihn.", "Sie ruft ihm.", "Er ruft sie.", "Ihr ruft ihn."],
    explanation: "Die Mutter is feminine nominative -> sie. Den Vater is masculine accusative -> ihn.",
    replacements: [
      { noun: "Die Mutter", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "den Vater", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "den Vater = Akkusativ maskulin"
  },
  {
    id: "l1-011",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Der Hund sucht die Kinder.",
    correct: "Er sucht sie.",
    options: ["Er sucht sie.", "Er sucht ihnen.", "Ihn sucht sie.", "Es sucht ihn."],
    explanation: "Der Hund is masculine nominative -> er. Die Kinder is plural accusative -> sie.",
    replacements: [
      { noun: "Der Hund", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "die Kinder", pronoun: "sie", case: "Akkusativ", gender: "plural", number: "plural" }
    ],
    hint: "die Kinder = Akkusativ plural"
  },
  {
    id: "l1-012",
    level: 1,
    modeTags: ["classic", "akkusativ"],
    original: "Die Eltern kaufen das Auto.",
    correct: "Sie kaufen es.",
    options: ["Sie kaufen es.", "Sie kaufen ihn.", "Ihnen kaufen es.", "Er kauft sie."],
    explanation: "Die Eltern is plural nominative -> sie. Das Auto is neuter accusative -> es.",
    replacements: [
      { noun: "Die Eltern", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "das Auto", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" }
    ],
    hint: "kaufen + Akkusativ"
  },
  {
    id: "l2-001",
    level: 2,
    modeTags: ["classic", "dativ", "minimalPair"],
    original: "Der Lehrer hilft dem Schüler.",
    correct: "Er hilft ihm.",
    options: ["Er hilft ihm.", "Er hilft ihn.", "Ihm hilft er.", "Sie hilft ihm."],
    explanation: "Der Lehrer is masculine nominative -> er. Helfen takes dative, so dem Schüler -> ihm.",
    replacements: [
      { noun: "Der Lehrer", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "dem Schüler", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "helfen + Dativ"
  },
  {
    id: "l2-002",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Die Lehrerin hilft der Schülerin.",
    correct: "Sie hilft ihr.",
    options: ["Sie hilft ihr.", "Sie hilft sie.", "Er hilft ihr.", "Sie hilft ihm."],
    explanation: "Die Lehrerin is feminine nominative -> sie. Helfen takes dative, so der Schülerin -> ihr.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "der Schülerin", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "der Schülerin = Dativ feminin"
  },
  {
    id: "l2-003",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Das Buch gehört dem Mann.",
    correct: "Es gehört ihm.",
    options: ["Es gehört ihm.", "Es gehört ihn.", "Er gehört ihm.", "Es gehört ihr."],
    explanation: "Das Buch is neuter nominative -> es. Gehören takes dative, so dem Mann -> ihm.",
    replacements: [
      { noun: "Das Buch", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "dem Mann", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "gehören + Dativ"
  },
  {
    id: "l2-004",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Die Kinder danken der Lehrerin.",
    correct: "Sie danken ihr.",
    options: ["Sie danken ihr.", "Sie danken sie.", "Sie danken ihm.", "Ihr danken sie."],
    explanation: "Die Kinder is plural nominative -> sie. Danken takes dative, so der Lehrerin -> ihr.",
    replacements: [
      { noun: "Die Kinder", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "der Lehrerin", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "danken + Dativ"
  },
  {
    id: "l2-005",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Die Mutter antwortet der Tochter.",
    correct: "Sie antwortet ihr.",
    options: ["Sie antwortet ihr.", "Sie antwortet sie.", "Er antwortet ihr.", "Sie antwortet ihm."],
    explanation: "Die Mutter is feminine nominative -> sie. Antworten takes dative, so der Tochter -> ihr.",
    replacements: [
      { noun: "Die Mutter", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "der Tochter", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "antworten + Dativ"
  },
  {
    id: "l2-006",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Der Vater folgt dem Kind.",
    correct: "Er folgt ihm.",
    options: ["Er folgt ihm.", "Er folgt es.", "Ihn folgt ihm.", "Sie folgt ihm."],
    explanation: "Der Vater is masculine nominative -> er. Folgen takes dative, so dem Kind -> ihm.",
    replacements: [
      { noun: "Der Vater", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "dem Kind", pronoun: "ihm", case: "Dativ", gender: "neutral", number: "singular" }
    ],
    hint: "folgen + Dativ"
  },
  {
    id: "l2-007",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Der Arzt hilft der Frau.",
    correct: "Er hilft ihr.",
    options: ["Er hilft ihr.", "Er hilft sie.", "Sie hilft ihr.", "Er hilft ihm."],
    explanation: "Der Arzt is masculine nominative -> er. Der Frau is dative feminine -> ihr.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "der Frau", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "helfen + Dativ"
  },
  {
    id: "l2-008",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Die Eltern helfen den Kindern.",
    correct: "Sie helfen ihnen.",
    options: ["Sie helfen ihnen.", "Sie helfen sie.", "Ihnen helfen sie.", "Sie helfen ihr."],
    explanation: "Die Eltern is plural nominative -> sie. Den Kindern is plural dative -> ihnen.",
    replacements: [
      { noun: "Die Eltern", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "den Kindern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "den Kindern = Dativ plural"
  },
  {
    id: "l2-009",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Die Schülerin dankt dem Lehrer.",
    correct: "Sie dankt ihm.",
    options: ["Sie dankt ihm.", "Sie dankt ihn.", "Ihr dankt ihm.", "Er dankt ihr."],
    explanation: "Die Schülerin is feminine nominative -> sie. Danken takes dative, so dem Lehrer -> ihm.",
    replacements: [
      { noun: "Die Schülerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "dem Lehrer", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "danken + Dativ"
  },
  {
    id: "l2-010",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Das Handy gehört der Mutter.",
    correct: "Es gehört ihr.",
    options: ["Es gehört ihr.", "Es gehört sie.", "Er gehört ihr.", "Es gehört ihm."],
    explanation: "Das Handy is neuter nominative -> es. Gehören takes dative, so der Mutter -> ihr.",
    replacements: [
      { noun: "Das Handy", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "der Mutter", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "gehören + Dativ"
  },
  {
    id: "l2-011",
    level: 2,
    modeTags: ["classic", "dativ"],
    original: "Der Hund folgt dem Vater.",
    correct: "Er folgt ihm.",
    options: ["Er folgt ihm.", "Er folgt ihn.", "Es folgt ihm.", "Ihm folgt er."],
    explanation: "Der Hund is masculine nominative -> er. Folgen takes dative, so dem Vater -> ihm.",
    replacements: [
      { noun: "Der Hund", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "dem Vater", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "folgen + Dativ"
  },
  {
    id: "l2-012",
    level: 2,
    modeTags: ["classic", "dativ", "plural"],
    original: "Die Lehrerin antwortet den Schülern.",
    correct: "Sie antwortet ihnen.",
    options: ["Sie antwortet ihnen.", "Sie antwortet sie.", "Er antwortet ihnen.", "Sie antwortet ihr."],
    explanation: "Die Lehrerin is feminine nominative -> sie. Den Schülern is plural dative -> ihnen.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "den Schülern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "antworten + Dativ"
  },
  {
    id: "l3-001",
    level: 3,
    modeTags: ["classic", "akkusativ", "informal"],
    original: "Der Arzt sieht dich.",
    correct: "Er sieht dich.",
    options: ["Er sieht dich.", "Er sieht dir.", "Ihn sieht dich.", "Er sieht Sie."],
    explanation: "Der Arzt is masculine nominative -> er. Dich is already informal accusative.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "dich", pronoun: "dich", case: "Akkusativ", gender: "informal", number: "singular" }
    ],
    hint: "dich = Akkusativ for du"
  },
  {
    id: "l3-002",
    level: 3,
    modeTags: ["classic", "dativ", "informal"],
    original: "Die Lehrerin hilft dir.",
    correct: "Sie hilft dir.",
    options: ["Sie hilft dir.", "Sie hilft dich.", "Er hilft dir.", "Sie hilft Ihnen."],
    explanation: "Die Lehrerin is feminine nominative -> sie. Dir is the informal dative form.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "dir", pronoun: "dir", case: "Dativ", gender: "informal", number: "singular" }
    ],
    hint: "helfen + Dativ: dir"
  },
  {
    id: "l3-003",
    level: 3,
    modeTags: ["classic", "formal", "akkusativ"],
    original: "Der Chef begrüßt Sie.",
    correct: "Er begrüßt Sie.",
    options: ["Er begrüßt Sie.", "Er begrüßt Ihnen.", "Sie begrüßt ihn.", "Er begrüßt dich."],
    explanation: "Der Chef is masculine nominative -> er. Formal Sie stays Sie in accusative.",
    replacements: [
      { noun: "Der Chef", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Sie", pronoun: "Sie", case: "Akkusativ", gender: "formal", number: "singular/plural" }
    ],
    hint: "formal Akkusativ = Sie"
  },
  {
    id: "l3-004",
    level: 3,
    modeTags: ["classic", "formal", "dativ"],
    original: "Die Frau antwortet Ihnen.",
    correct: "Sie antwortet Ihnen.",
    options: ["Sie antwortet Ihnen.", "Sie antwortet Sie.", "Er antwortet Ihnen.", "Sie antwortet dir."],
    explanation: "Die Frau is feminine nominative -> sie. Formal dative is Ihnen.",
    replacements: [
      { noun: "Die Frau", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "Ihnen", pronoun: "Ihnen", case: "Dativ", gender: "formal", number: "singular/plural" }
    ],
    hint: "formal Dativ = Ihnen"
  },
  {
    id: "l3-005",
    level: 3,
    modeTags: ["classic", "akkusativ", "informal"],
    original: "Der Lehrer fragt mich.",
    correct: "Er fragt mich.",
    options: ["Er fragt mich.", "Er fragt mir.", "Ihn fragt mich.", "Er fragt uns."],
    explanation: "Der Lehrer is masculine nominative -> er. Mich is first-person accusative.",
    replacements: [
      { noun: "Der Lehrer", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "mich", pronoun: "mich", case: "Akkusativ", gender: "1. Person", number: "singular" }
    ],
    hint: "fragen often takes Akkusativ"
  },
  {
    id: "l3-006",
    level: 3,
    modeTags: ["classic", "dativ", "informal"],
    original: "Die Mutter hilft mir.",
    correct: "Sie hilft mir.",
    options: ["Sie hilft mir.", "Sie hilft mich.", "Er hilft mir.", "Sie hilft uns."],
    explanation: "Die Mutter is feminine nominative -> sie. Helfen takes dative, so ich -> mir.",
    replacements: [
      { noun: "Die Mutter", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "mir", pronoun: "mir", case: "Dativ", gender: "1. Person", number: "singular" }
    ],
    hint: "helfen + Dativ: mir"
  },
  {
    id: "l3-007",
    level: 3,
    modeTags: ["classic", "akkusativ", "plural"],
    original: "Der Arzt sieht uns.",
    correct: "Er sieht uns.",
    options: ["Er sieht uns.", "Er sieht wir.", "Ihm sieht uns.", "Sie sieht euch."],
    explanation: "Der Arzt is masculine nominative -> er. Uns is the accusative form for wir.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "uns", pronoun: "uns", case: "Akkusativ", gender: "1. Person", number: "plural" }
    ],
    hint: "wir -> uns in Akkusativ"
  },
  {
    id: "l3-008",
    level: 3,
    modeTags: ["classic", "dativ", "plural"],
    original: "Die Lehrerin dankt euch.",
    correct: "Sie dankt euch.",
    options: ["Sie dankt euch.", "Sie dankt ihr.", "Sie dankt Sie.", "Er dankt euch."],
    explanation: "Die Lehrerin is feminine nominative -> sie. Euch is both accusative and dative for ihr.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "euch", pronoun: "euch", case: "Dativ", gender: "2. Person", number: "plural" }
    ],
    hint: "danken + Dativ: euch"
  },
  {
    id: "l3-009",
    level: 3,
    modeTags: ["classic", "informal", "akkusativ"],
    original: "Die Kinder besuchen dich.",
    correct: "Sie besuchen dich.",
    options: ["Sie besuchen dich.", "Sie besuchen dir.", "Ihnen besuchen dich.", "Sie besuchen euch."],
    explanation: "Die Kinder is plural nominative -> sie. Dich is informal accusative.",
    replacements: [
      { noun: "Die Kinder", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "dich", pronoun: "dich", case: "Akkusativ", gender: "informal", number: "singular" }
    ],
    hint: "besuchen + Akkusativ"
  },
  {
    id: "l3-010",
    level: 3,
    modeTags: ["classic", "formal", "dativ"],
    original: "Der Schüler folgt Ihnen.",
    correct: "Er folgt Ihnen.",
    options: ["Er folgt Ihnen.", "Er folgt Sie.", "Ihn folgt Ihnen.", "Er folgt dir."],
    explanation: "Der Schüler is masculine nominative -> er. Folgen takes dative, and formal dative is Ihnen.",
    replacements: [
      { noun: "Der Schüler", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Ihnen", pronoun: "Ihnen", case: "Dativ", gender: "formal", number: "singular/plural" }
    ],
    hint: "folgen + Dativ"
  },
  {
    id: "l4-001",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Der Vater gibt dem Kind den Ball.",
    correct: "Er gibt ihn ihm.",
    options: ["Er gibt ihn ihm.", "Er gibt ihm ihn.", "Er gibt ihn es.", "Sie gibt ihn ihm."],
    explanation: "Der Vater -> er. Den Ball is masculine accusative -> ihn. Dem Kind is dative neuter -> ihm.",
    replacements: [
      { noun: "Der Vater", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Ball", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" },
      { noun: "dem Kind", pronoun: "ihm", case: "Dativ", gender: "neutral", number: "singular" }
    ],
    hint: "two pronouns: Akkusativ before Dativ"
  },
  {
    id: "l4-002",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Die Lehrerin erklärt dem Schüler die Aufgabe.",
    correct: "Sie erklärt sie ihm.",
    options: ["Sie erklärt sie ihm.", "Sie erklärt ihm sie.", "Sie erklärt ihr ihn.", "Er erklärt sie ihm."],
    explanation: "Die Lehrerin -> sie. Die Aufgabe is feminine accusative -> sie. Dem Schüler is dative masculine -> ihm.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "die Aufgabe", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" },
      { noun: "dem Schüler", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "die Aufgabe = Akkusativ feminin"
  },
  {
    id: "l4-003",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Der Mann schenkt der Frau die Blumen.",
    correct: "Er schenkt sie ihr.",
    options: ["Er schenkt sie ihr.", "Er schenkt ihr sie.", "Er schenkt ihnen sie.", "Sie schenkt sie ihm."],
    explanation: "Der Mann -> er. Die Blumen is plural accusative -> sie. Der Frau is dative feminine -> ihr.",
    replacements: [
      { noun: "Der Mann", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "die Blumen", pronoun: "sie", case: "Akkusativ", gender: "plural", number: "plural" },
      { noun: "der Frau", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "schenken has Dativ person + Akkusativ thing"
  },
  {
    id: "l4-004",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Die Mutter schenkt der Tochter die Tasche.",
    correct: "Sie schenkt sie ihr.",
    options: ["Sie schenkt sie ihr.", "Sie schenkt ihr sie.", "Er schenkt sie ihr.", "Sie schenkt ihn ihr."],
    explanation: "Die Mutter -> sie. Die Tasche is feminine accusative -> sie. Der Tochter is dative feminine -> ihr.",
    replacements: [
      { noun: "Die Mutter", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "die Tasche", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" },
      { noun: "der Tochter", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "der Tochter = Dativ feminin"
  },
  {
    id: "l4-005",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Der Chef zeigt dem Arzt das Handy.",
    correct: "Er zeigt es ihm.",
    options: ["Er zeigt es ihm.", "Er zeigt ihm es.", "Er zeigt ihn ihm.", "Sie zeigt es ihm."],
    explanation: "Der Chef -> er. Das Handy is neuter accusative -> es. Dem Arzt is dative masculine -> ihm.",
    replacements: [
      { noun: "Der Chef", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "das Handy", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "dem Arzt", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "das Handy -> es"
  },
  {
    id: "l4-006",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Die Schülerin gibt dem Lehrer das Buch.",
    correct: "Sie gibt es ihm.",
    options: ["Sie gibt es ihm.", "Sie gibt ihm es.", "Sie gibt ihn ihm.", "Er gibt es ihr."],
    explanation: "Die Schülerin -> sie. Das Buch is neuter accusative -> es. Dem Lehrer is dative masculine -> ihm.",
    replacements: [
      { noun: "Die Schülerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "das Buch", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "dem Lehrer", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "Akkusativ pronoun before Dativ pronoun"
  },
  {
    id: "l4-007",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Der Lehrer bringt den Kindern das Buch.",
    correct: "Er bringt es ihnen.",
    options: ["Er bringt es ihnen.", "Er bringt ihnen es.", "Er bringt ihn ihnen.", "Sie bringt es ihnen."],
    explanation: "Der Lehrer -> er. Das Buch is neuter accusative -> es. Den Kindern is dative plural -> ihnen.",
    replacements: [
      { noun: "Der Lehrer", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "das Buch", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "den Kindern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "den Kindern = Dativ plural"
  },
  {
    id: "l4-008",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Die Eltern kaufen dem Kind das Auto.",
    correct: "Sie kaufen es ihm.",
    options: ["Sie kaufen es ihm.", "Sie kaufen ihm es.", "Sie kaufen sie ihm.", "Ihnen kaufen es ihm."],
    explanation: "Die Eltern -> sie. Das Auto is neuter accusative -> es. Dem Kind is dative neuter -> ihm.",
    replacements: [
      { noun: "Die Eltern", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "das Auto", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "dem Kind", pronoun: "ihm", case: "Dativ", gender: "neutral", number: "singular" }
    ],
    hint: "dem Kind -> ihm"
  },
  {
    id: "l4-009",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Der Arzt gibt der Frau das Rezept.",
    correct: "Er gibt es ihr.",
    options: ["Er gibt es ihr.", "Er gibt ihr es.", "Er gibt sie ihr.", "Sie gibt es ihm."],
    explanation: "Der Arzt -> er. Das Rezept is neuter accusative -> es. Der Frau is dative feminine -> ihr.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "das Rezept", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "der Frau", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "geben: Dativ person + Akkusativ thing"
  },
  {
    id: "l4-010",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Die Frau zeigt dem Mann die Tasche.",
    correct: "Sie zeigt sie ihm.",
    options: ["Sie zeigt sie ihm.", "Sie zeigt ihm sie.", "Sie zeigt ihn ihm.", "Er zeigt sie ihr."],
    explanation: "Die Frau -> sie. Die Tasche is feminine accusative -> sie. Dem Mann is dative masculine -> ihm.",
    replacements: [
      { noun: "Die Frau", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "die Tasche", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" },
      { noun: "dem Mann", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "die Tasche -> sie"
  },
  {
    id: "l4-011",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Der Schüler erklärt der Lehrerin den Satz.",
    correct: "Er erklärt ihn ihr.",
    options: ["Er erklärt ihn ihr.", "Er erklärt ihr ihn.", "Er erklärt ihm sie.", "Sie erklärt ihn ihm."],
    explanation: "Der Schüler -> er. Den Satz is masculine accusative -> ihn. Der Lehrerin is dative feminine -> ihr.",
    replacements: [
      { noun: "Der Schüler", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Satz", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" },
      { noun: "der Lehrerin", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "den Satz = Akkusativ maskulin"
  },
  {
    id: "l4-012",
    level: 4,
    modeTags: ["classic", "dativ", "akkusativ", "twoObjects"],
    original: "Die Mutter bringt dem Vater die Schlüssel.",
    correct: "Sie bringt sie ihm.",
    options: ["Sie bringt sie ihm.", "Sie bringt ihm sie.", "Sie bringt ihn ihr.", "Er bringt sie ihr."],
    explanation: "Die Mutter -> sie. Die Schlüssel is plural accusative -> sie. Dem Vater is dative masculine -> ihm.",
    replacements: [
      { noun: "Die Mutter", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "die Schlüssel", pronoun: "sie", case: "Akkusativ", gender: "plural", number: "plural" },
      { noun: "dem Vater", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "die Schlüssel = plural Akkusativ"
  },
  {
    id: "l5-001",
    level: 5,
    modeTags: ["classic", "preposition", "dativ"],
    original: "Die Frau spricht mit dem Arzt.",
    correct: "Sie spricht mit ihm.",
    options: ["Sie spricht mit ihm.", "Sie spricht mit ihn.", "Er spricht mit ihr.", "Sie spricht für ihn."],
    explanation: "Die Frau -> sie. Mit always takes dative, so dem Arzt -> ihm.",
    replacements: [
      { noun: "Die Frau", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "dem Arzt", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "mit + Dativ"
  },
  {
    id: "l5-002",
    level: 5,
    modeTags: ["classic", "preposition", "akkusativ"],
    original: "Der Junge wartet auf die Mutter.",
    correct: "Er wartet auf sie.",
    options: ["Er wartet auf sie.", "Er wartet auf ihr.", "Sie wartet auf ihn.", "Er wartet mit ihr."],
    explanation: "Der Junge -> er. Auf with warten auf takes accusative here; die Mutter -> sie.",
    replacements: [
      { noun: "Der Junge", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "die Mutter", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" }
    ],
    hint: "warten auf + Akkusativ"
  },
  {
    id: "l5-003",
    level: 5,
    modeTags: ["classic", "preposition", "akkusativ"],
    original: "Der Mann kauft ein Geschenk für die Tochter.",
    correct: "Er kauft es für sie.",
    options: ["Er kauft es für sie.", "Er kauft ihn für ihr.", "Er kauft es für ihr.", "Sie kauft es für ihn."],
    explanation: "Der Mann -> er. Ein Geschenk is neuter accusative -> es. Für always takes accusative, so die Tochter -> sie.",
    replacements: [
      { noun: "Der Mann", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "ein Geschenk", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "die Tochter", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" }
    ],
    hint: "für + Akkusativ"
  },
  {
    id: "l5-004",
    level: 5,
    modeTags: ["classic", "preposition", "dativ"],
    original: "Der Schüler geht zu der Lehrerin.",
    correct: "Er geht zu ihr.",
    options: ["Er geht zu ihr.", "Er geht zu sie.", "Sie geht zu ihm.", "Er geht für sie."],
    explanation: "Der Schüler -> er. Zu always takes dative, so der Lehrerin -> ihr.",
    replacements: [
      { noun: "Der Schüler", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "der Lehrerin", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "zu + Dativ"
  },
  {
    id: "l5-005",
    level: 5,
    modeTags: ["classic", "preposition", "dativ"],
    original: "Das Kind bleibt bei dem Vater.",
    correct: "Es bleibt bei ihm.",
    options: ["Es bleibt bei ihm.", "Es bleibt bei ihn.", "Er bleibt bei ihm.", "Es bleibt ohne ihn."],
    explanation: "Das Kind -> es. Bei always takes dative, so dem Vater -> ihm.",
    replacements: [
      { noun: "Das Kind", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "dem Vater", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "bei + Dativ"
  },
  {
    id: "l5-006",
    level: 5,
    modeTags: ["classic", "preposition", "dativ"],
    original: "Die Tasche ist von der Mutter.",
    correct: "Sie ist von ihr.",
    options: ["Sie ist von ihr.", "Sie ist von sie.", "Er ist von ihr.", "Sie ist für sie."],
    explanation: "Die Tasche -> sie. Von always takes dative, so der Mutter -> ihr.",
    replacements: [
      { noun: "Die Tasche", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "der Mutter", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "von + Dativ"
  },
  {
    id: "l5-007",
    level: 5,
    modeTags: ["classic", "preposition", "akkusativ"],
    original: "Der Lehrer arbeitet ohne den Schüler.",
    correct: "Er arbeitet ohne ihn.",
    options: ["Er arbeitet ohne ihn.", "Er arbeitet ohne ihm.", "Sie arbeitet ohne ihn.", "Er arbeitet mit ihm."],
    explanation: "Der Lehrer -> er. Ohne always takes accusative, so den Schüler -> ihn.",
    replacements: [
      { noun: "Der Lehrer", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Schüler", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "ohne + Akkusativ"
  },
  {
    id: "l5-008",
    level: 5,
    modeTags: ["classic", "preposition", "akkusativ"],
    original: "Die Kinder laufen durch den Park.",
    correct: "Sie laufen durch ihn.",
    options: ["Sie laufen durch ihn.", "Sie laufen durch ihm.", "Ihnen laufen durch ihn.", "Sie laufen bei ihm."],
    explanation: "Die Kinder -> sie. Durch always takes accusative, so den Park -> ihn.",
    replacements: [
      { noun: "Die Kinder", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "den Park", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "durch + Akkusativ"
  },
  {
    id: "l5-009",
    level: 5,
    modeTags: ["classic", "preposition", "akkusativ"],
    original: "Der Hund läuft gegen den Stuhl.",
    correct: "Er läuft gegen ihn.",
    options: ["Er läuft gegen ihn.", "Er läuft gegen ihm.", "Es läuft gegen ihn.", "Er läuft bei ihm."],
    explanation: "Der Hund -> er. Gegen always takes accusative, so den Stuhl -> ihn.",
    replacements: [
      { noun: "Der Hund", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Stuhl", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "gegen + Akkusativ"
  },
  {
    id: "l5-010",
    level: 5,
    modeTags: ["classic", "preposition", "dativ", "plural"],
    original: "Die Lehrerin spricht mit den Eltern.",
    correct: "Sie spricht mit ihnen.",
    options: ["Sie spricht mit ihnen.", "Sie spricht mit sie.", "Er spricht mit ihnen.", "Sie spricht für sie."],
    explanation: "Die Lehrerin -> sie. Mit takes dative; den Eltern is dative plural -> ihnen.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "den Eltern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "mit + Dativ plural"
  },
  {
    id: "l5-011",
    level: 5,
    modeTags: ["classic", "preposition", "akkusativ", "formal"],
    original: "Der Chef wartet auf Sie.",
    correct: "Er wartet auf Sie.",
    options: ["Er wartet auf Sie.", "Er wartet auf Ihnen.", "Er wartet auf dich.", "Sie wartet auf Sie."],
    explanation: "Der Chef -> er. Warten auf uses accusative; formal accusative is Sie.",
    replacements: [
      { noun: "Der Chef", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Sie", pronoun: "Sie", case: "Akkusativ", gender: "formal", number: "singular/plural" }
    ],
    hint: "formal Akkusativ = Sie"
  },
  {
    id: "l5-012",
    level: 5,
    modeTags: ["classic", "preposition", "dativ", "informal"],
    original: "Die Frau kommt von dir.",
    correct: "Sie kommt von dir.",
    options: ["Sie kommt von dir.", "Sie kommt von dich.", "Er kommt von dir.", "Sie kommt für dich."],
    explanation: "Die Frau -> sie. Von always takes dative, and du in dative is dir.",
    replacements: [
      { noun: "Die Frau", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "dir", pronoun: "dir", case: "Dativ", gender: "informal", number: "singular" }
    ],
    hint: "von + Dativ"
  },
  {
    id: "l6-001",
    level: 6,
    modeTags: ["classic", "preposition", "dativ", "location"],
    original: "Die Tasse steht auf dem Tisch.",
    correct: "Sie steht auf ihm.",
    options: ["Sie steht auf ihm.", "Sie steht auf ihn.", "Er steht auf ihm.", "Sie steht auf ihr."],
    explanation: "Die Tasse -> sie. Static location with auf takes dative; dem Tisch -> ihm. For things, darauf can sound more natural.",
    replacements: [
      { noun: "Die Tasse", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "dem Tisch", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "location: auf + Dativ"
  },
  {
    id: "l6-002",
    level: 6,
    modeTags: ["classic", "preposition", "dativ", "location"],
    original: "Der Ball liegt unter dem Stuhl.",
    correct: "Er liegt unter ihm.",
    options: ["Er liegt unter ihm.", "Er liegt unter ihn.", "Es liegt unter ihm.", "Er liegt unter ihr."],
    explanation: "Der Ball -> er. Static location with unter takes dative; dem Stuhl -> ihm.",
    replacements: [
      { noun: "Der Ball", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "dem Stuhl", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "location: unter + Dativ"
  },
  {
    id: "l6-003",
    level: 6,
    modeTags: ["classic", "preposition", "dativ", "location"],
    original: "Das Bild hängt an der Wand.",
    correct: "Es hängt an ihr.",
    options: ["Es hängt an ihr.", "Es hängt an sie.", "Er hängt an ihr.", "Es hängt auf ihr."],
    explanation: "Das Bild -> es. Static location with an takes dative; der Wand -> ihr.",
    replacements: [
      { noun: "Das Bild", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "der Wand", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "location: an + Dativ"
  },
  {
    id: "l6-004",
    level: 6,
    modeTags: ["classic", "preposition", "dativ", "location", "plural"],
    original: "Die Tasche liegt neben den Schuhen.",
    correct: "Sie liegt neben ihnen.",
    options: ["Sie liegt neben ihnen.", "Sie liegt neben sie.", "Er liegt neben ihnen.", "Sie liegt neben ihr."],
    explanation: "Die Tasche -> sie. Static location with neben takes dative; den Schuhen -> ihnen.",
    replacements: [
      { noun: "Die Tasche", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "den Schuhen", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "den Schuhen = Dativ plural"
  },
  {
    id: "l6-005",
    level: 6,
    modeTags: ["classic", "preposition", "dativ", "location"],
    original: "Das Handy liegt in der Tasche.",
    correct: "Es liegt in ihr.",
    options: ["Es liegt in ihr.", "Es liegt in sie.", "Er liegt in ihr.", "Es liegt in ihm."],
    explanation: "Das Handy -> es. Static location with in takes dative; der Tasche -> ihr.",
    replacements: [
      { noun: "Das Handy", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "der Tasche", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "location: in + Dativ"
  },
  {
    id: "l6-006",
    level: 6,
    modeTags: ["classic", "preposition", "dativ", "location"],
    original: "Der Stuhl steht vor dem Tisch.",
    correct: "Er steht vor ihm.",
    options: ["Er steht vor ihm.", "Er steht vor ihn.", "Es steht vor ihm.", "Er steht vor ihr."],
    explanation: "Der Stuhl -> er. Static location with vor takes dative; dem Tisch -> ihm.",
    replacements: [
      { noun: "Der Stuhl", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "dem Tisch", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "location: vor + Dativ"
  },
  {
    id: "l6-007",
    level: 6,
    modeTags: ["classic", "preposition", "dativ", "location"],
    original: "Das Buch liegt hinter der Tasche.",
    correct: "Es liegt hinter ihr.",
    options: ["Es liegt hinter ihr.", "Es liegt hinter sie.", "Er liegt hinter ihr.", "Es liegt hinter ihm."],
    explanation: "Das Buch -> es. Static location with hinter takes dative; der Tasche -> ihr.",
    replacements: [
      { noun: "Das Buch", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "der Tasche", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "location: hinter + Dativ"
  },
  {
    id: "l6-008",
    level: 6,
    modeTags: ["classic", "preposition", "akkusativ", "location"],
    original: "Der Junge legt den Ball unter den Stuhl.",
    correct: "Er legt ihn unter ihn.",
    options: ["Er legt ihn unter ihn.", "Er legt ihn unter ihm.", "Er legt ihm unter ihn.", "Sie legt ihn unter ihn."],
    explanation: "Der Junge -> er. Den Ball -> ihn. Direction with unter takes accusative; den Stuhl -> ihn.",
    replacements: [
      { noun: "Der Junge", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Ball", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" },
      { noun: "den Stuhl", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "direction: unter + Akkusativ"
  },
  {
    id: "l6-009",
    level: 6,
    modeTags: ["classic", "preposition", "akkusativ", "location"],
    original: "Die Frau stellt die Tasse auf den Tisch.",
    correct: "Sie stellt sie auf ihn.",
    options: ["Sie stellt sie auf ihn.", "Sie stellt sie auf ihm.", "Sie stellt ihr auf ihn.", "Er stellt sie auf ihn."],
    explanation: "Die Frau -> sie. Die Tasse -> sie. Direction with auf takes accusative; den Tisch -> ihn.",
    replacements: [
      { noun: "Die Frau", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "die Tasse", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" },
      { noun: "den Tisch", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "direction: auf + Akkusativ"
  },
  {
    id: "l6-010",
    level: 6,
    modeTags: ["classic", "preposition", "dativ", "location"],
    original: "Die Katze sitzt zwischen den Kindern.",
    correct: "Sie sitzt zwischen ihnen.",
    options: ["Sie sitzt zwischen ihnen.", "Sie sitzt zwischen sie.", "Er sitzt zwischen ihnen.", "Sie sitzt zwischen ihr."],
    explanation: "Die Katze -> sie. Static location with zwischen takes dative; den Kindern -> ihnen.",
    replacements: [
      { noun: "Die Katze", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "den Kindern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "location: zwischen + Dativ"
  },
  {
    id: "l7-001",
    level: 7,
    modeTags: ["classic", "mixed", "dativ"],
    original: "Der Mann hilft der Frau.",
    correct: "Er hilft ihr.",
    options: ["Er hilft ihr.", "Er hilft sie.", "Ihn hilft ihr.", "Sie hilft ihm."],
    explanation: "Der Mann -> er. Helfen takes dative; der Frau -> ihr.",
    replacements: [
      { noun: "Der Mann", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "der Frau", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "helfen + Dativ"
  },
  {
    id: "l7-002",
    level: 7,
    modeTags: ["classic", "mixed", "akkusativ"],
    original: "Die Lehrerin besucht den Schüler.",
    correct: "Sie besucht ihn.",
    options: ["Sie besucht ihn.", "Sie besucht ihm.", "Er besucht ihn.", "Sie besucht ihr."],
    explanation: "Die Lehrerin -> sie. Den Schüler is masculine accusative -> ihn.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "den Schüler", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "besuchen + Akkusativ"
  },
  {
    id: "l7-003",
    level: 7,
    modeTags: ["classic", "mixed", "preposition", "dativ"],
    original: "Das Kind spielt mit der Katze.",
    correct: "Es spielt mit ihr.",
    options: ["Es spielt mit ihr.", "Es spielt mit sie.", "Er spielt mit ihr.", "Es spielt für sie."],
    explanation: "Das Kind -> es. Mit takes dative; der Katze -> ihr.",
    replacements: [
      { noun: "Das Kind", pronoun: "es", case: "Nominativ", gender: "neutral", number: "singular" },
      { noun: "der Katze", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "mit + Dativ"
  },
  {
    id: "l7-004",
    level: 7,
    modeTags: ["classic", "mixed", "twoObjects"],
    original: "Die Eltern geben dem Lehrer das Handy.",
    correct: "Sie geben es ihm.",
    options: ["Sie geben es ihm.", "Sie geben ihm es.", "Sie geben ihn ihm.", "Ihnen geben es ihm."],
    explanation: "Die Eltern -> sie. Das Handy -> es. Dem Lehrer -> ihm.",
    replacements: [
      { noun: "Die Eltern", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "das Handy", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "dem Lehrer", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "Akkusativ pronoun before Dativ pronoun"
  },
  {
    id: "l7-005",
    level: 7,
    modeTags: ["classic", "mixed", "formal"],
    original: "Der Arzt antwortet Ihnen.",
    correct: "Er antwortet Ihnen.",
    options: ["Er antwortet Ihnen.", "Er antwortet Sie.", "Sie antwortet Ihnen.", "Er antwortet dir."],
    explanation: "Der Arzt -> er. Antworten takes dative; formal dative is Ihnen.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Ihnen", pronoun: "Ihnen", case: "Dativ", gender: "formal", number: "singular/plural" }
    ],
    hint: "antworten + Dativ"
  },
  {
    id: "l7-006",
    level: 7,
    modeTags: ["classic", "mixed", "plural", "dativ"],
    original: "Die Lehrerin hilft den Kindern.",
    correct: "Sie hilft ihnen.",
    options: ["Sie hilft ihnen.", "Sie hilft sie.", "Er hilft ihnen.", "Sie hilft ihr."],
    explanation: "Die Lehrerin -> sie. Den Kindern is dative plural -> ihnen.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "den Kindern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "den Kindern = Dativ plural"
  },
  {
    id: "l8-001",
    level: 8,
    modeTags: ["classic", "boss", "twoObjects", "dativ", "akkusativ"],
    original: "Die Lehrerin gibt dem Schüler das Buch.",
    correct: "Sie gibt es ihm.",
    options: ["Sie gibt es ihm.", "Sie gibt ihm es.", "Er gibt es ihm.", "Sie gibt ihn ihr."],
    explanation: "Die Lehrerin -> sie. Das Buch -> es. Dem Schüler -> ihm. With two pronouns, accusative usually comes before dative.",
    replacements: [
      { noun: "Die Lehrerin", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "das Buch", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "dem Schüler", pronoun: "ihm", case: "Dativ", gender: "maskulin", number: "singular" }
    ],
    hint: "two pronouns: Akkusativ before Dativ"
  },
  {
    id: "l8-002",
    level: 8,
    modeTags: ["classic", "boss", "preposition", "formal"],
    original: "Der Chef spricht mit Ihnen über den Plan.",
    correct: "Er spricht mit Ihnen über ihn.",
    options: ["Er spricht mit Ihnen über ihn.", "Er spricht mit Sie über ihn.", "Er spricht mit Ihnen über ihm.", "Sie spricht mit Ihnen über ihn."],
    explanation: "Der Chef -> er. Mit takes dative, formal dative is Ihnen. Über in this topic phrase takes accusative; den Plan -> ihn.",
    replacements: [
      { noun: "Der Chef", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Ihnen", pronoun: "Ihnen", case: "Dativ", gender: "formal", number: "singular/plural" },
      { noun: "den Plan", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "mit + Dativ; über den Plan -> über ihn"
  },
  {
    id: "l8-003",
    level: 8,
    modeTags: ["classic", "boss", "twoObjects", "plural"],
    original: "Der Vater zeigt den Kindern das Auto.",
    correct: "Er zeigt es ihnen.",
    options: ["Er zeigt es ihnen.", "Er zeigt ihnen es.", "Er zeigt ihn ihnen.", "Sie zeigt es ihnen."],
    explanation: "Der Vater -> er. Das Auto -> es. Den Kindern is dative plural -> ihnen.",
    replacements: [
      { noun: "Der Vater", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "das Auto", pronoun: "es", case: "Akkusativ", gender: "neutral", number: "singular" },
      { noun: "den Kindern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "den Kindern = Dativ plural"
  },
  {
    id: "l8-004",
    level: 8,
    modeTags: ["classic", "boss", "preposition", "location", "akkusativ"],
    original: "Die Mutter stellt die Tasche neben den Stuhl.",
    correct: "Sie stellt sie neben ihn.",
    options: ["Sie stellt sie neben ihn.", "Sie stellt sie neben ihm.", "Er stellt sie neben ihn.", "Sie stellt ihr neben ihn."],
    explanation: "Die Mutter -> sie. Die Tasche -> sie. Direction with neben takes accusative; den Stuhl -> ihn.",
    replacements: [
      { noun: "Die Mutter", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "die Tasche", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" },
      { noun: "den Stuhl", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "direction: neben + Akkusativ"
  },
  {
    id: "l8-005",
    level: 8,
    modeTags: ["classic", "boss", "preposition", "dativ", "informal"],
    original: "Der Lehrer spricht mit dir über die Aufgabe.",
    correct: "Er spricht mit dir über sie.",
    options: ["Er spricht mit dir über sie.", "Er spricht mit dich über sie.", "Er spricht mit dir über ihr.", "Sie spricht mit dir über sie."],
    explanation: "Der Lehrer -> er. Mit takes dative, so dir. Über die Aufgabe uses accusative here -> sie.",
    replacements: [
      { noun: "Der Lehrer", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "dir", pronoun: "dir", case: "Dativ", gender: "informal", number: "singular" },
      { noun: "die Aufgabe", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" }
    ],
    hint: "mit + Dativ; über die Aufgabe -> über sie"
  },
  {
    id: "l8-006",
    level: 8,
    modeTags: ["classic", "boss", "twoObjects", "preposition", "plural"],
    original: "Die Eltern kaufen den Kindern die Bücher für die Schule.",
    correct: "Sie kaufen sie ihnen für sie.",
    options: ["Sie kaufen sie ihnen für sie.", "Sie kaufen ihnen sie für ihr.", "Sie kaufen sie sie für ihnen.", "Ihnen kaufen sie ihnen für sie."],
    explanation: "Die Eltern -> sie. Die Bücher -> sie. Den Kindern -> ihnen. Für takes accusative; die Schule -> sie.",
    replacements: [
      { noun: "Die Eltern", pronoun: "sie", case: "Nominativ", gender: "plural", number: "plural" },
      { noun: "die Bücher", pronoun: "sie", case: "Akkusativ", gender: "plural", number: "plural" },
      { noun: "den Kindern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" },
      { noun: "die Schule", pronoun: "sie", case: "Akkusativ", gender: "feminin", number: "singular" }
    ],
    hint: "für + Akkusativ; den Kindern -> ihnen"
  },
  {
    id: "ctx-001",
    level: 3,
    modeTags: ["context", "minimalPair", "akkusativ", "uns"],
    original: "Der Lehrer sieht Anna und mich.",
    correct: "Er sieht uns.",
    options: ["Er sieht uns.", "Er sieht wir.", "Er sieht euch.", "Er sieht ihnen."],
    explanation: "sehen + Akkusativ. Anna und mich -> uns.",
    replacements: [
      { noun: "Der Lehrer", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Anna und mich", pronoun: "uns", case: "Akkusativ", gender: "1. Person", number: "plural" }
    ],
    hint: "sehen + Akkusativ, aber wir -> uns"
  },
  {
    id: "ctx-002",
    level: 3,
    modeTags: ["context", "minimalPair", "dativ", "uns"],
    original: "Der Lehrer hilft Anna und mir.",
    correct: "Er hilft uns.",
    options: ["Er hilft uns.", "Er hilft wir.", "Er hilft euch.", "Er hilft ihnen."],
    explanation: "helfen + Dativ. Anna und mir -> uns.",
    replacements: [
      { noun: "Der Lehrer", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Anna und mir", pronoun: "uns", case: "Dativ", gender: "1. Person", number: "plural" }
    ],
    hint: "helfen + Dativ, aber wir -> uns"
  },
  {
    id: "ctx-003",
    level: 3,
    modeTags: ["context", "akkusativ", "siezen", "formal"],
    original: "Der Arzt sieht Herrn Bauer. (formell)",
    correct: "Er sieht Sie.",
    options: ["Er sieht Sie.", "Er sieht Ihnen.", "Er sieht ihn.", "Er sieht sie."],
    explanation: "formell: Herr Bauer wird direkt angesprochen. sehen + Akkusativ -> Sie.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Herrn Bauer (formell)", pronoun: "Sie", case: "Akkusativ", gender: "formell", number: "singular" }
    ],
    hint: "Siezen + Akkusativ = Sie"
  },
  {
    id: "ctx-004",
    level: 3,
    modeTags: ["context", "dativ", "siezen", "formal"],
    original: "Der Arzt hilft Herrn Bauer. (formell)",
    correct: "Er hilft Ihnen.",
    options: ["Er hilft Ihnen.", "Er hilft Sie.", "Er hilft ihm.", "Er hilft ihnen."],
    explanation: "formell: Herr Bauer wird direkt angesprochen. helfen + Dativ -> Ihnen.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Herrn Bauer (formell)", pronoun: "Ihnen", case: "Dativ", gender: "formell", number: "singular" }
    ],
    hint: "Siezen + Dativ = Ihnen"
  },
  {
    id: "ctx-005",
    level: 3,
    modeTags: ["context", "akkusativ", "plural"],
    original: "Der Arzt sieht die Kinder.",
    correct: "Er sieht sie.",
    options: ["Er sieht sie.", "Er sieht ihnen.", "Er sieht Sie.", "Er sieht Ihnen."],
    explanation: "die Kinder ist Plural. sehen + Akkusativ -> sie.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "die Kinder", pronoun: "sie", case: "Akkusativ", gender: "plural", number: "plural" }
    ],
    hint: "Plural Akkusativ = sie"
  },
  {
    id: "ctx-006",
    level: 3,
    modeTags: ["context", "dativ", "plural"],
    original: "Der Arzt hilft den Kindern.",
    correct: "Er hilft ihnen.",
    options: ["Er hilft ihnen.", "Er hilft Ihnen.", "Er hilft sie.", "Er hilft Sie."],
    explanation: "den Kindern ist Plural Dativ. helfen + Dativ -> ihnen.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Kindern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "Plural Dativ = ihnen"
  },
  {
    id: "ctx-007",
    level: 3,
    modeTags: ["context", "dativ", "siezen", "formal"],
    original: "Der Chef dankt Frau Keller. (formell)",
    correct: "Er dankt Ihnen.",
    options: ["Er dankt Ihnen.", "Er dankt ihnen.", "Er dankt Sie.", "Er dankt sie."],
    explanation: "formell: Frau Keller wird direkt angesprochen. danken + Dativ -> Ihnen.",
    replacements: [
      { noun: "Der Chef", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Frau Keller (formell)", pronoun: "Ihnen", case: "Dativ", gender: "formell", number: "singular" }
    ],
    hint: "Großes Ihnen = formell"
  },
  {
    id: "ctx-008",
    level: 3,
    modeTags: ["context", "dativ", "plural"],
    original: "Der Chef dankt den Eltern.",
    correct: "Er dankt ihnen.",
    options: ["Er dankt ihnen.", "Er dankt Ihnen.", "Er dankt sie.", "Er dankt Sie."],
    explanation: "den Eltern ist Plural Dativ. danken + Dativ -> ihnen.",
    replacements: [
      { noun: "Der Chef", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Eltern", pronoun: "ihnen", case: "Dativ", gender: "plural", number: "plural" }
    ],
    hint: "Kleines ihnen = Plural Dativ"
  },
  {
    id: "ctx-009",
    level: 3,
    modeTags: ["context", "dass", "akkusativ"],
    original: "Anna sagt, dass Anna Max liebt.",
    correct: "Anna sagt, dass sie ihn liebt.",
    options: ["Anna sagt, dass sie ihn liebt.", "Anna sagt, dass sie ihm liebt.", "Anna sagt, dass ihr ihn liebt.", "Anna sagt, dass er sie liebt."],
    explanation: "dass-Satz: Verb am Ende. Anna -> sie. lieben + Akkusativ, Max -> ihn.",
    replacements: [
      { noun: "Anna", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "Max", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "lieben + Akkusativ; im dass-Satz steht liebt am Ende"
  },
  {
    id: "ctx-010",
    level: 3,
    modeTags: ["context", "dass", "dativ"],
    original: "Anna sagt, dass Max Anna hilft.",
    correct: "Anna sagt, dass er ihr hilft.",
    options: ["Anna sagt, dass er ihr hilft.", "Anna sagt, dass er sie hilft.", "Anna sagt, dass sie ihm hilft.", "Anna sagt, dass ihm sie hilft."],
    explanation: "dass-Satz: Verb am Ende. Max -> er. helfen + Dativ, Anna -> ihr.",
    replacements: [
      { noun: "Max", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Anna", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "helfen + Dativ; im dass-Satz steht hilft am Ende"
  },
  {
    id: "nano-001",
    level: 3,
    modeTags: ["context", "nano", "akkusativ"],
    context: "Anna mag Max.",
    original: "Anna sieht Max.",
    correct: "Sie sieht ihn.",
    options: ["Sie sieht ihn.", "Sie sieht ihm.", "Er sieht sie.", "Sie sieht er."],
    explanation: "Kontext: Anna -> sie, Max -> ihn. sehen + Akkusativ.",
    replacements: [
      { noun: "Anna", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "Max", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "sehen + Akkusativ"
  },
  {
    id: "nano-002",
    level: 3,
    modeTags: ["context", "nano", "dativ"],
    context: "Anna kennt Max.",
    original: "Max hilft Anna.",
    correct: "Er hilft ihr.",
    options: ["Er hilft ihr.", "Er hilft sie.", "Sie hilft ihm.", "Er hilft ihn."],
    explanation: "Kontext: Max -> er, Anna -> ihr. helfen + Dativ.",
    replacements: [
      { noun: "Max", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Anna", pronoun: "ihr", case: "Dativ", gender: "feminin", number: "singular" }
    ],
    hint: "helfen + Dativ"
  },
  {
    id: "nano-003",
    level: 4,
    modeTags: ["context", "nano", "twoObjects", "dativ", "akkusativ"],
    context: "Der Vater hat einen Ball. Das Kind wartet.",
    original: "Der Vater gibt dem Kind den Ball.",
    correct: "Er gibt ihn ihm.",
    options: ["Er gibt ihn ihm.", "Er gibt ihm ihn.", "Er gibt ihn es.", "Sie gibt ihn ihm."],
    explanation: "Kontext: Der Vater -> er, den Ball -> ihn, dem Kind -> ihm.",
    replacements: [
      { noun: "Der Vater", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "den Ball", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" },
      { noun: "dem Kind", pronoun: "ihm", case: "Dativ", gender: "neutral", number: "singular" }
    ],
    hint: "Akkusativ-Pronomen vor Dativ-Pronomen"
  },
  {
    id: "nano-004",
    level: 3,
    modeTags: ["context", "nano", "siezen", "formal", "dativ"],
    context: "Herr Bauer ist hier. Formell.",
    original: "Der Arzt hilft Herrn Bauer.",
    correct: "Er hilft Ihnen.",
    options: ["Er hilft Ihnen.", "Er hilft ihnen.", "Er hilft Sie.", "Er hilft ihn."],
    explanation: "Kontext: formell. helfen + Dativ -> Ihnen.",
    replacements: [
      { noun: "Der Arzt", pronoun: "er", case: "Nominativ", gender: "maskulin", number: "singular" },
      { noun: "Herrn Bauer", pronoun: "Ihnen", case: "Dativ", gender: "formell", number: "singular" }
    ],
    hint: "Formell + Dativ = Ihnen"
  },
  {
    id: "nano-005",
    level: 3,
    modeTags: ["context", "nano", "dass", "akkusativ"],
    context: "Anna liebt Max.",
    original: "Anna sagt, dass Anna Max liebt.",
    correct: "Sie sagt, dass sie ihn liebt.",
    options: ["Sie sagt, dass sie ihn liebt.", "Sie sagt, dass sie ihm liebt.", "Sie sagt, dass er sie liebt.", "Sie sagt, dass ihr ihn liebt."],
    explanation: "Kontext: Anna -> sie, Max -> ihn. lieben + Akkusativ. Im dass-Satz steht liebt am Ende.",
    replacements: [
      { noun: "Anna", pronoun: "sie", case: "Nominativ", gender: "feminin", number: "singular" },
      { noun: "Max", pronoun: "ihn", case: "Akkusativ", gender: "maskulin", number: "singular" }
    ],
    hint: "dass: Verb am Ende; lieben + Akkusativ"
  }
];

const state = {
  currentLevel: 1,
  currentMode: "classic",
  currentTask: null,
  currentOptions: [],
  lastTaskId: null,
  score: 0,
  streak: 0,
  hearts: 3,
  answered: false,
  usedHint: false,
  mistakeIds: [],
  completedTasks: [],
  correctCountByLevel: {},
  weakSpots: {},
  levelUnlocked: 1,
  theme: "light",
  speedTimer: null,
  speedTimeLeft: 60,
  speedCorrect: 0,
  speedWrong: 0,
  bestStreak: 0,
  bestSpeedModeScore: 0
};

const els = {};
let pendingHelpAction = null;
let helpBypassTarget = null;

function initApp() {
  cacheElements();
  loadProgress();
  loadTheme();
  setControlsLayout();
  renderCheatSheet();
  renderModeButtons();
  renderLevelButtons();
  bindEvents();
  startMode("classic");
  updateStats();
}

function cacheElements() {
  els.scoreLabel = document.getElementById("scoreLabel");
  els.streakLabel = document.getElementById("streakLabel");
  els.heartsLabel = document.getElementById("heartsLabel");
  els.modeButtons = document.getElementById("modeButtons");
  els.levelButtons = document.getElementById("levelButtons");
  els.levelDescription = document.getElementById("levelDescription");
  els.controlsDisclosure = document.getElementById("controlsDisclosure");
  els.themeToggle = document.getElementById("themeToggle");
  els.timerBox = document.getElementById("timerBox");
  els.nanoContext = document.getElementById("nanoContext");
  els.originalSentence = document.getElementById("originalSentence");
  els.tagList = document.getElementById("tagList");
  els.hintBox = document.getElementById("hintBox");
  els.hintButton = document.getElementById("hintButton");
  els.answerButtons = document.getElementById("answerButtons");
  els.feedbackPanel = document.getElementById("feedbackPanel");
  els.feedbackTitle = document.getElementById("feedbackTitle");
  els.correctAnswerText = document.getElementById("correctAnswerText");
  els.explanationText = document.getElementById("explanationText");
  els.caseLogicList = document.getElementById("caseLogicList");
  els.nextButton = document.getElementById("nextButton");
  els.gameOverPanel = document.getElementById("gameOverPanel");
  els.gameOverSummary = document.getElementById("gameOverSummary");
  els.restartButton = document.getElementById("restartButton");
  els.reviewMistakesButton = document.getElementById("reviewMistakesButton");
  els.resetButton = document.getElementById("resetButton");
  els.mistakeModeButton = document.getElementById("mistakeModeButton");
  els.weakSpotStats = document.getElementById("weakSpotStats");
  els.cheatSheetContent = document.getElementById("cheatSheetContent");
  els.helpTooltip = document.getElementById("helpTooltip");
  els.helpDialog = document.getElementById("helpDialog");
  els.helpDialogText = document.getElementById("helpDialogText");
  els.helpDialogOk = document.getElementById("helpDialogOk");
}

function bindEvents() {
  els.nextButton.addEventListener("click", nextTask);
  els.hintButton.addEventListener("click", showHint);
  els.themeToggle.addEventListener("click", toggleTheme);
  els.restartButton.addEventListener("click", restartGame);
  els.reviewMistakesButton.addEventListener("click", () => startMode("mistakes"));
  els.mistakeModeButton.addEventListener("click", () => startMode("mistakes"));
  els.resetButton.addEventListener("click", resetProgress);
  document.addEventListener("click", handleMobileHelpClick, true);
  document.addEventListener("mouseover", handleHelpHover);
  document.addEventListener("mouseout", hideHelpTooltip);
  document.addEventListener("focusin", handleHelpHover);
  document.addEventListener("focusout", hideHelpTooltip);
  document.addEventListener("keydown", handleKeyboard);
  els.helpDialogOk.addEventListener("click", confirmHelpDialog);
  const mobileControlsQuery = window.matchMedia("(max-width: 820px)");
  if (mobileControlsQuery.addEventListener) {
    mobileControlsQuery.addEventListener("change", setControlsLayout);
  } else if (mobileControlsQuery.addListener) {
    mobileControlsQuery.addListener(setControlsLayout);
  }
}

function renderModeButtons() {
  const modes = [
    { id: "classic", label: "Klassisch" },
    { id: "speed", label: "Zeit" },
    { id: "minimalPair", label: "Paare" },
    { id: "context", label: "Kontext" },
    { id: "nano", label: "Nano" },
    { id: "boss", label: "Boss" },
    { id: "mistakes", label: "Fehler" }
  ];

  els.modeButtons.innerHTML = "";
  modes.forEach((mode) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mode-button";
    button.textContent = mode.label;
    button.dataset.mode = mode.id;
    button.dataset.help = modeHelp[mode.id];
    button.addEventListener("click", () => startMode(mode.id));
    els.modeButtons.appendChild(button);
  });
}

function renderLevelButtons() {
  els.levelButtons.innerHTML = "";
  for (let level = 1; level <= 8; level += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-button";
    button.textContent = level;
    button.dataset.help = level > state.levelUnlocked
      ? `${levelDescriptions[level]} Noch nicht freigeschaltet, aber frei wählbar.`
      : levelDescriptions[level];
    if (level > state.levelUnlocked) {
      button.classList.add("locked");
    }
    if (level === state.currentLevel) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => setLevel(level));
    els.levelButtons.appendChild(button);
  }
}

function renderTask() {
  const availableTasks = getTasksForCurrentMode();
  if (availableTasks.length === 0) {
    showEmptyMode();
    return;
  }

  const candidates = availableTasks.filter((task) => task.id !== state.lastTaskId);
  const pool = candidates.length > 0 ? candidates : availableTasks;
  const shuffled = shuffleArray([...pool]);
  state.currentTask = shuffled[0];
  state.lastTaskId = state.currentTask.id;
  state.answered = false;
  state.usedHint = false;

  els.gameOverPanel.classList.add("hidden");
  if (state.currentTask.context) {
    els.nanoContext.textContent = `Kontext: ${state.currentTask.context}`;
    els.nanoContext.classList.remove("hidden");
  } else {
    els.nanoContext.textContent = "";
    els.nanoContext.classList.add("hidden");
  }
  els.originalSentence.textContent = state.currentTask.original;
  els.hintBox.textContent = "";
  els.hintBox.classList.add("hidden");
  els.hintButton.disabled = false;
  els.hintButton.classList.remove("hidden");

  renderTags(state.currentTask);
  renderAnswerButtons(state.currentTask);
  hideFeedback();
  updateStats();
}

function renderAnswerButtons(task) {
  els.answerButtons.innerHTML = "";
  state.currentOptions = shuffleArray([...task.options]);
  state.currentOptions.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span>`;
    button.addEventListener("click", () => checkAnswer(index));
    els.answerButtons.appendChild(button);
  });
}

function renderTags(task) {
  const labels = new Set();
  task.replacements.forEach((item) => labels.add(item.case));
  task.modeTags.forEach((tag) => {
    const labelMap = {
      akkusativ: "Akkusativ",
      dativ: "Dativ",
      nominativ: "Nominativ",
      preposition: "Präposition",
      formal: "Formell",
      informal: "Informell",
      plural: "Plural",
      twoObjects: "Zwei Objekte",
      boss: "Boss",
      location: "Wechselpräposition",
      context: "Kontext",
      nano: "Nano-Kontext",
      siezen: "Siezen",
      dass: "dass-Satz",
      uns: "uns"
    };
    if (labelMap[tag]) labels.add(labelMap[tag]);
  });

  els.tagList.innerHTML = "";
  labels.forEach((label) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = label;
    els.tagList.appendChild(span);
  });
}

function checkAnswer(index) {
  if (state.answered || !state.currentTask || state.hearts <= 0) return;

  state.answered = true;
  els.hintButton.classList.add("hidden");
  const selected = state.currentOptions[index];
  const isCorrect = selected === state.currentTask.correct;
  const buttons = [...els.answerButtons.querySelectorAll(".answer-button")];

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    const option = state.currentOptions[buttonIndex];
    if (option === state.currentTask.correct) {
      button.classList.add("correct");
    }
    if (buttonIndex === index && !isCorrect) {
      button.classList.add("wrong");
    }
  });

  if (isCorrect) {
    const points = state.usedHint ? 5 : 10;
    state.score += points;
    state.streak += 1;
    state.speedCorrect += state.currentMode === "speed" ? 1 : 0;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.correctCountByLevel[state.currentLevel] = (state.correctCountByLevel[state.currentLevel] || 0) + 1;
    state.completedTasks = unique([...state.completedTasks, state.currentTask.id]);
    if (state.streak > 0 && state.streak % 5 === 0) {
      state.score += 20;
    }
    unlockNextLevel();
  } else {
    state.hearts -= state.currentMode === "speed" ? 0 : 1;
    state.streak = 0;
    state.speedWrong += state.currentMode === "speed" ? 1 : 0;
    state.mistakeIds = unique([...state.mistakeIds, state.currentTask.id]);
    trackWeakSpots(state.currentTask);
  }

  showFeedback(isCorrect);
  saveProgress();
  updateStats();

  if (state.currentMode === "speed" && isCorrect && state.speedTimeLeft > 0) {
    window.setTimeout(nextTask, 420);
  }

  if (state.hearts <= 0 && state.currentMode !== "speed") {
    window.setTimeout(showGameOver, 500);
  }
}

function showFeedback(isCorrect) {
  const speedCorrect = state.currentMode === "speed" && isCorrect;
  els.feedbackPanel.className = `feedback-panel ${isCorrect ? "correct" : "wrong"}`;
  els.feedbackPanel.classList.remove("hidden");
  els.feedbackTitle.textContent = isCorrect ? "Richtig" : "Fast";
  els.correctAnswerText.textContent = `Richtige Antwort: ${state.currentTask.correct}`;
  els.explanationText.textContent = speedCorrect ? "Gut. Weiter so." : buildGermanExplanation(state.currentTask);
  els.caseLogicList.innerHTML = "";

  if (!speedCorrect) {
    state.currentTask.replacements.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.noun} wird ${item.pronoun} (${item.case}, ${item.gender}, ${item.number})`;
      els.caseLogicList.appendChild(li);
    });
  }
}

function hideFeedback() {
  els.feedbackPanel.className = "feedback-panel hidden";
  els.feedbackTitle.textContent = "";
  els.correctAnswerText.textContent = "";
  els.explanationText.textContent = "";
  els.caseLogicList.innerHTML = "";
}

function nextTask() {
  if (state.hearts <= 0 && state.currentMode !== "speed") return;
  renderTask();
}

function startMode(mode) {
  stopSpeedTimer();
  state.currentMode = mode;
  state.hearts = mode === "speed" ? 999 : 3;
  state.streak = 0;
  state.speedCorrect = 0;
  state.speedWrong = 0;
  els.timerBox.classList.toggle("hidden", mode !== "speed");

  if (mode === "boss") {
    state.currentLevel = 8;
  }

  if (mode === "speed") {
    state.speedTimeLeft = 60;
    els.timerBox.textContent = "60s";
    state.speedTimer = window.setInterval(tickSpeedTimer, 1000);
  }

  renderModeButtonsState();
  renderLevelButtons();
  renderTask();
}

function setLevel(level) {
  state.currentLevel = level;
  if (state.currentMode === "boss" && level !== 8) {
    state.currentMode = "classic";
  }
  renderModeButtonsState();
  renderLevelButtons();
  renderTask();
  saveProgress();
}

function getTasksForCurrentMode() {
  if (state.currentMode === "mistakes") {
    return tasks.filter((task) => state.mistakeIds.includes(task.id));
  }
  if (state.currentMode === "minimalPair") {
    return tasks.filter((task) => task.modeTags.includes("minimalPair"));
  }
  if (state.currentMode === "context") {
    return tasks.filter((task) => task.modeTags.includes("context"));
  }
  if (state.currentMode === "nano") {
    return tasks.filter((task) => task.modeTags.includes("nano"));
  }
  if (state.currentMode === "boss") {
    return tasks.filter((task) => task.level === 8 || task.modeTags.includes("boss"));
  }
  if (state.currentMode === "speed") {
    return tasks.filter((task) => task.level <= Math.max(state.currentLevel, state.levelUnlocked));
  }
  if (state.currentLevel === 7) {
    return tasks.filter((task) => task.level >= 1 && task.level <= 7);
  }
  return tasks.filter((task) => task.level === state.currentLevel);
}

function showHint() {
  if (!state.currentTask || state.answered) return;
  state.usedHint = true;
  els.hintBox.textContent = buildFallbackHint(state.currentTask);
  els.hintBox.classList.remove("hidden");
  els.hintButton.disabled = true;
}

function buildFallbackHint(task) {
  const first = task.replacements.find((item) => item.case !== "Nominativ") || task.replacements[0];
  return `${first.noun} = ${first.case}, ${first.gender}`;
}

function buildGermanExplanation(task) {
  if (task.modeTags.includes("context")) {
    return `${task.explanation} Richtiger Satz: ${task.correct}`;
  }
  const parts = task.replacements.map((item) => {
    return `${item.noun} wird ${item.pronoun}: ${item.case}, ${item.gender}, ${item.number}.`;
  });
  return `${parts.join(" ")} Richtiger Satz: ${task.correct}`;
}

function tickSpeedTimer() {
  state.speedTimeLeft -= 1;
  els.timerBox.textContent = `${state.speedTimeLeft}s`;
  if (state.speedTimeLeft <= 0) {
    stopSpeedTimer();
    state.bestSpeedModeScore = Math.max(state.bestSpeedModeScore, state.speedCorrect);
    saveProgress();
    showSpeedSummary();
  }
}

function stopSpeedTimer() {
  if (state.speedTimer) {
    window.clearInterval(state.speedTimer);
    state.speedTimer = null;
  }
}

function showSpeedSummary() {
  state.answered = true;
  els.gameOverPanel.classList.remove("hidden");
  els.gameOverPanel.querySelector("h2").textContent = "Zeit-Ergebnis";
  els.gameOverSummary.textContent = `Richtig: ${state.speedCorrect}. Falsch: ${state.speedWrong}. Bester Zeitwert: ${state.bestSpeedModeScore}.`;
  [...els.answerButtons.querySelectorAll(".answer-button")].forEach((button) => {
    button.disabled = true;
  });
}

function showGameOver() {
  els.gameOverPanel.classList.remove("hidden");
  els.gameOverPanel.querySelector("h2").textContent = "Spiel vorbei";
  const wrong = state.mistakeIds.length;
  const correct = state.completedTasks.length;
  els.gameOverSummary.textContent = `Punkte: ${state.score}. Gelöste Aufgaben: ${correct}. Gespeicherte Fehler: ${wrong}.`;
}

function restartGame() {
  stopSpeedTimer();
  state.score = 0;
  state.streak = 0;
  state.hearts = 3;
  state.speedCorrect = 0;
  state.speedWrong = 0;
  state.speedTimeLeft = 60;
  startMode(state.currentMode === "speed" ? "speed" : "classic");
}

function showEmptyMode() {
  state.currentTask = null;
  els.originalSentence.textContent = "Hier gibt es noch keine Aufgaben.";
  els.nanoContext.textContent = "";
  els.nanoContext.classList.add("hidden");
  els.tagList.innerHTML = "";
  els.answerButtons.innerHTML = "";
  els.hintButton.classList.add("hidden");
  hideFeedback();
}

function unlockNextLevel() {
  const count = state.correctCountByLevel[state.currentLevel] || 0;
  if (count >= 8 && state.currentLevel < 8) {
    state.levelUnlocked = Math.max(state.levelUnlocked, state.currentLevel + 1);
  }
}

function trackWeakSpots(task) {
  const tags = new Set();
  task.modeTags.forEach((tag) => {
    if (["nominativ", "akkusativ", "dativ", "formal", "plural", "preposition", "twoObjects"].includes(tag)) {
      tags.add(tag);
    }
  });
  task.replacements.forEach((item) => {
    const key = item.case.toLowerCase();
    if (["nominativ", "akkusativ", "dativ"].includes(key)) {
      tags.add(key);
    }
  });
  tags.forEach((tag) => {
    state.weakSpots[tag] = (state.weakSpots[tag] || 0) + 1;
  });
}

function updateStats() {
  els.scoreLabel.textContent = state.score;
  els.streakLabel.textContent = state.streak;
  const heartsText = state.currentMode === "speed" ? "∞" : "♥ ".repeat(Math.max(state.hearts, 0)).trim();
  els.heartsLabel.textContent = heartsText;
  els.levelDescription.textContent = levelDescriptions[state.currentLevel];
  renderWeakSpots();
  renderModeButtonsState();
  renderLevelButtonsState();
}

function loadTheme() {
  state.theme = localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  applyTheme();
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, state.theme);
  applyTheme();
}

function applyTheme() {
  const isDark = state.theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
  document.documentElement.classList.toggle("dark-theme", isDark);
  els.themeToggle.textContent = isDark ? "Hell" : "Dunkel";
  els.themeToggle.setAttribute("aria-pressed", String(isDark));
}

function setControlsLayout() {
  els.controlsDisclosure.open = !window.matchMedia("(max-width: 820px)").matches;
}

function renderModeButtonsState() {
  [...els.modeButtons.querySelectorAll(".mode-button")].forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.currentMode);
  });
}

function renderLevelButtonsState() {
  [...els.levelButtons.querySelectorAll(".level-button")].forEach((button) => {
    const level = Number(button.textContent);
    button.classList.toggle("active", level === state.currentLevel);
    button.classList.toggle("locked", level > state.levelUnlocked);
  });
}

function renderWeakSpots() {
  const entries = Object.entries(state.weakSpots).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) {
    els.weakSpotStats.textContent = "Noch keine Fehler.";
    return;
  }

  els.weakSpotStats.innerHTML = "";
  entries.forEach(([tag, count]) => {
    const chip = document.createElement("span");
    chip.className = "weak-chip";
    chip.textContent = `${formatTag(tag)}: ${count} Fehler`;
    els.weakSpotStats.appendChild(chip);
  });
}

function renderCheatSheet() {
  els.cheatSheetContent.innerHTML = `
    <div class="cheat-grid">
      <div class="cheat-block">
        <h3>Nominativ</h3>
        <p>ich, du, er, sie, es, wir, ihr, sie, Sie</p>
      </div>
      <div class="cheat-block">
        <h3>Akkusativ</h3>
        <p>mich, dich, ihn, sie, es, uns, euch, sie, Sie</p>
      </div>
      <div class="cheat-block">
        <h3>Dativ</h3>
        <p>mir, dir, ihm, ihr, ihm, uns, euch, ihnen, Ihnen</p>
      </div>
    </div>
    <ul class="note-list">
      <li>sehen, kaufen, finden, besuchen brauchen meistens Akkusativ.</li>
      <li>helfen, danken, antworten, gehören brauchen Dativ.</li>
      <li>mit, zu, bei, von stehen immer mit Dativ.</li>
      <li>für, ohne, gegen, durch stehen immer mit Akkusativ.</li>
    </ul>
  `;
}

function saveProgress() {
  const data = {
    totalScore: state.score,
    completedTasks: state.completedTasks,
    mistakeIds: state.mistakeIds,
    bestStreak: state.bestStreak,
    bestSpeedModeScore: state.bestSpeedModeScore,
    levelUnlocked: state.levelUnlocked,
    correctCountByLevel: state.correctCountByLevel,
    weakSpots: state.weakSpots
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    state.score = data.totalScore || 0;
    state.completedTasks = data.completedTasks || [];
    state.mistakeIds = data.mistakeIds || [];
    state.bestStreak = data.bestStreak || 0;
    state.bestSpeedModeScore = data.bestSpeedModeScore || 0;
    state.levelUnlocked = data.levelUnlocked || 1;
    state.correctCountByLevel = data.correctCountByLevel || {};
    state.weakSpots = data.weakSpots || {};
  } catch (error) {
    console.warn("Could not load progress.", error);
  }
}

function resetProgress() {
  const confirmed = window.confirm("Punkte, Stufen, Fehlerliste und schwache Stellen löschen?");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  state.currentLevel = 1;
  state.currentMode = "classic";
  state.score = 0;
  state.streak = 0;
  state.hearts = 3;
  state.mistakeIds = [];
  state.completedTasks = [];
  state.correctCountByLevel = {};
  state.weakSpots = {};
  state.levelUnlocked = 1;
  state.bestStreak = 0;
  state.bestSpeedModeScore = 0;
  startMode("classic");
}

function handleKeyboard(event) {
  const key = event.key.toLowerCase();
  const answerIndex = ["a", "b", "c", "d"].indexOf(key);
  if (answerIndex >= 0) {
    checkAnswer(answerIndex);
  }
  if (event.key === "Enter" && state.answered) {
    nextTask();
  }
}

function isMobileLayout() {
  return window.matchMedia("(max-width: 820px)").matches;
}

function handleMobileHelpClick(event) {
  const target = event.target.closest("[data-help]");
  if (!target || !isMobileLayout()) return;
  if (helpBypassTarget === target) {
    helpBypassTarget = null;
    return;
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  pendingHelpAction = target;
  showHelpDialog(target.dataset.help);
}

function showHelpDialog(text) {
  els.helpDialogText.textContent = text;
  els.helpDialog.classList.remove("hidden");
  els.helpDialogOk.focus();
}

function confirmHelpDialog() {
  els.helpDialog.classList.add("hidden");
  const target = pendingHelpAction;
  pendingHelpAction = null;
  if (!target || target.disabled || !document.body.contains(target)) return;
  helpBypassTarget = target;
  target.click();
}

function handleHelpHover(event) {
  const target = event.target.closest("[data-help]");
  if (!target || isMobileLayout()) return;
  showHelpTooltip(target, target.dataset.help);
}

function showHelpTooltip(target, text) {
  const rect = target.getBoundingClientRect();
  els.helpTooltip.textContent = text;
  els.helpTooltip.classList.remove("hidden");
  const tooltipRect = els.helpTooltip.getBoundingClientRect();
  const top = Math.max(8, rect.top - tooltipRect.height - 8);
  const left = Math.min(window.innerWidth - tooltipRect.width - 8, Math.max(8, rect.left));
  els.helpTooltip.style.top = `${top}px`;
  els.helpTooltip.style.left = `${left}px`;
}

function hideHelpTooltip() {
  els.helpTooltip.classList.add("hidden");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function unique(array) {
  return [...new Set(array)];
}

function formatTag(tag) {
  const labels = {
    nominativ: "Nominativ",
    akkusativ: "Akkusativ",
    dativ: "Dativ",
    formal: "Formell",
    plural: "Plural",
    preposition: "Präposition",
    twoObjects: "Zwei Objekte"
  };
  return labels[tag] || tag;
}

document.addEventListener("DOMContentLoaded", initApp);

