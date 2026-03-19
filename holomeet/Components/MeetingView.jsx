// components/MeetingView.jsx
const MeetingView = ({ meeting, currentUser }) => {
  const isHost = meeting.hostId === currentUser._id;
  const [summary, setSummary] = useState(null);

  // Listen for real-time summary updates
  useEffect(() => {
    socket.on('summaryGenerated', (data) => {
      setSummary(data);
      toast.success("AI Summary is now available!");
    });
  }, []);

  const handleGenerateSummary = async () => {
    const res = await axios.post(`/api/meetings/${meeting._id}/summary`);
    setSummary(res.data.summary);
  };

  return (
    <div className="p-6">
      {/* Host-only Action */}
      {isHost && meeting.status === 'ended' && !summary && (
        <button 
          onClick={handleGenerateSummary}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Generate AI Summary
        </button>
      )}

      {/* Structured Summary Display */}
      {summary && (
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold">{summary.mainTopic}</h2>
          <p className="italic text-gray-600">{summary.overview}</p>
          
          <h3 className="font-semibold mt-4">Key Discussion Points:</h3>
          <ul className="list-disc ml-5">
            {summary.discussionPoints.map((p, i) => <li key={i}>{p}</li>)}
          </ul>

          <div className="flex gap-4 mt-6">
             <button onClick={() => downloadPDF(summary)}>Download PDF</button>
             <button onClick={() => downloadDOCX(summary)}>Download DOCX</button>
          </div>
        </div>
      )}
    </div>
  );
};