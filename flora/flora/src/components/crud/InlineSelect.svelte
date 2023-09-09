<script lang="ts">
    import type { AxiosPromise } from 'axios';

    type apiMethodType = (value: string) => AxiosPromise;
    type choiceType = {value: string, display: string};

    export let id: string;
    export let display_value: string | undefined;
    export let value: string | undefined;
    export let apiMethod: apiMethodType;
    export let choices: choiceType[] = [];

    let active = false;
    let submission_invalid: boolean;

    function handleOnSubmit() {
        if (value === undefined) {
            return;
        }

        apiMethod(value).then(function (response) {
            if (value == "") {
                display_value = "";
            } else {
                choices.forEach((choice) => {
                    if (choice.value == value) {
                        display_value = choice.display;
                    }
                });
            }
            submission_invalid = false;
        }).catch(function (error) {
            submission_invalid = true;
        });

    }

    function handleActiveToggle() {
        active = !active;
    }
</script>

{display_value}
<a href=""><small on:click={handleActiveToggle}><sup>edit</sup></small></a>

<form class:hide={!active} on:change={handleOnSubmit} id={id}>
    <select bind:value>
        <option value="" />
        {#each choices as choice}
            <option value={choice.value}>{choice.display}</option>
        {/each}
    </select>
</form>

<style>
    .hide {
        display: none !important;
    }
</style>
