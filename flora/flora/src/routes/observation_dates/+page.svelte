<script lang="ts">
    import type { MinimalTaxonType } from "../../data_classes/types";

    export let data;

    let taxa: MinimalTaxonType[] = data.taxon_data;

    let first_years: {[key: number]: MinimalTaxonType[];} = {};
    let last_years: {[key: number]: MinimalTaxonType[];} = {};

    function getYear(datestr: string) {
        return parseInt(datestr.split('-')[0])
    }

    taxa.forEach((taxon) => {
        if (taxon.first_observation_date) {
            let first_year = getYear(taxon.first_observation_date.date);
            if (!(first_year in first_years)) {
                first_years[first_year] = [];
            }
            first_years[first_year].push(taxon);
        }
        if (taxon.last_observation_date) {
            let last_year = getYear(taxon.last_observation_date.date);
            if (!(last_year in last_years)) {
                last_years[last_year] = [];
            }
            last_years[last_year].push(taxon);
        }

    });

</script>

<article>
    <details>
        <summary>First observed on</summary>
        {#each Object.keys(first_years) as first_year}
        <h4>{first_year}</h4>
        <ul>
            {#each first_years[parseInt(first_year)].sort((a, b) => ((a.first_observation_date.date) > (b.first_observation_date.date)) ? 1 : -1) as taxon}
            <li>{taxon.first_observation_date.date}: {taxon.taxon_name}</li>
            {/each}
        </ul>
        {/each}
    </details>

</article>


<article>
    <details>
        <summary>Last observed on</summary>
        {#each Object.keys(last_years) as last_year}
        <h4>{last_year}</h4>
        <ul>
            {#each last_years[parseInt(last_year)].sort((a, b) => ((a.last_observation_date.date) > (b.last_observation_date.date)) ? 1 : -1) as taxon}
            <li>{taxon.last_observation_date.date}: {taxon.taxon_name}</li>
            {/each}
        </ul>
        {/each}
    </details>
    
</article>