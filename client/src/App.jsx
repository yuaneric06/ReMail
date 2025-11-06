import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <>
        <section className="send-mail">
          <input type="text"></input>
          <button>Send mail</button>
        </section>
        {
          array.map((fruit, index) => {
            return (
              <div key={index}>
                <p>{fruit}</p>
                <br></br>
              </div>)
          })
        }
    </>
  )
}

export default App
