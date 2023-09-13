<script lang="ts">
    let invalid: boolean | undefined;
    let loading = false;

    // function submitUpdateRequest() {}
</script>

<button
    class:error={invalid === true}
    class:success={invalid === false}
    aria-busy={loading}
>
    {#if invalid === true}
        Something went wrong
    {:else if invalid === false}
        Update queued
    {:else}
        Update
    {/if}
</button>
