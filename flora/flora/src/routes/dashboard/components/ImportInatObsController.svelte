<script lang="ts">
    import type {
        ChecklistStaleRecordCountType,
        ChecklistType,
    } from "../../../data_classes/types";
    import { ImportInatObservation } from "../../../data_classes/checklist";

    const import_inat_obs_endpoint = new ImportInatObservation();

    let invalid: boolean | undefined;
    let loading = false;

    let observation_id: number;
    let checklist_id: number;

    export let checklists: ChecklistType[];

    function submitImportRequest() {
        if (!observation_id) {
            return;
        }
        loading = true;

        let data = {
            observation_id: observation_id,
            checklist_id: checklist_id,
        };
        import_inat_obs_endpoint
            .callExternal(data)
            .then(() => {
                invalid = false;
                loading = false;
            })
            .catch(() => {
                invalid = true;
                loading = false;
            });
    }
</script>

<form>
    <label>
        Checklist:
        <select required bind:value={checklist_id}>
            {#each checklists as checklist}
                <option value={checklist.id}>{checklist.checklist_name}</option>
            {/each}
        </select>
    </label>

    <label>
        Observation ID:
        <input type="number" required bind:value={observation_id} />
    </label>

    <button
        class:error={invalid === true}
        class:success={invalid === false}
        aria-busy={loading}
        on:click|preventDefault={() => submitImportRequest()}
    >
        {#if invalid === true}
            Something went wrong
        {:else if invalid === false}
            Imported
        {:else}
            Import
        {/if}
    </button>
</form>
