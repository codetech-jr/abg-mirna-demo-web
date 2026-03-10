"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Scale, Lock } from "lucide-react";

interface LeadFormData {
  nombre: string;
  apellido: string;
  whatsapp: string;
  area: string;
  resumen: string;
  aceptaTerminos: boolean;
}

const initialFormData: LeadFormData = {
  nombre: "",
  apellido: "",
  whatsapp: "",
  area: "",
  resumen: "",
  aceptaTerminos: false,
};

export default function LeadForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.nombre || !formData.apellido || !formData.whatsapp || !formData.area) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.aceptaTerminos) {
      setError("Debe aceptar los términos para continuar.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          whatsapp: formData.whatsapp,
          area: formData.area,
          resumen: formData.resumen,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Ocurrió un error. Intente de nuevo.");
        return;
      }

      setStep(3);
    } catch {
      setError("Error de conexión. Por favor, intente de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 text-sm placeholder-slate-400 transition-all duration-200 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:bg-white";

  const labelClass = "block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Solicitud de Consulta
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
          {step === 1 && "¿Necesita asesoría legal?"}
          {step === 2 && "Cuéntenos su caso"}
          {step === 3 && "¡Solicitud Recibida!"}
        </h2>
        {step !== 3 && (
          <p className="text-sm text-slate-500 mt-1">
            {step === 1
              ? "Complete sus datos para iniciar el proceso."
              : "Un paso más antes de que revisemos su caso."}
          </p>
        )}
      </div>

      {/* Step Indicator */}
      {step !== 3 && (
        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  step >= s
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/30"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {s}
              </div>
              {s < 2 && (
                <div
                  className={`h-0.5 w-8 rounded-full transition-all duration-500 ${
                    step > s ? "bg-amber-400" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
          <span className="ml-2 text-xs text-slate-400">Paso {step} de 2</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ── STEP 1 ── */}
      {step === 1 && (
        <form
          onSubmit={handleStep1Submit}
          className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-400"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="nombre" className={labelClass}>
                Nombres <span className="text-amber-500">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="María"
                value={formData.nombre}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="apellido" className={labelClass}>
                Apellidos <span className="text-amber-500">*</span>
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                required
                placeholder="González"
                value={formData.apellido}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="whatsapp" className={labelClass}>
              WhatsApp <span className="text-amber-500">*</span>
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              placeholder="+58 412 000 0000"
              value={formData.whatsapp}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="area" className={labelClass}>
              Área Legal <span className="text-amber-500">*</span>
            </label>
            <select
              id="area"
              name="area"
              required
              value={formData.area}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" disabled>
                Seleccione un área...
              </option>
              <option value="Penal">Derecho Penal</option>
              <option value="Civil">Derecho Civil</option>
              <option value="Mercantil">Derecho Mercantil</option>
              <option value="Internacional">Derecho Internacional</option>
            </select>
          </div>

          <button
            type="submit"
            className="group mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all duration-200 hover:bg-amber-600 hover:shadow-amber-600/30 hover:shadow-xl active:scale-[0.98]"
          >
            Continuar
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            Sus datos están protegidos y son confidenciales.
          </p>
        </form>
      )}

      {/* ── STEP 2 ── */}
      {step === 2 && (
        <form
          onSubmit={handleStep2Submit}
          className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-400"
        >
          <div>
            <label htmlFor="resumen" className={labelClass}>
              Resumen del Caso{" "}
              <span className="text-slate-400 font-normal normal-case">(Opcional)</span>
            </label>
            <textarea
              id="resumen"
              name="resumen"
              rows={4}
              placeholder="Describa brevemente la situación legal que requiere atención..."
              value={formData.resumen}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* CRO Friction Block */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  id="aceptaTerminos"
                  required
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <div className="h-5 w-5 rounded border-2 border-amber-400 bg-white transition-all duration-150 peer-checked:bg-amber-500 peer-checked:border-amber-500 flex items-center justify-center">
                  {formData.aceptaTerminos && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-slate-700 leading-relaxed">
                Entiendo que esta solicitud es para agendar una{" "}
                <strong className="text-slate-900">
                  Consulta Legal Profesional
                </strong>{" "}
                y que la evaluación de mi caso conlleva honorarios.{" "}
                <strong className="text-slate-900">
                  No ofrezco asesoría gratuita por este medio.
                </strong>
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] group flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all duration-200 hover:bg-slate-800 hover:shadow-slate-900/30 hover:shadow-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  Enviar Solicitud
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ── STEP 3 (Success) ── */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-4">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Solicitud Recibida con Éxito
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Hola, <strong className="text-slate-700">{formData.nombre}</strong>.
            Nuestro equipo revisará su caso y se pondrá en contacto en las
            próximas <strong className="text-slate-700">24 horas</strong> vía
            WhatsApp al número{" "}
            <strong className="text-slate-700">{formData.whatsapp}</strong>.
          </p>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Área de Consulta
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Derecho {formData.area}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
