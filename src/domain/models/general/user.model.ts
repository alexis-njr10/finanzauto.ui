interface UserLocation {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}

export interface IUserList {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  location: UserLocation;
  registerDate: string;    
  updatedDate: string;
}
