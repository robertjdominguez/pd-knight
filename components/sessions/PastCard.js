import { DashSession, HoverImg } from "../layout/Lib";
import Link from "next/link";

export default function PastCard({ session }) {
  console.log(session);
  return (
    <DashSession>
      <td>{session.pdconnection[0].title}</td>
      <td>
        {session.pdconnection[0].videoLink != null ? (
          <a href={`${session.pdconnection[0].videoLink}`} target="_blank">
            <HoverImg src="/play.svg" alt="Play icon" />
          </a>
        ) : (
          <img
            style={{ filter: `grayscale(100%)` }}
            src="/play.svg"
            alt="Play icon"
          />
        )}
      </td>
      <td>
        {session.present == true ? (
          <Link
            href={`/certificate/${session.pdconnection[0].id}`}
            target="_blank">
            <HoverImg
              style={{ cursor: `pointer` }}
              src="/badge.svg"
              alt="Play icon"
            />
          </Link>
        ) : (
          <img
            style={{ filter: `grayscale(100%)` }}
            src="/badge.svg"
            alt="Certificate badge"
          />
        )}
      </td>
    </DashSession>
  );
}
