<script lang="ts">
	import FakeLink from "../../../components/common/FakeLink.svelte";
	import { ChecklistRecordList } from "../../../data_classes/checklist_record";
	import { UpdateTaxon } from "../../../data_classes/taxon";
	import type { TaxonNameType, TaxonType } from "../../../data_classes/types";

	import FNALink from "../../../components/common/FNALink.svelte";
	import IPNILink from "../../../components/common/IPNILink.svelte";
	import InatLink from "../../../components/common/InatLink.svelte";
	import POWOLink from "../../../components/common/POWOLink.svelte";
	import SEINETLink from "../../../components/common/SEINETLink.svelte";
	import SEINETMapLink from "../../../components/common/SEINETMapLink.svelte";

	import TaxonNameAutocompletion from "../../../components/common/TaxonNameAutocompletion.svelte";
	import TaxonNameLink from "../../../components/common/TaxonNameLink.svelte";
	import InlineCheckbox from "../../../components/crud/InlineCheckbox.svelte";
	import InlineList from "../../../components/crud/InlineList.svelte";
	import InlineSelect from "../../../components/crud/InlineSelect.svelte";
	import InlineText from "../../../components/crud/InlineText.svelte";

	import {
		CreateNewTaxonSynonym,
		DeleteTaxonSynonym,
		UpdateTaxonSynonym,
	} from "../../../data_classes/taxon_synonym";

	import type {
		EndemicType,
		IntroducedType,
		LifeCycleType,
	} from "../../../data_classes/types";

	export let data;

	let taxon: TaxonType = data.taxon_data;
	let life_cycle_choices: LifeCycleType[] = data.life_cycle_data;
	let endemic_choices: EndemicType[] = data.endemic_data;
	let introduced_choices: IntroducedType[] = data.introduced_data;
	let checklist_records = new ChecklistRecordList(data.checklist_records);
	let selectedSynonymOfChoice: TaxonNameType;
	let update_taxon_endpoint = new UpdateTaxon();
	let create_taxon_synonym_endpoint = new CreateNewTaxonSynonym();
	let update_taxon_synonym_endpoint = new UpdateTaxonSynonym();
	let delete_taxon_synonym_endpoint = new DeleteTaxonSynonym();

	function copyTaxonName() {
		navigator.clipboard.writeText(taxon.taxon_name);
	}
</script>

<svelte:head>
	<title>{taxon.taxon_name}</title>
</svelte:head>

<article>
	<header>
		Taxon details: <span id="taxon_name_span"
			><mark
				>{taxon.taxon_name}
				{#if taxon.author}{taxon.author}
				{/if}</mark
			></span
		>
		&nbsp;
		<small
			><kbd
				on:click={copyTaxonName}
				on:keypress={copyTaxonName}
				role={"text"}><FakeLink display="copy" /></kbd
			></small
		>

		{#if taxon.seinet_id}
			<SEINETLink seinet_id={taxon.seinet_id} />
			<SEINETMapLink seinet_id={taxon.seinet_id} />
		{/if}
		{#if taxon.inat_id}
			<InatLink inat_id={taxon.inat_id} />
		{/if}
		<FNALink target={taxon.taxon_name} />
		<POWOLink taxon_name={taxon.taxon_name} />
		<IPNILink taxon_name={taxon.taxon_name} />

		{#if taxon.primary_checklist}
			<ins>Known from Rincons</ins>
		{:else}
			<mark>Not known from Rincons</mark>
		{/if}
	</header>
	<ul>
		<li>
			Taxon name:
			<InlineText
				id="taxon_name_editor"
				bind:display_value={taxon.taxon_name}
				bind:value={taxon.taxon_name}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						taxon_name: value,
						id: taxon.id,
					})}
			/>
		</li>
		<li>
			Author:
			<InlineText
				id="author_editor"
				bind:display_value={taxon.author}
				bind:value={taxon.author}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						author: value,
						id: taxon.id,
					})}
			/>
		</li>
		<li>Genus: <a href="/genus/{taxon.genus}">{taxon.genus}</a></li>
		<li>
			Family:
			<InlineText
				id="taxon_family_editor"
				bind:display_value={taxon.family}
				bind:value={taxon.family}
				create_link={(value) => "/family/" + value}
				apiMethod={() => update_taxon_endpoint.callExternal(taxon)}
			/>
		</li>
		<li>
			Synonyms:
			<InlineList
				existing_values={taxon.synonyms}
				createAPIMethod={(value) =>
					create_taxon_synonym_endpoint.callExternal({
						taxon: taxon.id,
						synonym: value,
					})}
				deleteAPIMethod={(value) =>
					delete_taxon_synonym_endpoint.callExternal({
						id: parseInt(value),
					})}
				updateAPIMethod={(synonym_id, value) =>
					update_taxon_synonym_endpoint.callExternal({
						id: parseInt(synonym_id),
						taxon: taxon.id,
						synonym: value,
					})}
			/>
		</li>

		<li>
			SEINet ID:
			<InlineText
				id="seinet_id_editor"
				display_value={taxon.seinet_id?.toString()}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						seinet_id: parseInt(value),
					})}
			/>
		</li>
		<li>
			INat ID:
			<InlineText
				id="inat_id_editor"
				display_value={taxon.inat_id?.toString()}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						inat_id: parseInt(value),
					})}
			/>
		</li>
		<li>
			Introduced status:
			<InlineSelect
				id="introduced_editor"
				display_value={taxon.introduced_display}
				value={taxon.introduced}
				choices={introduced_choices}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						introduced: value,
					})}
			/>
		</li>
		<li>
			Endemic status:
			<InlineSelect
				id="endemic_editor"
				display_value={taxon.endemic_display}
				value={taxon.endemic}
				choices={endemic_choices}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						endemic: value,
					})}
			/>
		</li>
		<li>
			Life cycle:
			<InlineSelect
				id="life_cycle_editor"
				display_value={taxon.life_cycle_display}
				value={taxon.life_cycle}
				choices={life_cycle_choices}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						life_cycle: value,
					})}
			/>
		</li>
		{#if taxon.parent_species}
			<li>
				Parent species: <TaxonNameLink taxon={taxon.parent_species} />
			</li>
		{/if}
		{#if taxon.subtaxa.length > 0}
			<li>
				Subtaxa: {#each taxon.subtaxa as subtaxon, i}{#if i > 0},&nbsp;{/if}<TaxonNameLink
						taxon={subtaxon}
					/>{/each}
			</li>
		{/if}

		{#if taxon.first_observation_date}
			<li>
				First observed in Rincons on <a
					href={taxon.first_observation_date_url}
					>{taxon.first_observation_date}</a
				>
			</li>
		{/if}

		{#if taxon.last_observation_date}
			<li>
				Last observed in Rincons on <a
					href={taxon.last_observation_date_url}
					>{taxon.last_observation_date}</a
				>
			</li>
		{/if}

		<li>
			Rincons population at edge of range (strictly furthest):
			<InlineCheckbox
				label="North"
				bind:value={taxon.local_population_strict_northern_range_limit}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						local_population_strict_northern_range_limit: value,
					})}
			/>
			<InlineCheckbox
				label="South"
				bind:value={taxon.local_population_strict_southern_range_limit}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						local_population_strict_southern_range_limit: value,
					})}
			/>
			<InlineCheckbox
				label="West"
				bind:value={taxon.local_population_strict_western_range_limit}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						local_population_strict_western_range_limit: value,
					})}
			/>
			<InlineCheckbox
				label="East"
				bind:value={taxon.local_population_strict_eastern_range_limit}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						local_population_strict_eastern_range_limit: value,
					})}
			/>
		</li>
		<li>
			Occurrence remarks:
			<InlineText
				id="occurrence_remarks_editor"
				display_value={taxon.occurrence_remarks?.toString()}
				apiMethod={(value) =>
					update_taxon_endpoint.callExternal({
						id: taxon.id,
						occurrence_remarks: value,
					})}
			/>
		</li>
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
						<a
							href={"/checklist_record_detail/" +
								checklist_record.checklist.checklist_type +
								"/" +
								checklist_record.id}
							target="_blank"
							>{checklist_record.checklist_taxon.taxon_name}</a
						>

						{#if checklist_record.external_url}
							<a
								href={checklist_record.external_url}
								target="_blank">→</a
							>
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
								<li>
									Observation type: {checklist_record.observation_type}
								</li>
							{/if}
							{#if checklist_record.notes.length > 0}
								<li>
									Notes:
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
	<form method="POST" action="?/synonymize">
		<div class="grid">
			<TaxonNameAutocompletion
				bind:selectedItem={selectedSynonymOfChoice}
			/>
			<input type="hidden" name="taxon_id_1" value={taxon.id} />
			<input
				type="hidden"
				name="taxon_id_2"
				value={selectedSynonymOfChoice?.id}
			/>
		</div>
		<hr />
		<input type="submit" value="Make synonym" />
	</form>
</article>
