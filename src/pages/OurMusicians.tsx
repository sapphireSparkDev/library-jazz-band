import { useState, useEffect } from "react";
import MusiciansList from "@/components/MusiciansList";
import { musiciansAPI } from "@/lib/api";
import { Musician } from "@/lib/types/events";

const OurMusicians = () => {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMusicians = async () => {
      try {
        setLoading(true);
        const musiciansData = await musiciansAPI.getAll();
        setMusicians(musiciansData);
      } catch (error) {
        console.error("Failed to load musicians:", error);
        setMusicians([]);
      } finally {
        setLoading(false);
      }
    };

    loadMusicians();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171717] flex items-center justify-center">
        <div className="text-amber-500 text-xl">Loading musicians...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171717]">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
          <h1 className="text-amber-500 font-bebasNeue text-4xl md:text-5xl lg:text-6xl text-center mb-8">
            Our Musicians
          </h1>
          <p className="text-white text-center text-lg mb-12 max-w-3xl mx-auto">
            Meet the talented musicians who bring the Library Jazz Band to life.
            Our diverse ensemble includes seasoned professionals and passionate
            amateurs united by their love for big band music.
          </p>
          <MusiciansList musicians={musicians} />
        </div>
      </div>
    </div>
  );
};

export default OurMusicians;
