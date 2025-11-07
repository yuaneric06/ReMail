import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [array, setArray] = useState([]);

  const fetchMail = async () => {
    const response = await axios.get("http://localhost:8080/mail");
    console.log("response: ", response.data);
    setArray(response.data[0]);
    console.log(response.data[0]);
  };

  const sendMail = async () => {
    console.log("sending mail");
    const response = await axios.post("http://localhost:8080/mail", 
      {
        sender_id: 100, 
        receiver_id: 200, 
        time_sent: '2025-11-06 14:32:10', 
        title: 'This is a new email!', 
        content: 'Hello, I am just testing posting mail'
      }
    );
    console.log("response: ", response.data);
  }

  useEffect(() => {
    fetchMail();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    console.log(formData);
    sendMail();
  }

  return (
    <>
        <form className="send-mail" onSubmit={handleSubmit}>
          <label>
            Send mail: <input name="mailInput"/>
          </label>
          <button>Send mail</button>
        </form>


        <section className="display-mail">
          
        </section>
    </>
  )
}

export default App
