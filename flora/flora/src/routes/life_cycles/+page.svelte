<script lang="ts">
    import type { MinimalTaxonType } from "../../data_classes/types";

    export let data;

    let taxa: MinimalTaxonType[] = data.taxon_data;

    let groups: { [key: string]: MinimalTaxonType[] } = {};
    let status_types: { [key: string]: string } = {};

    taxa.forEach((taxon) => {
        let life_cycle_status = taxon.life_cycle.value;
        if (life_cycle_status) {
            if (!(life_cycle_status in groups)) {
                groups[life_cycle_status] = [];
                status_types[life_cycle_status] = taxon.life_cycle.display;
            }
            groups[life_cycle_status].push(taxon);
        }
    });
</script>

<svelte:head>
    <title>Life cycles</title>
</svelte:head>

{#each Object.keys(groups) as life_cycle_status_type}
    <article>
        <details>
            <summary>{status_types[life_cycle_status_type]}</summary>
            <ul>
                {#each Object.values(groups[life_cycle_status_type]) as taxon}
                    <li>
                        <a href={"/taxon_detail/" + taxon.id} rel="external"
                            >{taxon.taxon_name}</a
                        >
                    </li>
                {/each}
            </ul>
        </details>
    </article>
{/each}
