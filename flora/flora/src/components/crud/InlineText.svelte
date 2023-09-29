<script lang="ts">
    import type { AxiosPromise } from "axios";
    import FakeLink from "../../components/common/FakeLink.svelte";

    type apiMethodType = (value: string) => AxiosPromise;

    export let id: string;
    export let display_value: string | undefined;
    export let value: string | undefined = display_value;
    export let apiMethod: apiMethodType;
    export let create_link:
        | ((value: string | undefined) => string)
        | undefined = undefined;

    let active = false;
    let submission_invalid: boolean;

    function handleOnSubmit() {
        if (value === undefined) {
            return;
        }

        apiMethod(value)
            .then(() => {
                display_value = value;
                submission_invalid = false;
            })
            .catch(() => {
                submission_invalid = true;
            });
    }

    function handleActiveToggle() {
        active = !active;
    }
</script>

{#if create_link !== undefined}
    <a href={create_link(value)}>{display_value}</a>
{:else if display_value !== undefined}
    {display_value}
{/if}
<sup
    on:click={handleActiveToggle}
    on:keypress={handleActiveToggle}
    role={"text"}><FakeLink display="edit" /></sup
>

<form
    class:hide={!active}
    on:change={handleOnSubmit}
    on:submit|preventDefault={() => {}}
    {id}
>
    <input type="text" bind:value aria-invalid={submission_invalid} />
</form>
