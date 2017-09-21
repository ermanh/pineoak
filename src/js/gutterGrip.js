const d3 = require('d3')

const gutterCircles = function () {
  let x = 3.3
  let y = 3
  const column1 = Array(10).fill(0).map(n => {
    let coords = { x: x, y: y, r: 1 }
    y += 4
    return coords
  })
  const column2 = column1.map(coords => { return { x: 6.7, y: coords.y, r: coords.r } })
  return column1.concat(column2)
}

export function drawGutterGrip () {
  d3.select('.gutter-horizontal')
    .append('svg')
    .attr('transform', 'translate(0,80)')
    .attr('height', '42').attr('width', '10')
    .selectAll('circle.gutter-grip')
    .data(gutterCircles())
    .enter()
      .append('circle')
      .attr('class', 'gutter-grip')
      .attr('cx', function (d) { return d.x })
      .attr('cy', function (d) { return d.y })
      .attr('r', function (d) { return d.r })
      .attr('fill', 'var(--acorn-gray-L1)')
}
