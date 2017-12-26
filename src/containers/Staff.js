import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";

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
  window.document.title = "Численность";
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
   title: "Численность",
   valueField: "total",
   labelText: "[[total]]",
   balloonText: "",
   bullet: "none",
   fontSize: 28,
   lineThickness: 2,
   lineAlpha: .1,
   dashLength: 8,
   lineColor: "#D00",
   color: "#666"
  });

  const config = {
   type: "serial",
   theme: "light",
   fontSize: 24,
   legend: {
    fontSize: 20,
    position: "bottom",
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
     <h1>Численность</h1>
     <Menu selected="staff" />
    </header>
    <div className="Chart">
     <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
    </div>
   </div>
  )
 }
}

export default Staff;