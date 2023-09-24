<script lang="ts">
    import { updated } from "$app/stores";
    import type { AxiosPromise } from "axios";

    export let label: string;
    export let value: boolean | undefined;

    type apiMethodType = (value: boolean | undefined) => AxiosPromise;

    export let apiMethod: apiMethodType;

    function update() {
        apiMethod(value);
    }
</script>

<label class="inline">
    <input type="checkbox" bind:checked={value} on:change={update} />{label}
</label>

<style>
    .inline {
        position: relative;
        display: inline-block;
    }
</style>
