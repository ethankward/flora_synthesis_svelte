<script lang="ts">
    import type { MinimalTaxonType } from "../../data_classes/types";
    export let data;
    import SEINETMapLink from "../../components/common/SEINETMapLink.svelte";

    let taxa: MinimalTaxonType[] = data.taxon_data;

    let groups: { [key: string]: MinimalTaxonType[] } = {};
    let status_types: { [key: string]: string } = {};

    taxa.forEach((taxon) => {
        let endemic_status = taxon.endemic.value;
        if (endemic_status) {
            if (endemic_status !== "n") {
                if (!(endemic_status in groups)) {
                    groups[endemic_status] = [];
                    status_types[endemic_status] = taxon.endemic.display;
                }
                groups[endemic_status].push(taxon);
            }
        }
    });
</script>

<svelte:head>
    <title>Endemic taxa</title>
</svelte:head>

{#each Object.keys(groups) as endemic_status_type}
    <article>
        <details open>
            <summary>{status_types[endemic_status_type]}</summary>
            <ul>
                {#each Object.values(groups[endemic_status_type]) as taxon}
                    <li>
                        <a href={"/taxon_detail/" + taxon.id}
                            >{taxon.taxon_name}</a
                        >
                        {#if taxon.seinet_id}
                            <SEINETMapLink seinet_id={taxon.seinet_id} />
                        {/if}
                    </li>
                {/each}
            </ul>
        </details>
    </article>
{/each}
