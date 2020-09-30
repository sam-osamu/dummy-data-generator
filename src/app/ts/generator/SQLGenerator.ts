import * as faker from "faker";
import * as Enumerable from "linq"
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
        let tableOutput: TableOutput[] = this.tables.map(i => new TableOutput(this.config, i));
        tableOutput = SQLGenerator.sortTableOrder(tableOutput);

        SQLGenerator.execGenerateColumns(tableOutput);
        return SQLGenerator.generateSqlScript(tableOutput);
    }

    private static sortTableOrder(targets: TableOutput[]): TableOutput[] {
        let tableOutResult: TableOutput[] = [];

        while (true) {
            const target = targets.pop();
            if (target === undefined) {
                break;
            }

            const fkColumnList = Enumerable.from(target.columns)
                .select(i => i.foreignKey)
                .where(i => i !== null)
                .toArray();
            if (Enumerable.from(fkColumnList).isEmpty()) {
                // FKなしの場合は先に生成するものとして先頭から追加
                tableOutResult = [target].concat(tableOutResult)
            } else {
                // FKありの場合はテーブル出力一覧にある中からFKの示すテーブルを探し、
                // そのインデックスの中から最も大きいインデックスを取り出す。
                // すべてのFK参照先よりも後に値生成が出来るようにする
                let insertIdx = Enumerable.from(fkColumnList)
                    .select(fkColumn => tableOutResult.findIndex(outTable => (fkColumn !== null && fkColumn.table === outTable.name)))
                    .max();

                // FK参照先のテーブルのインデックスを持ってるので、その次にInsertしたい
                // 無かったときは-1になるけど、インクリメントするので先頭になる
                insertIdx++;

                tableOutResult.splice(insertIdx, 0, target);
            }
        }

        return tableOutResult;
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
            for (let i = 0; i < table.count; i++) {
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