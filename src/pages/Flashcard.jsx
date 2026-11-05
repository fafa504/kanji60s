import { useEffect, useMemo, useState } from 'react'
import { getKanjiData, levelName, kanjiByLevel } from '../lib/kanji'

export default function Flashcard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState('N5')
  const [deck, setDeck] = useState([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    getKanjiData().then(d => {
      setData(d)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!data.length) return
    setDeck(kanjiByLevel(data, level).filter(k => !k.error).map(k => k.kanji))
    setIndex(0)
    setFlipped(false)
  }, [data, level])

  const card = useMemo(() => {
    if (!deck.length) return null
    return kanjiByLevel(data, level).find(k => k && k.kanji === deck[index]) || null
  }, [deck, index, data, level])

  if (loading) return <div className="container section"><p>Loading flashcards…</p></div>

  const next = () => { setFlipped(false); setIndex(i => (i + 1) % deck.length) }
  const prev = () => { setFlipped(false); setIndex(i => (i - 1 + deck.length) % deck.length) }

  if (!card) return <div className="container section"><p>No flashcards available for this level yet.</p></div>

  return (
    <div className="container section">
      <h1>Flashcard</h1>
      <p className="lead">Flip the card to reveal readings and remember the kanji through meaning.</p>

      <div className="filters">
        <select value={level} onChange={e => setLevel(e.target.value)}>
          {['N5', 'N4', 'N3', 'N2', 'N1', 'All'].map(l => <option key={l} value={l}>{l === 'All' ? 'All levels' : l}</option>)}
        </select>
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>Card {index + 1} / {deck.length}</span>
      </div>

      <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div>
              <div style={{ fontSize: 64, fontFamily: 'Noto Sans JP, serif' }}>{card.kanji}</div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>{card.meanings?.[0]}</div>
              <div style={{ color: 'var(--muted)' }}>{levelName(card.jlpt)}</div>
            </div>
          </div>
          <div className="flashcard-back">
            <div>
              <div style={{ fontSize: 44, fontFamily: 'Noto Sans JP, serif' }}>{card.kanji}</div>
              <div>{card.meanings?.join(', ')}</div>
              <div style={{ fontSize: 13, opacity: 0.9, marginTop: 8 }}>On: {card.on_readings?.join(', ')} · Kun: {card.kun_readings?.join(', ')}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
        <button className="btn btn-outline" onClick={prev}>Previous</button>
        <button className="btn btn-outline" onClick={() => setFlipped(f => !f)}>{flipped ? 'Hide' : 'Flip'}</button>
        <button className="btn btn-primary" onClick={next}>Next</button>
      </div>
    </div>
  )
}
