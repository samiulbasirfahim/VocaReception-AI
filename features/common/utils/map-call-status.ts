import { Call } from "../type/call";

type Return = {
    label: string;
    textColor: string;
    backgroundColor: string;
};

export function mapCallStatus(reason: Call["status"]): Return {
    switch (reason) {
        case "booked":
            return {
                label: "Booked",
                textColor: "#047857",
                backgroundColor: "#D1FAE5",
            };
        case "completed":
            return {
                label: "Completed",
                textColor: "#1E3A8A",
                backgroundColor: "#DBEAFE",
            };
        case "follow-up":
            return {
                label: "Follow-up",
                textColor: "#B45309",
                backgroundColor: "#FEF3C7",
            };
    }
}
