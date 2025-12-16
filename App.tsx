import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Flashcard from './components/Flashcard.tsx';
import { vocabList } from './data.ts';
import { ChevronLeft, ChevronRight, Shuffle, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Fisher-Yates shuffle algorithm setup (optional future enhancement, current implementation simple index nav)
  // For this version, we stick to the list order but allow jumping.
  
  const currentCard = vocabList[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % vocabList.length);
    }, 200); // Small delay to start flip back animation
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + vocabList.length) % vocabList.length);
    }, 200);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * vocabList.length);
        setCurrentIndex(randomIndex);
    }, 200);
  };

  const progress = ((currentIndex + 1) / vocabList.length) * 100;

  return (
    <div className="min-h-screen bg-slate-100 text-gray-800 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <BookOpen size={20} />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-800">LingoFlash</h1>
            </div>
            <div className="text-sm font-medium text-slate-500">
                Class Review
            </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-slate-100 w-full">
            <div 
                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8 gap-8">
        
        {/* Stats */}
        <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Card</p>
            <p className="text-3xl font-bold text-slate-700">
                {currentIndex + 1} <span className="text-slate-300 text-xl">/ {vocabList.length}</span>
            </p>
        </div>

        {/* Card Component */}
        <div className="w-full flex justify-center perspective-1000">
            <Flashcard 
                card={currentCard} 
                isFlipped={isFlipped} 
                onFlip={() => setIsFlipped(!isFlipped)} 
            />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 md:gap-8 mt-4">
            <button
                onClick={handlePrev}
                className="p-4 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 text-slate-600 transition-all hover:scale-105 active:scale-95"
                aria-label="Previous card"
            >
                <ChevronLeft size={24} />
            </button>

            <button 
                onClick={handleShuffle}
                className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Shuffle Random Card"
            >
                <Shuffle size={20} />
            </button>

            <button
                onClick={handleNext}
                className="p-4 bg-blue-600 text-white rounded-full shadow-md shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                aria-label="Next card"
            >
                <ChevronRight size={24} />
            </button>
        </div>

        <div className="mt-8 text-center text-slate-400 text-xs">
            <p>Built with Gemini TTS • Content based on Class Notes</p>
        </div>
      </main>
    </div>
  );
};

export default App;