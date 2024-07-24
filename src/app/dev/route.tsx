import { auth } from "@/auth";
import { NextResponse } from "next/server";

interface EmailAddress {
    name: string;
    address: string;
  }
  
  interface Body {
    contentType: string;
    content: string;
  }
  
  interface Recipient {
    emailAddress: EmailAddress;
  }
  
  interface Flag {
    flagStatus: string;
  }
  
  interface Message {
    "@odata.etag": string;
    id: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    changeKey: string;
    categories: string[];
    receivedDateTime: string;
    sentDateTime: string;
    hasAttachments: boolean;
    internetMessageId: string;
    subject: string;
    bodyPreview: string;
    importance: string;
    parentFolderId: string;
    conversationId: string;
    conversationIndex: string;
    isDeliveryReceiptRequested: boolean | null;
    isReadReceiptRequested: boolean;
    isRead: boolean;
    isDraft: boolean;
    webLink: string;
    inferenceClassification: string;
    body: Body;
    sender: {
      emailAddress: EmailAddress;
    };
    from: {
      emailAddress: EmailAddress;
    };
    toRecipients: Recipient[];
    ccRecipients: Recipient[];
    bccRecipients: Recipient[];
    replyTo: Recipient[];
    flag: Flag;
  }

  interface GraphMessagesResponse {
    "@odata.context": string;
    "value": Message[];
    "@odata.nextLink"?: string;
  }

  
  export const GET = auth(async ({ auth }) => {
      const data: GraphMessagesResponse = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
          headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
          },
      }).then((res) => res.json());
  
      return NextResponse.json(data);
  }
  );