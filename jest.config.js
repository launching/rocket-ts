module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
  transform: {
    // 用 `vue-jest` 处理 `*.vue` 文件
    '.*\\.(ts)$': '<rootDir>/node_modules/ts-jest',
    '.*\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  testEnvironment: 'jsdom',
  rootDir: '',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/tests/**/*.test.(js|jsx|ts|tsx)'],
  snapshotSerializers: [
    // 配置快照测试
    '<rootDir>/node_modules/jest-serializer-vue',
  ],
  transformIgnorePatterns: ['node_modules'],
};
