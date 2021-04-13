require('dotenv').config()


// // PROVIDER SPECIFIC SETTINGS (i.e. MS Identity Platform Specifics)
// const CLIENT_ID = "6lt9cqgtupflbjc868d0i61ucv";
const AUTH_DOMAIN = "https://vue-sample-1.auth.us-east-2.amazoncognito.com";
// // + TENANT_ID

// // const ISSUER = AUTH_DOMAIN + "/v2.0";
// const ISSUER = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_CEDW1OT68";

// const API_SCOPE = "api://7a22a9b5-1f83-432f-8d30-ef4412294cdf/All";

const AUTHORIZE_URL = AUTH_DOMAIN + "/oauth2/authorize";
// // const AUTHORIZE_URL = AUTH_DOMAIN + "/oauth2/v2.0/authorize";

// // const TOKEN_URL = AUTH_DOMAIN + "/oauth2/v2.0/token";
const TOKEN_URL = AUTH_DOMAIN + "/oauth2/token";
const USER_INFO = AUTH_DOMAIN + "/oauth2/userInfo";

// // const LOGOUT_URL = AUTH_DOMAIN + "/oauth2/v2.0/logout";
// // const LOGOUT_URL = AUTH_DOMAIN + "/logout?client_id=" + CLIENT_ID + "&redirect_uri=http://localhost:8080&";
const LOGOUT_URL = AUTH_DOMAIN + "/logout";


// const oktaAuth = new OktaAuth({
//     issuer: ISSUER,
//     clientId: CLIENT_ID,
//     authorizeUrl: AUTHORIZE_URL,
//     tokenUrl: TOKEN_URL,
//     redirectUri: location.origin + "/login",
//     logoutUrl: LOGOUT_URL,
//     // postLogoutRedirectUri: location.origin,
//     scopes: ['openid', 'profile'],
//     // scopes: ['openid', 'profile', API_SCOPE],
//     responseType: 'code',
//     pkce: true,
//     //devMode: true,


// var issuer = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_CEDW1OT68",


var clientId = "6lt9cqgtupflbjc868d0i61ucv";

var issuer = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_CEDW1OT68";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'intro-to-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'content description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Berkshire+Swash|Roboto' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast'
  ],

  toast: {
    position: 'top-right',
    theme: "outline", 
    duration : 5000,
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  auth:{
    strategies:{
      cognito:{
        scheme: 'oauth2',
        endpoints: {
          authorization: AUTHORIZE_URL,
          token: TOKEN_URL,
          userInfo: USER_INFO,
          logout: LOGOUT_URL
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800,
        },
        
        responseType: 'code',
        responseMode: 'query.jwt',
        grantType: 'authorization_code',
        clientId: clientId,
        scope: ['openid', 'profile'],
        codeChallengeMethod: 'S256',
        autoLogout: false,
        redirectUri: "http://localhost:8080/login"
        }
    }
  },

  server: {
    port: 8080 // default: 3000
  }
}
