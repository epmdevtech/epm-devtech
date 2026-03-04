import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Visual Mockups ─────────────────────────────────────────── */

function MockBrowser() {
  return (
    <div style={{ fontFamily: "monospace", width: "100%", height: "100%" }}>
      {/* browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <div style={{ flex: 1, height: 14, background: "rgba(255,255,255,0.07)", borderRadius: 4, marginLeft: 6 }} />
      </div>
      {/* fake nav bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {["Home", "Sobre", "Serviços"].map(l => (
          <div key={l} style={{ padding: "3px 10px", borderRadius: 4, background: "rgba(255,255,255,0.06)", fontSize: 9, color: "rgba(255,255,255,0.5)" }}>{l}</div>
        ))}
      </div>
      {/* hero block */}
      <div style={{ background: "rgba(41,121,255,0.12)", borderRadius: 6, padding: "10px 12px", marginBottom: 8 }}>
        <div style={{ width: "55%", height: 7, background: "rgba(255,255,255,0.25)", borderRadius: 3, marginBottom: 5 }} />
        <div style={{ width: "40%", height: 5, background: "rgba(255,255,255,0.12)", borderRadius: 3, marginBottom: 8 }} />
        <div style={{ width: 60, height: 20, background: "linear-gradient(135deg,#2979FF,#A855F7)", borderRadius: 4 }} />
      </div>
      {/* 3 card blocks */}
      <div style={{ display: "flex", gap: 6 }}>
        {[0.9, 0.6, 0.75].map((o, i) => (
          <div key={i} style={{ flex: 1, height: 28, background: `rgba(255,255,255,${o * 0.07})`, borderRadius: 5 }} />
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
    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, lineHeight: 1.8, width: "100%" }}>
      <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
        <div style={{ padding: "2px 8px", borderRadius: 4, background: "rgba(41,121,255,0.2)", color: "#60a5fa", fontSize: 8, fontWeight: 700 }}>GET</div>
        <div style={{ flex: 1, height: 18, background: "rgba(255,255,255,0.07)", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8, color: "rgba(255,255,255,0.4)", fontSize: 8 }}>/api/v1/users</div>
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.type === "comment" ? "rgba(255,255,255,0.3)" : l.type === "response" ? "#4ade80" : "rgba(255,255,255,0.55)" }}>
          {l.type !== "blank" && (
            <span>{l.text}{l.value ? <span style={{ color: "#a78bfa" }}> {l.value}</span> : null}</span>
          )}
        </div>
      ))}
      <div style={{ marginTop: 8, padding: "6px 8px", background: "rgba(74,222,128,0.08)", borderRadius: 5, border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80", fontSize: 8 }}>
        ✓ 200 OK — 42ms
      </div>
    </div>
  );
}

function MockIntegration() {
  const nodes = [
    { label: "CRM", x: 0, color: "#2979FF" },
    { label: "ERP", x: 1, color: "#A855F7" },
    { label: "API Hub", x: 0.5, color: "#0EA5E9", center: true },
    { label: "Email", x: 2, color: "#10b981" },
    { label: "DB", x: 1, color: "#f59e0b" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      {/* center hub */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <div style={{ padding: "4px 14px", borderRadius: 6, background: "rgba(14,165,233,0.2)", border: "1px solid rgba(14,165,233,0.4)", color: "#0EA5E9", fontSize: 9, fontFamily: "monospace", fontWeight: 700 }}>API Hub</div>
      </div>
      {/* connection lines row */}
      <div style={{ display: "flex", justifyContent: "center", height: 14, alignItems: "center" }}>
        <div style={{ width: "80%", height: 1, background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }} />
      </div>
      {/* services row */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {[{ label: "CRM", color: "#2979FF" }, { label: "ERP", color: "#A855F7" }, { label: "Email", color: "#10b981" }, { label: "DB", color: "#f59e0b" }].map(n => (
          <div key={n.label} style={{ padding: "3px 8px", borderRadius: 5, background: `${n.color}18`, border: `1px solid ${n.color}40`, color: n.color, fontSize: 8, fontFamily: "monospace" }}>{n.label}</div>
        ))}
      </div>
      {/* event badge */}
      <div style={{ marginTop: 6, display: "flex", gap: 5 }}>
        <div style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(168,85,247,0.15)", color: "#a78bfa", fontSize: 8, fontFamily: "monospace" }}>event.publish()</div>
        <div style={{ padding: "2px 7px", borderRadius: 4, background: "rgba(16,185,129,0.12)", color: "#4ade80", fontSize: 8, fontFamily: "monospace" }}>webhook → OK</div>
      </div>
    </div>
  );
}

function MockArchitecture() {
  const layers = [
    { label: "Presentation Layer", color: "#2979FF", opacity: 0.18 },
    { label: "Application / Use Cases", color: "#A855F7", opacity: 0.18 },
    { label: "Domain / Business Logic", color: "#0EA5E9", opacity: 0.22 },
    { label: "Infrastructure / DB / Queue", color: "#6b7280", opacity: 0.14 },
  ];
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
      {layers.map((l, i) => (
        <div key={i} style={{ padding: "6px 10px", borderRadius: 6, background: `rgba(${l.color === "#2979FF" ? "41,121,255" : l.color === "#A855F7" ? "168,85,247" : l.color === "#0EA5E9" ? "14,165,233" : "107,114,128"},${l.opacity})`, border: `1px solid rgba(255,255,255,0.07)`, display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: l.color, flexShrink: 0 }} />
          <span style={{ fontFamily: "monospace", fontSize: 8, color: "rgba(255,255,255,0.55)" }}>{l.label}</span>
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
    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 8.5, lineHeight: 1.9, width: "100%" }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        <div style={{ padding: "2px 7px", background: "rgba(239,68,68,0.15)", borderRadius: 4, color: "#f87171", fontSize: 8 }}>legacy</div>
        <div style={{ padding: "2px 7px", background: "rgba(74,222,128,0.12)", borderRadius: 4, color: "#4ade80", fontSize: 8 }}>refactored</div>
      </div>
      {diff.map((l, i) => (
        <div key={i} style={{ color: l.type === "remove" ? "#f87171" : l.type === "add" ? "#4ade80" : "rgba(255,255,255,0.35)", background: l.type === "remove" ? "rgba(239,68,68,0.06)" : l.type === "add" ? "rgba(74,222,128,0.06)" : "transparent", paddingLeft: 4, borderRadius: 2 }}>
          {l.text}
        </div>
      ))}
    </div>
  );
}

function MockConsulting() {
  const comments = [
    { user: "EPM", msg: "Revisei a arquitetura — 3 pontos críticos", color: "#2979FF" },
    { user: "Code", msg: "N+1 query detectado em UserService.ts:42", color: "#f59e0b" },
    { user: "EPM", msg: "✓ Solução: eager loading com joinQuery()", color: "#4ade80" },
  ];
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 7 }}>
      {comments.map((c, i) => (
        <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${c.color}30`, border: `1px solid ${c.color}60`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 7, color: c.color, fontWeight: 700, fontFamily: "monospace" }}>{c.user[0]}</div>
          <div style={{ flex: 1, padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 8.5, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", lineHeight: 1.5 }}>{c.msg}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const services = [
  {
    visual: <MockBrowser />,
    title: "Desenvolvimento de Sistemas Web",
    description: "Aplicações web modernas, responsivas e otimizadas para performance. SPAs com Angular, Vue.js e React.",
    accent: "#2979FF",
  },
  {
    visual: <MockAPI />,
    title: "APIs & Backends Robustos",
    description: "APIs REST e SOAP escaláveis com PHP/Laravel e Node.js. Arquitetura preparada para alto volume de requisições.",
    accent: "#A855F7",
  },
  {
    visual: <MockIntegration />,
    title: "Integrações de Sistemas",
    description: "Conexão entre sistemas internos e externos, mensageria com RabbitMQ e Kafka, webhooks e sincronização.",
    accent: "#0EA5E9",
  },
  {
    visual: <MockArchitecture />,
    title: "Arquitetura de Software",
    description: "Design de arquiteturas sólidas: microserviços, monolitos bem estruturados, hexagonal e BFF.",
    accent: "#A855F7",
  },
  {
    visual: <MockMaintenance />,
    title: "Manutenção & Evolução",
    description: "Suporte contínuo, correção de bugs, melhorias de performance e modernização de sistemas legados.",
    accent: "#10b981",
  },
  {
    visual: <MockConsulting />,
    title: "Consultoria Técnica",
    description: "Análise de viabilidade, revisão de código, mentoria técnica e apoio em decisões de arquitetura.",
    accent: "#f59e0b",
  },
];

/* ─── Component ──────────────────────────────────────────────── */

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="relative py-24 bg-secondary/30" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
            Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
            Soluções <span className="text-gradient">End-to-End</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Do planejamento à entrega, oferecemos serviços completos de desenvolvimento
            de software com foco em qualidade e resultados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "hsl(var(--card))",
                transition: "border-color 0.5s ease, box-shadow 0.5s ease",
              }}
              whileHover={{
                boxShadow: `0 0 0 1px ${service.accent}40, 0 8px 32px ${service.accent}18`,
              }}
            >
              {/* Visual area */}
              <div
                style={{
                  padding: "24px 24px 20px",
                  minHeight: 160,
                  background: "rgba(0,0,0,0.25)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "flex-start",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* accent glow in corner */}
                <div style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${service.accent}20 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />
                {service.visual}
              </div>

              {/* Text area */}
              <div style={{ padding: "18px 22px 22px" }}>
                <h3
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    marginBottom: 6,
                    color: "hsl(var(--foreground))",
                    lineHeight: 1.3,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "0.7rem",
                    color: "hsl(var(--muted-foreground))",
                    lineHeight: 1.7,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
