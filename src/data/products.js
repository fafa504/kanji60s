export const tiers = [
  {
    name: '1 month',
    fit: 'Great to try the visual method.',
    price: '$19',
    old: '$25',
    badge: '🔥 Try it',
    features: [
      { ok: true, text: '2,136 kanji' },
      { ok: true, text: 'Kanji mindmap N4 + N5' },
      { ok: true, text: 'Kanji flashcards' },
      { ok: true, text: 'Kanji exercises' },
      { ok: false, text: 'Vocabulary flashcards' },
      { ok: false, text: 'Grammar flashcards' },
      { ok: false, text: 'Updated content' },
    ],
  },
  {
    name: '6 months',
    fit: 'Good to build a stable JLPT foundation.',
    price: '$89',
    old: '$119',
    badge: '⭐ Recommended',
    featured: true,
    features: [
      { ok: true, text: '2,136 kanji' },
      { ok: true, text: 'Kanji mindmap N4 + N5' },
      { ok: true, text: 'Kanji flashcards' },
      { ok: true, text: 'Kanji exercises' },
      { ok: true, text: 'Vocabulary N5-N1' },
      { ok: true, text: 'Grammar N5-N1' },
      { ok: false, text: 'Vocabulary + grammar exercises' },
    ],
  },
  {
    name: '12 months',
    fit: 'Best for serious learners going from N5 to N1.',
    price: '$149',
    old: '$199',
    badge: '💎 Best value',
    features: [
      { ok: true, text: '2,136 kanji' },
      { ok: true, text: 'Kanji mindmap N4 + N5' },
      { ok: true, text: 'Kanji flashcards' },
      { ok: true, text: 'Kanji exercises' },
      { ok: true, text: 'Vocabulary N5-N1' },
      { ok: true, text: 'Grammar N5-N1' },
      { ok: true, text: 'Vocabulary + grammar exercises' },
      { ok: true, text: 'Updated content' },
    ],
  },
]

export default tiers
