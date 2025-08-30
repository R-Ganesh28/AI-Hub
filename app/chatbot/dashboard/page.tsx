"use client";

import template from "@/utils/chatbot/template";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");

  const filteredTemplate = template.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-2">
      <div className="p-10 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">What would you like to create today?</h1>
        <div className="w-full flex justify-center">
          <div className="flex gap-2 items-center p-2 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md bg-transparent my-5 w-[100%] md:w-[50%]">
            <Search className="text-primary" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent w-full outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {filteredTemplate.map((item) => (
          <Link
            key={item.slug}
            href={`/chatbot/dashboard/template/${item.slug}`}
            className="p-5 rounded-md border flex flex-col gap-3 cursor-pointer hover:shadow-lg dark:shadow-gray-900 transition-shadow duration-300"
          >
            <Image src={item.icon} alt={item.name} width={50} height={50} />
            <h2>{item.name}</h2>
            <p>{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
