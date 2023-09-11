<script lang="ts">
    export let update_invalid: boolean[];
    export let update_loading: boolean[];
    export let index: number;
    export let submitUpdateRequest: (index: number) => void;
</script>

<button class:error={update_invalid[index] === true} class:success={update_invalid[index] === false} aria-busy={update_loading[index]} on:click={() => submitUpdateRequest(index)}>
    {#if update_invalid[index] === true}
    Something went wrong
    {:else if update_invalid[index] === false}
    Update queued
    {:else}
    Update
    {/if}
</button>

<style>
    .error {
        background-color: red;
    }
    .success {
        background-color: green;
    }

</style>