import SessionCard from "./SessionCard";
import { Gallery } from "../layout/Lib";

export default function CardGallery({ sessions }) {
  return (
    <>
      <div>
        <h2>Upcoming Sessions</h2>
        <p className={"subtle"}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
          nisi, harum facere culpa maiores exercitationem perferendis eius
          aliquid eligendi vitae cum? Non asperiores cupiditate quod! Iste hic
          voluptatibus recusandae repellendus magni, iusto ab molestias nemo
          possimus ratione enim sunt modi?
        </p>
      </div>
      <Gallery>
        {sessions &&
          sessions.pdSessions.map((pd) => <SessionCard key={pd.id} pd={pd} />)}
      </Gallery>
    </>
  );
}
