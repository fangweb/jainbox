export default class ApiService {
  constructor() {
    this.headers = {
      Accept: Const.HeaderAcceptValue,
      Authorization: `${Const.AuthScheme} ${SessionService.GetJwt().token}`,
      'Content-Type': Const.HeaderContentTypeValue
    };
  }

  getInbox() {
  
  }
}
