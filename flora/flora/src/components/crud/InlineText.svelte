<script lang="ts">
    import type { AxiosPromise } from 'axios';
	import FakeLink from "../../components/common/FakeLink.svelte";

    type apiMethodType = (value: string) => AxiosPromise;

    export let id: string;
    export let display_value: string | undefined;
    export let value: string | undefined = display_value;
    export let apiMethod: apiMethodType;
    export let create_link: (((value: string | undefined) => string) | undefined) = undefined;

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

{#if create_link !== undefined}
<a href={create_link(display_value)}>{display_value}</a>
{:else}
{display_value}
{/if}
<sup on:click={handleActiveToggle}><FakeLink display="edit"/></sup>

<form class:hide={!active} on:change={handleOnSubmit} id={id}>
    <input type="text" bind:value aria-invalid={submission_invalid}/>
</form>

<style>
    .hide {
        display: none !important;
    }
</style>
