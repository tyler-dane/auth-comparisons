import "./App.css";
import Stytch from "./stytch/Stytch";

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
        <Stytch />

        <div className="column column-header">
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
