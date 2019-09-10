export interface IUserEmail {
    id: number;
    tenant_id: string;
    first_name: string;
    last_name: string;
    email: string;
    date_created: string;
    role_id: number;
    profile_image: number
  }

  export interface IUsers {
    first_name: string;
    last_name: string;
    email: string;
    status: string
    role: string;
    date_created: string;
  }

  export interface IDeleteUser {
    id: number;
    user_id: number;
  }