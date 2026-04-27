import { useState, useRef, useCallback, useEffect } from "react";

const MediaGallery = ({ media, className = "" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef({});

  const pauseVideo = useCallback((index) => {
    const video = videoRefs.current[index];
    if (video) video.pause();
  }, []);

  const playVideo = useCallback((index) => {
    const video = videoRefs.current[index];
    if (video) video.play();
  }, []);

  const goTo = useCallback(
    (newIndex) => {
      if (media[activeIndex]?.type === "video") pauseVideo(activeIndex);
      setActiveIndex(newIndex);
      if (media[newIndex]?.type === "video") {
        setTimeout(() => playVideo(newIndex), 0);
      }
    },
    [activeIndex, media, pauseVideo, playVideo]
  );

  useEffect(() => {
    if (media[0]?.type === "video") videoRefs.current[0]?.play();
  }, []);

  return (
    <div className={`relative ${className}`}>
      {media.map((item, i) => (
        <div
          key={item.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          {item.type === "video" ? (
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={item.src}
              autoPlay={i === 0}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={item.src}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}

      {media.length > 1 && (
        <>
          {activeIndex > 0 && (
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {activeIndex < media.length - 1 && (
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {media.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === activeIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MediaGallery;
