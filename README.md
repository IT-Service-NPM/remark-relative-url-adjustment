# @it-service-npm/remark-relative-url-adjustment Remark plugin

[![GitHub release][github-release]][github-release-url]
[![NPM release][npm]][npm-url]
[![Node version][node]][node-url]
[![Dependencies status][deps]][deps-url]
[![Install size][size]][size-url]

[![CI Status][build]][build-url]
[![Tests Results][tests]][tests-url]
[![Coverage status][coverage]][coverage-url]

[![Semantic Versioning](https://img.shields.io/badge/Semantic%20Versioning-v2.0.0-green.svg?logo=semver)](https://semver.org/lang/ru/spec/v2.0.0.html)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-v1.0.0-yellow.svg?logo=git)](https://conventionalcommits.org)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

[![VS Code](https://img.shields.io/badge/Visual_Studio_Code-0078D4?logo=visual%20studio%20code)](https://code.visualstudio.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-333333.svg?logo=typescript)](http://www.typescriptlang.org/)
[![EditorConfig](https://img.shields.io/badge/EditorConfig-333333.svg?logo=editorconfig)](https://editorconfig.org)
[![ESLint](https://img.shields.io/badge/ESLint-3A33D1?logo=eslint)](https://eslint.org)

[github-release]: https://img.shields.io/github/v/release/IT-Service-NPM/remark-relative-url-adjustment.svg?sort=semver&logo=github

[github-release-url]: https://github.com/IT-Service-NPM/remark-relative-url-adjustment/releases

[npm]: https://img.shields.io/npm/v/@it-service-npm/remark-relative-url-adjustment.svg?logo=npm

[npm-url]: https://www.npmjs.com/package/@it-service-npm/remark-relative-url-adjustment

[node]: https://img.shields.io/node/v/@it-service-npm/remark-relative-url-adjustment.svg

[node-url]: https://nodejs.org

[deps]: https://img.shields.io/librariesio/release/npm/@it-service-npm/remark-relative-url-adjustment

[deps-url]: https://libraries.io/npm/@it-service-npm%2Fremark-relative-url-adjustment

[size]: https://packagephobia.com/badge?p=@it-service-npm/remark-relative-url-adjustment

[size-url]: https://packagephobia.com/result?p=@it-service-npm/remark-relative-url-adjustment

[build]: https://github.com/IT-Service-NPM/remark-relative-url-adjustment/actions/workflows/ci.yml/badge.svg?branch=main

[build-url]: https://github.com/IT-Service-NPM/remark-relative-url-adjustment/actions/workflows/ci.yml

[tests]: https://img.shields.io/endpoint?logo=vitest&url=https%3A%2F%2Fgist.githubusercontent.com%2Fsergey-s-betke%2Fd70e4de09a490afc9fb7a737363b231a%2Fraw%2Fremark-relative-url-adjustment-junit-tests.json

[tests-url]: https://github.com/IT-Service-NPM/remark-relative-url-adjustment/actions/workflows/ci.yml

[coverage]: https://coveralls.io/repos/github/IT-Service-NPM/remark-relative-url-adjustment/badge.svg?branch=main

[coverage-url]: https://coveralls.io/github/IT-Service-NPM/remark-relative-url-adjustment?branch=main

The Remark plugin streamlines URL adjustments in Markdown files,
ensuring links remain accurate even after file relocations or inclusions.

Images and links within the markdown file will have
their paths adjusted to be relative to the new document location.

When `processor.data().filePathChanges` is set,
this plugin adjusts all relative URLs
for images, definitions, and links
to ensure they are accurate.

## Contents

- [Install](#install)
- [Examples](#examples)
  - [Updating relative url for links, images](#updating-relative-url-for-linksimages)
- [API](#api)
- [License](#license)

## Install

```sh
npm install --save-dev @it-service-npm/remark-relative-url-adjustment
```

## Examples

### Updating relative url for links, images

Images and links within the markdown file will have
their paths adjusted to be relative to the new document location.

When `processor.data().filePathChanges` is set,
this plugin adjusts all relative URLs
for images, definitions, and links
to ensure they are accurate.

```typescript file=test/examples/01/example.ts
import { remark } from 'remark';
import * as vFile from 'to-vfile';
import {
  remarkRelativeUrlsAdjustment
} from '@it-service-npm/remark-relative-url-adjustment';
import type { VFile } from 'vfile';

export async function remarkDirectiveUsingExample(
  filePath: string
): Promise<VFile> {
  return remark()
    .data({
      filePathChanges: {
        sourcePath: './subfolder1/main.md',
        destinationPath: './main.md'
      }
    })
    .use(remarkRelativeUrlsAdjustment)
    .process(await vFile.read(filePath));
};

```

Source file:

main.md:

```markdown file=test/examples/01/fixtures/subfolder1/main.md
Hello. I am the included. Test image:

![Test local image](test-image.png)

![Test local image with space](test%20image.png)

![Test web image](https://img.shields.io/badge/github-repo-blue?logo=github)

```

Remark output:

```markdown file=test/examples/01/fixtures/output.md
Hello. I am the included. Test image:

![Test local image](subfolder1/test-image.png)

![Test local image with space](subfolder1/test%20image.png)

![Test web image](https://img.shields.io/badge/github-repo-blue?logo=github)

```

## API

Please, read the [API reference](/docs/index.md).

## License

[MIT](LICENSE) © [Sergei S. Betke](https://github.com/sergey-s-betke)
