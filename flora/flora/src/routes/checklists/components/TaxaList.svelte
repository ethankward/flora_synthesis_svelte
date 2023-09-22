<script lang="ts">
    import TaxonExternalLinks from "../../../components/common/TaxonExternalLinks.svelte";
    import TaxonLink from "../../../components/common/TaxonLink.svelte";
    import TaxonNameLink from "../../../components/common/TaxonNameLink.svelte";

    import type { GroupedTaxa } from "../../../data_classes/taxon";
    import type { DisplayedField } from "../types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let all_fields: DisplayedField[];
</script>

{#each Object.entries(grouped_checklist_taxa).sort() as [group_title, group_taxa]}
    <h6>{group_title}</h6>

    {#each group_taxa as taxon}
        <ul>
            <li>
                <TaxonLink {taxon} />
                <TaxonExternalLinks {taxon} />
                {#if taxon.all_mapped_taxa().length > 0}
                    → {#each taxon.all_mapped_taxa() as mapped_taxon, i}{#if i > 0},&nbsp;{/if}<TaxonNameLink
                            taxon={mapped_taxon}
                        />{/each}
                {/if}

                {#each all_fields as field}
                    {#if field.visible_in_list_format(taxon)}
                        <ul>
                            <li>
                                <small
                                    >{field.title}: {field.get_display(
                                        taxon
                                    )}</small
                                >
                            </li>
                        </ul>
                    {/if}
                {/each}
            </li>
        </ul>
    {/each}
{/each}
