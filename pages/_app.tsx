import type { AppProps } from "next/app";
import "../styles/globals.css";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  height: 48px;
  width: 100vw;
  font-weight: 800;
  background-color: lightGrey;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header>Loja de Hardware</Header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
