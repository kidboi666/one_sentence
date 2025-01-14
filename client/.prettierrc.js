module.exports = {
  tabWidth: 2,
  printWidth: 80,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'lf',
  useTabs: false,
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
  tailwindFunctions: ['clsx', 'cva'],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/src/lib/(.*)$',
    '^@/src/store/(.*)$',
    '^@/src/services/(.*)$',
    '^@/src/types/(.*)$',
    '^@/src/hooks/(.*)$',
    '^@/src/utils/(.*)$',
    '^@/src/routes$',
    '^@/src/components/(.*)$',
    '^@/src/app/(.*)$',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
}