const express = require("express");
const path = require("path");
const stytch = require("stytch");

const PORT = 3001;
const STYTCH_PROJECT_ID = "project-test-d2f1576f-8019-4208-a261-1c1f1306258d";
const STYTCH_SECRET = "secret-test-77py-dm7QD54fSUyq1BlUW9QYGiD0r41H6U=";

const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

app.use(express.static(path.join(__dirname, "../frontend/public")));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const client = new stytch.Client({
  project_id: STYTCH_PROJECT_ID,
  secret: STYTCH_SECRET,
  env: stytch.envs.test,
});
