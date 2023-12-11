/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

/** @type {import('prettier').Config} */
module.exports = {
  ...require('../.prettierrc.js'),
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  importOrder: [
    '^((react|next)/(.*)$)|^((react|next)$)',
    '<THIRD_PARTY_MODULES>',
    '^@/(config|types|styles|shared|lib|utils|hooks|components|app|pages|features)/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
        importOrderParserPlugins: ['typescript', 'jsx'],
      },
    },
  ],
  tailwindConfig: 'tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cva'],
}
