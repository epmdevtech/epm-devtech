import { FC, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

/* ─── Visual Mockups ─────────────────────────────────────────── */

function MockBrowser() {
  return (
    <div className="svc-mockup">
      {/* browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <div className="svc-bar" style={{ flex: 1, height: 14, borderRadius: 4, marginLeft: 6 }} />
      </div>
      {/* fake nav bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {["Home", "Sobre", "Serviços"].map((l) => (
          <div key={l} className="svc-pill">
            {l}
          </div>
        ))}
      </div>
      {/* hero block */}
      <div className="svc-block" style={{ padding: "10px 12px", marginBottom: 8 }}>
        <div className="svc-bar" style={{ width: "55%", height: 7, borderRadius: 3, marginBottom: 5 }} />
        <div className="svc-bar" style={{ width: "40%", height: 5, borderRadius: 3, marginBottom: 8 }} />
        <div style={{ width: 60, height: 20, background: "var(--accent-blue)", borderRadius: 4 }} />
      </div>
      {/* 3 card blocks */}
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="svc-block" style={{ flex: 1, height: 28, borderRadius: 5 }} />
        ))}
      </div>
    </div>
  );
}

function MockAPI() {
  const lines = [
    { type: "comment", text: "// GET /api/v1/users" },
    { type: "key", text: "Authorization:", value: "Bearer eyJ..." },
    { type: "key", text: "Content-Type:", value: "application/json" },
    { type: "blank" },
    { type: "response", text: '{ "status": 200, "data": [...] }' },
  ];
  return (
    <div className="svc-mockup" style={{ fontSize: 9, lineHeight: 1.8 }}>
      <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
        <div
          style={{
            padding: "2px 8px",
            borderRadius: 4,
            background: "rgba(167,139,250,0.18)",
            color: "var(--accent-violet)",
            fontSize: 8,
            fontWeight: 700,
          }}
        >
          GET
        </div>
        <div
          className="svc-bar"
          style={{
            flex: 1,
            height: 18,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            paddingLeft: 8,
            fontSize: 8,
          }}
        >
          /api/v1/users
        </div>
      </div>
      {lines.map((l, i) => (
        <div key={i} className={`svc-code-line svc-code-${l.type}`}>
          {l.type !== "blank" && (
            <span>
              {l.text}
              {l.value ? <span className="svc-code-value"> {l.value}</span> : null}
            </span>
          )}
        </div>
      ))}
      <div className="svc-success-badge" style={{ marginTop: 8 }}>
        ✓ 200 OK (42ms)
      </div>
    </div>
  );
}

function MockIntegration() {
  return (
    <div className="svc-mockup" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <div
          style={{
            padding: "4px 14px",
            borderRadius: 6,
            background: "rgba(251,191,36,0.18)",
            border: "1px solid rgba(251,191,36,0.35)",
            color: "var(--accent-amber)",
            fontSize: 9,
            fontWeight: 700,
          }}
        >
          API Hub
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", height: 14, alignItems: "center" }}>
        <div
          style={{
            width: "80%",
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {[
          { label: "CRM", color: "var(--accent-blue)" },
          { label: "ERP", color: "var(--accent-violet)" },
          { label: "Email", color: "var(--brand)" },
          { label: "DB", color: "var(--accent-amber)" },
        ].map((n) => (
          <div
            key={n.label}
            style={{
              padding: "3px 8px",
              borderRadius: 5,
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              color: n.color,
              fontSize: 8,
            }}
          >
            {n.label}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 6, display: "flex", gap: 5 }}>
        <div
          style={{
            padding: "2px 7px",
            borderRadius: 4,
            background: "var(--bg-elevated)",
            color: "var(--accent-violet)",
            fontSize: 8,
          }}
        >
          event.publish()
        </div>
        <div
          style={{
            padding: "2px 7px",
            borderRadius: 4,
            background: "var(--bg-elevated)",
            color: "var(--brand)",
            fontSize: 8,
          }}
        >
          webhook → OK
        </div>
      </div>
    </div>
  );
}

function MockMaintenance() {
  const diff = [
    { type: "remove", text: "- function getUserData(id) {" },
    { type: "remove", text: "-   return db.query('SELECT *...')" },
    { type: "add", text: "+ async function getUserData(id: string) {" },
    { type: "add", text: "+   return await UserRepository.findById(id)" },
    { type: "neutral", text: "  // cache: 5min" },
  ];
  return (
    <div className="svc-mockup" style={{ fontSize: 8.5, lineHeight: 1.9 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        <div
          style={{
            padding: "2px 7px",
            background: "rgba(248,113,113,0.1)",
            borderRadius: 4,
            color: "var(--danger)",
            fontSize: 8,
            border: "1px solid rgba(248,113,113,0.2)",
          }}
        >
          legacy
        </div>
        <div
          style={{
            padding: "2px 7px",
            background: "var(--brand-subtle)",
            borderRadius: 4,
            color: "var(--text-brand)",
            fontSize: 8,
            border: "1px solid var(--border-subtle)",
          }}
        >
          refactored
        </div>
      </div>
      {diff.map((l, i) => (
        <div key={i} className={`svc-diff-line svc-diff-${l.type}`}>
          {l.text}
        </div>
      ))}
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const services = [
  {
    indexTag: "01 // WEB & PORTAIS",
    visual: <MockBrowser />,
    title: "Sistemas web, portais e sites institucionais",
    trigger: "Precisa criar um sistema novo, um portal ou um site institucional que represente bem a sua empresa?",
    description: "Aplicações web sob medida, portais e sites institucionais: sistemas de gestão internos, plataformas e presença digital com foco em credibilidade, desempenho e acessibilidade.",
    accent: "var(--accent-blue)",
  },
  {
    indexTag: "02 // APIS & BACK-END",
    visual: <MockAPI />,
    title: "APIs & back-end escalável",
    trigger: "Seu sistema sofre com lentidão em horários de pico ou precisa centralizar regras?",
    description: "Desenvolvimento de APIs RESTful e serviços de alta disponibilidade para sustentar aplicações, integrar operações e centralizar regras de negócio sob carga contínua.",
    accent: "var(--accent-violet)",
  },
  {
    indexTag: "03 // INTEGRAÇÃO DE DADOS",
    visual: <MockIntegration />,
    title: "Integrações entre sistemas",
    trigger: "Sua operação perde tempo com processos manuais porque seus sistemas não conversam?",
    description: "Conexão segura entre ERPs, CRMs, plataformas e serviços externos, com foco em confiabilidade e consistência dos dados.",
    accent: "var(--accent-amber)",
  },
  {
    indexTag: "04 // MODERNIZAÇÃO",
    visual: <MockMaintenance />,
    title: "Modernização & evolução de legados",
    trigger: "Tem um sistema legado essencial que já não acompanha a velocidade da operação?",
    description: "Refatoração e migração gradual de plataformas legadas, reduzindo custos de manutenção e dívida técnica, com evolução incremental e menor risco de interrupção da operação.",
    accent: "var(--brand)",
  },
];

export interface ServicesProps {
  hideHeader?: boolean;
}

export const Services: FC<ServicesProps> = ({ hideHeader = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           SERVICES SECTION — Light + Dark Mode Mockups
        ══════════════════════════════════════════════════ */
        .svc-mockup {
          font-family: ui-monospace, 'Geist Mono', monospace;
          width: 100%;
          height: 100%;
        }

        .svc-bar {
          background: hsl(var(--border));
        }
        .dark .svc-bar {
          background: rgba(255,255,255,0.08);
        }
        .svc-block {
          background: hsl(var(--secondary));
          border-radius: 6px;
        }
        .dark .svc-block {
          background: rgba(255,255,255,0.05);
        }
        .svc-pill {
          padding: 3px 10px;
          border-radius: 4px;
          background: hsl(var(--secondary));
          border: 1px solid hsl(var(--border));
          font-size: 9px;
          color: hsl(var(--muted-foreground));
        }

        .svc-code-line { color: hsl(var(--muted-foreground)); }
        .svc-code-comment { opacity: 0.5; }
        .svc-code-response { color: #16a34a; }
        .dark .svc-code-response { color: #4ade80; }
        .svc-code-value { color: hsl(var(--primary)); }
        .svc-success-badge {
          padding: 5px 8px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 5px;
          color: #16a34a;
          font-size: 8px;
        }
        .dark .svc-success-badge { color: #4ade80; }

        .svc-diff-line { padding-left: 4px; border-radius: 2px; }
        .svc-diff-remove { color: #dc2626; background: rgba(239,68,68,0.06); }
        .dark .svc-diff-remove { color: #f87171; }
        .svc-diff-add { color: #16a34a; background: rgba(34,197,94,0.06); }
        .dark .svc-diff-add { color: #4ade80; }
        .svc-diff-neutral { color: hsl(var(--muted-foreground)); opacity: 0.6; }
      `}</style>

      <section
        id="servicos"
        aria-labelledby="servicos-heading"
        className="relative py-16 sm:py-24"
        ref={ref}
      >
        <div className="container px-6">
          {!hideHeader && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <SectionHeader
                id="servicos-heading"
                tagline="Serviços"
                title="Soluções sob medida para cada estágio da sua operação"
                subtitle="Da criação de um novo produto à modernização de sistemas existentes, atuamos com rigor técnico e foco no resultado do seu negócio."
              />
            </motion.div>
          )}

          {/* ─── Z-Pattern: Linhas Horizontais Alternadas (12 Colunas) ─── */}
          <div className="max-w-5xl mx-auto divide-y divide-border-default/60">
            {services.map((service, index) => {
              const isEven = index % 2 === 1; // 1 e 3 invertidos (mock esq, texto dir)

              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 lg:py-16 first:pt-0 last:pb-0"
                >
                  {/* Coluna de Texto */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isEven ? "order-1 lg:order-2" : "order-1 lg:order-1"
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold text-text-brand tracking-wider uppercase mb-2">
                      {service.indexTag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Callout de contexto de negócio com borda lateral */}
                    <div className="border-l-2 border-brand/60 pl-4 py-2 bg-brand/5 dark:bg-brand/5 rounded-r-md">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-brand font-semibold block mb-1">
                        Quando precisa:
                      </span>
                      <p className="text-xs sm:text-sm text-secondary font-medium leading-relaxed">
                        {service.trigger}
                      </p>
                    </div>
                  </div>

                  {/* Coluna Visual (Mock Técnico com fundo escuro e profundidade) */}
                  <div
                    className={`lg:col-span-6 flex justify-center w-full ${
                      isEven ? "order-2 lg:order-1" : "order-2 lg:order-2"
                    }`}
                  >
                    <div className="relative w-full rounded-xl border border-border-default/80 bg-surface/80 dark:bg-zinc-950/80 p-5 sm:p-6 shadow-2xl backdrop-blur-sm select-none hover:border-brand/40 transition-colors duration-300 overflow-hidden">
                      {/* Efeito de iluminação suave em background */}
                      <div
                        className="absolute -top-12 -right-12 w-44 h-44 rounded-full pointer-events-none blur-3xl opacity-20"
                        style={{ background: service.accent }}
                        aria-hidden="true"
                      />
                      <div className="relative z-10">{service.visual}</div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
