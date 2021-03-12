import { DashSession, SessionDeets, SessionItem } from "../layout/Lib";
import Moment from "react-moment";

export default function DashCard({ session }) {
  return (
    <DashSession>
      <td>{session.title}</td>
      <td>
        <Moment format="dddd, MMMM Do HH:MM a" date={session.date} />
      </td>
      <td>{session.leader.name.split(" ")[0]}</td>
    </DashSession>
  );
}
