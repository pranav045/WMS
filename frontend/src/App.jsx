import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.text())
      .then((data) => console.log(data));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WMS Frontend</h1>
      <p>Check your browser console (F12 → Console tab)</p>
    </div>
  );
}

export default App;
