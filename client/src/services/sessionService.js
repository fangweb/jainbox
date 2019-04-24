export class SessionService {
  static storeJwt(token) {
    localStorage.setItem("jwt", token);
  }
  
  static getJwt() {
    return localStorage.getItem("jwt");
  }

}
