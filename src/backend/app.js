require("dotenv").config();
const path = require("path");
const express = require("express");
const stytch = require("stytch");
const bodyParser = require("body-parser");
const cors = require("cors");
const Session = require("supertokens-node/recipe/session");
const supertokens = require("supertokens-node");
const { middleware } = require("supertokens-node/framework/express");
const { errorHandler } = require("supertokens-node/framework/express");

const PORT = 4000;

const stytchClient = new stytch.Client({
  project_id: process.env["STYTCH_PROJECT_ID"],
  secret: process.env["STYTCH_SECRET"],
  env: stytch.envs.test,
});

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env["SUPERTOKENS_URI"],
    apiKey: process.env["SUPERTOKENS_API_KEY"],
  },
  appInfo: {
    appName: "Comparison",
    apiDomain: `http://localhost:${PORT}`,
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/api/supertokens",
    websiteBasePath: "/",
  },
  recipeList: [Session.init()],
});

const app = express();
app.use(middleware());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // Optional: Specify the views directory

app.get("/api/stytch/authenticate", async function (req, res) {
  const token = req.query.token;
  if (!token) {
    res.send({ status: "error", message: "No token provided" });
  }

  try {
    const result = await stytchClient.magicLinks.authenticate(token, {
      session_duration_minutes: 20,
    });

    const data = {
      session_token: result.session_token,
      session_metadata: result,
    };

    res.render("stytchSuccess", data);
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

app.post("/api/supertokens/authenticate", async function (req, res) {
  const email = req.body.email;
  if (!email) {
    res.send({ status: "error", message: "No email provided" });
  }

  try {
    await Session.createNewSession(req, res, email);

    res.send({ status: "success", message: "" });
  } catch (e) {
    res.send({ status: "error", message: e.message });
  }
});

app.get("/api/supertokens/session-check", async function (req, res) {
  const email = req.query["email"];
  if (email === undefined) {
    res.send({ status: "error", message: "No email provided" });
    return;
  }
  try {
    let sessionHandles = await Session.getAllSessionHandlesForUser(email);
    res.send({ status: "success", message: sessionHandles });
  } catch (e) {
    res.send({ status: "error", message: e.message });
  }
});

app.use(errorHandler());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
