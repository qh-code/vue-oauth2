import {
    OktaAuth,
    DEFAULT_CODE_CHALLENGE_METHOD,
    AuthState
} from '../node_modules/@okta/okta-auth-js';
import fetchRequest from '../node_modules/@okta/okta-auth-js/lib/fetch/fetchRequest';

// PROVIDER SPECIFIC SETTINGS (i.e. MS Identity Platform Specifics)
const TENANT_ID = "3cf25b33-a435-44bf-ab8c-f06c50292a1e";
const CLIENT_ID = "e8174bab-4012-41da-9ec8-6815bac754f5";
const AUTH_DOMAIN = "https://login.microsoftonline.com/" + TENANT_ID;
const ISSUER = AUTH_DOMAIN + "/v2.0";
const API_SCOPE = "api://7a22a9b5-1f83-432f-8d30-ef4412294cdf/All";
const AUTHORIZE_URL = AUTH_DOMAIN + "/oauth2/v2.0/authorize";
const TOKEN_URL = AUTH_DOMAIN + "/oauth2/v2.0/token";
const LOGOUT_URL = AUTH_DOMAIN + "/oauth2/v2.0/logout";


const oktaAuth = new OktaAuth({
    issuer: ISSUER,
    clientId: CLIENT_ID,
    authorizeUrl: AUTHORIZE_URL,
    tokenUrl: TOKEN_URL,
    redirectUri: "/oauth-callback",
    logoutUrl: LOGOUT_URL,
    postLogoutRedirectUri: "/oauth-callback",
    scopes: ['openid', 'profile', API_SCOPE],
    responseType: 'code',
    pkce: true,
    //devMode: true,

    httpRequestClient: (method, url, options) => (
        url.indexOf('/.well-known/openid-configuration') >= 0
            // this is workaround for MS Identity Platform having no 'code_challenge_methods_supported' in openid metadata document
            // so we cheat a little. if we find that there is no 'code_chalenge_methods_supported' in metadata document
            // we put it there (having DEFAULT_CODE_CHALENGE_METHOD) before anyone notice
            ? fetchRequest(method, url, Object.assign(options, { withCredentials: false }))
                .then(resp => {
                    var respText = resp.responseText;
                    if (respText && Object.prototype.toString.call(respText) === '[object String]') {
                        var resObj = JSON.parse(respText);
                        if (!resObj['code_challenge_methods_supported']) {
                            resObj['code_challenge_methods_supported'] = [DEFAULT_CODE_CHALLENGE_METHOD];
                            respText = JSON.stringify(resObj);
                            resp.responseText = respText;
                        }
                    }
                    return resp;
                })
            // and this to force other calls to be without credentials (so no need for trudted origin - which MSIdP does not allow to set)    
            : fetchRequest(method, url, Object.assign(options, { withCredentials: false }))),

    restoreOriginalUri: async (oktaAuth, originalUri) => { 
        // router.replace({ path: originalUri }) 
    }
})

export function validateAccess(to, from, next) {

    oktaAuth.isAuthenticated()
        .then(authenticated => {
            if (authenticated) {
                next();
            } else {
                oktaAuth.tokenManager.clear();
                oktaAuth.setOriginalUri(to.path);
                oktaAuth.token.getWithRedirect();
            }
        })
        .catch(console.error)
}

export function oauthLogin() {
    oktaAuth.isAuthenticated()
        .then(authenticated => {
            if (!authenticated) {
                oktaAuth.tokenManager.clear();
                oktaAuth.setOriginalUri("router.currentRoute.path");
                oktaAuth.token.getWithRedirect();
            }
        })
        .catch(console.error);
}


export function oauthLoginCallback() {
    if (oktaAuth.token) {
        // oktaAuth.token.parseFromUrl()
        //     .then(tokens => oktaAuth.handleLoginRedirect(tokens.tokens))
        //     .catch(console.error);
    }
    
    // BaseTokenAPI
    // decode(token: string): JWTObject;
    // prepareTokenParams(params: TokenParams): Promise<TokenParams>;
    // exchangeCodeForTokens(params: TokenParams, urls?: CustomUrls): Promise<TokenResponse>;
    

    // getUserInfo(accessToken?: AccessToken, idToken?: IDToken): Promise<UserClaims>;
    // getWithRedirect: GetWithRedirectAPI;
    // parseFromUrl: ParseFromUrlInterface;
    // getWithoutPrompt(params?: TokenParams): Promise<TokenResponse>;
    // getWithPopup(params?: TokenParams): Promise<TokenResponse>;
    // revoke(token: RevocableToken): Promise<object>;
    // renew(token: Token): Promise<Token>;
    // renewTokens(): Promise<Tokens>;
    // verify(token: IDToken, params?: object): Promise<IDToken>;
    // isLoginRedirect(): boolean;



    // oktaAuth.token.parseFromUrl()
    //     .then(tokens => oktaAuth.handleLoginRedirect(tokens.tokens))
    //     .catch(console.error);
}

export async function isAuthenticated() {
    return oktaAuth.isAuthenticated()
        .then(() => {});
}

export async function getIdToken() {
    return oktaAuth.isAuthenticated()
        .then(x => oktaAuth.getIdToken())
        .then(token => {
            if (!token)
                throw new Error("no id_token");
            return token;
        })
}

export async function getAccessToken() {
    await oktaAuth.isAuthenticated()
    const token = oktaAuth.getAccessToken();
    if (!token)
        throw new Error("no access_token");
    return token;
}

export async function getUserInfo() {
    return oktaAuth.isAuthenticated()
        .then(x => oktaAuth.authStateManager.getAuthState().idToken)
        .then(idToken => { if (!idToken) throw new Error("not authenticated (no id_token)"); return idToken; })
        .then(idToken => idToken.claims)
        .then(userClaims => ({ sub: userClaims.sub, name: userClaims.name, email: userClaims.email }))
}

export async function oauthLogout() {
   
    return oktaAuth.isAuthenticated()
        .then(authenticated => {
            if (authenticated)
                oktaAuth.signOut({ revokeAccessToken: false, revokeRefreshToken: false });
        })
        .catch(console.error)
}

let handlers = []

function handleAuthStateChange(authState) {
    handlers.forEach(handler => handler(authState.isAuthenticated ? true : false))
}

if (oktaAuth.authStateManager) {
    oktaAuth.authStateManager.subscribe(handleAuthStateChange);
}

export function subscribeToAuthStateChanged(handler) {
    handlers.push(handler);
}
export function unSubscribeFromAuthStateChanged(handler) {
    handlers = handlers.filter(h => h != handler);
}
