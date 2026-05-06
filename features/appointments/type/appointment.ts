import { Status } from "@/features/common/type/status";

export type Appointment = {
    id: string;
    title: string;
    date: Date;
    status: Status;
    description: string;
};
