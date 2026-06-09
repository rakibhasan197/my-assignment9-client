
import StartupMistakes from "@/components/StartupMistakes";
import Banner from "../components/Banner";
import FeaturedCard from "../components/FeaturedCard";
import Image from "next/image";
import StartupStats from "@/components/StartupStats";

export default function Home() {
  return (
   <div>
    <Banner></Banner>
    
    <FeaturedCard></FeaturedCard>
    <StartupMistakes></StartupMistakes>
    <StartupStats></StartupStats>
      
   </div>
  );
}
