import {useEffect, useState} from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);
	console.log(new Date(), "message List", messageList);
	useEffect(()=> {
		socket.on("message", (message) => {
				console.log(new Date(), "all got message : ", message);
			setMessageList((prevState) => prevState.concat(message));
		});
		askUserName();
	},[]);

	const askUserName = () => {
		const userName = prompt("당신의 이름을 입력하세요");
		console.log(new Date(), "uuuu",userName);

		socket.emit("login",userName,(res)=>{
			console.log(new Date(), "Res",res);
			if(res?.ok){
				setUser(res.data);
			}
		});
	}
	const sendMessage = (event) => {
		console.log(new Date(), event.preventDefault());
		socket.emit("sendMessage", message, (res) => {
			console.log(new Date(), "sendMessage res : ", res);
		});
	}	
	return (
		<div>
			<div className="App">
				<MessageContainer messageList={messageList} user={user} />
				<InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
		</div>
	);
}

export default App;
