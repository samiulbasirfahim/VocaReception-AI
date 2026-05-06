import { Lead } from "../type/lead";

type Return = {
    label: string;
    bgColor: string;
    textColor: string;
};

export function mapLeadPriority(priority: Lead["priority"]): Return {
    switch (priority) {
        case "high":
            return {
                label: "High",
                bgColor: "#FEE2E2",
                textColor: "#B91C1C",
            };
        case "medium":
            return {
                label: "Medium",
                bgColor: "#FEF3C6",
                textColor: "#BB4D00",
            };
        case "low":
            return {
                label: "Low",
                bgColor: "#D1FAE5",
                textColor: "#065F46",
            };
        default:
            return {
                label: priority,
                bgColor: "#EEEEEE",
                textColor: "#424242",
            };
    }
}
