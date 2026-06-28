# satteri-photoswipe

A Satteri plugin that prepares Markdown images for PhotoSwipe.

This is a Satteri-native mirror of `@matfire/rehype-photoswipe`: it wraps each
`img` element in an anchor and adds `data-pswp-width` and `data-pswp-height`
attributes from `probe-image-size`.

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

## Releases

This package uses `brel` to generate release PRs from Conventional Commits.

The generated GitHub Actions workflow runs on pushes to `main` and creates a
`v{version}` tag when a managed release PR is merged. Configure the repository
secret `BREL_TAG_PUSH_TOKEN` with a token that can push tags.

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
