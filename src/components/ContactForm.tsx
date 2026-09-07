import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const PROJECT_TYPES = [
  "Novo Sistema ou Aplicação Web",
  "Modernização de Sistema Legado",
  "APIs, Microsserviços e Integrações",
  "Consultoria Técnica e Arquitetura",
  "Outro Desafio",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string({ required_error: "Informe seu nome completo" })
    .trim()
    .min(3, "Informe seu nome completo (mínimo de 3 caracteres)"),
  email: z
    .string({ required_error: "Informe um e-mail corporativo válido" })
    .trim()
    .email("Informe um e-mail corporativo válido"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        const digits = val.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 13;
      },
      { message: "Informe um telefone válido com DDD (mínimo de 10 dígitos)" }
    ),
  projectType: z
    .string({ required_error: "Selecione o tipo de projeto ou desafio" })
    .min(1, "Selecione o tipo de projeto ou desafio"),
  message: z
    .string({ required_error: "Descreva brevemente o seu desafio" })
    .trim()
    .min(10, "Descreva brevemente o seu desafio (mínimo de 10 caracteres)"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
  onSubmitSuccess?: (data: ContactFormData) => Promise<void> | void;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmitSuccess,
  className,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      if (onSubmitSuccess) {
        await onSubmitSuccess(data);
      } else {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          toast.error("Configuração de e-mail incompleta. Utilize o contato direto via WhatsApp.", {
            action: {
              label: "Chamar no WhatsApp",
              onClick: () => window.open("https://wa.me/5545999178290", "_blank", "noopener,noreferrer"),
            },
          });
          return;
        }

        emailjs.init({ publicKey });

        const templateParams = {
          name: data.name,
          email: data.email,
          title: `${data.projectType}: ${data.name}`,
          message: `${data.message}\n\nTelefone: ${data.phone || "Não informado"}\nTipo: ${data.projectType}`,
          time: new Date().toLocaleString("pt-BR"),
        };

        await emailjs.send(serviceId, templateId, templateParams);
      }

      toast.success("Mensagem enviada com sucesso! Retornarei em breve.");
      setIsSuccess(true);
      form.reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (err: unknown) {
      const error = err as { status?: number; text?: string };
      console.error("[ContactForm] Falha no disparo:", error?.status, error?.text, err);

      toast.error("Falha ao enviar mensagem no momento. Por favor, utilize o contato direto pelo WhatsApp.", {
        description: "Seu atendimento será realizado com a mesma prioridade diretamente pela engenharia.",
        action: {
          label: "Chamar no WhatsApp",
          onClick: () => window.open("https://wa.me/5545999178290", "_blank", "noopener,noreferrer"),
        },
        duration: 8000,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className={className ? `space-y-6 ${className}` : "space-y-6"}
        noValidate
      >
        {/* Linha 1: Nome Completo + E-mail Profissional */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nome completo <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  E-mail profissional <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu.email@empresa.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Linha 2: WhatsApp / Telefone + Desafio / Tipo de Projeto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp / Telefone (opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+55 (45) 99999-9999"
                    autoComplete="tel"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Desafio ou Tipo de Projeto <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o desafio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Linha 3: Mensagem */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mensagem <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte resumidamente qual processo quer otimizar ou qual sistema pretende construir..."
                  rows={4}
                  disabled={isSubmitting}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botão de Envio com estados de carregamento e confirmação */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`w-full sm:w-auto min-w-[180px] transition-all duration-200 ${
              isSuccess ? "bg-emerald-600 hover:bg-emerald-600 text-white" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4 text-white animate-in zoom-in-50 duration-200" />
                <span>Mensagem Enviada!</span>
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                <span>Enviar Mensagem</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
