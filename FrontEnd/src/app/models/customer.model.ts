export interface Customer {
  id: string; // Cédula o ID único
  name: string;
  email: string;
  contractType: 'MONTHLY' | 'ANNUAL' | 'BIANNUAL';
  lastPaymentDate?: string;
  totalSpend?: number;
}

export interface ChurnPrediction {
  customerId: string;
  prediction: string; // "Va a cancelar" / "Se queda"
  probability: number; // 0.85
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}