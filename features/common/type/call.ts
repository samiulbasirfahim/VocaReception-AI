import { Status } from "./status";

export type Call = {
    id: string;
    name?: string;
    client_status: Status;
    phone: string;
    time: Date;
    status: "booked" | "completed" | "follow-up";
    reason:
    | "tex-preparation"
    | "business-consulting"
    | "payrol-service"
    | "other";
};
