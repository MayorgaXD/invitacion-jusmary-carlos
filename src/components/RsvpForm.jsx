import React from 'react';

export default function RsvpForm() {
  return (
    <div className="w-full bg-white border border-boda-accent/10 rounded-2xl p-6 shadow-md relative overflow-hidden text-center mt-4">
      
      {/* DECORACIÓN: Lirio esquinero abajo a la izquierda */}
      <img 
        src="/images/Lirio esquinero.png" 
        alt="Lirio" 
        className="absolute -bottom-6 -left-6 w-20 h-auto opacity-30 pointer-events-none z-0 transform scale-x-[-1] select-none"
      />

      {/* DECORACIÓN: Flor blanca arriba a la derecha */}
      <img 
        src="/images/flor blanca.png" 
        alt="Flor" 
        className="absolute -top-6 -right-6 w-16 h-auto opacity-20 pointer-events-none z-0 select-none"
      />

      {/* CONTENIDO DEL FORMULARIO (z-10 sobre las decoraciones) */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h2 className="text-xl text-boda-primary tracking-wide mb-1 font-serif">Confirmación de asistencia</h2>
        <div className="w-8 h-[1px] bg-boda-accent/30 mx-auto mb-4" />

        <form className="w-full space-y-4 text-left font-sans text-xs">
          <div>
            <label className="block text-boda-text/60 uppercase tracking-wider mb-1 text-[10px]">Tu nombre</label>
            <input 
              type="text" 
              placeholder="Ej. Tía María" 
              className="w-full border border-boda-accent/20 rounded-lg p-2.5 focus:outline-none focus:border-boda-primary bg-[#faf8f5]/50 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-boda-text/60 uppercase tracking-wider mb-1 text-[10px]">¿Podrás acompañarnos?</label>
            <select className="w-full border border-boda-accent/20 rounded-lg p-2.5 focus:outline-none focus:border-boda-primary bg-[#faf8f5]/50 transition-colors">
              <option>Sí, ahí estaré!</option>
              <option>No podré asistir, pero los llevo en mi corazón</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-boda-primary text-white p-3 rounded-lg uppercase tracking-widest font-semibold hover:bg-[#1a354f] transition-all duration-300 mt-2 shadow-sm active:scale-[0.98]"
          >
            Click aquí para confirmar
          </button>
        </form>
      </div>

    </div>
  );
}