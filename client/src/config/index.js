export const ApiConfig = {
  headers: {
    AuthScheme: 'Bearer',
    HeaderAcceptValue: 'application/json',
    HeaderContentTypeValue: 'application/json; charset=utf-8'
  }
};

export const PathConfig = {
  rootPath: '/',
  signInPath: '/signin',
  composePath: '/compose',
  inboxPath: '/inbox',
  sentPath: '/sent',
  trashPath: '/trash',
  viewMessagePath: '/view-message',
  testAreaPath: '/testarea'
};

export const WsConfig = {

};

export const ResultsPerPage = 10;
