<script lang="ts">
    import type { MinimalTaxonType } from "../../data_classes/types";
    import SEINETMapLink from "../../components/common/SEINETMapLink.svelte";

    export let data;

    let taxa: MinimalTaxonType[] = data.taxon_data;

    let groups: { [key: string]: MinimalTaxonType[] } = {
        northern: [],
        southern: [],
        eastern: [],
        western: [],
    };

    taxa.forEach((taxon) => {
        if (taxon.local_population_strict_northern_range_limit) {
            groups.northern.push(taxon);
        }
        if (taxon.local_population_strict_southern_range_limit) {
            groups.southern.push(taxon);
        }
        if (taxon.local_population_strict_eastern_range_limit) {
            groups.eastern.push(taxon);
        }
        if (taxon.local_population_strict_western_range_limit) {
            groups.western.push(taxon);
        }
    });
</script>

<svelte:head>
    <title>Life cycles</title>
</svelte:head>

{#each Object.keys(groups) as population_type}
    <article>
        <details open>
            <summary
                >Taxa reaching the {population_type} edge of their range in the Rincons</summary
            >
            <ul>
                {#each Object.values(groups[population_type]) as taxon}
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
