import {TableConfig} from "./TableConfig";

export interface GeneratorConfig {
    tables: TableConfig[]
    defaultCount: number
    locale?: string
}