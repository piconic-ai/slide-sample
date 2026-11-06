/** The zero-based page a hash such as `#3` names; the first page otherwise. */
export function pageFromHash(hash) {
  const page = Number.parseInt(hash.slice(1), 10)
  return Number.isInteger(page) && page > 0 ? page - 1 : 0
}

/** Moves between pages with the keyboard, a click or tap, and a swipe. */
export function startNavigation({ next, previous }) {
  addEventListener('keydown', (event) => {
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)) next()
    if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) previous()
  })
  addEventListener('click', (event) => {
    if (event.target.closest('a')) return
    if (event.clientX < innerWidth / 3) previous()
    else next()
  })
  let startX = null
  addEventListener('touchstart', (event) => {
    startX = event.touches[0]?.clientX ?? null
  })
  addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0]?.clientX
    if (startX === null || endX === undefined) return
    if (endX - startX < -50) next()
    if (endX - startX > 50) previous()
    startX = null
  })
}
