export interface Customer {
  id: string;
  name: string;
  email: string;
  contractType: 'MONTHLY' | 'ANNUAL';
}

export interface ChurnPrediction {
  customerId: string;
  prediction: string;     // Ej: "Va a cancelar"
  probability: number;    // Ej: 0.78
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}