"use client";

import React, { useState } from "react";
import AllOrders from "@/components/widgets/all-orders/AllOrders";
import TransactionHistory from "@/components/widgets/all-transactions/AllTransactions";
import { FaListUl, FaExchangeAlt, FaHeartbeat, FaChartPie } from "react-icons/fa";
import styles from "./Dashboard.module.scss";
import MealTracker from "./MealTracker";

type Tab = "orders" | "transactions" | "tracker";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<Tab>("orders");

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: "orders", label: "Orders", icon: <FaListUl /> },
        { id: "transactions", label: "Transactions", icon: <FaExchangeAlt /> },
        { id: "tracker", label: "Meal Tracker", icon: <FaHeartbeat /> },
    ];

    return (
        <div className={styles.dashboard}>
            {/* 🔹 Tab Navigation */}
            <div className={styles.toggleBar}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`${styles.toggleButton} ${activeTab === tab.id ? styles.active : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* 🔹 Content */}
            <div className={styles.content}>
                {activeTab === "orders" && (
                    <div key="orders" className={styles.fadeIn}>
                        <AllOrders />
                    </div>
                )}
                {activeTab === "transactions" && (
                    <div key="transactions" className={styles.fadeIn}>
                        <TransactionHistory />
                    </div>
                )}
                {activeTab === "tracker" && (
                    <div key="tracker" className={styles.fadeIn}>
                        <MealTracker />
                    </div>
                )}
            </div>
        </div>
    );
}
