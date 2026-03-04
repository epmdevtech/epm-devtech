import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Mail, Phone, Clock, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  message: z.string().min(20, "Descreva seu projeto em ao menos 20 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const PROJECT_TYPES = [
  "Site / Landing Page",
  "Sistema Web",
  "Aplicativo Mobile",
  "API / Back-end",
  "Consultoria",
  "Outro",
];

const contactInfo = [
  {
    icon: Mail,
    label: "E-mail",
    value: "elessandrodev@gmail.com",
    href: "mailto:elessandrodev@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+55 (XX) XXXXX-XXXX",
    href: "https://wa.me/55XXXXXXXXXXX",
  },
  {
    icon: Clock,
    label: "Tempo de resposta",
    value: "Até 24 horas úteis",
    href: null,
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || "Não informado",
          project_type: data.projectType,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      toast.success("Mensagem enviada! Retornarei em breve.");
      reset();
    } catch {
      toast.error("Falha ao enviar. Tente novamente ou use o e-mail direto.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contato" className="relative py-24 bg-secondary/30" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />

      <div className="container px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-mono text-xs uppercase tracking-widest mb-4 block">
            Contato
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
            Vamos Construir{" "}
            <span className="text-gradient">Juntos</span>
          </h2>
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            Pronto para transformar sua ideia em realidade? Preencha o formulário
            e retornarei em até 24 horas úteis.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            <div>
              <h3 className="font-mono font-semibold uppercase tracking-wide text-xs mb-2">Fale comigo</h3>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                Tem um projeto em mente? Adoraria ouvir sobre ele e entender como posso ajudar.
              </p>
            </div>

            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 bg-card border border-border rounded-2xl p-5 sm:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">
                    Nome completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    autoComplete="name"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">
                    E-mail <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    autoComplete="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Phone + Project type */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">WhatsApp / Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+55 (11) 99999-9999"
                    autoComplete="tel"
                    {...register("phone")}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="projectType">
                    Tipo de projeto <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    name="projectType"
                    onValueChange={(val) =>
                      setValue("projectType", val, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      id="projectType"
                      className={errors.projectType ? "border-destructive focus-visible:ring-destructive" : ""}
                    >
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="text-xs text-destructive">{errors.projectType.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="message">
                  Mensagem <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Descreva seu projeto, prazo estimado e informações relevantes..."
                  rows={5}
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  className={`resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending}
                style={{
                  width: "100%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#ffffff",
                  background: "hsl(var(--primary))",
                  boxShadow: "0 4px 14px 0 hsl(var(--primary) / 0.35)",
                  border: "none",
                  cursor: isSending ? "not-allowed" : "pointer",
                  opacity: isSending ? 0.7 : 1,
                  transition: "box-shadow 0.25s ease, transform 0.2s ease, opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSending) {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px 0 hsl(var(--primary) / 0.5)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px 0 hsl(var(--primary) / 0.35)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
                onMouseDown={(e) => {
                  if (!isSending) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(1px) scale(0.98)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 8px 0 hsl(var(--primary) / 0.25)";
                  }
                }}
                onMouseUp={(e) => {
                  if (!isSending) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px 0 hsl(var(--primary) / 0.5)";
                  }
                }}
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
