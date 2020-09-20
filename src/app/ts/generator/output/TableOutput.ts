import {Table} from "../model/Table";
import {ColumnOutput} from "./ColumnOutput";
import {GeneratorConfig} from "../config/GeneratorConfig";

export class TableOutput {
    private readonly generatorConfig: GeneratorConfig;
    private readonly src: Table;
    private readonly cols: ColumnOutput[];
    private autoIncrementIndex: number;

    constructor(generatorConfig: GeneratorConfig, src: Table) {
        this.generatorConfig = generatorConfig;
        this.src = src;
        this.cols = src.columns.map(i => new ColumnOutput(this, i));
        this.autoIncrementIndex = 0;
    }

    public getAndIncrementIndex(): number {
        const ret = this.autoIncrementIndex;
        this.autoIncrementIndex++;

        return ret;
    }

    public get name(): string {
        return this.src.name;
    }

    public get columns(): ColumnOutput[] {
        return this.cols;
    }

    public get count(): number {
        return (this.src.config.count === undefined) ? this.generatorConfig.defaultCount : this.src.config.count
    }
}