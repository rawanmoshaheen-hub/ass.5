import api from "@/lib/api";
import { Address } from "@/types/order";

export const getAddresses = async (): Promise<Address[]> =>
  (await api.get<{ data: Address[] }>("/addresses")).data.data;

export const addAddress = async (data: {
  name: string;
  details: string;
  phone: string;
  city: string;
}) => (await api.post("/addresses", data)).data;

export const removeAddress = async (id: string) =>
  (await api.delete(`/addresses/${id}`)).data;