import { BookLayouts } from "@/components/Layout/BookLayouts";
import { Card } from "@/components/ui/card";
import { useGetDetailBook } from "@/hooks/useBook";
import { convertIDR } from "@/utils/convertIDR";
import { useRouter } from "next/router";

export default function DetailBook() {
  const router = useRouter();

  const { data: { detailBook } = {} } = useGetDetailBook(
    router.query.id as unknown as number
  );

  return (
    <BookLayouts>
      <h1 className="mb-3 text-2xl font-semibold text-secondary-color-blue">
        Detail Buku
      </h1>
      <Card>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <h2 className="mb-3 text-xl font-semibold text-secondary-color-blue">
                {detailBook?.title}
              </h2>
              <div className="flex gap-4"></div>
              <p className="text-sm text-gray-400">
                Penulis : {detailBook?.author}
              </p>
              <p className="text-sm text-gray-400">
                Deskripsi : {detailBook?.description}
              </p>
              <p className="text-sm text-gray-400">
                {convertIDR(detailBook?.price ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </BookLayouts>
  );
}
