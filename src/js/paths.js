/* jshint esversion: 6 */

function adjustPathTopLength (deprelLayer) {
  const start = 0.6
  const max = 0.9
  let adjustment = start + 0.05 * (deprelLayer - 1)
  adjustment = (adjustment > max) ? max : adjustment
  return adjustment
}

export function getPath (deprelObj, fromElem, toElem, upOrDown, singleDeprelHeight, firstDeprelHeight) {
  const fromOrder = parseInt(fromElem.attr('order'))
  const fromStart = parseFloat(fromElem.select('text.word').attr('x'))
  const fromWidth = parseFloat(fromElem.attr('wordGroupWidth'))
  const toOrder = parseInt(toElem.attr('order'))
  const toStart = parseFloat(toElem.select('text.word').attr('x'))
  const toWidth = parseFloat(toElem.attr('wordGroupWidth'))
  const xReverse = fromOrder > toOrder
  const xDirection = xReverse ? -1 : 1
  const yDirection = (upOrDown === 'up') ? -1 : 1

  const fromMidPoint = fromStart + fromWidth / 2
  const toMidPoint = toStart + toWidth / 2
  const midPointsLength = Math.abs(fromMidPoint - toMidPoint)

  const pathStartX = xReverse ? toMidPoint : fromMidPoint
  const pathEndX = xReverse ? fromMidPoint : toMidPoint
  let pathStartEndY = parseFloat(fromElem.select('text.word').attr('y'))
  pathStartEndY = (yDirection === 1) ? pathStartEndY + 10 : pathStartEndY - 20

  const deprelLayer = Math.abs(fromOrder - toOrder)
  const pathHeight = (deprelLayer === 1) ? firstDeprelHeight - (singleDeprelHeight / 2) : firstDeprelHeight + singleDeprelHeight * (deprelLayer - 1) - singleDeprelHeight / 2
  const pathTopY = pathStartEndY + yDirection * pathHeight
  const pathTopLength = Math.abs(toMidPoint - fromMidPoint) * adjustPathTopLength(deprelLayer)
  const diagonalXLength = (midPointsLength - pathTopLength) / 2

  const distanceAtoB = 10 * deprelLayer // also the hypotenuse when calculating with sin/cos
  const pathBezierAngle = Math.atan(diagonalXLength / pathHeight)
  const pathStartBezierBX = xReverse ? pathStartX + diagonalXLength : pathStartX + diagonalXLength * xDirection
  const pathStartBezierCX = xReverse ? pathStartBezierBX + distanceAtoB : pathStartBezierBX + distanceAtoB * xDirection
  const pathStartBezierAX = xReverse ? pathStartBezierBX - Math.sin(pathBezierAngle) * distanceAtoB : pathStartBezierBX - Math.sin(pathBezierAngle) * distanceAtoB * xDirection
  const pathStartBezierAY = pathTopY + Math.cos(pathBezierAngle) * distanceAtoB * yDirection * -1

  const pathEndBezierBX = xReverse ? pathEndX - ((midPointsLength - pathTopLength) / 2) : pathEndX - (midPointsLength - pathTopLength) / 2 * xDirection
  const pathEndBezierAX = xReverse ? pathEndBezierBX - distanceAtoB : pathEndBezierBX - distanceAtoB * xDirection
  const pathEndBezierCX = xReverse ? pathEndBezierBX + Math.sin(pathBezierAngle) * distanceAtoB : pathEndBezierBX + Math.sin(pathBezierAngle) * distanceAtoB * xDirection
  const pathEndBezierCY = pathStartBezierAY

  let path = 'M' + pathStartX + ',' + pathStartEndY
  path += ' L' + pathStartBezierAX + ',' + pathStartBezierAY
  path += ' Q' + pathStartBezierBX + ',' + pathTopY + ' ' + pathStartBezierCX + ',' + pathTopY
  path += ' L' + pathEndBezierAX + ',' + pathTopY
  path += ' Q' + pathEndBezierBX + ',' + pathTopY + ' ' + pathEndBezierCX + ',' + pathEndBezierCY
  path += ' L' + pathEndX + ',' + pathStartEndY

  deprelObj.pathD = path
  deprelObj.topY = pathTopY
  deprelObj.topMidPointX = pathStartX + Math.abs(pathEndX - pathStartX) / 2
  deprelObj.arrowTipX = xReverse ? pathStartX : pathEndX
  deprelObj.arrowTipY = pathStartEndY
  deprelObj.pathAngleFromXAxis = Math.PI / 2 - pathBezierAngle
  deprelObj.pointsLeft = xReverse
  deprelObj.pointsUp = (upOrDown === 'up')

  return path
}

export function getDeprelPathArrow (deprelObj, pointsLeft, pointsUp) {
  // arrow shape of ➤  // A is the tip in front ◀ ▶
  // B, C are the outward points in the back (B is the one closer to the x-axis)
  // D is the inner corner in the back
  // E is the midpoint on a line drawn between B and C, behind D (not part of the arrow, but needed for calculation)
  const xDirection = pointsLeft ? 1 : -1
  const yDirection = pointsUp ? 1 : -1
  const angle = deprelObj.pathAngleFromXAxis
  const angleInnerHalf = Math.PI / 8.8
  const A = { x: deprelObj.arrowTipX, y: deprelObj.arrowTipY }
  const AE = 7.5
  const AD = AE / 1.8
  const D = { x: A.x + Math.cos(angle) * AD * xDirection, y: A.y - Math.sin(angle) * AD * yDirection }
  const AB = AE / Math.cos(angleInnerHalf)
  const AC = AB
  const B = { x: A.x + Math.cos(angle - angleInnerHalf) * AB * xDirection, y: A.y - Math.sin(angle - angleInnerHalf) * AB * yDirection }
  let C
  if (angle + angleInnerHalf === 90) {
    C = { x: A.x, y: A.y - AC * yDirection }
  } else if (angle + angleInnerHalf < 90) {
    C = { x: A.x + Math.cos(angle + angleInnerHalf) * AC * xDirection, y: A.y - Math.sin(angle + angleInnerHalf) * AC * yDirection }
  } else {
    C = { x: A.x - Math.cos(180 - (angle + angleInnerHalf)) * AC * xDirection, y: A.y - Math.sin(180 - (angle + angleInnerHalf)) * AC * yDirection }
  }

  let path = 'M' + A.x + ',' + A.y + ' L' + B.x + ',' + B.y
  path += ' L' + D.x + ',' + D.y + ' L' + C.x + ',' + C.y + ' Z'
  return path
}

export function getAlignmentPath (fromElem, toElem, upOrDown, alignmentsStartY, alignmentsHeight) {
  const adjustment = 4
  const fromStartX = parseFloat(fromElem.select('text.word').attr('x'))
  const fromWidth = parseFloat(fromElem.attr('wordGroupWidth'))
  const toStartX = parseFloat(toElem.select('text.word').attr('x'))
  const toWidth = parseFloat(toElem.attr('wordGroupWidth'))
  const isBase = (upOrDown === 'up') ? 0 : 1
  const isParallel = (upOrDown === 'up') ? 1 : 0
  const fromCoord = { x: fromStartX + fromWidth / 2, y: alignmentsStartY + alignmentsHeight * isBase }
  const toCoord = { x: toStartX + toWidth / 2, y: alignmentsStartY + alignmentsHeight * isParallel + adjustment }
  const path = 'M' + fromCoord.x + ',' + fromCoord.y + ' L' + toCoord.x + ',' + toCoord.y
  return path
}
