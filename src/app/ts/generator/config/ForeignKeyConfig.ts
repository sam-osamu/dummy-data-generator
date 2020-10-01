import {RelationType} from "../type/RelationType";

export interface ForeignKeyConfig {
    table: string
    column: string
    relation?: RelationType
}
