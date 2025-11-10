import './ReMail.css'
import MailEntry from './components/MailEntry.jsx'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function ReMail() {
    const [userID, setUserID] = useState(-1);
    const [mailbox, setMailbox] = useState([]);
    const [showDraft, setShowDraft] = useState(false);

    useEffect(() => {
        async function fetchMail() {
            const response = await axios.get(`http://localhost:8080/users/${userID}/mail`);
            setMailbox(response.data);
        }
        if (userID > 0) fetchMail();
    }, [userID]);

    console.log("rerender");
    console.log("mailbox: ");
    console.log(mailbox);

    async function handlePostMail(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log("ReMail.jsx: sending mail");
        const mailTitle = formData.get("mailTitle");
        const mailContent = formData.get("mailContents");
        const receiver_userID = Number.parseInt(formData.get("receiverUserID"));
        if (isNaN(receiver_userID)) {
            console.log("ReMail.jsx: invalid receiver userID");
            return;
        }

        const response = await axios.post("http://localhost:8080/mail",
            {
                sender_id: userID,
                receiver_id: receiver_userID,
                time_sent: '2025-11-06 14:32:10',
                title: mailTitle,
                content: mailContent
            }
        );
    }

    function handleChangeUID(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        console.log(formData);
        const newUserID = parseInt(formData.get('getUserID'));
        if (Number.isNaN(newUserID)) {
            console.log("ReMail.jsx: Invalid userId, input a number");
        }
        else {
            setUserID(newUserID);
            console.log("ReMail.jsx: Set userId to ", newUserID);
        }
        // fetchMail();
    }

    const renderDraft = () => {
        return (
            <form className="draft">
                <label>
                    To: <input type="text" name="recipients" />
                </label>
                <label>
                    Subject: <input type="text" name="subject" />
                </label>
                <input type="text" name="content" />
                <button>Send</button>
            </form>
        )
    }

    const mailElements = mailbox.map((data) => {
        /**
         * content: "Just checking in to see how your project is going."
            mail_id: 1
            receiver_id: 2           ​
            sender_id: 1
            time_sent: "2025-11-06 14:32:10"
            title: "Hey Bob!"
         */
        console.log("mail element data: ");
        console.log(data);
        const mail_id = data.id;
        return <MailEntry key={mail_id} id={mail_id} />
    })


    return (
        <>
            <header className="main-screen-header">
                <img src="../media/gmail-logo.png" alt="gmail logo" />
                <h1>ReMail</h1>

                <form>
                    <input type="text" placeholder="Search" />
                    <button>Search mail</button>
                </form>

                <form onSubmit={handleChangeUID}>
                    <input type="text" name="getUserID" placeholder="New UserID" />
                    <button>Change user id</button>
                </form>
            </header>

            <main className="main-body">
                <section className="main-screen-sidebar">
                    <button 
                        onClick={() => {if (!showDraft) setShowDraft(true)}}>
                        Compose mail</button>
                </section>

                <section className="main-screen-mailbox">
                    {mailElements}
                </section>

                {showDraft && renderDraft()}
            </main>
        </>
    )
}