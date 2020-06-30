
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Florida Poly COVID Project" || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Data and insights related to the COVID-19 Pandemic, brought to you by researchers at Florida Polytechnic University." || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Miriam+Libre:wght@700&family=Open+Sans:wght@300&display=swap' }
    ],
    script: [
      { src: 'https://www.gstatic.com/charts/loader.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/chartkick'},
    { src: '~/plugins/slide-menu', mode: 'client' },
    {src: '~/plugins/vSelectMenu', mode: 'client'},
    {src: '~/plugins/choropleth', mode: 'client'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  // Simple usage
  '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/api/': 'http://127.0.0.1:8000/api/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
