<script lang="ts">
    import type { ChecklistRecordNoCollectorType } from "../../data_classes/types";

    export let data;

    let no_collectors_data: ChecklistRecordNoCollectorType[] =
        data.no_collectors_data;
</script>

<svelte:head>
    <title>Records with no collector</title>
</svelte:head>

<article>
    <header><h3>Records with no mapped collector</h3></header>

    <ul>
        {#each no_collectors_data as no_collector}
            <li>
                <a href="/checklist_record_detail/s/{no_collector.id}"
                    >{no_collector.observer}: {no_collector.date}</a
                >
            </li>
        {/each}
    </ul>
</article>
