export interface JsonLdIdentifiableObject {
  '@id': string;
  '@type': string[];
  [key: string]: string | string[];
}
