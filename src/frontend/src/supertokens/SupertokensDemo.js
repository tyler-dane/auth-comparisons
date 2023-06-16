import React from "react";
import axios from "axios";

function SuperTokensDemo() {

    const startSession = async () => {
        const email = window.prompt("Enter your email:")    
        const sessionStatus = await axios.post(`/api/supertokens/authenticate`, {
            email
        })
        console.log("Supertokens session details:\n", sessionStatus)
        alert("🥳 Session is active - yay! See console for details")
    }

    const checkSession = async () => {
        try {
            const email = window.prompt("Enter email to check for sessions:")

            const sessionStatus = await axios.get(`/api/supertokens/session-check?email=${email}`)

            if (sessionStatus.data.status === "error") {
              alert(`😳 Session check failed for: ${email}`)
              return;
            }

            const sessions = sessionStatus.data.message;
            alert(`${email} has ${sessions.length} active sessions. See console for details`);
            console.log(`Supertokens sessions for ${email}:\n`, sessionStatus.data)
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <div className="column column-header">
      <a
        className="link"
        href="https://supertokens.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Supertokens 🦸‍♀️
      </a>
      <button className="button-supertokens" onClick={startSession}>1. Start auth (API)</button>
      <button className="button-supertokens" onClick={checkSession}>2. Check session</button>
    </div>

  );
}
export default SuperTokensDemo;
