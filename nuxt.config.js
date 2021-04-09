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
const USER_INFO = AUTH_DOMAIN + "/oauth2/userinfo";

// // const LOGOUT_URL = AUTH_DOMAIN + "/oauth2/v2.0/logout";
// // const LOGOUT_URL = AUTH_DOMAIN + "/logout?client_id=" + CLIENT_ID + "&redirect_uri=http://localhost:8080&";
// const LOGOUT_URL = AUTH_DOMAIN + "/logout";


// const oktaAuth = new OktaAuth({
//     issuer: ISSUER,
//     clientId: CLIENT_ID,
//     authorizeUrl: AUTHORIZE_URL,
//     tokenUrl: TOKEN_URL,
//     redirectUri: location.origin + "/oauth-callback",
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
  target: 'static',

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
    '@nuxtjs/auth-next'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },


              
              // https://www.youtube.com/watch?v=C-gUeHpeRrg


              // // Modules: https://go.nuxtjs.dev/config-modules
              // modules: [
              //   // https://go.nuxtjs.dev/axios
              //   '@nuxtjs/auth-next',
              //   '@nuxtjs/axios',
              // ],
            
              // // Axios module configuration: https://go.nuxtjs.dev/config-axios
              // axios: {
              //   baseURL: 'http://localhost:8000/api/v1'
              // },
            
              // auth: {
              //   strategies: {
              //     local: {
              //       scheme: 'refresh',
              //       localStorage: {
              //         prefix: 'auth.'
              //       },
              //       token: {
              //         prefix: 'access_token.',
              //         property: 'access_token',
              //         maxAge: 86400,
              //         type: 'Bearer'
              //       },
              //       refreshToken: {
              //         prefix: 'refresh_token.',
              //         property: 'refresh_token',
              //         data: 'refresh_token',
              //         maxAge: 60 * 60 * 24 * 15
              //       },
              //       user: {
              //         property: 'user',
              //         autoFetch: true
              //       },
              //       endpoints: {
              //         login: { url: '/login', method: 'post'},
              //         refresh: { url: '/token/refresh/', method: 'post' },
              //         user: { url: '/user', method: 'get' },
              //         logout: { url: '/logout', method: 'post'}
              //       },
              //     }
              //   }
              // },

  auth:{
    strategies:{
      cognito:{
        scheme: 'oauth2',
        endpoints: {
          authorization: AUTHORIZE_URL,
          // authorization: issuer +"/login",
          token: TOKEN_URL,
          userInfo: USER_INFO,
          logout: { url: '/logout', method: 'post'}
          // logout: issuer +"/v1/logout"
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          // maxAge: 1800,

          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 1800,
          global: true,
          prefix: '_token.',
          expirationPrefix: '_token_expiration.'
        },
        
        responseType: 'code',
        // 'code' | 'token' | 'id_token' | 'none' | string
        responseMode: 'query.jwt',
        grantType: 'authorization_code',
        clientId: clientId,
        scope: ['openid', 'profile'],
        codeChallengeMethod: 'S256',
        autoLogout: false,
        redirectUri: "http://localhost:8080/oauth-callback"
        }
    }
  },


  // auth:{
  //   strategies:{
  //     okta:{
  //       scheme: 'oauth2',
  //       endpoints: {
  //         authorization: issuer +"/v1/authorize",
  //         token: issuer +"/v1/token",
  //         userInfo: issuer +"/v1/userinfo",
  //         logout: issuer +"/v1/logout"
  //       },
  //       token: {
  //         property: 'access_token',
  //         type: 'Bearer',
  //         maxAge: 1800,
  //       },
  //       responseType: 'code',
  //       grantType: 'authorization_code',
  //       clientId: clientId,
  //       scope: ['openid', 'profile', 'email'],
  //       codeChallengeMethod: 'S256',
  //       autoLogout: true,
  //       }
  //   }
  // },

  server: {
    port: 8080 // default: 3000
  }

  
}
