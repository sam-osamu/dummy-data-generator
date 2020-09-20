import * as faker from "faker";
import GeneratorConfig from "./config/GeneratorConfig";
import Table from "./model/Table";
import TableOutput from "./output/TableOutput";

export default class SQLGenerator {
    private readonly config: GeneratorConfig;
    private readonly tables: Table[];

    constructor(config: GeneratorConfig) {
        this.config = config;
        this.tables = config.tables.map(i => new Table(i));
        faker.setLocale((config.locale === undefined) ? "ja" : config.locale)
    }

    public generate(): string {
        const tableOutput: TableOutput[] = this.tables.map(i => new TableOutput(this.config, i));
        const tableMap = new Map(tableOutput.map(i => [i.name, new Map(i.columns.map(j => [j.name, j]))]));

        tableOutput.forEach(table => {
            table.columns.forEach(column => {
                const fk = column.foreignKey;
                if (fk != null) {
                    const refTable = tableMap.get(fk.table);
                    if (refTable === undefined) {
                        return;
                    }

                    const refColumn = refTable.get(fk.column);
                    if (refColumn === undefined) {
                        return;
                    }

                    column.generateFromValues(refColumn.values);
                } else {
                    column.generate();
                }
            })
        });

        const out: string[] = [];

        tableOutput.forEach(table => {
            out.push(`INSERT INTO ${table.name}`);
            out.push("  (" + table.columns.map(i => i.name).join(", ") + ")");
            out.push("VALUES");

            const values: string[] = [];
            table.columns.forEach(column => {
                values.push("  (" + column.values.map(i => `'${i}'`).join(", ") + ")")
            });

            out.push(values.join(",\n") + ";");
        });

        return out.join("\n")
    }
}