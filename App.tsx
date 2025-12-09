import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import SlideRenderer from './components/SlideRenderer';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [logoError, setLogoError] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = SLIDES[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 text-slate-100 overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Top Bar */}
      <div className="h-14 bg-slate-950 flex items-center justify-between px-6 border-b border-slate-800 z-50">
        <div className="text-sm font-bold text-slate-400 tracking-wider">
          K-DIGITAL TRAINING <span className="text-indigo-500">2026</span>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="text-xs text-slate-500">
            {currentSlideIndex + 1} / {SLIDES.length}
            </div>
            {/* Logo Area - White background for visibility */}
            <div className="h-10 px-2 bg-white rounded flex items-center justify-center shadow-sm min-w-[100px] overflow-hidden">
                {!logoError ? (
                    <img 
                        // Using a proxy to bypass hotlinking protection which was causing the broken image
                        src="https://wsrv.nl/?url=https://www.tjoeun.co.kr/images/common/logo.png&output=png" 
                        alt="THEJOEUN" 
                        className="h-full w-auto object-contain max-w-[140px]"
                        onError={() => setLogoError(true)}
                    />
                ) : (
                    // Clean Text Fallback
                    <div className="flex items-center justify-center select-none">
                        <span className="text-slate-900 font-black text-lg italic tracking-tighter" style={{fontFamily: 'sans-serif'}}>
                            THEJOEUN
                        </span>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Main Slide Area */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full max-w-7xl mx-auto shadow-2xl"
          >
            <SlideRenderer slide={currentSlide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Control Bar */}
      <div className="h-16 bg-slate-950 border-t border-slate-800 flex items-center px-6 gap-4 z-50">
        
        {/* Progress Bar */}
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
            <button 
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="p-2 rounded-full hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={nextSlide}
                disabled={currentSlideIndex === SLIDES.length - 1}
                className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
            >
                <ChevronRight size={24} className="text-white" />
            </button>
        </div>
      </div>
      
    </div>
  );
};

export default App;