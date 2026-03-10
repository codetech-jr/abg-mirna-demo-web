"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Lock, Scale, AlertCircle } from "lucide-react";

interface FormData {
    nombre: string;
    apellido: string;
    whatsapp: string;
    area: string;
    resumen: string;
    aceptaTerminos: boolean;
}

const initialData: FormData = {
    nombre: "",
    apellido: "",
    whatsapp: "",
    area: "",
    resumen: "",
    aceptaTerminos: false,
};

const AREAS = [
    "Blindaje de Negocio / Impuestos",
    "Riesgos Digitales (Binance / Divisas)",
    "Derecho Laboral",
    "Derecho Civil / Familia",
    "Otro",
];

export default function SmartContactForm() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        setError(null);
    };

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.nombre || !formData.apellido || !formData.whatsapp || !formData.area) {
            setError("Por favor, complete todos los campos obligatorios (*).");
            return;
        }
        setStep(2);
    };

    const handleStep2Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.aceptaTerminos) {
            setError("Debe comprender y aceptar la naturaleza de la consulta para enviar la solicitud.");
            return;
        }

        setIsSubmitting(true);

        // Simulated 1.5s processing delay
        // Aquí iría la integración real
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setStep(3);
    };

    // Common classes
    const inputBase =
        "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";
    const labelBase =
        "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500";

    // ─── Render Step 3 (Success) ───
    if (step === 3) {
        return (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                    ¡Solicitud Enviada con Éxito!
                </h3>
                <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-slate-500">
                    Solicitud enviada. Le contactaremos vía WhatsApp con el enlace de pago de su consulta.
                </p>

                {/* Resumen Receipt */}
                <div className="w-full max-w-sm rounded-xl border border-slate-100 bg-slate-50 p-5 text-left space-y-4">
                    <div>
                        <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                            Área de Consulta
                        </p>
                        <p className="text-sm font-semibold text-slate-800">{formData.area}</p>
                    </div>
                    <div>
                        <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                            WhatsApp
                        </p>
                        <p className="text-sm font-semibold text-slate-800">{formData.whatsapp}</p>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Render Step 1 & 2 ───
    return (
        <div className="w-full">
            {/* ── Header Compartido ── */}
            <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-amber-500" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-600">
                        SOLICITUD DE CONSULTA
                    </span>
                </div>
                <h2 className="mb-1.5 text-2xl font-bold tracking-tight text-slate-900">
                    {step === 1 ? "¿Necesita asesoría legal?" : "Resumen y Evaluación"}
                </h2>
                <p className="text-sm text-slate-500">
                    {step === 1
                        ? "Complete sus datos para iniciar el proceso."
                        : "Cuéntenos su caso y confirme la solicitud."}
                </p>
            </div>

            {/* ── Progress Indicator ── */}
            <div className="mb-6 flex items-center gap-3">
                {/* Step 1 Circle */}
                <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${step >= 1 ? "bg-amber-500 text-white shadow-sm shadow-amber-500/30" : "bg-slate-100 text-slate-400"
                        }`}
                >
                    1
                </div>

                {/* Line */}
                <div
                    className={`h-0.5 w-8 rounded-full transition-colors ${step === 2 ? "bg-amber-500" : "bg-slate-200"
                        }`}
                />

                {/* Step 2 Circle */}
                <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${step === 2 ? "bg-amber-500 text-white shadow-sm shadow-amber-500/30" : "bg-slate-100 text-slate-400"
                        }`}
                >
                    2
                </div>

                {/* Text */}
                <span className="ml-1 text-xs font-medium text-slate-400">
                    Paso {step} de 2
                </span>
            </div>

            {/* ── Error General ── */}
            {error && (
                <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 animate-in fade-in">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* ── Step 1 Form ── */}
            {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="nombre" className={labelBase}>
                                NOMBRES <span className="text-amber-500">*</span>
                            </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                placeholder="María"
                                value={formData.nombre}
                                onChange={handleChange}
                                className={inputBase}
                            />
                        </div>
                        <div>
                            <label htmlFor="apellido" className={labelBase}>
                                APELLIDOS <span className="text-amber-500">*</span>
                            </label>
                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                placeholder="González"
                                value={formData.apellido}
                                onChange={handleChange}
                                className={inputBase}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="whatsapp" className={labelBase}>
                            WHATSAPP <span className="text-amber-500">*</span>
                        </label>
                        <input
                            id="whatsapp"
                            name="whatsapp"
                            type="tel"
                            placeholder="+58 412 000 0000"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className={inputBase}
                        />
                    </div>

                    <div>
                        <label htmlFor="area" className={labelBase}>
                            ÁREA LEGAL <span className="text-amber-500">*</span>
                        </label>
                        <select
                            id="area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className={`${inputBase} cursor-pointer`}
                        >
                            <option value="" disabled>Seleccione un área...</option>
                            {AREAS.map((a) => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all duration-200 hover:bg-amber-600 hover:shadow-amber-600/30 hover:shadow-xl active:scale-[0.98]"
                    >
                        Continuar
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                </form>
            )}

            {/* ── Step 2 Form ── */}
            {step === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex justify-start">
                        <button
                            type="button"
                            onClick={() => {
                                setError(null);
                                setStep(1);
                            }}
                            className="group -ml-2 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                        >
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
                            Volver al Paso 1
                        </button>
                    </div>

                    <div>
                        <label htmlFor="resumen" className={labelBase}>
                            Resumen breve de su caso{" "}
                            <span className="font-normal normal-case text-slate-400">(Opcional)</span>
                        </label>
                        <textarea
                            id="resumen"
                            name="resumen"
                            rows={4}
                            placeholder="Describa brevemente la situación legal que requiere atención..."
                            value={formData.resumen}
                            onChange={handleChange}
                            className={`${inputBase} resize-none`}
                        />
                    </div>

                    {/* CRO Psychological Friction Box */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <label htmlFor="aceptaTerminos" className="flex cursor-pointer items-start gap-3">
                            <div className="relative mt-0.5 flex-shrink-0">
                                <input
                                    type="checkbox"
                                    id="aceptaTerminos"
                                    name="aceptaTerminos"
                                    checked={formData.aceptaTerminos}
                                    onChange={handleChange}
                                    className="peer sr-only"
                                />
                                <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-slate-300 bg-white transition-all duration-150 peer-checked:border-amber-500 peer-checked:bg-amber-500">
                                    {formData.aceptaTerminos && (
                                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-sm leading-relaxed text-slate-700">
                                Comprendo que esta solicitud es para agendar una{" "}
                                <strong className="text-slate-900">Asesoría Legal Privada</strong> y que la
                                revisión de mi caso conlleva honorarios profesionales.{" "}
                                <strong className="text-slate-900">
                                    No ofrezco asesoría gratuita por esta vía.
                                </strong>
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/25 transition-all duration-200 hover:bg-amber-600 hover:shadow-amber-600/30 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin text-slate-800" />
                                <span className="text-slate-800">Procesando...</span>
                            </>
                        ) : (
                            <>
                                Solicitar Evaluación
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </form>
            )}

            {/* ── Footer Compartido ── */}
            <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
                    <Lock className="h-3 w-3" />
                    Sus datos están protegidos y son confidenciales.
                </p>
            </div>
        </div>
    );
}
