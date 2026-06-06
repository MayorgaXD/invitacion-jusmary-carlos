import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import RsvpForm from './components/RsvpForm';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Fondo general de la página con un degradado sutil premium
    <div className="min-h-screen bg-gradient-to-b from-[#f4f0ea] to-[#fcfaf7] flex items-center justify-center p-4 sm:p-6 font-serif">
      
      {/* Contenedor estilo tarjeta de celular física */}
      <div className="w-full max-w-md bg-[#faf8f5] rounded-2xl shadow-2xl border border-[#eaddca]/60 overflow-hidden min-h-[700px] flex flex-col justify-start relative">
        
        {/* Adorno de fondo: Hojas o líneas finas (opcional usando CSS) */}
        <div className="absolute inset-0 border-4 border-[#deaf63]/10 rounded-2xl pointer-events-none m-3" />

        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Centramos el sobre perfectamente en la tarjeta antes de abrirse
            <div className="flex-1 flex items-center justify-center p-6">
              <Envelope key="envelope" isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          ) : (
            // Contenido interior elegante con scroll suave
            <motion.div
              key="content"
              className="w-full flex flex-col items-center gap-6 p-6 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Pieza 1: Datos de Jusmary y Carlos */}
              <Letter />

              {/* Pieza 2: El Formulario */}
              <RsvpForm />
              
              <p className="text-[10px] font-sans tracking-widest uppercase text-boda-primary/40 mt-4 mb-2">
                Jóvenes — Boda 2026
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}