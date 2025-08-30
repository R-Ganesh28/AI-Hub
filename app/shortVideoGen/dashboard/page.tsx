import { getUserVideosFromDatabase } from "@/actions/shortVideoGen/save-video";
import DashboardVideoPlayer from "@/components/shortVideoGen/video/dashboard-video-player";

export default async function Page() {
  const videos = await getUserVideosFromDatabase();

  return (
    <div className="min-h-screen px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
            Your Video Dashboard
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400">
            Manage and preview your short videos with a sleek, powerful, and
            intuitive interface.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {videos.length > 0 ? (
            videos.map((video: any) => (
              <DashboardVideoPlayer key={video._id} video={video} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-24">
              No videos yet. Let’s create something amazing ✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
