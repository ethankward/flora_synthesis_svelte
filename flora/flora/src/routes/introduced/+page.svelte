<script lang="ts">
        import type { MinimalTaxonAPIType } from "../../util/api_data_classes/api_data_types";

    export let data;

    let taxa: MinimalTaxonAPIType[] = data.taxon_data;

    let groups: {[key: string]: MinimalTaxonAPIType[];} = {};
    let status_types: {[key: string]: string} = {};

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

{#each Object.keys(groups) as introduced_status_type}
<article>
    <details>
        <summary>{status_types[introduced_status_type]}</summary>
        <ul>
            {#each Object.values(groups[introduced_status_type]) as taxon}
            <li><a href={"/taxon_detail/" + taxon.id} rel="external">{taxon.taxon_name}</a></li>
            {/each}
        </ul>
    
    </details>

</article>
{/each}
