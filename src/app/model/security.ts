export interface IAssetSecurity {
  asset_create: boolean;
  asset_update: boolean;
  asset_delete: boolean;
}

export interface ICompanySecurity {
  company_update: boolean;
}

export interface IMediaSecurity {
  media_create: boolean;
  media_update: boolean;
  media_delete: boolean;
}