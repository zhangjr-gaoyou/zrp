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
            console.log("config column:",config_repeater.dataProps);
            console.log("config data:",config_repeater.data);

            
            let titleshow=  config_repeater.data.find(function(element) {
              return element.item.text === "title.show";
            });
            let titletext=  config_repeater.data.find(function(element) {
              return element.item.text === "title.text";
            });
            let titlefontcolor=  config_repeater.data.find(function(element) {
              return element.item.text === "title.textstyle.color";
            });
            let titlefontsize=  config_repeater.data.find(function(element) {
              return element.item.text === "title.textstyle.fontsize";
            });
            let fontcolor=  config_repeater.data.find(function(element) {
              return element.item.text === "serials.label.color";
            });
            let serialsname=  config_repeater.data.find(function(element) {
              return element.item.text === "serials.name";
            });
            let legendshow=  config_repeater.data.find(function(element) {
              return element.item.text === "legend.show";
            });
            let radiusinner=  config_repeater.data.find(function(element) {
              return element.item.text === "serials.radius.inner";
            });
            let radiusouter=  config_repeater.data.find(function(element) {
              return element.item.text === "serials.radius.outer";
            });

            let radius=[];
            radius.push(radiusinner.value.text || '0%');
            radius.push(radiusouter.value.text || '100%');

            let serialslabelshow =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.label.show";
            });

            let serialslabellineshow =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.labelline.show";
            });
            let serialslabelformatter =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.label.formatter";
            });
            let serialslabelposition =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.label.position";
            });
            let serialsemphasisdisable =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.emphasis.disable";
            });
            let serialslabelsize =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.label.fontsize";
            });
            let serialslabelweight =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.label.fontweight";
            });
            
            let serialsrosetype =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.rosetype";
            });
            let serialsitemstyleborderradius =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.itemstyle.borderradius";
            });
            let serialslabellinelength =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.labelline.length";
            });
            let serialslabellinelength2 =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.labelline.length2";
            });


            let serialslabelsummary =  config_repeater.data.find(function(element) {
              return element.item.text === "serials.label.summary";
            });

            let serialslabeldataunit =  config_repeater.data.find(function(element) {
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

            
            if(serialslabelsummary && serialslabelsummary.value.text==='true'){

              serialslabelformatter.value.text = String(titletext.value.text) + '\n' + String(summary) + serialslabeldataunit.value.text;
              
            }

            let myChart = echarts.init(curr_chart_dom, '[[ZRP_DISPLAYMODE]]');

            option = {
              title: {
                show: (titleshow.value.text==='true'),
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
                show: (legendshow.value.text ==='true'),
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

                  roseType: serialsrosetype ? serialsrosetype.value.text:false,
                  itemStyle: {
                    borderRadius: serialsitemstyleborderradius ? Number(serialsitemstyleborderradius.value.text):0
                  },

                  
                  label: {
                    show: serialslabelshow ? serialslabelshow.value.text === 'true':false,
                    formatter: serialslabelformatter ? serialslabelformatter.value.text:'{b}: {d}%',
                    color: fontcolor.value.text,
                    position: serialslabelposition ? serialslabelposition.value.text: 'outside',
                    fontSize: serialslabelsize ? serialslabelsize.value.text: 12,
                    fontColor: fontcolor.value.text,
                    fontWeight: serialslabelweight ? serialslabelweight.value.text: 'normal'
                  },

                  labelLine: {
                    show: serialslabelshow ? serialslabelshow.value.text === 'true':false,
                    length: serialslabellinelength ? Number(serialslabellinelength.value.text):5,
                    length2: serialslabellinelength2 ? Number(serialslabellinelength2.value.text):5
                  },
                  emphasis: {
                    disabled: serialslabelweight ? serialslabelweight.value.text === 'true':false
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
        default:
            console.log('Default case');

        }


      }

    }

  }, 800);
  window.ZrpChartScriptHasRun = true;

}
