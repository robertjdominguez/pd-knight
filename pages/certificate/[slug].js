import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { getSession } from "next-auth/client";
import { getPdSession, fetcher } from "../../components/utilities/hasura";
import { Cert } from "../../components/layout/Lib";

export default function Certificate({ session, details }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Cert ref={componentRef}>
        <div>IMAGE WILL GO HERE</div>
        <div>
          <p>{session.user.name}</p>
          <p>{details.title}</p>
          <p>{details.description}</p>
        </div>
      </Cert>
      <button onClick={handlePrint}>Print this out!</button>
    </>
  );
}

export async function getServerSideProps(ctx) {
  // Make sure logged in user
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return {};
  }

  //   Get the session information using the slug from the req
  const pdSession = await fetcher(getPdSession, {
    id: ctx.query.slug,
  });

  console.log(pdSession);

  return {
    props: {
      session,
      details: {
        title: pdSession.pdSession.title,
        description: pdSession.pdSession.description,
      },
    }, // will be passed to the page component as props
  };
}
