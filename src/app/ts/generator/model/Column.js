var Column = (function () {
    function Column(parent, input) {
        this.readonly = parent;
        this.readonly = input;
        this.parent = parent;
        this.input = input;
    }
    Object.defineProperty(Column.prototype, "name", {
        get: function () {
            return this.input.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "autoIncrement", {
        get: function () {
            var value = this.input.autoIncrement;
            return (value === undefined) ? false : value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "fakeOrder", {
        get: function () {
            var value = this.input.fakerOrder;
            if (value === undefined) {
                return [];
            }
            else if (value instanceof Array) {
                return value;
            }
            else {
                return [value];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "foreignKey", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return Column;
})();
exports.Column = Column;
null;
{
    if (this.input.foreignKey === undefined) {
        return null;
    }
    return {
        table: this.input.foreignKey.table,
        column: this.input.foreignKey.column
    };
}
