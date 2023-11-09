/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZXXB7Tv
 */
import { Card } from "@repo/ui/components/card";

export default function Component() {
  return (
    <Card
      key="1"
      className="m-3 mx-auto w-[500px] overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800 md:max-w-3xl"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <span className="bg-muted h-[192px] w-[192px] rounded-md object-cover md:w-48" />
        </div>
        <div className="w-full p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                alt="Profile picture"
                className="rounded-full"
                height="40"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
              <div className="ml-4">
                <div className="text-sm font-semibold uppercase tracking-wide text-black dark:text-white">
                  Chamath Palihapitiya
                </div>
                <div className="text-gray-400 dark:text-gray-300">@chamath</div>
              </div>
            </div>
            <svg
              className=" h-6 w-6 fill-current text-blue-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-300">
            I’m in the arena trying stuff. Some will work, some won’t. But
            always learning. You’re anonymous and afraid of your own shadow.
            Enjoy the sidelines.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex space-x-4 text-gray-400 dark:text-gray-300">
              <div className="flex items-center">
                <svg
                  className=" h-6 w-6 text-red-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="ml-1 text-red-500">566</span>
              </div>
              <div className="flex items-center">
                <svg
                  className=" h-6 w-6 text-green-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                </svg>
                <span className="ml-1 text-green-500">241</span>
              </div>
              <div className="flex items-center">
                <svg
                  className=" h-6 w-6 text-blue-500"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m17 2 4 4-4 4" />
                  <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                  <path d="m7 22-4-4 4-4" />
                  <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                </svg>
                <span className="ml-1 text-blue-500">487</span>
              </div>
            </div>
            <div className="text-gray-400 dark:text-gray-300">
              7:22 AM · Aug 22, 2023
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}