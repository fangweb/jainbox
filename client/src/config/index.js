export const ApiConfig = {
  headers: {
    AuthScheme: 'Bearer',
    HeaderAcceptValue: 'application/json',
    HeaderContentTypeValue: 'application/json; charset=utf-8'
  },
  basePath: 'http://localhost:3001/api'
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
  basePath: 'ws://localhost:3001/ws'
};

export const ResultsPerPage = 10;
