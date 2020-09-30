import {ForeignKeyConfig} from "./ForeignKeyConfig";

export interface ColumnConfig {
    name: string
    autoIncrement?: boolean
    foreignKey?: ForeignKeyConfig
    chooseFrom?: string[]
    fakerOrder?: string | string[]
}