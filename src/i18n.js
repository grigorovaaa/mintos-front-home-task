let requireModules = require.context('./i18n', false, /\.js/)
let messages = {}
requireModules.keys().forEach(fileName => {
  let localeName = fileName.replace(/(\.\/|\.js)/g, '')
  messages[localeName] = {
    ...requireModules(fileName).default
  }
})
export default messages
