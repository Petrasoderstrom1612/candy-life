import axios from "axios";
import { AxiosError } from 'axios';
// import type {Candy} from "./Types"
import type {Candy, CandyWithDescription} from "./Types"

console.log(import.meta.env.VITE_API_BASEURL)
const BASE_URL = import.meta.env.VITE_API_BASEURL
console.log(BASE_URL)

const handleError = (error: unknown) => {
    if (error instanceof AxiosError){
        alert("Something went wrong" + error.message)
        console.log(error)
        throw Error(`error message: ${error.message}`)
    }  else if (error instanceof Error){
        alert("something unexpexted happened")
        console.log("something unexpexted happened")
    } else {
		alert("This should never happen.")
        console.log("This should never happen.")
	}
}

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

export const getCandies = async (): Promise<Candy[]> => {
    try {
        // Use the generic GET helper
        const response = await get<{status: string; data: Candy[]}>('/products')

        console.log("data", response.data)
        return response.data || []
    } catch (error) {
        handleError(error)
        return []  // fallback empty array
    }
}

export const getOneCandy = async (id: number): Promise<CandyWithDescription> => {
  try {
    const response = await get<{ status: string; data: CandyWithDescription }>(
      `/products/${id}`
    );
    console.log("data", response.data);
    return response.data; // single object now
  } catch (error) {
    handleError(error);
    // fallback single object
    return {
      id: 0,
      name: "",
      description: "",
      price: 0,
      on_sale: false,
      images: { thumbnail: "", large: "" },
      stock_status: "outofstock",
      stock_quantity: 0,
      tags: [],
    };
  }
};