<script lang="ts">
    import TaxonLink from "./TaxonLink.svelte";

    export let grouped_checklist_taxa: any;
</script>


<table>
    <thead>
        <tr>
            <th scope="col">Taxon Name</th>
            <th scope="col">Family</th>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(grouped_checklist_taxa).sort() as [group_title, group_taxa]}
        {#each group_taxa as taxon}
        <tr>
            <td><TaxonLink taxon={taxon} /></td>
            <td>{taxon.family}</td>
        </tr>
        {/each}
        {/each}
    </tbody>
</table>
