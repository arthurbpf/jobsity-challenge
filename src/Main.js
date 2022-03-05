import React from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
import { Provider } from 'react-redux';

import getStore from './store/getStore';
import reducers from './reducers/index';

function Main() {
  const store = getStore(reducers);

  return (
    <Provider store={store}>
      <div className="main">{renderRoutes(Routes)}</div>
    </Provider>
  );
}

export default withRouter(Main);
