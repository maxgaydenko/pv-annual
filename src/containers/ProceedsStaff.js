import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";

class ProceedsStaff extends React.Component {
 componentWillMount() {
  const persons = window._pvad.staff.reduce((p,c)=>{
   p[c.year] = 0;
   Object.keys(c.data).forEach(key => {
    p[c.year] += c.data[key];
   })
   return p;
  }, {});
  const dataProvider = window._pvad.proceeds.reduce((p,c)=>{
   let item = {year:c.year, total:0};
   Object.keys(c.data).forEach(key => {
    item.total += c.data[key];
   });
   if(persons[c.year])
    item.pp = Math.round(item.total/persons[c.year]);
   p.push(item);
   return p;
  }, []);
  this.setState({dataProvider});
  console.log("P", dataProvider);
  window.document.title = "Выручка на сотрудника";
 }

 render() {
  let graphs = [];
  graphs.push({
   title: "Выручка на сотрудника",
   valueAxis: "ppAxis",
   valueField: "pp",
   labelText: "[[pp]]",
   balloonText: "[[value]] тыс.руб.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 18,
   lineColor: "#d1cf00",
   lineThickness: 4,
   // bulletColor: "#DD0000",
   // color: "#666"
  });
  graphs.push({
   title: "Выручка",
   valueAxis: "totalAxis",
   valueField: "total",
   // labelText: "[[total]]",
   balloonText: "[[value]] тыс.руб.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 18,
   lineColor: "#607985",
   lineThickness: 4,
   // bulletColor: "#DD0000",
   color: "#666"
  });

  const config = {
   type: "serial",
   theme: "light",
   fontSize: 14,
   thousandsSeparator: " ",
   legend: {
    fontSize: 13,
    position: "bottom",
   },
   graphs: graphs,
   valueAxes: [{
    id: "totalAxis",
    position: "right",
    labelsEnabled: false,
    gridAlpha: 0,
   }, {
    id: "ppAxis",
   }],
   categoryField: "year",
   categoryAxis: {
    gridPosition: "middle",
    axisAlpha: 0,
    tickLength: 0
   },
   chartCursor: {
    cursorAlpha: .9,
    cursorColor: "#D00",
   },
   dataProvider: this.state.dataProvider
  }

  return (
   <div className="App-body">
    <header>
     <h1>Выручка на сотрудника</h1>
     <Menu selected="proceeds-staff" />
    </header>
    <div className="Chart">
     <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
    </div>
   </div>
  )
 }
}

export default ProceedsStaff;