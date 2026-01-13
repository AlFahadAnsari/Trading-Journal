
import db from "@/lib/db";
import { NextResponse } from "next/server";


interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  try {
    const journal = await db.journal.findUnique({
      where: { id: params.id },
    });

    if (!journal)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: journal });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch journal" },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request, { params }: Params) {
  try {
    const data = await req.json();

    const updated = await db.journal.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update journal" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    await db.journal.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to delete journal" },
      { status: 500 }
    );
  }
}
