import { useState, useEffect, useRef } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [mailbox, setMailbox] = useState([]);
  const userID = useRef([]);

  const fetchMail = async () => {
    console.log("fetching mail");
    const response = await axios.get(`http://localhost:8080/mail/users/${userID.current}`);
    setMailbox(response.data);
  };
  
  async function handlePostMail(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
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
  }
  
  function handleChangeUID(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    console.log("changing users, data: ");
    console.log(formData);
    console.log("changing userID to ", formData.get('uidInput'));
    const newUserID = parseInt(formData.get('uidInput'));
    if (Number.isNaN(newUserID)) {
      console.log("Invalid userId, input a number");
    }
    else {
      userID.current = newUserID;
      console.log("Set userId to ", newUserID);
    }
  }

  const mailElements = mailbox.map(mail => {
    return <h1>{mail.content}</h1>;
  })

  return (
    <>
        <form className="send-mail" onSubmit={handlePostMail}>
          <label>
            Send mail: <input name="mailInput"/>
          </label>
          <button>Send mail</button>
        </form>

        <form className="set-userID" onSubmit={handleChangeUID}>
          <label>
            Change userID: <input name="uidInput"/>
          </label>
          <button>Change UID</button>
        </form>

        <button onClick={fetchMail}>Fetch mail</button>
        <section className="display-mail">
          {mailElements}
        </section>
    </>
  )
}

export default App
