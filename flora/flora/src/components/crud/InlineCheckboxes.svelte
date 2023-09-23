<script lang="ts">
    import type { AxiosPromise } from "axios";

    type apiMethodType = (value: string) => AxiosPromise;

    export let apiMethod: apiMethodType;
    
</script>
