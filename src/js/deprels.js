const boxPaddingLeft = 3.5
const boxPaddingRight = 3.5
const boxPaddingTop = 4
const boxPaddingBottom = 3.5

export function getLabelX (deprelObj, getTextWidth, fontSpec) {
  const deprelText = deprelObj.deprel
  const textWidth = getTextWidth(deprelText, fontSpec)
  const midPoint = parseFloat(deprelObj.topMidPointX)
  const textX = midPoint - textWidth / 2 + 1
  const boxX = textX - boxPaddingLeft - 1
  const boxWidth = textWidth + boxPaddingLeft + boxPaddingRight
  return {
    textX: textX,
    boxX: boxX,
    boxWidth: boxWidth
  }
}

export function getLabelY (deprelObj, deprelTextHeight) {
  const yAdjust = 1
  const topY = parseFloat(deprelObj.topY)
  const textY = topY + deprelTextHeight / 2 - yAdjust
  const boxY = topY - boxPaddingTop - boxPaddingBottom - yAdjust
  const boxHeight = deprelTextHeight + boxPaddingTop + boxPaddingBottom
  return {
    textY: textY,
    boxY: boxY,
    boxHeight: boxHeight
  }
}
