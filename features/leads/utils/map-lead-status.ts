import { Lead } from "../type/lead";

type Return = {
    label: string;
    bgColor: string;
    textColor: string;
};

export function mapLeadStatus(status: Lead["status"]): Return {
    switch (status) {
        case "new":
            return {
                label: "New",
                bgColor: "#E0E7FF",
                textColor: "#432DD7",
            };
        case "connected":
            return {
                label: "Contacted",
                bgColor: "#FEF3C6",
                textColor: "#BB4D00",
            };
        case "booked":
            return {
                label: "Booked",
                bgColor: "#D0FAE5",
                textColor: "#007A55",
            };
        case "closed":
            return {
                label: "Closed",
                bgColor: "#E5E7EB",
                textColor: "#4A5565",
            };
        default:
            return {
                label: status,
                bgColor: "#EEEEEE",
                textColor: "#424242",
            };
    }
}
