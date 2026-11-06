# slide-sample

Sample decks for [Slide](https://github.com/piconic-ai/slide). A push to
`main` uploads them with the Slide GitHub Action as private drafts; the owner
checks a draft and publishes it from the Slide management screen.

| Deck ID | Source | What it shows |
| --- | --- | --- |
| `sample-static` | `decks/static/` | Hand-written HTML with relative and root-relative CSS and images, module scripts, a directory index (`/appendix/`), and keyboard, click and swipe navigation |
| `sample-twin` | `decks/twin/` | The same paths as `sample-static` (`/index.html`, `/assets/style.css`, `/images/flow.svg`) with different contents, and an on-screen isolation check at `/checks/` |
| `sample-marp` | `decks/marp/slides.md` | Markdown built to HTML with Marp in CI, with an image next to it |

## Set up

1. Sign in to Slide as the owner and connect this repository to the decks
   `sample-static`, `sample-twin` and `sample-marp`, allowing the `main`
   branch.
2. Push to `main`, or run the `Upload slides` workflow from the Actions tab.
3. Open each deck in the management screen, check the draft with the
   owner-only preview, and publish it. The share URL is
   `https://slide.piconic.ai/@<handle>/<deck ID>`.

## Checks these decks support

These follow the acceptance criteria of
[F03](https://github.com/piconic-ai/slide/issues/5).

- **Files load as written.** In `sample-static`, the dark theme, the diagram,
  the page number and the appendix link all work. Every slide is reachable by
  keyboard, click and swipe.
- **Decks never mix bytes.** Open `sample-static` and `sample-twin` one after
  the other. `sample-static` is dark with a teal diagram; `sample-twin` is
  light with an orange diagram labeled "twin". Seeing the other deck's colors
  or diagram means bytes were mixed.
- **Replacing a public version.** Change a slide in `decks/static/`, push,
  and publish the new version. The share URL opens the new text, and the old
  version's own URL (`https://d-<old deployment ID>.<content domain>/`) stops
  answering, even right after it was opened.
- **Stopping publication.** Stop `sample-static` in the management screen.
  The share URL and the deployment's own URLs, including
  `/assets/style.css`, stop answering.
- **Author JS stays isolated.** Open `/checks/` from the `sample-twin` viewer
  on each device. The table shows each result next to what is expected; the
  buttons must not open a tab, leave the viewer, or submit the form.

## Look at a deck locally

Serve a deck from its root, because the decks use root-relative paths:

```sh
npx --yes serve decks/static
```

Build the Marp deck with:

```sh
npx --yes @marp-team/marp-cli@4.5.1 decks/marp/slides.md --output dist/marp/index.html
```
