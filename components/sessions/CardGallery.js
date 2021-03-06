import SessionCard from "./SessionCard";
import { Gallery } from "../layout/Lib";

export default function CardGallery({ sessions }) {
  return (
    <>
      <div>
        <h2>Upcoming Sessions</h2>
        <p className={"subtle"}>
          Below you'll find all our upcoming sessions. These events haven't
          happened yet; for a complete catalogue of all our workshops, including
          ones in the past, click here.
        </p>
      </div>
      <Gallery>
        {sessions &&
          sessions.pdSessions.map((pd) => <SessionCard key={pd.id} pd={pd} />)}
      </Gallery>
    </>
  );
}
