import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div className="p-4">
      <h1 className="bg-red-300">{message}</h1>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
