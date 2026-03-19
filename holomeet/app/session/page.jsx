"use client";

import { useSession } from "next-auth/react";

export default function SessionPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading session...</p>;

  return (
    <pre style={{ padding: "20px",  }}>
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}

// https://myaccount.google.com/permissions
