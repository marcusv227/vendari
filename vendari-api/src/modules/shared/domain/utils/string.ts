export function createCode(str: string): string {
  return str
    .replaceAll(' ', '_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function createCodeWithoutSpaceAndUnderline(str: string): string {
  return str
    .replaceAll(' ', '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
