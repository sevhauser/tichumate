module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tichumate/'
    : '/',
  pwa: {
    themeColor: '#F2C94C',
    msTileColor: '#F2C94C',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  },
}