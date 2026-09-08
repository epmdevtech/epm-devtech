import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
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
        {["Home", "Sobre", "Serviços"].map(l => (
          <div key={l} className="svc-pill">{l}</div>
        ))}
      </div>
      {/* hero block */}
      <div className="svc-block" style={{ padding: "10px 12px", marginBottom: 8 }}>
        <div className="svc-bar" style={{ width: "55%", height: 7, borderRadius: 3, marginBottom: 5 }} />
        <div className="svc-bar" style={{ width: "40%", height: 5, borderRadius: 3, marginBottom: 8 }} />
        <div style={{ width: 60, height: 20, background: "linear-gradient(135deg,#10b981,#059669)", borderRadius: 4 }} />
      </div>
      {/* 3 card blocks */}
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map(i => (
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
        <div style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(16,185,129,0.18)", color: "#10b981", fontSize: 8, fontWeight: 700 }}>GET</div>
        <div className="svc-bar" style={{ flex: 1, height: 18, borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8, fontSize: 8 }}>/api/v1/users</div>
      </div>
      {lines.map((l, i) => (
        <div key={i} className={`svc-code-line svc-code-${l.type}`}>
          {l.type !== "blank" && (
            <span>{l.text}{l.value ? <span className="svc-code-value"> {l.value}</span> : null}</span>
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
        <div style={{ padding: "4px 14px", borderRadius: 6, background: "rgba(16,185,129,0.18)", border: "1px solid rgba(16,185,129,0.35)", color: "#10b981", fontSize: 9, fontWeight: 700 }}>API Hub</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", height: 14, alignItems: "center" }}>
        <div style={{ width: "80%", height: 1, background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {[{ label: "CRM", color: "#10b981" }, { label: "ERP", color: "#A855F7" }, { label: "Email", color: "#10b981" }, { label: "DB", color: "#f59e0b" }].map(n => (
          <div key={n.label} style={{ padding: "3px 8px", borderRadius: 5, background: `${n.color}18`, border: `1px solid ${n.color}40`, color: n.color, fontSize: 8 }}>{n.label}</div>
        ))}
      </div>
      <div style={{ marginTop: 6, display: "flex", gap: 5 }}>
        <div style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(168,85,247,0.15)", color: "#a78bfa", fontSize: 8 }}>event.publish()</div>
        <div style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: 8 }}>webhook → OK</div>
      </div>
    </div>
  );
}

function MockArchitecture() {
  const layers = [
    { label: "Presentation Layer", color: "#10b981" },
    { label: "Application / Use Cases", color: "#A855F7" },
    { label: "Domain / Business Logic", color: "#34d399" },
    { label: "Infrastructure / DB / Queue", color: "#6b7280" },
  ];
  return (
    <div className="svc-mockup" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {layers.map((l, i) => (
        <div key={i} className="svc-arch-layer" style={{ borderLeft: `3px solid ${l.color}` }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
          <span style={{ fontSize: 8 }}>{l.label}</span>
        </div>
      ))}
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
        <div style={{ padding: "2px 7px", background: "rgba(239,68,68,0.1)", borderRadius: 4, color: "#ef4444", fontSize: 8, border: "1px solid rgba(239,68,68,0.2)" }}>legacy</div>
        <div style={{ padding: "2px 7px", background: "rgba(34,197,94,0.1)", borderRadius: 4, color: "#16a34a", fontSize: 8, border: "1px solid rgba(34,197,94,0.2)" }}>refactored</div>
      </div>
      {diff.map((l, i) => (
        <div key={i} className={`svc-diff-line svc-diff-${l.type}`}>{l.text}</div>
      ))}
    </div>
  );
}

function MockConsulting() {
  const comments = [
    { user: "E", msg: "Revisei a arquitetura: 3 pontos críticos", color: "#10b981" },
    { user: "C", msg: "N+1 query detectado em UserService.ts:42", color: "#f59e0b" },
    { user: "E", msg: "✓ Solução: eager loading com joinQuery()", color: "#16a34a" },
  ];
  return (
    <div className="svc-mockup" style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      {comments.map((c, i) => (
        <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${c.color}20`, border: `1.5px solid ${c.color}60`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 7, color: c.color, fontWeight: 700 }}>{c.user}</div>
          <div className="svc-chat-bubble" style={{ fontSize: 8.5 }}>{c.msg}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const services = [
  {
    visual: <MockBrowser />,
    title: "Desenvolvimento Web e Aplicações SPA",
    what: "Interfaces modernas, responsivas e performáticas com Angular, Vue.js e React.",
    problem: "Sistemas lentos, designs desatualizados e interfaces que frustram o usuário.",
    how: "Desenvolvimento componentizado, Clean Code e integração fluida a APIs corporativas.",
    description: "Interfaces modernas, responsivas e performáticas com Angular, Vue.js e React. Resolve lentidão e baixa conversão através de arquitetura fluida e usabilidade centrada no usuário.",
    accent: "#10b981",
  },
  {
    visual: <MockAPI />,
    title: "APIs e Backends Escaláveis",
    what: "Desenvolvimento de APIs REST e arquiteturas orientadas a eventos em PHP (Laravel) e Node.js.",
    problem: "Sobrecarga de servidores em horários de pico e respostas demoradas do banco.",
    how: "Dimensionamento para alto throughput, baixa latência e cache distribuído com Redis.",
    description: "Desenvolvimento de APIs REST e arquiteturas orientadas a eventos em PHP (Laravel) e Node.js, dimensionadas para alto throughput e baixa latência sob carga intensa.",
    accent: "#A855F7",
  },
  {
    visual: <MockIntegration />,
    title: "Integrações e Microsserviços",
    what: "Conexão de ecossistemas corporativos via RabbitMQ, Kafka e webhooks.",
    problem: "Sistemas isolados que exigem retrabalho manual e geram dados inconsistentes.",
    how: "Comunicação assíncrona, tolerância a falhas e sincronização de dados em tempo real.",
    description: "Conexão de ecossistemas corporativos via RabbitMQ, Kafka e webhooks, garantindo comunicação assíncrona, tolerância a falhas e sincronização em tempo real.",
    accent: "#10b981",
  },
  {
    visual: <MockArchitecture />,
    title: "Arquitetura de Software",
    what: "Design de microsserviços e monólitos modulares com Clean Architecture, DDD e BFF.",
    problem: "Código espaguete, custos astronômicos de manutenção e medo de mexer no sistema.",
    how: "Separação de responsabilidades em camadas, decisões em ADRs e manutenibilidade contínua.",
    description: "Design de microsserviços e monólitos modulares com Clean Architecture, DDD, padrões Hexagonal e BFF, preparados para crescimento contínuo e manutenibilidade.",
    accent: "#A855F7",
  },
  {
    visual: <MockMaintenance />,
    title: "Modernização e Evolução de Legados",
    what: "Migração incremental de sistemas legados aplicando o Strangler Fig Pattern.",
    problem: "Risco e custo proibitivo de tentar reconstruir todo o sistema do zero.",
    how: "Substituição gradual módulo a módulo sem parada operacional e com testes automatizados.",
    description: "Migração incremental sem parada operacional aplicando Strangler Fig Pattern, refatoração de código com testes automatizados e ganho expressivo de performance.",
    accent: "#10b981",
  },
  {
    visual: <MockConsulting />,
    title: "Consultoria Técnica e Code Review",
    what: "Diagnóstico profundo de arquitetura, análise de vulnerabilidades e mentoria.",
    problem: "Insegurança técnica em entregas críticas e débitos acumulados na esteira.",
    how: "Auditoria de código, plano de refatoração priorizado e implantação de SDD com IA.",
    description: "Diagnóstico de gargalos, análise estática de vulnerabilidades, mentoria técnica e auditoria de arquitetura para elevar a maturidade do seu time.",
    accent: "#f59e0b",
  },
];

/* ─── Component ──────────────────────────────────────────────── */

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════
           SERVICES SECTION — Light + Dark Mode
        ══════════════════════════════════════════════════ */

        /* ── card ── */
        .svc-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--card));
          transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04);
        }
        .dark .svc-card {
          box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .svc-card:hover {
          transform: translateY(-4px);
          border-color: hsl(var(--primary) / 0.35);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.06), 0 0 0 1px hsl(var(--primary) / 0.12);
        }
        .dark .svc-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px hsl(var(--primary) / 0.2);
        }

        /* ── visual / mockup area ── */
        .svc-visual-area {
          padding: 24px 24px 20px;
          min-height: 160px;
          background: hsl(var(--secondary) / 0.5);
          border-bottom: 1px solid hsl(var(--border));
          display: flex;
          align-items: flex-start;
          position: relative;
          overflow: hidden;
        }
        .dark .svc-visual-area {
          background: rgba(0,0,0,0.2);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* ── mockup shared base ── */
        .svc-mockup {
          font-family: ui-monospace, 'Geist Mono', monospace;
          width: 100%;
          height: 100%;
        }

        /* generic muted bar/block for light/dark */
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

        /* API mock code lines */
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

        /* Architecture layers */
        .svc-arch-layer {
          padding: 6px 10px;
          border-radius: 6px;
          background: hsl(var(--secondary) / 0.6);
          border: 1px solid hsl(var(--border));
          display: flex;
          align-items: center;
          gap: 6px;
          color: hsl(var(--muted-foreground));
        }

        /* Diff lines */
        .svc-diff-line { padding-left: 4px; border-radius: 2px; }
        .svc-diff-remove { color: #dc2626; background: rgba(239,68,68,0.06); }
        .dark .svc-diff-remove { color: #f87171; }
        .svc-diff-add { color: #16a34a; background: rgba(34,197,94,0.06); }
        .dark .svc-diff-add { color: #4ade80; }
        .svc-diff-neutral { color: hsl(var(--muted-foreground)); opacity: 0.6; }

        /* Chat bubble */
        .svc-chat-bubble {
          flex: 1;
          padding: 4px 8px;
          border-radius: 6px;
          background: hsl(var(--secondary) / 0.5);
          border: 1px solid hsl(var(--border));
          color: hsl(var(--muted-foreground));
          line-height: 1.5;
        }
      `}</style>

      <section id="servicos" className="relative py-24 bg-secondary/30" ref={ref}>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <SectionHeader
              tagline="Serviços"
              title="Soluções de engenharia de ponta a ponta"
              subtitle="Do planejamento à entrega em produção: desenvolvemos software com rigor arquitetural, testes automatizados e foco em performance para o seu negócio."
            />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="svc-card"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Visual area */}
                <div className="svc-visual-area">
                  {/* accent glow in corner */}
                  <div style={{
                    position: "absolute",
                    top: -40, right: -40,
                    width: 130, height: 130,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${service.accent}15 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }} />
                  {service.visual}
                </div>

                {/* Text area */}
                <div style={{ padding: "18px 22px 22px" }}>
                  <h3 style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    letterSpacing: "-0.015em",
                    marginBottom: 8,
                    color: "hsl(var(--foreground))",
                    lineHeight: 1.3,
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "0.75rem",
                    color: "hsl(var(--muted-foreground))",
                    lineHeight: 1.65,
                    marginBottom: 10,
                  }}>
                    {service.description}
                  </p>
                  <div className="pt-2.5 border-t border-border/40 flex items-start gap-1.5 text-[11px] font-mono text-muted-foreground/90">
                    <span className="text-primary font-semibold shrink-0">Problema:</span>
                    <span className="line-clamp-2">{service.problem}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
