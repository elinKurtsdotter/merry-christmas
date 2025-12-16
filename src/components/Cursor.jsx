import { useEffect, useRef } from "react";

const CURSOR_SPEED = 0.08;

let mouseX = 0;
let mouseY = 0;

export const Cursor = () => {
  const cursor = useRef(null);
  const cursorOutline = useRef(null);

  const outlineX = useRef(0);
  const outlineY = useRef(0);

  const animate = () => {
    const distX = mouseX - outlineX.current;
    const distY = mouseY - outlineY.current;

    outlineX.current += distX * CURSOR_SPEED;
    outlineY.current += distY * CURSOR_SPEED;

    if (cursor.current) {
      cursor.current.style.left = `${mouseX}px`;
      cursor.current.style.top = `${mouseY}px`;
    }

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${outlineX.current}px`;
      cursorOutline.current.style.top = `${outlineY.current}px`;
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot cursor-dot--outline" ref={cursorOutline}></div>
      <div className="cursor-dot" ref={cursor}></div>
    </>
  );
};
