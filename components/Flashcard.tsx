import React, { useState } from 'react';
import { VocabCard, WordForm } from '../types';
import { Volume2, Sparkles, RefreshCcw } from 'lucide-react';
import { speakText } from '../services/geminiService';

interface FlashcardProps {
  card: VocabCard;
  isFlipped: boolean;
  onFlip: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ card, isFlipped, onFlip }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async (e: React.MouseEvent, text: string) => {
    e.stopPropagation(); // Prevent card flip
    if (isPlaying) return;
    
    setIsPlaying(true);
    await speakText(text);
    // Simple timeout to reset icon state, as TTS duration isn't strictly provided beforehand
    setTimeout(() => setIsPlaying(false), 2000); 
  };

  const getFormColor = (form: string) => {
    switch (form) {
      case WordForm.NOUN: return 'bg-blue-100 text-blue-800';
      case WordForm.ADJECTIVE: return 'bg-purple-100 text-purple-800';
      case WordForm.PHRASE: return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="relative w-full max-w-md h-96 cursor-pointer perspective-1000 group select-none"
      onClick={onFlip}
    >
      <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* --- FRONT --- */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl bg-cream shadow-xl border border-gray-200 flex flex-col items-center justify-center p-8 text-center">
            
            {/* Top Right Label */}
            <div className="absolute top-6 right-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getFormColor(card.wordForm)}`}>
                    {card.wordForm}
                </span>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <h2 className="text-4xl font-serif font-bold text-ink mb-2">
                    {card.word}
                </h2>
                <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">Tap to reveal</p>
            </div>

            {/* Action Bar */}
            <div className="absolute bottom-6 w-full flex justify-center">
                <button 
                    onClick={(e) => handleSpeak(e, card.word)}
                    className={`p-3 rounded-full bg-white shadow-md border border-gray-100 hover:bg-gray-50 transition-colors ${isPlaying ? 'text-accent' : 'text-gray-600'}`}
                    title="Pronounce Word"
                >
                    <Volume2 size={24} />
                </button>
            </div>
        </div>

        {/* --- BACK --- */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white shadow-xl border border-gray-200 flex flex-col p-8 overflow-y-auto">
            
            <div className="border-b border-gray-100 pb-4 mb-4 flex justify-between items-start">
               <div>
                   <h3 className="text-xl font-serif font-bold text-ink">{card.word}</h3>
                   {card.phonetics && (
                       <p className="text-gray-500 font-mono text-sm mt-1">{card.phonetics}</p>
                   )}
               </div>
               <span className={`px-2 py-1 rounded text-xs font-bold ${getFormColor(card.wordForm)}`}>
                   {card.wordForm}
               </span>
            </div>

            <div className="flex-1 space-y-6">
                <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Meaning</h4>
                    <p className="text-lg text-gray-800 leading-relaxed font-medium">
                        {card.definition}
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Sparkles size={12} className="text-accent"/> Example
                    </h4>
                    <p className="text-gray-700 italic font-serif leading-relaxed">
                        "{card.example}"
                    </p>
                    <button 
                        onClick={(e) => handleSpeak(e, card.example)}
                        className="absolute bottom-2 right-2 p-2 text-gray-400 hover:text-accent transition-colors"
                        title="Read Example"
                    >
                        <Volume2 size={16} />
                    </button>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-300">Card {card.id}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
