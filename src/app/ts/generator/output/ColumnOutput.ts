import {Column} from "../model/Column";
import {ForeignKey} from "../model/ForeignKey";
import {TableOutput} from "./TableOutput";
import * as faker from "faker";
import * as Enumerable from "linq"

export class ColumnOutput {
    private readonly parent: TableOutput;
    private readonly src: Column;
    private value: any[] = [];

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

    public copyFromValues(src: any[]) {
        this.value = src;
    }

    public generateFromValues(src: any[]) {
        if (this.src.unique) {
            this.value = ColumnOutput.uniqueChoice(src, this.parent.count)
        } else {
            this.value = ColumnOutput.randomChoice(src, this.parent.count)
        }
    }

    public generate() {
        this.value = [];
        const loopCnt = this.parent.count;
        if (this.src.autoIncrement) {
            for (let i = 0; i < loopCnt; i++) {
                this.value.push(this.parent.getAndIncrementIndex())
            }
        } else if(this.src.chooseFrom.length >= 1) {
            if (this.src.unique) {
                this.value = ColumnOutput.uniqueChoice(this.src.chooseFrom, loopCnt);
            } else {
                this.value = ColumnOutput.randomChoice(this.src.chooseFrom, loopCnt);
            }
        } else {
            for (let i = 0; i < loopCnt; i++) {
                const value = this.src.fakeOrder.map(i => faker.fake(`{{${i}}}`)).join(" ");
                if (this.src.unique && Enumerable.from(this.value).any(i => i === value)) {
                    continue;
                }

                this.value.push(value)
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

    private static uniqueChoice(src: any[], cnt: number): any[] {
        const size = src.length < cnt ? cnt : src.length;
        const uniqueIndex: number[] = [];
        while (size > uniqueIndex.length) {
            const randomValue = faker.random.number(size);
            if (uniqueIndex.find(x => x === randomValue) !== undefined) {
                continue;
            }

            uniqueIndex.push(randomValue);
        }

        return uniqueIndex.map(i => src[i]);
    }
}