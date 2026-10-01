import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { CheckCircle2, Send, Loader2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatBrazilianPhone, validateBrazilianPhone } from "@/lib/phone";
import {
  IconTechnicalDiagnostic,
  IconFastResponse,
  IconConfidentiality,
} from "@/components/icons";

const formSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo"),
  email: z.string().trim().email("Informe um e-mail corporativo válido"),
  phone: z.string().trim().optional().refine(validateBrazilianPhone, {
    message: "Informe um número de WhatsApp/Telefone válido com DDD (ex: 45 99999-9999)",
  }),
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  message: z.string().trim().min(15, "Descreva seu projeto com pelo menos 15 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const PROJECT_TYPES = [
  "Sistema, portal ou site institucional",
  "APIs e integrações",
  "Modernização de sistema legado",
  "Consultoria ou avaliação técnica",
  "Outro",
];

const nextSteps = [
  {
    Icon: IconTechnicalDiagnostic,
    title: "Diagnóstico técnico",
    description:
      "Avaliamos seu cenário, gargalos e viabilidade arquitetural logo no primeiro contato.",
  },
  {
    Icon: IconFastResponse,
    title: "Retorno em até 24 horas úteis",
    description:
      "Resposta objetiva para agendarmos uma conversa.",
  },
  {
    Icon: IconConfidentiality,
    title: "Sigilo e confidencialidade",
    description:
      "Suas ideias, dados e regras de negócio tratados sob sigilo e proteção, com NDA quando solicitado.",
  },
];

export interface ContactProps {
  hideHeader?: boolean;
}

const Contact: React.FC<ContactProps> = ({ hideHeader = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Configuração de e-mail incompleta. Use o contato direto.");
      console.error("[EmailJS] Variáveis de ambiente não definidas:", { serviceId, templateId, publicKey });
      return;
    }

    setIsSending(true);
    try {
      emailjs.init({ publicKey });

      const templateParams = {
        name: data.name,
        email: data.email,
        title: `${data.projectType}: ${data.name}`,
        message: `${data.message}\n\nTelefone: ${data.phone || "Não informado"}\nTipo: ${data.projectType}`,
        time: new Date().toLocaleString("pt-BR"),
      };

      await emailjs.send(serviceId, templateId, templateParams);
      toast.success("Mensagem enviada com sucesso! Retornaremos em breve.");
      setIsSuccess(true);
      reset();
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (err: unknown) {
      const error = err as { status?: number; text?: string };
      console.error("[EmailJS] Falha no disparo:", "status:", error?.status, "| text:", error?.text, "| raw:", err);
      toast.error("Falha ao enviar mensagem no momento. Por favor, utilize o contato direto pelo WhatsApp.", {
        description: "Seu atendimento será realizado com a mesma prioridade diretamente pela engenharia.",
        action: {
          label: "Chamar no WhatsApp",
          onClick: () => window.open("https://wa.me/5545999178290", "_blank", "noopener,noreferrer"),
        },
        duration: 8000,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contato" aria-labelledby="contato-heading" className="relative py-24 bg-secondary/30 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />

      <div className="container px-6 relative z-10">
        {/* Cabeçalho Externo da Seção */}
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <SectionHeader
              id="contato-heading"
              tagline="Contato"
              title="Fale sobre seu projeto"
              subtitle="Conte o que sua empresa precisa. Vamos entender o cenário e avaliar como a EPM DevTech pode ajudar."
            />
          </motion.div>
        )}

        {/* Container Principal: Split Card Unificado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-border-default grid grid-cols-1 lg:grid-cols-12 bg-surface"
        >
          {/* Lado Esquerdo: Formulário Minimalista Underline */}
          <div className="lg:col-span-7 bg-surface p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary tracking-tight mb-6">
                Envie sua mensagem
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                {/* Linha 1: Nome + Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Nome Completo */}
                  <div className="flex flex-col">
                    <Label
                      htmlFor="name"
                      className="text-xs font-medium text-muted uppercase tracking-wider mb-1"
                    >
                      Nome completo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      autoComplete="name"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                      className={`h-auto border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-primary placeholder:text-muted focus-visible:ring-0 focus-visible:border-brand transition-colors shadow-none ${
                        errors.name
                          ? "border-destructive focus-visible:border-destructive"
                          : "border-border-default"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1.5">{errors.name.message}</p>
                    )}
                  </div>

                  {/* E-mail Profissional */}
                  <div className="flex flex-col">
                    <Label
                      htmlFor="email"
                      className="text-xs font-medium text-muted uppercase tracking-wider mb-1"
                    >
                      E-mail profissional <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@empresa.com"
                      autoComplete="email"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                      className={`h-auto border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-primary placeholder:text-muted focus-visible:ring-0 focus-visible:border-brand transition-colors shadow-none ${
                        errors.email
                          ? "border-destructive focus-visible:border-destructive"
                          : "border-border-default"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1.5">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Linha 2: Telefone + Tipo de Projeto */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* WhatsApp / Telefone */}
                  <div className="flex flex-col">
                    <Label
                      htmlFor="phone"
                      className="text-xs font-medium text-muted uppercase tracking-wider mb-1"
                    >
                      WhatsApp / Telefone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(45) 99999-9999"
                      autoComplete="tel"
                      {...register("phone")}
                      onChange={(e) => {
                        const formatted = formatBrazilianPhone(e.target.value);
                        e.target.value = formatted;
                        setValue("phone", formatted, { shouldValidate: true });
                      }}
                      aria-invalid={!!errors.phone}
                      className={`h-auto border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-primary placeholder:text-muted focus-visible:ring-0 focus-visible:border-brand transition-colors shadow-none ${
                        errors.phone
                          ? "border-destructive focus-visible:border-destructive"
                          : "border-border-default"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive mt-1.5">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Desafio ou Tipo de Projeto */}
                  <div className="flex flex-col relative w-full">
                    <Label
                      htmlFor="projectType"
                      className="text-xs font-medium text-muted uppercase tracking-wider mb-1"
                    >
                      Desafio ou Tipo de Projeto <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      name="projectType"
                      onValueChange={(val) =>
                        setValue("projectType", val, { shouldValidate: true })
                      }
                    >
                      <SelectTrigger
                        id="projectType"
                        className={`w-full h-auto border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-primary focus:ring-0 focus:border-brand transition-colors shadow-none ${
                          errors.projectType
                            ? "border-destructive"
                            : "border-border-default"
                        }`}
                      >
                        <SelectValue placeholder="Selecione o tipo de projeto..." />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        sideOffset={0}
                        className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)] data-[side=bottom]:translate-y-0 z-50 shadow-lg rounded-lg border border-border-default bg-surface overflow-hidden p-1"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-left px-3 py-2 text-sm truncate rounded-md cursor-pointer focus:bg-surface-elevated focus:text-primary"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.projectType && (
                      <p className="text-xs text-destructive mt-1.5">{errors.projectType.message}</p>
                    )}
                  </div>
                </div>

                {/* Linha 3: Mensagem */}
                <div className="flex flex-col relative">
                  <div className="flex items-center justify-between mb-1">
                    <Label
                      htmlFor="message"
                      className="text-xs font-medium text-muted uppercase tracking-wider"
                    >
                      Mensagem <span className="text-destructive">*</span>
                    </Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-muted hover:text-primary"
                          aria-label="Expandir mensagem"
                          title="Abrir bloco de notas para texto longo"
                        >
                          <Maximize2 className="w-3 h-3 mr-1.5" />
                          Expandir
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] w-[800px] h-[80vh] flex flex-col p-6">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold tracking-tight text-primary">
                            Detalhe seu Desafio
                          </DialogTitle>
                          <DialogDescription>
                            Use este espaço amplo para descrever com conforto o processo que quer otimizar ou o sistema que pretende construir.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 min-h-0 mt-4 relative">
                          <Textarea
                            placeholder="Conte resumidamente qual processo quer otimizar ou qual sistema pretende construir..."
                            className="h-full resize-none text-base p-4 border-border-default focus-visible:ring-brand/20 focus-visible:border-brand"
                            {...register("message")}
                            onChange={(e) => {
                              setValue("message", e.target.value, { shouldValidate: true });
                            }}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Textarea
                    id="message"
                    placeholder="Conte resumidamente qual processo quer otimizar ou qual sistema pretende construir..."
                    rows={4}
                    {...register("message")}
                    aria-invalid={!!errors.message}
                    className={`border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-primary placeholder:text-muted focus-visible:ring-0 focus-visible:border-brand transition-colors shadow-none resize-none ${
                      errors.message
                        ? "border-destructive focus-visible:border-destructive"
                        : "border-border-default"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1.5">{errors.message.message}</p>
                  )}
                </div>

                {/* Botão de Envio (Slim CTA alinhado à esquerda) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending || isSuccess}
                    className={`btn-submit group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed border-none w-full sm:w-auto shadow-sm ${
                      isSuccess
                        ? "bg-success text-white shadow-sm"
                        : "bg-brand text-on-brand hover:bg-brand-hover active:bg-brand-active active:scale-[0.99]"
                    }`}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-on-brand" />
                        <span className="text-on-brand">Enviando...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white animate-in zoom-in-50 duration-200" />
                        <span className="text-white">Mensagem Enviada!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-on-brand transition-transform duration-200 group-hover:translate-x-0.5" />
                        <span className="text-on-brand">Falar sobre meu projeto</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Lado Direito: Próximos Passos & Garantias (Bloco Escuro Contrastante) */}
          <div className="lg:col-span-5 bg-surface-elevated text-primary p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border-default">
            <div>
              <h3 className="text-xl font-bold text-primary tracking-tight mb-2">
                O que acontece a seguir?
              </h3>
              <p className="text-xs text-secondary leading-relaxed mb-8">
                Transparência e foco técnico desde o primeiro contato:
              </p>

              {/* Lista de Próximos Passos e Garantias */}
              <div className="flex flex-col gap-6">
                {nextSteps.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl border border-border-subtle bg-surface flex items-center justify-center text-secondary shrink-0 group-hover:border-brand/50 group-hover:text-brand transition-colors">
                      <item.Icon size={20} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-primary mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chamada de Ação Rápida (Rodapé do Card Escuro) */}
            <div className="pt-6 mt-8 border-t border-border-subtle flex flex-col gap-1.5">
              <p className="text-xs text-muted">
                Prefere atendimento imediato?
              </p>
              <a
                href="https://wa.me/5545999178290"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-text-brand hover:text-brand transition-colors inline-flex items-center gap-1 group w-fit"
              >
                <span>Chamar no WhatsApp direto →</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
