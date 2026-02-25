import { test } from 'node:test';
import path from 'node:path';
import { remarkDirectiveUsingExample } from './example.ts';

await test('plugin updates relative url for images',
  async (t) => {
    const outputFile = await remarkDirectiveUsingExample(path.resolve(
      import.meta.dirname, 'fixtures', 'subfolder1', 'main.md'
    ));
    t.assert.fileSnapshot(
      String(outputFile),
      path.resolve(import.meta.dirname, 'fixtures', 'output.md'),
      { serializers: [(data: string) => data] }
    );
  });

// eslint-disable-next-line max-len
await test('plugin leaves links (URLs) starting with `/` (relative to the repository root)',
  async (t) => {
    const outputFile = await remarkDirectiveUsingExample(path.resolve(
      import.meta.dirname,
      'fixtures', 'subfolder1', 'main-with-relative-to-root-link.md'
    ));
    t.assert.fileSnapshot(
      String(outputFile),
      path.resolve(
        import.meta.dirname,
        'fixtures', 'output-with-relative-to-root-link.md'
      ),
      { serializers: [(data: string) => data] }
    );
  });
