import { AuditableEntity } from '../auditable.entity';

export interface IUserEntity extends AuditableEntity {
  id?: string;
  title: string;
  firstName: string;
  lastName: string;
  picture?: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  location?: UserLocation;
}

interface UserLocation {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}