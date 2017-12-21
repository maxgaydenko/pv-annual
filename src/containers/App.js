import React, {Component} from 'react';
import {Route, HashRouter} from "react-router-dom";

import Home from "./Home";
import Staff from "./Staff";
import Proceeds from "./Proceeds";
import Example from "./Example";

import '../css/app.css';

class App extends Component {
 render() {
  return (
   <HashRouter>
    <div className="App">
     <Route exact path="/" component={Home}/>
     <Route path="/staff" component={Staff} />
     <Route path="/proceeds" component={Proceeds}/>
     <Route path="/example" component={Example} />
    </div>
   </HashRouter>
  );
 }
}

export default App;
