import SessionCard from "./SessionCard";
import { Gallery } from "../layout/Lib";

export default function CardGallery({ sessions }) {
  // Now
  let now = new Date();

  let upcoming = sessions.pdSessions.filter((session) => {
    return Date.parse(session.date) > now;
  });

  upcoming.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date);
  });

  console.log(upcoming);

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
        {upcoming && upcoming.map((pd) => <SessionCard key={pd.id} pd={pd} />)}
      </Gallery>
    </>
  );
}
