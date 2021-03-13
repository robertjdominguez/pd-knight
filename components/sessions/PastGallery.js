import SessionCard from "./SessionCard";
import { Gallery } from "../layout/Lib";

export default function PastGallery({ sessions }) {
  // Now
  let now = new Date();

  let past = sessions.pdSessions.filter((session) => {
    return Date.parse(session.date) < now;
  });

  return (
    <>
      <div>
        <h2>Past Sessions</h2>
        <p className={"subtle"}>
          Below you can find all our past sessions. You can click on the card
          for details and, if a recording is available, access it via the link.
        </p>
      </div>
      <Gallery>
        {past && past.map((pd) => <SessionCard key={pd.id} pd={pd} />)}
      </Gallery>
    </>
  );
}
