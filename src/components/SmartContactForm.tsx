"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Lock, AlertCircle } from "lucide-react";

interface FormData {
    nombre: string;
    email: string;
    telefono: string;
    area: string;
    descripcion: string;
    aceptaTerminos: boolean;
}

const initialData: FormData = {
    nombre: "",
    email: "",
    telefono: "",
    area: "",
    descripcion: "",
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
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.nombre || !formData.email || !formData.telefono || !formData.area) {
            setError("Por favor, complete todos los campos obligatorios.");
            return;
        }

        if (!formData.aceptaTerminos) {
            setError("Debe aceptar los términos para enviar la solicitud.");
            return;
        }

        setIsSubmitting(true);

        // Simulated 1.5s processing delay
        // Aquí iría la integración real con Google Sheets, SendGrid o base de datos
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    const inputBase =
        "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 focus:bg-white";

    const labelBase =
        "block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5";

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                    ¡Solicitud Enviada con Éxito!
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                    Solicitud enviada. Le contactaremos vía WhatsApp con el enlace de pago de su consulta.
                </p>
                <div className="mt-6 w-full rounded-xl border border-slate-100 bg-slate-50 p-4 text-left space-y-2">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Área de Consulta
                        </p>
                        <p className="text-sm font-semibold text-slate-800">{formData.area}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            WhatsApp
                        </p>
                        <p className="text-sm font-semibold text-slate-800">{formData.telefono}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Error */}
            {error && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            {/* Nombre */}
            <div>
                <label htmlFor="nombre" className={labelBase}>
                    Nombre Completo <span className="text-amber-500 font-bold">*</span>
                </label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Ej: Carlos Eduardo Pérez"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={inputBase}
                />
            </div>

            {/* Email + Teléfono */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="email" className={labelBase}>
                        Email <span className="text-amber-500 font-bold">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="correo@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputBase}
                    />
                </div>
                <div>
                    <label htmlFor="telefono" className={labelBase}>
                        Teléfono (WhatsApp) <span className="text-amber-500 font-bold">*</span>
                    </label>
                    <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        required
                        placeholder="+58 412 000 0000"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={inputBase}
                    />
                </div>
            </div>

            {/* Área de interés */}
            <div>
                <label htmlFor="area" className={labelBase}>
                    Área de Interés <span className="text-amber-500 font-bold">*</span>
                </label>
                <select
                    id="area"
                    name="area"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    className={`${inputBase} cursor-pointer`}
                >
                    <option value="" disabled>
                        Seleccione un área...
                    </option>
                    {AREAS.map((a) => (
                        <option key={a} value={a}>
                            {a}
                        </option>
                    ))}
                </select>
            </div>

            {/* Descripción */}
            <div>
                <label htmlFor="descripcion" className={labelBase}>
                    Breve Descripción de su Caso{" "}
                    <span className="font-normal normal-case text-slate-400">(Opcional)</span>
                </label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    rows={3}
                    placeholder="Cuéntenos brevemente qué situación necesita resolver..."
                    value={formData.descripcion}
                    onChange={handleChange}
                    className={`${inputBase} resize-none`}
                />
            </div>

            {/* CRO Checkbox - El Filtro Psicológico */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4">
                <label htmlFor="aceptaTerminos" className="flex cursor-pointer items-start gap-3">
                    <div className="relative mt-0.5 flex-shrink-0">
                        <input
                            type="checkbox"
                            id="aceptaTerminos"
                            name="aceptaTerminos"
                            required
                            checked={formData.aceptaTerminos}
                            onChange={handleChange}
                            className="peer sr-only"
                        />
                        <div className="flex h-5 w-5 items-center justify-center rounded border-2 border-amber-400 bg-white transition-all duration-150 peer-checked:border-amber-500 peer-checked:bg-amber-500">
                            {formData.aceptaTerminos && (
                                <svg
                                    className="h-3 w-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
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

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/25 transition-all duration-200 hover:bg-amber-600 hover:shadow-amber-600/30 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Procesando su solicitud...
                    </>
                ) : (
                    <>
                        Solicitar Evaluación
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
                <Lock className="h-3 w-3" />
                Sus datos son confidenciales y están protegidos.
            </p>
        </form>
    );
}
