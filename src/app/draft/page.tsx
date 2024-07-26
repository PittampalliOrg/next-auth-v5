import React from 'react'
import { Metadata } from "next"
import { auth } from "@/auth";
import { taskSchema } from '../tasks/data/schema';

interface GraphResponse {
  "@odata.context": string;
  "@microsoft.graph.tips": string;
  value: Task[];
}

interface Task {
  id: string;
  title: string;
  status: string;
  importance: string;
  categories: string[];
}

interface Body {
  content: string;
  contentType: string;
}

interface LinkedResource {
  webUrl: string;
  applicationName: string;
  displayName: string;
  externalId: string;
  id: string;
}

interface ChecklistItem {
  displayName: string;
  createdDateTime: string;
  isChecked: boolean;
  id: string;
}



export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a database read for tasks.
export default async function page() {
  const session = await auth();
  const res = await fetch("https://graph.microsoft.com/v1.0/me/todo/lists/AAMkADhmYjY3M2VlLTc3YmYtNDJhMy04MjljLTg4NDI0NzQzNjJkMAAuAAAAAAAqiN_iXOf5QJoancmiEuQzAQAVAdL-uyq-SKcP7nACBA3lAAAAO9QQAAA=/tasks", {
    headers: {
        Authorization: `Bearer ${session?.accessToken}`,
    },
});
  const data: GraphResponse = await res.json();
  const tasks: Task[] = data.value
  return (<div>{JSON.stringify(tasks)}</div>)
}
