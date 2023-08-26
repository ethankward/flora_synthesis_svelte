class EndemicChoice {
    value: string;
    text: string;

    constructor(api_data: any) {
        this.value = api_data.value;
        this.text = api_data.text;
    }
}


class EndemicChoices {
    choices: EndemicChoice[];

    constructor(api_data: any) {
        this.choices = api_data.map((x: any) => new EndemicChoice(x));
    }

    select() {
        return this.choices.map((e) => [e.value, e.text]);
    }
}

export {EndemicChoices}