export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface IResponse<T> {
  data: T[] | T | null;
  succeeded: boolean | null;
  message: IMessage | null;
}

interface IMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}