import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";
import Menu from "./Menu";

class Staff extends React.Component {
 componentWillMount() {
  // const dataProviderHash = window._pvad.team.reduce((p,c)=>{
  //  c.data.forEach(d => {
  //   if(p[d.y])
  //    p[d.y] += d.v;
  //   else
  //    p[d.y] = d.v;
  //  })
  //  return p;
  // }, {});
  // const dataProvider = Object.keys(dataProviderHash).map(y => ({y, v:dataProviderHash[y]}));
  const dataProvider = window._pvad.staff.reduce((p,c)=>{
   let item = {year:c.year, total:0};
   Object.keys(c.data).forEach(key => {
    item[key] = c.data[key];
    item.total += c.data[key];
   })
   p.push(item);
   return p;
  }, []);
  const departments = window._pvad.departments;
  this.setState({dataProvider, departments});
  window.document.title = "Численность";
 }

 render() {
  let graphs = Object.keys(this.state.departments).map(depKey => ({
   title: this.state.departments[depKey],
   balloonText: "<b>[[title]]</b><br>[[category]]: <b>[[value]]</b>",
   valueField: depKey,
   fillAlphas: .8,
   type: "column",
  }));
  graphs.push({
   title: "Численность",
   valueField: "total",
   labelText: "[[total]]",
   bullet: "round",
   bulletSize: 0,
   fontSize: 18,
   lineThickness: 1,
   lineAlpha: .4,
   dashLength: 8,
   lineColor: "#D00",
   // bulletColor: "#DD0000",
   // color: "#DD0000"
  });

  const config = {
   type: "serial",
   theme: "light",
   fontSize: 14,
   legend: {
    fontSize: 10,
    position: "bottom",
    // width: 400,
    // left: 10,
    // top: 5,
   },
   graphs: graphs,
   valueAxes: [{
    stackType: "regular",
   }],
   categoryField: "year",
   categoryAxis: {
    gridPosition: "start",
    axisAlpha: 0,
    tickLength: 0
   },
   dataProvider: this.state.dataProvider
  }

  return (
   <div className="App-body">
    <header>
     <h1>Численность</h1>
     <Menu selected="staff" />
    </header>
    <div className="Chart">
     <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
    </div>
   </div>
  )
 }
}

export default Staff;