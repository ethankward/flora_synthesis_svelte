import { createNewEndpoint } from "../util/api_util";
import type { HerbariumReportType } from "./types";

const GetHerbariumReports = createNewEndpoint("GET", "herbarium_reports", "get_herbarium_reports");

const CreateNewHerbariumReport = createNewEndpoint<{ name: string, external_url: string }>(
    "POST", "herbarium_reports", "create_herbarium_report"
)
const UpdateHerbariumReport = createNewEndpoint<Pick<HerbariumReportType, "id"> & Partial<HerbariumReportType>>(
    "PATCH", "herbarium_reports", "update_herbarium_report", (report) => [report.id.toString()]
);

const DeleteHerbariumReport = createNewEndpoint<{ id: number }>(
    "DELETE", "herbarium_reports", "delete_herbarium_report", (report) => [report.id.toString()]
);



const herbarium_report_exported_endpoints = [
    new GetHerbariumReports(), new CreateNewHerbariumReport(), new UpdateHerbariumReport(), new DeleteHerbariumReport()
]

export { CreateNewHerbariumReport, DeleteHerbariumReport, GetHerbariumReports, UpdateHerbariumReport, herbarium_report_exported_endpoints };

