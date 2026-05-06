export type Lead = {
    id: string;
    title: string;
    type: "tex_prepration" | "pricing" | "sales" | "consultation" | "other";
    last_contacted_at: string;
    priority: "high" | "medium" | "low";
    status: "connected" | "new" | "booked" | "closed";
};
