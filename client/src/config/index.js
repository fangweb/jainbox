export const ApiConfig = {
  authScheme: 'Bearer',
  headers: {
    acceptValue: 'application/json',
    contentTypeValue: 'application/json; charset=utf-8'
  },
  basePath: 'http://localhost:3000/api'
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
  basePath: 'ws://localhost:3000/subscriber'
};

export const ResultsPerPage = 10;
