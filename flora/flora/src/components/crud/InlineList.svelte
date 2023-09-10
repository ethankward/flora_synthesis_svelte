<script lang="ts">
    import type { AxiosError, AxiosPromise } from 'axios';
	import FakeLink from "../../components/common/FakeLink.svelte";

    type choiceType = {value: string, display: string | undefined};

    export let existing_values: choiceType[];

    type apiMethodType = (value: string) => AxiosPromise;
    type updateApiMethodType = (id: string, value: string) => AxiosPromise;

    export let createAPIMethod: apiMethodType;
    export let deleteAPIMethod: apiMethodType;
    export let updateAPIMethod: updateApiMethodType;

    let active = false;

    let creation_invalid: boolean | undefined;
    let new_value: string | undefined;

    let update_invalid = Array(existing_values.length).fill(undefined);

    function handleActiveToggle() {
        active = !active;
    }

    function handleCreate() {
        if (new_value === undefined) {
            return;
        }

        createAPIMethod(new_value).then(function (response) {
            existing_values = [...existing_values, {value: response.synonym_id, display: new_value}];
            creation_invalid = undefined;
            new_value = undefined;
        }).catch(function (error) {
            console.log(error);
            creation_invalid = true;
        });

    }

    function handleDelete(index: number) {
        let to_delete_id = existing_values[index].value;
        deleteAPIMethod(to_delete_id).then(function (response) {
            existing_values.splice(index, 1);
            existing_values = existing_values;
        }).catch(function (error) {
        });
    }

    function handleUpdate(index: number) {
        let to_udpate_id = existing_values[index].value;
        let updated_value = existing_values[index].display;

        if (updated_value === undefined) {
            return;
        }

        update_invalid = Array(existing_values.length).fill(undefined)

        updateAPIMethod(to_udpate_id, updated_value).then(function (response) {
            update_invalid[index] = false;
        }).catch(function (error) {
            update_invalid[index] = true;
        });

    }


</script>

<sup on:click={handleActiveToggle}><FakeLink display="edit"/></sup>

<div class:hide={active}>
    <ul>
        {#each existing_values as existing_value}
        <li>{existing_value.display}</li>
        {/each}
    </ul>
</div>
<div class:hide={!active}>
    <ul>
        {#each existing_values as existing_value, i}
        <li>
            <div class="grid">
                <input type="text" bind:value={existing_value.display} aria-invalid={update_invalid[i]}/>
                <button class="secondary" on:click={() => handleUpdate(i)}>update</button>
                <button class="contrast" on:click={() => handleDelete(i)}>delete</button>
            </div>
        </li>
        {/each}
        <li>
            <div class="grid">
                <input type="text" bind:value={new_value} aria-invalid={creation_invalid}/> 
                <button on:click={handleCreate}>add new</button>
            </div>
        </li>
    </ul>
    
</div>

<style>
    .hide {
        display: none !important;
    }
</style>
