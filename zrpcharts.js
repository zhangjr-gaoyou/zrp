javascript:
if (window.ZrpChartScriptHasRun) {
  console.log("zrp charts scripts has run!");
} else {

  console.log("start load echarts library ...");
  $axure.utils.loadJS('https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js');
  setTimeout(function () {

    /*
      all item data-label format as 'zrp-' prefix is echarts. 
    */
    let chartElements = $('[data-label*= zrp]');

    for (let ce = 0; ce < chartElements.length; ce++) {

      let thiswidget = chartElements[ce].getAttribute("data-label");
      console.log("this widget is", thiswidget);

      let arrnames = thiswidget.split("-");

      let chartstr = arrnames[0] + '-' + arrnames[1] + '-chart';
      let datastr = arrnames[0] + '-' + arrnames[1] + '-data';
      let configstr = arrnames[0] + '-' + arrnames[1] + '-config';

      console.log('elements = ', chartstr, datastr, configstr);

      let chart_idx = 0;
      let chart_dom = $('[data-label=' + chartstr + ']');
      console.log(chartstr, 'has elements:', chart_dom.length);


      for (let i = 0; i < chart_dom.length; i++) {
        let edom = $('[data-label=' + chartstr + ']').get(i);

        let sel = "#" + edom.id;
        console.log(sel, $(sel).position().left, $(sel).position().top);
        /*
        if ($(sel).position().left == [[This.left]] && $(sel).position().top == [[This.top]]) {
          console.log("This element no:", i);
          chart_idx = i;
        }
        */
        chart_idx = i;
        /* get current chart dom */
        let curr_chart_dom = $('[data-label=' + chartstr + ']').get(chart_idx);
        let curr_data_dom = $('[data-label=' + datastr + ']').get(chart_idx * 2);

        let curr_data_id = $('[data-label=' + datastr + ']').get(chart_idx * 2).id;
        let curr_config_id = $('[data-label=' + configstr + ']').get(chart_idx * 2).id;
        console.log(curr_data_dom);
        console.log(curr_data_id);

        switch (arrnames[1]) {
          case 'pie6':
          case 'pie5':
          case 'pie4':
          case 'pie3':
          case 'pie2':
          case 'pie1': {

            /* get config repeater data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });
            console.log("config column:", config_repeater.dataProps);
            console.log("config data:", config_repeater.data);


            let titleshow = config_repeater.data.find(function (element) {
              return element.item.text === "title.show";
            });
            let titletext = config_repeater.data.find(function (element) {
              return element.item.text === "title.text";
            });
            let titlefontcolor = config_repeater.data.find(function (element) {
              return element.item.text === "title.textstyle.color";
            });
            let titlefontsize = config_repeater.data.find(function (element) {
              return element.item.text === "title.textstyle.fontsize";
            });
            let fontcolor = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.color";
            });
            let serialsname = config_repeater.data.find(function (element) {
              return element.item.text === "serials.name";
            });
            let legendshow = config_repeater.data.find(function (element) {
              return element.item.text === "legend.show";
            });
            let radiusinner = config_repeater.data.find(function (element) {
              return element.item.text === "serials.radius.inner";
            });
            let radiusouter = config_repeater.data.find(function (element) {
              return element.item.text === "serials.radius.outer";
            });

            let radius = [];
            radius.push(radiusinner.value.text || '0%');
            radius.push(radiusouter.value.text || '100%');

            let serialslabelshow = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.show";
            });

            let serialslabellineshow = config_repeater.data.find(function (element) {
              return element.item.text === "serials.labelline.show";
            });
            let serialslabelformatter = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.formatter";
            });
            let serialslabelposition = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.position";
            });
            let serialsemphasisdisable = config_repeater.data.find(function (element) {
              return element.item.text === "serials.emphasis.disable";
            });
            let serialslabelsize = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.fontsize";
            });
            let serialslabelweight = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.fontweight";
            });

            let serialsrosetype = config_repeater.data.find(function (element) {
              return element.item.text === "serials.rosetype";
            });
            let serialsitemstyleborderradius = config_repeater.data.find(function (element) {
              return element.item.text === "serials.itemstyle.borderradius";
            });
            let serialslabellinelength = config_repeater.data.find(function (element) {
              return element.item.text === "serials.labelline.length";
            });
            let serialslabellinelength2 = config_repeater.data.find(function (element) {
              return element.item.text === "serials.labelline.length2";
            });


            let serialslabelsummary = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.summary";
            });

            let serialslabeldataunit = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.dataunit";
            });




            /* get data repeater  */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);


            /* get and transform data repeater data */

            let dataset = [];
            let summary = 0;
            for (let tmpi = 0; tmpi < data_repeater.data.length; tmpi++) {

              let dataitem = {};
              let itemStyle = {};
              itemStyle.color = data_repeater.data[tmpi].color.text;
              dataitem.value = data_repeater.data[tmpi].value.text;
              dataitem.name = data_repeater.data[tmpi].name.text;
              dataitem.itemStyle = itemStyle;

              summary = summary + Number(data_repeater.data[tmpi].value.text);
              dataset.push(dataitem);

            }

            console.log("dataset=", dataset);


            if (serialslabelsummary && serialslabelsummary.value.text === 'true') {

              serialslabelformatter.value.text = String(titletext.value.text) + '\n' + String(summary) + serialslabeldataunit.value.text;

            }

            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            option = {
              title: {
                show: titleshow ? (titleshow.value.text === 'true') : false,
                text: titletext.value.text,
                left: 'center',
                top: 'middle',
                textStyle: {
                  color: titlefontcolor.value.text,
                  fontSize: titlefontsize.value.text || 20
                }
              },
              tooltip: {
                trigger: 'item'
              },

              legend: {
                show: (legendshow.value.text === 'true'),
                bottom: '5%',
                left: 'center',
                textStyle: {
                  color: fontcolor.value.text
                }
              },
              series: [
                {
                  name: serialsname.value.text,
                  type: 'pie',
                  top: 0,
                  radius: radius,
                  avoidLabelOverlap: false,

                  roseType: serialsrosetype ? serialsrosetype.value.text : false,
                  itemStyle: {
                    borderRadius: serialsitemstyleborderradius ? Number(serialsitemstyleborderradius.value.text) : 0
                  },


                  label: {
                    show: serialslabelshow ? serialslabelshow.value.text === 'true' : false,
                    formatter: serialslabelformatter ? serialslabelformatter.value.text : '{b}: {d}%',
                    color: fontcolor.value.text,
                    position: serialslabelposition ? serialslabelposition.value.text : 'outside',
                    fontSize: serialslabelsize ? serialslabelsize.value.text : 12,
                    fontColor: fontcolor.value.text,
                    fontWeight: serialslabelweight ? serialslabelweight.value.text : 'normal'
                  },

                  labelLine: {
                    show: serialslabelshow ? serialslabelshow.value.text === 'true' : false,
                    length: serialslabellinelength ? Number(serialslabellinelength.value.text) : 5,
                    length2: serialslabellinelength2 ? Number(serialslabellinelength2.value.text) : 5
                  },
                  emphasis: {
                    disabled: serialslabelweight ? serialslabelweight.value.text === 'true' : false
                  },

                  data:
                    dataset

                }
              ]
            };

            /* option end */
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }



          }
            break;
          case 'scatter1': {



            /* get config data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });
            console.log(config_repeater.dataProps);
            console.log(config_repeater.data);



            /* get repeater data */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);


            let dataset = [];
            for (let j = 0; j < data_repeater.data.length; j++) {
              let datastr = {};
              datastr.type = 'scatter';
              datastr.symbolSize = data_repeater.data[j].size.text;

              let itemStyle = {};
              itemStyle.color = data_repeater.data[j].color.text;
              datastr.itemStyle = itemStyle;

              let data = [];
              let pos = [];
              pos.push(data_repeater.data[j].xpos.text);
              pos.push(data_repeater.data[j].ypos.text);
              data.push(pos);

              datastr.data = data;

              console.log("datastr=", datastr);

              dataset.push(datastr);

            }

            console.log("dataset=", dataset);
            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            option = {
              grid: {
                top: '10%',
                bottom: '10%',
                left: '10%',
                right: '10%'
              },
              xAxis: {},
              yAxis: {},
              series: dataset
            };

            /* option end */
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }

          }
            break;

          case 'scatter2': {


            /* get config data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });
            console.log(config_repeater.dataProps);
            console.log(config_repeater.data);

            let axisdata = config_repeater.data.find(function (element) {
              return element.item.text === "axis.data";
            });
            let maxSymbolTimes = config_repeater.data.find(function (element) {
              return element.item.text === "maxSymbolTimes";
            });

            let axisdataArr = axisdata.value.text.split(',');


            let singleAxisLeft = config_repeater.data.find(function (element) {
              return element.item.text === "singleAxis.left";
            });



            /* get repeater data */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);





            let title = [];
            let singleAxis = [];
            let series = [];

            for (let idx = 0; idx < data_repeater.data.length; idx++) {

              /* set title */
              title.push({
                textBaseline: 'middle',
                top: (idx * 90) / data_repeater.data.length + 5 + '%',
                text: data_repeater.data[idx].name.text
              });

              /* set singleAxis */

              singleAxis.push({
                left: singleAxisLeft ? Number(singleAxisLeft.value.text) : 80,
                type: 'category',
                boundaryGap: false,
                data: axisdataArr,
                top: (idx * 90) / data_repeater.data.length + 5 + '%',
                height: '0%',
                axisLabel: {
                  interval: 1
                }
              });


              let valuestr = data_repeater.data[idx].values.text;

              let valueArr = valuestr.split(',');

              let seriesdata = [];

              valueArr.forEach(function (value, idx2) {

                seriesdata.push([idx2 + 1, value]);

              });

              /* set series */
              series.push({
                singleAxisIndex: idx,
                coordinateSystem: 'singleAxis',
                type: 'scatter',
                data: seriesdata,
                symbolSize: function (dataItem) {
                  return dataItem[1] * parseFloat(maxSymbolTimes.value.text);
                }
              });


            }

            console.log("title=", title);
            console.log("singleAxis=", singleAxis);
            console.log("series=", series);
            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            option = {

              grid: {
                top: '10%',
                bottom: '10%',
                left: '10%',
                right: '10%'
              },

              tooltip: {
                position: 'top'
              },

              title: title,
              singleAxis: singleAxis,
              series: series
            };

            /* option end */
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }

          }
            break;

          case 'line3':
          case 'line2':
          case 'line1': {

            /* get config data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });
            console.log(config_repeater.dataProps);
            console.log(config_repeater.data);


            let xaxisdata = config_repeater.data.find(function (element) {
              return element.item.text === "xAxis.data";
            });

            let legendshow = config_repeater.data.find(function (element) {
              return element.item.text === "legend.show";
            });
            let titleshow = config_repeater.data.find(function (element) {
              return element.item.text === "title.show";
            });
            let titletext = config_repeater.data.find(function (element) {
              return element.item.text === "title.text";
            });


            let titlefontcolor = config_repeater.data.find(function (element) {
              return element.item.text === "title.textstyle.color";
            });
            let titlefontsize = config_repeater.data.find(function (element) {
              return element.item.text === "title.textstyle.fontsize";
            });

            let fontcolor = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.color";
            });

            let legendicon = config_repeater.data.find(function (element) {
              return element.item.text === "legend.icon";
            });

            let xAxissplitLineshow = config_repeater.data.find(function (element) {
              return element.item.text === "xAxis.splitLine.show";
            });
            let yAxissplitLineshow = config_repeater.data.find(function (element) {
              return element.item.text === "yAxis.splitLine.show";
            });

            let splitlinecolor = config_repeater.data.find(function (element) {
              return element.item.text === "splitLine.color";
            });

            let xdatas = xaxisdata.value.text.split(',');



            /* get repeater data */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);






            let dataset = [];
            for (let j = 0; j < data_repeater.data.length; j++) {

              let datastr = {};
              datastr.name = data_repeater.data[j].name.text;
              datastr.data = data_repeater.data[j].values.text.split(',');

              datastr.type = data_repeater.data[j].type.text;
              datastr.stack = data_repeater.data[j].stack.text;
              datastr.smooth = (data_repeater.data[j].smooth.text === 'true');

              let lineStyle = {};
              lineStyle.color = data_repeater.data[j].linecolor.text;
              datastr.lineStyle = lineStyle;
              let areaStyle = {};
              let color = {};
              color.type = 'linear';
              color.x = 0;
              color.y = 0;
              color.x2 = 0;
              color.y2 = 1;

              let colorStops = [];
              let colorStop = {};

              colorStop.color = data_repeater.data[j].offset1color.text;
              colorStop.offset = 0;
              colorStops.push(colorStop);

              colorStop.color = data_repeater.data[j].offset2color.text;
              colorStop.offset = 0.5;
              colorStops.push(colorStop);

              colorStop.color = data_repeater.data[j].offset3color.text;
              colorStop.offset = 1;
              colorStops.push(colorStop);

              color.colorStops = colorStops;
              areaStyle.color = color;
              areaStyle.opacity = data_repeater.data[j].opacity.text;

              datastr.areaStyle = areaStyle;

              console.log("datastr=", datastr);

              dataset.push(datastr);

            }

            console.log("dataset=", dataset);
            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            option = {

              title: {
                show: (titleshow.value.text === 'true'),
                text: titletext.value.text,
                left: 'center',
                top: 'middle',
                textStyle: {
                  color: titlefontcolor.value.text,
                  fontSize: titlefontsize.value.text || 20
                }
              },
              tooltip: {
                trigger: 'item'
              },

              legend: {
                show: legendshow ? legendshow.value.text === 'true' : false,
                bottom: '5%',
                top: 'top',
                left: 'center',
                icon: legendicon ? legendicon.value.text : '',
                textStyle: {
                  color: fontcolor.value.text
                }
              },


              grid: {
                left: '5%',
                right: '5%',
                bottom: '10%',
                top: '10%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: {
                  show: xAxissplitLineshow ? xAxissplitLineshow.value.text === 'true' : false,
                  lineStyle: {
                    color: splitlinecolor ? splitlinecolor.value.text : 'grey'
                  }
                },
                data: xdatas
              },
              yAxis: {
                type: 'value',
                splitLine: {
                  show: yAxissplitLineshow ? yAxissplitLineshow.value.text === 'true' : false,
                  lineStyle: {
                    color: splitlinecolor ? splitlinecolor.value.text : 'grey'
                  }
                }
              },

              series: dataset
            };

            /* option end */
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }
          }
            break;

          case 'bar1': {

            /* get config data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });
            console.log(config_repeater.dataProps);
            console.log(config_repeater.data);


            let titleshow = config_repeater.data.find(function (element) {
              return element.item.text === "title.show";
            });
            let titletext = config_repeater.data.find(function (element) {
              return element.item.text === "title.text";
            });
            let titlefontcolor = config_repeater.data.find(function (element) {
              return element.item.text === "title.textstyle.color";
            });
            let titlefontsize = config_repeater.data.find(function (element) {
              return element.item.text === "title.textstyle.fontsize";
            });


            let serialsname = config_repeater.data.find(function (element) {
              return element.item.text === "serials.name";
            });

            let seriesbackgroundStylecolor = config_repeater.data.find(function (element) {
              return element.item.text === "series.backgroundStyle.color";
            });
            let seriescolorcolorStopsoffset1 = config_repeater.data.find(function (element) {
              return element.item.text === "series.color.colorStops.offset1";
            });
            let seriescolorcolorStopsoffset2 = config_repeater.data.find(function (element) {
              return element.item.text === "series.color.colorStops.offset2";
            });

            let serialsitemstyleborderradius = config_repeater.data.find(function (element) {
              return element.item.text === "serials.itemstyle.borderradius";
            });



            /* get repeater data */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);
            console.log(data_repeater);






            let yaxisdata = [];
            let seriesdata = [];

            for (let tmpi = 0; tmpi < data_repeater.data.length; tmpi++) {

              yaxisdata.push(data_repeater.data[tmpi].name.text);

              seriesdata.push(data_repeater.data[tmpi].value.text);

            }



            console.log("dataset=", yaxisdata, seriesdata);
            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            let option = {

              title: {
                show: titleshow ? (titleshow.value.text === 'true') : false,
                text: titletext ? titletext.value.text : ''
              },
              textStyle: {
                fontSize: titlefontsize ? Number(titlefontsize.value.text) : 18,
                color: titlefontcolor ? titlefontcolor.value.text : '#333'
              },

              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },

              grid: {
                left: '3%',
                right: '8%',
                bottom: '3%',
                top: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value'
              },
              yAxis: {
                type: 'category',
                data: yaxisdata
              },
              series: [
                {
                  name: serialsname.value.text,
                  type: 'bar',
                  showBackground: true,
                  backgroundStyle: {
                    color: seriesbackgroundStylecolor.value.text,
                    borderRadius: Number(serialsitemstyleborderradius.value.text)
                  },

                  color:
                  {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: seriescolorcolorStopsoffset1.value.text
                    }, {
                      offset: 1, color: seriescolorcolorStopsoffset2.value.text
                    }],
                    global: false
                  },

                  stack: 'total',
                  label: {
                    show: true,
                    fontSize: 16,
                    backgroundColor: 'transparent',
                    color: 'inherit',
                    position: 'right'
                  },

                  data: seriesdata
                }


              ]
            };
            /* option end */
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }
          }
            break;

          case 'bar5':
          case 'bar4':
          case 'bar3':
          case 'bar2': {


            console.log("read config!");
            /* get config data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });

            console.log(config_repeater.dataProps);
            console.log(config_repeater.data);

            let legendshow = config_repeater.data.find(function (element) {
              return element.item.text === "legend.show";
            });
            let seriesbarWidth = config_repeater.data.find(function (element) {
              return element.item.text === "series.barWidth";
            });

            let xAxisdata = config_repeater.data.find(function (element) {
              return element.item.text === "xAxis.data";
            });
            let xdatas = xAxisdata.value.text.split(',');

            let seriesshowBackground = config_repeater.data.find(function (element) {
              return element.item.text === "series.showBackground";
            });

            let seriesbackgroundStylecolor = config_repeater.data.find(function (element) {
              return element.item.text === "series.backgroundStyle.color";
            });


            let yAxisArr = [];
            let yAxis1 = {};

            yAxis1.type = 'value';

            let yAxis1name = config_repeater.data.find(function (element) {
              return element.item.text === "yAxis1.name";
            });
            if (typeof yAxis1name !== 'undefined' && yAxis1name !== null) {
              yAxis1.name = yAxis1name.value.text;
            };

            let yAxis1min = config_repeater.data.find(function (element) {
              return element.item.text === "yAxis1.min";
            });
            if (typeof yAxis1min !== 'undefined' && yAxis1min !== null) {
              yAxis1.min = Number(yAxis1min.value.text);
            };

            let yAxis1max = config_repeater.data.find(function (element) {
              return element.item.text === "yAxis1.max";
            });
            if (typeof yAxis1max !== 'undefined' && yAxis1max !== null) {
              yAxis1.max = Number(yAxis1max.value.text);
            };

            let yAxis1interval = config_repeater.data.find(function (element) {
              return element.item.text === "yAxis1.interval";
            });
            if (typeof yAxis1interval !== 'undefined' && yAxis1interval !== null) {
              yAxis1.interval = Number(yAxis1interval.value.text);
            };

            let yAxis1formatter = config_repeater.data.find(function (element) {
              return element.item.text === "yAxis1.formatter";
            });


            if (typeof yAxis1formatter !== 'undefined' && yAxis1formatter !== null) {
              let axisLabel = {};
              axisLabel.formatter = yAxis1formatter.value.text;
              yAxis1.axisLabel = axisLabel;
            };

            yAxisArr.push(yAxis1);



            let yAxis2name = config_repeater.data.find(function (element) {
              return element.item.text === "yAxis2.name";
            });
            if (typeof yAxis2name !== 'undefined' && yAxis2name !== null) {

              let yAxis2 = {};
              yAxis2.type = 'value';
              yAxis2.name = yAxis2name.value.text;

              let yAxis2min = config_repeater.data.find(function (element) {
                return element.item.text === "yAxis2.min";
              });
              if (typeof yAxis2min !== 'undefined' && yAxis2min !== null) {
                yAxis2.min = Number(yAxis2min.value.text);
              };

              let yAxis2max = config_repeater.data.find(function (element) {
                return element.item.text === "yAxis2.max";
              });
              if (typeof yAxis2max !== 'undefined' && yAxis2max !== null) {
                yAxis2.max = Number(yAxis2max.value.text);
              };

              let yAxis2interval = config_repeater.data.find(function (element) {
                return element.item.text === "yAxis2.interval";
              });
              if (typeof yAxis2interval !== 'undefined' && yAxis2interval !== null) {
                yAxis2.interval = Number(yAxis2interval.value.text);
              };

              let yAxis2formatter = config_repeater.data.find(function (element) {
                return element.item.text === "yAxis2.formatter";
              });
              if (typeof yAxis2formatter !== 'undefined' && yAxis2formatter !== null) {
                let axisLabel = {};
                axisLabel.formatter = yAxis2formatter.value.text;
                yAxis2.axisLabel = axisLabel;
              };

              yAxisArr.push(yAxis2);
            };


            /* get repeater data */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);

            let valCols = data_repeater.data[0].values.text.split(',').length;
            let totalValue = new Array(valCols).fill(0);

            let isNormalization = false;
            let normalization = config_repeater.data.find(function (element) {
              return element.item.text === "normalization";
            });
            if (typeof normalization !== 'undefined' && normalization !== null) {

              if (normalization.value.text == 'true') {
                isNormalization = true;
                for (let m = 0; m < data_repeater.data.length; m++) {

                  let ydata = data_repeater.data[m].values.text.split(',');
                  for (let n = 0; n < ydata.length; n++) {
                    totalValue[n] = totalValue[n] + Number(ydata[n]);
                  }

                }
              }

            };

            console.log("totalValue=", totalValue);

            let dataset = [];
            let ydatas = [];
            for (let j = 0; j < data_repeater.data.length; j++) {


              ydatas.push(data_repeater.data[j].name.text);

              let datastr = {};
              datastr.name = data_repeater.data[j].name.text;

              if (typeof data_repeater.data[j].type !== 'undefined' && data_repeater.data[j].type !== null) {
                datastr.type = data_repeater.data[j].type.text;
              }
              datastr.stack = data_repeater.data[j].stack.text;


              if (typeof data_repeater.data[j].yaxisindex !== 'undefined' && data_repeater.data[j].yaxisindex !== null) {
                datastr.yAxisIndex = data_repeater.data[j].yaxisindex.text;
              }


              let tooltip = {};
              tooltip.valueFormatter = function (value) {
                return value + ' ' + data_repeater.data[j].unitname.text;
              };
              datastr.tooltip = tooltip;

              if (!isNormalization) {
                datastr.data = data_repeater.data[j].values.text.split(',');
              }
              else {
                let datastr_data = data_repeater.data[j].values.text.split(',');
                datastr.data = datastr_data.map((d, did) =>
                  totalValue[did] <= 0 ? 0 : d / totalValue[did]);
              }


              if (typeof data_repeater.data[j].color !== 'undefined' && data_repeater.data[j].color !== null) {
                let barcolor = data_repeater.data[j].color.text;
                let itemStyle = {};
                itemStyle.color = barcolor;
                datastr.itemStyle = itemStyle;
              }

              datastr.showBackground = seriesshowBackground ? (seriesshowBackground.value.text === 'true') : false;
              let itemBkStyle = {};

              if (typeof seriesbackgroundStylecolor !== 'undefined' && seriesbackgroundStylecolor !== null) {
                itemBkStyle.color = seriesbackgroundStylecolor.value.text;
                datastr.backgroundStyle = itemBkStyle;
              }



              let serieslabelshow = config_repeater.data.find(function (element) {
                return element.item.text === "series.label.show";
              });

              if (typeof serieslabelshow !== 'undefined' && serieslabelshow !== null
                && serieslabelshow.value.text === 'true') {

                console.log("serieslabelshow=", serieslabelshow);
                let label = {};

                label.show = true;
                let serieslabelformatter = config_repeater.data.find(function (element) {
                  return element.item.text === "series.label.formatter";
                });

                if (typeof serieslabelformatter !== 'undefined' && serieslabelformatter !== null) {
                  if (serieslabelformatter.value.text === "PERCENT") {
                    label.formatter = (params) => Math.round(params.value * 1000) / 10 + '%';
                  }
                  else
                    label.formatter = serieslabelformatter.value.text;
                }

                datastr.label = label;

              };




              console.log("datastr=", datastr);

              dataset.push(datastr);

            }
            console.log("dataset=", dataset);
            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                show: legendshow ? (legendshow.value.text === "true") : false
              },
              grid: {
                top: '10%',
                left: '5%',
                right: '5%',
                bottom: '10%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: xdatas,
                  axisPointer: {
                    type: 'shadow'
                  }
                }
              ],

              yAxis: yAxisArr,
              barWidth: seriesbarWidth.value.text,
              series: dataset
            };


            /* option end */
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }
          }
            break;


          case 'map1': {


            /* get config data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });
            console.log(config_repeater.dataProps);
            console.log(config_repeater.data);

            let mapname = config_repeater.data.find(function (element) {
              return element.item.text === "map.name";
            });
            let mapjsonurl = config_repeater.data.find(function (element) {
              return element.item.text === "map.jsonurl";
            });
            let visualMapmin = config_repeater.data.find(function (element) {
              return element.item.text === "visualMap.min";
            });
            let visualMapmax = config_repeater.data.find(function (element) {
              return element.item.text === "visualMap.max";
            });
            let serialslabeldataunit = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.dataunit";
            });
            let serialslabelshow = config_repeater.data.find(function (element) {
              return element.item.text === "serials.label.show";
            });


            /* get repeater data */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);

            let dataset = [];
            for (let j = 0; j < data_repeater.data.length; j++) {


              let datastr = {};
              datastr.name = data_repeater.data[j].name.text;
              datastr.value = data_repeater.data[j].value.text;


              console.log("datastr=", datastr);

              dataset.push(datastr);

            }
            console.log("dataset=", dataset);




            $.get(mapjsonurl.value.text, function (jsjson) {

              echarts.registerMap(mapname.value.text, jsjson);
              var myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');
              option = {

                tooltip: {
                  trigger: 'item',
                  formatter: '{b}<br/>{c} (' + serialslabeldataunit.value.text + ')'
                },
                visualMap: {
                  min: Number(visualMapmin.value.text),
                  max: Number(visualMapmax.value.text),
                  text: ['High', 'Low'],
                  realtime: false,
                  calculable: true,
                  inRange: {
                    color: ['#3e75c1', '#3f77c0', '#5f9bcf']
                  }
                },
                series: [
                  {
                    type: 'map',
                    map: mapname.value.text,
                    label: {
                      show: serialslabelshow ? (serialslabelshow.value.text === 'true') : false
                    },
                    data: dataset
                  }
                ]
              };

              if (option && typeof option === "object") {
                myChart.setOption(option, true);
              }
            });


          }
            break;



          case 'dashboard1': {

            /* get config data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });
            console.log(config_repeater.dataProps);
            console.log(config_repeater.data);


            /* get repeater data */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);
            console.log(data_repeater.data[0].min.text);




            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            option = {
              series: [
                {
                  type: 'gauge',
                  min: data_repeater.data[0].min.text,
                  max: data_repeater.data[0].max.text,
                  axisLine: {
                    lineStyle: {
                      width: 10,
                      color: [
                        [data_repeater.data[0].green.text, '#67e0e3'],
                        [data_repeater.data[0].yellow.text, '#37a2da'],
                        [data_repeater.data[0].red.text, '#fd666d']
                      ]
                    }
                  },
                  pointer: {
                    itemStyle: {
                      color: 'auto'
                    }
                  },
                  axisTick: {
                    distance: -3,
                    length: 3,
                    lineStyle: {
                      color: '#fff',
                      width: 1
                    }
                  },
                  splitLine: {
                    distance: -10,
                    length: 10,
                    lineStyle: {
                      color: '#fff',
                      width: 2
                    }
                  },
                  axisLabel: {
                    color: 'inherit',
                    distance: 14,
                    fontSize: 8

                  },
                  detail: {
                    valueAnimation: true,
                    formatter: '{value}' + data_repeater.data[0].unitname.text,
                    color: 'inherit',
                    fontSize: 10
                  },
                  data: [
                    {
                      value: data_repeater.data[0].value.text
                    }
                  ]
                }
              ]
            };
            /* option end */
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }

          }
            break;

          case 'radar1': {

            /* get config data */
            let config_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_config_id) {
                config_repeater = obj;
              }
            });
            console.log(config_repeater.dataProps);
            console.log(config_repeater.data);


            let titleshow = config_repeater.data.find(function (element) {
              return element.item.text === "title.show";
            });
            let titletext = config_repeater.data.find(function (element) {
              return element.item.text === "title.text";
            });

            let radarindicatorname = config_repeater.data.find(function (element) {
              return element.item.text === "radar.indicator.name";
            });
            let radarindicatormax = config_repeater.data.find(function (element) {
              return element.item.text === "radar.indicator.max";
            });


            let rinames = radarindicatorname.value.text.split(',');
            let rimaxs = radarindicatormax.value.text.split(',');

            let radarindicator = [];

            for (let rino = 0; rino < rinames.length; rino++) {
              let indicator = {};
              indicator.name = rinames[rino];
              indicator.max = Number(rimaxs[rino]);

              radarindicator.push(indicator);

            }


            /* get repeater data */
            let data_repeater;
            $axure(function (obj) {
              return obj.type == 'repeater';
            }).each(function (obj, id) {
              if (id == curr_data_id) {
                data_repeater = obj;
              }
            });
            console.log(data_repeater.dataProps);
            console.log(data_repeater.data);

            let lengenddata = [];

            let dataset = [];
            for (let j = 0; j < data_repeater.data.length; j++) {

              lengenddata.push(data_repeater.data[j].name.text);

              let datastr = {};
              datastr.name = data_repeater.data[j].name.text;
              datastr.value = data_repeater.data[j].values.text.split(',').map(Number);


              console.log("datastr=", datastr);

              dataset.push(datastr);

            }
            console.log("dataset=", dataset);


            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            option = {
              title: {
                show: titleshow ? (titleshow.value.text === 'true') : false,
                text: titletext ? titletext.value.text : ''
              },
              legend: {
                data: lengenddata
              },
              radar: {
                indicator: radarindicator
              },
              series: [
                {
                  name: 'radar name',
                  type: 'radar',
                  data: dataset
                }
              ]

            };
            /* option end */
            if (option && typeof option === "object") {
              myChart.setOption(option, true);
            }

          }
            break;
          default:
            console.log('Default case');

        }


      }

    }

  }, 800);
  window.ZrpChartScriptHasRun = true;

}
