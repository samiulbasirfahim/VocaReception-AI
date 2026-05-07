import { Call } from "@/features/common/type/call";

export type CallDetails = Call & {
    duration: number;
};
