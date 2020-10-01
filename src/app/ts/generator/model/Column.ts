import {Table} from "./Table";
import {ColumnConfig} from "../config/ColumnConfig"
import {ForeignKey} from "./ForeignKey";
import {RelationType} from "../type/RelationType";

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

    public get unique(): boolean {
        const value = this.input.unique;
        return (value === undefined) ? false: value;
    }

    public get foreignKey(): ForeignKey | null {
        if (this.input.foreignKey === undefined) {
            return null
        }

        const rel = (this.input.foreignKey.relation === undefined) ? RelationType.Any : this.input.foreignKey.relation;

        return {
            table: this.input.foreignKey.table,
            column: this.input.foreignKey.column,
            relation: rel
        }
    }

    public get chooseFrom(): string[] {
        if (this.input.chooseFrom === undefined) {
            return [];
        }

        return this.input.chooseFrom;
    }

    public get fakeOrder(): string[] {
        const value = this.input.fakerOrder;
        if (value === undefined) {
            return [];
        } else if (value instanceof Array) {
            return value;
        } else if (typeof value === "string") {
            return [value];
        }

        return [];
    }
}