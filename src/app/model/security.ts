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

export interface IAssetMapSecurity {
  asset_map_read: boolean;
  asset_map_update: boolean;
}

export interface ISettingsecurity {
  category_create: boolean;
  category_read: boolean;
  category_update: boolean;
  category_delete: boolean;
  company_read: boolean;
  company_update: boolean;
  permission_read: boolean;
  permission_update: boolean;
  role_create: boolean;
  role_read: boolean;
  role_update: boolean;
  role_delete: boolean;
  status_create: boolean;
  status_read: boolean;
  status_update: boolean;
  status_delete: boolean;
}

export interface ICategorySecurity {
  category_create: boolean;
  category_update: boolean;
  category_delete: boolean;
}

export interface IPermissionSecurity {
  role_update: boolean;
}

export interface IRoleSecurity {
  role_create: boolean;
  role_update: boolean;
  role_delete: boolean;
}

export interface IStatusSecurity {
  status_create: boolean;
  status_update: boolean;
  status_delete: boolean;
}

export interface IUserSecurity {
  user_create: boolean;
  user_update: boolean;
  user_delete: boolean;
}

export interface INavigationSecurity {
  asset_read: boolean;
  asset_log_read: boolean;
  company_read: boolean;
  category_read: boolean;
  permission_read: boolean;
  role_read: boolean;
  status_read: boolean;
  user_read: boolean;
  media_read: boolean;
}
