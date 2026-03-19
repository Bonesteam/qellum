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
              accentClass: "from-amber-100 via-white to-[#fff3df]",
              glowClass: "bg-amber-300/30",
              ringClass: "border-amber-200",
          }
        : state.status === "credited"
          ? {
                badge: "Confirmed",
                title: "Tokens have been credited",
                description: `Your payment was confirmed successfully and ${state.tokens} tokens were added to your account.`,
                tone: "emerald",
                icon: <CheckCircle2 className="h-6 w-6" />,
                accentClass: "from-emerald-100 via-white to-[#f0fff7]",
                glowClass: "bg-emerald-300/30",
                ringClass: "border-emerald-200",
            }
          : state.status === "pending"
            ? {
                  badge: "Pending",
                  title: "Payment is still pending",
                  description: "The provider has not sent the final confirmation yet. You can keep this page open or check again in a moment.",
                  tone: "amber",
                  icon: <Clock3 className="h-6 w-6" />,
                  accentClass: "from-amber-100 via-white to-[#fff3df]",
                  glowClass: "bg-amber-300/30",
                  ringClass: "border-amber-200",
              }
            : {
                  badge: "Attention",
                  title: "Payment update required",
                  description: state.message || "We could not confirm this payment yet.",
                  tone: "rose",
                  icon: <AlertCircle className="h-6 w-6" />,
                  accentClass: "from-rose-100 via-white to-[#fff4f3]",
                  glowClass: "bg-rose-300/30",
                  ringClass: "border-rose-200",
              };

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffe3cb_0%,#fff8ef_34%,#fffdf9_100%)]">
            <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#f8c7a2]/30 blur-3xl" />
            <div className="absolute right-[-6rem] top-12 h-64 w-64 rounded-full bg-[#ffd7bf]/40 blur-3xl" />
            <div className="absolute bottom-[-8rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#f4b28f]/20 blur-3xl" />
            <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-6xl items-center justify-center px-4 py-14 md:px-6 md:py-20">
                <div className="grid w-full gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="relative overflow-hidden rounded-[34px] border border-[#efd6c1] bg-white/90 p-7 shadow-[0_30px_100px_rgba(120,72,24,0.10)] backdrop-blur md:p-9">
                        <div className={`absolute right-[-3rem] top-[-3rem] h-36 w-36 rounded-full blur-3xl ${statusConfig.glowClass}`} />
                        <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-r ${statusConfig.accentClass}`} />
                        <div className="relative">
                            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur ${
                            statusConfig.tone === "emerald"
                                ? "border-emerald-200 bg-emerald-50/90 text-emerald-700"
                                : statusConfig.tone === "rose"
                                  ? "border-rose-200 bg-rose-50/90 text-rose-700"
                                  : "border-amber-200 bg-amber-50/90 text-amber-700"
                        }`}>
                            {statusConfig.icon}
                            <span>{statusConfig.badge}</span>
                            </div>

                            <div className="mt-7 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                                <div className="max-w-2xl">
                                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#c18a67]">
                                        Qellum Payment Center
                                    </p>
                                    <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#4b342c] md:text-[3.4rem]">
                                        {statusConfig.title}
                                    </h1>
                                    <p className="mt-4 max-w-2xl text-base leading-8 text-[#7b6255] md:text-lg">
                                        {statusConfig.description}
                                    </p>
                                </div>

                                <div className={`rounded-[28px] border ${statusConfig.ringClass} bg-white/80 p-5 shadow-[0_18px_40px_rgba(120,72,24,0.08)]`}>
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c18a67]">
                                        Payment state
                                    </p>
                                    <div className="mt-3 flex items-center gap-3">
                                        <div className={`rounded-2xl p-3 ${
                                            statusConfig.tone === "emerald"
                                                ? "bg-emerald-50 text-emerald-700"
                                                : statusConfig.tone === "rose"
                                                  ? "bg-rose-50 text-rose-700"
                                                  : "bg-amber-50 text-amber-700"
                                        }`}>
                                            {statusConfig.icon}
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-[#4b342c]">{statusConfig.badge}</p>
                                            <p className="text-sm text-[#8a6d5d]">
                                                {state.loading ? "Syncing with provider" : "Latest verified result"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 md:grid-cols-3">
                                <div className="rounded-[24px] border border-[#f2e2d2] bg-[#fffaf4] p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c18a67]">
                                        Reference
                                    </p>
                                    <p className="mt-3 break-all text-sm font-medium leading-6 text-[#4b342c]">{reference}</p>
                                </div>

                                <div className="rounded-[24px] border border-[#f2e2d2] bg-[#fffaf4] p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c18a67]">
                                        Provider result
                                    </p>
                                    <p className="mt-3 text-sm font-medium capitalize text-[#4b342c]">
                                        {result || "processing"}
                                    </p>
                                </div>

                                <div className="rounded-[24px] border border-[#f2e2d2] bg-[#fffaf4] p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c18a67]">
                                        Product
                                    </p>
                                    <p className="mt-3 text-sm font-medium text-[#4b342c]">
                                        Qellum token top-up
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                                <div className="rounded-[28px] border border-[#f0dfd1] bg-[#fff8f1] p-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c18a67]">
                                        What happens now
                                    </p>
                                    <div className="mt-5 space-y-4">
                                        <div className="flex gap-4">
                                            <div className="mt-1 h-3 w-3 rounded-full bg-[#ec7331]" />
                                            <div>
                                                <p className="font-semibold text-[#4b342c]">Status verification</p>
                                                <p className="mt-1 text-sm leading-7 text-[#80675a]">
                                                    We validate the provider response and match it with your account before updating token balance.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className={`mt-1 h-3 w-3 rounded-full ${
                                                state.status === "credited" ? "bg-emerald-500" : "bg-[#e7c6ad]"
                                            }`} />
                                            <div>
                                                <p className="font-semibold text-[#4b342c]">Token balance update</p>
                                                <p className="mt-1 text-sm leading-7 text-[#80675a]">
                                                    {state.status === "credited"
                                                        ? "Your balance has already been updated and is ready to use in the dashboard."
                                                        : "Once confirmation is received, tokens are added automatically without any extra action from you."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-[#f0dfd1] bg-white p-6 shadow-[0_12px_32px_rgba(120,72,24,0.06)]">
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c18a67]">
                                        Quick actions
                                    </p>
                                    <div className="mt-5 flex flex-col gap-3">
                                        <Link
                                            href="/dashboard"
                                            className="rounded-full bg-[#ec7331] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#d86222]"
                                        >
                                            Go to dashboard
                                        </Link>
                                        <Link
                                            href="/pricing"
                                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e2c6ad] px-5 py-3 text-sm font-semibold text-[#6e5446] transition hover:border-[#d49c76] hover:text-[#4b342c]"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Back to pricing
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-[34px] border border-[#efd6c1] bg-[linear-gradient(180deg,#fff8ef_0%,#fff3e6_100%)] p-7 shadow-[0_24px_80px_rgba(120,72,24,0.08)] md:p-8">
                        <div className="flex items-center gap-3 text-[#4b342c]">
                            <div className="rounded-2xl bg-white p-3 shadow-[0_12px_28px_rgba(120,72,24,0.08)]">
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
                                    <div className="rounded-[24px] border border-emerald-100 bg-white p-5">
                                        <p className="text-sm text-[#9c7b67]">Tokens credited</p>
                                        <p className="mt-2 text-3xl font-semibold text-[#4b342c]">{state.tokens}</p>
                                        <p className="mt-2 text-sm text-[#7f6658]">
                                            Available immediately for meal generation and account usage.
                                        </p>
                                    </div>
                                    <div className="rounded-[24px] border border-[#f2e2d2] bg-white p-5">
                                        <p className="text-sm text-[#9c7b67]">Current balance</p>
                                        <p className="mt-2 text-3xl font-semibold text-[#4b342c]">
                                            {typeof state.balanceAfter === "number" ? state.balanceAfter : "Updated"}
                                        </p>
                                    </div>
                                </>
                            )}

                            {state.loading && (
                                <div className="rounded-[24px] border border-[#f2e2d2] bg-white p-5 text-[#6e5446]">
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
                                <div className="rounded-[24px] border border-[#f2e2d2] bg-white p-5 text-[#6e5446]">
                                    <p className="font-medium text-[#4b342c]">What to do next</p>
                                    <p className="mt-3 text-sm leading-7 text-[#8b6c5d]">
                                        If the payment was completed on the provider side, wait a minute and refresh this page. If the transaction failed, return to pricing and try again.
                                    </p>
                                </div>
                            )}

                            <div className="rounded-[24px] border border-[#f2e2d2] bg-white/90 p-5">
                                <p className="text-sm font-semibold text-[#4b342c]">Support note</p>
                                <p className="mt-3 text-sm leading-7 text-[#8b6c5d]">
                                    If your provider charged the card but this page does not update after a few minutes, contact support with your payment reference so the transaction can be checked quickly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
