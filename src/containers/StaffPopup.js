import React from "react";
import svgClose from "../svg/close.svg";


class StaffPopup extends React.Component {

 render() {
  const year = this.props.year*1;
  if(!year)
   return null;

  const nowYear = window._pvad.staff.filter(f => f.year===year);
  if(!nowYear[0])
   return null;
  const prevYear = window._pvad.staff.filter(f => f.year===(year-1));
  const data = Object.keys(nowYear[0].data).map(f => {
   const value = nowYear[0].data[f];
   const name = window._pvad.staffDepartments[f].full
   const delta = (prevYear[0] && prevYear[0].data[f])? value - prevYear[0].data[f]: null;
   return {name, value, delta}
  });

  return (
   <div className="PopupBox">
    <div className="Popup PopupStaff">
     <div className="PopupClose" onClick={this.props.onClose}><img src={svgClose} alt={"Закрыть"} /></div>
     <h3>{year}</h3>
     <table>
      <tbody>
      {data.map((d,i) => 
       <tr key={i}>
        <td>{d.name}</td>
        <td>{d.value}</td>
        <td>{d.delta? (<span className={(d.delta>0)?"up":"down"}>{Math.abs(d.delta)}</span>): null}</td>
       </tr>
      )}
      </tbody>
     </table>
    </div>
   </div>
  ) 
 }
}

export default StaffPopup;