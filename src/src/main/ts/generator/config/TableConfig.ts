import ColumnConfig from "./ColumnConfig";

export default interface TableConfig {
    count?: number
    name: string
    columns: ColumnConfig[]
}