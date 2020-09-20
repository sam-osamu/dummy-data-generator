import TableConfig from "./TableConfig";

export default interface GeneratorConfig {
    tables: TableConfig[]
    defaultCount: number
    locale?: string
}