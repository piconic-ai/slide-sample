import { pageFromHash, startNavigation } from './nav.js'

// Shows one section at a time and keeps the page number in the URL hash,
// so a reader can reload or share the page they are on.
const sections = [...document.querySelectorAll('#deck > section')]
const output = document.querySelector('#page')

function show(index) {
  const page = Math.min(Math.max(index, 0), sections.length - 1)
  sections.forEach((section, i) => {
    section.hidden = i !== page
  })
  if (output) output.textContent = `${page + 1} / ${sections.length}`
  history.replaceState(null, '', `#${page + 1}`)
  return page
}

let current = show(pageFromHash(location.hash))
startNavigation({
  next: () => (current = show(current + 1)),
  previous: () => (current = show(current - 1)),
})
