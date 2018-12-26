import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";
import {numberWithSeparator} from "../utils";



class ContractorPie extends React.Component {
 componentWillMount() {
  const yearData = window._pvad.contractorData.filter(f => f.year===2018)[0];
  const yearDataPrev = window._pvad.contractorData.filter(f => f.year===2017)[0];

  const dataProviderCurrent = yearData? Object.keys(yearData.data).map(key=>{
   const contractor = window._pvad.contractors[key];
   if(contractor) {
    const isComplex = (typeof yearData.data[key] === "object");
    return {
     key: key,
     name: contractor.name,
     color: contractor.color,
     value: (isComplex? Object.keys(yearData.data[key]).reduce((p,c)=>{
      return p + yearData.data[key][c];
     }, 0): yearData.data[key]),
     details: (isComplex? Object.keys(yearData.data[key]).map(c => ({label:window._pvad.proceedsDepartments[c].name, value:yearData.data[key][c]})): null),
     expanded: (isComplex? false: null)
    }
   }
   return null;
   // return contractor? {key:c, name:contractor.name, color:contractor.color, value:yearData.data[c]}: null;
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
  window.document.title = "Выручка по контрагентам за 2018 год";
 }

 dataProviderFunction = () => {
  return this.state.dataProvider.reduce((p,c) => {
   if(c.expanded) {
    c.details.forEach(dt => {
     const percent = dt.label;
     const value = dt.value;
     const delta = null;
     p.push({...c, percent, value, delta})
    })
   }
   else {
    p.push({...c});
   }
   return p;
  }, []);
 }

 toggleExpanded = (key) => {
  const dataProvider = this.state.dataProvider.map(d => {
   if(d.key === key && d.expanded !== null) {
    const expanded = !d.expanded;
    return {...d, expanded};
   }
   return {...d};
  });
  this.setState({dataProvider});
 }

 render() {
  const config = {
   type: "pie",
   theme: "light",
   fontSize: 20,
   startAngle: 333,
   marginBottom: 0,
   marginTop: 0,
   thousandsSeparator: " ",
   startDuration: 0,
   titleField: "name",
   valueField: "value",
   colorField: "color",
   pulledField: "expanded",
   labelsEnabled: false,
   pullOutRadius: "10%",
   innerRadius: "50%",
   balloon:{
    fixedPosition:true,
   },
   balloonFunction:(a) => {
    const row = a.dataContext;
    const deltaSpan = (row.delta != null)? ("<span style='font-size:80%; color:"+((row.delta>0)?"#090":"#D00")+"'>"+((row.delta>0)?"+":"")+numberWithSeparator(row.delta)+" тыс.руб</span>"): ""
    return "<b>"+row.name+"</b><br/>" + (parseFloat(row.percent)? (row.percent.toFixed(2)+"%"): row.percent) + "<br/>" + numberWithSeparator(row.value) + " тыс.руб<br/>"+deltaSpan;
   },
   listeners: [
    {
     event:"clickSlice",
     method:(e)=>{
      const chart = e.chart;
      chart.validateData();
      // const chart = e.chart;
      // const ctx = e.dataItem.dataContext;
      // console.log("CTX", ctx);
      // this.toggleExpanded(ctx.key);
      // chart.dataProvider = this.dataProviderFunction();
      // chart.validateData();
      // const exp = ctx.expanded;
      // if(exp !== null)
      //  this.toggleExpanded(ctx.key);
      // setTimeout(()=>{
      //  if(exp !== null)
      //   chart.dataProvider = this.dataProviderFunction();
      //  chart.validateData();
      // }, 20)
     }
    },
   ],
   dataProvider: this.dataProviderFunction()
  };

  return (
   <div className="App-body">
    <header>
     <h1>Контрагенты за 2018 год</h1>
     <Menu selected="contractor-pie" />
    </header>
    <div className="Chart Box PieBox">
     <div className="BoxChart">
      <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
     </div>
     <div className="BoxLabels" id="contractor-legend-div">
      <ul>
       {this.state.dataProvider.map(d => (
        <li key={d.key}>
         <div className="title">
          <i style={{background:d.color}}></i>
          <div className="name" onClick={()=>this.toggleExpanded(d.key)}>{d.name}</div>
          <div className="percent">{d.percent.toFixed(2)}%</div>
          {(d.details)? <button className={"toggleButton "+(d.expanded?"expanded":"collapsed")} onClick={()=>this.toggleExpanded(d.key)}></button>: null}
         </div>
         {(d.details && d.expanded)? (
          <div className="details">
           {d.details.map(ds => (
            <div key={ds.label} className="detail-row">
             <div className="subvalue">{numberWithSeparator(ds.value)} <span className="measure">тыс.руб</span></div>
             <div className="label">{ds.label}</div>
            </div>
           ))}
          </div>
         ): null}
         <div className="data">
          <div className="value">{numberWithSeparator(d.value)} <span className="measure">тыс.руб</span></div>
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