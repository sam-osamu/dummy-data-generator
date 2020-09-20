import {Table} from "./Table";
import {ColumnConfig} from "../config/ColumnConfig"
import {ForeignKey} from "./ForeignKey";

export class Column {
    private readonly parent: Table;
    private readonly input: ColumnConfig;

    constructor(parent: Table, input: ColumnConfig) {
        this.parent = parent;
        this.input = input;
    }

    public get name(): string {
        return this.input.name
    }

    public get autoIncrement(): boolean {
        const value = this.input.autoIncrement;
        return (value === undefined) ? false : value;
    }

    public get fakeOrder(): string[] {
        const value = this.input.fakerOrder;
        if (value === undefined) {
            return [];
        } else if (value instanceof Array) {
            return value;
        } else {
            return [value];
        }
    }

    public get foreignKey(): ForeignKey | null {
        if (this.input.foreignKey === undefined) {
            return null
        }

        return {
            table: this.input.foreignKey.table,
            column: this.input.foreignKey.column
        }
    }
}