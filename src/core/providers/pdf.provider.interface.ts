export interface IPdfProvider {
  generate: (template: string) => Promise<string | Uint8Array | Buffer>;
}
