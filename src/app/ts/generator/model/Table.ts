import {TableConfig} from "../config/TableConfig";
import {Column} from "./Column";

export class Table {
    private readonly tableConfig: TableConfig;
    private readonly cols: Column[];

    constructor(tableConfig: TableConfig) {
        this.tableConfig = tableConfig;
        this.cols = tableConfig.columns.map(i => new Column(this, i));
    }

    public get name(): string {
        return this.tableConfig.name
    }

    public get columns(): Column[] {
        return this.cols;
    }

    public get config(): TableConfig {
        return this.tableConfig;
    }
}
