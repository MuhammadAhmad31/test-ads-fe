import { BookLayouts } from "@/components/Layout/BookLayouts";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditBook, useGetDetailBook } from "@/hooks/useBook";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function UpdateBookPage() {
  const { editBook, isLoading } = useEditBook();
  const router = useRouter();
  const { id } = router.query as unknown as { id: number };

  const { data: { detailBook } = {} } = useGetDetailBook(
    router.query.id as unknown as number
  );

  const formCreateBookSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.coerce.number().positive({
      message: "Harga harus lebih dari 0",
    }),
    author: z.string(),
  });

  const formCreateBook = useForm<z.infer<typeof formCreateBookSchema>>({
    resolver: zodResolver(formCreateBookSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      author: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formCreateBookSchema>) => {
    editBook({
      ...data,
      id: id,
    });
  };

  useEffect(() => {
    if (detailBook) {
      formCreateBook.setValue("title", detailBook.title);
      formCreateBook.setValue("description", detailBook.description);
      formCreateBook.setValue("price", detailBook.price);
      formCreateBook.setValue("author", detailBook.author);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailBook]);

  return (
    <BookLayouts>
      <h1 className="text-2xl font-semibold text-secondary-color-blue">
        Edit Buku
      </h1>
      <Card className="px-5 py-4 my-5 border-none shadow-none md:py-6 md:px-8 bg-slate-100">
        <Form {...formCreateBook}>
          <form onSubmit={formCreateBook.handleSubmit(onSubmit)}>
            <div className="mb-4 space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <FormField
                control={formCreateBook.control}
                name="title"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          className="border-button-color-teal "
                          placeholder="Masukan Judul Buku"
                          type="text"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={formCreateBook.control}
                name="price"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Harga</FormLabel>
                      <FormControl>
                        <Input
                          className=" border-button-color-teal [&::-webkit-inner-spin-button]:appearance-none "
                          placeholder="Masukan Harga"
                          type="number"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={formCreateBook.control}
                name="author"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Penulis</FormLabel>
                      <FormControl>
                        <Input
                          className=" border-button-color-teal [&::-webkit-inner-spin-button]:appearance-none "
                          placeholder="Masukan Penulis"
                          type="text"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={formCreateBook.control}
                name="description"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="">Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan Deskripsi Buku"
                          className="resize-none border-button-color-teal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
            </div>
            <Button>Edit Buku</Button>
          </form>
        </Form>
      </Card>
    </BookLayouts>
  );
}
