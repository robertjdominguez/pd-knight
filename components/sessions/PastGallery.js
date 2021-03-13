import SessionCard from "./SessionCard";
import { Gallery } from "../layout/Lib";

export default function PastGallery({ sessions }) {
  // Now
  let now = new Date();

  let past = sessions.pdSessions.filter((session) => {
    return Date.parse(session.date) < now;
  });

  past.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
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
