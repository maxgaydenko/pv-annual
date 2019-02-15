import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";
import { numberWithSeparator } from '../utils';

const showProceedBar = true;
const showStaffBar = true;

class ProceedsStaff extends React.Component {
 componentWillMount() {
  const persons = window._pvad.staff.reduce((p,c)=>{
   p[c.year] = {total:0,it:0,sv:0,gti:0};
   Object.keys(c.data).forEach(key => {
    p[c.year].total += c.data[key];
   });
   p[c.year].it = c.data['it']? c.data['it']: 0;
   p[c.year].sv = c.data['sv']? c.data['sv']: 0;
   p[c.year].gti = c.data['gti']? c.data['gti']: 0;
   return p;
  }, {});
  // console.table(persons);
  const dataProvider = window._pvad.proceeds.reduce((p,c)=>{
   let item = {year:c.year, total:0};
   Object.keys(c.data).forEach(key => {
    item.total += c.data[key];
   });
   if(persons[c.year]) {
    if(persons[c.year].total) {
     item.pp = Math.round(item.total/persons[c.year].total);
     item.ppLabel = numberWithSeparator(item.pp);
     item.persons = persons[c.year].total;
    }
    if(persons[c.year].it && c.data['it']) {
     item.it = Math.round(c.data['it']/persons[c.year].it);
     item.itLabel = numberWithSeparator(item.it);
    }
    if(persons[c.year].sv && c.data['sv']) {
     item.sv = Math.round(c.data['sv']/persons[c.year].sv);
     item.svLabel = numberWithSeparator(item.sv);
    }
    if(persons[c.year].gti && c.data['gti']) {
     item.gti = Math.round(c.data['gti']/persons[c.year].gti);
     item.gtiLabel = numberWithSeparator(item.gti);
    }
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
  graphs.push(showStaffBar? {
   title: "Сотрудники",
   valueAxis: "totalAxis",
   valueField: "persons",
   balloonText: "Всего: [[value]] чел.",
   bullet: "none",
   fillAlphas: .8,
   fontSize: 18,
   lineColor: "#aa9b87",
   lineThickness: 1,
   color: "#aa9b87",
   type: "column"
  }: {
   title: "Сотрудники",
   valueAxis: "totalAxis",
   valueField: "persons",
   balloonText: "Всего: [[value]] чел.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 18,
   lineColor: "#999999",
   lineThickness: 4,
   color: "#999999",
  });
  graphs.push(showProceedBar? {
   title: "Выручка",
   valueAxis: "totalAxis2",
   valueField: "total",
   balloonText: "Выручка: [[value]] тыс.руб.",
   bullet: "none",
   fillAlphas: .8,
   fontSize: 18,
   lineColor: "#60943f",
   lineThickness: 1,
   color: "#60943f",
   type: "column"
  }: {
   title: "Выручка",
   valueAxis: "totalAxis2",
   valueField: "total",
   balloonText: "Выручка: [[value]] тыс.руб.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 18,
   lineColor: "#60943f",
   lineThickness: 4,
   color: "#60943f",
  });
  graphs.push({
   title: "Выручка на сотрудника",
   valueAxis: "ppAxis",
   valueField: "pp",
   // labelText: "[[ppLabel]]",
   labelOffset: 20,
   balloonText: "На сотрудника [[value]] тыс.руб.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 24,
   lineColor: "#607985",//607985",
   lineThickness: 4,
  });
  graphs.push({
   title: "ИТ",
   valueAxis: "ppAxis",
   valueField: "it",
   // labelText: "[[itLabel]]",
   // labelOffset: 20,
   balloonText: "ИТ: [[value]] тыс.руб.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 24,
   lineColor: "#ca4440",//607985",
   lineThickness: 4,
  });
  graphs.push({
   title: "Супервайзинг",
   valueAxis: "ppAxis",
   valueField: "sv",
   // labelText: "[[svLabel]]",
   // labelOffset: 20,
   balloonText: "Супервайзинг: [[value]] тыс.руб.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 24,
   lineColor: "#d1cf00",//607985",
   lineThickness: 4,
  });
  graphs.push({
   title: "ГТИ",
   valueAxis: "ppAxis",
   valueField: "gti",
   // labelText: "[[gtiLabel]]",
   // labelOffset: 20,
   balloonText: "ГТИ: [[value]] тыс.руб.",
   bullet: "circle",
   bulletSize: 12,
   fontSize: 24,
   lineColor: "#f39b71",//607985",
   lineThickness: 4,
  });

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
    maximum: 600,
   }, {
    id: "totalAxis2",
    position: "right",
    tickLength: 0,
    labelsEnabled: false,
    axisAlpha: 0,
    gridAlpha: 0,
    maximum: 1200000,
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