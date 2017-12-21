import React from 'react';
import {Link} from "react-router-dom";

class Home extends React.Component {
 render() {
  return (
   <div>
    <header>
     Петровайзер 2017
    </header>
    <div>
     <ul>
      <li><Link to={"/staff"}>Численность</Link></li>
      <li><Link to={"/proceeds"}>Выручка</Link></li>
     </ul>
    </div>
   </div>
  )
 }
}

export default Home;