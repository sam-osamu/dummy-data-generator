import Table from "./Table";
import ColumnConfig from "../config/ColumnConfig";
import ForeignKey from "./ForeignKey";
export default class Column {
    private readonly parent;
    private readonly input;
    constructor(parent: Table, input: ColumnConfig);
    get name(): string;
    get autoIncrement(): boolean;
    get fakeOrder(): string[];
    get foreignKey(): ForeignKey | null;
}
//# sourceMappingURL=Column.d.ts.map