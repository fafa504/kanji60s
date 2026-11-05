import { useEffect, useMemo, useState } from 'react'
import { getKanjiData, levelName, levelColor, searchKanji, kanjiByLevel } from '../lib/kanji'

export default function Kanji() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('')
  const [strokeMin, setStrokeMin] = useState('')
  const [strokeMax, setStrokeMax] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getKanjiData()
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const levels = useMemo(() => {
    const set = new Set()
    data.forEach(k => { if (k.jlpt) set.add(`N${k.jlpt}`) })
    return ['N5', 'N4', 'N3', 'N2', 'N1'].filter(l => set.has(l))
  }, [data])

  const results = useMemo(() => {
    let list = data
    if (level) list = kanjiByLevel(list, level)
    if (strokeMin || strokeMax) {
      const minS = strokeMin === '' ? 1 : Number(strokeMin)
      const maxS = strokeMax === '' ? 999 : Number(strokeMax)
      list = list.filter(k => { const s = k.stroke_count || 0; return s >= minS && s <= maxS })
    }
    const searched = query ? searchKanji(list, query) : list
    return searched
  }, [data, level, strokeMin, strokeMax, query])

  if (loading) return <div className="container section"><p>Loading kanji…</p></div>

  return (
    <div className="container section">
      <h1>JLPT Kanji</h1>
      <p className="lead">Browse the Joyo kanji list by level, stroke count or keyword.</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search kanji or meaning…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ minWidth: 220 }}
        />
        <select value={level} onChange={e => setLevel(e.target.value)}>
          <option value="">All levels</option>
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <input type="number" placeholder="Min strokes" value={strokeMin} onChange={e => setStrokeMin(e.target.value)} style={{ width: 90 }} />
        <input type="number" placeholder="Max strokes" value={strokeMax} onChange={e => setStrokeMax(e.target.value)} style={{ width: 90 }} />
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>{results.length} kanji</span>
      </div>

      {results.length === 0 ? (
        <p>No kanji found.</p>
      ) : (
        <div className="kanji-grid">
          {results.map(k => (
            <div key={k.kanji} className="kanji-tile" onClick={() => setSelected(k)} title={k.meanings?.join(', ')}>
              <span className="k">{k.kanji}</span>
              <span className="m">{k.meanings?.[0] || ''}</span>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="modal-kanji" style={{ color: levelColor(selected.jlpt) }}>{selected.kanji}</div>
            <div className="modal-level">{levelName(selected.jlpt)} · {selected.stroke_count} strokes</div>
            <h3>Meanings</h3>
            <p>{selected.meanings?.join(', ')}</p>
            <h3>Readings</h3>
            <p>On: {selected.on_readings?.join(', ')}<br />Kun: {selected.kun_readings?.join(', ')}</p>
            {selected.heisig && <p><em>{selected.heisig}</em></p>}
          </div>
        </div>
      )}
    </div>
  )
}
