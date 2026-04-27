import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);
  const detailsRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];

      gsap.set(numberElement, { innerText: "0" });

      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });
    }, counterRef);
  }, []);

  const handleMouseEnter = (index) => {
    const detail = detailsRef.current[index];
    if (!detail) return;
    gsap.killTweensOf(detail);
    gsap.to(detail, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (index) => {
    const detail = detailsRef.current[index];
    if (!detail) return;
    gsap.killTweensOf(detail);
    gsap.to(detail, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
  };

  return (
    <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
      <div className="mx-auto grid-4-cols">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center cursor-pointer transition-colors duration-300 hover:bg-zinc-800"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="counter-number text-white-50 text-5xl font-bold mb-2">
              0 {item.suffix}
            </div>
            <div className="text-white-50 text-lg">{item.label}</div>
            <div
              ref={(el) => el && (detailsRef.current[index] = el)}
              className="text-white-50/70 text-sm leading-relaxed overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              <p className="pt-3">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
