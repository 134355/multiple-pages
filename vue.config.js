const glob = require('glob')
const path = require('path')
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = process.env.NODE_ENV === 'development'

const cdn = {
  production: {
    css: [
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    js: [
      'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
      'https://cdn.bootcss.com/element-ui/2.13.0/index.js',
      'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
    ]
  },
  development: {
    css: [
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ]
  }
}

function handleEntry (entry) {
  const entries = {}

  glob.sync(entry).forEach(item => {
    const entry = item.replace('App.vue', 'main.js')
    const filename = item.replace(/\.\/src\/views\/(\w+)\/App.vue/, '$1')
    const template = item.replace('App.vue', 'index.html')

    entries[filename] = {
      entry: entry,
      template: template,
      filename: `${filename}.html`
    }
  })

  return entries
}

const pages = handleEntry('./src/views/**?/*.vue')

console.log(pages)

module.exports = {
  publicPath: isProduction ? './' : '/',
  lintOnSave: !isProduction,
  outputDir: 'reportForm',
  pages,
  configureWebpack: config => {
    if (isProduction) {
      // 打包时不导入以下模块
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        axios: 'axios',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-i18n': 'i18n'
      }
      // 打包代码分析
      config.plugins.push(new WebpackBundleAnalyzerPlugin())
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.performance.set('hints', false)
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('@c', path.join(__dirname, 'src/components'))
    Object.keys(pages).forEach(item => {
      config.plugin(`html-${item}`).tap(args => {
        if (isProduction) {
          args[0].cdn = cdn.production
        } else if (isDevelopment) {
          args[0].cdn = cdn.development
        }
        return args
      })
    })
  },
  devServer: {
    index: '/',
    open: true,
    host: '0.0.0.0',
    https: false,
    hotOnly: false,
    before: app => {
      app.get('/', (req, res) => {
        for (const i in pages) {
          res.write(`<a target="_self" href="/${i}">/${i}</a></br>`)
        }
        res.end()
      })
    }
  }
}
