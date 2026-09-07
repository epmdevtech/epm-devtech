import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { CheckCircle2, Clock, ShieldCheck, Send, Loader2, Maximize2 } from "lucide-react";
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

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  message: z.string().min(20, "Descreva seu projeto em ao menos 20 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const PROJECT_TYPES = [
  "Novo Sistema ou Aplicação Web",
  "Modernização de Sistema Legado",
  "APIs, Microsserviços e Integrações",
  "Consultoria Técnica e Arquitetura",
  "Outro Desafio",
];

const nextSteps = [
  {
    icon: CheckCircle2,
    title: "Diagnóstico Técnico",
    description:
      "Avaliamos seu cenário, gargalos e viabilidade arquitetural logo no primeiro contato.",
  },
  {
    icon: Clock,
    title: "Retorno em até 24 Horas",
    description:
      "Resposta rápida para agendarmos uma conversa técnica sem enrolação.",
  },
  {
    icon: ShieldCheck,
    title: "Sigilo e Segurança",
    description:
      "Suas ideias, dados e regras de negócio tratados com absoluta confidencialidade.",
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

      const result = await emailjs.send(serviceId, templateId, templateParams);
      console.info("[EmailJS] Enviado com sucesso:", result.status, result.text);
      toast.success("Mensagem enviada! Retornarei em breve.");
      reset();
    } catch (err: unknown) {
      const error = err as { status?: number; text?: string };
      console.error("[EmailJS] Erro:", "status:", error?.status, "| text:", error?.text, "| raw:", err);
      const msg = error?.text ?? "erro desconhecido";
      toast.error(`Falha ao enviar (${error?.status ?? "?"}): ${msg}. Use o e-mail direto se persistir.`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contato" className="relative py-24 bg-secondary/30 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />

      <div className="container px-6 relative z-10">
        {/* Cabeçalho Externo da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <SectionHeader
            tagline="Contato"
            title="Vamos entender o seu desafio"
            subtitle="Não precisa ter todos os requisitos definidos. Conte-nos o que está acontecendo, qual processo precisa melhorar ou o que você gostaria de construir. Avaliaremos o melhor caminho técnico."
          />
        </motion.div>

        {/* Container Principal: Split Card Unificado */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-zinc-200/80 dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-12 bg-card"
        >
          {/* Lado Esquerdo: Formulário Minimalista Underline */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
                Envie sua mensagem
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
                {/* Linha 1: Nome + Email */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Nome Completo */}
                  <div className="flex flex-col">
                    <Label
                      htmlFor="name"
                      className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1"
                    >
                      Nome completo <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      autoComplete="name"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                      className={`h-auto border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-emerald-500 transition-colors shadow-none ${
                        errors.name
                          ? "border-destructive focus-visible:border-destructive"
                          : "border-zinc-300 dark:border-zinc-700"
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
                      className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1"
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
                      className={`h-auto border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-emerald-500 transition-colors shadow-none ${
                        errors.email
                          ? "border-destructive focus-visible:border-destructive"
                          : "border-zinc-300 dark:border-zinc-700"
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
                      className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1"
                    >
                      WhatsApp / Telefone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+55 (45) 99999-9999"
                      autoComplete="tel"
                      {...register("phone")}
                      className="h-auto border-0 border-b border-zinc-300 dark:border-zinc-700 bg-transparent rounded-none px-0 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-emerald-500 transition-colors shadow-none"
                    />
                  </div>

                  {/* Desafio ou Tipo de Projeto */}
                  <div className="flex flex-col relative w-full">
                    <Label
                      htmlFor="projectType"
                      className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1"
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
                        className={`w-full h-auto border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:ring-0 focus:border-emerald-500 transition-colors shadow-none ${
                          errors.projectType
                            ? "border-destructive"
                            : "border-zinc-300 dark:border-zinc-700"
                        }`}
                      >
                        <SelectValue placeholder="Selecione o tipo de projeto..." />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        sideOffset={0}
                        className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-trigger-width)] data-[side=bottom]:translate-y-0 z-50 shadow-lg rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-hidden p-1"
                      >
                        {PROJECT_TYPES.map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-left px-3 py-2 text-sm truncate rounded-md cursor-pointer focus:bg-zinc-100 dark:focus:bg-zinc-800 focus:text-zinc-900 dark:focus:text-zinc-100"
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
                      className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                    >
                      Mensagem <span className="text-destructive">*</span>
                    </Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                          aria-label="Expandir mensagem"
                          title="Abrir bloco de notas para texto longo"
                        >
                          <Maximize2 className="w-3 h-3 mr-1.5" />
                          Expandir
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] w-[800px] h-[80vh] flex flex-col p-6">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            Detalhe seu Desafio
                          </DialogTitle>
                          <DialogDescription>
                            Use este espaço amplo para descrever com conforto o processo que quer otimizar ou o sistema que pretende construir.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 min-h-0 mt-4 relative">
                          <Textarea
                            placeholder="Conte resumidamente qual processo quer otimizar ou qual sistema pretende construir..."
                            className="h-full resize-none text-base p-4 border-muted-foreground/20 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
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
                    className={`border-0 border-b bg-transparent rounded-none px-0 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-emerald-500 transition-colors shadow-none resize-none ${
                      errors.message
                        ? "border-destructive focus-visible:border-destructive"
                        : "border-zinc-300 dark:border-zinc-700"
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
                    disabled={isSending}
                    className="btn-submit group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] shadow-sm hover:shadow-emerald-500/20 hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border-none w-full sm:w-auto"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Lado Direito: Próximos Passos & Garantias (Bloco Escuro Contrastante) */}
          <div className="lg:col-span-5 bg-zinc-900 text-white dark:bg-zinc-950 p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-800">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                O que acontece a seguir?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-8">
                Nosso processo é direto com a engenharia, sem intermediários comerciais:
              </p>

              {/* Lista de Próximos Passos e Garantias */}
              <div className="flex flex-col gap-6">
                {nextSteps.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-zinc-700/80 transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chamada de Ação Rápida (Rodapé do Card Escuro) */}
            <div className="pt-6 mt-8 border-t border-zinc-800/80 flex flex-col gap-1.5">
              <p className="text-xs text-zinc-400">
                Prefere atendimento imediato?
              </p>
              <a
                href="https://wa.me/5545999178290"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group w-fit"
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
