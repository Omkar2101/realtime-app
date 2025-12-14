
import React, { useEffect, useState } from 'react';
import styles from './chatUi.module.scss';
import { sendMessage, onMessage,connectSocket } from '../hooks/webSocket';


const ChatUI: React.FC = () => {
    
	const [messages, setMessages] = useState<string[]>([]);
	const [input, setInput] = useState('');
	console.log('Messages:', messages);

	//adding the useEffect for connection and listening
	useEffect(()=>{
		//connect once when page loads
		connectSocket();
		
		// 2️⃣ Register listener (callback)
		//onMessage takes the callback and callback sets the msg
		onMessage((msg:string)=>{
			setMessages(prev => [...prev, msg]);
		})
	},[])
	
	const handleSend = () => {
		sendMessage(input);
		setInput('')
	};


	

	return (
		<div className={styles['chat-container']}>
			<div className={`card ${styles['chat-card']}`}>
				<div className="card-body">
					{messages.length === 0 ? (
						<div className={styles['no-messages']}>No messages yet.</div>
					) : (
						messages.map((msg, idx) => (
							<div key={idx} className={styles['chat-message']}>
								{msg}
							</div>
						))
					)}
				</div>
			</div>
			<div className={styles['input-group']}>
				<input
					type="text"
					className="form-control"
					placeholder="Type your message..."
					value={input}
					onChange={e => setInput(e.target.value)}
					onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
				/>
				<button className="btn btn-primary" type="button" onClick={handleSend}>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatUI;
