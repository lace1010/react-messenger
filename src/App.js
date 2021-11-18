import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Message from "./Message.jsx";
import SendIcon from "@material-ui/icons/Send";
import { FormControl, Input, Button } from "@mui/material/";
import facebookMessengerLogo from "./Facebook_Messenger_logo.png";
import db from "./firebase";
import {
  onSnapshot,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  orderBy,
  query,
} from "@firebase/firestore";
import FlipMove from "react-flip-move";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Logo = styled.img`
  width: 100px;
`;
const Header = styled.div`
  margin-top: 20px;
  text-align: center;
`;
const StyledFormControl = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
  margin: 20px 20px 20px 0 !important;
  padding: 20px !important;
  position: fixed !important;
  bottom: 0 !important;
  z-index: 2 !important;
  box-sizing: border-box !important;
  width: 95%;
  box-sizing: border-box !important;
  background-color: whitesmoke;
`;

const StyledInput = styled(Input)`
  flex: 1 !important;
`;
const StyledButton = styled(Button)`
  flex: 0 !important;
  background-color: ${(props) => props.bgc} !important;
  color: white !important;
  cursor: pointer !important;
  transition: all 0.4s ease !important;
  &:hover {
    filter: brightness(80%) !important;
  }
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // set username
  useEffect(() => {
    let username = prompt("Please give us your username");
    username ? setUsername(username) : setUsername("Unknown User");
  }, []);

  useEffect(() => {
    // Connect to firebase db and collection we want
    const collectionRef = collection(db, "messages");

    // reorder collection based on timestamp descending
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    // Use this to connect to our reordered collection. Use snapshot as listener and return all of our messages from firestore db.
    const snapshotMessages = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // add the id for keys when we map the messages
    });
    return snapshotMessages;
  }, []);

  // Made a sendMessage function inside a useCallback so we can use it in useEffect later. Used exact same as making it a normal function.
  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (inputValue) {
        // add it to database
        const docData = {
          message: inputValue,
          username: username,
          timestamp: serverTimestamp(),
        };
        // Add a new document with a generated id
        const newMessageRef = doc(collection(db, "messages"));
        await setDoc(newMessageRef, docData);

        // setMessages([...messages, { username: username, message: inputValue }]);
        setInputValue("");
      }
    },
    [inputValue, username]
  );

  // Added this useEffect to listen for when the enter button is pushed. When it is we call the sendMessage function
  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        // console.log("Enter key was pressed. Run your function.");
        e.preventDefault();
        sendMessage(e);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [sendMessage]);
  return (
    <Container>
      <LogoContainer>
        <Logo src={facebookMessengerLogo} alt="Facebook messenger logo" />
      </LogoContainer>
      <Header>
        <h1>Welcome: {username}</h1>
      </Header>
      <StyledFormControl>
        <StyledInput
          placeholder="Enter a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <StyledButton
          onClick={sendMessage}
          type="submit"
          disabled={!inputValue}
          bgc={inputValue ? "#0b81ff" : "lightgrey"}
        >
          <SendIcon />
        </StyledButton>
      </StyledFormControl>
      <FlipMove>
        {messages.map((item) => (
          <Message message={item} user={username} key={item.id} />
        ))}
      </FlipMove>
    </Container>
  );
}

export default App;
