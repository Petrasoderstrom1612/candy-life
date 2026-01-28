import axios from "axios";
// import { AxiosError } from 'axios';
import type {ApiResponse, Candy, CandyWithDescription, OrderRequest, OrderResponse} from "./Types"

console.log(import.meta.env.VITE_API_BASEURL)
const BASE_URL = import.meta.env.VITE_API_BASEURL
console.log(BASE_URL)

// const handleError = (error: unknown) => {
//     if (error instanceof AxiosError){
//         alert("Something went wrong" + error.message)
//         console.log(error)
//         throw Error(`error message: ${error.message}`)
//     }  else if (error instanceof Error){
//         alert("something unexpexted happened")
//         console.log("something unexpexted happened")
//     } else {
// 		alert("This should never happen.")
//         console.log("This should never happen.")
// 	}
// }

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
})

const get = async <T>(endpoint: string): Promise<T> => {
    const response = await instance.get<T>(endpoint)
    return response.data
}

export const post = async <TBody, TResponse>(endpoint: string, body: TBody): Promise<TResponse> => { //TBody → the type of the data you send
  const response = await instance.post<TResponse>(endpoint, body);
  return response.data;
};

export const getCandies = async (): Promise<Candy[]> => {
	try {
		const response = await get<ApiResponse<Candy[]>>('/products');
		return response.data || []; //|| [] is only evaluated after a successful response
	} catch (error) {
		// Logga det tekniska felet för felsökning
		console.error("API Error fetching candies:", error);

		// Kasta felet vidare så att komponenten kan hantera det
		throw new Error("Kunde inte hämta produkter från servern.");
	}
};

export const getOneCandy = async (id: number): Promise<CandyWithDescription> => {
  try {
    const response = await get<ApiResponse<CandyWithDescription>>(
      `/products/${id}`
    );
    console.log("data", response.data);
    return response.data || {};
  } catch (error) {
		// Logga det tekniska felet för felsökning
		console.error("API Error fetching candy:", error);

		// Kasta felet vidare så att komponenten kan hantera det
		throw new Error("Kunde inte hämta produkten från servern.");
  }
};

export const placeOrder = async (userId: number, order: OrderRequest): Promise<OrderResponse | null> => {
  try {
    const response = await post<OrderRequest, OrderResponse>(`/users/${userId}/orders`, order);
    return response || null;
  } catch (error) {
    		// Logga det tekniska felet för felsökning
		console.error("API Error placing order:", error);

		// Kasta felet vidare så att komponenten kan hantera det
		throw new Error("Kunde inte lägga beställningen.");
  }
};