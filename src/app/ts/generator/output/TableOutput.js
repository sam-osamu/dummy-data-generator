var ColumnOutput_1 = require("./ColumnOutput");
var TableOutput = (function () {
    function TableOutput(generatorConfig, src) {
        var _this = this;
        this.readonly = generatorConfig;
        this.readonly = src;
        this.readonly = cols;
        this.ColumnOutput = [];
        this.generatorConfig = generatorConfig;
        this.src = src;
        this.cols = src.columns.map(function (i) { return new ColumnOutput_1.ColumnOutput(_this, i); });
        this.autoIncrementIndex = 0;
    }
    TableOutput.prototype.getAndIncrementIndex = function () {
        var ret = this.autoIncrementIndex;
        this.autoIncrementIndex++;
        return ret;
    };
    Object.defineProperty(TableOutput.prototype, "name", {
        get: function () {
            return this.src.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableOutput.prototype, "columns", {
        get: function () {
            return this.cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableOutput.prototype, "count", {
        get: function () {
            return (this.src.config.count === undefined) ? this.generatorConfig.defaultCount : this.src.config.count;
        },
        enumerable: true,
        configurable: true
    });
    return TableOutput;
})();
exports.TableOutput = TableOutput;
