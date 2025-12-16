import {
  Center,
  Float,
  Text3D,
  useMatcapTexture,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function debounce(fn, ms) {
    let timer;
    return() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    }
}

const MerryChristmasText = (props) => {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  const ref = useRef();
  const scroll = useScroll();
  const tl = useRef();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 300);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(ref.current.position, { duration: 1, x: -2, y: 4, z: -1 }, 0);
    tl.current.to(
      ref.current.scale,
      { duration: 1, x: 0.5, y: 0.5, z: 0.5 },
      0
    );
  }, []);

  return (
    <group {...props}>
      <Center>
        <Float>
          <Text3D
            ref={ref}
            font={"./fonts/roboto.json"}
            // font={"./fonts/mountains_of_chrismas_bold.json"}
            size={(dimensions.width * 0.3) / 2000}
            height={0.1}
        

            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            >
            God Jul & Gott Nytt År!
            {/* <meshMatcapMaterial matcap={matcapTexture} /> */}
            <meshNormalMaterial />
          </Text3D>
        </Float>
      </Center>
          
    </group>
  );
};

export default MerryChristmasText;