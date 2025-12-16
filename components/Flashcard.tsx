import React, { useState } from 'react';
import { VocabCard } from '../data';
import { Volume2, Loader2 } from 'lucide-react';
import { playPronunciation, wakeUpAudioContext } from '../services/geminiService';

interface FlashcardProps {
  card: VocabCard;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ card, isFlipped, onFlip }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip when clicking audio
    if (isPlaying) return;

    // Force wake up AudioContext on iOS
    // This plays a silent buffer to ensure the context is running before the network request finishes
    await wakeUpAudioContext();

    setIsPlaying(true);
    try {
      await playPronunciation(card.word);
    } catch (err) {
        console.error("Failed to play audio", err);
    } finally {
      setTimeout(() => setIsPlaying(false), 1000);
    }
  };

  return (
    <div 
      className="relative w-full max-w-md h-96 perspective-1000 cursor-pointer group select-none"
      onClick={onFlip}
    >
      <div 
        className={`relative w-full h-full transition-all duration-500 transform [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center justify-center backface-hidden [backface-visibility:hidden]">
           <div className="absolute top-4 right-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
             Front
           </div>
           
           <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{card.word}</h2>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium italic">
                    {card.type}
                </span>
              </div>

              <button
                onClick={handleAudioClick}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isPlaying 
                    ? 'bg-blue-100 text-blue-600 scale-110' 
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:scale-110'
                } active:scale-95 touch-manipulation`}
                aria-label="Play pronunciation"
              >
                {isPlaying ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  <Volume2 className="w-8 h-8" />
                )}
              </button>
              
              <p className="text-gray-400 text-sm mt-4">Tap card to flip</p>
           </div>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full bg-slate-50 rounded-2xl shadow-xl border border-slate-200 p-8 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
           <div className="absolute top-4 right-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
             Back
           </div>
           
           <div className="space-y-6 w-full">
             <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">Phonetics</h3>
                <p className="text-xl text-gray-800 font-mono bg-white inline-block px-4 py-1 rounded shadow-sm border border-gray-100">
                    {card.phonetics}
                </p>
             </div>

             <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">Definition</h3>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    {card.definition}
                </p>
             </div>

             <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h3 className="text-xs font-bold text-yellow-600 uppercase tracking-wide mb-2 text-left">Example</h3>
                <p className="text-base text-gray-700 italic text-left">
                    "{card.example}"
                </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;