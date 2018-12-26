import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";
import svgChild from "../svg/child.svg";
import svgIn from "../svg/in.svg";
import svgMan from "../svg/man.svg";
import svgOut from "../svg/out.svg";
import svgWoman from "../svg/woman.svg";
import {numberWithSeparator} from "../utils";
import StaffPopup from './StaffPopup';

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
  window.document.title = "Сотрудники";
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
     const deltaSpan = (delta)? (" <span style='font-size:80%; color:"+((delta>0)?"#090":"#D00")+"'>"+((delta>0)?"+":"-")+Math.abs(delta)+"</span>"): "";
     return "<b>" + title + "</b><br/>" + numberWithSeparator(dataContext[valueField]) + deltaSpan;
    }

    return null;
   },
   // balloonText: "<b>[[title]]</b><br>[[value]]",
   valueField: depKey,
   fillAlphas: .8,
   type: "column",
  }));
  graphs.push({
   title: "Сотрудники",
   valueField: "total",
   labelText: "[[total]]",
   balloonText: "",
   bullet: "none",
   fontSize: 28,
   lineThickness: 2,
   lineAlpha: .1,
   dashLength: 8,
   lineColor: "#D00",
   color: "#333",
   visibleInLegend: false
  });

  const config = {
   type: "serial",
   theme: "light",
   zoomOutText: "Назад",
   fontSize: 24,
   legend: {
    fontSize: 20,
    position: "bottom",
    equalWidths: false,
   },
   graphs: graphs,
   valueAxes: [{
    stackType: "regular",
    fontSize: 18
   }],
   categoryField: "year",
   categoryAxis: {
    gridPosition: "start",
    axisAlpha: 0,
    tickLength: 0,
    fontSize: 20,
   },
   chartCursor: {
    cursorAlpha: .8,
    cursorColor: "#D00",
    enabled: !Boolean(year),
   },
   listeners: [
    {
     event: "clickGraphItem",
     method: e => {
      const year = e.item.category
      this.setState({year})
     }
    },
   ],
   dataProvider: this.state.dataProvider
  }

  return (
   <div className="App-body">
    <header>
     <h1>Сотрудники</h1>
     <Menu selected="staff" />
    </header>
    <div className="Chart Box StaffBox">
     <div className="BoxChart">
      <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
     </div>
     <div className="BoxLabels">
      <ul>
       <li>
        <div className="icon"><img src={svgIn} alt={"Принято"} /></div>
        <div className="title"><div className="name">Принято</div></div>
        <div className="data"><div className="value">103 <span className="measure">человека</span></div></div>
       </li>
       <li>
        <div className="icon"><img src={svgOut} alt={"Уволено"} /></div>
        <div className="title"><div className="name">Уволено</div></div>
        <div className="data"><div className="value">98 <span className="measure">человек</span></div></div>
       </li>
       <li>
        <div className="icon"><img src={svgMan} alt={"Мужчины"} /></div>
        <div className="title"><div className="name">Мужчины</div></div>
        <div className="data"><div className="value">304 <span className="measure">человека</span></div></div>
       </li>
       <li>
        <div className="icon"><img src={svgWoman} alt={"Женщины"} /></div>
        <div className="title"><div className="name">Женщины</div></div>
        <div className="data"><div className="value">58 <span className="measure">человек</span></div></div>
       </li>
       <li>
        <div className="icon"><img src={svgChild} alt={"Родилось"} /></div>
        <div className="title"><div className="name">Родилось</div></div>
        <div className="data"><div className="value">18 <span className="measure">детей</span></div></div>
       </li>
      </ul>
     </div>
     <StaffPopup year={this.state.year} onClose={this.closePopup} />
    </div>
   </div>
  )
 }
}

export default Staff;