# satteri-photoswipe

[![Open on npmx.dev](https://npmx.dev/api/registry/badge/version/@matfire/satteri-photoswipe)](https://npmx.dev/package/@matfire/satteri-photoswipe)
[![Open on npmx.dev](https://npmx.dev/api/registry/badge/license/@matfire/satteri-photoswipe)](https://npmx.dev/package/@matfire/satteri-photoswipe)

A Satteri plugin that prepares Markdown images for PhotoSwipe.

This is a Satteri-native mirror of [`@matfire/rehype-photoswipe`](https://npmx.dev/package/@matfire/rehype-photoswipe): it wraps each `img` element in an anchor and adds `data-pswp-width` and `data-pswp-height`
attributes from `probe-image-size` to use them with [photoswipe](https://photoswipe.com/)

## Install

```sh
npm install @matfire/satteri-photoswipe
```

## Usage

```js
import { markdownToHtml } from "satteri";
import satteriPhotoswipe from "@matfire/satteri-photoswipe";

const { html } = await markdownToHtml("![Alt](https://example.com/photo.jpg)", {
  hastPlugins: [satteriPhotoswipe],
});
```

V1 intentionally mirrors the upstream rehype plugin behavior. Image `src` values
are passed to `probe-image-size` as-is; relative image resolution and other
Satteri-specific options are not handled.

## Development

```sh
bun run hooks:install
bun run format:check
bun run lint
bun run typecheck
bun run test
```

Lefthook runs formatting, linting, and type checks before commits, tests before
pushes, and Commitlint against commit messages.
