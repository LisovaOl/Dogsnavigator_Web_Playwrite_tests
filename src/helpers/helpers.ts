export async function makeNewString(string: string) {
  const base = string.trim();
  const suffix = Date.now().toString().slice(-5); // коротко
  // якщо є ліміт довжини — обрізай
  return `${base}-${suffix}`.slice(0, 9);
}
