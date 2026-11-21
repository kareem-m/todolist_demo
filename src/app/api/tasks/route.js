import { NextResponse } from "next/server";
import { tasks, deleteTask, updateTask } from "./tasks-store";

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

export async function PATCH(request) {
  let body = {};

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const url = new URL(request.url);
  const idValue = body.id ?? url.searchParams.get("id");
  const id = Number(idValue);

  if (!idValue || !Number.isInteger(id)) {
    return NextResponse.json(
      { message: "Valid task id is required" },
      { status: 400 }
    );
  }

  if (
    typeof body.completed !== "undefined" &&
    typeof body.completed !== "boolean"
  ) {
    return NextResponse.json(
      { message: "Completed must be a boolean" },
      { status: 400 }
    );
  }

  const task = updateTask(id, body.completed);

  if (!task) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(task);
}

export async function DELETE(request) {
  let body = {};

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const url = new URL(request.url);
  const idValue = body.id ?? url.searchParams.get("id");
  const id = Number(idValue);

  if (!idValue || !Number.isInteger(id)) {
    return NextResponse.json(
      { message: "Valid task id is required" },
      { status: 400 }
    );
  }

  const task = deleteTask(id);

  if (!task) {
    return NextResponse.json(
      { message: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Task deleted", task },
    { status: 200 }
  );
}