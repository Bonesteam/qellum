"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock3, Loader2, Wallet } from "lucide-react";
import styles from "./PaymentStatus.module.scss";

type PaymentState =
    | { loading: true }
    | {
          loading: false;
          status: "credited" | "pending" | "failed" | "invalid";
          tokens?: number;
          balanceAfter?: number | null;
          message?: string;
      };

type Tone = "emerald" | "amber" | "rose";

function cn(...classNames: Array<string | false | null | undefined>) {
    return classNames.filter(Boolean).join(" ");
}

export default function PaymentStatusPage() {
    const searchParams = useSearchParams();
    const reference = searchParams.get("reference");
    const result = searchParams.get("result");
    const [state, setState] = useState<PaymentState>({ loading: true });

    useEffect(() => {
        if (!reference) {
            setState({ loading: false, status: "invalid", message: "Missing payment reference." });
            return;
        }

        let cancelled = false;
        let attempts = 0;

        const loadStatus = async () => {
            try {
                const response = await fetch(`/api/spoynt/status/${reference}`, { cache: "no-store" });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load payment status");
                }

                if (cancelled) return;

                if (data.status === "credited") {
                    localStorage.removeItem("checkoutData");
                    setState({
                        loading: false,
                        status: "credited",
                        tokens: data.tokens,
                        balanceAfter: data.balanceAfter,
                    });
                    return;
                }

                if (data.status === "pending") {
                    attempts += 1;
                    setState({
                        loading: attempts < 10,
                        status: "pending",
                        message: "Payment is still being processed.",
                    });

                    if (attempts < 10) {
                        window.setTimeout(loadStatus, 3000);
                    }
                    return;
                }

                setState({
                    loading: false,
                    status: "failed",
                    message: "Payment was not confirmed.",
                });
            } catch (error) {
                if (cancelled) return;

                setState({
                    loading: false,
                    status: "invalid",
                    message: error instanceof Error ? error.message : "Unable to verify payment",
                });
            }
        };

        loadStatus();

        return () => {
            cancelled = true;
        };
    }, [reference]);

    const statusConfig = state.loading
        ? {
              badge: "Processing",
              title: "We are verifying your payment",
              description: "Please wait a moment while we receive the final response from Spoynt and update your balance.",
              tone: "amber" as Tone,
              icon: <Loader2 size={24} className="animate-spin" />,
          }
        : state.status === "credited"
          ? {
                badge: "Confirmed",
                title: "Tokens have been credited",
                description: `Your payment was confirmed successfully and ${state.tokens} tokens were added to your account.`,
                tone: "emerald" as Tone,
                icon: <CheckCircle2 size={24} />,
            }
          : state.status === "pending"
            ? {
                  badge: "Pending",
                  title: "Payment is still pending",
                  description: "The provider has not sent the final confirmation yet. You can keep this page open or check again in a moment.",
                  tone: "amber" as Tone,
                  icon: <Clock3 size={24} />,
              }
            : {
                  badge: "Attention",
                  title: "Payment update required",
                  description: state.message || "We could not confirm this payment yet.",
                  tone: "rose" as Tone,
                  icon: <AlertCircle size={24} />,
              };

    const toneClass =
        statusConfig.tone === "emerald"
            ? styles.toneEmerald
            : statusConfig.tone === "rose"
              ? styles.toneRose
              : styles.toneAmber;

    const badgeClass =
        statusConfig.tone === "emerald"
            ? styles.badgeEmerald
            : statusConfig.tone === "rose"
              ? styles.badgeRose
              : styles.badgeAmber;

    const statusIconClass =
        statusConfig.tone === "emerald"
            ? styles.statusIconEmerald
            : statusConfig.tone === "rose"
              ? styles.statusIconRose
              : styles.statusIconAmber;

    return (
        <section className={styles.page}>
            <div className={cn(styles.orb, styles.orbLeft)} />
            <div className={cn(styles.orb, styles.orbRight)} />
            <div className={cn(styles.orb, styles.orbBottom)} />

            <div className={styles.shell}>
                <div className={styles.mainCard}>
                    <div className={styles.mainCardTopGlow} />
                    <div className={cn(styles.mainCardToneGlow, toneClass)} />

                    <div className={styles.mainInner}>
                        <div className={cn(styles.badge, badgeClass)}>
                            {statusConfig.icon}
                            <span>{statusConfig.badge}</span>
                        </div>

                        <div className={styles.hero}>
                            <div className={styles.heroCopy}>
                                <p className={styles.eyebrow}>Qellum Payment Center</p>
                                <h1 className={styles.title}>{statusConfig.title}</h1>
                                <p className={styles.description}>{statusConfig.description}</p>
                            </div>

                            <div className={styles.statusCard}>
                                <p className={styles.statusLabel}>Payment state</p>
                                <div className={styles.statusRow}>
                                    <div className={cn(styles.statusIcon, statusIconClass)}>{statusConfig.icon}</div>
                                    <div>
                                        <p className={styles.statusTitle}>{statusConfig.badge}</p>
                                        <p className={styles.statusMeta}>
                                            {state.loading ? "Syncing with provider" : "Latest verified result"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.metrics}>
                            <div className={styles.metricCard}>
                                <p className={styles.metricLabel}>Reference</p>
                                <p className={styles.metricValue}>{reference}</p>
                            </div>
                            <div className={styles.metricCard}>
                                <p className={styles.metricLabel}>Provider result</p>
                                <p className={styles.metricValue}>{result || "processing"}</p>
                            </div>
                            <div className={styles.metricCard}>
                                <p className={styles.metricLabel}>Product</p>
                                <p className={styles.metricValue}>Qellum token top-up</p>
                            </div>
                        </div>

                        <div className={styles.lowerGrid}>
                            <div className={styles.infoCard}>
                                <p className={styles.cardTitle}>What happens now</p>

                                <div className={styles.steps}>
                                    <div className={styles.step}>
                                        <div className={styles.stepDot} />
                                        <div>
                                            <p className={styles.stepTitle}>Status verification</p>
                                            <p className={styles.stepText}>
                                                We validate the provider response and match it with your account before updating token balance.
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.step}>
                                        <div
                                            className={cn(
                                                styles.stepDot,
                                                state.status === "credited" ? undefined : styles.stepDotSoft
                                            )}
                                        />
                                        <div>
                                            <p className={styles.stepTitle}>Token balance update</p>
                                            <p className={styles.stepText}>
                                                {state.status === "credited"
                                                    ? "Your balance has already been updated and is ready to use in the dashboard."
                                                    : "Once confirmation is received, tokens are added automatically without any extra action from you."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.actionCard}>
                                <p className={styles.cardTitle}>Quick actions</p>

                                <div className={styles.actionStack}>
                                    <Link href="/dashboard" className={styles.primaryButton}>
                                        Go to dashboard
                                    </Link>
                                    <Link href="/pricing" className={styles.secondaryButton}>
                                        <ArrowLeft size={18} />
                                        Back to pricing
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className={styles.sideCard}>
                    <div className={styles.sideHead}>
                        <div className={styles.walletIconWrap}>
                            <Wallet size={26} />
                        </div>
                        <div>
                            <p className={styles.cardTitle}>Payment details</p>
                            <p className={styles.sideTitle}>Qellum token top-up</p>
                        </div>
                    </div>

                    <div className={styles.details}>
                        {state.status === "credited" && (
                            <>
                                <div className={styles.detailBlock}>
                                    <p className={styles.metricLabel}>Tokens credited</p>
                                    <p className={styles.detailValueLarge}>{state.tokens}</p>
                                    <p className={styles.detailText}>
                                        Available immediately for meal generation and account usage.
                                    </p>
                                </div>

                                <div className={styles.detailBlock}>
                                    <p className={styles.metricLabel}>Current balance</p>
                                    <p className={styles.detailValueLarge}>
                                        {typeof state.balanceAfter === "number" ? state.balanceAfter : "Updated"}
                                    </p>
                                </div>
                            </>
                        )}

                        {state.loading && (
                            <div className={styles.detailBlock}>
                                <p className={styles.metricLabel}>Live verification</p>
                                <p className={styles.noteTitle}>Waiting for final provider confirmation</p>
                                <p className={styles.detailText}>
                                    This page auto-checks the payment status and will update as soon as Spoynt confirms the transaction.
                                </p>
                            </div>
                        )}

                        {!state.loading && state.status !== "credited" && (
                            <div className={styles.detailBlock}>
                                <p className={styles.metricLabel}>Next step</p>
                                <p className={styles.noteTitle}>Refresh or try again</p>
                                <p className={styles.detailText}>
                                    If the payment was completed on the provider side, wait a minute and refresh this page. If the transaction failed, return to pricing and try again.
                                </p>
                            </div>
                        )}

                        <div className={styles.noteCard}>
                            <p className={styles.noteTitle}>Support note</p>
                            <p className={styles.noteText}>
                                If your provider charged the card but this page does not update after a few minutes, contact support with your payment reference so the transaction can be checked quickly.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
