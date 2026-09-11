import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, FileText } from "lucide-react";

interface LegalLinksProps {
  className?: string;
}

export function LegalLinks({ className }: LegalLinksProps) {
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  return (
    <>
      <div className={`flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 ${className || ""}`}>
        <button
          type="button"
          onClick={() => setOpenTerms(true)}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
        >
          Termos de Uso
        </button>
        <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
          ·
        </span>
        <button
          type="button"
          onClick={() => setOpenPrivacy(true)}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
        >
          Política de Privacidade
        </button>
      </div>

      {/* Modal: Termos de Uso */}
      <Dialog open={openTerms} onOpenChange={setOpenTerms}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-6 border-zinc-200 dark:border-zinc-800 bg-background text-foreground">
          <DialogHeader className="text-left pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <FileText className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Documento Legal</span>
            </div>
            <DialogTitle className="text-lg font-bold text-zinc-900 dark:text-white">
              Termos de Uso | EPM DEVTECH
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
              Condições gerais de navegação, contratação técnica e propriedade intelectual.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 max-h-[60vh] pr-4 mt-2">
            <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">1. Identificação da Empresa</h4>
                <p>
                  Este site é de titularidade e operado pela <strong>ELESSANDRO PRESTES MACEDO DESENVOLVIMENTO DE SOFTWARE LTDA</strong>,
                  inscrita no CNPJ/MF sob o nº <strong>60.710.574/0001-85</strong> (Matriz), com sede e foro na cidade de
                  Toledo, Estado do Paraná, atuando sob o nome fantasia <strong>EPM DEVTECH (ME)</strong>.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">2. Objeto e Finalidade</h4>
                <p>
                  O objetivo deste portal institucional é apresentar as competências técnicas, casos de sucesso,
                  serviços especializados de engenharia de software sob medida, desenvolvimento web/APIs e modernização
                  de sistemas legados oferecidos pela EPM DEVTECH, bem como fornecer um canal direto e seguro de contato.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">3. Propriedade Intelectual</h4>
                <p>
                  Todo o conteúdo exibido neste site, incluindo textos, códigos-fonte, arquitetura de software,
                  layouts, elementos gráficos, logomarcas, ícones e ilustrações interativas, é de propriedade exclusiva
                  da EPM DEVTECH ou utilizado sob autorização de seus titulares, estando integralmente protegido pela
                  Legislação Brasileira de Direitos Autorais (Lei nº 9.610/1998) e de Propriedade Industrial (Lei nº 9.279/1996).
                  É vedada a reprodução, cópia, distribuição ou engenharia reversa sem autorização prévia por escrito.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">4. Condições de Uso e Conduta</h4>
                <p>
                  O usuário compromete-se a utilizar este site de maneira ética e em estrita conformidade com a lei.
                  É terminantemente proibido: (a) tentar violar a segurança, autenticação ou integridade dos servidores;
                  (b) injetar scripts maliciosos, códigos destrutivos ou efetuar varreduras não autorizadas; (c) enviar
                  mensagens fraudulentas ou abusivas através dos formulários de contato disponibilizados.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">5. Limitação de Responsabilidade</h4>
                <p>
                  A EPM DEVTECH emprega as melhores práticas de engenharia e alta disponibilidade para garantir a
                  continuidade do serviço. No entanto, não nos responsabilizamos por indisponibilidades temporárias decorrentes
                  de falhas em redes públicas de telecomunicações, ataques cibernéticos em larga escala ou manutenções programadas.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">6. Contato e Foro</h4>
                <p>
                  Para esclarecimentos relativos a estes Termos de Uso, utilize o e-mail:{" "}
                  <a href="mailto:elessandro@epmdevtech.com.br" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                    elessandro@epmdevtech.com.br
                  </a>
                  . Fica eleito o Foro da Comarca de Toledo, Estado do Paraná, com exclusão de qualquer outro, por mais
                  privilegiado que seja, para dirimir eventuais litígios decorrentes deste termo.
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Modal: Política de Privacidade */}
      <Dialog open={openPrivacy} onOpenChange={setOpenPrivacy}>
        <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-6 border-zinc-200 dark:border-zinc-800 bg-background text-foreground">
          <DialogHeader className="text-left pb-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">Privacidade & Proteção de Dados</span>
            </div>
            <DialogTitle className="text-lg font-bold text-zinc-900 dark:text-white">
              Política de Privacidade (LGPD) | EPM DEVTECH
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
              Conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018).
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 max-h-[60vh] pr-4 mt-2">
            <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">1. Princípios e Controlador dos Dados</h4>
                <p>
                  A <strong>ELESSANDRO PRESTES MACEDO DESENVOLVIMENTO DE SOFTWARE LTDA</strong>, inscrita no CNPJ sob o nº{" "}
                  <strong>60.710.574/0001-85</strong> (EPM DEVTECH), atua como Controladora dos dados pessoais coletados
                  por este website, pautando-se pelos princípios da finalidade, adequação, necessidade, livre acesso, segurança
                  e transparência estabelecidos na LGPD.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">2. Dados Coletados e Base Legal</h4>
                <p>
                  Coletamos estritamente os dados necessários para o atendimento solicitado pelo usuário:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>
                    <strong>Formulário de Contato Comercial:</strong> Nome, endereço de e-mail corporativo, número de
                    WhatsApp/telefone e descrição do desafio técnico/projeto. Base Legal: Execução de procedimentos
                    preliminares relacionados a contrato a pedido do titular (Art. 7º, V da LGPD).
                  </li>
                  <li>
                    <strong>Dados de Navegação / Cookies Técnicos:</strong> Registros estritamente técnicos de preferência
                    de tema visual (dark/light mode) armazenados localmente no navegador, sem rastreamento invasivo.
                  </li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">3. Finalidade e Não Compartilhamento</h4>
                <p>
                  Os dados fornecidos são utilizados com a finalidade exclusiva de: (a) responder dúvidas técnicas; (b) agendar
                  reuniões de alinhamento de escopo; (c) elaborar e encaminhar propostas de serviços de desenvolvimento de software.
                  A EPM DEVTECH <strong>não comercializa, não aluga e não compartilha</strong> dados pessoais com terceiros
                  para fins comerciais, publicitários ou de marketing.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">4. Segurança da Informação</h4>
                <p>
                  Adotamos rigorosos padrões de segurança da informação (DevSecOps), incluindo tráfego criptografado
                  (HTTPS / TLS 1.3), validações de schema estritas (Zod) e políticas restritivas de acesso interno.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">5. Direitos dos Titulares</h4>
                <p>
                  Conforme o Artigo 18 da LGPD, o titular possui o direito de solicitar a qualquer momento: confirmação da
                  existência de tratamento; acesso aos seus dados; correção de dados incompletos ou desatualizados;
                  anonimização, bloqueio ou eliminação de dados tratados em desconformidade com a lei; e revogação do consentimento.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">6. Encarregado pelo Tratamento de Dados (DPO)</h4>
                <p>
                  Para exercer seus direitos de titular ou sanar qualquer dúvida referente ao tratamento de seus dados
                  pessoais, entre em contato diretamente com nosso Encarregado pelo e-mail:{" "}
                  <a href="mailto:elessandro@epmdevtech.com.br" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                    elessandro@epmdevtech.com.br
                  </a>
                  .
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-zinc-900 dark:text-white mb-1">7. Vigência e Atualizações</h4>
                <p>
                  Esta Política de Privacidade está em vigor e foi atualizada em 10 de setembro de 2026. Reservamo-nos o
                  direito de atualizá-la quando necessário para refletir adequações legais e tecnológicas.
                </p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
