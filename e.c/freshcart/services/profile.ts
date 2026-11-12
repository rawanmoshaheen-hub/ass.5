import api from "@/lib/api";

export const updateMe = async (data: {
  name: string;
  email: string;
  phone: string;
}) => (await api.put("/users/updateMe/", data)).data;