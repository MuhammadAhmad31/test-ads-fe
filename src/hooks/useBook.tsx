import {
  addBook,
  deleteBook,
  getBook,
  getDetailBook,
  updateBook,
} from "@/api/data";
import { toast, useToast } from "@/components/ui/use-toast";
import { Book, DeleteBook, FormBook } from "@/types/book.type";
import {
  ResponseApi,
  ResponseApiError,
  ResponseApiSuccess,
} from "@/types/responseApi.type";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useGetBook = () => {
  const { data, isLoading, isError, error } = useQuery(
    ["books"],
    () => {
      return getBook();
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const err = error as AxiosError<ResponseApiError>;
  const res = data?.data;
  const message = err?.response?.data?.message;

  const notif = () => {
    toast({
      variant: "destructive",
      title: "Gagal mengambil data",
      description: `${message || "Terjadi Error"}`,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  useEffect(() => {
    if (isError) {
      notif();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return {
    data: {
      books: res?.data,
      message: res?.message,
    },
    isLoading,
    error,
  };
};

export const useAddBook = () => {
  const route = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: FormBook) => {
      return addBook(payload);
    },
    {
      onSuccess: (response) => {
        const result = response.data as ResponseApi<FormBook>;

        toast({
          variant: "success",
          title: "Berhasil",
          description: `${result.message}`,
        });

        // Invalidate the book
        queryClient.invalidateQueries(["books"]);

        // redirect to book page
        route.push("/book");
      },
      onError: ({ response }) => {
        const { message } = response.data as ResponseApiError;

        toast({
          variant: "destructive",
          title: "Gagal",
          description: `${message}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });

        route.push("/book");
      },
    }
  );
  return {
    addBook: mutate,
    isLoading,
    isSuccess,
  };
};

export const useGetDetailBook = (id: number) => {
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useQuery(
    ["book", id],
    () => {
      return getDetailBook(id!);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  const err = error as AxiosError<ResponseApiError>;
  const res = data?.data;
  const message = err?.response?.data?.message;

  const notif = () => {
    toast({
      variant: "destructive",
      title: "Gagal mengambil data",
      description: `${message || "Terjadi Error"}`,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  useEffect(() => {
    if (isError) {
      notif();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return {
    data: {
      detailBook: res?.data,
      message: res?.message,
    },
    isLoading,
    error,
  };
};

export const useEditBook = () => {
  const route = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (
      payload: FormBook & {
        id: number;
      }
    ) => {
      return updateBook(payload.id, payload);
    },
    {
      onSuccess: (response) => {
        const result = response.data as ResponseApi<FormBook>;

        toast({
          variant: "success",
          title: "Berhasil",
          description: `${result.message}`,
        });

        // Invalidate the book
        queryClient.invalidateQueries(["book"]);

        // redirect to book page
        route.push("/book");
      },
      onError: ({ response }) => {
        const { message } = response.data as ResponseApiError;

        toast({
          variant: "destructive",
          title: "Gagal",
          description: `${message}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      },
    }
  );
  return {
    editBook: mutate,
    isLoading,
    isSuccess,
  };
};

export const useDeleteBook = () => {
  const route = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (payload: DeleteBook) => {
      return deleteBook(payload.id);
    },
    {
      onSuccess: (response) => {
        const result = response.data as ResponseApi<DeleteBook>;

        toast({
          variant: "success",
          title: "Berhasil",
          description: `${result.message}`,
        });

        // Invalidate the book
        queryClient.invalidateQueries(["book"]);

        // redirect to book page
        route.push("/book");
      },
      onError: ({ response }) => {
        const { message } = response.data as ResponseApiError;

        toast({
          variant: "destructive",
          title: "Gagal",
          description: `${message}`,
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      },
    }
  );
  return {
    deleteBook: mutate,
    isLoading,
    isSuccess,
  };
};
