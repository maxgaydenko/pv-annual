import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";

class ContractorBars extends React.Component {
 componentWillMount() {
  const dataProvider = window._pvad.contractorData.reduce((p,c)=>{
   let item = {year:c.year, total:0};
   Object.keys(c.data).forEach(key => {
    item[key] = c.data[key];
    item.total += c.data[key];
   })
   p.push(item);
   return p;
  }, []);
  const contractors = window._pvad.contractors;
  this.setState({dataProvider, contractors});
  window.document.title = "Выручка по контрагентам";
 }

 render() {
  let graphs = Object.keys(this.state.contractors).map(depKey => ({
   title: this.state.contractors[depKey].name,
   balloonText: "[[title]]<br/><b>[[value]] тыс.руб.</b>",
   valueField: depKey,
   fillAlphas: .8,
   type: "column",
  }));
  graphs.push({
   title: "Выручка по контрагентам",
   valueField: "total",
   labelText: "[[total]]",
   bullet: "none",
   fontSize: 18,
   lineThickness: 2,
   lineAlpha: .2,
   dashLength: 8,
   lineColor: "#D00",
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
    stackType: "regular",
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
     <h1>Выручка по контрагентам</h1>
     <Menu selected="contractor-bars" />
    </header>
    <div className="Chart">
     <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
    </div>
   </div>
  )
 }
}

export default ContractorBars;