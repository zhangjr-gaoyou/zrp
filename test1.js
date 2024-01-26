if (window.myScriptHasRun) {
  console.log("has run!");
} else {

  console.log("start load the widget ...");

  $axure.utils.loadJS('https://cdn.jsdelivr.net/gh/zhangjr-gaoyou/zrp@v0.1/test1.js');

  console.log("start load the widget ...end.");
  setTimeout(function () {

    var allElements = $('[data-label*= zrp]');

    for (var i = 0; i < allElements.length; i++) {
      console.log(allElements[i]);
      allElements[i].textContent = allElements[i].textContent + ' done';
    }

  }, 800);
  window.myScriptHasRun = true;

}
