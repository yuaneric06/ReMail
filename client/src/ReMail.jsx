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

    async function handleSearchMail(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const sender = formData.get("from");
        let from_userID = Number.parseInt(sender);
        if (isNaN(from_userID)) {
            const response = await axios.get(`http://localhost:8080/users/${sender}`);
            if (response.data.length === 0) {
                console.log("invalid from userID");
                return;
            }
            else {
                from_userID = response.data[0].user_id;
            }
        }

        // lookup mail from from_userID
        const response = await axios.get(`http://localhost:8080/mail`, 
            {
                params: {
                    senderID: from_userID,
                    receiverID: userID
                }
            }
        );
        console.log("response from search: ");
        console.log(response);
        setMailbox(response.data);
    }

    async function handlePostMail(e) {
        e.preventDefault();
        const lookupUser = await axios.get(`http://localhost:8080/users/${userID}`);
        if (lookupUser.data.length === 0) {
            console.log("invalid sender id");
            return;
        }

        const form = e.target;
        const formData = new FormData(form);
        console.log("sending mail");
        const recipients = formData.get("recipients");
        const subject = formData.get("subject");
        const content = formData.get("content");
        let receiver_userID = Number.parseInt(recipients);
        if (isNaN(receiver_userID)) {
            const response = await axios.get(`http://localhost:8080/users/${recipients}`);
            if (response.data.length === 0) {
                console.log("invalid receiver userID");
                return;
            }
            else {
                receiver_userID = response.data[0].user_id;
            }
        }

        const response = await axios.post("http://localhost:8080/mail",
            {
                sender_id: userID,
                receiver_id: receiver_userID,
                time_sent: '2025-11-06 14:32:10',
                title: subject,
                content: content
            }
        );
    }

    function handleChangeUID(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const newUserID = parseInt(formData.get('getUserID'));
        if (Number.isNaN(newUserID)) {
            console.log("invalid userId, input a number");
        }
        else {
            setUserID(newUserID);
            console.log("set userId to ", newUserID);
        }
        // fetchMail();
    }

    const renderDraft = () => {
        return (
            <form className="draft" onSubmit={handlePostMail}>
                <label className="draft-header">New Message</label>
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
        const mail_id = data.id;
        return <MailEntry key={mail_id} id={mail_id} />
    })


    return (
        <>
            <header className="main-screen-header">
                <img src="../media/gmail-logo.png" alt="gmail logo" />
                <h1>ReMail</h1>

                <form onSubmit={handleSearchMail}>
                    <input type="text" name="from" placeholder="From" />
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
                        onClick={() => { if (!showDraft) setShowDraft(true) }}>
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