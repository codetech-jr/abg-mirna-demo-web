"use client";

import { useState } from "react";
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Loader2,
    Lock,
    Scale,
    AlertCircle,
} from "lucide-react";

// ─── Número de WhatsApp de la Dra. Mirna Garban ───────────────────────────────
const WHATSAPP_NUMBER = "584222452065"; // Formato internacional sin + ni espacios

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

function buildWhatsAppUrl(data: FormData): string {
    const lines = [
        `🤝 *Nueva Solicitud de Consulta Legal*`,
        ``,
        `👤 *Nombre:* ${data.nombre} ${data.apellido}`,
        `📱 *WhatsApp:* ${data.whatsapp}`,
        `⚖️ *Área Legal:* ${data.area}`,
        data.resumen
            ? `📋 *Resumen del caso:* ${data.resumen}`
            : `📋 *Resumen del caso:* (No proporcionado)`,
        ``,
        `✅ _El cliente comprende que la consulta conlleva honorarios profesionales._`,
    ];

    const message = lines.join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function SmartContactForm() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
            setError(
                "Debe comprender y aceptar la naturaleza de la consulta para continuar."
            );
            return;
        }

        setIsSubmitting(true);

        // Pequeña pausa para que el usuario vea el estado "Procesando"
        await new Promise((resolve) => setTimeout(resolve, 800));

        // ── Construir y abrir el enlace de WhatsApp con el resumen del prospecto ──
        const url = buildWhatsAppUrl(formData);
        window.open(url, "_blank", "noopener,noreferrer");

        setIsSubmitting(false);
        setStep(3);
    };

    // ─── Estilos compartidos ───────────────────────────────────────────────────
    const inputBase =
        "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20";
    const labelBase =
        "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500";

    // ─── Paso 3: Éxito ────────────────────────────────────────────────────────
    if (step === 3) {
        return (
            <div className="flex flex-col items-center justify-center px-4 py-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                    ¡Solicitud Enviada con Éxito!
                </h3>
                <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-slate-500">
                    Se ha abierto WhatsApp con su información pre-cargada. Si no se abrió
                    automáticamente, haga clic en el botón de abajo.
                </p>

                {/* Botón de respaldo por si el popup fue bloqueado */}
                <a
                    href={buildWhatsAppUrl(formData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-6 flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-200 hover:bg-[#20be5c] hover:shadow-xl active:scale-[0.98]"
                >
                    {/* WhatsApp SVG icon */}
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Ir a WhatsApp
                </a>

                {/* Resumen */}
                <div className="w-full max-w-sm rounded-xl border border-slate-100 bg-slate-50 p-5 text-left">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Resumen de su solicitud
                    </p>
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs font-semibold text-slate-400">Cliente</p>
                            <p className="text-sm font-semibold text-slate-800">
                                {formData.nombre} {formData.apellido}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400">Área de Consulta</p>
                            <p className="text-sm font-semibold text-slate-800">{formData.area}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400">WhatsApp</p>
                            <p className="text-sm font-semibold text-slate-800">{formData.whatsapp}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── Renderizado Paso 1 y 2 ───────────────────────────────────────────────
    return (
        <div className="w-full">
            {/* Header compartido */}
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

            {/* Indicador de progreso */}
            <div className="mb-6 flex items-center gap-3">
                <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${step >= 1
                            ? "bg-amber-500 text-white shadow-sm shadow-amber-500/30"
                            : "bg-slate-100 text-slate-400"
                        }`}
                >
                    1
                </div>
                <div
                    className={`h-0.5 w-8 rounded-full transition-colors ${step === 2 ? "bg-amber-500" : "bg-slate-200"
                        }`}
                />
                <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${step === 2
                            ? "bg-amber-500 text-white shadow-sm shadow-amber-500/30"
                            : "bg-slate-100 text-slate-400"
                        }`}
                >
                    2
                </div>
                <span className="ml-1 text-xs font-medium text-slate-400">
                    Paso {step} de 2
                </span>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 animate-in fade-in">
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* ── Paso 1 ── */}
            {step === 1 && (
                <form
                    onSubmit={handleStep1Submit}
                    className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300"
                >
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

                    <button
                        type="submit"
                        className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all duration-200 hover:bg-amber-600 hover:shadow-amber-600/30 hover:shadow-xl active:scale-[0.98]"
                    >
                        Continuar
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                </form>
            )}

            {/* ── Paso 2 ── */}
            {step === 2 && (
                <form
                    onSubmit={handleStep2Submit}
                    className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300"
                >
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

                    <div>
                        <label htmlFor="resumen" className={labelBase}>
                            Resumen breve de su caso{" "}
                            <span className="font-normal normal-case text-slate-400">
                                (Opcional)
                            </span>
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

                    {/* Caja de Fricción Psicológica */}
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <label
                            htmlFor="aceptaTerminos"
                            className="flex cursor-pointer items-start gap-3"
                        >
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
                                <strong className="text-slate-900">Asesoría Legal Privada</strong>{" "}
                                y que la revisión de mi caso conlleva honorarios profesionales.{" "}
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
                                <span className="text-slate-800">Conectando a WhatsApp...</span>
                            </>
                        ) : (
                            <>
                                Solicitar Evaluación por WhatsApp
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </form>
            )}

            {/* Footer compartido */}
            <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
                    <Lock className="h-3 w-3" />
                    Sus datos están protegidos y son confidenciales.
                </p>
            </div>
        </div>
    );
}
