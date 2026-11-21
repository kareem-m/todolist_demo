import { NextResponse } from "next/server";
import { tasks } from "./tasks-store";

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request) {
  const { title } = await request.json();

  if (!title || !title.trim()) {
    return NextResponse.json(
      { message: "Task title is required" },
      { status: 400 }
    );
  }

  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);

  return NextResponse.json(newTask, { status: 201 });
}
