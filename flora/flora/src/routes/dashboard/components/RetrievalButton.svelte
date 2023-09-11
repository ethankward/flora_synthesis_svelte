<script lang="ts">
    export let retrieval_loading: boolean[];
    export let retrieval_invalid: boolean[];
    export let index: number;
    export let submitRetrievalRequest: (index: number, n_records: number) => void;
    export let n_records: number;
</script>

<button class:error={retrieval_invalid[index] === true} class:success={retrieval_invalid[index] === false} aria-busy={retrieval_loading[index]} on:click={() => submitRetrievalRequest(index, n_records)}>
    {#if retrieval_invalid[index] === true}
    Something went wrong
    {:else if retrieval_invalid[index] === false}
    Retrieval successful
    {:else}
    Retrieve
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
