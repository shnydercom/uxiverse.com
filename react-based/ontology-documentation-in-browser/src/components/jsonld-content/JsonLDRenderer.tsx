"use client"
import { FunctionComponent } from "react";

interface JsonLDRendererProps {
    isDebug: boolean;
    content: string;
}

const MachineReadableJsonLDRenderer: FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    return <script type="application/ld+json">
        {
            children
        }
    </script>
}

const HumanReadableJsonLDRenderer: FunctionComponent<React.PropsWithChildren<{}>> = ({ children }) => {
    return <code style={{ whiteSpace: "break-spaces", backgroundColor: "lightgray" }}>
        {children}
    </code>;
}

export const JsonLDRenderer: FunctionComponent<JsonLDRendererProps> = ({ isDebug, content }) => {
    const Renderer = isDebug ? HumanReadableJsonLDRenderer : MachineReadableJsonLDRenderer;
    return (<Renderer>{content}</Renderer>);
}
