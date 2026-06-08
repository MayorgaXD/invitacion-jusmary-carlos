import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RsvpForm() {
  const [cantidad, setCantidad] = useState(1);
  // Inicializamos un arreglo con 5 espacios vacíos para los nombres
  const [nombres, setNombres] = useState(['', '', '', '', '']);
  const [asistencia, setAsistencia] = useState('Sí, ahí estaré!');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // 🚨 REEMPLAZA ESTE ENLACE CON TU URL DE GOOGLE APPS SCRIPT
  const GOOGLE_SCRIPT_URL = "TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI";

  const handleNombreChange = (index, value) => {
    const nuevosNombres = [...nombres];
    nuevosNombres[index] = value;
    setNombres(nuevosNombres);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    // Filtramos solo los nombres de los integrantes activos según la cantidad seleccionada
    const integrantesActivos = nombres.slice(0, cantidad).filter(n => n.trim() !== '');
    // Los unimos con comas para que en el Excel de Google Sheets se guarden limpitos en una sola celda
    const nombresFinales = integrantesActivos.join(', ');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nombre: nombresFinales, 
          asistencia: asistencia === 'Sí, ahí estaré!' ? `Sí, asisten ${cantidad} personas` : asistencia
        }),
      });
      setEnviado(true);
    } catch (error) {
      console.error("Error al enviar asistencia:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="w-full max-w-[340px] bg-white border border-[#e5ba73]/20 rounded-2xl p-5 shadow-md relative z-10">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1c2d42_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none rounded-2xl" />

      {!enviado ? (
        <form onSubmit={handleSubmit} className="w-full flex flex-col text-left relative z-10">
          <h3 className="font-serif text-lg text-[#1c2d42] text-center mb-5 'font-bold tracking-wide">
            Confirmación de asistencia
          </h3>

          {/* SELECTOR DE ASISTENCIA GLOBAL */}
          <label className="text-[9px] uppercase tracking-widest text-[#1c2d42]/70 font-bold mb-1.5 pl-1">
            ¿Podrán acompañarnos?
          </label>
          <div className="relative w-full mb-4">
            <select 
              value={asistencia}
              onChange={(e) => setAsistencia(e.target.value)}
              className="w-full border border-[#1c2d42]/15 rounded-xl px-4 py-2.5 text-xs text-[#1c2d42] focus:outline-none focus:border-[#e5ba73] transition-all bg-[#faf8f5]/50 appearance-none cursor-pointer font-medium"
            >
              <option value="Sí, ahí estaré!">Sí, ahí estaré!</option>
              <option value="No podré asistir, los llevo en el corazón">No podré asistir, los llevo en el corazón</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#1c2d42]/60 text-xs">▼</div>
          </div>

          {/* LÓGICA CONDICIONAL: Solo si dice que SÍ, se despliega el contador de personas */}
          <AnimatePresence>
            {asistencia === 'Sí, ahí estaré!' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* SELECTOR DE CANTIDAD (LÍMITE 5 PERSONAS) */}
                <label className="text-[9px] uppercase tracking-widest text-[#1c2d42]/70 font-bold mb-1.5 pl-1 block">
                  Cantidad de personas que asistirán
                </label>
                <div className="relative w-full mb-4">
                  <select 
                    value={cantidad}
                    onChange={(e) => setCantidad(parseInt(e.target.value))}
                    className="w-full border border-[#1c2d42]/15 rounded-xl px-4 py-2.5 text-xs text-[#1c2d42] focus:outline-none focus:border-[#e5ba73] transition-all bg-[#faf8f5]/50 appearance-none cursor-pointer font-bold"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>Asistirán {num} {num === 1 ? 'persona' : 'personas'}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#1c2d42]/60 text-xs">▼</div>
                </div>

                {/* GENERACIÓN DINÁMICA DE INPUTS DE NOMBRES */}
                <label className="text-[9px] uppercase tracking-widest text-[#1c2d42]/70 font-bold mb-1.5 pl-1 block">
                  Nombres de los asistentes
                </label>
                
                <div className="flex flex-col gap-2.5 mb-2">
                  {Array.from({ length: cantidad }).map((_, index) => (
                    <motion.input 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      type="text" 
                      value={nombres[index]}
                      onChange={(e) => handleNombreChange(index, e.target.value)}
                      required 
                      placeholder={index === 0 ? "Nombre completo principal" : `Nombre del acompañante ${index + 1}`}
                      className="w-full border border-[#1c2d42]/15 rounded-xl px-4 py-2 text-xs text-[#1c2d42] placeholder-[#1c2d42]/35 focus:outline-none focus:border-[#e5ba73] focus:ring-1 focus:ring-[#e5ba73] transition-all bg-[#faf8f5]/50"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BOTÓN DE ENVIAR ROBUSTO Y MAJESTUOSO */}
          <button 
            type="submit"
            disabled={enviando}
            className="w-full mt-4 bg-gradient-to-r from-[#1b365d] to-[#122440] text-white text-[10px] uppercase tracking-[0.2em] font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {enviando ? "Guardando espacios..." : "Confirmar Asistencia"}
          </button>
        </form>
      ) : (
        /* PANTALLA DE ÉXITO */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-8 flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-[#e5ba73]/15 text-[#b58943] rounded-full flex items-center justify-center mb-5 text-xl">✓</div>
          <h4 className="font-serif text-base text-[#1c2d42] font-bold mb-1.5">¡Confirmación Guardada!</h4>
          <p className="text-[11px] text-[#1c2d42]/70 px-2 leading-relaxed text-center">
            Los espacios han sido reservados en la lista oficial de la boda. ¡Los esperamos!
          </p>
        </motion.div>
      )}

    </div>
  );
}