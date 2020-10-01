import {RelationType} from "../type/RelationType";

export interface ForeignKey {
    table: string
    column: string
    relation: RelationType
}
