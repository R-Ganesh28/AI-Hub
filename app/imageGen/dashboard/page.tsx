import { getUserImagesFromDb } from "@/actions/imageGen/generate-image";
import Pagination from "@/components/imageGen/pagination/pagination";
import DashboardWrapper from "@/components/imageGen/display/dashboard-wrapper";

interface Props {
  searchParams: Promise<{ page?: string | undefined }>;
}

export default async function Dashboard({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  const limit = 4;
  const { images, totalCount } = await getUserImagesFromDb(currentPage, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-8 pb-2">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
          Your Image Collection
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Manage and preview your images with a sleek, powerful, and intuitive
          interface.
        </p>
      </div>

      <DashboardWrapper images={images} />

      <div className="flex justify-center mt-15">
        <Pagination page={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
