import { AnimeCarousel } from "@components/AnimeCarousel";
import { ScheduleSection } from "@components/ScheduleSection"

export default function Home() {
    return (
        <div>
            <AnimeCarousel />
            <div className="max-w-6xl mx-auto">
                <ScheduleSection />
            </div>
        </div>
    )
}