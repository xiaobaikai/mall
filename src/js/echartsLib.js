const echartsLib = {
  /*柱状图*/
  Bars(el,param){
    let option = {
      color: ['#2EC7C9'],
      title: {
        x: 'center',
        text: param.title,
        textStyle: {
          color: ['#333'],
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
      grid : {
        left : '16%',
      },
      legend: {
        data: param.legend,
        bottom: 0
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          z: 1,
          type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          lineStyle: {
            color: '#008ACD',
            width: 2
          },
        }
      },
      xAxis: [{
        type: 'category',
        data: param.xAxis,
        axisLine: { //控制x轴
          lineStyle: {
            color: '#ccc',
            shadowOffsetX: 0
          },
        },
        axisTick: { //控制y轴刻度
          show: false,
        },
        axisLabel: { //控制刻度标签
          color: '#666',
        },
      }],
      yAxis: param.yAxis,
      series: param.series
    };
    el.setOption(option);
  },
  /*多柱状图*/
  MutipleBars(el,param){
    console.log(param);
    var	option = {
      title : {
        x: 'center',
        text : param.title?param.title:"所有车间所有产线",
        textStyle : {
          color : '#333',
        }
      },
      grid : {
        left : '12%',
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      legend : {
        data : param.legend?param.legend:["产量"],
        bottom:0,
      } ,
      tooltip: {
        trigger: 'axis'
      },
      xAxis : [
        {
          name : 'h',
          nameGap:0,
          type : 'category',
          data: param.time,
          axisLine : {  //控制x轴
            lineStyle : {
              color : '#ccc',
              shadowOffsetX : 0
            }
          },
          axisTick : {  //控制x轴刻度
            show : false,
          },
          axisLabel :  { //控制刻度标签
            color : '#666',
          },
          boundaryGap : ['100%','100%']
        }
      ],
      yAxis : [
        {
          name:param.unit?param.unit:'单位/米',
          type : 'value',
          boundaryGap: false,
          axisLine : {
            lineStyle : {
              color : '#ccc',
            }
          },
          axisTick : {  //控制y轴刻度
            show : false,
          },
          axisLabel :  { //控制刻度标签
            color : '#666',
          },

        }
      ],
      series : [
        {
          name : '产量',
          type : 'bar',
          symbol : 'circle',
          symbolSize :8,
          stack : 'comm',
          data: param.outputQty,
          itemStyle : {
            normal : {

              color : '#00a0b0',
              barBorderRadius : [500,500,0,0]
            }
          },
          lineStyle : {
            normal : {
              color : ['#9386e0']
            }
          }
        }
      ]
    };
    el.setOption(option);
  },
  /*折线图*/
  lines(el,param){
    let _serias = [];
    let index = 0;
    let _title = param.title?param.title:"";
    let colors = ['#9386DC','#71D4F1','#00A0B0'];
    for(let i in param.outputQty){
      let temp =  param.outputQty[i];
      _serias.push({
        name : param.lines[index],
        type : 'line',
        symbol : 'circle',
        symbolSize :8,
        data : temp,
        itemStyle : {
          normal : {
            color : 'color' in param?param.color : colors[index]
          }
        },
        lineStyle : {
          normal : {
            color : 'color' in param?param.color : colors[index]
          }
        }
      });
      index ++;
    }
    var	option = {
      title: {
        x: 'center',
        text: _title,
        textStyle: {
          color: ['#333'],
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
      grid : {
        left : '15%',
      },
      legend : {
        data : param.lines,
        bottom:0,
        show : 'showLegend' in param?param.showLegend:true,
      } ,
      tooltip: {
        trigger: 'axis'
      },
      xAxis : [{
        name : param.x_unit?param.x_unit:'h',
        nameGap:0,
        type : 'category',
        data : param.time?param.time:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        axisLine : {  //控制x轴
          lineStyle : {
            color : '#ccc',
            shadowOffsetX : 0
          }
        },
        axisTick : {  //控制x轴刻度
          show : false,
        },
        axisLabel :  { //控制刻度标签
          color : '#666',
        },
        boundaryGap : ['100%','100%']
      }],
      yAxis : [
        {
          name: param.y_unit?param.y_unit:'单位/米',
          type : 'value',
          boundaryGap: false,
          axisLine : {
            lineStyle : {
              color : '#ccc',
            }
          },
          splitLine:{
            lineStyle: {
              type: 'dotted'
            }
          },
          axisTick : {  //控制y轴刻度
            show : false,
          },
          axisLabel :  { //控制刻度标签
            color : '#666',
          },

        }
      ],
      series : _serias
    };
    el.setOption(option);
  },
  /*对比图*/
  compare(el,param){
    var	option = {
      color: ['#2EC7C9'],
      title: {
        text: param.title,
        x: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
        }
      },
      grid : {
        left : '16%',
      },
      legend : {
        data : param.legend,
        bottom:0,
      } ,
      tooltip : {
        trigger: 'axis',
        show : true,
        formatter: function (par){
          return par[0].name + ' : '
            + (par[0].value - par[1].value > 0 ? '+':'-')
            + par[3].value + '<br/>'
            + par[0].seriesName + ' : ' + par[0].value + '<br/>'
            + par[1].seriesName + ' : ' + par[1].value + '<br/>'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      xAxis : [
        {
          type : 'category',
          data : param.xAxis,
          axisLabel: {
            color: '#666',
          },
        },
      ],
      yAxis : [
        {
          name:'kw/h',
          type: 'value',
          min : 0,
          nameTextStyle : {
            color : ['#008ACD'],
            fontSize :14
          },
          splitLine:{
            lineStyle: {
              type : 'dotted'
            }
          },
          axisLine: { //控制x轴
            lineStyle: {
              color: '#ccc',
              shadowOffsetX: 0
            }
          },
          axisLabel: { //控制刻度标签
            color: '#666',
          },
          nameTextStyle: {
            color: ['#333333'],
            fontSize: 12
          },
        },
      ],
      series : [
        {
          name :'本周',
          type : 'line',
          symbolSize :15,
          symbol : 'circle',
          itemStyle : {
            normal : {
              color : '#fd545c',
            }
          },
          lineStyle : {
            normal : {
              color : 'rgba(0,0,0,0)'
            }
          },
          data:param.a
        },
        {
          name :'上周',
          type : 'line',
          data:param.b,
          symbolSize : 15,
          show　:　false,
          symbol : 'circle',
          itemStyle : {
            normal : {
              color : '#fecb91',
            }
          },
          lineStyle : {
            normal : {
              color : 'rgba(0,0,0,0)'
            }
          }
        },
        {
          name :'上周2',
          type : 'bar',
          data : (function(){
            var arr = []
            for(var i = 0;i<param.a.length;i++) {
              arr.push(param.a[i]<param.b[i]?param.a[i]:param.b[i])
            }
            return arr;
          })(),
          stack :'1',
          itemStyle : {
            normal : {
              color : 'rgba(0,0,0,0)',
            }
          },
          barWidth : 15
        },
        {
          name :'用水量',
          type : 'bar',
          stack : '1',
          data :(function(){
            var arr = []
            var num = 0;
            for(var i = 0;i<param.a.length;i++) {
              num = param.a[i]-param.b[i]
              if(num<0){
                num = {value :-(num), itemStyle:{ normal:{color:'#96c1c8'}}}
              }
              arr.push(num)
            }
            return arr
          })(),
          itemStyle : {
            normal : {
              color : '#96c1c8',
            }
          },
          barWidth : 15
        },
      ]
    };
    el.setOption(option);
  },
  /*饼状图*/
  pie(el,param){
    var option = {
      title : {
        text: param.title,
        x:'center',
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: ['#0F97A7','#FC4B57','#FDC58C','#8DBAC1','#50CDCD','#73B9EE','#D37078'],
      calculable : true,
      series : [
        {
          name:'统计',
          type:'pie',
          selectdMode: 'single',
          radius : '80%',
          center: ['50%', '50%'],
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inner',
                formatter: '{b}\n {c}'
              },
              labelLine: {
                show: false
              }
            }
          },
          data: param.data
        },
      ]
    };
    el.setOption(option);
  }
};
export default echartsLib;
