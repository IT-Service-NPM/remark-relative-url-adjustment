import path from 'node:path';
import { remarkDirectiveUsingExample } from './example.ts';

const testSourceFilesPath: string = path.join(__dirname, 'fixtures');

describe('remark-include', () => {

  it('update relative url for images',
    async () => {
      const _cwd = process.cwd();
      try {
        process.chdir(__dirname);

        const outputFile = await remarkDirectiveUsingExample(
          path.join(testSourceFilesPath,
            'subfolder1', 'main.md'
          )
        );

        await expect(String(outputFile))
          .toMatchFileSnapshot(path.join(testSourceFilesPath, 'output.md'));

      } finally {
        process.chdir(_cwd);
      };

    }
  );

  it('leave links (url) starting with `/` (relative to the repository root)',
    async () => {
      const _cwd = process.cwd();
      try {
        process.chdir(__dirname);

        const outputFile = await remarkDirectiveUsingExample(
          path.join(testSourceFilesPath,
            'subfolder1', 'main-with-relative-to-root-link.md'
          )
        );

        await expect(String(outputFile))
          .toMatchFileSnapshot(path.join(
            testSourceFilesPath,
            'output-with-relative-to-root-link.md'
          ));

      } finally {
        process.chdir(_cwd);
      };

    }
  );

});
