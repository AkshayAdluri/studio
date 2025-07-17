'use server';

import Razorpay from 'razorpay';
import shortid from 'shortid';
import crypto from 'crypto';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_API_SECRET!,
});

export async function createRazorpayOrder(options: { amount: number }) {
  const payment_capture = 1;
  const amount = options.amount;
  const currency = "INR";

  const rzpOptions = {
    amount: amount.toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(rzpOptions);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function verifyPayment(data: { orderId: string, paymentId: string, signature: string }) {
  const { orderId, paymentId, signature } = data;
  const secret = process.env.RAZORPAY_API_SECRET!;

  const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === signature;
}
