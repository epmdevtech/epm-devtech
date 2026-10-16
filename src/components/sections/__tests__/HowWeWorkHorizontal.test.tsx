import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import HowWeWorkHorizontal from '../HowWeWorkHorizontal';

describe('HowWeWorkHorizontal Component', () => {
  it('renderiza a lista ordenada acessível das etapas', () => {
    render(<HowWeWorkHorizontal />);

    const list = screen.getByRole('list', { name: /etapas do processo de trabalho/i });
    expect(list).toBeInTheDocument();
    expect(list.tagName.toLowerCase()).toBe('ol');
    expect(list.querySelectorAll(':scope > li')).toHaveLength(4);
  });

  it('expõe um título acessível para a seção', () => {
    render(<HowWeWorkHorizontal />);

    const heading = screen.getByRole('heading', {
      name: /as quatro etapas do nosso processo de trabalho/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName.toLowerCase()).toBe('h2');
  });

  it('renderiza os títulos das 4 etapas', () => {
    render(<HowWeWorkHorizontal />);

    const titles = [
      'Diagnóstico inicial',
      'Escopo e entregáveis',
      'Entregas incrementais',
      'Sustentação e melhoria',
    ];
    titles.forEach((title) => {
      expect(screen.getByRole('heading', { name: new RegExp(title, 'i') })).toBeInTheDocument();
    });
  });

  it('renderiza as categorias das 4 etapas', () => {
    render(<HowWeWorkHorizontal />);

    ['Entendimento', 'Definição', 'Desenvolvimento', 'Evolução'].forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('renderiza as mensagens canônicas de cada etapa', () => {
    render(<HowWeWorkHorizontal />);

    expect(
      screen.getByText(/Mapeamos a operação, os sistemas existentes e os gargalos/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Definimos prioridades, arquitetura, critérios de aceite/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Desenvolvemos, testamos e validamos incrementos/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Acompanhamos a operação e evoluímos a solução/i)
    ).toBeInTheDocument();
  });

  it('preserva os entregáveis concretos das 4 etapas', () => {
    render(<HowWeWorkHorizontal />);

    const deliverables = [
      'Matriz de Riscos & Restrições',
      'Diagrama C4 Inicial',
      'Estimativa de Custo de Nuvem',
      'Documento de Visão de Produto',
      'Especificações Técnicas (SPECs)',
      'Contratos de API (OpenAPI)',
      'Backlog Técnico Priorizado',
      'Cronograma de Marcos e Sprints',
      'Código com Cobertura de Testes (≥90%)',
      'Pipeline CI/CD Automatizado',
      'Builds Incrementais Homologados',
      'Documentação Viva de Código',
      'Dashboards de Telemetria e Logs',
      'Métricas de Performance e SLAs',
      'Plano de Sustentação Contínua',
      'Guia de Repasse e Transferência',
    ];

    deliverables.forEach((deliverable) => {
      expect(screen.getByText(deliverable)).toBeInTheDocument();
    });
  });

  it('preserva os critérios de saída das 4 etapas', () => {
    render(<HowWeWorkHorizontal />);

    expect(
      screen.getAllByText(/Alinhamento técnico e de objetivos formalmente acordado/i).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/Escopo, arquitetura e marcos de entrega validados/i).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/Funcionalidades testadas e homologadas pela sua equipe/i).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByText(/Sistema em produção com telemetria ativa/i).length
    ).toBeGreaterThanOrEqual(1);
  });

  it('numera as etapas de 01 a 04', () => {
    render(<HowWeWorkHorizontal />);

    ['01', '02', '03', '04'].forEach((num) => {
      expect(screen.getAllByText(num).length).toBeGreaterThanOrEqual(1);
    });
  });
});
