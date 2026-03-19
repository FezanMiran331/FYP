'use client';

import { useRouter } from 'next/navigation';
import { generateRoomId } from '@/lib/client-utils'; // same function used in page.tsx

export default function DashboardPage() {
  const router = useRouter();

  const startMeeting = () => {
    const roomId = generateRoomId();  // Safe, original LiveKit generator
    router.push(`/rooms/${roomId}`);
  };
 

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      <button
        onClick={startMeeting}
        style={{
          padding: "12px 24px",
          background: "#4F46E5",
          color: "white",
          borderRadius: "8px",
          fontSize: "16px",
          marginTop: "20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Start Meeting
      </button>
      <button
  onClick={() => router.push('/join')}
  style={{
    padding: "12px 24px",
    background: "#4F46E5",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    marginTop: "20px",
    border: "none",
    cursor: "pointer",
  }}
>
  Join Meeting
</button>

    </main>
  );
}
