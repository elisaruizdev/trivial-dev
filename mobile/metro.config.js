const { getDefaultConfig } = require('expo/metro-config')
const { resolve } = require('metro-resolver')
const path = require('path')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '..')

const config = getDefaultConfig(projectRoot)

config.watchFolders = [workspaceRoot]
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')]
config.resolver.disableHierarchicalLookup = true
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const normalized =
    (moduleName.startsWith('.') || moduleName.startsWith('/')) && /\.tsx?$/.test(moduleName)
      ? moduleName.replace(/\.tsx?$/, '')
      : moduleName
  return resolve(context, normalized, platform)
}

module.exports = config
