export interface IAsset {
  name: string;
  unit_number: number;
  category_id: number;
  status_id: number;
}

export interface IAssets {
  id: number;
  name: string;
  lat: number;
  lng: number;
  date_created: string;
  yard_id: number;
  category_id: number;
  status_id: number;
  image: number;
  file_name: string;
}

export interface IAssetLog {
  id: number;
  tenant_id: string;
  asset_label: string;
  lat: number;
  lng: number;
  move_date: string;
  move_user_label: string;
  status_label: string;
  unit_number: number
}

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

export interface IAssetYard {
  id: number;
  name: string;
  unit_number: number
  lat: number;
  lng: number;
  date_created: string;
  category: string;
  status: string;
  category_id: number;
  status_id: number;
  image: number;
  file_name: string;
  yard_name: string;
}

export interface ICategories {
  id: number;
  category: string;
}

export interface IStatuses {
  id: number;
  status: string;
}

export interface IAssetCategory {
  id: number;
  name: string;
  unit_number: number;
  lat: number;
  lng: number;
  date_created: string;
  yard_id: number;
  category: string;
  status: string;
  category_id: number;
  image: number;
  file_name: string;
  status_id: number;
}

export interface IAssetStatus {
  id: number;
  name: string;
  unit_number: number;
  lat: number;
  lng: number;
  date_created: string;
  yard_id: number;
  category: string;
  status: string;
  category_id: number;
  image: number;
  file_name: string;
  status_id: number;
}