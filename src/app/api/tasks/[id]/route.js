import { NextResponse } from "next/server";
import { deleteTask, updateTask } from "../tasks-store";

export async function PATCH(request, context) {
  const { id: idValue } = await context.params;
  const id = Number(idValue);

  if (!Number.isInteger(id)) {
    return NextResponse.json(
      { message: "Valid task id is required" },
      { status: 400 }
    );
  }

  let body = {};

  try {
    body = await request.json();
  } catch {
    body = {};
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

export async function DELETE(request, context) {
  const { id: idValue } = await context.params;
  const id = Number(idValue);

  if (!Number.isInteger(id)) {
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
