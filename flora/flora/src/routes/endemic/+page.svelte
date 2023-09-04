<script lang="ts">
        import type { MinimalTaxonAPIType } from "../../util/api_data_classes/api_data_types";

    export let data;

    let taxa: MinimalTaxonAPIType[] = data.taxon_data;

    let groups: {[key: string]: MinimalTaxonAPIType[];} = {};
    let status_types: {[key: string]: string} = {};

    taxa.forEach((taxon) => {
        let endemic_status = taxon.endemic.value;
        if (endemic_status) {
            if (!(endemic_status in groups)) {
            groups[endemic_status] = [];
            status_types[endemic_status] = taxon.endemic.display;
        }
            groups[endemic_status].push(taxon);
        }
    });

</script>

{#each Object.keys(groups) as endemic_status_type}
<article>
    <details>
        <summary>{status_types[endemic_status_type]}</summary>
        <ul>
            {#each Object.values(groups[endemic_status_type]) as taxon}
            <li><a href={"/taxon_detail/" + taxon.id} rel="external">{taxon.taxon_name}</a></li>
            {/each}
        </ul>
    
    </details>

</article>
{/each}
