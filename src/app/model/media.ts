
export interface IMedia {
    id: number;
    tenant_id: string;
    file_name: string;
    description: string;
    category_id: number;
    date_created: string;
    user_created: string;
  }

export interface IDeleteMedia {
    id: number;
    user_id: number;
  }
  