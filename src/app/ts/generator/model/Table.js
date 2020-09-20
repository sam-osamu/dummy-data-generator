var Column_1 = require("./Column");
var Table = (function () {
    function Table(tableConfig) {
        var _this = this;
        this.readonly = tableConfig;
        this.readonly = cols;
        this.Column = [];
        this.tableConfig = tableConfig;
        this.cols = tableConfig.columns.map(function (i) { return new Column_1.Column(_this, i); });
    }
    Object.defineProperty(Table.prototype, "name", {
        get: function () {
            return this.tableConfig.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columns", {
        get: function () {
            return this.cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "config", {
        get: function () {
            return this.tableConfig;
        },
        enumerable: true,
        configurable: true
    });
    return Table;
})();
exports.Table = Table;
