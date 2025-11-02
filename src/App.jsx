import { useState } from 'react';
import axios from "axios";
import './App.css';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

function App() {
  const [math1, setMath1] = useState("");
  const [math2, setMath2] = useState("");
  const [verbal1, setVerbal1] = useState("");
  const [verbal2, setVerbal2] = useState("");
  const [total, setTotal] = useState(null);

  const handleCheck = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/total-score`, {
        params: { math1, math2, verbal1, verbal2 },
      });
      setTotal(res.data);
    } catch {
      setTotal({ error: "Not found" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">SAT Combined Score Lookup</h1>

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-semibold">Maths</h2>
          <Input
            type="number"
            placeholder="Module 1"
            value={math2}
            onChange={(e) => setMath2(e.target.value)}
            className="border p-2 rounded m-1"
          />
          <Input
            type="number"
            placeholder="Module 2"
            value={math1}
            onChange={(e) => setMath1(e.target.value)}
            className="border p-2 rounded m-1"
          />
        </div>

        <div>
          <h2 className="font-semibold">Verbals</h2>
          <Input
            type="number"
            placeholder="Module 1"
            value={verbal2}
            onChange={(e) => setVerbal2(e.target.value)}
            className="border p-2 rounded m-1"
          />
          <Input
            type="number"
            placeholder="Module 2"
            value={verbal1}
            onChange={(e) => setVerbal1(e.target.value)}
            className="border p-2 rounded m-1"
          />
        </div>

        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={handleCheck}
        >
          Calculate Total
        </Button>

        {total && !total.error && (
          <div className="text-xl mt-4">
            <p>Maths Score: {total.math_score}</p>
            <p>Verbal Score: {total.verbal_score}</p>
            <p className="font-bold mt-2">
              Total SAT Score: {total.total_sat_score}
            </p>
          </div>
        )}

        {total?.error && (
          <div className="text-red-600">{total.error}</div>
        )}
      </div>
    </div>
  );
}

export default App
