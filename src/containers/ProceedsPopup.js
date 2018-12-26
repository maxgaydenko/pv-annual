import React from "react";
import AmCharts from "@amcharts/amcharts3-react";
import svgClose from "../svg/close.svg";
import {numberWithSeparator} from "../utils";


class ProceedsPopup extends React.Component {

 render() {
  const year = this.props.year*1;
  if(!year)
   return null;

  const nowYear = window._pvad.proceeds.filter(f => f.year===year);
  if(!nowYear[0])
   return null;
  const prevYear = window._pvad.proceeds.filter(f => f.year===(year-1));
  const data = Object.keys(nowYear[0].data).map(f => {
   const value = nowYear[0].data[f];
   const name = window._pvad.proceedsDepartments[f].name;
   const color = window._pvad.proceedsDepartments[f].color;
   const delta = (prevYear[0] && prevYear[0].data[f])? value - prevYear[0].data[f]: null;
   return {name, value, delta, color}
  });

  const config = {
   type: "pie",
   theme: "light",
   fontSize: 20,
   startAngle: 210,
   marginBottom: 0,
   marginTop: 0,
   thousandsSeparator: " ",
   startDuration: 0,
   titleField: "name",
   valueField: "value",
   colorField: "color",
   pulledField: "expanded",
   labelsEnabled: true,
   labelFunction:(a) => {
    const row = a.dataContext;
    const percents = a.percents;
    console.log("A", row, percents);
    return row.name+"\n"+percents.toFixed(2)+"%";
   },
   pullOutRadius: "10%",
   innerRadius: "50%",
   balloon:{
    fixedPosition:false,
   },
   balloonFunction:(a) => {
    const row = a.dataContext;
    const deltaSpan = (row.delta != null)? ("<span style='font-size:80%; color:"+((row.delta>0)?"#090":"#D00")+"'>"+((row.delta>0)?"+":"")+numberWithSeparator(row.delta)+" тыс.руб</span>"): ""
    return "<b>"+row.name+"</b><br/>" + (parseFloat(row.percent)? (row.percent.toFixed(2)+"%"): row.percent) + "<br/>" + numberWithSeparator(row.value) + " тыс.руб<br/>"+deltaSpan;
   },
   dataProvider: data
  }

  return (
   <div className="PopupBox">
    <div className="Popup PopupStaff">
     <div className="PopupClose" onClick={this.props.onClose}><img src={svgClose} alt={"Закрыть"} /></div>
     <h3>{year}</h3>
     {/* <div className="pie">
      <AmCharts.React style={{width:"100%", height:"100%"}} options={config} />
     </div> */}
     <table>
      <tbody>
      {data.map((d,i) => 
       <tr key={i}>
        <td>{d.name}</td>
        <td>{numberWithSeparator(d.value)} <span>тыс.руб.</span></td>
        <td>{d.delta? (<span className={(d.delta>0)?"up":"down"}>{numberWithSeparator(Math.abs(d.delta))} <span>тыс.руб.</span></span>): null}</td>
       </tr>
      )}
      </tbody>
     </table>
    </div>
   </div>
  ) 
 }
}

export default ProceedsPopup;