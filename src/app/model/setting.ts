
export interface ICompany {
    id: number;
    company_name: string;
    first_name: string;
    last_name: string;
    email: string;
    address_street: string;
    address_city: string;
    address_prov_state: string;
    address_country: string;
    address_postal_code: string;
    company_image: number;
    lat: number;
    lng: number;
    date_created: string;
    user_created: string;
  }

  export interface IRoles {
    id: number;
    role: string;
    date_created: string;
    user_created: string;
  }

  export interface IPermissions{
    id: number;
    role_id: number;
    asset_create: boolean;
    asset_read: boolean;
    asset_update: boolean;
    asset_delete: boolean;
    asset_map_update: boolean;
    asset_map_read: boolean;
    asset_log_read: boolean;
    category_create: boolean;
    category_read: boolean;
    category_update: boolean;
    category_delete: boolean;
    company_read: boolean;
    company_update: boolean;
    media_create: boolean;
    media_read: boolean;
    media_update: boolean;
    media_delete: boolean;
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
    user_create: boolean;
    user_read: boolean;
    user_update: boolean;
    user_delete: boolean;
    date_created: string;
    user_created: string;
  }
