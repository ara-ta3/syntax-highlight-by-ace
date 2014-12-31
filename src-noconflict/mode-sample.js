
/****************************
 *      Highlightの定義
 ****************************/
ace.define("ace/mode/sample_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

    var SampleHighlightRules = function() {
        var varWordMapper = this.createKeywordMapper(
            {},
            "invalid",
            false,
            " "
        );

        this.$rules = {
            "start": [
                { token : "string.文字列", regex : /\s*"(.+?)"\s{0,1}/, next:"operator"},
                { token : "string.文字列", regex : /\s*'(.+?)'\s{0,1}/, next:"operator"},
                { token : "string.文字列", regex : /\s*([A-z0-9]+)?\s{0,1}/, next:"operator"},
                { caseInsensitive: false, defaultToken:"invalid" }
            ],
            "operator" : [
                { token : "keyword.type.論理演算子(否定)", regex : /(and|or){1} not{1}/, next:"start" },
                { token : "keyword.type.論理演算子", regex : /and|or/, next:"start" },
                { caseInsensitive: false, defaultToken:"invalid" },
            ],
        }
    };
    oop.inherits(SampleHighlightRules, TextHighlightRules);

    exports.SampleHighlightRules = SampleHighlightRules;
});

/****************************
 *      Indentの定義(？)
 *      未使用
 *      無くても問題なかった
 ****************************/
ace.define(
    "ace/mode/matching_brace_outdent",
    ["require","exports","module","ace/range"],
    function(require, exports, module) {}
);

/****************************
 *      Modeの定義
 *      1.  先頭の define でmode/sampleを定義
 *      2.  `var SampleHighlightRules = require("./sample_highlight_rules").SampleHighlightRules;`
 *          の用にRuleを読み込む
 *      3.  `this.HighlightRules = SampleHighlightRules;` Modeに代入
 * ****************************/
ace.define("ace/mode/sample",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sample_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;

// Rule読み込み
var SampleHighlightRules = require("./sample_highlight_rules").SampleHighlightRules;
//var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var WorkerClient = require("../worker/worker_client").WorkerClient;

var Mode = function() {
    this.HighlightRules = SampleHighlightRules;
};
oop.inherits(Mode, TextMode);
exports.Mode = Mode;
});


