<script lang="ts">
    import type { AxiosPromise } from "axios";

    export let label: string;
    export let value: (boolean | undefined);

    // type apiMethodType = (value: string) => AxiosPromise;

    // export let apiMethod: apiMethodType;
</script>

<label class="inline">
    <input type="checkbox" checked={value} />{label}
</label>

<style>
    .inline {
        position: relative;
        display: inline-block;
    }
</style>
