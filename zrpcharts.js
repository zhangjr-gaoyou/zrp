javascript:
if (window.ZrpChartScriptHasRun) {
  console.log("zrp charts scripts has run!");
} else {

  console.log("start load echarts library ...");
  $axure.utils.loadJS('https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js');
  setTimeout(function () {

    /*
      data-label format as 'zrp-line1-chart' is echarts. 
    */
    let chartElements = $('[data-label*= zrp]');

    for (let ce = 0; ce < chartElements.length; ce++) {

      let thiswidget = chartElements[ce].getAttribute("data-label");
      console.log("this widget is", thiswidget);

      let arrnames = thiswidget.split("-");

      let chartstr = arrnames[0] + '-' + arrnames[1] + '-chart';
      let repeaterstr = arrnames[0] + '-' + arrnames[1] + '-data';
      let configstr = arrnames[0] + '-' + arrnames[1] + '-config';

      console.log('elements = ', chartstr, repeaterstr, configstr);

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
        let curr_repeater_dom = $('[data-label=' + repeaterstr + ']').get(chart_idx * 2);

        let curr_repeater_id = $('[data-label=' + repeaterstr + ']').get(chart_idx * 2).id;
        let curr_config_id = $('[data-label=' + configstr + ']').get(chart_idx * 2).id;
        console.log(curr_repeater_dom);
        console.log(curr_repeater_id);

        switch (arrnames[1]) {
          case 'bar3':
            {
              /* get repeater data */
              let repeater;
              $axure(function (obj) {
                return obj.type == 'repeater';
              }).each(function (obj, id) {
                if (id == curr_repeater_id) {
                  repeater = obj;
                }
              });
              console.log(repeater.dataProps);
              console.log(repeater.data);
              console.log(repeater);


              /* get config data */
              let configer;
              $axure(function (obj) {
                return obj.type == 'repeater';
              }).each(function (obj, id) {
                if (id == curr_config_id) {
                  configer = obj;
                }
              });
              console.log(configer.dataProps);
              console.log(configer.data);



              let yaxisdata = [];
              let seriesdata = [];

              for (let tmpi = 0; tmpi < repeater.data.length; tmpi++) {

                yaxisdata.push(repeater.data[tmpi].name.text);

                seriesdata.push(repeater.data[tmpi].value.text);

              }



              console.log("dataset=", yaxisdata, seriesdata);
              let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

              let option = {

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
                  /*
                  data: ['数据一', '数据二', '数据三', '数据四', '数据五', '数据六', '数据七']
                  */
                  data: yaxisdata
                },
                series: [
                  {
                    name: configer.data[0].dimname.text,
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                      color: configer.data[0].bgcolor.text,
                      borderRadius: 2
                    },

                    color:
                    {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 1,
                      colorStops: [{
                        offset: 0, color: configer.data[0].bar0color.text
                      }, {
                        offset: 1, color: configer.data[0].bar1color.text
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
          case 'line4':
            {/* get repeater data */
              let repeater;
              $axure(function (obj) {
                return obj.type == 'repeater';
              }).each(function (obj, id) {
                if (id == curr_repeater_id) {
                  repeater = obj;
                }
              });
              console.log(repeater.dataProps);
              console.log(repeater.data);


              /* get config data */
              let configer;
              $axure(function (obj) {
                return obj.type == 'repeater';
              }).each(function (obj, id) {
                if (id == curr_config_id) {
                  configer = obj;
                }
              });
              console.log(configer.dataProps);
              console.log(configer.data);

              let xdatas = configer.data[0].xdata.text.split(',');



              let dataset = [];
              let ydatas = [];
              for (let j = 0; j < repeater.data.length; j++) {

                ydatas.push(repeater.data[j].name.text);
                let ydata = repeater.data[j].values.text.split(',');

                let datastr = {};
                datastr.name = repeater.data[j].name.text;
                datastr.data = repeater.data[j].values.text.split(',');

                datastr.type = repeater.data[j].type.text;
                datastr.stack = repeater.data[j].stack.text;
                datastr.smooth = (repeater.data[j].smooth.text === 'true');

                let lineStyle = {};
                lineStyle.color = repeater.data[j].linecolor.text;
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

                colorStop.color = repeater.data[j].offset1color.text;
                colorStop.offset = 0;
                colorStops.push(colorStop);

                colorStop.color = repeater.data[j].offset2color.text;
                colorStop.offset = 0.5;
                colorStops.push(colorStop);

                colorStop.color = repeater.data[j].offset3color.text;
                colorStop.offset = 1;
                colorStops.push(colorStop);

                color.colorStops = colorStops;
                areaStyle.color = color;
                areaStyle.opacity = repeater.data[j].opacity.text;

                datastr.areaStyle = areaStyle;

                console.log("datastr=", datastr);

                dataset.push(datastr);

              }

              console.log("dataset=", dataset);
              let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

              option = {
                legend: {
                  show: (configer.data[0].legendshow.text === 'true'),
                  top: 'top'
                },
                grid: {
                  top: '10%',
                  bottom: '10%'
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: xdatas
                },
                yAxis: {
                  type: 'value'
                },

                series: dataset
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
