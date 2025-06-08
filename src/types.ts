export type OwnerData = {
  id: number;
  auth0Id: string;
  name: string;
  email: string;
  type: "estudiante" | "propietario";
  createdAt: string;
};

export type HousingData = {
  id: number;
  title: string;
  description: string;
  address: string;
  price: number;
  rooms: number;
  bathrooms: number;
  size: number;
  images: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
  owner: OwnerData;
};