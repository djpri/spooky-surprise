import { useState, useEffect } from "react";

interface TypewriterProps {
    text: string;
    speed?: number; // milliseconds per character
    onComplete?: () => void;
}

export const Typewriter: React.FC<TypewriterProps> = ({
    text,
    speed = 50,
    onComplete,
}) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        setDisplayed(""); // clear for new text
        let cancelled = false;

        const typeChar = (i: number) => {
            if (cancelled) return;

            if (i < text.length) {
                setDisplayed((prev) => prev + text[i]);
                setTimeout(() => typeChar(i + 1), speed);
            } else {
                onComplete?.();
            }
        };

        typeChar(0);

        return () => {
            cancelled = true;
        };
    }, [text, speed, onComplete]);

    return <span>{displayed}</span>;
};
