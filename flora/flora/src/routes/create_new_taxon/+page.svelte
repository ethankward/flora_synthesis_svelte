<script lang="ts">
    import { CreateNewTaxon } from "../../data_classes/taxon";

    let taxon_name: string;
    let taxon_family: string;
    let create_new_taxon_endpoint = new CreateNewTaxon();

    async function submitCreateNewTaxon() {
        create_new_taxon_endpoint
            .callExternal({
                taxon_name: taxon_name,
                family: taxon_family,
            })
            .then((result) => {
                window.location.href = "/taxon_detail/" + result.data.id;
            });
    }
</script>

<svelte:head>
    <title>Create new taxon</title>
</svelte:head>
<article>
    <header>Create New Taxon</header>

    <form on:submit={submitCreateNewTaxon}>
        <label>
            Taxon name:
            <input type="text" bind:value={taxon_name} required />
        </label>
        <label>
            Family:
            <input type="text" bind:value={taxon_family} required />
        </label>

        <input type="submit" value="Create" />
    </form>
</article>
