import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Result from "./components/Result/Result";

class App extends React.Component {
  state = {
    name: "Falcone"
  };
  render() {
    return (
      <div className="App">
        Find {this.state.name}
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/result" component={Result} exact />
            <Route component={Error} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
