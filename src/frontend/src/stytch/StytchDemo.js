import React, { useRef, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useStytch, useStytchSession } from "@stytch/react";

import "../App.css";

const buttonText = {
  starting: "Send",
  in_progress: "Sending...",
  done: "Sent!",
};

function StytchDemo() {
  const emailRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [state, setState] = useState("starting");

  const stytch = useStytch();
  const { session } = useStytchSession();
  session && alert("found session!");

  const BACKEND_PORT = 4000;
  const STYTCH_API = `http://localhost:${BACKEND_PORT}/api/stytch`;
  const MAGIC_LINK_URL = `${STYTCH_API}/authenticate`;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEmail("");
    setError(null);
    setState("starting");
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
        alert(
          "Email sent! Click the link in the email to finish logging in and see your auth info"
        );
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

  const checkSession = async () => {
    const sessionToken = window.prompt(
      "Copy the session_token value from the payload of the magic link and paste it here"
    );
    const sessionStatus = await axios.post(`/api/stytch/session-check`, {
      session_token: sessionToken,
      session_duration_minutes: 20,
    });
    console.log("Stytch session details:\n", sessionStatus.data);
    if (sessionStatus.data.status === "success") {
      alert("🥳 Session is active - yay! See console for details");
    } else {
      alert("😳 Session is NOT active, see console for details");
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

      <button className="button-stytch" onClick={openModal}>
        1. Start auth (magic link)
      </button>
      <button className="button-stytch" onClick={checkSession}>
        2. Check session
      </button>

      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
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
              <button
                className="button-stytch"
                disabled={state !== "starting"}
                type="submit"
              >
                {buttonText[state]}
              </button>
              <button
                className="button-stytch"
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

export default StytchDemo;
