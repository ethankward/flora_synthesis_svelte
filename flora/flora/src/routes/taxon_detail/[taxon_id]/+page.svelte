<script lang="ts">
	import AutoComplete from "simple-svelte-autocomplete";

    import TaxonNameLink from "../../../components/common/TaxonNameLink.svelte";
	import InlineList from "../../../components/crud/InlineList.svelte";
	import InlineSelect from "../../../components/crud/InlineSelect.svelte";
	import InlineText from "../../../components/crud/InlineText.svelte";
	
	import { Taxon } from "../../../data_classes/taxon";
	import {ChecklistRecordList} from "../../../data_classes/checklist_record";

	import type { EndemicType, LifeCycleType, IntroducedType } from "../../../data_classes/types";
	import {callExternalEndpoint} from "../../../util/local_api_dispatch";

	export let data;

	let taxon = new Taxon(data.taxon_data);
	let life_cycle_choices: LifeCycleType[] = data.life_cycle_data;
	let endemic_choices: EndemicType[] =  data.endemic_data;
	let introduced_choices: IntroducedType[] =  data.introduced_data;
	let checklist_records = new ChecklistRecordList(data.checklist_records);
	let selectedSynonymOfChoice: {id: number};

	function copyTaxonName() {
		navigator.clipboard.writeText(taxon.taxon_name);
	}

	async function getSynonymAutocompletion(search_term: string) {
		return await callExternalEndpoint({search_term: search_term}, "get_taxa_autocompletion");
	}

	function submitMakeSynonymOf() {
		let synonym_of_id: number = selectedSynonymOfChoice.id;
		callExternalEndpoint({taxon_id_1: taxon.id, taxon_id_2: synonym_of_id}, "make_taxon_synonym_of").then(
			(result) => {
				window.location.href = '/taxon_detail/' + synonym_of_id;
			}
		);

	}

	let form;

</script>

<svelte:head>
    <title>{taxon.taxon_name}</title> 
</svelte:head>

<h3>
	Taxon details: <span id="taxon_name_span"><mark>{taxon.taxon_name}</mark></span> <small><kbd><a href="#" on:click={copyTaxonName} >copy</a></kbd></small>
</h3>

<article>
	<header>
		{#if taxon.seinet_id}
		[<a
			href="https://swbiodiversity.org/seinet/taxa/index.php?taxon={taxon.seinet_id}"
			target="_blank">SEINet</a
		>] [<a
			href="https://swbiodiversity.org/seinet/collections/map/googlemap.php?taxa={taxon.seinet_id}"
			target="_blank">Map</a
		>]
	{/if}
	{#if taxon.inat_id}
		[<a
			href="https://www.inaturalist.org/taxa/{taxon.inat_id}"
			target="_blank">iNat</a
		>]
	{/if}
	{#if taxon.primary_taxon}
	<ins>Known from Rincons</ins>
	{:else}
	<mark>Not known from Rincons</mark>
	{/if}
	</header>
	<ul>
		<li>Taxon name:
			<InlineText
			id="taxon_name_editor"
			display_value={taxon.taxon_name}
			apiMethod={(value) => callExternalEndpoint({taxon_id: taxon.id, taxon_name: value}, "update_taxon")}
			/>
		</li>
		<li>Genus: <a href="/genus/{taxon.genus}">{taxon.genus}</a></li>
		<li>Family:
			<InlineText
			id="taxon_family_editor"
			display_value={taxon.family}
			create_link={(value) => "/family/" + value}
			apiMethod={(value) => callExternalEndpoint({taxon_id: taxon.id, family: value}, "update_taxon")}
			/>
		</li>
		<li>Synonyms:
			<InlineList 
			existing_values={taxon.synonyms}
			createAPIMethod={(value) => callExternalEndpoint({taxon_id: taxon.id, synonym: value}, "create_new_taxon_synonym")}
			deleteAPIMethod={(synonym_id) => callExternalEndpoint({synonym_id: parseInt(synonym_id)}, "delete_taxon_synonym")}
			updateAPIMethod={(synonym_id, value) => callExternalEndpoint({synonym_id: parseInt(synonym_id), synonym: value}, "update_taxon_synonym")}
			/>
		</li>

		<li>SEINet ID:
			<InlineText
			id="seinet_id_editor"
			display_value={taxon.seinet_id?.toString()}
			apiMethod={(value) => callExternalEndpoint({taxon_id: taxon.id, seinet_id: value},  "update_taxon")}
			/>
		</li>
		<li>INat ID:
			<InlineText
			id="inat_id_editor"
			display_value={taxon.inat_id?.toString()}
			apiMethod={(value) => callExternalEndpoint({taxon_id: taxon.id, inat_id: value},  "update_taxon")}
			/>
		</li>
		<li>Introduced status:
			<InlineSelect
			id="introduced_editor"
			display_value={taxon.introduced_display}
			value={taxon.introduced}
			choices={introduced_choices}
			apiMethod={(value) => callExternalEndpoint({taxon_id: taxon.id, introduced: value},  "update_taxon")}
			/>

		</li>
		<li>Endemic status:
			<InlineSelect
			id="endemic_editor"
			display_value={taxon.endemic_display}
			value={taxon.endemic}
			choices={endemic_choices}
			apiMethod={(value) => callExternalEndpoint({taxon_id: taxon.id, endemic: value},  "update_taxon")}
			/>
		</li>
		<li>Life cycle:
			<InlineSelect
			id="life_cycle_editor"
			display_value={taxon.life_cycle_display}
			value={taxon.life_cycle}
			choices={life_cycle_choices}
			apiMethod={(value) => callExternalEndpoint({taxon_id: taxon.id, life_cycle: value},  "update_taxon")}
			/>

		</li>
		{#if taxon.parent_species}
		<li>Parent species: <TaxonNameLink taxon={taxon.parent_species}/></li>
		{/if}
		{#if taxon.subtaxa.length > 0}
		<li>Subtaxa: {#each taxon.subtaxa as subtaxon, i}{#if i > 0},&nbsp;{/if}<TaxonNameLink taxon={subtaxon}/>{/each}</li>
		{/if}

		{#if taxon.first_observation_date}
		<li>First observed in Rincons on <a href="{taxon.first_observation_date.url}">{taxon.first_observation_date.date}</a> </li>
		{/if}
		
		{#if taxon.last_observation_date}
		<li>Last observed in Rincons on <a href="{taxon.last_observation_date.url}">{taxon.last_observation_date.date}</a> </li>
		{/if}
		
	</ul>
</article>



<article>
	<header>Records</header>

	{#each Object.entries(checklist_records.groupByChecklist()).sort() as [group_title, group_records]}
	<details open>
	<summary>{group_title}</summary>
	<ul>
		{#each group_records as checklist_record}
		<li>
			<a href={"/checklist_record_detail/" + checklist_record.checklist.checklist_type + "/" + checklist_record.id} target="_blank">{checklist_record.checklist_taxon.taxon_name}</a>

			{#if checklist_record.external_url}
			<a href={checklist_record.external_url} target="_blank">→</a>
			{/if}
			<ul>
				{#if checklist_record.observer}
				<li>
					<small>{checklist_record.observer}</small>
				</li>
				{/if}
				{#if checklist_record.date}
				<li>
					<small>{checklist_record.date}</small>
				</li>
				{/if}
				{#if checklist_record.observation_type}
				<li>Observation type: {checklist_record.observation_type}</li>
				{/if}
				{#if checklist_record.notes.length > 0}
				<li>Notes:
					<ul>
						{#each checklist_record.notes as note}
						<li>{note.note}</li>
						{/each}
					</ul>
				</li>
				{/if}
			</ul>
		</li>
		{/each}
	</ul>
	</details>
	{/each}

</article>

<article>
	<header>Synonymize</header>
	<form  on:submit={submitMakeSynonymOf}>
		<div class="grid">
		<AutoComplete
		searchFunction="{getSynonymAutocompletion}"
		delay="200"
		localFiltering={false}
		labelFieldName="taxon_name"
		valueFieldName="pk"
		hideArrow={true}
		required={true}
		bind:selectedItem="{selectedSynonymOfChoice}"
	  />
	</div>
	<hr>
	<input type="submit" value="Make synonym">
	</form>

</article>