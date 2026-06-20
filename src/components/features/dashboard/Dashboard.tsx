"use client";

import React, { useState } from "react";
import AllOrders from "@/components/widgets/all-orders/AllOrders";
import TransactionHistory from "@/components/widgets/all-transactions/AllTransactions";
import ManualGenerator from "@/components/widgets/manual-generator/ManualGenerator";
import { FaListUl, FaExchangeAlt, FaHeartbeat, FaPlusCircle, FaComments } from "react-icons/fa";
import styles from "./Dashboard.module.scss";
import MealTracker from "./MealTracker";
import ChefConsultation from "./ChefConsultation";

type Tab = "orders" | "transactions" | "tracker" | "generator" | "chef";

interface DashboardProps {
    defaultTab?: Tab;
}

export default function Dashboard({ defaultTab = "orders" }: DashboardProps) {
    const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

    const tabs: { id: Tab; label: string; icon: React.ReactNode; description: string }[] = [
        { id: "tracker",      label: "Meal Tracker",  icon: <FaHeartbeat />,  description: "Daily nutrition" },
        { id: "generator",   label: "Create Plan",   icon: <FaPlusCircle />, description: "New meal plan" },
        { id: "chef",        label: "Chef Chat",     icon: <FaComments />,   description: "Talk to your chef" },
        { id: "orders",      label: "Orders",        icon: <FaListUl />,     description: "Your purchases" },
        { id: "transactions",label: "Transactions",  icon: <FaExchangeAlt />,description: "Token history" },
    ];

    const activeTabData = tabs.find((t) => t.id === activeTab);

    return (
        <div className={styles.dashboardShell}>
            {/* ── Sidebar ── */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarBrand}>
                    <span className={styles.sidebarBrandIcon}>🍽️</span>
                    <span className={styles.sidebarBrandLabel}>My Dashboard</span>
                </div>

                <nav className={styles.sidebarNav}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.navItem} ${activeTab === tab.id ? styles.navItemActive : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className={styles.navIcon}>{tab.icon}</span>
                            <span className={styles.navText}>
                                <span className={styles.navLabel}>{tab.label}</span>
                                <span className={styles.navDesc}>{tab.description}</span>
                            </span>
                            {activeTab === tab.id && <span className={styles.navIndicator} />}
                        </button>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <span className={styles.sidebarFooterDot} />
                    <span className={styles.sidebarFooterText}>Active plan</span>
                </div>
            </aside>

            {/* ── Main content ── */}
            <main className={styles.mainPanel}>
                {/* Top bar */}
                <div className={styles.topBar}>
                    <div className={styles.topBarLeft}>
                        <h1 className={styles.topBarTitle}>{activeTabData?.label}</h1>
                        <p className={styles.topBarDesc}>{activeTabData?.description}</p>
                    </div>
                </div>

                {/* Mobile tab strip */}
                <div className={styles.mobileTabStrip}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.mobileTab} ${activeTab === tab.id ? styles.mobileTabActive : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className={styles.contentArea}>
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
                    {activeTab === "generator" && (
                        <div key="generator" className={styles.fadeIn}>
                            <ManualGenerator onSuccess={() => setActiveTab("orders")} />
                        </div>
                    )}
                    {activeTab === "chef" && (
                        <div key="chef" className={styles.fadeIn}>
                            <ChefConsultation />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
