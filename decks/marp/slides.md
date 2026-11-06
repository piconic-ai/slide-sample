---
marp: true
theme: default
paginate: true
title: Markdown で書いたスライド
---

# Markdown で書いたスライド

作者側の CI で Marp を使って HTML にし、Slide に送りました。

---

## Slide はビルド方法を選びません

- 手書きの HTML
- Marp や reveal.js などのツールが出力した HTML
- どちらも同じ GitHub Action で送ります

---

## 画像も一緒に送れます

![共有 URL を開くと資料が表示される流れ](images/flow.svg)

---

## 読者はブラウザだけで読めます

共有 URL を開くと、この HTML がそのまま動きます。
