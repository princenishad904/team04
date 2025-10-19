import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import registrationModal from "@/lib/registration.modal";

export async function POST(req) { 
    try {
        await connectDB();
        const data = await req.json();
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); 


        const isExist = await registrationModal.countDocuments({teamName:data.teamName});

        if(isExist >0){
            return NextResponse.json({
            message: "This team name already taken",
        });
        }

        const todayRegistrationCount = await registrationModal.countDocuments({
            createdAt: { 
                $gte: today, 
                $lt: tomorrow 
            }
        });

        // 3. Slot Count
        const slotCount = todayRegistrationCount+1; 


       const res = await registrationModal.create({...data,slot:slotCount});

       if(!res)
          return NextResponse.json({
        message:"Registation failed"})
        

        return NextResponse.json({
            message: "Registration success",
            data: res,
        });
        
    } catch (error) {
        console.error("POST Request Error:", error.message);
        // Agar req.json() parse nahi ho paata, toh bhi error handle ho jayega
        return NextResponse.json({ message: "Invalid JSON in request body or Internal Server Error" }, { status: 500 });
    }
}



