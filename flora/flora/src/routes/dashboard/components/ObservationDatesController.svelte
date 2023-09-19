<script lang="ts">
    import { UpdateObservationDatesEndpoint } from "../../../data_classes/taxon";

    let invalid: boolean | undefined;
    let loading = false;

    let update_endpoint = new UpdateObservationDatesEndpoint();

    function submitUpdateRequest() {
        invalid = undefined;
        loading = true;

        update_endpoint
            .callExternalEndpoint()
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
