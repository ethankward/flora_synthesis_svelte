<script lang="ts">
	import {callExternalEndpoint} from "../../../util/local_api_dispatch";

    let invalid: boolean | undefined;
    let loading = false;
    
    function submitUpdateRequest() {
        invalid = undefined;
        loading = true;

		callExternalEndpoint({}, "update_observation_dates").then((result) => {
            invalid = false;
            loading = false;
        }).catch((error) => {
            invalid = true;
            loading = false;
        });

    }

</script>

<button class:error={invalid === true} class:success={invalid === false} aria-busy={loading} on:click={() => submitUpdateRequest()}>
    {#if invalid === true}
    Something went wrong
    {:else if invalid === false}
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