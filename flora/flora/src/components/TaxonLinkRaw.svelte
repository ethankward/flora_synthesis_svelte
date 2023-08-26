<script>
    export let taxon;
</script>

<a href={"/taxon_detail/" + taxon.pk} rel="external">{taxon.taxon_name}</a>