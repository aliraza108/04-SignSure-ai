export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type ClauseKey =
  | 'payment_terms'
  | 'termination'
  | 'liability'
  | 'confidentiality'
  | 'renewal'
  | 'penalties';

export interface ContractReport {
  clause_analysis: Record<ClauseKey, string>;
  risk_scores: Record<ClauseKey, RiskLevel>;
  missing_clauses: string[];
  explanations: Record<string, string>;
  negotiation_suggestions: string[];
  overall_risk: RiskLevel;
}

