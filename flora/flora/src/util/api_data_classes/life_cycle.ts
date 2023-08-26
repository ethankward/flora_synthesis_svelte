class LifeCycleChoice {
    value: string;
    text: string;

    constructor(api_data: any) {
        this.value = api_data.value;
        this.text = api_data.text;
    }
}


class LifeCycleChoices {
    choices: LifeCycleChoice[];

    constructor(api_data: any) {
        this.choices = api_data.map((x: any) => new LifeCycleChoice(x));
    }

    select() {
        return this.choices.map((e) => [e.value, e.text]);
    }
}

export {LifeCycleChoices}