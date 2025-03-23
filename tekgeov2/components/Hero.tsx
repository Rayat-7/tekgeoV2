"use client"
import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      
      const rect = gridRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Parallax effect for grid background
      gridRef.current.style.backgroundPosition = `${x * 20}px ${y * 20}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-24 pb-24 bg-[#020817] overflow-hidden clip-hero  border-b-4 border-b-blue-500" ref={gridRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-60 z-0"></div>
      <div className="absolute inset-0 hero-gradient z-0"></div>
      
      {/* Animated Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-tekgeo-blue/10 filter blur-[120px] animate-pulse-soft"></div>
      
      {/* SVG Elements on the Left Side */}
      <div className="absolute left-0 top-0 h-full w-1/4 z-0 opacity-70">
        <svg className="w-full h-full" viewBox="0 0 300 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g className="animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
            <rect x="20" y="100" width="80" height="80" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="120" y="100" width="40" height="40" rx="0" stroke="#0062FF" strokeOpacity="0.5" strokeWidth="1" />
            <rect x="120" y="160" width="80" height="80" rx="0" stroke="#0062FF" strokeOpacity="0.2" strokeWidth="1" />
            <rect x="20" y="200" width="60" height="60" rx="0" stroke="#0062FF" strokeOpacity="0.4" strokeWidth="1" />
            <rect x="180" y="300" width="100" height="40" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="80" y="270" width="80" height="80" rx="0" stroke="#0062FF" strokeOpacity="0.5" strokeWidth="1" fill="#0062FF" fillOpacity="0.1" />
            <rect x="20" y="360" width="120" height="40" rx="0" stroke="#0062FF" strokeOpacity="0.2" strokeWidth="1" />
            <rect x="160" y="400" width="60" height="120" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" fill="#0062FF" fillOpacity="0.05" />
            <rect x="20" y="420" width="120" height="40" rx="0" stroke="#0062FF" strokeOpacity="0.4" strokeWidth="1" />
            <rect x="40" y="480" width="80" height="80" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="140" y="540" width="100" height="40" rx="0" stroke="#0062FF" strokeOpacity="0.5" strokeWidth="1" fill="#0062FF" fillOpacity="0.1" />
            <rect x="40" y="580" width="80" height="80" rx="0" stroke="#0062FF" strokeOpacity="0.2" strokeWidth="1" />
          </g>
        </svg>
      </div>
      
      {/* SVG Elements on the Right Side */}
      <div className="absolute right-0 top-0 h-full w-1/4 z-0 opacity-70">
        <svg className="w-full h-full" viewBox="0 0 300 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g className="animate-fade-in opacity-0" style={{ animationDelay: '0.5s' }}>
            <rect x="100" y="80" width="120" height="40" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="60" y="140" width="80" height="80" rx="0" stroke="#0062FF" strokeOpacity="0.4" strokeWidth="1" fill="#0062FF" fillOpacity="0.08" />
            <rect x="160" y="140" width="40" height="120" rx="0" stroke="#0062FF" strokeOpacity="0.5" strokeWidth="1" />
            <rect x="30" y="240" width="60" height="60" rx="0" stroke="#0062FF" strokeOpacity="0.2" strokeWidth="1" />
            <rect x="110" y="260" width="80" height="80" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="200" y="260" width="60" height="140" rx="0" stroke="#0062FF" strokeOpacity="0.4" strokeWidth="1" fill="#0062FF" fillOpacity="0.1" />
            <rect x="30" y="320" width="60" height="120" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="110" y="360" width="70" height="70" rx="0" stroke="#0062FF" strokeOpacity="0.5" strokeWidth="1" fill="#0062FF" fillOpacity="0.05" />
            <rect x="30" y="460" width="150" height="40" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" />
            <rect x="200" y="420" width="60" height="120" rx="0" stroke="#0062FF" strokeOpacity="0.4" strokeWidth="1" />
            <rect x="60" y="520" width="80" height="80" rx="0" stroke="#0062FF" strokeOpacity="0.5" strokeWidth="1" fill="#0062FF" fillOpacity="0.1" />
            <rect x="160" y="520" width="100" height="40" rx="0" stroke="#0062FF" strokeOpacity="0.2" strokeWidth="1" />
            <rect x="160" y="580" width="40" height="100" rx="0" stroke="#0062FF" strokeOpacity="0.3" strokeWidth="1" />
          </g>
        </svg>
      </div>
      
      {/* Content Container - Now Centered */}
      <div className="container mx-auto px-4 relative z-10 pt-16 lg:pt-18 h-full flex items-center justify-center">
        {/* Hero Text Content - Centered */}
        <div className="text-center space-y-6 lg:space-y-7 max-w-2xl">
          <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block px-4 py-1 rounded-full glass-card text-sm md:text-base text-blue-400 ">
              Next Generation Employee Tracking
            </span>
          </div>
          
          <h1 className="text-4xl font-custom md:text-5xl lg:text-7xl font-semibold text-white leading-tight animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            The next era<br /> of <span className="text-gradient-blue">Attendance</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 animate-fade-in opacity-0 " style={{ animationDelay: '0.6s' }}>
             {/* TekGeo is the most advanced employee monitoring system yet, built for the remote work era */}
            TekGeo's most advanced remote employee monitoring system.
          </p> 
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
            <a href="#features" className="px-8 py-3 bg-blue-700 text-white font-medium rounded-full hover:bg-tekgeo-blue-light transition-all duration-300 text-center">
              Learn more
            </a>
            
            <a href="#demo" className="px-8 py-3 glass-card text-white rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group">
              Request Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Additional Floating Elements to enhance depth */}
      <div className="absolute bottom-20 left-1/4 w-16 h-16 glass-card animate-float" style={{ animationDuration: '8s' }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 bg-tekgeo-blue/20 border border-tekgeo-blue/40"></div>
        </div>
      </div>
      
      <div className="absolute top-40 right-1/3 w-12 h-12 glass-card animate-float" style={{ animationDuration: '6s', animationDelay: '1s' }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-6 h-6 bg-tekgeo-blue/20 border border-tekgeo-blue/40"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;