import React, {useState, useEffect} from "react";
import queryString from "query-string";
import io from "socket.io-client";
import {Redirect} from "react-router-dom";

import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
import GameTab from '../GameTab/GameTab'
import Join from '../Join/Join'

let socket;

const Chat = ({location}) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [isOk, setOk] = useState(true)
    const [userClass, setClass] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = '192.168.100.2:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, (error) => {
            if (error) {
                alert(error)
                setOk(false)
            }
        });
        socket.emit('getClass', () => {

        });

        return () => {
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
        socket.on("roomData", ({users}) => {
            setUsers(users);
        });
        socket.on("getClass", (userClass) => {
            setClass(userClass)
        });
    }, []);

    const sendMessage = (event) => {

        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }

    }

    return (
        isOk ? (
                <div className="outerContainer">
                    <div className="users-list">
                        <TextContainer users={users}/>
                    </div>
                    <div className="container">
                        <InfoBar room={room}/>
                        <Messages messages={messages} name={name}/>
                        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                    </div>
                    <div className="game-tab">
                        <GameTab userClass={userClass} name={name}/>
                    </div>

                </div>
            ) : (
                <Redirect to="/"/>
            )
    )
}

export default Chat;