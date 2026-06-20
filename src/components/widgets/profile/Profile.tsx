import React from "react";
import ProfileHead from "@/components/features/profile-head/ProfileHead";
import BalanceCard from "@/components/features/balance-card/BalanceCard";
import Dashboard from "@/components/features/dashboard/Dashboard";
import styles from "./Profile.module.scss";

interface ProfileProps {
    defaultTab?: "orders" | "transactions" | "tracker" | "generator";
}

const Profile: React.FC<ProfileProps> = ({ defaultTab }) => {
    return (
        <div className={styles.profilePage}>
            <ProfileHead />
            <div className={styles.cardsRow}>
                <BalanceCard />
            </div>
            <Dashboard defaultTab={defaultTab} />
        </div>
    );
};

export default Profile;
