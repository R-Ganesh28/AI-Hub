"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usageCount } from "@/actions/chatbot/Chatbot";
import { useUser } from "@clerk/nextjs";
import { checkUserSubscription } from "@/actions/chatbot/stripe";

interface UsageContextType {
  count: number;
  fetchUsage: () => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  subscribed: boolean;
  subscribedLoading: boolean;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const UsageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribedLoading, setSubscribedLoading] = useState(true);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (email) {
      fetchUsage();
      fetchUserSubscription();
    }
  }, [email]);

  useEffect(() => {
    if (
      !subscribedLoading &&
      !subscribed &&
      count > Number(process.env.NEXT_PUBLIC_FREE_TIER_USAGE)
    ) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [count, subscribed, subscribedLoading]);

  const fetchUsage = async () => {
    const response = await usageCount(email);
    setCount(response);
  };

  const fetchUserSubscription = async () => {
    setSubscribedLoading(true);
    try {
      const response = await checkUserSubscription();
      setSubscribed(response?.ok || false);
    } catch (error) {
      console.error("Error fetching subscription:", error);
      setSubscribed(false);
    } finally {
      setSubscribedLoading(false);
    }
  };

  return (
    <UsageContext.Provider
      value={{
        count,
        fetchUsage,
        openModal,
        setOpenModal,
        subscribed,
        subscribedLoading,
      }}
    >
      {children}
    </UsageContext.Provider>
  );
};

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (context == null) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return context;
};
