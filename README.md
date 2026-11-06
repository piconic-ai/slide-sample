# slide-sample

Sample decks for [Slide](https://github.com/piconic-ai/slide). A push to
`main` uploads them with the Slide GitHub Action as private drafts; the owner
checks a draft and publishes it from the Slide management screen.

| Deck ID | Source | What it shows |
| --- | --- | --- |
| `sample-static` | `decks/static/` | Hand-written HTML with relative and root-relative CSS and images, module scripts, a directory index (`/appendix/`), and keyboard, click and swipe navigation |
| `sample-marp` | `decks/marp/slides.md` | Markdown built to HTML with Marp in CI, with an image next to it |

## Set up

1. Sign in to Slide as the owner and connect this repository to the decks
   `sample-static` and `sample-marp`, allowing the `main` branch.
2. Push to `main`, or run the `Upload slides` workflow from the Actions tab.
3. Open each deck in the management screen, check the draft with the
   owner-only preview, and publish it. The share URL is
   `https://slide.piconic.ai/@<handle>/<deck ID>`.

To try replacing a public version, change a deck and push again, then publish
the new version. The share URL then opens the new version, and the old
version's own URL stops answering.

## Look at a deck locally

Serve `decks/static` from its root, because it uses root-relative paths:

```sh
npx --yes serve decks/static
```

Build the Marp deck with:

```sh
npx --yes @marp-team/marp-cli@4.5.1 decks/marp/slides.md --output dist/marp/index.html
```
