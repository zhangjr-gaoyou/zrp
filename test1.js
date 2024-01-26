if (window.myScriptHasRun) {
  console.log("has run!");
} else {

  console.log("start process the echarts chart ...");

  $axure.utils.loadJS('https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js');

  console.log("start load the widget ...end.");
  setTimeout(function () {

    var allElements = $('[data-label*= zrp]');

    for (var i = 0; i < allElements.length; i++) {
      console.log(allElements[i]);
      console.log(allElements[i].getAttribute("data-label"));
      allElements[i].textContent = allElements[i].textContent + ' done';
    }

  }, 800);
  window.myScriptHasRun = true;

}
