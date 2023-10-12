<script lang="ts">
    import type { TaxonNameType } from "../../data_classes/types";

    export let taxon: TaxonNameType;
</script>

<a href={"/taxon_detail/" + taxon.id} rel="external">{taxon.taxon_name}</a>
