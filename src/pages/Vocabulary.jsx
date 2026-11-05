import { useState } from 'react'
import { vocabulary } from '../data/vocabulary'
import { levelName } from '../lib/kanji'

export default function Vocabulary() {
  const [level, setLevel] = useState('')
  const items = level ? vocabulary.filter(v => v.jlpt === Number(level.replace('N', ''))) : vocabulary

  return (
    <div className="container section">
      <h1>Vocabulary</h1>
      <p className="lead">Kanji-based words to learn the language the way real sentences use it.</p>
      <div className="filters">
        <select value={level} onChange={e => setLevel(e.target.value)}>
          <option value="">All levels</option>
          {['N5', 'N4', 'N3', 'N2', 'N1'].map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>{items.length} words</span>
      </div>
      <div className="grid grid-3">
        {items.map(v => (
          <div className="card" key={v.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 style={{ margin: 0, fontSize: 30, fontFamily: 'Noto Sans JP, serif' }}>{v.kanji}</h3>
              <span className="badge">{levelName(v.jlpt)}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{v.term}</div>
            <div style={{ color: 'var(--muted)', margin: '4px 0 10px' }}>{v.meaning}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>reading: {v.reading}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
