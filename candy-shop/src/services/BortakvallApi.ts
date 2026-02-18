import axios from "axios";
import type {ApiResponse, Candy, CandyWithDescription, OrderRequest, OrderResponse} from "./Types"
import { handleApiError } from "./handleApiError";

console.log(import.meta.env.VITE_API_BASEURL)
const BASE_URL = import.meta.env.VITE_API_BASEURL
console.log(BASE_URL)

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
})

const get = async <T>(endpoint: string): Promise<T> => {
  try{
    const response = await instance.get<T>(endpoint)
    return response.data
  } catch (error){
    return handleApiError<T>(error, () => get<T>(endpoint))
  }
}

export const post = async <TBody, TResponse>(endpoint: string, body: TBody): Promise<TResponse> => { //TBody → the type of the data you send
  try{
    const response = await instance.post<TResponse>(endpoint, body);
    return response.data;
  } catch (error){
    return handleApiError<TResponse>(error, ()=> post<TBody, TResponse>(endpoint, body))
  }
};

export const getCandies = async (): Promise<Candy[]> => {
  const response = await get<ApiResponse<Candy[]>>('/products');
  return response.data || []; //|| [] is only evaluated after a successful response so you will not return empty [] if something is wrong (this part goes to catch get)
};

export const getOneCandy = async (id: number): Promise<CandyWithDescription> => {
  const response = await get<ApiResponse<CandyWithDescription>>(`/products/${id}`);
  console.log("data", response.data);
  return response.data || ({} as CandyWithDescription);
};

export const placeOrder = async (userId: number, order: OrderRequest): Promise<OrderResponse | null> => {
  const response = await post<OrderRequest, OrderResponse>(`/users/${userId}/orders`, order);
  return response || null;
};