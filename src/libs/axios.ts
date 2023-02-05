import axios from "axios"
import { baseURL } from "../constants/baseURL"

export const api = axios.create({
  baseURL,
})
