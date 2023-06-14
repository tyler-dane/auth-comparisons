import "./App.css";

import { StytchProvider } from "@stytch/react";
import { StytchUIClient } from "@stytch/vanilla-js";

function App() {
  return (
    <div>
      <header>
        <h1>Auth Comparisons</h1>
        <p>
          A playground to compare how <br />
          auth platforms implement session management
        </p>
        <a
          className="link"
          href="https://github.com/tyler-dane/auth-comparisons"
          rel="noopener noreferrer"
          target="_blank"
        >
          See the code
        </a>
      </header>

      <div className="container">
        <div class="column column-header">
          <a
            className="link"
            href="https://stytch.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stytch 🪡
          </a>
          <button>create session</button>
        </div>

        <div class="column column-header">
          <a
            className="link"
            href="https://supertokens.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supertokens 🦸‍♀️
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
