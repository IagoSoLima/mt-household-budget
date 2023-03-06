import { randomUUID } from 'crypto';
import * as fs from 'fs';
import path from 'path';
import * as puppeteer from 'puppeteer';
import { type IPdfProvider } from '~/core/providers/pdf.provider.interface';
import { IS_PROD, PUPPETEER_EXECUTABLE_PATH } from '~/infra/vars/app.vars';

export default class PuppeteerProviderPdf implements IPdfProvider {
  async generate(template: string): Promise<string | Uint8Array | Buffer> {
    const browser = await puppeteer.launch({
      headless: !IS_PROD,
      executablePath: PUPPETEER_EXECUTABLE_PATH,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-sandbox'
      ]
    });
    const context = browser.defaultBrowserContext();
    const page = await context.newPage();

    await page.setContent(template, {
      waitUntil: 'networkidle0'
    });

    const buffer = await page.pdf({
      printBackground: true,
      format: 'a4',
      margin: {
        top: 70,
        bottom: 42,
        right: 40,
        left: 40
      }
    });

    await browser.close();

    return buffer;
  }
}
