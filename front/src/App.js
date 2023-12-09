//import "./App.css";
import "./newscreen.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { LiMensaje, UlMensajes } from "./ui-components";
import { ReactComponent as UserIcon } from "./user_icon.svg";

const socket = io("http://localhost:3000");

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("anonymous");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    socket.on("connect", () => setIsConnected(true));

    socket.on("chat_message", (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, []);

  const enviarMensaje = () => {
    console.log("enviando mensaje", nuevoMensaje);
    socket.emit("chat_message", {
      usuario: socket.id,
      mensaje: nuevoMensaje,
    });
  };

  const msgPills = () => {
    return (
      <div className="App">
        <h2>{isConnected ? "CONECTADO" : "NO CONECTADO"}</h2>
        <UlMensajes>
          {mensajes.map((mensaje) => (
            <LiMensaje>
              {mensaje.usuario}: {mensaje.mensaje}
            </LiMensaje>
          ))}
        </UlMensajes>
        <input type="text" onChange={(e) => setNuevoMensaje(e.target.value)} />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    );
  };

  const msgPhone = () => {
    return (
      <div>
        <h2>{isConnected ? "CONECTADO" : "NO CONECTADO"}</h2>
        <h1 className="title">iChat 💬</h1>
        <div className="main">
          <div className="name">
            <span>
              <i className="far fa-user"></i>
            </span>
            <UserIcon />
            <input
              type="text"
              id="name-input"
              className="name-input"
              value="anonymous"
              maxLength="20"
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
          </div>

          <ul className="message-container" id="message-container">
            {mensajes.map((mensaje) => {
              <li className="message-left">
                <p className="message">
                  {mensaje.usuario}: {mensaje.mensaje}
                  <span>bluebird ● 26 July 10:40</span>
                </p>
              </li>;
            })}
            <li className="message-feedback">
              <p className="feedback" id="feedback">
                ✍️ killer is typing a message...
              </p>
            </li>
          </ul>

          <form className="message-form" id="message-form">
            <input
              type="text"
              name="message"
              id="message-input"
              className="message-input"
              onChange={(e) => setNuevoMensaje(e.target.value)}
            />
            <div className="v-divider"></div>
            <button
              type="submit"
              className="send-button"
              onClick={enviarMensaje}
            >
              <span>
                <i className="fas fa-paper-plane"></i>
              </span>
            </button>
          </form>
        </div>
        <h3 className="clients-total" id="client-total">
          Total clients: 2
        </h3>
      </div>
    );
  };

  return msgPhone();
  //return msgPills();
}

export default App;
