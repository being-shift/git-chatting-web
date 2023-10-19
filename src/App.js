import {useEffect, useState} from "react";
import "./App.css";
import socket from "./server";

function App() {
	const [user, setUser] = useState(null);
	useEffect(()=> {askUserName();},[]);

	const askUserName = () => {
		const userName = prompt("당신의 이름을 입력하세요");
		console.log("uuuu",userName);

		socket.emit("login",userName,(res)=>{
			console.log("Res",res);
			if(res?.ok){
				setUser(res.data);
			}
		});
	}

	return (
		<div>
		  <div className="App"></div>
		</div>
	);
}

export default App;
