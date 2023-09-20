<script lang="ts">
    import type { MinimalTaxonType } from "../../data_classes/types";

    export let data;

    let taxa: MinimalTaxonType[] = data.taxon_data;

    let groups: { [key: string]: MinimalTaxonType[] } = {};
    let status_types: { [key: string]: string } = {};

    taxa.forEach((taxon) => {
        let introduced_status = taxon.introduced.value;
        if (introduced_status) {
            if (!(introduced_status in groups)) {
                groups[introduced_status] = [];
                status_types[introduced_status] = taxon.introduced.display;
            }
            groups[introduced_status].push(taxon);
        }
    });
</script>

<svelte:head>
    <title>Introduced taxa</title>
</svelte:head>

{#each Object.keys(groups) as introduced_status_type}
    <article>
        <details>
            <summary>{status_types[introduced_status_type]}</summary>
            <ul>
                {#each Object.values(groups[introduced_status_type]) as taxon}
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
