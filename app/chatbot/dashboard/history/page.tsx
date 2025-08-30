"use client";

import React, { useState, useEffect } from "react";
import { getQueries } from "@/actions/chatbot/Chatbot";
import { useUser } from "@clerk/clerk-react";
import { Loader2Icon, ArrowDown } from "lucide-react";
import QueryTable from "@/components/chatbot/table/query-table";
import { QueryResponse } from "@/utils/chatbot/types";

export default function Page() {
  const [queries, setQueries] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (page === 1 && email) fetchQueries();
  }, [page, email]);

  useEffect(() => {
    if (page > 1 && email) loadMore();
  }, [page]);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const res = (await getQueries(email, page, perPage)) as QueryResponse;
      setQueries(res.queries);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    try {
      const res = (await getQueries(email, page, perPage)) as QueryResponse;
      setQueries([...queries, ...res.queries]);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!queries.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin mr-2" />
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="p-10 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
        <h1 className="text-xl">History</h1>
        <p className="text-sm text-gray-500">Your previous search results</p>
      </div>
      <div>
        <QueryTable data={queries} />
      </div>
      <div className="text-center my-5">
        {page < totalPages && (
          <button
            onClick={() => !loading && setPage(page + 1)}
            disabled={loading}
            className="w-35 cursor-pointer transition-all duration-300"
          >
            {loading ? (
              <div className="flex justify-center items-center hover:scale-90 transition-transform duration-300">
                <Loader2Icon className="animate-spin mr-2" />
              </div>
            ) : (
              <div className="flex justify-center items-center hover:scale-90 transition-transform duration-300">
                <span className="text-base">Load more</span>
                <ArrowDown className="ml-1 w-4 h-4" />
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
