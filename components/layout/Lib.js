import styled from "styled-components";

// Utility classes...sort of
export const PageWrapper = styled.div`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`;

export const DynamicWrapper = styled.div`
  display: grid;
  place-items: center center;
  margin-left: 10%;
  margin-right: 10%;
`;

// LANDING
export const Hero = styled.div`
  display: grid;
  grid-gap: 40px;
  min-height: 70vh;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(${(props) => props.min}, 1fr));
  place-items: center center;
  color: var(--secondary);
  padding-top: 4rem;
  margin-bottom: 10vh;
  text-align: left;
  /* align-content: space-between; */
  h2 {
    margin-top: 0;
  }
`;

export const AutoDiv = styled.div`
  display: grid;
  grid-gap: 40px;
  min-height: 70vh;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(${(props) => props.min}, 1fr));
  place-items: center center;
  color: var(--secondary);
  padding-top: 4rem;
  margin-bottom: 10vh;
  text-align: left;
  /* align-content: space-between; */

  div {
    display: flex;
    flex-direction: column;
    max-width: 170px;
    /* min-height: 500px; */
    h2 {
      align-self: end;
    }
  }
`;

export const Paired = styled.div`
  display: grid;
  grid-gap: 40px;
  min-height: 70vh;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(${(props) => props.min}, 1fr));
  place-items: center center;
  color: var(--secondary);
  padding-top: 4rem;
  margin-bottom: 10vh;
  text-align: left;
  /* align-content: space-between; */
  h2 {
    margin-top: 0;
  }
`;

export const HeroCTA = styled.a`
  padding: 10px 20px !important;
  border-radius: 13px;
  border: solid 1px var(--gold);
  color: white;
  text-decoration: none;
  font-size: 1.6em;
  transition: var(--norm);
  background: var(--gold);
  box-shadow: var(--norm-shadow);

  :hover {
    background: var(--gold-2);
    border: solid 1px var(--gold-2);
  }
`;

export const SecBtn = styled.a`
  padding: 10px 20px !important;
  border-radius: 13px;
  border: solid 1px var(--black);
  color: var(--black);
  text-decoration: none;
  font-size: 1.6em;
  transition: var(--norm);
  box-shadow: var(--norm-shadow);

  :hover {
    background: var(--black-3);
    border: solid 1px var(--black-3);
  }
`;

export const TripVert = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 40px;
  place-items: center center;

  h4 {
    margin-top: none;
  }
`;

// Navigation
export const NavBar = styled.header`
  display: grid;
  grid-template-areas: "logo nav";
  min-height: 8vh;
  padding-top: 4vh;
  padding-left: 2vw;
  padding-right: 2vw;
  color: var(--black);
  background: linear-gradient(
    180deg,
    #76889c -29.77%,
    rgba(255, 255, 255, 0) 100%
  );
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.4rem;

  a {
    color: var(--black);
    text-decoration: none;
    transition: var(--norm);
    padding: 8px;
  }
`;

export const NavItems = styled.nav`
  grid-area: nav;
  display: grid;
  grid-template-columns: repeat(5, auto);
  place-items: center center;
  text-transform: uppercase;
  transition: var(--norm);

  a {
    border-bottom: solid 2px transparent;
    :hover {
      border-bottom: solid 2px var(--gold);
    }
  }
`;

export const NavCTA = styled.a`
  padding: 10px 20px !important;
  border-radius: 13px;
  border: solid 1px var(--gold);
  text-decoration: none;
  transition: var(--norm);
  background: var(--gold);
  box-shadow: var(--norm-shadow);

  :hover {
    background: var(--gold-2);
    border: solid 1px var(--gold-2);
  }
`;

// SESSIONS AND BLOG
export const ContentHero = styled.div`
  display: grid;
  grid-gap: 40px;
  min-height: 75vh;
  grid-template-columns: 1fr 1fr;
  background-image: linear-gradient(
      270.32deg,
      #061425 23.72%,
      rgba(255, 255, 255, 0) 100.56%
    ),
    url("${(props) => props.bg}");
  place-items: center center;
  color: var(--secondary);
  padding: 4rem 4rem;
  margin-bottom: 10vh;
  margin-top: 5vh;
  text-align: left;

  h1 {
    color: white;
  }

  p {
    color: white;
    font-size: 1.4rem;
    margin-bottom: 40px;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const Gallery = styled.div`
  display: grid;
  grid-gap: 40px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  place-items: center center;
  padding-top: 4rem;
  margin-bottom: 20vh;
`;

export const SeshCard = styled.div`
  border-radius: 13px;
  background: url("${(props) => props.bg}");
  background-size: cover;
  box-shadow: var(--norm-shadow);
  width: 100%;
  min-height: 225px;
  transition: var(--norm);

  :hover {
    transform: translateY(-10px) rotateZ(-2.5deg) scale(1.03);
    box-shadow: var(--lg-shadow);
    cursor: pointer;
  }
`;
