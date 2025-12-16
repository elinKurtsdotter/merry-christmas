import { useState } from "react";
import styled from "styled-components";
import { MarginTop } from "../App.jsx";

const ClickHereToFindGem = styled.div`
  position: fixed;
  top: 7rem;
  right: 12rem;
  width: 0.5rem;
  height: 0.55rem;
  z-index: 105;
  cursor: pointer;
  color: white;
  border-radius: 100px;
  background-color: white;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(195, 195, 195, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(204, 204, 204, 0);
    }
  }
`;

const RhymeContainer = styled.div`
  position: fixed;
  top: 7rem;
  right: 12rem;
  width: 30rem;
  background-color: ${(props) =>
    props.$showGem ? "rgba(0, 0, 0, 0.6)" : "transparent"};

  border-radius: 10px;
  color: ${(props) => (props.$showGem ? "#84c8c7" : "transparent")};
  font-family: "Mountains of Christmas", serif;
  font-size: 1.8rem;
  z-index: 1000;
  padding: 1rem;
  visibility: ${(props) => (props.$showGem ? "visible" : "hidden")};
`;

const HiddenGem = () => {
  const [showGem, setShowGem] = useState(false);
  return (
    <>
      <ClickHereToFindGem onClick={() => setShowGem((prev) => !prev)} />
      <RhymeContainer $showGem={showGem} onClick={() => setShowGem(false)}>
        Can you find all the hidden delights?
        <MarginTop margin={0.5} />
        Some wake by day, some glow at night.
        <MarginTop margin={0.5} />
        Click and drag, explore and play,
        <MarginTop margin={0.5} />
        Let curiosity guide your way.
        <MarginTop margin={2.5} />
        A twinkling star may start a tune,
        <MarginTop margin={0.5} />
        A gift might spin if touched just soon.
        <MarginTop margin={0.5} />
        Scroll to see what wakes the tree,
        <MarginTop margin={0.5} />
        Or tap the box—what could it be?
        <MarginTop margin={2.5} />
        Not all surprises shout or glow,
        <MarginTop margin={0.5} />
        Some softly wait for you to know.
        <MarginTop margin={0.5} />
        So take your time, both near and far,
        <MarginTop margin={0.5} />
        And see how many wonders are.
      </RhymeContainer>
    </>
  );
};

export default HiddenGem;
