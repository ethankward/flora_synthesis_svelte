<script lang="ts">
    import { GetTaxaAutocompletion } from "../../data_classes/taxon";
    import AutoComplete from "simple-svelte-autocomplete";
    import type { TaxonNameType } from "../../data_classes/types";

    export let selectedItem: TaxonNameType | undefined;
    export let placeholder_text: string = "";
    export let required: boolean = true;
    export let show_clear: boolean = false;
    export let onChangeFunction: (() => void) | undefined = undefined;

    let taxa_autocompletion_endpoint = new GetTaxaAutocompletion();

    async function getTaxonAutocompletion(search_term: string) {
        return (
            await taxa_autocompletion_endpoint.callExternal({
                search_term: search_term,
            })
        ).data;
    }
</script>

<AutoComplete
    searchFunction={getTaxonAutocompletion}
    delay="200"
    localFiltering={false}
    labelFieldName="taxon_name"
    valueFieldName="pk"
    hideArrow={true}
    {required}
    onChange={onChangeFunction}
    placeholder={placeholder_text}
    bind:selectedItem
    showClear={show_clear}
/>
