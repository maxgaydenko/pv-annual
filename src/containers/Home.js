import React from 'react';
import Menu from "./Menu";
import logoBox from '../svg/logo_box.svg';
import {Link} from "react-router-dom";

class Home extends React.Component {
 componentWillMount() {
  window.document.title = "Ежегодный отчёт Петровайзера";
 }

 render() {
  return (
   <div className="App-home">
    <h1>Ежегодный отчёт за 2017 год</h1>
    <div className="logo-box">
     <Link to={"/staff"}><img src={logoBox} alt={"Petroviser"} /></Link>
    </div>
    <Menu/>
   </div>
  )
 }
}

export default Home;