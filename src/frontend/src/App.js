import SuperTokens from 'supertokens-auth-react';
import Session from "supertokens-auth-react/recipe/session";
import SuperTokensDemo from "./supertokens/SupertokensDemo";
import StytchDemo from "./stytch/StytchDemo";
import "./App.css";

SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:4000",
    apiBasePath: "/api/supertokens",
    appName: "Auth Comparisons",
    websiteDomain: "http://localhost:3000",
    },
    recipeList: [
      Session.init(),
    ],
  });

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
        <StytchDemo />
        <SuperTokensDemo />
      </div>
    </div>
  );
}

export default App;
