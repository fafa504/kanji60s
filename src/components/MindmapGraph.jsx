import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { levelColor } from '../lib/kanji'

const WIDTH = 900
const HEIGHT = 620

function linkPath(d) {
  const s = d.source
  const t = d.target
  const x0 = s.x, y0 = s.y, x1 = t.x, y1 = t.y
  const dx = Math.max(30, Math.abs(x1 - x0) * 0.5)
  return `M ${x0} ${y0} C ${x0 + dx} ${y0}, ${x1 - dx} ${y1}, ${x1} ${y1}`
}

export default function MindmapGraph({ nodes, links, selected, onSelect }) {
  const svgRef = useRef(null)
  const stateRef = useRef({ sim: null })

  const nodeKey = nodes.map(n => n.kanji).join(',')
  const linkKey = (links || []).map(l => `${l.source}-${l.target}`).join(',')

  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl) return
    const svg = d3.select(svgEl)
    svg.selectAll('*').remove()
    const g = svg.append('g').attr('class', 'mindmap-root')
    const link = g.append('g').attr('class', 'mindmap-links').selectAll('path').data(links || []).join('path')
      .attr('stroke', '#cfccc4').attr('stroke-width', 1.5).attr('class', 'mindmap-link').attr('d', d => linkPath(d))
    const node = g.append('g').attr('class', 'mindmap-nodes').selectAll('g').data(nodes).join('g')
      .attr('class', 'mindmap-node')
    node.on('click', (event, d) => {
      event.stopPropagation()
      if (onSelect) onSelect(d)
    })
    node.append('circle').attr('r', 20).attr('fill', d => levelColor(d.jlpt)).attr('class', 'mindmap-circle')
    node.append('text').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('class', 'mindmap-label')

    const sim = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links || []).id(d => d.kanji).distance(90))
      .force('charge', d3.forceManyBody().strength(-700))
      .force('center', d3.forceCenter(WIDTH / 2, HEIGHT / 2))
      .force('collide', d3.forceCollide(55))
      .on('tick', () => {
        link.attr('d', d => linkPath(d))
        node.attr('opacity', d => (selected && d.kanji === selected.kanji) ? 1 : 0.85)
        node.attr('transform', d => `translate(${d.x},${d.y})`)
        node.select('circle').attr('r', 20).attr('fill', n => levelColor(n.jlpt))
          .attr('stroke', n => (selected && n.kanji === selected.kanji) ? '#c0392b' : '#ffffff')
          .attr('stroke-width', n => (selected && n.kanji === selected.kanji) ? 3.5 : 2)
        node.select('text').attr('x', 0).attr('y', 0).text(n => n.kanji)
      })
      .on('end', () => {
        link.attr('d', d => linkPath(d))
        node.attr('opacity', d => (selected && d.kanji === selected.kanji) ? 1 : 0.85)
        node.attr('transform', d => `translate(${d.x},${d.y})`)
        node.select('circle').attr('r', 20).attr('fill', n => levelColor(n.jlpt))
          .attr('stroke', n => (selected && n.kanji === selected.kanji) ? '#c0392b' : '#ffffff')
          .attr('stroke-width', n => (selected && n.kanji === selected.kanji) ? 3.5 : 2)
        node.select('text').attr('x', 0).attr('y', 0).text(n => n.kanji)
      })
    stateRef.current = { sim }

    svg.call(
      d3.zoom().scaleExtent([0.15, 6]).on('zoom', (event) => {
        g.attr('transform', event.transform)
      })
    )
    svg.on('click', () => { if (onSelect) onSelect(null) })

    return () => {
      sim.stop()
      svg.selectAll('*').remove()
      stateRef.current = { sim: null }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeKey, linkKey])

  useEffect(() => {
    const { sim } = stateRef.current
    const target = selected ? nodes.find(n => n.kanji === selected.kanji) : null
    if (sim && target) {
      sim.force('center', d3.forceCenter(target.x, target.y))
      sim.alpha = 0.3
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <svg
      ref={svgRef}
      className="mindmap-svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Kanji mindmap"
    />
  )
}
