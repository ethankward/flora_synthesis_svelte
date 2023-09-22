<script lang="ts">
    
    import type {
        GroupedTaxa,
        TaxonOrChecklistTaxon,
    } from "../../../data_classes/taxon";
    import type { DisplayedField } from "../types";

    export let grouped_checklist_taxa: GroupedTaxa;
    export let all_fields: DisplayedField[];

    let sort_arrows = Array(all_fields.length).fill("");
    let sorting_by_field: DisplayedField = all_fields[0];

    function getUnpackedTaxa() {
        let result: TaxonOrChecklistTaxon[] = [];
        Object.entries(grouped_checklist_taxa)
            .sort()
            .forEach(([title, taxa], index) => {
                taxa.forEach((taxon) => {
                    result.push(taxon);
                });
            });

        result.sort((t1, t2) => sorting_by_field.compare(t1, t2));

        return result;
    }

    function setSortColumn(field: DisplayedField, index: number) {
        field.update_sort_direction();
        sort_arrows.fill("");
        sort_arrows[index] = field.sort_arrow;
        sorting_by_field = field;
        unpacked_taxa = () => getUnpackedTaxa();
    }

    let unpacked_taxa = () => getUnpackedTaxa();
</script>

<table>
    <thead>
        <tr>
            {#each all_fields as field, index}
                {#if field.visible}
                    <th scope="col" on:click={() => setSortColumn(field, index)}
                        >{field.title} {sort_arrows[index]}</th
                    >
                {/if}
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each unpacked_taxa() as taxon}
            <tr>
                {#each all_fields as field}
                    {#if field.visible}
                        <td>
                            {field.get_display(taxon)}
                        </td>
                    {/if}
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
