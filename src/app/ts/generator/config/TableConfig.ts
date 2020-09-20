import {ColumnConfig} from "./ColumnConfig";

export interface TableConfig {
    count?: number
    name: string
    columns: ColumnConfig[]
}