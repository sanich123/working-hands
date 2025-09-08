export interface GeolocationParams {
  latitude: number;
  longitude: number;
}

export interface JobsByGeolocationPresponse {
  data: JobsResponse[];
  status: number;
}

export interface JobsResponse {
  id: string;
  logo: string;
  coordinates: { longitude: number; latitude: number };
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: WorkType[];
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number;
  isPromotionEnabled: boolean;
}

interface WorkType {
  id: number;
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}
