<script lang="ts">
    import type { CollectorType } from "../../../data_classes/types";

    export let data;

    let collector: CollectorType = data.collector_data;
</script>

<svelte:head>
    <title>Collector: {collector.name}</title>
</svelte:head>

<article>
    <header>
        <h3>
            {collector.name}
            {#if collector.first_collection_year || collector.last_collection_year}
                <small>
                    ({#if collector.first_collection_year}{collector.first_collection_year}{/if}–{#if collector.last_collection_year}{collector.last_collection_year}{/if})
                </small>
            {/if}
            {#if collector.external_url}
                <a href={collector.external_url} target="_blank">→</a>
            {/if}
        </h3>
    </header>

    <h4>Collections</h4>
    <ul>
        {#each collector.seinet_collection_records as collection_record}
            <li>
                {#if collection_record.date}{collection_record.date}:{/if}
                <a href="/checklist_record_detail/s/{collection_record.id}"
                    >{collection_record.taxon_name}</a
                >
                {#if collection_record.external_url}
                    <a href={collection_record.external_url} target="_blank"
                        >→</a
                    >
                {/if}
            </li>
        {/each}
    </ul>
</article>
