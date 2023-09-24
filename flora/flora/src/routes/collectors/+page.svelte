<script lang="ts">
    import type { CollectorType } from "../../data_classes/types";

    export let data;

    let collectors: CollectorType[] = data.collectors_data;
</script>

<svelte:head>
    <title>All collectors</title>
</svelte:head>

<article>
    <header><h3>All collectors</h3></header>

    {#each collectors as collector}
        <h4>
            <a href="/collectors/{collector.id}">{collector.name}</a>

            {#if collector.first_collection_year || collector.last_collection_year}
                <small>
                    ({#if collector.first_collection_year}{collector.first_collection_year}{/if}–{#if collector.last_collection_year}{collector.last_collection_year}{/if})
                </small>
            {/if}
            {#if collector.external_url}
                <a href={collector.external_url} target="_blank">→</a>
            {/if}
        </h4>
    {/each}
</article>
