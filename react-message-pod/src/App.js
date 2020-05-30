import React, { useState } from "react";
import styles from "./App.module.css";

import logo from "./logo.svg";

import { MessageBus } from "@podium/browser";

function App() {
  const messageBus = new MessageBus();
  const [messager, setMessage] = useState("");

  messageBus.subscribe('internalchannel', 'newMessage', event => {
    if(event.payload.from !== "react panel"){
      setMessage(event.payload.message);
    }
  });

  function handleChange(e) {
    messageBus.publish("internalchannel", "newMessage", {
      message: e.target.value,
      from: "react panel",
    });
    setMessage(e.target.value);
  }

  // do not mind the ugly hack where the window location is replaced... 
  // demo only
  return (
    <div className={styles.sendMessageApp}>
      <img className={styles.sendMessageImage} src={window.location.origin.replace('7000', '7100') + logo} alt="react framework"/>
      <br />
      Micro Frontend Sender
      <br />
      <input
        className={styles.sendMessageInput}
        type="text"
        value={messager}
        onChange={handleChange}
        placeholder="Send a message..."
      />
    </div>
  );
}

export default App;
