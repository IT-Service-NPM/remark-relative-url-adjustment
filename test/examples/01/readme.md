# Updating relative url for links, images

Images and links within the markdown file will have
their paths adjusted to be relative to the new document location.

When `processor.data().filePathChanges` is set,
this plugin adjusts all relative URLs
for images, definitions, and links
to ensure they are accurate.

```typescript file=./example.ts
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

```markdown file=fixtures/subfolder1/main.md
Hello. I am the included. Test image:

![Test local image](test-image.png)

![Test local image with space](test%20image.png)

![Test web image](https://img.shields.io/badge/github-repo-blue?logo=github)

```

Remark output:

```markdown file=fixtures/output.md
Hello. I am the included. Test image:

![Test local image](subfolder1/test-image.png)

![Test local image with space](subfolder1/test%20image.png)

![Test web image](https://img.shields.io/badge/github-repo-blue?logo=github)

```
