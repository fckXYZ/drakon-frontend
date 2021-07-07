import { Switch, Route } from 'react-router';
import './App.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";

function App() {
  return (
      <div className="App">
        <Header />
        <Switch>
          {/*<Route path="/" component={Home} />*/}
        </Switch>
        <Footer />
      </div>
  );
}

export default App;
