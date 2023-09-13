<script lang="ts">
    export let data;
</script>

<p>what is this</p>
<p>checklists summary</p>

<article data-sveltekit-preload-data="tap">
    <h4>Families</h4>
    {#each data.families as family, i}
        {#if i > 0}&nbsp;|&nbsp;{/if}
        <small><a href="/family/{family.family}">{family.family}</a></small>
    {/each}
</article>
