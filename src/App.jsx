import { useState, Suspense } from "react";
import Snowfall from "react-snowfall";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ScrollControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import "./App.css";
import { Cursor } from "./components/Cursor";
import ChristmasTree from "./components/ChristmasTree";
import AnimatedBox from "./components/AnimatedBox";
import { Experience } from "./components/Experience";
import { PoppingGifts } from "./components/PoppingGifts";
import HiddenGem from "./components/HiddenGem";
import Star from "./components/Star";

const StyledCursor = styled(Cursor)`
  z-index: 999999;
`;

const Container = styled.div`
  margin: 0 auto;
  background-color: #333;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarginTopStyle = styled.div`
  width: 100%;
  margin-top: ${(props) => `${props.$margin}rem`};
`;

export const MarginTop = ({ margin, children }) => (
  <MarginTopStyle $margin={margin}>{children}</MarginTopStyle>
);

const StyledCanvasTop = styled(Canvas)`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 25vh;
  z-index: 20;
  overflow: overlay;
  pointer-events: none;
`;

const FlexContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const StyledCanvas = styled(Canvas)`
  pointer-events: auto;
  z-index: 25;
  width: 50%;
  height: 100vh;
  margin-top: 5rem;
  left: 0;
  bottom: 0;
`;

const StyledCanvasTree = styled(StyledCanvas)`
  pointer-events: auto;
  z-index: 25;
  margin-top: -5rem;
  overflow: overlay;
`;

const InfoText = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 5rem;
  color: white;
  font-family: "Mountains of Christmas", serif;
  font-size: 1rem;
  z-index: 9999;
`;

function App() {
  const [audios] = useState(() => ({
    song1: new Audio("/audios/christmas_wonderland.mp3"),
    song2: new Audio("/audios/its_beginning_to_look_like_christmas.mp3"),
    song3: new Audio("/audios/let_it_snow.mp3"),
  }));

  const [currentSong, setCurrentSong] = useState(null);

  const playExclusive = (key) => {
    const nextAudio = audios[key];
    // Pause currently playing song (if different)
    if (currentSong && currentSong !== nextAudio) {
      currentSong.pause();
    }
    // Toggle same song
    if (currentSong === nextAudio && !nextAudio.paused) {
      nextAudio.pause();
      setCurrentSong(null);
    } else {
      nextAudio.play();
      setCurrentSong(nextAudio);
    }
  };
  
  return (
    <Container>
      <Snowfall />
      <StyledCursor />

      {/* ------------- Merry Christmas Text ------------- */}
      <StyledCanvasTop camera={{ position: [2, 2, 2], fov: 50 }}>
        <Suspense>
          <Environment preset="sunset" />
          <Experience />
          <OrbitControls enablePan={true} enableZoom={true} />
        </Suspense>
      </StyledCanvasTop>

      {/* ------------- Star ------------- */}
      <Star $currentSong={currentSong === audios.song1 && !audios.song1.paused} onClick={() => playExclusive("song1")} />

      {/* ------------- Hidden Gem ------------- */}
      <HiddenGem  />

      <FlexContainer>
        {/* ------------- Christmas gift ------------- */}
        <StyledCanvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <OrbitControls
              enablePan={true}
              enableZoom={false}
              enableRotate={true}
              makeDefault
              target={[0, 0, 0]}
            />
            <AnimatedBox onClick={() => playExclusive("song2")} />
          </Suspense>
          <EffectComposer>
            <Bloom
              mipmapBlur
              intensity={1.8}
              luminanceThreshold={0}
              luminanceSmoothing={0.2}
            />
          </EffectComposer>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={2.2} castShadow />
          <pointLight position={[-3, 2, -2]} intensity={0.5} />
        </StyledCanvas>

        {/* ------------- Christmas Tree ------------- */}
        <StyledCanvasTree camera={{ position: [9, 9, 9], fov: 50 }}>
          <Suspense fallback={null}>
            <Environment preset="sunset" />
            <ScrollControls pages={2} damping={0.5}>
              <ChristmasTree
                position={[0, -3, 2]}
                onClick={() => playExclusive("song3")}
              />
            </ScrollControls>
            <OrbitControls
              enablePan={true}
              enableZoom={false}
              enableRotate={true}
            />
            <PoppingGifts />
          </Suspense>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={2.2} castShadow />
          <pointLight position={[-3, 2, -2]} intensity={0.5} />
        </StyledCanvasTree>
      </FlexContainer>

      <InfoText>
        Can you find all hidden gems? Some are easier than others.
      </InfoText>
    </Container>
  );
}

export default App;
