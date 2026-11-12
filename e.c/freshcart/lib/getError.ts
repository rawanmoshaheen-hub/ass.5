import axios from "axios";

export function getError(err: unknown, fallback = "Something went wrong") {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || fallback;
  }
  return fallback;
}