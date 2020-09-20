var faker = require("faker");
var Table_1 = require("./model/Table");
var TableOutput_1 = require("./output/TableOutput");
var SQLGenerator = (function () {
    function SQLGenerator(config) {
        this.readonly = config;
        this.readonly = tables;
        this.Table = [];
        this.config = config;
        this.tables = config.tables.map(function (i) { return new Table_1.Table(i); });
        faker.setLocale((config.locale === undefined) ? "ja" : config.locale);
    }
    SQLGenerator.prototype.generate = function () {
        var _this = this;
        var tableOutput = this.tables.map(function (i) { return new TableOutput_1.TableOutput(_this.config, i); });
        var tableMap = new Map(tableOutput.map(function (i) { return [i.name, new Map(i.columns.map(function (j) { return [j.name, j]; }))]; }));
        tableOutput.forEach(function (table) {
            table.columns.forEach(function (column) {
                var fk = column.foreignKey;
                if (fk != null) {
                    var refTable = tableMap.get(fk.table);
                    if (refTable === undefined) {
                        return;
                    }
                    var refColumn = refTable.get(fk.column);
                    if (refColumn === undefined) {
                        return;
                    }
                    column.generateFromValues(refColumn.values);
                }
                else {
                    column.generate();
                }
            });
        });
        var out = [];
        tableOutput.forEach(function (table) {
            out.push("INSERT INTO " + table.name);
            out.push("  (" + table.columns.map(function (i) { return i.name; }).join(", ") + ")");
            out.push("VALUES");
            var values = [];
            table.columns.forEach(function (column) {
                values.push("  (" + column.values.map(function (i) { return ("'" + i + "'"); }).join(", ") + ")");
            });
            out.push(values.join(",\n") + ";");
        });
        return out.join("\n");
    };
    return SQLGenerator;
})();
exports.SQLGenerator = SQLGenerator;
