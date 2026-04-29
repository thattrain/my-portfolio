import Footer from "../sections/Footer";
import TechStack from "../sections/TechStack";
import Experience from "../sections/Experience";
import Hero from "../sections/Hero";
import ShowcaseSection from "../sections/ShowcaseSection";
import FeatureCards from "../sections/FeatureCards";
import ChatWidget from "../components/ChatWidget";
import { getSystemPrompt, getChatName } from "../constants/chatContext";

const HomePage = () => (
  <>
    <Hero />
    <ShowcaseSection />
    <FeatureCards />
    <Experience />
    <TechStack />
    <Footer />
    <ChatWidget
      systemPrompt={getSystemPrompt()}
      storageKey="portfolio-chat-messages"
      welcomeMessage={`Hi! I'm an AI assistant. Ask me anything about ${getChatName()}'s experience, skills, or projects.`}
    />
  </>
);

export default HomePage;
