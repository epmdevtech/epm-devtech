import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Mail, Phone, Clock, Send, Loader2, Maximize2 } from "lucide-react";
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

const contactInfo = [
  {
    icon: Mail,
    label: "E-mail direto",
    value: "elessandro@epmdevtech.com.br",
    href: "mailto:elessandro@epmdevtech.com.br",
  },
  {
    icon: Phone,
    label: "WhatsApp direto",
    value: "(45) 99917-8290",
    href: "https://wa.me/5545999178290",
  },
  {
    icon: Clock,
    label: "Tempo de resposta",
    value: "Retorno técnico em até 24 horas úteis",
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
      // Inicializa com a public key antes de enviar
      emailjs.init({ publicKey });

      // Nomes das variáveis coincidem com o template no EmailJS
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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <SectionHeader
            tagline="Contato"
            title="Vamos entender o seu desafio"
            subtitle="Não precisa ter todos os requisitos definidos. Conte-nos o que está acontecendo, qual processo precisa melhorar ou o que você gostaria de construir. A partir disso, podemos entender a sua necessidade e avaliar o melhor caminho técnico."
          />
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
          {/* Contact info - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="mb-1">
              <h3 className="font-semibold text-zinc-900 dark:text-white text-sm mb-1 tracking-tight">
                Canais diretos
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Prefere um contato mais ágil? Fale diretamente com a liderança técnica por e-mail ou WhatsApp.
              </p>
            </div>

            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-200"
              >
                <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5 font-medium">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form - Right Column (Tech Slim Card) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Nome completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className={`h-10 text-sm bg-zinc-50/60 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 dark:focus-visible:border-emerald-400 transition-all ${
                      errors.name ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    E-mail profissional <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu.email@empresa.com"
                    autoComplete="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    className={`h-10 text-sm bg-zinc-50/60 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 dark:focus-visible:border-emerald-400 transition-all ${
                      errors.email ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Phone + Project type */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    WhatsApp / Telefone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+55 (45) 99999-9999"
                    autoComplete="tel"
                    {...register("phone")}
                    className="h-10 text-sm bg-zinc-50/60 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 dark:focus-visible:border-emerald-400 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="projectType" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
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
                      className={`h-10 text-sm bg-zinc-50/60 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all ${
                        errors.projectType ? "border-destructive focus-visible:ring-destructive" : ""
                      }`}
                    >
                      <SelectValue placeholder="Selecione o tipo de projeto..." />
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
              <div className="flex flex-col gap-1.5 relative">
                <div className="flex items-center justify-between">
                  <Label htmlFor="message" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
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
                  className={`text-sm bg-zinc-50/60 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 rounded-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 dark:focus-visible:border-emerald-400 resize-none transition-all ${
                    errors.message ? "border-destructive focus-visible:ring-destructive" : ""
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Botão de Envio (Slim Tech CTA) */}
              <button
                type="submit"
                disabled={isSending}
                className="btn-submit group h-11 w-full inline-flex items-center justify-center gap-2 px-6 rounded-lg font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] shadow-sm hover:shadow-emerald-500/20 hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border-none"
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
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
