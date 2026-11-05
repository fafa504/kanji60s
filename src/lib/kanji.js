const JLPT_ORDER = ['N5', 'N4', 'N3', 'N2', 'N1']

let cache = null

export async function getKanjiData() {
  if (cache) return cache
  const res = await fetch('/kanji-data.json')
  if (!res.ok) throw new Error('Failed to load kanji data')
  cache = await res.json()
  return cache
}

export function levelName(jlpt) {
  if (!jlpt) return '—'
  return `N${jlpt}`
}

export function levelColor(jlpt) {
  const map = { 5: '#2ecc71', 4: '#16a085', 3: '#3498db', 2: '#9b59b6', 1: '#e74c3c' }
  return map[jlpt] || '#888'
}

export function allLevels(data) {
  const set = new Set()
  data.forEach(k => { if (k.jlpt) set.add(`N${k.jlpt}`) })
  return JLPT_ORDER.filter(l => set.has(l))
}

export function kanjiByKanjiChar(data, char) {
  if (!char) return undefined
  const found = data.find(k => k.kanji === char)
  return found && !found.error ? found : undefined
}

export function searchKanji(data, query) {
  const q = (query || '').trim()
  if (!q) return []
  const needle = q.toLowerCase()
  const out = []
  for (const k of data) {
    const hay = [k.kanji, k.heisig, ...(k.meanings || []).map(m => m.toLowerCase())]
      .join(' ').toLowerCase()
    if (hay.includes(needle)) out.push(k)
  }
  return out.slice(0, 24)
}

export function kanjiByLevel(data, level) {
  if (!level) return data
  const code = level.startsWith('N') ? level : `N${level}`
  const n = code.replace('N', '')
  const filtered = data.filter(k => k.jlpt && Number(k.jlpt) === Number(n))
  // keep entries without jlpt at the end (extras / non-joyo)
  return [...filtered, ...data.filter(k => !k.jlpt)]
}

export function kanjiByStrokeRange(data, { min, max } = {}) {
  const minS = min === '' || min === null ? 1 : Number(min)
  const maxS = max === '' || max === null ? 999 : Number(max)
  return data.filter(k => {
    const s = k.stroke_count || 0
    return s >= minS && s <= maxS
  })
}

export function formatReadings(k) {
  const on = (k.on_readings || []).map(r => r.replace(/[0-9]/g, '')).join(', ')
  const kun = (k.kun_readings || []).map(r => r.replace(/[0-9]/g, '')).join(', ')
  return { on, kun }
}
