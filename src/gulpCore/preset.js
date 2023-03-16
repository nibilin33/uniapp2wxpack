const path = require('path')
global.projectToSubPackageConfig = JSON.parse(process.env.TEST);
const program = {};
program.scope = process.cwd();
program.type = process.env.UNI_UTS_PLATFORM || 'weixin';
// 支持多种小程序解耦构建，默认为微信
const mpTypeNamespace = {
    weixin: {
        html: 'wxml',
        css: 'wxss',
        globalObject: 'wx',
        mainMpPath: 'mainWeixinMpPath',
        directivePrefix: 'wx:',
        projectConfig: 'project.config.json',
        pluginConfig: 'plugin.json',
        webpackGlobal: 'global'
    },
    baidu: {
        html: 'swan',
        css: 'css',
        globalObject: 'swan',
        mainMpPath: 'mainBaiduMpPath',
        directivePrefix: 's-',
        projectConfig: 'project.swan.json',
        webpackGlobal: 'global'
    },
    toutiao: {
        html: 'ttml',
        css: 'ttss',
        globalObject: 'tt',
        mainMpPath: 'mainToutiaoMpPath',
        directivePrefix: 'tt:',
        projectConfig: 'project.config.json',
        webpackGlobal: 'global'
    },
    alipay: {
        html: 'axml',
        css: 'acss',
        globalObject: 'my',
        mainMpPath: 'mainAlipayMpPath',
        directivePrefix: 'a:',
        projectConfig: 'mini.project.json',
        pluginConfig: 'plugin.json',
        webpackGlobal: 'my'
    }
}
const currentNamespace = mpTypeNamespace[program.type]
if (!currentNamespace) throw Error('小程序类型错')
process.env.PACK_TYPE = program.type
const cwd = program.scope
const projectToSubPackageConfig = global.projectToSubPackageConfig || {};
// require(path.resolve(cwd,'./projectToSubPackageConfig'))
const sourceCodePath = projectToSubPackageConfig.sourceCodePath || 'src'
const wxResourcePath = projectToSubPackageConfig.wxResourcePath || `${sourceCodePath}/${currentNamespace.globalObject}resource`
const wxResourceAlias = projectToSubPackageConfig.wxResourceAlias || `@wxResource`
const regExpWxResources = new RegExp(`${wxResourceAlias}\\/`,'g')
const uniRequireApiName = projectToSubPackageConfig.uniRequireApiName || '__uniRequireWx'
const regExpUniRequire = new RegExp(`${uniRequireApiName}\\(([a-zA-Z.\\/"'@\\d-_]+)\\)`,'g')
const uniImportWxssApiName = projectToSubPackageConfig.uniImportWxssApiName || `__uniWxss`
const regExpUniImportWxss = new RegExp(`(}|^|\\s|;)${uniImportWxssApiName}\\s*{([^{}]+)}`,'g')
const configWxResourceKey = projectToSubPackageConfig.configWxResourceKey || 'wxResource'
const pluginProcessFileTypes = projectToSubPackageConfig.pluginProcessFileTypes || ['js', 'json', 'wxml', 'ttml', 'ttss', 'swan', 'css', 'html', 'wxss', 'htm', 'wxs', 'sjs', 'acss', 'axml']
const projectConfigPath = projectToSubPackageConfig.projectConfigPath || ''
const pluginTypeMiniProgramRoot = projectToSubPackageConfig.pluginTypeMiniProgramRoot || 'miniprogram'

let env = 'dev'
if(process.env.NODE_ENV === 'production'){
    env = 'build'
}

const base = 'dist/' + env + `/mp-${program.type}`
let target = 'dist/' + env + `/mp-${program.type}-pack`
if (program.plugin) {
    target = 'dist/' + env + `/mp-${program.type}-pack-plugin`
}
const basePath = path.resolve(cwd, base)
const subModePath = path.resolve(cwd, target, projectToSubPackageConfig.subPackagePath)
const targetPath = path.resolve(cwd, target)
const packIsSubpackage = {
    mode: false
}

module.exports = {
    pluginProcessFileTypes,
    currentNamespace,
    program,
    cwd,
    projectToSubPackageConfig,
    wxResourcePath,
    wxResourceAlias,
    regExpWxResources,
    uniRequireApiName,
    regExpUniRequire,
    uniImportWxssApiName,
    regExpUniImportWxss,
    configWxResourceKey,
    env,
    base,
    target,
    basePath,
    subModePath,
    targetPath,
    packIsSubpackage,
    mpTypeNamespace,
    sourceCodePath,
    projectConfigPath,
    pluginTypeMiniProgramRoot
}
