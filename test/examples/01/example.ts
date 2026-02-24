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
