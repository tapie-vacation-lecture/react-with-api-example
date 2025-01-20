import React, { useState } from 'react';
import styles from './styles/style.module.scss';

const App = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', content: '안녕하세요! 무엇을 도와드릴까요?' },
        { id: 2, sender: 'user', content: '안녕하세요! AI에 대해 궁금한 점이 있어요.' },
        { id: 3, sender: 'ai', content: '네, 어떤 점이 궁금하신가요? 최선을 다해 답변해드리겠습니다.' },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([
                ...messages,
                { id: messages.length + 1, sender: 'user', content: message }
            ]);
            setMessage('');
        }
    };

    const getMessageClassName = (sender) => {
        return sender === 'user' ? styles.userMessage : styles.aiMessage;
    };

    const getMessageContentClassName = (sender) => {
        return sender === 'user' ? styles.userMessageContent : styles.aiMessageContent;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>AI 채팅</h1>
            </div>

            <div className={styles.messages}>
                {messages.map((msg) => (
                    <div key={msg.id} className={getMessageClassName(msg.sender)}>
                        <div className={getMessageContentClassName(msg.sender)}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>

            <form className={styles.inputContainer} onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles.input}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                />
                <button type="submit" className={styles.button}>전송</button>
            </form>
        </div>
    );
};

export default App;