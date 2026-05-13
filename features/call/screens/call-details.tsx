import { AiSection } from "@/features/common/components/ai-section";
import EmptyState from "@/features/common/components/empty-state";
import Loader from "@/features/common/components/loader";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import { Call } from "@/features/common/type/call";
import { Status } from "@/features/common/type/status";
import { useLocalSearchParams } from "expo-router";
import CallDetailsCards from "../components/call-details-cards";
import { CallDetailsHeaderCard } from "../components/call-details-header-card";
import CallTranscript from "../components/call-transcript";
import { useCallDetailsQuery } from "../query/use-call-details-query";

const normalizeReason = (reason?: string): Call["reason"] => {
    const normalized = reason
        ?.trim()
        .toLowerCase()
        .replace(/[_\s]+/g, "-");
    switch (normalized) {
        case "tax-preparation":
        case "tex-preparation":
            return "tex-preparation";
        case "business-consulting":
            return "business-consulting";
        case "payroll-service":
        case "payrol-service":
            return "payrol-service";
        default:
            return "other";
    }
};

const normalizeStatus = (status?: string): Call["status"] => {
    const normalized = status
        ?.trim()
        .toLowerCase()
        .replace(/[_\s]+/g, "-");
    switch (normalized) {
        case "booked":
            return "booked";
        case "completed":
            return "completed";
        case "follow-up":
            return "follow-up";
        default:
            return "follow-up";
    }
};

const normalizeClientStatus = (status?: string): Status => {
    if (status === "A" || status === "B" || status === "C" || status === "D") {
        return status;
    }
    return "D";
};

const formatLabel = (value?: string | null) => {
    const cleaned = value?.trim();
    if (!cleaned) {
        return "Unknown";
    }
    return cleaned
        .split(/[_-]+/)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

const parseTags = (tags?: string | null) =>
    tags
        ? tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0)
        : [];

const parseTranscript = (transcript?: string | null) => {
    if (!transcript) {
        return [];
    }
    return transcript
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => {
            const [label, ...rest] = line.split(":");
            const text = rest.join(":").trim() || line;
            const speaker = label?.trim() || "Caller";
            const isAI = speaker.toLowerCase().startsWith("ai");
            return {
                speaker: isAI ? "AI ASSISTANT" : speaker,
                text,
                isAI,
            };
        });
};

export default function CallDetailsScreen() {
    const { call_id } = useLocalSearchParams<{ call_id?: string | string[] }>();
    const callId = Array.isArray(call_id) ? call_id[0] : call_id;
    const { data, isLoading } = useCallDetailsQuery(callId);

    if (isLoading && !data) {
        return (
            <SafeLayout>
                <Loader label="Loading call details..." />
            </SafeLayout>
        );
    }

    if (!data) {
        return (
            <SafeLayout>
                <EmptyState
                    title="Call details unavailable"
                    description="Please try again in a moment."
                />
            </SafeLayout>
        );
    }

    const startTime = data.start_time
        ? new Date(data.start_time)
        : new Date();
    const transcriptEntries = parseTranscript(data.transcript);

    return (
        <SafeLayout>
            <CallDetailsHeaderCard
                name={data.name || "Unknown"}
                status={normalizeStatus(data.status)}
                group={normalizeClientStatus(data.group)}
                phone={data.caller_number || "Unknown"}
                startTime={startTime}
                durationSeconds={data.duration ?? 0}
            />

            <AiSection
                title="AI Summary"
                description={data.summary || "No summary available yet."}
            />

            <CallDetailsCards
                reason={normalizeReason(data.reason)}
                outcome={data.outcome}
                scheduleStatus={formatLabel(data.status)}
                leadStatus={data.lead_status}
                tags={parseTags(data.tags)}
            />
            {transcriptEntries.length > 0 ? (
                <CallTranscript transcript={transcriptEntries} />
            ) : (
                <EmptyState
                    title="No transcript"
                    description="Transcript will appear once it is available."
                />
            )}
        </SafeLayout>
    );
}
