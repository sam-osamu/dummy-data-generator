import {ForeignKeyConfig} from "./ForeignKeyConfig";

export interface ColumnConfig {
    name: string
    autoIncrement?: boolean
    foreignKey?: ForeignKeyConfig
    fakerOrder?: string | Array<string>
}