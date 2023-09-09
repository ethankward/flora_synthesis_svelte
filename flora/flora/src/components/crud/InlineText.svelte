<script lang="ts">
    import type { AxiosPromise } from 'axios';

    type apiMethodType = (value: string) => AxiosPromise;

    export let id: string;
    export let display_value: string | undefined;
    export let value: string | undefined = display_value;
    export let apiMethod: apiMethodType;

    let active = false;
    let submission_invalid: boolean;

    function handleOnSubmit() {
        if (value === undefined) {
            return;
        }

        apiMethod(value).then(function (response) {
            display_value = value;
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
    <input type="text" bind:value aria-invalid={submission_invalid}/>
</form>

<style>
    .hide {
        display: none !important;
    }
</style>
