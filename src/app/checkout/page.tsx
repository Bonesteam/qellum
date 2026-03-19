"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/ui/button/ButtonUI";
import { Loader2 } from "lucide-react";
import CheckoutLayout from "@/components/constructor/checkout/CheckoutLayout";

export default function CheckoutPage() {
  const router = useRouter();
  const [checkout, setCheckout] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (!data) router.push("/pricing");
    else setCheckout(JSON.parse(data));
  }, [router]);

  if (!checkout) return null;

  const subtotal = checkout.amount;
  const vatAmount = 0;
  const total = subtotal;

  const submitRedirectForm = (url: string, params: Record<string, string>) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;

    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/spoynt/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency: checkout.currency,
          tokens: checkout.tokens,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment creation failed");

      if (data.redirectMethod === "POST") {
        submitRedirectForm(data.redirectUrl, data.redirectParams || {});
        return;
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-900">Secure hosted checkout</p>
        <p className="mt-2">
          You will be redirected to the payment provider page to complete the card payment and 3D Secure verification.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
        <p><strong>Email:</strong> {checkout.email}</p>
        <p className="mt-2"><strong>Tokens:</strong> {checkout.tokens}</p>
        <p className="mt-2"><strong>Currency:</strong> {checkout.currency}</p>
      </div>

      <Button
        size="lg"
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        fullWidth
        sx={{ mt: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Redirecting...
          </>
        ) : (
          <>Pay {total.toFixed(2)} {checkout.currency}</>
        )}
      </Button>
    </div>
);

  return <CheckoutLayout checkout={checkout} success={false} subtotal={subtotal} vatAmount={vatAmount} total={total} form={form} />;
}
