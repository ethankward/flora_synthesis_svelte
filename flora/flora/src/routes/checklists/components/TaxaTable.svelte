<script lang="ts">
    import TaxonLink from "../../../components/common/TaxonLink.svelte";
    import type { GroupedTaxa } from "../../../data_classes/taxon";
    import type { DisplayedField } from "../types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let all_fields: DisplayedField[];

    let sort_arrows = Array(all_fields.length).fill("");
    let sorting_by_field: DisplayedField = all_fields[0];

    function setSortColumn(field: DisplayedField, index: number) {
        field.update_sort_direction();
        sort_arrows.fill("");
        sort_arrows[index] = field.sort_arrow;
        sorting_by_field = field;
    }
</script>

<table>
    <thead>
        <tr>
            <th scope="col" on:click={() => setSortColumn(all_fields[0], 0)}
                >Taxon name {sort_arrows[0]}</th
            >
            {#each all_fields as field, index}
                {#if field.visible && field.visible_in_table_format()}
                    <th scope="col" on:click={() => setSortColumn(field, index)}
                        >{field.title} {sort_arrows[index]}</th
                    >
                {/if}
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each Object.values(grouped_checklist_taxa)
            .flat()
            .sort((t1, t2) => sorting_by_field.compare(t1, t2)) as taxon}
            <tr>
                <td><TaxonLink {taxon} /></td>

                {#each all_fields as field}
                    {#if field.visible && field.visible_in_table_format()}
                        <td>
                            {field.get_display(taxon)}
                        </td>
                    {/if}
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
