export type AppointmentContact = {
    name: string | null;
    email: string | null;
    phone: string | null;
};

export type AppointmentNote = {
    id?: string;
    body?: string;
    createdAt?: string;
    [key: string]: unknown;
};

export type Appointment = {
    id: string;
    title: string;
    date: Date;
    description: string;
    startTime?: string;
    endTime?: string | null;
    appointmentStatus?: string | null;
    bookingStatus?: string | null;
    contact?: AppointmentContact | null;
    callerSummary?: string | null;
    reason?: string | null;
    group?: string | null;
    contactNotes?: AppointmentNote[];
};
