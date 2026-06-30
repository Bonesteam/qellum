"use client";
/*
 * LogoutButton.tsx — ФІКС
 * ❌ ПРИБРАНО: variant="solid" color="danger" — яскраво червона кнопка
 * ✅ variant="outlined" color="text" — нейтральна, не кричить
 */
import React from "react";
import { useAlert } from "@/context/AlertContext";
import { useAuthActions } from "@/utils/logoutClient";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { FaSignOutAlt } from "react-icons/fa";

export function LogoutButton({ all = false }: { all?: boolean }) {
    const { logout, logoutAll } = useAuthActions();
    const { showAlert } = useAlert();

    const handleClick = async () => {
        const ok = all ? await logoutAll() : await logout();
        showAlert(ok ? "Logged out" : "Logout failed", "", ok ? "success" : "error");
    };

    return (
        <ButtonUI
            /* ❌ БУЛО: variant="solid" color="danger" — червона */
            variant="outlined"
            color="textSecondary"
            textColor="textSecondary"
            size="lg"
            hoverEffect="none"
            hoverColor="text"
            hoverTextColor="backgroundLight"
            endIcon={<FaSignOutAlt />}
            onClick={handleClick}
        >
            {all ? "Log out from all devices" : "Log out"}
        </ButtonUI>
    );
}