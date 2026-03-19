"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock3, Loader2, Wallet } from "lucide-react";

type PaymentState =
    | { loading: true }
    | {
          loading: false;
          status: "credited" | "pending" | "failed" | "invalid";
          tokens?: number;
          balanceAfter?: number | null;
          message?: string;
      };

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
              tone: "amber",
              icon: <Loader2 className="h-6 w-6 animate-spin" />,
          }
        : state.status === "credited"
          ? {
                badge: "Confirmed",
                title: "Tokens have been credited",
                description: `Your payment was confirmed successfully and ${state.tokens} tokens were added to your account.`,
                tone: "emerald",
                icon: <CheckCircle2 className="h-6 w-6" />,
            }
          : state.status === "pending"
            ? {
                  badge: "Pending",
                  title: "Payment is still pending",
                  description: "The provider has not sent the final confirmation yet. You can keep this page open or check again in a moment.",
                  tone: "amber",
                  icon: <Clock3 className="h-6 w-6" />,
              }
            : {
                  badge: "Attention",
                  title: "Payment update required",
                  description: state.message || "We could not confirm this payment yet.",
                  tone: "rose",
                  icon: <AlertCircle className="h-6 w-6" />,
              };

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#ffe5d0_0%,#fff8ef_32%,#fffdf9_100%)]">
            <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(236,115,49,0.12),transparent)]" />
            <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-16">
                <div className="grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[32px] border border-[#f2d8c4] bg-white/90 p-8 shadow-[0_30px_100px_rgba(120,72,24,0.08)] backdrop-blur">
                        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                            statusConfig.tone === "emerald"
                                ? "bg-emerald-50 text-emerald-700"
                                : statusConfig.tone === "rose"
                                  ? "bg-rose-50 text-rose-700"
                                  : "bg-amber-50 text-amber-700"
                        }`}>
                            {statusConfig.icon}
                            <span>{statusConfig.badge}</span>
                        </div>

                        <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight text-[#4b342c]">
                            {statusConfig.title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-[#7b6255]">
                            {statusConfig.description}
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[24px] border border-[#f2e2d2] bg-[#fffaf4] p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c18a67]">
                                    Reference
                                </p>
                                <p className="mt-3 break-all text-sm font-medium text-[#4b342c]">{reference}</p>
                            </div>

                            <div className="rounded-[24px] border border-[#f2e2d2] bg-[#fffaf4] p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c18a67]">
                                    Return result
                                </p>
                                <p className="mt-3 text-sm font-medium capitalize text-[#4b342c]">
                                    {result || "processing"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/pricing"
                                className="inline-flex items-center gap-2 rounded-full border border-[#e2c6ad] px-5 py-3 text-sm font-semibold text-[#6e5446] transition hover:border-[#d49c76] hover:text-[#4b342c]"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to pricing
                            </Link>
                            <Link
                                href="/dashboard"
                                className="rounded-full bg-[#ec7331] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d86222]"
                            >
                                Go to dashboard
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-[#f2d8c4] bg-[#fff7ef] p-8 shadow-[0_24px_80px_rgba(120,72,24,0.06)]">
                        <div className="flex items-center gap-3 text-[#4b342c]">
                            <div className="rounded-2xl bg-white p-3 shadow-sm">
                                <Wallet className="h-6 w-6 text-[#ec7331]" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#c18a67]">
                                    Payment details
                                </p>
                                <p className="mt-1 text-lg font-semibold">Qellum token top-up</p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            {state.status === "credited" && (
                                <>
                                    <div className="rounded-[22px] bg-white p-5">
                                        <p className="text-sm text-[#9c7b67]">Tokens credited</p>
                                        <p className="mt-2 text-3xl font-semibold text-[#4b342c]">{state.tokens}</p>
                                    </div>
                                    <div className="rounded-[22px] bg-white p-5">
                                        <p className="text-sm text-[#9c7b67]">Current balance</p>
                                        <p className="mt-2 text-3xl font-semibold text-[#4b342c]">
                                            {typeof state.balanceAfter === "number" ? state.balanceAfter : "Updated"}
                                        </p>
                                    </div>
                                </>
                            )}

                            {state.loading && (
                                <div className="rounded-[22px] bg-white p-5 text-[#6e5446]">
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="h-5 w-5 animate-spin text-[#ec7331]" />
                                        <span className="font-medium">Waiting for final provider confirmation</span>
                                    </div>
                                    <p className="mt-3 text-sm leading-7 text-[#8b6c5d]">
                                        This page auto-checks the payment status and will update as soon as Spoynt confirms the transaction.
                                    </p>
                                </div>
                            )}

                            {!state.loading && state.status !== "credited" && (
                                <div className="rounded-[22px] bg-white p-5 text-[#6e5446]">
                                    <p className="font-medium text-[#4b342c]">What to do next</p>
                                    <p className="mt-3 text-sm leading-7 text-[#8b6c5d]">
                                        If the payment was completed on the provider side, wait a minute and refresh this page. If the transaction failed, return to pricing and try again.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
