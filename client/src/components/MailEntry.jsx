import './MailEntry.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function MailEntry(props) {
    const [mailData, setMailData] = useState(null);

    useEffect(() => {
        async function fetchMailData() {
            const response = await axios.get(`http://localhost:8080/mail/${props.id}`);
            const data = response.data[0];
            setMailData({
                username: data.username,
                time_sent: data.time_sent,
                title: data.title,
                content: data.content
            });
        }

        fetchMailData();
    }, [props.id]);

    if (!mailData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mail-entry">
            <p className="sender">{mailData.username}</p>
            <p className="title">{mailData.title}</p>
            <p className="content">{mailData.content}</p>
        </div>
    )
}