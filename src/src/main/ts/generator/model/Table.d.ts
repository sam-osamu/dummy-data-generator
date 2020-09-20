import TableConfig from "../config/TableConfig";
import Column from "./Column";
export default class Table {
    private readonly tableConfig;
    private readonly cols;
    constructor(tableConfig: TableConfig);
    get name(): string;
    get columns(): Column[];
    get config(): TableConfig;
}
//# sourceMappingURL=Table.d.ts.map