export interface ApiResponse {
  status: number;
  success: boolean;
  message?: string;
  data?: unknown;
  metadata?: Metadata;
}

export interface Metadata {
  total: number;
  page: number;
  totalPages: number;
}
