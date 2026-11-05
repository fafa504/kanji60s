import { useEffect, useMemo, useState } from 'react'
import { getKanjiData, kanjiByLevel } from '../lib/kanji'

export default function Exercises() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState('N5')
  const [mode, setMode] = useState('kanji-to-meaning')
  const [deck, setDeck] = useState([])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)

  useEffect(() => {
    getKanjiData().then(d => { setData(d); setLoading(false) })
  }, [])

  const levelKanji = useMemo(() => {
    if (!data.length) return []
    return kanjiByLevel(data, level).filter(k => !k.error)
  }, [data, level])

  useEffect(() => {
    setDeck(levelKanji.map(k => k.kanji))
    setIndex(0); setPicked(null); setScore(0); setRound(0)
  }, [levelKanji])

  const question = useMemo(() => {
    if (!deck.length) return null
    const target = levelKanji[index % levelKanji.length]
    if (mode === 'kanji-to-meaning') {
      const distractors = levelKanji
        .filter(k => k.kanji !== target.kanji && k.meanings?.[0] !== target.meanings?.[0])
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(k => k.kanji)
      const options = [target.kanji, ...distractors]
      return { type: 'kanji-to-meaning', target, options }
    }
    const distractors = levelKanji
      .filter(k => k.kanji !== target.kanji)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(k => ({ kanji: k.kanji, meaning: k.meanings?.[0] }))
    const options = [{ kanji: target.kanji, meaning: target.meanings?.[0] }, ...distractors]
    return { type: 'meaning-to-kanji', target, options }
  }, [levelKanji, index, mode])

  if (loading) return <div className="container section"><p>Loading exercises…</p></div>

  if (!question) return <div className="container section"><p>No exercises available for this level yet.</p></div>

  const correctAnswer = question.type === 'kanji-to-meaning'
    ? question.target.kanji
    : question.options.find(o => o.kanji === question.target.kanji)?.meaning

  const pick = (value) => {
    if (picked) return
    setPicked(value)
    const ok = question.type === 'kanji-to-meaning' ? value === question.target.kanji : question.options.find(o => o.kanji === value)?.meaning === question.target.meanings?.[0]
    if (ok) setScore(s => s + 1)
  }

  const next = () => { setPicked(null); setRound(r => r + 1); setIndex(i => (i + 1) % Math.max(deck.length, 1)) }

  const optionLabel = (o) => question.type === 'kanji-to-meaning' ? o : o.meaning

  return (
    <div className="container section">
      <h1>Exercises</h1>
      <p className="lead">Check your memory and reinforce what you learned.</p>

      <div className="filters">
        <select value={mode} onChange={e => { setMode(e.target.value); setIndex(0); setPicked(null) }}>
          <option value="kanji-to-meaning">Kanji → Meaning</option>
          <option value="meaning-to-kanji">Meaning → Kanji</option>
        </select>
        <select value={level} onChange={e => { setLevel(e.target.value); setIndex(0); setPicked(null); setScore(0) }}>
          {['N5', 'N4', 'N3', 'N2', 'N1', 'All'].map(l => <option key={l} value={l}>{l === 'All' ? 'All levels' : l}</option>)}
        </select>
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>Round {round + 1} · Score {score}</span>
      </div>

      <div className="card" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: 'var(--muted)' }}>
          {question.type === 'kanji-to-meaning' ? 'What does this kanji mean?' : `Which kanji means “${question.target.meanings?.[0]}”?`}
        </div>
        <div style={{ fontSize: 84, fontFamily: 'Noto Sans JP, serif', margin: '18px 0' }}>
          {question.type === 'kanji-to-meaning' ? question.target.kanji : question.options.find(o => o.kanji === question.target.kanji)?.meaning}
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          {question.options.map(o => {
            const value = question.type === 'kanji-to-meaning' ? o : o.kanji
            const isCorrect = picked && (question.type === 'kanji-to-meaning' ? o === question.target.kanji : o.meaning === question.target.meanings?.[0])
            const isWrong = picked && value !== correctAnswer && !isCorrect
            return (
              <button key={question.type + value} className={`quiz-option ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`} onClick={() => pick(value)} disabled={!!picked}>
                {optionLabel(o)}
              </button>
            )
          })}
        </div>
        {picked && (
          <div style={{ marginTop: 18, fontWeight: 600, color: picked === correctAnswer ? 'var(--ok, #27ae60)' : 'var(--bad, #e74c3c)' }}>
            {picked === correctAnswer ? '✅ Correct!' : '❌ Not quite.'}
            <div style={{ marginTop: 12 }}><button className="btn btn-primary" onClick={next}>Next</button></div>
          </div>
        )}
      </div>
    </div>
  )
}
