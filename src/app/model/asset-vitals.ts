export interface IAssetVitals {
    id: number;
    purchase_date: string;
    capita_cost: number;
    maintenance_cost: number;
    hours_billed: number;
    hours_worked: number;
    asset_id: number
    current_address: string;
    nearest_city: string;
    lat: number;
    lng: number;
    unit_number: number;
  }
