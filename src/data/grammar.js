// Curated JLPT grammar points (English UI).
const grammar = [
  { id: 1, level: 'N5', category: 'Sentence patterns', name: 'Is / am / are (です)', description: 'Basic copula used to link a noun or adjective to a subject.', example: '私は学生です。', translation: 'I am a student.' },
  { id: 2, level: 'N5', category: 'Particles', name: 'は (wa) — topic marker', description: 'Marks the topic of the sentence.', example: 'これは本です。', translation: 'This is a book.' },
  { id: 3, level: 'N5', category: 'Particles', name: 'が (ga) — subject marker', description: 'Marks the subject, often used for new info.', example: '雨が降っています。', translation: 'It is raining.' },
  { id: 4, level: 'N5', category: 'Particles', name: 'を (o) — object marker', description: 'Marks the object of a verb.', example: 'りんごを食べます。', translation: 'I eat an apple.' },
  { id: 5, level: 'N5', category: 'Verbs', name: 'です / ます (polite)', description: 'Polite present tense ending.', example: '毎日勉強します。', translation: 'I study every day.' },
  { id: 6, level: 'N4', category: 'Te-form', name: '～て-form basics', description: 'Connect verbs/adjectives into chains, e.g. for requests or descriptions.', example: '友達と映画を見て、楽しいです。', translation: 'I watched a movie with a friend and it was fun.' },
  { id: 7, level: 'N4', category: 'Te-form', name: '～ない form (negative)', description: 'Regular negation: drop the ます and add ない.', example: '行きません。', translation: 'I do not go.' },
  { id: 8, level: 'N4', category: 'Adjectives', name: 'い-adjectives', description: 'Adjectives conjugated with い; negative uses くない.', example: '高いです。', translation: 'It is expensive.' },
  { id: 9, level: 'N4', category: 'Adjectives', name: 'い-adjectives (past)', description: 'Past tense changes the final い to かった.', example: '安かったです。', translation: 'It was cheap.' },
  { id: 10, level: 'N3', category: 'Verbs', name: 'Past / negative polite forms', description: 'Polite past: verb stem + ました. Negative: verb stem + ません.', example: '昨日映画を見ました。', translation: 'I watched a movie yesterday.' },
  { id: 11, level: 'N3', category: 'Te-form', name: '～てください (please do)', description: 'Polite request using the て-form.', example: '静かにしてください。', translation: 'Please be quiet.' },
  { id: 12, level: 'N3', category: 'Negation', name: 'Double negation', description: 'Use ない twice for emphasis or standard negation with auxiliaries.', example: '分からない。', translation: 'I do not know.' },
  { id: 13, level: 'N3', category: 'Particles', name: 'に (ni) — target / point in time', description: 'Indicates direction, target, or point in time.', example: '学校に行きます。', translation: 'I go to school.' },
  { id: 14, level: 'N3', category: 'Particles', name: 'で (de) — location / agent', description: 'Indicates place of action or agent doing the action.', example: '東京で働いています。', translation: 'I work in Tokyo.' },
  { id: 15, level: 'N3', category: 'Counters', name: 'Counter for people (人)', description: '人 counts people; small numbers use 一人 (hitori), two use 二人 (futari).', example: '三人います。', translation: 'There are three people.' },
  { id: 16, level: 'N2', category: 'Te-form', name: '～てから (after doing)', description: 'Indicates sequence: do A, then B.', example: '朝ご飯を食べてから学校へ行きます。', translation: 'After eating breakfast, I go to school.' },
  { id: 17, level: 'N2', category: 'Conditionals', name: 'If (と / たら)', description: 'たら is the natural conditional "if".', example: '時間があったら遊びに行きます。', translation: 'If I have time, I will go play.' },
  { id: 18, level: 'N2', category: 'Volitional', name: 'ましょう (let us)', description: 'Suggests or invites an action.', example: '一緒に映画を見ましょう。', translation: "Let's watch a movie together." },
  { id: 19, level: 'N2', category: 'Passive / causative', name: 'Passive and causative forms', description: 'Passive: verb stem + れる / られる. Causative: + せる / させる.', example: '友達に見られました。', translation: 'I was seen by a friend.' },
  { id: 20, level: 'N2', category: 'Quotations', name: 'Quoted speech', description: 'Insert quotes with は...と言いました.', example: '彼は「疲れた」と言いました。', translation: 'He said, "I am tired."'},
  { id: 21, level: 'N1', category: 'Conditionals', name: 'If (ば / 条件)', description: 'ば expresses a general condition.', example: '雨が降れば試合は中止です。', translation: 'If it rains, the game is cancelled.' },
  { id: 22, level: 'N1', category: 'Formal', name: 'Formal polite forms', description: 'Use です/ます for neutral politeness; humble forms end with ます, humble with ます.', example: '申し訳ありません。', translation: 'I am sorry (formal).' },
  { id: 23, level: 'N1', category: 'Complex sentences', name: 'Relative clauses', description: 'Modifies nouns: 私は日本人 [の]だ.', example: '私は日本語がとても好きです。', translation: 'I really like Japanese.' },
  { id: 24, level: 'N1', category: 'Imperatives', name: 'Polite imperatives', description: 'Soft commands end with ください or なさい.', example: '座ってください。', translation: 'Please sit down.' },
]

export default grammar
