<script lang="ts">
    import { UpdateComputedValuesEndpoint } from "../../../data_classes/taxon";

    let invalid: boolean | undefined;
    let loading = false;

    let update_endpoint = new UpdateComputedValuesEndpoint();

    function submitUpdateRequest() {
        invalid = undefined;
        loading = true;

        update_endpoint
            .callExternal()
            .then(() => {
                invalid = false;
                loading = false;
            })
            .catch(() => {
                invalid = true;
                loading = false;
            });
    }
</script>

<button
    class:error={invalid === true}
    class:success={invalid === false}
    aria-busy={loading}
    on:click|preventDefault={() => submitUpdateRequest()}
>
    {#if invalid === true}
        Something went wrong
    {:else if invalid === false}
        Update queued
    {:else}
        Update
    {/if}
</button>
