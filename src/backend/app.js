const express = require("express");
const stytch = require("stytch");

const PORT = 4000;
const STYTCH_PROJECT_ID = "project-test-d2f1576f-8019-4208-a261-1c1f1306258d";
const STYTCH_SECRET = "secret-test-77py-dm7QD54fSUyq1BlUW9QYGiD0r41H6U=";

const stytchClient = new stytch.Client({
  project_id: STYTCH_PROJECT_ID,
  secret: STYTCH_SECRET,
  env: stytch.envs.test,
});

const app = express();

app.get("/api/stytch/authenticate", async function (req, res) {
  const token = req.query.token;
  if (!token) {
    res.send({ status: "error", message: "No token provided" });
  }

  try {
    const result = await stytchClient.magicLinks.authenticate(token);
    res.send({ status: "success", result });
  } catch (e) {
    res.send({ status: "error", message: e.message });
  }
});

app.get("/api/stytch/session-check", async function (req, res) {
 const f = 1 
 console.log(req.session)
})


// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
// });
// app.use(express.static(path.join(__dirname, "../frontend/public")));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
