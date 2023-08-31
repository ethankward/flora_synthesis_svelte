import type { EndemicAPIType } from "../../util/api_data_classes/api_data_types";

class EndemicChoices {
    choices: EndemicAPIType[];

    constructor(api_data: EndemicAPIType[]) {
        this.choices = api_data;
    }

    select() {
        return this.choices.map((e) => [e.value, e.text]);
    }
}

export {EndemicChoices}
