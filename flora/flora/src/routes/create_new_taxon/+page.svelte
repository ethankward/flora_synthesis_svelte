<script lang="ts">
	import {callExternalEndpoint} from "../../util/local_api_dispatch";

    let taxon_name: string;
    let taxon_family: string;

    async function submitCreateNewTaxon() {
		callExternalEndpoint({taxon_name: taxon_name, taxon_family: taxon_family}, "create_new_taxon").then((result) => {
            window.location.href = '/taxon_detail/' + result.taxon_id;
        });
    }

</script>

<article>
    <header>Create New Taxon</header>

    <form on:submit={submitCreateNewTaxon}>
        <label>
            Taxon name:
            <input type="text" bind:value={taxon_name} required>
        </label>
        <label>
            Family:
            <input type="text" bind:value={taxon_family} required>
        </label>

        <input type="submit" value="Create">
        
    </form>

</article>
