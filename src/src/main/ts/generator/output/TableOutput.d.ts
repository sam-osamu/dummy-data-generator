import Table from "../model/Table";
import ColumnOutput from "./ColumnOutput";
import GeneratorConfig from "../config/GeneratorConfig";
export default class TableOutput {
    private readonly generatorConfig;
    private readonly src;
    private readonly cols;
    private autoIncrementIndex;
    constructor(generatorConfig: GeneratorConfig, src: Table);
    getAndIncrementIndex(): number;
    get name(): string;
    get columns(): ColumnOutput[];
    get count(): number;
}
//# sourceMappingURL=TableOutput.d.ts.map