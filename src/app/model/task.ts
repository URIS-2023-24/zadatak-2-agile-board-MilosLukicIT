import { Contributors } from "./contributors";

export class Task {
    id: number;
    title: string;
    description: string;
    assignee: Contributors;
}