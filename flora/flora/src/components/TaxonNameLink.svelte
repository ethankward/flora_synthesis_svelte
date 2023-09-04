<script lang="ts">
    import type {TaxonNameAPIType} from "../util/api_data_classes/api_data_types";

    export let taxon: TaxonNameAPIType;
</script>
<a href={"/taxon_detail/" + taxon.id} target="_blank">{taxon.taxon_name}</a>
