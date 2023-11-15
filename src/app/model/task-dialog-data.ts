import { Contributors } from "./contributors";

export class TaskDialogData {
    title: string;
    description: string;
    assignee: Contributors;
    contributors: Contributors[];
}