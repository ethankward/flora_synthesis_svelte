import type { LifeCycleAPIType } from "../../util/api_data_classes/api_data_types";


class LifeCycleChoices {
    choices: LifeCycleAPIType[];

    constructor(api_data: LifeCycleAPIType[]) {
        this.choices = api_data;
    }

    select() {
        return this.choices.map((e) => [e.value, e.text]);
    }
}

export {LifeCycleChoices}
