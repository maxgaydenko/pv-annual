import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";
import {numberWithSeparator} from "../utils";

class Staff extends React.Component {
 componentWillMount() {
  const dataProvider = window._pvad.staff.reduce((p,c)=>{
   let item = {year:c.year, total:0};
   Object.keys(c.data).forEach(key => {
    item[key] = c.data[key];
    item.total += c.data[key];
   })
   p.push(item);
   return p;
  }, []);
  const departments = window._pvad.staffDepartments;
  this.setState({dataProvider, departments});
  window.document.title = "Сотрудники";
 }

 render() {
  let graphs = Object.keys(this.state.departments).map(depKey => ({
   title: this.state.departments[depKey].name,
   lineColor: this.state.departments[depKey].color,
   balloonText: "<b>[[title]]</b><br>[[category]]: <b>[[value]]</b>",
   valueField: depKey,
   fillAlphas: .8,
   type: "column",
  }));
  graphs.push({
   title: "Сотрудники",
   valueField: "total",
   labelText: "[[total]]",
   balloonText: "",
   bullet: "none",
   fontSize: 28,
   lineThickness: 2,
   lineAlpha: .1,
   dashLength: 8,
   lineColor: "#D00",
   color: "#666",
   visibleInLegend: false
  });

  const config = {
   type: "serial",
   theme: "light",
   fontSize: 24,
   legend: {
    fontSize: 24,
    position: "bottom",
    equalWidths: false,
   },
   graphs: graphs,
   valueAxes: [{
    stackType: "regular",
   }],
   categoryField: "year",
   categoryAxis: {
    gridPosition: "start",
    axisAlpha: 0,
    tickLength: 0
   },
   chartCursor: {
    cursorAlpha: .8,
    cursorColor: "#D00",
   },
   dataProvider: this.state.dataProvider
  }

  return (
   <div className="App-body">
    <header>
     <h1>Сотрудники</h1>
     <Menu selected="staff" />
    </header>
    <div className="Chart Box StaffBox">
     <div className="BoxChart">
      <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
     </div>
     <div className="BoxLabels">
      <ul>
       <li>
        <div className="title"><div className="name">Принято</div></div>
        <div className="data"><div className="value">103 <span className="measure">человека</span></div></div>
       </li>
       <li>
        <div className="title"><div className="name">Уволено</div></div>
        <div className="data"><div className="value">97 <span className="measure">человек</span></div></div>
       </li>
       <li>
        <div className="title"><div className="name">Мужчины</div></div>
        <div className="data"><div className="value">304 <span className="measure">человека</span></div></div>
       </li>
       <li>
        <div className="title"><div className="name">Женщины</div></div>
        <div className="data"><div className="value">58 <span className="measure">человек</span></div></div>
       </li>
       <li>
        <div className="title"><div className="name">Родилось</div></div>
        <div className="data"><div className="value">18 <span className="measure">детей</span></div></div>
       </li>
      </ul>
     </div>
    </div>
   </div>
  )
 }
}

export default Staff;