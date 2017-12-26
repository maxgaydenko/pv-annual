import React, {Component} from 'react';
import {Route, HashRouter} from "react-router-dom";
import '../css/app.css';

import Home from "./Home";
import Staff from "./Staff";
import Proceeds from "./Proceeds";
import ProceedsStaff from "./ProceedsStaff";
import ContractorBars from "./ContractorBars";
import ContractorPie from "./ContractorPie";

class App extends Component {
 render() {
  return (
   <HashRouter>
    <div className="App">
     <Route exact path="/" component={Home}/>
     <Route path="/staff" component={Staff} />
     <Route path="/proceeds" component={Proceeds}/>
     <Route path="/proceeds-staff" component={ProceedsStaff}/>
     <Route path="/contractor-bars" component={ContractorBars} />
     <Route path="/contractor-pie" component={ContractorPie} />
    </div>
   </HashRouter>
  );
 }
}

export default App;
