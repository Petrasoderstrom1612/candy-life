import axios from "axios";
import { ApiError, TooManyRequestsError } from "./ApiError";

export const handleApiError  = async <T>(
  error: unknown,
  retryFn?: () => Promise<T>
): Promise<T> => {

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    // 1️⃣ Retry on 429
    if (status === 429 && retryFn) {
      console.warn("429 received. Retrying request...");
      await new Promise(res => setTimeout(res, 1000)); // wait 1s
      return retryFn();
    }

    // 2️⃣ Translate known HTTP errors
    if (status === 404) {
      throw new ApiError("Not found.", 404); //throw new kastar felet vidare
    }

    if (status === 500) {
      throw new ApiError("Serverfel. Försök igen senare.", 500);
    }

    if (status === 429) {
      throw new TooManyRequestsError();
    }

    throw new ApiError("Ett oväntat serverfel uppstod.", status); //server doesn't answer (timeout)
  }

  // Non-Axios error
  if (error instanceof Error) {
    throw new ApiError(error.message);
  }

  throw new ApiError("Ett okänt fel uppstod.");
};
