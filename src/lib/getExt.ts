export function getExt(filename: string): string | undefined {
  const parts = filename.split(".");

  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
}
