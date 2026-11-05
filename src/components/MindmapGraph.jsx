import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { levelColor } from '../lib/kanji'

const WIDTH = 900
const HEIGHT = 620

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
    const link = g.append('g').attr('class', 'mindmap-links').selectAll('line').data(links || []).join('line')
      .attr('stroke', '#cfccc4').attr('stroke-width', 1.5).attr('class', 'mindmap-link')
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
        link.attr('x1', d => (d.source.x ?? d.x)).attr('y1', d => (d.source.y ?? d.y))
           .attr('x2', d => (d.target.x ?? d.x)).attr('y2', d => (d.target.y ?? d.y))
        node.attr('transform', d => `translate(${d.x},${d.y})`)
        node.select('circle').attr('r', 20).attr('fill', n => levelColor(n.jlpt))
        node.select('text').attr('x', 0).attr('y', 0).text(n => n.kanji)
      })
      .on('end', () => {
        link.attr('x1', d => (d.source.x ?? d.x)).attr('y1', d => (d.source.y ?? d.y))
           .attr('x2', d => (d.target.x ?? d.x)).attr('y2', d => (d.target.y ?? d.y))
        node.attr('transform', d => `translate(${d.x},${d.y})`)
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
