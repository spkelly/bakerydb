module.exports = {
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock')
  },
  setupFiles:['regenerator-runtime/runtime'],
  setupFilesAfterEnv:[
    require.resolve('./test/setup-test-framework'),
    require.resolve('./test/setup-enzyme')
  ] 
}