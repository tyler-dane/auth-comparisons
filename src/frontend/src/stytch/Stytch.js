import React, { useRef, useState} from "react";
import axios from "axios";
import Modal from "react-modal";
import { useStytch, useStytchSession } from "@stytch/react";

import "../App.css";

const buttonText = {
  starting: "Send",
  in_progress: "Sending...",
  done: "Sent!",
};

function Stytch() {
  const emailRef = useRef();

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("starting");

  const stytch = useStytch();
  const { session } = useStytchSession();
  session && console.log(session)


  const BACKEND_PORT = 4000;
  const STYTCH_API = `http://localhost:${BACKEND_PORT}/api/stytch`
  const MAGIC_LINK_URL = `${STYTCH_API}/authenticate`;

  const openModal = () => {
    setIsEmailModalOpen(true);
  };

  const closeModal = () => {
    setIsEmailModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setState("in_progress");
      const loginRes = await stytch.magicLinks.email.loginOrCreate(
        emailRef.current.value,
        {
          login_magic_link_url: MAGIC_LINK_URL,
          signup_magic_link_url: MAGIC_LINK_URL,
        }
      );
      if (loginRes.status_code === 200) {
        const readyToCheckStatus = window.confirm("Click the link in your email. Then come back and click OK to check your login status")
        if (!readyToCheckStatus) {
          alert("Cancelled, try again");
        }
        alert('Checking session status...')
        const sessionResult = await axios.get(`${STYTCH_API}/session-check`, loginRes)
        console.log(sessionResult)
        //request to backend
      }

      console.log(loginRes);
      setState("starting");
      setEmail("");
      emailRef.current.value = "";

      closeModal();
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div className="column column-header">
      <a
        className="link"
        href="https://stytch.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Stytch 🪡
      </a>

      <button onClick={openModal}>create session</button>

      <Modal
        ariaHideApp={false}
        isOpen={isEmailModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{
          overlay: {
            color: "black",
            backgroundColor: " #282c34",
          },
        }}
      >
        {error ? (
          <>
            <h2>Uh oh!</h2>
            <pre>{String(error)}</pre>
            <button
              onClick={() => {
                closeModal();
                setError(null);
                setState("starting");
              }}
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <h3>Enter email to receive magic link</h3>
            <p>Reminder: use email that you signed up for Stytch with</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"tyler@stytch.com"}
                  ref={emailRef}
                />
              </div>
              <button disabled={state !== "starting"} type="submit">
                {buttonText[state]}
              </button>
              <button
                onClick={() => {
                  setState("starting");
                  closeModal();
                }}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Stytch;
