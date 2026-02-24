/**
 * The Remark plugin streamlines URL adjustments in Markdown files,
 * ensuring links remain accurate even after file relocations or inclusions.
 *
 * Images and links within the markdown file will have
 * their paths adjusted to be relative to the new document location.
 *
 * When `processor.data().filePathChanges` is set,
 * this plugin adjusts all relative URLs
 * for images, definitions, and links
 * to ensure they are accurate.
 *
 * @packageDocumentation
 */

import url from 'node:url';
import RelateUrl from 'relateurl';
import type { Transformer, Processor } from 'unified';
import type {
  Nodes,
  Resource
} from 'mdast';
import type { VFile } from 'vfile';
import { visit } from 'unist-util-visit';

declare module 'unified' {

  interface Data {
    /**
     * When `processor.data().filePathChanges` is set,
     * this plugin adjusts all relative URLs
     * for images, definitions, and links
     * to ensure they are accurate.
     *
     * @public
     */
    filePathChanges?: {

      /**
       * markdown file path before moving or including.
       *
       * @public
       */
      sourcePath: string,

      /**
       * markdown file path after moving or including.
       *
       * @public
       */
      destinationPath: string
    }
  }

};

/**
 * The Remark plugin streamlines URL adjustments in Markdown files,
 * ensuring links remain accurate even after file relocations or inclusions.
 *
 * Images and links within the markdown file will have
 * their paths adjusted to be relative to the new document location.
 *
 * When `processor.data().filePathChanges` is set,
 * this plugin adjusts all relative URLs
 * for images, definitions, and links
 * to ensure they are accurate.
*
 * @public
 */
export function remarkRelativeUrlsAdjustment(
  this: Processor
): Transformer {

  const processor: Processor = this;

  return function (tree: Nodes, _file: VFile): Nodes {
    const filePathChanges =
      processor.data().filePathChanges;

    if (typeof filePathChanges !== 'undefined') {
      visit(tree,
        function (_node: Nodes): void {
          switch (_node.type) {
            case 'image':
            case 'link':
            case 'definition': {
              const node: Resource = _node;
              if (!(URL.canParse(node.url) || node.url.startsWith('/'))) {
                node.url = RelateUrl.relate(
                  url.pathToFileURL(filePathChanges.destinationPath).href,
                  new URL(
                    node.url,
                    url.pathToFileURL(filePathChanges.sourcePath)
                  ).href
                );
              }
              break;
            }
          };
        }
      );
    };

    return tree;
  } as Transformer;

};
