// Tries what a hostile deck would try and shows each result beside what the
// Slide viewer is expected to allow. Nothing here reports anywhere.
const rows = document.querySelector('#results')

function show(item, result, expected) {
  const row = document.createElement('tr')
  for (const text of [item, result, expected]) {
    const cell = document.createElement('td')
    cell.textContent = text
    row.append(cell)
  }
  rows.append(row)
}

show('表示している origin', location.origin, 'd-<deployment ID>.<配信ドメイン>')
show(
  '置かれている場所',
  window === top ? 'トップレベル' : 'viewer の iframe の中',
  'viewer の iframe の中',
)
show('読める cookie', document.cookie || '（なし）', '（なし）')

try {
  localStorage.setItem('slide-sample', 'ok')
  show('この origin の localStorage', localStorage.getItem('slide-sample') ?? '読めない', 'ok')
} catch (error) {
  show('この origin の localStorage', `使えない: ${error.message}`, 'ok')
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js').then(
    () => show('service worker の登録', '登録できた', '拒否される'),
    (error) => show('service worker の登録', `拒否: ${error.message}`, '拒否される'),
  )
} else {
  show('service worker の登録', 'この環境では使えない', '拒否される')
}

fetch('https://slide.piconic.ai/api/decks', { credentials: 'include' }).then(
  (response) => show('管理 API の読み取り', `読めた (${response.status})`, '読めない'),
  () => show('管理 API の読み取り', '読めない', '読めない'),
)

document.querySelector('#popup').addEventListener('click', () => {
  let opened = null
  try {
    opened = window.open(location.href)
  } catch {}
  show('別のタブ', opened ? '開いた' : '開かない', '開かない')
})

document.querySelector('#top').addEventListener('click', () => {
  try {
    top.location.href = location.href
    show('viewer の外への移動', '移動を試みた（画面が変わらなければ止められている）', '移動しない')
  } catch (error) {
    show('viewer の外への移動', `止められた: ${error.message}`, '移動しない')
  }
})
