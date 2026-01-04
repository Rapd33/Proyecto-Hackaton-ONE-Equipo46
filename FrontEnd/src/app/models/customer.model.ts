export interface Customer {
  customerId: string;
  nombreCompleto: string;
  correoElectronico: string;
  documentoIdentidad: number;
  propensoAChurn: boolean;
}

export interface ChurnPrediction {
  customerId: string;
  prediction: string;
  probability: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}
