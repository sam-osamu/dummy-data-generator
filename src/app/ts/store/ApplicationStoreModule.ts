import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {GeneratorConfig} from "../generator/config/GeneratorConfig";
import {SQLGenerator} from "../generator/SQLGenerator";
import {RootStore} from "./RootStoreHolder";

@Module({
    dynamic: true,
    store: RootStore,
    name: 'application',
    namespaced: true
})
export class ApplicationStoreModule extends VuexModule {
    private configText: string = "";
    private generatedSql: string = "";

    public get getConfigText(): string {
        return this.configText;
    }

    public get getGeneratedSql(): string {
        return this.generatedSql;
    }

    @Mutation
    public setConfigText(config: string) {
        this.configText = config;
    }

    @Mutation
    private setGeneratedSql(sql: string) {
        this.generatedSql = sql;
    }

    @Action
    public async generate() {
        const sql = await new Promise<string>((resolve, reject) => {
            if (this.configText == null || this.configText.length <= 0) {
                reject("config is empty.");
                return
            }

            try {
                const config: GeneratorConfig = JSON.parse(this.configText);
                const gen = new SQLGenerator(config);
                resolve(gen.generate());
            } catch (e) {
                reject(e.toString());
                return;
            }
        });

        this.setGeneratedSql(sql);
    }
}

export const ApplicationStore = getModule(ApplicationStoreModule);