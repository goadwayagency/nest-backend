import xss from 'xss';

export function sanitizeString(input: string | undefined): string | undefined {
  return input ? xss(input) : input;
}