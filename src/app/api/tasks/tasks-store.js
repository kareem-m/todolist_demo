export let tasks = [
  {
    id: 1,
    title: "Learn HTML",
    completed: false
  },
  {
    id: 2,
    title: "Learn CSS",
    completed: false
  }
];

export function findTask(id) {
  return tasks.find((task) => task.id === id);
}

export function updateTask(id, completed) {
  const task = findTask(id);

  if (!task) {
    return null;
  }

  task.completed =
    typeof completed === "boolean" ? completed : !task.completed;

  return task;
}

export function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  return tasks.splice(taskIndex, 1)[0];
}
