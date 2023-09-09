<script lang="ts">
    import type {TaxonNameAPIType} from "../../util/api_data_classes/api_data_types";

    export let taxon: TaxonNameAPIType;
    export let new_tab: boolean = true;

</script>
<a href={"/taxon_detail/" + taxon.id} target={new_tab ? "_blank" : ""} rel="external">{taxon.taxon_name}</a>
