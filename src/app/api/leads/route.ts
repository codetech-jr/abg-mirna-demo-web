import { NextResponse } from "next/server";

interface LeadPayload {
    nombre: string;
    apellido: string;
    whatsapp: string;
    area: string;
    resumen?: string;
}

export async function POST(request: Request) {
    try {
        const body: LeadPayload = await request.json();

        const { nombre, apellido, whatsapp, area, resumen } = body;

        // Validación básica de campos obligatorios
        if (!nombre || !apellido || !whatsapp || !area) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Campos obligatorios faltantes: nombre, apellido, whatsapp y área son requeridos.",
                },
                { status: 400 }
            );
        }

        // Validación mínima del número de WhatsApp
        const whatsappClean = whatsapp.replace(/\s+/g, "");
        if (whatsappClean.length < 7) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Número de WhatsApp inválido.",
                },
                { status: 400 }
            );
        }

        // Simular procesamiento / guardado en base de datos
        // Aquí iría la integración real con Google Sheets, SendGrid o base de datos
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Log en servidor (en producción esto iría a un logger estructurado)
        console.log("✅ Nuevo lead cualificado recibido:", {
            nombre,
            apellido,
            whatsapp,
            area,
            resumen: resumen || "(Sin resumen)",
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            {
                success: true,
                message: "Lead cualificado recibido exitosamente.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Error al procesar el lead:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Error interno del servidor. Intente de nuevo más tarde.",
            },
            { status: 500 }
        );
    }
}
