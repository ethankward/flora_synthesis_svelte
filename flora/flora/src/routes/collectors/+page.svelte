<script lang="ts">
    import type { CollectorType } from "../../data_classes/types";
    import { CreateNewCollector } from "../../data_classes/collector";

    export let data;

    let collectors: CollectorType[] = data.collectors_data;
    const create_collector_endpoint = new CreateNewCollector();

    let new_collector_name: string;
    let new_collector_url: string;

    function createNewCollector() {
        create_collector_endpoint
            .callExternal({
                name: new_collector_name,
                external_url: new_collector_url,
            })
            .then(() => {
                location.reload();
            });
    }
</script>

<svelte:head>
    <title>All collectors</title>
</svelte:head>

<article>
    <header>
        <h3>All collectors</h3>
        <h4><a href="/no_collectors">See collections without collectors</a></h4>
        <details>
            <summary>Create new</summary>
            <form on:submit={createNewCollector}>
                <div class="grid">
                    <label>
                        Name:
                        <input
                            type="text"
                            required
                            bind:value={new_collector_name}
                        />
                    </label>
                    <label>
                        External link:
                        <input type="url" bind:value={new_collector_url} />
                    </label>
                </div>
                <input type="submit" value="Create new collector" />
            </form>
        </details>
    </header>

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
