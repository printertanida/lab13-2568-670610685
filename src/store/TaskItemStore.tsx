import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { type TaskItemProps } from "../libs/Task";
import { persist } from "zustand/middleware";

export const useTaskStore = create<TaskItemProps>()(
  persist(
    (set) => ({
      tasks: [], //เริ่มต้น
      setTasks: (tasks) => set({ tasks }),
      addTask: (title, description, dueDate,assignees) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: uuidv4(),
              title,
              description,
              dueDate,
              isDone: false,
              doneAt: null,
              assignees,
            },
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  isDone: !task.isDone,
                  doneAt: task.isDone ? null : new Date().toLocaleDateString(),
                }
              : task
          ),
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: "task-storage", // 👈 กำหนดชื่อสำหรับจัดเก็บใน Local Storage
    }
  )
);
