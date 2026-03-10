import SmartContactForm from "@/components/SmartContactForm";
import {
  ShieldCheck,
  Smartphone,
  Briefcase,
  Scale,
  Landmark,
  Users,
  HeartHandshake,
  Globe,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
  Star,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export const metadata = {
  title: "Dra. Mirna Garban | Autoridad Legal | Asesoría Jurídica Preventiva Venezuela",
  description:
    "La abogada más influyente de Venezuela. Blindaje legal para emprendedores, comerciantes y ciudadanos. Asesoría preventiva en impuestos, negocios digitales, criptomonedas y derecho laboral.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const painCards = [
  {
    icon: ShieldCheck,
    title: "Negocios en Instagram",
    body: "Las alcaldías y entes fiscales están multando comercios no formalizados. Proteja su emprendimiento antes de que llegue la notificación.",
    accent: "from-red-500/10 to-transparent",
    border: "border-red-200/60",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    icon: Smartphone,
    title: "Riesgos Digitales",
    body: "Evite problemas penales por intermediación financiera, uso indebido de divisas en WhatsApp o bloqueos de cuentas bancarias.",
    accent: "from-amber-500/10 to-transparent",
    border: "border-amber-200/60",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Briefcase,
    title: "Relaciones Laborales",
    body: "Blindaje en pagos de sueldos en divisas, despidos y regulaciones vigentes para que su empresa opere sin contingencias.",
    accent: "from-blue-500/10 to-transparent",
    border: "border-blue-200/60",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
];

const services = [
  {
    icon: Landmark,
    title: "Blindaje Comercial y Tributario",
    desc: "Formalización, cumplimiento fiscal, Seniat, contratos y protección frente a multas e inspecciones.",
  },
  {
    icon: Scale,
    title: "Derecho Penal Económico y Digital",
    desc: "Defensa ante cargos por manejo de divisas, operaciones con criptomonedas y negocios digitales.",
  },
  {
    icon: Users,
    title: "Derecho Laboral y Corporativo",
    desc: "Contratos, despidos, sueldos en divisas y restructuración laboral bajo la legislación venezolana vigente.",
  },
  {
    icon: HeartHandshake,
    title: "Derecho Civil y Familia",
    desc: "Divorcios, particiones de bienes, títulos supletorios, sucesiones y tutela de derechos patrimoniales.",
  },
];

const stats = [
  { value: "+1.8M", label: "Seguidores en redes", icon: TrendingUp },
  { value: "+12", label: "Años de trayectoria", icon: Star },
  { value: "+5K", label: "Casos gestionados", icon: Scale },
  { value: "100%", label: "Enfoque preventivo", icon: ShieldCheck },
];

// ─── Components ───────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 shadow-sm shadow-amber-500/30">
            <span className="text-xs font-black text-slate-900">MG</span>
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-800 sm:text-base">
            Mirna Garban{" "}
            <span className="hidden font-normal text-slate-500 sm:inline">
              | Autoridad Legal
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          <a href="#problemas" className="hover:text-slate-900 transition-colors">¿Le preocupa algo?</a>
          <a href="#servicios" className="hover:text-slate-900 transition-colors">Servicios</a>
          <a href="#bio" className="hover:text-slate-900 transition-colors">Sobre la Dra.</a>
        </nav>

        {/* CTA Button */}
        <a
          href="#contacto"
          className="group flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-900 shadow-sm shadow-amber-500/25 transition-all duration-200 hover:bg-amber-600 hover:shadow-amber-600/30 hover:shadow-md active:scale-95 sm:text-sm"
        >
          Agendar Consulta
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 px-5 py-20 sm:px-8 md:py-28 lg:py-36">
      {/* Background GLows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-600/6 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Social Proof Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 backdrop-blur-sm">
          <span className="text-lg leading-none">🌟</span>
          <span className="text-xs font-semibold text-amber-300 sm:text-sm">
            Más de 1.8 Millones de Seguidores confían en nuestra gestión.
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          No espere a que llegue{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative text-amber-400">
              la citación
            </span>
          </span>{" "}
          o la multa.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl">
          Asesoría legal estratégica y preventiva para blindar su negocio, su
          patrimonio y su libertad en el complejo entorno venezolano.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#contacto"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-4 text-sm font-bold text-slate-900 shadow-xl shadow-amber-500/25 transition-all duration-200 hover:bg-amber-400 hover:shadow-amber-500/30 hover:shadow-2xl active:scale-95 sm:w-auto"
          >
            Agendar Consulta Privada
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#servicios"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            Conocer Áreas de Práctica
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 backdrop-blur-sm"
            >
              <Icon className="mx-auto mb-2 h-5 w-5 text-amber-400" />
              <p className="text-xl font-black text-white sm:text-2xl">{value}</p>
              <p className="mt-0.5 text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainSection() {
  return (
    <section id="problemas" className="bg-slate-50 py-16 sm:py-20 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-600">
            <AlertTriangle className="mr-1 inline h-3.5 w-3.5" />
            Realidad Legal Venezolana
          </span>
          <h2 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            La ignorancia de la ley{" "}
            <span className="text-red-500">no lo exime</span> de la pena.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500 sm:text-lg">
            Cada día que pasa sin asesoría legal adecuada es un riesgo que usted
            y su familia están asumiendo sin saberlo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {painCards.map(({ icon: Icon, title, body, accent, border, iconBg, iconColor }) => (
            <div
              key={title}
              className={`relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${border}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accent} pointer-events-none`}
              />
              <div className="relative z-10">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicios" className="bg-white py-20 sm:py-24 px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700">
            Nuestras Especialidades
          </span>
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">
            Áreas de{" "}
            <span className="text-amber-500">Práctica Legal</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500 sm:text-lg">
            Cobertura integral en las ramas del derecho que más impactan a
            emprendedores y familias venezolanas hoy.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:bg-white hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20 transition-all duration-300 group-hover:bg-amber-500/15 group-hover:ring-amber-500/30">
                <Icon className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mb-2 font-bold leading-snug text-slate-900">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
              <a
                href="#contacto"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Consultar área
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BioSection() {
  return (
    <section id="bio" className="bg-slate-900 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text */}
          <div>
            <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
              Sobre la Dra. Mirna Garban
            </span>
            <h2 className="mb-6 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Dra. Mirna Garban
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              <p>
                Con una trayectoria intachable y la comunidad legal más grande de
                Venezuela, mi objetivo no es solo resolver problemas, sino{" "}
                <strong className="text-white">evitar que sucedan.</strong>
              </p>
              <p>
                La información pública es gratuita en mis redes, pero la estrategia
                aplicada a su caso es un{" "}
                <strong className="text-amber-400">servicio premium.</strong>
              </p>
              <p className="text-slate-400">
                Más de 1.8 millones de personas siguen mi contenido porque confían
                en mi criterio. Mis clientes privados reciben ese mismo nivel de
                expertise, pero aplicado directamente a su realidad jurídica.
              </p>
            </div>

            {/* Mini stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { n: "+1.8M", l: "Seguidores" },
                { n: "+12", l: "Años de exp." },
                { n: "Nacional", l: "e Internacional" },
              ].map(({ n, l }) => (
                <div
                  key={l}
                  className="rounded-xl border border-slate-700/50 bg-slate-800/60 p-4 text-center"
                >
                  <p className="text-lg font-black text-amber-400 sm:text-xl">{n}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{l}</p>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Redes Sociales:
              </p>
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Twitter, label: "X / Twitter", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
                { icon: Globe, label: "TikTok", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-all duration-200 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Photo placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute -inset-4 rounded-2xl bg-amber-500/10 blur-2xl" />
              <div className="relative min-h-[400px] w-full max-w-sm rounded-2xl border-4 border-amber-500 bg-slate-800 flex items-center justify-center shadow-2xl shadow-amber-500/10 sm:min-h-[460px] sm:max-w-md">
                <div className="text-center p-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-700 ring-4 ring-amber-500/30">
                    <span className="text-2xl font-black text-amber-400">MG</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500">
                    Foto Profesional Mirna Garban
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    (Reemplazar con imagen real)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contacto" className="bg-slate-50 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Persuasion Copy */}
          <div className="lg:sticky lg:top-28">
            <span className="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700">
              Solicitud de Consulta
            </span>
            <h2 className="mb-5 text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Dé el paso hacia la{" "}
              <span className="text-amber-500">tranquilidad jurídica.</span>
            </h2>
            <p className="mb-6 leading-relaxed text-slate-500 sm:text-lg">
              Complete el formulario y nuestro equipo evaluará la viabilidad de
              su caso para agendar una consulta privada.
            </p>

            {/* Process steps */}
            <div className="space-y-4">
              {[
                { n: "01", t: "Envíe su solicitud", d: "Completa el formulario con su información y área de interés." },
                { n: "02", t: "Evaluamos su caso", d: "Nuestro equipo revisa la viabilidad de la consulta." },
                { n: "03", t: "Le contactamos", d: "Recibe el enlace de pago y acceso a su consulta privada via WhatsApp." },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-slate-900 shadow-md shadow-amber-500/25">
                    {n}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{t}</p>
                    <p className="text-sm text-slate-500">{d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <ShieldCheck className="h-8 w-8 flex-shrink-0 text-green-500" />
              <p className="text-sm text-slate-600">
                <strong className="text-slate-800">100% Confidencial.</strong> Su
                información está protegida bajo secreto profesional y nunca será
                compartida con terceros.
              </p>
            </div>
          </div>

          {/* Right: Form Card */}
          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/80 ring-1 ring-slate-100 sm:p-8">
            <div className="mb-6 border-b border-slate-100 pb-6">
              <h3 className="text-lg font-bold text-slate-900">
                Solicitar Evaluación de Caso
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Todos los campos con <span className="text-amber-500 font-bold">*</span> son obligatorios.
              </p>
            </div>
            <SmartContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 px-5 py-12 text-slate-400 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
                <span className="text-xs font-black text-slate-900">MG</span>
              </div>
              <span className="text-sm font-bold text-slate-200">
                Mirna Garban | Autoridad Legal
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              La abogada más influyente de Venezuela. Asesoría jurídica
              preventiva y estratégica para emprendedores y ciudadanos.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "X / Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
                { icon: Globe, href: "#", label: "TikTok" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Navegación
            </p>
            <nav className="space-y-2 text-sm">
              {[
                { label: "¿Le preocupa algo?", href: "#problemas" },
                { label: "Áreas de Práctica", href: "#servicios" },
                { label: "Sobre la Dra. Garban", href: "#bio" },
                { label: "Solicitar Consulta", href: "#contacto" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="block transition-colors duration-150 hover:text-amber-400"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal Disclaimer */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Aviso Legal
            </p>
            <p className="text-xs leading-relaxed text-slate-500">
              La información publicada en este sitio web tiene carácter
              informativo y educativo. No constituye una relación
              abogado-cliente hasta tanto se formalice un acuerdo de
              representación legal firmado por ambas partes.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Todos los servicios de consultoría están sujetos a honorarios
              profesionales establecidos en contrato.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800/60 pt-6 text-center text-xs text-slate-600">
          © {currentYear} Dra. Mirna Garban — Todos los derechos reservados.
          Servicios de Asesoría Legal en Venezuela.
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <PainSection />
        <ServicesSection />
        <BioSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
