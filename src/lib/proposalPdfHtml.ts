/**
 * Gera o HTML de uma proposta/orçamento no padrão IS Arquitetura
 * (ver ORÇAMENTO DE PROJETO - EXEMPLO.pdf). Totalmente autocontido:
 * fontes e marca d'água embutidos via base64/inline, sem requisições
 * de rede durante a renderização por Puppeteer.
 */

export type ProposalPdfData = {
  client: { name: string; address?: string }
  service: string
  dateIssued: string // "24/11/2025"
  validity: string // "30 dias"
  objective: string
  scopeItems: string[]
  pricing: {
    total: number
    discountPctAVista: number
    installments: number
    installmentValue: number
  }
  penaltyPct: number
  minDaysPerPhase: number
  maxIncludedAlterations: number
  considerations: string[] // cada item com HTML permitido (<strong>)
  footer: {
    city: string
    dateLong: string // "24 de Novembro de 2025"
    phone: string
  }
}

export type ProposalPdfAssets = {
  fontRegularBase64: string
  fontExBoldBase64: string
  markSvg: string // SVG bruto da marca
}

const brl = (n: number) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function proposalPdfHtml(
  data: ProposalPdfData,
  assets: ProposalPdfAssets,
): string {
  const { client, service, dateIssued, validity, objective, scopeItems, pricing } = data
  const totalComDesc = pricing.total * (1 - pricing.discountPctAVista / 100)

  const scopeList = scopeItems
    .map((item) => `<li>${escapeHtml(item)};</li>`)
    .join('')

  const considerationsList = data.considerations
    .map((html) => `<li><span class="bullet">●</span><span>${html}</span></li>`)
    .join('')

  const markDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(assets.markSvg)}`

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<title>Orçamento de Projeto — ${escapeHtml(client.name)}</title>
<style>
  @font-face {
    font-family: 'JUST Sans';
    src: url(data:font/woff2;base64,${assets.fontRegularBase64}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: block;
  }
  @font-face {
    font-family: 'JUST Sans';
    src: url(data:font/woff2;base64,${assets.fontExBoldBase64}) format('woff2');
    font-weight: 800;
    font-style: normal;
    font-display: block;
  }

  @page { size: A4; margin: 0; }

  :root {
    --ink:       #555956;
    --ink-soft:  #6d736e;
    --ink-strong:#3f4340;
    --mark:      #e8ebe8;
  }

  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    font-family: 'JUST Sans', -apple-system, system-ui, sans-serif;
    color: var(--ink);
    font-size: 10.5pt;
    line-height: 1.55;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  strong { color: var(--ink-strong); font-weight: 800; }

  .page {
    position: relative;
    width: 210mm;
    height: 297mm;
    padding: 22mm 24mm;
    page-break-after: always;
    overflow: hidden;
  }
  .page:last-child { page-break-after: auto; }

  /* Marca d'água — só nas páginas de conteúdo */
  .page.content::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('${markDataUri}') center/45% no-repeat;
    opacity: 0.08;
    pointer-events: none;
    z-index: 0;
  }
  .page > * { position: relative; z-index: 1; }

  /* Capa / contracapa */
  .page.cover {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0;
  }
  .cover-mark {
    width: 46mm;
    opacity: 0.22;
    color: var(--ink);
  }
  .cover-mark svg { width: 100%; height: auto; display: block; }
  .cover-lockup {
    margin-top: 4mm;
    font-weight: 400;
    font-size: 14pt;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
    opacity: 0.35;
    text-align: center;
    line-height: 1.2;
  }

  /* Título */
  h1 {
    font-size: 18pt;
    font-weight: 800;
    letter-spacing: 0.01em;
    color: var(--ink-strong);
    margin: 0 0 14mm 0;
  }
  h2 {
    font-size: 10.5pt;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--ink-strong);
    margin: 8mm 0 3mm 0;
    text-transform: uppercase;
  }

  .meta {
    padding-bottom: 4mm;
    border-bottom: 1px solid var(--ink);
    margin-bottom: 8mm;
  }
  .meta-row { margin: 1mm 0; }
  .meta-row b { font-weight: 800; color: var(--ink-strong); }
  .meta-two { display: flex; gap: 24mm; margin-top: 1mm; }

  p { margin: 0 0 3.5mm 0; text-align: justify; }

  ol.scope {
    margin: 2mm 0 0 8mm;
    padding: 0;
  }
  ol.scope li {
    margin: 0.6mm 0;
    padding-left: 1mm;
  }

  ul.considerations {
    list-style: none;
    margin: 2mm 0 0 0;
    padding: 0;
  }
  ul.considerations li {
    display: grid;
    grid-template-columns: 4mm 1fr;
    align-items: start;
    gap: 2mm;
    margin: 0 0 3.5mm 0;
    text-align: justify;
  }
  ul.considerations .bullet { color: var(--ink-strong); }

  .price-line { margin: 1mm 0; }

  .closing {
    text-align: center;
    margin-top: 6mm;
    line-height: 1.7;
  }
  .closing .lead { font-weight: 800; color: var(--ink-strong); }

  .page-break { page-break-before: always; }
  .avoid-break { break-inside: avoid; }
</style>
</head>
<body>

<!-- ============ CAPA ============ -->
<section class="page cover">
  <div class="cover-mark">${assets.markSvg}</div>
  <div class="cover-lockup">IAGO SIQUEIRA<br/>ARQUITETURA</div>
</section>

<!-- ============ CORPO ============ -->
<section class="page content">
  <h1>ORÇAMENTO DE PROJETO</h1>

  <div class="meta">
    <div class="meta-row"><b>Serviço:</b> ${escapeHtml(service)}</div>
    <div class="meta-row"><b>Cliente:</b> ${escapeHtml(client.name)}</div>
    <div class="meta-row"><b>Endereço:</b> ${escapeHtml(client.address ?? '')}</div>
    <div class="meta-two">
      <div class="meta-row"><b>Data do orçamento:</b> ${escapeHtml(dateIssued)}</div>
      <div class="meta-row"><b>Validade:</b> ${escapeHtml(validity)}</div>
    </div>
  </div>

  <h2>1. Objetivo do Orçamento</h2>
  <p>${objective}</p>

  <h2>2. Da Proposta Técnica</h2>
  <p>
    De conformidade com as especificações preliminares do cliente, os serviços aqui
    contratados correspondem ao Projeto de arquitetura, que deverá conter:
  </p>
  <p>
    ● Estudos de alternativas de apropriação do projeto de acordo com as limitações
    físicas e diretrizes conceituais e estéticas combinadas;
  </p>
  <p>Após o consentimento dos estudos preliminares por parte do CONTRATADO serão elaborados:</p>
  <ol class="scope">${scopeList}</ol>

  <div class="page-break"></div>

  <h2>3. Do Preço</h2>

  <div class="avoid-break">
    <p><strong>3.1 à vista:</strong></p>
    <p>
      Pela realização dos serviços, o CONTRATANTE pagará ao CONTRATADO o valor por
      meio de transferência bancária.<br/>
      Caso o pagamento seja realizado à vista, será concedido um
      <strong>desconto de ${pricing.discountPctAVista}%</strong>.
    </p>
    <div class="price-line">Valor total sem desconto: <strong>R$ ${brl(pricing.total)}</strong></div>
    <div class="price-line">Valor à vista com desconto: <strong>R$ ${brl(totalComDesc)}</strong></div>
  </div>

  <div class="avoid-break" style="margin-top: 6mm;">
    <p><strong>3.2 parcelas:</strong></p>
    <p>
      Pela realização dos serviços o CONTRATANTE pagará ao CONTRATADO a importância
      referente ao valor total parcelado em <strong>até ${pricing.installments} vezes</strong>,
      sendo assim parcelas de <strong>R$ ${brl(pricing.installmentValue)}</strong>.
      Considerando a <u>primeira</u> parcela no ato de assinatura do contrato e a
      <u>segunda</u> parcela no mês subsequente e assim sucessivamente.
    </p>
    <div class="price-line">Valor total: <strong>R$ ${brl(pricing.total)}</strong></div>
  </div>

  <p style="font-style: italic; margin-top: 5mm;">
    Os dados bancários para a realização do pagamento serão fornecidos após a
    aprovação deste contrato.
  </p>

  <h2>4. Rescisão e Resiliação</h2>
  <p>
    A ocorrência de situação imprevista ou de força maior que impeça o cumprimento
    dos objetivos deste contrato implicará na rescisão do mesmo. Em caso de
    cancelamento dos projetos a qualquer tempo, a parte desistente pagará multa de
    <strong>${data.penaltyPct}% (dez por cento)</strong> do valor da etapa subsequente.
  </p>

  <h2>5. Prazos</h2>
  <p>
    Os prazos de entregas estabelecidos para cada etapa do projeto deverão ser
    validados junto ao cliente, considerando o tempo hábil necessário para o
    atendimento do cronograma, garantindo um mínimo de
    <strong>${data.minDaysPerPhase} (vinte) dias úteis</strong> para cada fase.
  </p>

  <h2>6. Considerações Finais</h2>
  <ul class="considerations">${considerationsList}</ul>
</section>

<!-- ============ CONTRACAPA ============ -->
<section class="page cover">
  <div class="cover-mark">${assets.markSvg}</div>
  <div class="cover-lockup">IAGO SIQUEIRA<br/>ARQUITETURA</div>
  <div class="closing" style="margin-top: 30mm;">
    <div class="lead">Qualquer dúvida estamos à disposição.</div>
    <div>${escapeHtml(data.footer.city)}, ${escapeHtml(data.footer.dateLong)}.</div>
    <div>Telefone: ${escapeHtml(data.footer.phone)}</div>
  </div>
</section>

</body>
</html>`
}

/** Dados padrão — espelham o exemplo do PDF de referência. */
export const exampleProposalData: ProposalPdfData = {
  client: { name: '', address: '' },
  service: 'Projeto de Arquitetura e Interiores',
  dateIssued: new Date().toLocaleDateString('pt-BR'),
  validity: '30 dias',
  objective:
    'Proposta para desenvolvimento de <strong>projeto arquitetônico, interiores e paisagismo</strong> de caráter residencial unifamiliar. Os projetos serão desenvolvidos de acordo com o programa de necessidades levantado junto ao cliente.',
  scopeItems: [
    'Briefing de Projeto',
    'Projeto legal',
    'Projeto executivo',
    'Projeto interiores',
    'Diretrizes paisagísticas',
    'Planta de Layout',
    'Planta Locação de Pontos Elétricos',
    'Planta de Locação Pontos Redes',
    'Planta de de Locação Pontos Hidráulicos',
    'Planta Luminotécnico',
    'Planta de Forro',
    'Planta de climatização',
    'Planta de Paginação de piso',
    'Planta com Especificação de Acabamentos',
    'Detalhamento de Bancadas',
    'Especificações de mobiliários',
    'Detalhamento de ambientes',
    'Vistas com acabamento',
    'Vistas com detalhes de interiores como marcenaria',
    'Especificações de acabamentos e materiais',
    'Imagens 3D',
    'Detalhes em geral',
    'Acompanhamento de execução',
  ],
  pricing: {
    total: 0,
    discountPctAVista: 5,
    installments: 4,
    installmentValue: 0,
  },
  penaltyPct: 10,
  minDaysPerPhase: 20,
  maxIncludedAlterations: 3,
  considerations: [
    'A mão de obra para a execução do projeto poderá ser <strong>sugerida pelo Arquiteto CONTRATADO</strong>, caso seja requisitado pelo CONTRATANTE. Entretanto, o CONTRATADO <strong>não se responsabilizará pela execução</strong>, uma vez que os profissionais receberão todas as orientações necessárias para a fiel execução dos projetos.',
    'O Arquiteto CONTRATADO <strong>não se responsabiliza por eventuais problemas decorrentes de alterações realizadas por terceiros sem a devida orientação</strong>, bem como por falhas na execução do projeto.',
    'A mão de obra para a execução do projeto poderá ser <strong>sugerida pelo Arquiteto CONTRATADO</strong>, caso seja requisitado pelo CONTRATANTE. Contudo, o CONTRATADO <strong>não se responsabilizará pela execução de projetos complementares</strong>, tais como estrutural, hidráulico, elétrico ou quaisquer outros serviços.',
    'As partes poderão realizar <strong>reuniões técnicas on-line ou presenciais</strong> para acompanhamento da execução da obra, caso assim opte o CONTRATANTE e mediante disponibilidade do CONTRATADO. Ressalta-se, entretanto, que o Arquiteto CONTRATADO <strong>não será responsável pelo gerenciamento da obra</strong>.',
    'Os projetos serão <strong>entregues em formato digital</strong> pelo CONTRATADO. Caso haja necessidade de versões impressas, <strong>a impressão ficará a cargo do CONTRATANTE</strong>.',
    'Estarão incluídas no valor deste contrato, até 3 alterações desde que a execução ocorra de forma contínua e gradativa após as entregas do caderno de projeto. Caso o projeto seja interrompido após sua respectiva entrega, por motivos alheios ao CONTRATADO, e necessite de futuras alterações, <strong>será cobrado valor adicional</strong>.',
    'O <strong>prazo para entrega dos projetos</strong> será contado a partir da data da <strong>última entrega aprovada pelo CONTRATANTE</strong>.',
    'As despesas relativas à aprovação dos projetos junto aos órgãos públicos municipais, estaduais e/ou federais, Corpo de Bombeiros e concessionárias (água, gás, energia, telefone, entre outros), bem como a tramitação, protocolização, acompanhamento e atendimento de eventuais exigências desses órgãos, <strong>não constituem responsabilidade do Arquiteto Contratado</strong>. O Contratante deverá <strong>contratar despachante ou profissional habilitado</strong> para intermediar o processo de aprovação e regularização do projeto, com base na documentação técnica fornecida pelo Arquiteto.',
    'Este projeto está protegido por lei de direito autoral, sendo proibida sua reprodução total ou parcial, sob as penas da lei 9.610 de fev/98. É direito do arquiteto fotografar e publicar imagens do projeto.',
  ],
  footer: {
    city: 'Goiânia',
    dateLong: new Date().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    phone: '(62) 9 8217-9976',
  },
}
