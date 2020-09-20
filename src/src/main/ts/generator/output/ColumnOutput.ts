import Column from "../model/Column";
import ForeignKey from "../model/ForeignKey";
import TableOutput from "./TableOutput";
import * as faker from "faker";

export default class ColumnOutput {
    private readonly parent: TableOutput;
    private readonly src: Column;
    private readonly value: any[];

    constructor(parent: TableOutput, src: Column) {
        this.parent = parent;
        this.src = src;
        this.value = [];
    }

    public get name(): string {
        return this.src.name;
    }

    public get values(): any[] {
        return this.value;
    }

    public get foreignKey(): ForeignKey | null {
        return this.src.foreignKey;
    }

    public generateFromValues(src: any[]) {
        const loopCnt = this.parent.count;
        for (let i = 0; i < loopCnt; i++) {
            const randomIndex = Math.floor(Math.random() * Math.floor(src.length));
            this.value.push(src[randomIndex]);
        }
    }

    public generate() {
        const loopCnt = this.parent.count;
        if (this.src.autoIncrement) {
            for (let i = 0; i < loopCnt; i++) {
                this.value.push(this.parent.getAndIncrementIndex())
            }
        } else {
            for (let i = 0; i < loopCnt; i++) {
                this.value.push(this.src.fakeOrder.map(i => faker.fake(`{{${i}}}`)).join(" "))
            }
        }
    }
}