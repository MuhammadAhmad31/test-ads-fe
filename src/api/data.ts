import axiosInstance from "@/lib/axiosInstance";
import { Book, FormBook } from "@/types/book.type";
import { ResponseApi } from "@/types/responseApi.type";
import axios, { AxiosError } from "axios";

export const getBook = async () => {
  try {
    const response = await axiosInstance.get<ResponseApi<Book[]>>("/data");
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError
    }
    throw error;
  }
};

export const addBook = async (payload: FormBook) => {
  try {
    const response = await axiosInstance.post("/data", payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError
    }
    throw error;
  }
}

export const getDetailBook = async (id: number) => {
  try {
    const response = await axiosInstance.get<ResponseApi<Book>>(`/data/${id}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError
    }
    throw error;
  }
}

export const updateBook = async (id: number, payload: FormBook) => {
  try {
    const response = await axiosInstance.put(`/data/${id}`, payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError
    }
    throw error;
  }
}

export const deleteBook = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/data/${id}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as AxiosError
    }
    throw error;
  }
}