import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Letter from './Letter';
import RsvpForm from './RsvpForm';

export default function Envelope() {
  const [isOpened, setIsOpened] = useState(false);
  const paperSoundRef = useRef(null);

  const handleOpenEnvelope = () => {
    if (paperSoundRef.current) {
      paperSoundRef.current.play().catch(err => console.log("Audio error:", err));
    }
    setIsOpened(true);
  };

  // Transición tridimensional fluida para la solapa superior
  const flapVariants = {
    closed: { rotateX: 0, zIndex: 3 },
    opened: { 
      rotateX: 170, // Mantiene la perspectiva de profundidad 3D
      zIndex: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen pt-16 pb-16 px-4 select-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#faf8f5] via-[#f3ede4] to-[#e6dcce]">
      
      {/* Audio del crujido del papel real */}
      <audio ref={paperSoundRef} src="/audio/Sonido de papel.mp3" preload="auto" />
      
      {/* CONTENEDOR MAJESTUOSO DEL SOBRE */}
      <div className="relative w-full max-w-sm h-[270px] bg-transparent perspective-2000 mb-8 drop-shadow-[0_25px_35px_rgba(27,58,89,0.25)]">
        
        {/* PARTE TRASERA DEL SOBRE AZUL */}
        <div className="absolute inset-0 bg-[#12283d] rounded-b-2xl z-10 overflow-hidden border border-white/5 shadow-inner">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#deaf63_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* EL LIRIO MAJESTUOSO */}
        <div 
          className="absolute -top-24 left-8 w-28 h-auto z-5 pointer-events-none drop-shadow-[0_15px_12px_rgba(0,0,0,0.25)] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ 
            opacity: isOpened ? 1 : 0,
            transform: isOpened ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.9)'
          }}
        >
          <img 
            src="/images/Lirio que sale con la carta.png" 
            alt="Lirios reales" 
            className="w-full h-auto"
          />
        </div>

        {/* SOLAPA SUPERIOR (3D) */}
        <motion.div 
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#2a557d] to-[#1e3d59] rounded-t-2xl origin-top z-30 border-t border-white/20"
          variants={flapVariants}
          initial="closed"
          animate={isOpened ? "opened" : "closed"}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-[#152a3d] rounded-t-2xl backface-hidden [transform:rotateX(180deg)] border-b border-[#deaf63]/30 shadow-2xl" />
        </motion.div>

        {/* CUERPO FRONTAL DEL SOBRE (Línea 71 Corregida y cerrada nítido) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#162d42] via-boda-primary to-[#24496d] rounded-b-2xl z-25 pointer-events-none border-b border-x border-white/5">
          <div className="absolute inset-0 bg-[linear-gradient(35deg,transparent_49%,rgba(0,0,0,0.2)_50%,transparent_51%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(-35deg,transparent_49%,rgba(0,0,0,0.2)_50%,transparent_51%)]" />
        </div>

        {/* SELLO DE CERA (Con aura dorada) */}
        <AnimatePresence>
          {!isOpened && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <div className="absolute inset-0 w-16 h-16 bg-[#e5ba73] rounded-full blur-xl opacity-60 animate-ping" />
              
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-[#f0d099] via-boda-accent to-[#b58943] rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(222,175,99,0.6)] border-2 border-[#fff3db] cursor-pointer relative"
                onClick={handleOpenEnvelope}
                whileHover={{ scale: 1.08, rotate: 5 }}
                whileTap={{ scale: 0.92 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
              >
                <div className="absolute inset-1 rounded-full border border-white/30 pointer-events-none" />
                <span className="text-boda-primary font-serif text-sm font-bold tracking-tighter drop-shadow-sm select-none">J&C</span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* INDICADOR TEXTUAL */}
        {!isOpened && (
          <div className="absolute -bottom-14 inset-x-0 text-center animate-pulse">
            <p className="font-sans text-[9px] tracking-[0.3em] text-[#1e3d59]/70 uppercase font-medium">Toca el sello para abrir el sobre</p>
            <span className="text-boda-accent text-xs block mt-1">▼</span>
          </div>
        )}

      </div>

      {/* LA REVELACIÓN MAJESTUOSA */}
      <AnimatePresence>
        {isOpened && (
          <motion.div 
            className="w-full max-w-sm flex flex-col items-center gap-8 z-40 mt-2"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.4, 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <Letter />
            <RsvpForm />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}