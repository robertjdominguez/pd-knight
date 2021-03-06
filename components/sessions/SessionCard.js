import Link from "next/link";
import { SeshCard } from "../layout/Lib";

const SessionCard = (props) => {
  return (
    <Link href={`/sessions/${props.pd.slug}`}>
      <SeshCard bg={props.pd.image.url} />
    </Link>
  );
};

export default SessionCard;
