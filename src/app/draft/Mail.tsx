import React from 'react'

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


const MailDraft = async () => {
  const session = await auth();
  const res = await fetch("https://graph.microsoft.com/v1.0/me/messages", {
      headers: {
          Authorization: `Bearer ${session?.accessToken}`,
      },
  });
  const response: GraphMessagesResponse = await res.json();
  const messages: Message[] = response.value;

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <h1>{message.subject}</h1>
          <p>{message.bodyPreview}</p>
        </div>
      ))}
    </div>
  );
}


export default MailDraft



