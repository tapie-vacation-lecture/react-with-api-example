import React, { useState } from 'react';
import styles from './styles/style.module.scss';
import { createAICompletions } from "./api.js";

const App = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', content: '안녕하세요! 무엇을 도와드릴까요?' },
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([
                ...messages,
                {id: messages.length + 1, sender: 'user', content: message}
            ]);
            setMessage('');
            await executeAiCompletion(message);
        }
    };

    const executeAiCompletion = async (userMessage) => {
        const response = await createAICompletions(userMessage);
        setMessages(prevMessages => [...prevMessages, {
            id: prevMessages.length + 1,
            sender: 'ai',
            content: response.content
        }]);
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