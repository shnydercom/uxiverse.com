import { RtLdIdentifiableNode, RtLdValue } from "./graphInterfaces";

export function isRtLdValue(value: any): value is RtLdValue {
    return value && typeof value === "object" && "@value" in value;
}

export function isRtLdIdentifiableNode(value: any): value is RtLdIdentifiableNode {
    return value && typeof value === "object" && "@id" in value;
}