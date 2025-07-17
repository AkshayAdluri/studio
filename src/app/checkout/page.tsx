'use client';

import { CheckoutForm } from "@/components/CheckoutForm";
import Script from "next/script";

export default function CheckoutPage() {
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline text-center">Checkout</h1>
        <CheckoutForm />
      </div>
    </>
  );
}
