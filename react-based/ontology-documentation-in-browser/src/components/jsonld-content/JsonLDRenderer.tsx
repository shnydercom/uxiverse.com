"use client"
import { FunctionComponent } from "react";

interface JsonLDRendererProps {
    isDebug: boolean;
    content: string;
}

const MachineReadableJsonLDRenderer: FunctionComponent<Omit<JsonLDRendererProps, "isDebug">> = ({ content }) => {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: content }}>
        {

        }
    </script>
}

const HumanReadableJsonLDRenderer: FunctionComponent<Omit<JsonLDRendererProps, "isDebug">> = ({ content }) => {
    return <code style={{ whiteSpace: "break-spaces", backgroundColor: "lightgray" }} dangerouslySetInnerHTML={{ __html: content }}>
    </code>;
}

export const JsonLDRenderer: FunctionComponent<JsonLDRendererProps> = ({ isDebug, content }) => {
    const Renderer = isDebug ? HumanReadableJsonLDRenderer : MachineReadableJsonLDRenderer;
    return (<Renderer content={content} />);
}
