import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader";
import MediaGallery from "../components/MediaGallery";

const interests = [
  {
    title: "Tennis",
    desc: "I love playing tennis — it keeps me active and sharpens my competitive spirit.",
    gradient: "from-green-900/40 to-emerald-800/20",
    media: [
      { type: "video", src: "/videos/tennis.mp4" },
      { type: "video", src: "/videos/tennis2.mp4" },
    ],
  },
  {
    emoji: "🎵",
    title: "Classical Music",
    desc: "Classical music helps me focus and find calm in the complexity of composition.",
    gradient: "from-purple-900/40 to-indigo-800/20",
    media: [
      { type: "image", src: "/images/classical-music/classical-gallery1.jpg" },
      { type: "image", src: "/images/classical-music/classical-gallery2.jpg" },
      { type: "image", src: "/images/classical-music/classical-gallery3.jpg" },
    ],
  },
];

const ShowcaseSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".interest-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
        },
      }
    );
  }, []);

  return (
    <div id="about" ref={sectionRef} className="section-padding">
      <div className="w-full md:px-10 px-5">
        <TitleHeader
          title="Beyond the Code"
          sub="🎯 A glimpse into what drives me outside of work"
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-16">
          {/* Tennis */}
          <div className="interest-card relative card-border rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <MediaGallery media={interests[0].media} className="w-full h-[52rem]" />
            <div className="absolute top-0 inset-x-0 px-8 py-7 bg-gradient-to-b from-black/70 to-transparent z-30 pointer-events-none">
              <h3 className="text-2xl font-semibold text-white">Tennis</h3>
              <p className="text-white/60 leading-relaxed mt-2 text-sm max-w-xs">
                I love playing tennis — it keeps me active and sharpens my competitive spirit.
              </p>
            </div>
          </div>

          {/* Classical Music */}
          <div className="interest-card relative card-border rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <MediaGallery media={interests[1].media} className="w-full h-[52rem]" />
            <div className="absolute top-0 inset-x-0 px-8 py-7 bg-gradient-to-b from-black/70 to-transparent z-30 pointer-events-none">
              <h3 className="text-2xl font-semibold text-white">Classical Music</h3>
              <p className="text-white/60 leading-relaxed mt-2 text-sm max-w-xs">
                Classical music helps me focus and find calm in the complexity of composition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;
