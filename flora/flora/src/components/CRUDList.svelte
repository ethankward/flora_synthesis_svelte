<script lang="ts">
    import type { AxiosError } from 'axios';
    import type {ValueDisplayType} from "../util/api_data_classes/api_data_types";

    function handleActiveToggle() {
        editing = !editing;
    }

    function handleAddNewSynonym() {
        if (newSynonymValue === undefined) {
            return;
        }

        addNewAPIMethod(newSynonymValue).then(function (response: { data: { synonym_id: string; }; }) {
            existing_values = [...existing_values, {value: response.data.synonym_id, display: newSynonymValue}];
            creation_invalid = undefined;
            newSynonymValue = undefined;
        }).catch(function (error: AxiosError) {
            creation_invalid = true;
        });

    }

    function handleDeleteSynonym(index: number) {
        let synonym_id = existing_values[index].value;

        deletionAPIMethod(synonym_id).then(function (response: any) {
            existing_values.splice(index, 1);
            existing_values = existing_values;

        }).catch(function (error: AxiosError) {
        });

    }

    function handleUpdateSynonym(index: number) {
        let synonym_id = existing_values[index].value;
        let new_value = existing_values[index].display;
        update_invalid = Array(existing_values.length).fill(undefined)

        updateAPIMethod(synonym_id, new_value).then(function (response: any) {
            update_invalid[index] = false;
        }).catch(function (error: AxiosError) {
            update_invalid[index] = true;
        });

    }

    
    export let existing_values: ValueDisplayType[];
    export let addNewAPIMethod: any;
    export let deletionAPIMethod: any;
    export let updateAPIMethod: any;

    let editing = false;
    let creation_invalid: boolean | undefined;
    let newSynonymValue: string | undefined;
    let update_invalid = Array(existing_values.length).fill(undefined);

</script>

<a href=""><small on:click={handleActiveToggle}><sup>edit</sup></small></a>

<div class:hide={editing}>
    <ul>
        {#each existing_values as existing_value}
        <li>{existing_value.display}</li>
        {/each}
    </ul>
</div>
<div class:hide={!editing}>
    <ul>
        {#each existing_values as existing_value, i}
        <li>
            <div class="grid">
                <input type="text" bind:value={existing_value.display} aria-invalid={update_invalid[i]}/>
                <button class="secondary" on:click={() => handleUpdateSynonym(i)}>update</button>
                <button class="contrast" on:click={() => handleDeleteSynonym(i)}>delete</button>
            </div>
        </li>
        {/each}
        <li><div class="grid"><input type="text" bind:value={newSynonymValue} aria-invalid={creation_invalid}/> <button on:click={handleAddNewSynonym}>add new</button></div></li>
    </ul>
    
</div>

<style>
    .hide {
        display: none !important;
    }
</style>
