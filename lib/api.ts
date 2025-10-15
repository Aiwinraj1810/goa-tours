import axios from "axios"

export const api = axios.create({
  baseURL: "", // same origin
  headers: { "Content-Type": "application/json" },
})
