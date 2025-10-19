import { NextResponse } from "next/server";

import registrationModal from "@/lib/registration.modal";
import { connectDB } from "@/lib/db";

export async function GET(req) {
  try {
   await connectDB()

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "before"; // before | after
    const dateParam = searchParams.get("date");
    const code = searchParams.get("code")

 

    // Get today's date or provided date
    const today = dateParam ? new Date(dateParam) : new Date();

    // Build start and end of the day
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    // 9:30 PM marker for the same day
    const nineThirtyPM = new Date(today);
    nineThirtyPM.setHours(21, 30, 0, 0); // 21:30 = 9:30 PM

    let query = { createdAt: { $gte: startOfDay, $lte: endOfDay }, code };

    if (filter === "before") {
      query.createdAt.$lte = nineThirtyPM;
    } else if (filter === "after") {
      query.createdAt.$gte = nineThirtyPM;
    }

    const data = await registrationModal.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: data.length, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
