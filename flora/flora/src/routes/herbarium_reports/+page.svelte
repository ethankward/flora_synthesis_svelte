<script lang="ts">
    import type { HerbariumReportType } from "../../data_classes/types";

    export let data;

    let reports_data: HerbariumReportType[] = data.reports_data;
</script>

<svelte:head>
    <title>Herbarium reports</title>
</svelte:head>

<article>
    <header><h3>All reports</h3></header>

    <ul>
        {#each reports_data as report}
            <li>
                <a href={report.url}>{report.taxon}</a>
            </li>
        {/each}
    </ul>
</article>
