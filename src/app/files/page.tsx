import { Files, columns } from "./columns"
import { DataTable } from "./data-table"
import { auth } from "@/auth";

interface User {
  displayName: string;
  email: string;
}

interface CreatedBy {
  user: User;
}

interface LastModifiedBy {
  user: User;
}

interface ParentReference {
  driveId: string;
  driveType: string;
}

interface File {
  mimeType: string;
  hashes: object;
}

interface FileSystemInfo {
  createdDateTime: string;
  lastAccessedDateTime: string;
  lastModifiedDateTime: string;
}

interface SharepointIds {
  listId: string;
  listItemId: string;
  listItemUniqueId: string;
  siteId: string;
  siteUrl: string;
  webId: string;
}

interface RemoteItem {
  createdDateTime: string;
  id: string;
  lastModifiedDateTime: string;
  name: string;
  size: number;
  webDavUrl: string;
  webUrl: string;
  createdBy: CreatedBy;
  file: File;
  fileSystemInfo: FileSystemInfo;
  lastModifiedBy: LastModifiedBy;
  parentReference: ParentReference;
  sharepointIds: SharepointIds;
}

interface DriveItem {
  createdDateTime: string;
  id: string;
  lastModifiedDateTime: string;
  name: string;
  size: number;
  webUrl: string;
  createdBy: CreatedBy;
  lastModifiedBy: LastModifiedBy;
  parentReference: ParentReference;
  file: File;
  fileSystemInfo: FileSystemInfo;
  remoteItem: RemoteItem;
}

interface GraphResponse {
  "@odata.context": string;
  "@microsoft.graph.tips": string;
  value: DriveItem[];
}


async function getFiles(): Promise<DriveItem[]> {
    const session = await auth();
    const res = await fetch("https://graph.microsoft.com/v1.0/me/drive/recent", {
      headers: {
          Authorization: `Bearer ${session?.accessToken}`,
      },
  });
  const data: GraphResponse = await res.json();

  return data.value
}

export default async function DemoPage() {
  const data = await getFiles();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
