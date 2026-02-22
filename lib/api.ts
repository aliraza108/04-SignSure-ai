import type { ContractReport } from './types';

export async function analyzeContract(
  file: File,
  options?: { signal?: AbortSignal }
): Promise<ContractReport> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
    signal: options?.signal,
  });

  if (!response.ok) {
    let detail = 'Analysis failed';
    try {
      const error = await response.json();
      detail = error.detail || detail;
    } catch {
      // ignore
    }
    throw new Error(detail);
  }

  const data = await response.json();
  return data.report as ContractReport;
}

