import styled from "styled-components";

const StarButton = styled.button`
  position: fixed;
  top: 10rem;
  left: 10rem;
  z-index: 9999;

  width: 10rem;
  aspect-ratio: 1.07;
  border: none;
  clip-path: polygon(50% 0, 80% 100%, 0 39%, 100% 39%, 20% 100%);
  cursor: pointer;
  background-color: ;
  /* Main animation while playing */
  animation: ${(props) =>
    props.$isWonderChristmasPlaying
      ? "colorPulse 4.4s infinite, largeOrbit 10s linear infinite"
      : "orbit 30s linear infinite"};

  /* --- Color cycling (your original colors) --- */
  @keyframes colorPulse {
    0% {
      background-color: blue;
    }
    20% {
      background-color: pink;
    }
    60% {
      background-color: #ff00e6;
    }
    100% {
      background-color: blue;
    }
  }

  /* ---- Move in circle (music playing) ---- */
  @keyframes orbit {
    from {
      transform: rotate(0deg) scale(1);
    }
    to {
      transform: rotate(360deg) scale(1.2);
    }
  }

  @keyframes largeOrbit {
    from {
      transform: rotate(0deg) translateX(150px) scale(1);
    }
    to {
      transform: rotate(360deg) translateX(150px) scale(1.2);
    }
  }

  /* ---- Glow layer behind the star ---- */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    clip-path: inherit;
    background: gold;
    filter: blur(28px);
    opacity: ${(props) => (props.$isWonderChristmasPlaying ? 0 : 1)};
    transition: opacity 0.35s ease-out;
    z-index: -1;
  }

  /* Hover effect (optional) */
  &:hover {
    transform: scale(1.1);
  }
`;

const Star = ({ $currentSong, onClick }) => {
  
  return (
    <StarButton $isWonderChristmasPlaying={$currentSong} onClick={onClick} />
  );
};

export default Star;
