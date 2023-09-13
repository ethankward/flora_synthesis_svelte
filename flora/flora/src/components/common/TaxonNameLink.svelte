<script lang="ts">
    import type { TaxonNameType } from "../../data_classes/types";

    export let taxon: TaxonNameType;
    export let new_tab: boolean = true;
</script>

<a
    href={"/taxon_detail/" + taxon.id}
    target={new_tab ? "_blank" : ""}
    rel="external">{taxon.taxon_name}</a
>
