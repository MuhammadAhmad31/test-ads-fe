"use client";
import DataTable, { Columns } from "@/components/Global/DataTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import type { Book } from "@/types/book.type";
import { useEffect, useState } from "react";
import { useDeleteBook, useGetBook, useGetDetailBook } from "@/hooks/useBook";
import { BookLayouts } from "@/components/Layout/BookLayouts";
import { Eye, PenIcon, TrashIcon } from "lucide-react";
import Swal from "sweetalert2";
import { convertIDR } from "@/utils/convertIDR";

export default function Book() {
  const router = useRouter();

  const [book, setBook] = useState<Book[]>([]);
  const { data } = useGetBook();

  const { deleteBook } = useDeleteBook();

  useEffect(() => {
    if (data?.books) {
      setBook(data.books);
    }
  }, [data]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus buku ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id);
      }
    });
  };

  const bookColumns: Columns<Book>[] = [
    {
      header: "No",
      accessor: "id",
    },
    {
      header: "Judul",
      accessor: "title",
    },
    {
      header: "Deskripsi",
      accessor: "description",
    },
    {
      header: "Penulis",
      accessor: "author",
    },
    {
      header: "Harga",
      accessor: "price",
      render: (data) => {
        return <span>{convertIDR(data.price)}</span>;
      },
    },
    {
      header: "Aksi",
      accessor: "id",
      render: ({ id }) => {
        return (
          <div className="flex gap-2 item-center">
            <Button
              variant="outline"
              size="icon"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => {
                router.push(`/book/detail/${id}`);
              }}
            >
              <Eye className="w-4 h-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                router.push(`/book/edit/${id}`);
              }}
            >
              <PenIcon className="w-4 h-4 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                handleDelete(id);
              }}
            >
              <TrashIcon className="w-4 h-4 text-white" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <BookLayouts>
      <h1 className="text-2xl ">Daftar Buku</h1>
      <hr />
      <p>Jumlah Buku : {book.length}</p>
      <div className="mt-4 ">
        <Button
          variant="outline"
          size="sm"
          className="font-medium text-white bg-blue-400 hover:bg-blue-900 hover:text-white"
          onClick={() => {
            router.push("/book/create");
          }}
        >
          Tambah Buku
        </Button>
      </div>
      <Card className="px-5 py-4 my-5 border-none shadow-none rounded-xl md:py-6 md:px-8 bg-slate-100">
        <h2 className="py-8 text-2xl">DATA BUKU</h2>
        <DataTable columns={bookColumns} data={book} />
      </Card>
    </BookLayouts>
  );
}
