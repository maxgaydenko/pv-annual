import React from 'react';
import AmCharts from "@amcharts/amcharts3-react";

class Staff extends React.Component {
 componentWillMount() {
  const dataProviderHash = window._pvad.team.reduce((p,c)=>{
   c.data.forEach(d => {
    if(p[d.y])
     p[d.y] += d.v;
    else
     p[d.y] = d.v;
   })
   return p;
  }, {});
  const dataProvider = Object.keys(dataProviderHash).map(y => ({y, v:dataProviderHash[y]}));
  // const dataProvider = [{y: 2015, v: 2}, {y: 2006, v: 9}, {y: 2007, v: 45}];
  this.setState({dataProvider});
 }

 render() {
  const config = {
   type: "serial",
   theme: "light",
   graphs: [
    {
     // title: "Численность",
     valueField: "v",
     bullet: "round",
     bulletSize: 7,
     lineThickness: 3,
     // type: "column",
    }
   ],
   categoryField: "y",
   categoryAxis: {
    gridPosition: "start",
    axisAlpha: 0,
    tickLength: 0
   },
   dataProvider: this.state.dataProvider
  }

  return (
   <div className="Chart">
    <AmCharts.React style={{width: "100%", height: "100%"}} options={config}/>
   </div>
  )
 }
}

export default Staff;