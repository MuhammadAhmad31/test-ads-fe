import { BookLayouts } from "@/components/Layout/BookLayouts";
// import { ButtonLoader } from "@/components/ui/Custom/ButtonLoader";
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
import { useAddBook } from "@/hooks/useBook";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateBookPage() {
  const { addBook, isLoading } = useAddBook();

  const formCreateBookSchema = z.object({
    title: z.string(),
    description: z.string().min(1, "Deskripsi tidak boleh kosong"),
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
    addBook(data);
  };

  return (
    <BookLayouts>
      <h1 className="text-2xl font-semibold text-secondary-color-blue">
        Tambah Buku
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
            <div className="flex items-center justify-center md:justify-end">
              {/* <ButtonLoader
                loading={isLoading}
                className="w-2/4 md:w-1/4 bg-button-color-teal hover:bg-button-color-teal/90"
              >
                Tambah
              </ButtonLoader> */}
            </div>
            <Button>Tambah</Button>
          </form>
        </Form>
      </Card>
    </BookLayouts>
  );
}
