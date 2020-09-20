import ForeignKeyConfig from "./ForeignKeyConfig";
export default interface ColumnConfig {
    name: string;
    autoIncrement?: boolean;
    foreignKey?: ForeignKeyConfig;
    fakerOrder?: string | Array<string>;
}
//# sourceMappingURL=ColumnConfig.d.ts.map