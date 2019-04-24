export class SessionService {
  public static StoreJwt(token) {
    localStorage.setItem("jwt", token);
  }
  
  public static GetJwt() {
    return localStorage.getItem("jwt");
  }

}
