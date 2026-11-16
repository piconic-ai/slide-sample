// Shows whether each request to another host went through, beside the host
// the Slide viewer is expected to list for these slides.
const rows = document.querySelector('#results')

function show(item, host, result) {
  const row = document.createElement('tr')
  for (const text of [item, host, result]) {
    const cell = document.createElement('td')
    cell.textContent = text
    row.append(cell)
  }
  rows.append(row)
}

const image = document.querySelector('#image')
const imageLoaded = () =>
  show('画像', 'avatars.githubusercontent.com', image.naturalWidth > 0 ? '読めた' : '読めない')
if (image.complete) imageLoaded()
else {
  image.addEventListener('load', imageLoaded)
  image.addEventListener('error', imageLoaded)
}

show('script', 'cdn.jsdelivr.net', typeof window.confetti === 'function' ? '読めた' : '読めない')

document.fonts.ready.then(() => {
  const loaded = [...document.fonts].some(
    (font) => font.family.includes('Zen Maru Gothic') && font.status === 'loaded',
  )
  show('フォントの CSS', 'fonts.googleapis.com', document.styleSheets.length > 1 ? '読めた' : '読めない')
  show('フォント', 'fonts.gstatic.com', loaded ? '読めた' : '読めない')
})

fetch('https://api.github.com/zen').then(
  (response) => show('API の呼び出し', 'api.github.com', `応答あり (${response.status})`),
  () => show('API の呼び出し', 'api.github.com', '読めない'),
)
