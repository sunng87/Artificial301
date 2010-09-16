var module = require("main")

exports.ensureReverseWorks = function(test)  {
    test.assertEqual(module.reverse("abcde"), "edcba", "reverse");
};


