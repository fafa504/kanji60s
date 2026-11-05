export default function KanjiModal({ kanji, onClose }) {
  if (!kanji) return null
  const level = kanji.jlpt ? `N${kanji.jlpt}` : ''
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-kanji" style={{ color: kanji.jlpt ? `var(--level-n${kanji.jlpt})` : undefined }}>{kanji.kanji}</div>
        <div className="modal-level">{level} · {kanji.stroke_count} strokes</div>
        <h3>Meanings</h3>
        <p>{kanji.meanings?.join(', ')}</p>
        <h3>Readings</h3>
        <p>On: {kanji.on_readings?.join(', ')}<br />Kun: {kanji.kun_readings?.join(', ')}</p>
        {kanji.heisig && <p><em>{kanji.heisig}</em></p>}
      </div>
    </div>
  )
}
