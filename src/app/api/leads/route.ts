import { NextResponse } from "next/server";

interface LeadPayload {
    nombre: string;
    apellido: string;
    whatsapp: string;
    area: string;
    resumen?: string;
    aceptaTerminos?: boolean;
}

export async function POST(request: Request) {
    try {
        const body: LeadPayload = await request.json();
        const { nombre, apellido, whatsapp, area, resumen, aceptaTerminos } = body;

        // Validación básica de campos obligatorios
        if (!nombre || !apellido || !whatsapp || !area) {
            return NextResponse.json(
                { success: false, message: "Campos obligatorios faltantes." },
                { status: 400 }
            );
        }

        // Simular guardado rápido en Base de Datos (ej. Supabase / Vercel KV / MongoDB)
        // o inserción en una hoja de Google Sheets para el equipo de secretarias.
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Log estructurado simulando un sistema real
        console.log("💾 [SILENT SAVE EXECUTED] Lead cualificado respaldado:", {
            id: crypto.randomUUID(),
            nombreCompleto: `${nombre} ${apellido} `,
            whatsapp,
            areaLegal: area,
            resumenCorto: resumen ? resumen.slice(0, 50) + "..." : "(Sin resumen)",
            aceptoTerminosCRO: aceptaTerminos,
            timestamp: new Date().toISOString(),
            estado: "PENDING_WHATSAPP_MESSAGE" // Si el cliente no escribe, el equipo lo contacta
        });

        return NextResponse.json(
            { success: true, message: "Lead respaldado exitosamente." },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Error en el Silent Save:", error);
        return NextResponse.json(
            { success: false, message: "Error interno." },
            { status: 500 }
        );
    }
}
