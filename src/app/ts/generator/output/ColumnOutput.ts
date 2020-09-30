import {Column} from "../model/Column";
import {ForeignKey} from "../model/ForeignKey";
import {TableOutput} from "./TableOutput";
import * as faker from "faker";

export class ColumnOutput {
    private readonly parent: TableOutput;
    private readonly src: Column;
    private value: any[];

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
        this.value = ColumnOutput.randomChoice(src, this.parent.count)
    }

    public generate() {
        this.value = [];
        const loopCnt = this.parent.count;
        if (this.src.autoIncrement) {
            for (let i = 0; i < loopCnt; i++) {
                this.value.push(this.parent.getAndIncrementIndex())
            }
        } else if(this.src.chooseFrom.length >= 1) {
            this.value = ColumnOutput.randomChoice(this.src.chooseFrom, loopCnt);
        } else {
            for (let i = 0; i < loopCnt; i++) {
                this.value.push(this.src.fakeOrder.map(i => faker.fake(`{{${i}}}`)).join(" "))
            }
        }
    }

    private static randomChoice(src: any[], cnt: number): any[] {
        const ret: any[] = [];
        for (let i = 0; i < cnt; i++) {
            ret.push(faker.random.arrayElement(src));
        }
        return ret;
    }
}