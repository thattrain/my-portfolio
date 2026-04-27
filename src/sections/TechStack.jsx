import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

const TechStack = () => {
  const detailsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

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
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStackImgs.map((techStackIcon, index) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <img src={techStackIcon.imgPath} alt={techStackIcon.name} />
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                  <div
                    ref={(el) => el && (detailsRef.current[index] = el)}
                    className="overflow-hidden"
                    style={{ height: 0, opacity: 0 }}
                  >
                    <p className="text-sm text-white-50/70 leading-relaxed pt-2 pb-4 text-center font-normal">
                      {techStackIcon.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
