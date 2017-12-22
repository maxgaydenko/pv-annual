import React from 'react';
import {Link} from "react-router-dom";

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
   {key:"home", name:"На главную", url:"/"},
   {key:"staff", name:"Численность", url:"/staff"},
   {key:"1", name:"Выручка", url:"/"},
   {key:"2", name:"- по подразделениям", url:"/"},
   {key:"3", name:"- по контрагентам", url:"/"},
   {key:"4", name:"- на сотрудника", url:"/"},
  ]

  return (
   <div className={"Menu"+(this.state.active?" active":"")}>
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