import axios from "axios";
import { NextResponse } from "next/server";

import registrationModal from "@/lib/registration.modal";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();


    
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check multiple conditions at once
    const [existingTeamRegistration, todayRegistrationCount] = await Promise.all([
      // Check if team name already exists for this tournament code today
      registrationModal.findOne({
        teamName: body.teamName,
        code: body.code,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      }),

      // Count today's registrations
      registrationModal.countDocuments({
        code:body.code,
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      }),

   
    ]);

    // Check if team name already taken in this tournament
    if (existingTeamRegistration) {
      return NextResponse.json(
        { message: "This team name is already taken for this tournament" },
        { status: 400 }
      );
    }

    // Check if slots are full for today
    if (todayRegistrationCount >= 18) {
      return NextResponse.json(
        { message: "Slots are full for today. Registration will open again tomorrow." },
        { status: 400 }
      );
    }

 

    const slotCount = todayRegistrationCount + 1;

    // Create order payload
    const data = {
      order_amount: body.amount,
      order_currency: "INR",
      customer_details: {
        customer_id: "cust_001",
        customer_name: body.teamName,
        customer_email: "",
        customer_phone: body.whatsAppNumber,
      },
    };

    // Use your Cashfree credentials here
 const headers = { 
  "x-api-version": "2022-09-01",
  "x-client-id": process.env.CASHFREE_APP_ID,
  "x-client-secret": process.env.CASHFREE_SECRET_KEY,
  "Content-Type": "application/json",
  Accept: "application/json",
};


    const response = await axios.post(
      // "https://sandbox.cashfree.com/pg/orders",
      "https://api.cashfree.com/pg/orders",
      data,
      { headers }
    );

    const registration = {
      whatsAppNumbr: body.whatsAppNumber,
      teamName: body.teamName,
      player1: body.player1,
      player2: body.player2,
      player3: body.player3,
      player4: body.player4,
      backupPlayer1: body.backupPlayer1,
      backupPlayer2: body.backupPlayer2,
      slot: slotCount,
      order_id: response.data.order_id,
      payment_status: "pending",
      status: "pending",
      code: body.code
    };

    await registrationModal.create(registration);

    return NextResponse.json(response.data);
  } catch (err) {
    // console.error(err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || "Failed to create order" },
      { status: 500 }
    );
  }
}