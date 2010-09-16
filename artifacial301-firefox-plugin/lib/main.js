var contextMenu = require("context-menu");
var tabs = require("tab-browser")

var reverse = function(str) {
    var chars=[];
    for (var i=str.length-1; i>=0; i--) {
        chars.push(str.charAt(i));
    }
    var reversed = chars.join("");
    return reversed;
 
};
exports.reverse = reverse;

var encode = function(url, base64func) {
    var reversed = reverse(url); 
    var base64d = base64func(reversed);
    var encoded = encodeURIComponent(base64d);

    return encoded;
}
exports.encode = encode;

var menuItem = contextMenu.Item({
    label: "Artificial301",

    context: "a[href]",

    data: "http://artificial301.appspot.com/s?a=r&r=",
//    data: "http://localhost:8080/s?r=",

    onClick: function(contextObj, item) {
        var anchor = contextObj.node;
        var url = anchor.getAttribute('href');
//        console.log(url);
        var encoded = encode(url, contextObj.window.btoa);

        var target = item.data + encoded;

        tabs.addTab(target);
    }
});

contextMenu.add(menuItem);
