import { getImageFromDb } from "@/actions/imageGen/generate-image";
import ImageDetails from "@/components/imageGen/display/image-details";

interface ParamsType {
  params: Promise<{
    _id: string;
  }>;
}

export default async function Page({ params }: ParamsType) {
  const resolvedParams = await params;
  const { _id } = resolvedParams;
  const image = await getImageFromDb(_id);

  return <ImageDetails image={image} />;
}
