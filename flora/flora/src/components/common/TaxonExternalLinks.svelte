<script lang="ts">
    import type {Taxon} from "../../data_classes/taxon";
    export let taxon: Taxon;
</script>

<sup>
    {#if taxon.seinet_id}<a
            href="https://swbiodiversity.org/seinet/taxa/index.php?taxon={taxon.seinet_id}"
            target="_blank"
            >SN</a
        >{/if}
    {#if taxon.inat_id}<a
            href="https://www.inaturalist.org/taxa/{taxon.inat_id}"
            target="_blank"
            >IN</a
        >{/if}
</sup>
