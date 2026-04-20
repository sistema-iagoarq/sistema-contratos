import fs from 'node:fs'
import path from 'node:path'
import chromium from '@sparticuz/chromium-min'
import puppeteer from 'puppeteer-core'
import {
  proposalPdfHtml,
  exampleProposalData,
  type ProposalPdfData,
} from '../../src/lib/proposalPdfHtml'

export const config = {
  // Chromium precisa de Node runtime e um pouco de tempo no cold start.
  runtime: 'nodejs',
  maxDuration: 30,
}

// URL do binário Chromium empacotado pela @sparticuz (precisa bater com a versão
// do @sparticuz/chromium-min no package.json).
const CHROMIUM_PACK_URL =
  'https://github.com/Sparticuz/chromium/releases/download/v147.0.2/chromium-v147.0.2-pack.x64.tar'

// Cache dos assets em memória (quente entre invocações).
let cachedAssets: {
  fontRegularBase64: string
  fontExBoldBase64: string
  markSvg: string
} | null = null

function loadAssets() {
  if (cachedAssets) return cachedAssets
  const root = process.cwd()
  const read = (p: string) => fs.readFileSync(path.join(root, p))

  cachedAssets = {
    fontRegularBase64: read('public/fonts/JUSTSans-Regular.woff2').toString('base64'),
    fontExBoldBase64: read('public/fonts/JUSTSans-ExBold.woff2').toString('base64'),
    markSvg: read('public/brand-mark.svg').toString('utf-8'),
  }
  return cachedAssets
}

function mergeData(partial: Partial<ProposalPdfData> | undefined): ProposalPdfData {
  if (!partial) return exampleProposalData
  return {
    ...exampleProposalData,
    ...partial,
    client: { ...exampleProposalData.client, ...(partial.client ?? {}) },
    pricing: { ...exampleProposalData.pricing, ...(partial.pricing ?? {}) },
    footer: { ...exampleProposalData.footer, ...(partial.footer ?? {}) },
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let payload: Partial<ProposalPdfData> | undefined
  if (req.method === 'POST') {
    try {
      payload = (await req.json()) as Partial<ProposalPdfData>
    } catch {
      return new Response('Invalid JSON body', { status: 400 })
    }
  }

  const data = mergeData(payload)
  const assets = loadAssets()
  const html = proposalPdfHtml(data, assets)

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
    headless: true,
  })

  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    })

    const safeName = (data.client.name || 'proposta')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .toLowerCase()

    return new Response(pdf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="orcamento-${safeName}.pdf"`,
        'Cache-Control': 'no-store',
      },
    })
  } finally {
    await browser.close()
  }
}
