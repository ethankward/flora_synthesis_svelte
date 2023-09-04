<script lang="ts">
    export let type: string;
    export let display_value: string;
    export let value: any = display_value;
    export let apiMethod: any;
    export let choices: any[] = [];

    let active = false;
    let submission_invalid;

    function handleOnSubmit() {
        apiMethod(value).then(function (response) {
            if (type == "text") {
                display_value = value;
            } else {
                if (value == "") {
                    display_value = "";
                } else {
                    choices.forEach((choice) => {
                    if (choice.value == value) {
                        display_value = choice.text;
                    }
                });
                }

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

<form class:hide={!active} on:change={handleOnSubmit}>
    {#if type == "text"}
        <input type="text" bind:value aria-invalid={submission_invalid}/>
    {:else if type == "select"}
        <select bind:value>
            <option value="" />
            {#each choices as choice}
                <option value={choice[0]}>{choice[1]}</option>
            {/each}
        </select>
    {/if}
</form>

<style>
    .hide {
        display: none !important;
    }
</style>
