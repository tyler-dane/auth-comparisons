require("dotenv").config();
const express = require("express");
const stytch = require("stytch");
const bodyParser = require("body-parser");

const PORT = 4000;

const stytchClient = new stytch.Client({
  project_id: process.env["STYTCH_PROJECT_ID"],
  secret: process.env["STYTCH_SECRET"],
  env: stytch.envs.test,
});

const app = express();
app.use(bodyParser.json());

app.get("/api/stytch/authenticate", async function (req, res) {
  const token = req.query.token;
  if (!token) {
    res.send({ status: "error", message: "No token provided" });
  }

  try {
    const result = await stytchClient.magicLinks.authenticate(token, {
      session_duration_minutes: 20,
    });
    res.send({ status: "success", message: result });
  } catch (e) {
    res.send({ status: "error", message: e.message });
  }
});

app.post("/api/stytch/session-check", async function (req, res) {
  const sessionData = req.body;

  if (!sessionData) {
    res.send({ status: "error", message: "No session token provided" });
  }

  try {
    const result = await stytchClient.sessions.authenticate(sessionData);
    res.send({ status: "success", message: result });
  } catch (e) {
    const msg = JSON.parse(
      e.message || { error_message: "unknown", payload: e }
    );
    res.send({ status: "error", message: msg });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
