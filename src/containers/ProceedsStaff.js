import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";
import { numberWithSeparator } from '../utils';

const showProceedBar = false;
const showStaffBar = false;

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
   if(persons[c.year]) {
    item.pp = Math.round(item.total/persons[c.year]);
    item.ppLabel = numberWithSeparator(item.pp);
    item.persons = persons[c.year];
   }
   p.push(item);
   return p;
  }, []);
  this.setState({dataProvider});
  // console.table(dataProvider);
  window.document.title = "Выручка на сотрудника";
 }

 render() {
  const graphs = [];
  graphs.push({
   title: "Сотрудники",
   valueAxis: "totalAxis",
   valueField: "persons",
   balloonText: "[[value]] чел.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 18,
   lineColor: "#d1cf00",
   lineThickness: 4,
   color: "#666",
   // type: "column"
  });
  graphs.push({
   title: "Выручка на сотрудника",
   valueAxis: "ppAxis",
   valueField: "pp",
   labelText: "[[ppLabel]]",
   labelOffset: 20,
   balloonText: "[[value]] тыс.руб.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 24,
   lineColor: "#ca4440",//607985",
   lineThickness: 4,
  });
  if(true) {
   graphs.push({
    title: "Выручка",
    valueAxis: "totalAxis2",
    valueField: "total",
    balloonText: "[[value]] тыс.руб.",
    bullet: "circle",
    bulletSize: 12,
    fontSize: 18,
    lineColor: "#607985",
    lineThickness: 4,
    color: "#666",
    // type: "column"
   });
  }

  const config = {
   type: "serial",
   theme: "light",
   zoomOutText: "Назад",
   fontSize: 20,
   thousandsSeparator: " ",
   legend: {
    fontSize: 20,
    position: "bottom",
   },
   graphs: graphs,
   valueAxes: [{
    id: "totalAxis",
    position: "right",
    tickLength: 0,
    labelsEnabled: false,
    axisAlpha: 0,
    gridAlpha: 0,
    maximum: 500,
   }, {
    id: "totalAxis2",
    position: "right",
    tickLength: 0,
    labelsEnabled: false,
    axisAlpha: 0,
    gridAlpha: 0,
    maximum: 1000000,
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
    cursorAlpha: .8,
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