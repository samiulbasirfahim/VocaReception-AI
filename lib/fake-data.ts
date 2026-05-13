import { Appointment } from "@/features/appointments/type/appointment";
import { Call } from "@/features/common/type/call";
import { Lead } from "@/features/leads/type/lead";

export const APPOINTMENTS: Appointment[] = [];

export const LEADS: Lead[] = [];

export const CALLS: Call[] = [
    {
        id: "1",
        client_status: "A",
        phone: "+1 202-555-0101",
        time: new Date("2026-05-01T09:00:00"),
        status: "booked",
        reason: "tex-preparation",
    },
    {
        id: "2",
        client_status: "B",
        phone: "+1 202-555-0102",
        time: new Date("2026-05-01T10:30:00"),
        status: "completed",
        reason: "business-consulting",
    },
    {
        id: "3",
        client_status: "C",
        phone: "+1 202-555-0103",
        time: new Date("2026-05-01T12:15:00"),
        status: "follow-up",
        reason: "payrol-service",
    },
    {
        id: "4",
        client_status: "D",
        phone: "+1 202-555-0104",
        time: new Date("2026-05-01T14:00:00"),
        status: "booked",
        reason: "other",
    },
    {
        id: "5",
        client_status: "A",
        phone: "+1 202-555-0105",
        time: new Date("2026-05-02T09:45:00"),
        status: "completed",
        reason: "tex-preparation",
    },
    {
        id: "6",
        client_status: "B",
        phone: "+1 202-555-0106",
        time: new Date("2026-05-02T11:20:00"),
        status: "follow-up",
        reason: "business-consulting",
    },
    {
        id: "7",
        client_status: "C",
        phone: "+1 202-555-0107",
        time: new Date("2026-05-02T13:10:00"),
        status: "booked",
        reason: "payrol-service",
    },
    {
        id: "8",
        client_status: "D",
        phone: "+1 202-555-0108",
        time: new Date("2026-05-02T16:00:00"),
        status: "completed",
        reason: "other",
    },
    {
        id: "9",
        client_status: "A",
        phone: "+1 202-555-0109",
        time: new Date("2026-05-03T08:30:00"),
        status: "follow-up",
        reason: "tex-preparation",
    },
    {
        id: "10",
        client_status: "B",
        phone: "+1 202-555-0110",
        time: new Date("2026-05-03T10:45:00"),
        status: "booked",
        reason: "business-consulting",
    },
];
