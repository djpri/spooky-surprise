import { useState, useEffect } from "react"

import { storyNodes, type StoryNode } from "../data/storyNodes"
import introVideo from "../assets/videos/background/intro.mp4"
interface DynamicBackgroundProps {
    currentNode: StoryNode["id"]
}

const DynamicBackground = ({ currentNode }: DynamicBackgroundProps) => {
    const [backgroundImagePath, setBackgroundImagePath] = useState<string | null>(null)
    useEffect(() => {
        setBackgroundImagePath(storyNodes[currentNode].imagePath)
    }, [currentNode])
    if (backgroundImagePath === null) {
        return (
            <div>
                <video autoPlay muted loop playsInline className="h-full w-full fixed top-0 left-0 object-cover">
                    <source src={introVideo} type="video/mp4" />
                </video>
            </div>
        )
    }
    return (
        <div>
            <img src={backgroundImagePath} alt="skeleton" className="h-full w-full fixed top-0 left-0 object-cover"/>
        </div>
    )
}

export default DynamicBackground;