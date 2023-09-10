<script lang="ts">
    import type { TaxonType } from "../../../data_classes/types";

    export let data;

    let taxa: TaxonType[] = data.taxon_data;

    let genus_groups: {[key: string]: TaxonType[];} = {};

    taxa.forEach((taxon) => {
        let genus = taxon.genus;
        if (!(genus in genus_groups)) {
            genus_groups[genus] = [];
        }
        genus_groups[genus].push(taxon);
    });

</script>
<h3>Family: <mark>{data.family}</mark></h3>
<article>
    
    <ul>
        {#each Object.keys(genus_groups) as genus}
        <li> <a href="/genus/{genus}">{genus}</a>
            <ul>
            {#each Object.values(genus_groups[genus]) as taxon}
            <li><a href={"/taxon_detail/" + taxon.id} rel="external">{taxon.taxon_name}</a></li>
            {/each}
            </ul>
        </li>
        {/each}

    </ul>
    
</article>
