module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-no-relative-import-paths',
    'hexagonal-architecture',
    'import',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-relative-import-paths/no-relative-import-paths': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-process-env': 'error',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: 'projects/ewaApi/src/modules/**/domain/**',
            from: 'node_modules',
            message: 'Cannot import external dependencies in domain layer',
          },
          {
            target: 'projects/ewaApi/src/modules/**',
            from: 'projects/ewaApi/src/components/**',
            message: 'Cannot import business components from provider modules',
          },
        ],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@nestjs/common',
            importNames: ['forwardRef'],
            message: "Usage of @nestjs/common's forwardRef is not allowed.",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/modules/**/*.ts', 'src/components/**/*.ts'],
      rules: {
        'hexagonal-architecture/enforce': ['error'],
      },
    },
  ],
};
