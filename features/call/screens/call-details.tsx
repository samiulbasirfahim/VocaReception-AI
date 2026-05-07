import { AiSection } from "@/features/common/components/ai-section";
import SafeLayout from "@/features/common/layout/safe-keyboard-scroll-view";
import { useLocalSearchParams } from "expo-router";
import { CallDetailsHeaderCard } from "../components/call-details-header-card";
import CallDetailsCards from "../components/call-details-cards";
import CallTranscript from "../components/call-transcript";

export default function CallDetailsScreen() {
    const call_id = useLocalSearchParams<{
        call_id: string;
    }>().call_id;

    return (
        <SafeLayout>
            <CallDetailsHeaderCard />

            <AiSection
                title="AI Summary"
                description="John called to inquire about tax preparation services for his small business. He expressed high interest and the AI successfully scheduled a consultation for next Tuesday at 2:00 PM. Client mentioned annual revenue ~$250K — high-value prospect."
            />

            <CallDetailsCards />
            <CallTranscript
                transcript={[
                    {
                        speaker: "client",
                        text: "Hi, I'm interested in your tax preparation services for my small business.",
                    },
                    {
                        isAI: true,
                        speaker: "AI ASSISTANT",
                        text: "Hello John, thank you for reaching out! I'd be happy to assist you with our tax preparation services. Can you tell me a bit about your business and what specific services you're looking for?",
                    },
                ]}
            />
        </SafeLayout>
    );
}
