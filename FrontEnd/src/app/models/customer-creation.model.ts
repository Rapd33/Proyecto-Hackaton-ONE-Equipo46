/**
 * Modelo para crear un nuevo cliente
 * Incluye todos los campos necesarios para el registro
 */
export interface CustomerCreation {
  // Datos personales
  nombre: string;
  apellido: string;
  documentoIdentidad: number;
  correoElectronico: string;
  gender: string;
  seniorCitizen: number;
  partner: string;
  dependents: string;

  // Servicios telefónicos
  phoneService: string;
  multipleLines: string;

  // Servicios de internet
  internetService: string;
  onlineSecurity: string;
  onlineBackup: string;
  deviceProtection: string;
  techSupport: string;
  streamingTv: string;
  streamingMovies: string;

  // Contrato y facturación
  contract: string;
  paperlessBilling: string;
  paymentMethod: string;
  tenure: number;
  monthlyCharges: number;
  totalCharges?: number;
}
