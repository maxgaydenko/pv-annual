import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";
import {numberWithSeparator} from "../utils";

class ContractorPie extends React.Component {
 componentWillMount() {
  const yearData = window._pvad.contractorData.filter(f => f.year===2017)[0];
  const yearDataPrev = window._pvad.contractorData.filter(f => f.year===2016)[0];

  const dataProviderCurrent = yearData? Object.keys(yearData.data).map(c=>{
   const contractor = window._pvad.contractors[c];
   return contractor? {key:c, name:contractor.name, color:contractor.color, value:yearData.data[c]}: null;
  }).filter(f => f !== null): [];
  const total = dataProviderCurrent.reduce((p,c) => (p+c.value), 0);
  const dataProvider = dataProviderCurrent.map(dpc => {
   const prevValue = (yearDataPrev && yearDataPrev.data[dpc.key])? yearDataPrev.data[dpc.key]: null;
   const delta = (prevValue !== null)? (dpc.value - prevValue): null;
   const percent = 100*dpc.value/total;
   // const label = (percent >= 5)? percent.toFixed(2)+"%": "";
   return {...dpc, prevValue, delta, percent};
  }).sort((a,b) => (a.value > b.value)? -1: 1);
  this.setState({dataProvider});
  window.document.title = "Выручка по контрагентам за 2017 год";
 }

 render() {
  const config = {
   type: "pie",
   theme: "light",
   fontSize: 20,
   marginBottom: 0,
   marginTop: 0,
   thousandsSeparator: " ",
   startDuration: 0,
   titleField: "name",
   valueField: "value",
   colorField: "color",
   labelsEnabled: false,
   // labelText: "[[label]]",
   // color: "#FFF",
   // labelRadius: "-60%",
   pullOutRadius: "10%",
   innerRadius: "50%",
   balloon:{
    fixedPosition:true,
   },
   balloonFunction:(a) => {
    const row = a.dataContext;
    const deltaSpan = (row.delta != null)? ("<span style='font-size:80%; color:"+((row.delta>0)?"#090":"#D00")+"'>"+((row.delta>0)?"+":"")+numberWithSeparator(row.delta)+" тыс.руб</span>"): ""
    return "<b>"+row.name+"</b><br/>" + row.percent.toFixed(2) + "%<br/>" + numberWithSeparator(row.value) + " тыс.руб<br/>"+deltaSpan;
   },
   dataProvider: this.state.dataProvider
  };

  return (
   <div className="App-body">
    <header>
     <h1>Контрагенты за 2017 год</h1>
     <Menu selected="contractor-pie" />
    </header>
    <div className="Chart PieBox">
     <div className="Pie">
      <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
     </div>
     <div className="PieLabels" id="contractor-legend-div">
      <ul>
       {this.state.dataProvider.map(d => (
        <li key={d.key}>
         <div className="title">
          <i style={{background:d.color}}></i>
          <div className="name">{d.name}</div>
          <div className="percent">{d.percent.toFixed(2)}%</div>
         </div>
         <div className="data">
          <div className="value">{numberWithSeparator(d.value)} <span className="rubs">тыс.руб</span></div>
          <div className="delta">{(d.delta)?(
           <span className={(d.delta>0)?"good":"bad"}>{numberWithSeparator(Math.abs(d.delta))} тыс.руб</span>
          ):""}</div>
         </div>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </div>
  )
 }
}

export default ContractorPie;