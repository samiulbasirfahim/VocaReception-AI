import { Lead } from "../type/lead";

type Return = {
    label: string;
    bgColor: string;
    textColor: string;
};
export function mapLeadType(type: Lead["type"]): Return {
    switch (type) {
        case "tex_prepration":
            return {
                label: "Tax Preparation",
                bgColor: "#E0E7FF",
                textColor: "#432DD7",
            };
        case "pricing":
            return {
                label: "Pricing Inquiry",
                bgColor: "#FEF3C6",
                textColor: "#BB4D00",
            };
        case "sales":
            return {
                label: "Sales Inquiry",
                bgColor: "#D0FAE5",
                textColor: "#007A55",
            };
        case "consultation":
            return {
                label: "Consultation",
                bgColor: "#E5E7EB",
                textColor: "#4A5565",
            };
        case "other":
            return {
                label: "Other",
                bgColor: "#F3F4F6",
                textColor: "#374151",
            };
        default:
            return {
                label: type,
                bgColor: "#EEEEEE",
                textColor: "#424242",
            };
    }
}
