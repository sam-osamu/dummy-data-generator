import Column from "../model/Column";
import ForeignKey from "../model/ForeignKey";
import TableOutput from "./TableOutput";
export default class ColumnOutput {
    private readonly parent;
    private readonly src;
    private readonly value;
    constructor(parent: TableOutput, src: Column);
    get name(): string;
    get values(): any[];
    get foreignKey(): ForeignKey | null;
    generateFromValues(src: any[]): void;
    generate(): void;
}
//# sourceMappingURL=ColumnOutput.d.ts.map