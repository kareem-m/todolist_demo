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
 
  const task = updateTask(id);

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
