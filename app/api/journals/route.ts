
import db from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const journals = await db.journal.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: journals });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch journals" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const created = await db.journal.create({
      
      data: body,
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create journal" },
      { status: 500 }
    );
  }
}
