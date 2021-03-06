module.exports = config => {
  const { common: { storage: { env } } } = config
  config.utils.on('config:update:map', async newMap => {
    const currentMap = await env.get(env.keys.MAP_URL)
    if (currentMap && currentMap !== newMap) {
      console.log(`Map value in config.yml has changed to ${newMap}, current map is ${currentMap}`)
      console.log(`If you wish to apply this then call utils.importMap('${newMap}') manually or system.resetAllData() then restart server.`)
      return
    }
    await config.utils.importMap(newMap)
  })
}
