import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Letter() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Error al reproducir música:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleMapClick = (e) => {
    // Evita por completo que el formulario recargue la página o cierre el sobre
    e.stopPropagation();
  };

  return (
    <motion.div 
      className="w-full flex flex-col items-center"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Conexión de tu música real */}
      <audio ref={audioRef} src="/audio/Mi Bendición.mp3" loop />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="w-full bg-white border border-boda-accent/10 rounded-2xl p-4 shadow-lg flex flex-col items-center text-center">
        
        {/* LA IMAGEN PURA DE TU TARJETA */}
        <div className="w-full rounded-xl overflow-hidden shadow-sm">
          <img 
            src="/images/Tarjeta de la boda.png" 
            alt="Invitación Jusmary y Carlos" 
            className="w-full h-auto object-contain select-none"
          />
        </div>

        {/* REPRODUCTOR DE MÚSICA INTERACTIVO */}
        <div className="w-full max-w-[260px] border-t border-boda-accent/20 pt-5 mt-6 flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-[0.25em] font-sans text-boda-text/60 mb-4 font-medium">
            Dale Play para escuchar nuestra canción
          </p>
          
          <button 
            type="button" 
            onClick={toggleMusic}
            className="w-14 h-14 bg-gradient-to-br from-[#1e3d59] to-boda-primary text-white rounded-full flex items-center justify-center shadow-[0_6px_15px_rgba(30,61,89,0.3)] border-2 border-[#e5ba73] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none relative group"
          >
            <div className="absolute inset-0.5 rounded-full border border-white/10 pointer-events-none" />
            {isPlaying ? (
              <svg className="w-5 h-5 text-[#f4f0ea]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0a.75.75 0 0 1 .75-.75H16.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[#f4f0ea] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <span className="text-[9px] text-boda-accent tracking-widest uppercase mt-2 h-3 block font-semibold">
            {isPlaying ? "Sonando ahora" : ""}
          </span>
        </div>

        {/* SECCIÓN DE LA RECEPCIÓN Y DETALLES */}
        <div className="w-full border-t border-boda-accent/10 pt-5 mt-4 mb-2 flex flex-col items-center">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-boda-accent font-bold mb-1">
            Ubicación de la Boda
          </span>
          <p className="font-serif italic text-base text-boda-text/90">
            Iglesia Católica - Nueva Holanda 
          </p>
          
          <a 
            href="https://www.google.com/maps/search/?api=1&query=11.546864, -84.553051" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleMapClick}
            className="inline-block mt-4 bg-[#faf8f5] border border-boda-primary/20 text-boda-primary text-[10px] uppercase tracking-[0.2em] px-6 py-2.5 rounded-full hover:bg-boda-primary hover:text-white transition-all font-semibold shadow-sm cursor-pointer"
          >
            📍 Ver Ubicación en Mapa
          </a>
        </div>

      </div>
    </motion.div>
  );
}