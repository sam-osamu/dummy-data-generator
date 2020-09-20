var faker = require("faker");
var ColumnOutput = (function () {
    function ColumnOutput(parent, src) {
        this.readonly = parent;
        this.readonly = src;
        this.readonly = value;
        this.any = [];
        this.parent = parent;
        this.src = src;
        this.value = [];
    }
    Object.defineProperty(ColumnOutput.prototype, "name", {
        get: function () {
            return this.src.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnOutput.prototype, "values", {
        get: function () {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnOutput.prototype, "foreignKey", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return ColumnOutput;
})();
exports.ColumnOutput = ColumnOutput;
null;
{
    return this.src.foreignKey;
}
generateFromValues(src, any[]);
{
    var loopCnt = this.parent.count;
    for (var i = 0; i < loopCnt; i++) {
        var randomIndex = Math.floor(Math.random() * Math.floor(src.length));
        this.value.push(src[randomIndex]);
    }
}
generate();
{
    var loopCnt = this.parent.count;
    if (this.src.autoIncrement) {
        for (var i = 0; i < loopCnt; i++) {
            this.value.push(this.parent.getAndIncrementIndex());
        }
    }
    else {
        for (var i = 0; i < loopCnt; i++) {
            this.value.push(this.src.fakeOrder.map(function (i) { return faker.fake("{{" + i + "}}"); }).join(" "));
        }
    }
}
