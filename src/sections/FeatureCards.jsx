import { abilities } from "../constants";
import TitleHeader from "../components/TitleHeader";

const FeatureCards = () => (
  <div className="w-full padding-x-lg mt-32">
    <div className="md:px-10 px-5 mb-16">
      <TitleHeader
        title="My Qualities"
        sub="💡 What I value in my work"
      />
    </div>
    <div className="mx-auto grid-3-cols">
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="card-border rounded-xl p-8 flex flex-col gap-4"
        >
          <div className="size-14 flex items-center justify-center rounded-full">
            <img src={imgPath} alt={title} />
          </div>
          <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-white-50 text-lg">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;