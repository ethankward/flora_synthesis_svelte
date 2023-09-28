<script lang="ts">
    import type { CollectorType } from "../../../data_classes/types";
    import InlineList from "../../../components/crud/InlineList.svelte";
    import InlineText from "../../../components/crud/InlineText.svelte";
    import { UpdateCollector } from "../../../data_classes/collector";

    import {
        CreateNewCollectorAlias,
        UpdateCollectorAlias,
        DeleteCollectorAlias,
    } from "../../../data_classes/collector_alias";
    import { DeleteCollector } from "../../../data_classes/collector";

    export let data;

    let collector: CollectorType = data.collector_data;

    let update_collector_endpoint = new UpdateCollector();

    const create_collector_alias_endpoint = new CreateNewCollectorAlias();
    const delete_collector_alias_endpoint = new DeleteCollectorAlias();
    const update_collector_alias_endpoint = new UpdateCollectorAlias();
    const delete_collector_endpoint = new DeleteCollector();

    function delete_collector() {
        delete_collector_endpoint
            .callExternal({ id: collector.id })
            .then(() => {
                window.location.href = "/collectors";
            });
    }
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
                {#if collection_record.observer}{collection_record.observer}{/if}
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

    <hr />

    <h4>Collector data</h4>
    <ul>
        <li>
            Primary name:
            <InlineText
                id="collector_name_editor"
                bind:display_value={collector.name}
                bind:value={collector.name}
                apiMethod={(value) =>
                    update_collector_endpoint.callExternal({
                        name: value,
                        id: collector.id,
                    })}
            />
        </li>
        <li>
            Aliases:
            <InlineList
                existing_values={collector.collector_aliases}
                createAPIMethod={(value) =>
                    create_collector_alias_endpoint.callExternal({
                        collector: collector.id,
                        alias: value,
                    })}
                deleteAPIMethod={(value) =>
                    delete_collector_alias_endpoint.callExternal({
                        id: parseInt(value),
                    })}
                updateAPIMethod={(alias_id, value) =>
                    update_collector_alias_endpoint.callExternal({
                        id: parseInt(alias_id),
                        collector: collector.id,
                        alias: value,
                    })}
            />
        </li>
        <li>
            External URL:
            <InlineText
                id="collector_url_editor"
                bind:display_value={collector.external_url}
                bind:value={collector.external_url}
                apiMethod={(value) =>
                    update_collector_endpoint.callExternal({
                        external_url: value,
                        id: collector.id,
                    })}
            />
        </li>
    </ul>
</article>

<article>
    <button class="error" on:click={delete_collector}>Delete collector</button>
</article>
