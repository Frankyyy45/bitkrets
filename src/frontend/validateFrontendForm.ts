export function validateFrontendForm(title: string, text: string): boolean {
  return title.trim().length > 0 && text.trim().length > 0;
}
