import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";
import {numberWithSeparator} from "../utils";
import ProceedsPopup from './ProceedsPopup';

class Proceeds extends React.Component {
 // state = {year:2017}

 componentWillMount() {
  const dataProvider = window._pvad.proceeds.reduce((p,c)=>{
   let item = {year:c.year, total:0};
   Object.keys(c.data).forEach(key => {
    item[key] = c.data[key];
    item.total += c.data[key];
   })
   p.push(item);
   return p;
  }, []);
  const departments = window._pvad.proceedsDepartments;
  this.setState({dataProvider, departments});
  window.document.title = "Выручка по подразделениям";
 }

 closePopup = () => this.setState({year:null})

 render() {
  const year = this.state.year;
  const graphs = Object.keys(this.state.departments).map(depKey => ({
   title: this.state.departments[depKey].name,
   lineColor: this.state.departments[depKey].color,
   balloonFunction: function(a, b) {
    if(year)
     return null;
    const category = a.category;
    const dataContext = a.dataContext;
    const valueField = b.valueField;
    const title = b.title;
    const data = b.data;

    const prevYear = category*1 - 1;
    const prevData = data.filter(f => f.dataContext.year===prevYear)[0];

    if(title && valueField && dataContext[valueField]) {
     const delta = (prevData && prevData.dataContext && prevData.dataContext[valueField])? (dataContext[valueField] - prevData.dataContext[valueField]): null;
     const deltaSpan = (delta)? ("<br/><span style='font-size:80%; color:"+((delta>0)?"#090":"#D00")+"'>"+((delta>0)?"+":"-")+numberWithSeparator(Math.abs(delta))+" тыс.руб.</span>"): "";
     return "<b>" + title + "</b><br/>" + numberWithSeparator(dataContext[valueField]) + " <span style='font-size:80%'>тыс.руб.</span>" + deltaSpan;
    }

    return null;
   },
   // balloonText: "[[title]]<br/><b>[[value]] тыс.руб.</b>",
   valueField: depKey,
   fillAlphas: .8,
   type: "column",
  }));
  graphs.push({
   title: "Выручка по подразделениям",
   valueField: "total",
   labelText: "[[total]]",
   balloonText: "",
   bullet: "none",
   fontSize: 24,
   lineThickness: 2,
   lineAlpha: .1,
   dashLength: 8,
   lineColor: "#D00",
   // bulletColor: "#DD0000",
   color: "#666",
   visibleInLegend:false,
  });

  const config = {
   type: "serial",
   theme: "light",
   zoomOutText: "Назад",
   fontSize: 24,
   thousandsSeparator: " ",
   legend: {
    fontSize: 20,
    position: "bottom",
    equalWidths: false,
   },
   graphs: graphs,
   valueAxes: [{
    stackType: "regular",
    fontSize: 18,
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
    enabled: !Boolean(year),
   },
   listeners: [{
    event: "clickGraphItem",
    method: e => {
     const year = e.item.category
     this.setState({year})
    }
   }],
   dataProvider: this.state.dataProvider
  }

  return (
   <div className="App-body">
    <header>
     <h1>Выручка по подразделениям</h1>
     <Menu selected="proceeds" />
    </header>
    <div className="Chart">
     <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
     <ProceedsPopup year={this.state.year} onClose={this.closePopup} />
    </div>
   </div>
  )
 }
}

export default Proceeds;