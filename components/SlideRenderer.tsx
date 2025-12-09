import React from 'react';
import { motion } from 'framer-motion';
import { SlideData, SlideType } from '../types';
import { Terminal, Database, Smartphone, Users, CheckCircle, ArrowRight, Clock, Star, Award } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface SlideRendererProps {
  slide: SlideData;
}

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  
  // -- COVER SLIDE --
  if (slide.type === SlideType.COVER) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8 p-12 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900 z-0" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        
        <motion.div 
          className="z-10 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6 border border-indigo-500/30">
                K-Digital Training
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 mb-6 whitespace-pre-line leading-tight">
            {slide.title}
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-300 font-light mb-12">
            {slide.subTitle}
            </h2>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 md:p-8 rounded-2xl w-auto max-w-5xl mx-auto shadow-2xl">
                <p className="text-lg md:text-xl font-medium text-white italic md:whitespace-nowrap">
                    "{slide.content.highlight}"
                </p>
            </div>
        </motion.div>

        <motion.div 
            className="absolute bottom-10 z-10 text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            {slide.content.footer}
        </motion.div>
      </div>
    );
  }

  // -- GOALS SLIDE --
  if (slide.type === SlideType.GOALS) {
    return (
      <div className="h-full flex flex-col p-8 md:p-16">
        <SlideHeader title={slide.title} subTitle={slide.subTitle} />
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 overflow-y-auto custom-scrollbar pr-2">
            {slide.content.map((item: any, idx: number) => (
                <motion.div 
                    key={idx}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: idx * 0.15 + 0.3 }}
                    className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:bg-slate-800 hover:border-indigo-500/50 transition-all group flex flex-col justify-between"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:text-indigo-300 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <span className="text-5xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors">0{idx + 1}</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{item.keyword}</h3>
                        <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    );
  }

  // -- ROADMAP SLIDE --
  if (slide.type === SlideType.ROADMAP) {
    return (
      <div className="h-full flex flex-col p-8 md:p-16">
        <SlideHeader title={slide.title} subTitle={slide.subTitle} />
        
        <div className="flex-1 overflow-y-auto mt-8 pr-4 custom-scrollbar">
            <div className="relative py-4">
                {/* Connector Line */}
                <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-1 bg-slate-700 md:-ml-0.5" />
                
                <div className="space-y-12">
                    {slide.content.map((step: any, idx: number) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className={`relative flex items-center md:justify-between ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Empty side for layout balance */}
                            <div className="hidden md:block w-5/12" />
                            
                            {/* Center Dot */}
                            <div className="absolute left-0 md:left-1/2 w-14 h-14 -ml-[25px] md:-ml-[28px] bg-slate-900 border-4 border-indigo-500 rounded-full flex items-center justify-center z-10">
                                <span className="text-white font-bold text-lg">{idx + 1}</span>
                            </div>

                            {/* Content Card */}
                            <div className="w-full md:w-5/12 ml-16 md:ml-0 bg-slate-800 p-6 rounded-xl border-l-4 border-indigo-500 shadow-lg">
                                <span className="text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-1 block">{step.step}</span>
                                <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                                <p className="text-slate-400 text-sm">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  }

  // -- CONTENT PHASE SLIDE (TEXT & LISTS) --
  if (slide.type === SlideType.CONTENT_PHASE) {
    return (
      <div className="h-full flex flex-col p-8 md:p-16">
        <div className="flex justify-between items-start mb-8">
            <SlideHeader title={slide.title} subTitle={slide.subTitle} />
            <div className="hidden md:flex flex-col items-end">
                {slide.hours && (
                  <div className="flex items-center space-x-2 text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full">
                      <Clock size={20} />
                      <span className="font-bold text-xl">{slide.hours} Hours</span>
                  </div>
                )}
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {/* Left Column: Content */}
            <div className="md:w-2/3 space-y-6">
                {slide.content.sections.map((section: any, idx: number) => (
                    <motion.div 
                        key={idx}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.2 }}
                        className="bg-slate-800/40 p-6 rounded-xl border border-slate-700"
                    >
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <div className="w-2 h-8 bg-indigo-500 mr-3 rounded-full" />
                            {section.head}
                        </h3>
                        <ul className="space-y-3">
                            {section.items.map((item: string, i: number) => (
                                <li key={i} className="flex items-start text-slate-300">
                                    <CheckCircle size={18} className="text-indigo-400 mr-3 mt-1 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-indigo-600 p-4 rounded-lg text-white font-medium flex items-center justify-center shadow-lg shadow-indigo-500/20"
                >
                    <Star className="mr-2 fill-current" />
                    {slide.content.point}
                </motion.div>
            </div>

            {/* Right Column: Visuals/Tags */}
            <div className="md:w-1/3 flex flex-col gap-4">
                 <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h4 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">
                      {slide.content.tagsTitle || "Core Tech Stack"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {slide.tags?.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-700 text-slate-200 rounded-md text-sm font-medium border border-slate-600">
                                {tag}
                            </span>
                        ))}
                    </div>
                    {/* Placeholder for simple chart visualization if hours exist */}
                    {slide.hours && (
                        <div className="mt-8 h-40">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[{name: 'Hours', hours: slide.hours}]}>
                                    <XAxis dataKey="name" hide />
                                    <YAxis hide />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1e293b', border: 'none'}} />
                                    <Bar dataKey="hours" fill="#6366f1" radius={[10, 10, 0, 0]} background={{ fill: '#334155' }} />
                                </BarChart>
                            </ResponsiveContainer>
                            <p className="text-center text-xs text-slate-500 mt-2">Training Duration Intensity</p>
                        </div>
                    )}
                 </div>
            </div>
        </div>
      </div>
    );
  }

  // -- PROJECT SLIDE --
  if (slide.type === SlideType.PROJECT) {
    return (
      <div className="h-full flex flex-col p-8 md:p-16">
        <SlideHeader title={slide.title} subTitle={slide.subTitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 overflow-y-auto custom-scrollbar pr-2">
            {slide.content.examples.map((ex: any, idx: number) => (
                <motion.div 
                    key={idx}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: idx * 0.15 }}
                    className="bg-slate-800 border-t-4 border-indigo-500 p-6 rounded-xl shadow-xl flex flex-col"
                >
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2">{ex.title}</h3>
                        <p className="text-slate-400 text-sm h-10">{ex.desc}</p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-700 flex justify-end">
                        <Users size={16} className="text-slate-500" />
                    </div>
                </motion.div>
            ))}
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 flex items-center justify-between"
        >
            <div>
                <h4 className="text-indigo-400 font-bold mb-1 uppercase text-sm tracking-wider">Expected Outcome</h4>
                <p className="text-2xl font-light text-white">{slide.content.effect}</p>
            </div>
            <Award size={48} className="text-yellow-500 opacity-80" />
        </motion.div>
      </div>
    );
  }

  // -- CLOSING SLIDE --
  if (slide.type === SlideType.CLOSING) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-12 relative">
         <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center opacity-10 blur-sm pointer-events-none" />
         
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="z-10 max-w-4xl w-full"
         >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-12 leading-tight">
                {slide.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {slide.content.guides.map((guide: any, idx: number) => (
                    <div key={idx} className="bg-slate-900/80 backdrop-blur border border-slate-700 p-6 rounded-xl">
                        <h3 className="text-indigo-400 font-bold text-lg mb-2">{guide.label}</h3>
                        <p className="text-slate-300 text-sm">{guide.text}</p>
                    </div>
                ))}
            </div>

            <div className="p-8 border-t border-slate-700">
                <p className="text-2xl text-white font-medium mb-8">{slide.content.message}</p>
                <div className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-xl shadow-lg transition-colors cursor-pointer">
                    Q & A
                </div>
            </div>
         </motion.div>
      </div>
    );
  }

  return null;
};

// Sub-component for Headers
const SlideHeader: React.FC<{title: string; subTitle?: string}> = ({ title, subTitle }) => (
    <div className="mb-6 border-b border-slate-700 pb-4">
        <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2"
        >
            {title}
        </motion.h2>
        {subTitle && (
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-indigo-400 text-lg md:text-xl font-medium"
            >
                {subTitle}
            </motion.p>
        )}
    </div>
);

export default SlideRenderer;