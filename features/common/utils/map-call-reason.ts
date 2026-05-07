import { Call } from "../type/call";

type Return = {
    label: string;
    textColor: string;
    backgroundColor: string;
};

export function mapCallReason(reason: Call["reason"]): Return {
    switch (reason) {
        case "tex-preparation":
            return {
                label: "Tax Preparation",
                textColor: "#6D28D9",
                backgroundColor: "#EDE9FE",
            };
        case "business-consulting":
            return {
                label: "Business Consulting",
                textColor: "#047857",
                backgroundColor: "#D1FAE5",
            };
        case "payrol-service":
            return {
                label: "Payroll Service",
                textColor: "#B45309",
                backgroundColor: "#FEF3C7",
            };
        case "other":
            return {
                label: "Other",
                textColor: "#374151",
                backgroundColor: "#F3F4F6",
            };
    }
}
