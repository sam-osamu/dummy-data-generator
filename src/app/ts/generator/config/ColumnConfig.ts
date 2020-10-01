import {ForeignKeyConfig} from "./ForeignKeyConfig";

export interface ColumnConfig {
    name: string
    autoIncrement?: boolean
    unique?: boolean
    foreignKey?: ForeignKeyConfig
    chooseFrom?: string[]
    fakerOrder?: string | string[]
}