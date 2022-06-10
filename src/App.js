import React from "react";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import { GlobalStyle } from "./style";
import routes from "./routes";
import store from "./store";
import { HashRouter } from "react-router-dom";


function App() {
  
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle/>
        { renderRoutes(routes) }
      </HashRouter>
    </Provider>
  );
}

export default App;
