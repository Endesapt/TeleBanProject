import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
 url: process.env.REACT_APP_KEYCLOACK_URL!,
 realm: process.env.REACT_APP_KEYCLOAK_REALM!,
 clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID!,
});
keycloak.onTokenExpired = () => {
    keycloak.updateToken(30).then(() => {
        localStorage.setItem("access_token",keycloak.token!);
    });
}
export default keycloak;