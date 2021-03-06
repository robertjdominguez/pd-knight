import Head from "next/head";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { getSession } from "next-auth/client";
import Moment from "react-moment";
import { getPdSession, fetcher } from "../../components/utilities/hasura";
import { Cert, SwellImg, Signatures } from "../../components/layout/Lib";

export default function Certificate({ session, details }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Head>
        <title>PD Knight - Certificate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: `grid`,
          placeItems: `center center`,
          marginTop: `40px`,
        }}>
        <SwellImg
          onClick={handlePrint}
          style={{ cursor: `pointer`, width: `40px`, height: `auto` }}
          src="/printer.svg"
          alt="Printer icon"
        />
      </div>
      <Cert ref={componentRef}>
        <img
          src="/TAS_Knight_Circle.svg"
          width="300px"
          height="auto"
          alt="The Altamont School Logo"
        />
        <div>
          <h2>{session.user.name}</h2>
          <h4 style={{ marginTop: `0` }}>
            {details.title} <span>({details.hours} hours)</span>
          </h4>
          <p className="subtle">
            <Moment format="dddd Do MMMM hh:mm a" date={details.date} />
          </p>
          <p>{details.description}</p>
          <Signatures>
            <div>
              <img src="/JP.svg" alt="Signature" />
              <p>JP Hemingway, Associate Head of School</p>
            </div>
            <div>
              <img
                src="https://student-centric.s3.amazonaws.com/image+1.png"
                alt="Signature"
              />
              <p>Rob Dominguez, Director of Education Technology</p>
            </div>
          </Signatures>
        </div>
      </Cert>
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

  return {
    props: {
      session,
      details: {
        title: pdSession.pdSession.title,
        description: pdSession.pdSession.description,
        hours: pdSession.pdSession.hours,
        date: pdSession.pdSession.date,
      },
    }, // will be passed to the page component as props
  };
}
