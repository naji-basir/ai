// import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

// function App() {
//   const [message, setMessage] = useState("");
//   useEffect(() => {
//     fetch("/api/hello")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message));
//   }, []);
//   return (
//     <div className="p-4">
//       <h1 className="bg-red-300">{message}</h1>
//       <Button>Click me</Button>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://localhost:3008/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Local Chatbot</h1>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={sendMessage}>Send</Button>
      <p>{reply}</p>
    </div>
  );
}

export default App;
