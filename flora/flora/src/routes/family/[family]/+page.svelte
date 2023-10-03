<script lang="ts">
    import type { TaxonType } from "../../../data_classes/types";
    import FNALink from "../../../components/common/FNALink.svelte";

    export let data;

    let taxa: TaxonType[] = data.taxon_data;

    let genus_groups: { [key: string]: TaxonType[] } = {};

    taxa.forEach((taxon) => {
        let genus = taxon.genus;
        if (!(genus in genus_groups)) {
            genus_groups[genus] = [];
        }
        genus_groups[genus].push(taxon);
    });
</script>

<svelte:head>
    <title>{data.family}</title>
</svelte:head>

<article>
    <header>
        Family <mark>{data.family}</mark>
        <FNALink target={data.family} />
    </header>
    <ul>
        {#each Object.keys(genus_groups) as genus}
            <li>
                <a href="/genus/{genus}">{genus}</a>
                <ul>
                    {#each Object.values(genus_groups[genus]) as taxon}
                        <li>
                            {#if !taxon.taxon_checklist_taxa.some((checklist_taxon) => checklist_taxon.primary_checklist)}
                                <del
                                    ><a
                                        href={"/taxon_detail/" + taxon.id}
                                        rel="external">{taxon.taxon_name}</a
                                    ></del
                                >
                            {:else}
                                <a
                                    href={"/taxon_detail/" + taxon.id}
                                    rel="external">{taxon.taxon_name}</a
                                >
                            {/if}
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
</article>
