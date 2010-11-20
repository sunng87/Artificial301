var contextMenu = require("context-menu");
var tabs = require("tabs")

var reverse = function(str) {
    var chars=[];
    for (var i=str.length-1; i>=0; i--) {
        chars.push(str.charAt(i));
    }
    var reversed = chars.join("");
    return reversed;
 
};
exports.reverse = reverse;

/* 
 * this is a workaround 
 * */
var getBase64Func = function() {
    var btoa = tabs.activeTab.contentWindow.btoa;
    return btoa;
};

var encode = function(url) {
    var base64func = getBase64Func();
    var reversed = reverse(url); 
    var base64d = base64func(reversed);
    var encoded = encodeURIComponent(base64d);

    return encoded;
}
exports.encode = encode;

var remoteUrl = "http://artificial301.appspot.com/s?a=r&r=";
var linkMenuItem = contextMenu.Item({
    label: "Open with Artificial301",

    context: contextMenu.SelectorContext("a[href]"),

    data: remoteUrl,

    contentScript: "on('click', function(node, data) {" +
        "postMessage(node.href, data)" +
        "});",

    onMessage: function(url, data) {
        var encoded = encode(url);
        var target = this.data + encoded;
        tabs.open({
            url:target, 
            inBackground: true
        });
    }
});

var pageMenuItem = contextMenu.Item({
    label: "Reload with Artificial301",

    context: contextMenu.PageContext(),

    data: remoteUrl,

    contentScript: "on('click', function(node, data) {" +
            "postMessage(window.location.href, data);" +
        "});",

    onMessage: function(url, data) {
        var encoded = encode(url);
        var target = this.data + encoded;
        tabs.activeTab.location = target;
    }

});

contextMenu.add(linkMenuItem);
contextMenu.add(pageMenuItem)

