import { useEffect, useMemo, useState } from 'react'
import { getKanjiData, levelColor, kanjiByLevel } from '../lib/kanji'
import MindmapGraph from '../components/MindmapGraph'
import KanjiModal from '../components/KanjiModal'

function sharesMeaning(a, b) {
  const aM = new Set((a.meanings || []).map(m => m.toLowerCase()))
  const bM = new Set((b.meanings || []).map(m => m.toLowerCase()))
  for (const m of aM) if (bM.has(m)) return true
  return false
}

export default function Mindmap() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState('N5')
  const [focus, setFocus] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getKanjiData().then(d => { setData(d); setLoading(false) })
  }, [])

  const related = useMemo(() => {
    if (!focus) return []
    const out = []
    for (const k of data) {
      if (k.kanji === focus.kanji) continue
      if (sharesMeaning(k, focus)) out.push(k)
    }
    return out
  }, [data, focus])

  const nodes = useMemo(() => {
    if (focus) {
      const map = new Map([[focus.kanji, focus]])
      for (const k of related) if (!map.has(k.kanji)) map.set(k.kanji, k)
      return [...map.values()].slice(0, 80)
    }
    const list = kanjiByLevel(data, level)
    return list.slice(0, 120)
  }, [data, focus, related, level])

  if (loading) return <div className="container section"><p>Loading mindmap…</p></div>

  return (
    <div className="container section">
      <h1>Kanji Mindmap</h1>
      <p className="lead">Visual connections between kanji, built from shared meanings.</p>

      <div className="mindmap-controls">
        <label>
          Level
          <select value={level} onChange={e => { setLevel(e.target.value); setFocus(null) }}>
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
            <option value="All">All</option>
          </select>
        </label>
        <label>
          Focus kanji
          <select value={focus ? focus.kanji : ''} onChange={e => { setFocus(e.target.value ? data.find(k => k.kanji === e.target.value) : null) }}>
            <option value="">Auto (level set)</option>
            {data.filter(k => !k.error).map(k => <option key={k.kanji} value={k.kanji}>{k.kanji} — {k.meanings?.[0] || ''}</option>)}
          </select>
        </label>
        {focus && (
          <button className="btn btn-outline" onClick={() => setFocus(null)}>Reset view</button>
        )}
      </div>

      {focus ? (
        <p style={{ color: 'var(--muted)' }}>
          Mindmap around <strong style={{ color: focus.jlpt ? `var(--level-n${focus.jlpt})` : undefined }}>{focus.kanji}</strong> — {focus.meanings?.[0] || ''}.
        </p>
      ) : null}

      <div className="mindmap-wrap">
        <MindmapGraph nodes={nodes} selected={focus} onSelect={setSelected} />
      </div>

      <div className="legend">
        {['N5', 'N4', 'N3', 'N2', 'N1'].map(l => (
          <span key={l} className="legend-item"><span className="legend-dot" style={{ background: levelColor(Number(l.slice(1))) }} />{l}</span>
        ))}
      </div>

      {selected && (
        <KanjiModal kanji={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
