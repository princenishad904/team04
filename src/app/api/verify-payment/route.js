import { connectDB } from "@/lib/db";
import axios from "axios";
import { NextResponse } from "next/server";
import registrationModal from "@/lib/registration.modal";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  await connectDB()


  try {
    const headers = {
      accept: "application/json",
      "x-api-version": "2025-01-01",
      "x-client-id": process.env.CASHFREE_APP_ID,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY,
    };

    // const response = await axios.get(
    //   `https://sandbox.cashfree.com/pg/orders/${orderId}`,
    //   { headers }
    // );

    const response = await axios.get(
  `https://api.cashfree.com/pg/orders/${orderId}`,
  { headers }
);





    if(response.data.order_status === "PAID"){

      await registrationModal.findOneAndUpdate({order_id:orderId},{$set:{
        
payment_status:"paid",
status:"confirmed"
      }})

    }






    return NextResponse.json({
      order_id: orderId,
      order_status: response.data.order_status, // PAID / FAILED / PENDING
      reference_id: response.data.cf_payment_id
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
