"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CVOrderType } from "@/backend/types/cv.types";

export interface AiOrder {
    _id: string;
    userId: string;
    email: string;
    prompt: string;
    response: string;
    createdAt: string;
}

interface AllOrdersContextType {
    aiOrders: AiOrder[];
    cvOrders: CVOrderType[];
    refreshOrders: () => Promise<void>;
    loading: boolean;
}

const AllOrdersContext = createContext<AllOrdersContextType>({
    aiOrders: [],
    cvOrders: [],
    refreshOrders: async () => {},
    loading: false,
});

export const useAllOrders = () => useContext(AllOrdersContext);

export const AllOrdersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [aiOrders, setAiOrders] = useState<AiOrder[]>([]);
    // Keep cvOrders in the context for compatibility, but we no longer fetch CV orders for the meal-plans profile.
    const [cvOrders, setCvOrders] = useState<CVOrderType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            // 🔹 Fetch meal/AI orders (used as Meal Plans)
            const resAi = await fetch("/api/universal/get-orders", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }).catch(() => null);
            if (resAi) {
                const dataAi = await resAi.json();
                const normalizedAi = Array.isArray(dataAi) ? dataAi : dataAi.orders;
                setAiOrders(Array.isArray(normalizedAi) ? normalizedAi : []);
            }
        } catch (err: any) {
            console.error("❌ [AllOrdersContext] Error fetching orders:", err.message);
            setAiOrders([]);
            setCvOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <AllOrdersContext.Provider value={{ aiOrders, cvOrders, refreshOrders: fetchOrders, loading }}>
            {children}
        </AllOrdersContext.Provider>
    );
};
