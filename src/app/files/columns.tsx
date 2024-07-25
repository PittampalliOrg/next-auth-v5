"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Files =         {
  createdDateTime: string,
  id: string,
  lastModifiedDateTime: string,
  name: string,
  size: string,
  webUrl: string,
}

export const columns: ColumnDef<Files>[] = [
  {
    accessorKey: "createdDateTime",
    header: "Created Date",
  },
  {
    accessorKey: "lastModifiedDateTime",
    header: "Last Modified",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "webUrl",
    header: "WebURL",
  },
]

