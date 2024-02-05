javascript:
if (window.ZrpChartScriptHasRun) {
  console.log("zrp charts scripts has run!");
} else {

  function LoadBaiduMapScript() {
    const AK = '[[ZRP_BAIDUMAP_AK]]';
    const BMap_URL = "http://api.map.baidu.com/api?v=3.0&ak=" + AK + "&callback=onBMapCallback";
    return new Promise((resolve, reject) => {
      if (typeof BMap !== "undefined") {
        resolve(BMap);
        return true;
      }
      window.onBMapCallback = function () {
        console.log("百度地图脚本初始化成功...");
        console.log(BMap_URL);
        resolve(BMap);
      };
      let scriptNode = document.createElement("script");
      scriptNode.setAttribute("src", BMap_URL);
      document.head.appendChild(scriptNode);
    });
  }
  function loadAsyncScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === 'complete' || script.readyState === 'loaded') {
          callback();
        }
      }
    } else {
      script.onload = function () {
        callback();
      }
    }
    script.src = url;
    document.head.appendChild(script);
  }
  
  LoadBaiduMapScript();
  

  loadAsyncScript('https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js', function () {
    console.log("脚本1初始化成功...");
    loadAsyncScript('https://cdn.jsdelivr.net/npm/echarts@5/dist/extension/bmap.min.js', function () {
      console.log("脚本2初始化成功...");

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


              case 'map2': {

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
                let titlesubtext = config_repeater.data.find(function (element) {
                  return element.item.text === "title.subtext";
                });
                let baiduak = config_repeater.data.find(function (element) {
                  return element.item.text === "baidu.ak";
                });
                let bmapcenterlon = config_repeater.data.find(function (element) {
                  return element.item.text === "bmap.center.lon";
                });
                let bmapcenterlat = config_repeater.data.find(function (element) {
                  return element.item.text === "bmap.center.lat";
                });
                let bmapmapStyle = config_repeater.data.find(function (element) {
                  return element.item.text === "bmap.mapStyle";
                });
                let scattertopn = config_repeater.data.find(function (element) {
                  return element.item.text === "scatter.topn";
                });
                let scattermaxSymbolSize = config_repeater.data.find(function (element) {
                  return element.item.text === "scatter.maxSymbolSize";
                });
                let scattername = config_repeater.data.find(function (element) {
                  return element.item.text === "scatter.name";
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





                let centerpos = [];
                centerpos.push(bmapcenterlon.value.text);
                centerpos.push(bmapcenterlat.value.text);


                let dataset = [];

                for (let j = 0; j < data_repeater.data.length; j++) {
                  let datastr = {};
                  datastr.name = data_repeater.data[j].name.text;
                  let value = [];
                  value.push(data_repeater.data[j].lon.text);
                  value.push(data_repeater.data[j].lat.text);
                  value.push(data_repeater.data[j].value.text);
                  datastr.value = value;
                  console.log("datastr=", datastr);
                  dataset.push(datastr);
                }

                console.log("dataset=", dataset);



                let dataset2 = dataset
                  .sort(function (a, b) { return parseInt(b.value[2]) - parseInt(a.value[2]); })
                  .slice(0, Number(scattertopn.value.text));


                let symboltimes = parseInt(dataset2[0].value[2]) / parseInt(scattermaxSymbolSize.value.text);



                console.log("dataset2=", dataset2);

                let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');


                option = {
                  backgroundColor: 'transparent',
                  title: {
                    show: titleshow ? (titleshow.value.text === 'true') : false,
                    text: titletext.value.text,
                    subtext: titlesubtext.value.text,
                    left: 'center'
                  },
                  tooltip: {
                    trigger: 'item'
                  },
                  bmap: {
                    center: centerpos,
                    zoom: 5,
                    roam: true,
                    mapStyle: {
                      style: bmapmapStyle.value.text,
                      opacity: 1
                    }
                  },
                  series: [
                    {
                      name: scattername.value.text,
                      type: 'scatter',
                      itemStyle: {
                        color: "#00a876"
                      },
                      coordinateSystem: 'bmap',
                      data: dataset,
                      symbolSize: function (val) {
                        return val[2] / symboltimes;
                      },
                      encode: {
                        value: 2
                      },
                      label: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                      },
                      emphasis: {
                        label: {
                          show: true
                        }
                      }
                    },
                    {
                      name: 'Top N',
                      type: 'effectScatter',
                      coordinateSystem: 'bmap',

                      data: dataset2,
                      symbolSize: function (val) {
                        return val[2] / symboltimes;
                      },
                      encode: {
                        value: 2
                      },
                      showEffectOn: 'render',
                      rippleEffect: {
                        brushType: 'stroke'
                      },
                      label: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                      },
                      itemStyle: {
                        color: '#ed7b2f',
                        shadowBlur: 10,
                        shadowColor: '#951114'
                      },
                      emphasis: {
                        scale: true
                      },
                      zlevel: 1
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

      }, 2000);
    });

  });
  window.ZrpChartScriptHasRun = true;

}
