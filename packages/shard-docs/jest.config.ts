'use strict'

import { defaults } from 'jest-config'

export default {
  setupFilesAfterEnv: ['./jest-setup.ts', './jest-setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss|less)$': 'identity-obj-proxy',
    '@/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'scss'],
}
