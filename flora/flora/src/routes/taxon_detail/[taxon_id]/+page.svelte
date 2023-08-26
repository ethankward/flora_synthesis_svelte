<script lang="ts">
	import { onMount } from "svelte";
	import { APIManager } from "../../../util/api";

	import TaxonLinkRaw from "../../../components/TaxonLinkRaw.svelte";
	import InlineFormEditor from "../../../components/InlineFormEditor.svelte";
	import { Taxon } from "../../../util/api_data_classes/taxon";
	import { ChecklistList } from "../../../util/api_data_classes/checklist";

	import { EndemicChoices } from "../../../util/api_data_classes/endemic";
	import { LifeCycleChoices } from "../../../util/api_data_classes/life_cycle";
	import { ChecklistRecord, ChecklistRecordList } from "../../../util/api_data_classes/checklist_record";

    import TaxonLink from "../../../components/TaxonLink.svelte";

	export let data;

	let taxon = new Taxon(data.taxon_data.data, true);
	let life_cycle_choices = new LifeCycleChoices(data.life_cycle_data.data);
	let endemic_choices=  new EndemicChoices(data.endemic_data.data);
	let checklist_records = new ChecklistRecordList(data.checklist_record_data.data).getGrouped();

    let api_manager = new APIManager("http://127.0.0.1:8000/api/");

	function copyTaxonName() {
		navigator.clipboard.writeText(taxon.taxon_name);
	}

</script>

<article>
	<header>Taxon details: <span id="taxon_name_span"><mark>{taxon.taxon_name}</mark></span> <small><kbd><a href="#" on:click={copyTaxonName} >copy</a></kbd></small>
		{#if taxon.seinet_id}
		[<a
			href="https:swbiodiversity.org/seinet/taxa/index.php?taxon={taxon.seinet_id}"
			target="_blank">SEINet</a
		>] [<a
			href="https:swbiodiversity.org/seinet/collections/map/googlemap.php?taxa={taxon.seinet_id}"
			target="_blank">Map</a
		>]
	{/if}
	{#if taxon.inat_id}
		[<a
			href="https:www.inaturalist.org/taxa/{taxon.inat_id}"
			target="_blank">iNat</a
		>]
	{/if}
	</header>

	<ul>
		<li>Taxon name: 
			<InlineFormEditor
			type="text"
			display_value={taxon.taxon_name}
			apiMethod={(value) => api_manager.updateTaxon(taxon.id, {taxon_name: value})}
			/>
		</li>

		<li>Family:
			<InlineFormEditor
			type="text"
			display_value={taxon.family}
			apiMethod={(value) => api_manager.updateTaxon(taxon.id, {family: value})}
			/>
		</li>
		{#if taxon.synonyms.length > 0}
		<li>Synonyms:
			<ul>
				{#each taxon.synonyms as taxon_synonym}
				<li>{taxon_synonym.synonym}</li>
				{/each}
			</ul>
		</li>
		{/if}
		<li>SEINet ID:
			<InlineFormEditor
			id="seinet_id_editor"
			type="text"
			display_value={taxon.seinet_id}
			apiMethod={(value) => api_manager.updateTaxon(taxon.id, {seinet_id: value})}
			/>
		</li>
		<li>INat ID:
			<InlineFormEditor
			id="inat_id_editor"
			type="text"
			display_value={taxon.inat_id}
			apiMethod={(value) => api_manager.updateTaxon(taxon.id, {inat_id: value})}
			/>
		</li>
		{#if taxon.parent_species}
		<li>Parent species: <TaxonLinkRaw taxon={taxon.parent_species}/></li>
		{/if}
		{#if taxon.subtaxa.length > 0}
		<li>Subtaxa: {#each taxon.subtaxa as subtaxon, i}{#if i > 0},&nbsp;{/if}<TaxonLinkRaw taxon={subtaxon}/>{/each}</li>
		{/if}
	</ul>
</article>

<article>
	<header>Records</header>

	{#each Object.entries(checklist_records).sort() as [group_title, group_records]}
	<details open>
	<summary>{group_title}</summary>
	<ul>
		{#each group_records as checklist_record}
		<li>
			{checklist_record.checklist_taxon.taxon_name}
			{#if checklist_record.external_url}
			<a href={checklist_record.external_url} target="_blank">→</a>
			{/if}
			<ul>
				{#if checklist_record.observation_type}
				<li>Observation type: {checklist_record.observation_type.observation_type_value}</li>
				{/if}
				{#if checklist_record.date}
				<li>Date: {checklist_record.date}</li>
				{/if}

			</ul>
		</li>
		{/each}
	</ul>
	</details>
	{/each}

</article>