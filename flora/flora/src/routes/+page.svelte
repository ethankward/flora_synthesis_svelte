<script lang="ts">
    import type { ChecklistType } from "../data_classes/types";

    export let data;

    const checklists: ChecklistType[] = data.checklists;
</script>

<article>
    <h4>Data sources</h4>
    <p>This website uses data from the following sources:</p>
    <ul>
        {#each checklists as checklist}
            <li>
                {#if checklist.citation}
                    {@html checklist.citation}
                {:else}
                    {checklist.checklist_name}
                {/if}
            </li>
        {/each}
    </ul>
</article>

<article data-sveltekit-preload-data="tap">
    <h4>Families</h4>
    {#each data.families as family, i}
        {#if i > 0}&nbsp;|&nbsp;{/if}
        <small><a href="/family/{family.family}">{family.family}</a></small>
    {/each}
</article>
