import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
 url: "http://localhost:8080",
 realm: "master",
 clientId: "myclient",
});
keycloak.onTokenExpired = () => {
    keycloak.updateToken(3).then(() => {
        localStorage.setItem("access_token",keycloak.token!);
    });
}
export default keycloak;