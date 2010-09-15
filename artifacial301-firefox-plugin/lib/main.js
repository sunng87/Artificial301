var contextMenu = require("context-menu");
var tabs = require("tab-browser")

var menuItem = contextMenu.Item({
    label: "Artificial301",

    context: "a[href]",

    data: "http://artificial301.appspot.com/s?r=",
//    data: "http://localhost:8080/s?r=",

    onClick: function(contextObj, item) {
        var anchor = contextObj.node;
        var url = anchor.getAttribute('href');
//        console.log(url);
        var encoded = encodeURIComponent(contextObj.window.btoa(url));

        var target = item.data + encoded;

        tabs.addTab(target);
    }
});

contextMenu.add(menuItem);
