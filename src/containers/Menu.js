import React from 'react';
import {Link} from "react-router-dom";
import logo from '../svg/logo.svg';

class Menu extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   active: false
  }
 }

 onButtonClick = (e) => {
  const active = !this.state.active;
  this.setState({active});
 }

 render() {
  const items = [
   // {key:"home", name:"На главную", url:"/"},
   {key:"staff", name:"Численность", url:"/staff"},
   {key:"proceeds", name:"Выручка по подразделениям", url:"/proceeds"},
   // {key:"contractor-bars", name:"Выручка по контрагентам", url:"/contractor-bars"},
   {key:"contractor-pie", name:"Контрагенты за год", url:"/contractor-pie"},
   {key:"proceeds-staff", name:"Выручка на сотрудника", url:"/proceeds-staff"},
  ]

  return (
   <div className={"Menu"+(this.state.active?" active":"")}>
    <div className="logo"><Link to={"/"}><img src={logo} /></Link></div>
    <button onClick={this.onButtonClick}>
     <span></span>
     <span></span>
     <span></span>
     <span></span>
    </button>
    <ul>
     {items.map(item => (
      <li key={item.key} className={(item.key===this.props.selected)?"selected":""}><Link to={item.url}>{item.name}</Link></li>
     ))}
    </ul>
   </div>
  )
 }
}

export default Menu;