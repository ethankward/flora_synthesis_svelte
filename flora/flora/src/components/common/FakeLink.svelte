<script lang="ts">
    import type {Taxon} from "../../data_classes/taxon";

    export let display: string;

</script>
<span class="fake-link">{display}</span>
<style>
.fake-link {
    color: #1095c1;
    cursor: pointer;
}
.fake-link:hover {
    text-decoration: underline;
}
</style>