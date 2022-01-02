import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['mocks.ts'],
  testRegex: '/test/.*\\.test\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};

export default config;
