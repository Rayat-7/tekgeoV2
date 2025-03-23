import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import path from "path";

export default function TekGeoLogo() {
  const logoRef = useRef<SVGPathElement | null>(null);
  const shineRef = useRef<SVGPathElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 10 });

    // Outline drawing animation
    tl.fromTo(
      logoRef.current,
      { strokeDasharray: 600, strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.out" }
    )

      // Fill effect after outline
      .to(logoRef.current, { fill: "#2563eb", duration: 0.8 }, "-=1.2")

      // Shiny border effect
      .fromTo(
        shineRef.current,
        { strokeDasharray: 300, strokeDashoffset: 300, opacity: 1 },
        { strokeDashoffset: 0, duration: 1, ease: "power2.out" },
        "-=1"
      )
      .to(shineRef.current, { opacity: 0, duration: 0.5 }) // Glow fades out

      // Fade in the text smoothly
      .fromTo(
        textRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
        "-=1"
      );
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <svg
        width="50"
        height="50"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Combined T and G Shape */}
        <path
          ref={logoRef}
          d="M20,10 H80 V25 H55 V80 H40 V25 H20 Z M40,60 H70 C75,60 78,55 78,50 C78,45 75,40 70,40 H55"
          stroke="#2563eb"
          strokeWidth="2.7"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Shiny border effect */}
        <path
          ref={shineRef}
          d="M20,10 H80 V25 H55 V80 H40 V25 H20 Z M40,60 H70 C75,60 78,55 78,50 C78,45 75,40 70,40 H55"
          stroke="white"
          strokeWidth="0.5"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0"
        />
      </svg>
      <span ref={textRef} className="text-xl font-semibold font-custom text-white tracking-wide">
        TEKGEO
      </span>
    </div>
  );
}
