import React from "react";
import {useUser} from "@/context/UserContext";
import ButtonUI from "@/components/ui/button/ButtonUI";
import Link from "next/link";
import styles from "./AuthButtons.module.scss";
import {FaUser} from "react-icons/fa";
import {GrMoney} from "react-icons/gr";

const AuthButtons: React.FC = () => {
    const user = useUser();

    if (user) {
        return (
            <div className={styles.userContainer}>

                <Link href="/dashboard" className={styles.dashboardButton}>
                    <ButtonUI
                        text="Create Meal"
                        shape="default"
                        hoverColor="linkHover"
                        hoverEffect="scale"
                        fullWidth
                        textColor="text"
                    />
                </Link>

                <Link href="/profile" className={styles.userCard}>
                    <div className={styles.userBalance}>
                        <GrMoney className={styles.tokenIcon}/>
                        <span className={styles.balanceText}>{user?.tokens ?? 0} Tokens</span>
                    </div>
                    <div className={styles.userIconWrapper}>
                        <FaUser className={styles.userIcon}/>
                    </div>
                </Link>

            </div>
        );
    }

    // 🔹 Якщо неавторизований
    return (
        <div className={styles.nonAuthedButtons}>
            <Link href="/sign-in">
                <ButtonUI
                    text="Sign In"
                    color="tertiary"
                    shape="default"
                    hoverColor="link"
                    hoverEffect="none"
                    fullWidth
                    textColor="text"
                />
            </Link>
            <Link href="/sign-up">
                <ButtonUI
                    text="Sign Up"
                    shape="default"
                    color="backgroundDark"
                    hoverColor="secondary"
                    hoverEffect="none"
                    fullWidth
                    textColor="link"
                />
            </Link>
        </div>
    );
};

export default AuthButtons;
