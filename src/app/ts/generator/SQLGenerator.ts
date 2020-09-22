import * as faker from "faker";
import {GeneratorConfig} from "./config/GeneratorConfig";
import {Table} from "./model/Table";
import {TableOutput} from "./output/TableOutput";

export class SQLGenerator {
    private readonly config: GeneratorConfig;
    private readonly tables: Table[];

    constructor(config: GeneratorConfig) {
        this.config = config;
        this.tables = config.tables.map(i => new Table(i));
        faker.setLocale((config.locale === undefined) ? "ja" : config.locale)
    }

    public generate(): string {
        const tableOutput: TableOutput[] = this.tables.map(i => new TableOutput(this.config, i));
        SQLGenerator.execGenerateColumns(tableOutput);
        return SQLGenerator.generateSqlScript(tableOutput);
    }

    private static execGenerateColumns(tableOutput: TableOutput[]) {
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
    }

    private static generateSqlScript(tableOutput: TableOutput[]): string {
        const out: string[] = [];

        tableOutput.forEach(table => {
            out.push(`INSERT INTO ${table.name}`);
            out.push("  (" + table.columns.map(i => i.name).join(", ") + ")");
            out.push("VALUES");

            const matrix: string[][] = [];
            for(let i = 0; i < table.count; i++) {
                matrix.push(new Array<string>(table.columns.length))
            }

            let columnIdx = 0;
            table.columns.forEach(column => {
                let recordIdx = 0;
                column.values.forEach(value => {
                    matrix[recordIdx][columnIdx] = value.toString().replace("\r\n", "").replace("\n", "");
                    recordIdx++;
                });
                columnIdx++;
            });

            const values: string[] = [];
            matrix.forEach(line => {
                values.push("  (" + line.map(i => "'" + i + "'").join(", ") + ")");
            });

            out.push(values.join(",\n") + ";");
        });

        return out.join("\n")
    }
}