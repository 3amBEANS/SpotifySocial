const express = require("express");
const router = express.Router();
const https = require("https");
const querystring = require("querystring");
const db = require("./firebase");
const { FieldValue } = require("firebase-admin").firestore;

require(`dotenv`).config();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectURI = "https://test-spotify-site.local:5050/login/callback";

const generateRandomString = (length) => {
  let text = ``;
  const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

function getTokens(code) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectURI,
    });

    const options = {
      hostname: "accounts.spotify.com",
      path: "/api/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode === 200) {
          try {
            return resolve(JSON.parse(body));
          } catch (err) {
            return reject(err);
          }
        } else {
          return reject(new Error(`Spotify token exchange failed: ${body}`));
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

const stateKey = `spotify_auth_state`;

// Redirect user to Spotify’s /authorize
router.get(`/`, (request, response) => {
  const state = generateRandomString(16);
  response.cookie(stateKey, state);

  const scope = ["user-read-private", "user-read-email", "user-top-read", "user-library-read"].join(
    " "
  );

  const queryParams = querystring.stringify({
    client_id: clientId,
    response_type: `code`,
    redirect_uri: redirectURI,
    state: state,
    scope: scope,
    show_dialog: true, // Always ask for authorization
  });
  response.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Handle the OAuth callback
router.get(`/callback`, async (req, res) => {
  try {
    // ← now getTokens is defined
    const { access_token, refresh_token, expires_in } = await getTokens(req.query.code);

    // Fetch user Spotify profile
    const profileRes = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const profile = await profileRes.json();

    // Insert into Firestore
    const userRef = db.collection("users").doc(profile.id);
    const snap = await userRef.get();

    if (!snap.exists) {
      // first login: insert *only* Spotify-related fields
      await userRef.set(
        {
          accessToken: access_token,
          refreshToken: refresh_token,
          isProfileSetup: false,
        },
        { merge: true }
      );
    } else {
      // subsequent logins: just refresh tokens
      await userRef.update({
        accessToken: access_token,
        refreshToken: refresh_token,
        lastLoginAt: FieldValue.serverTimestamp(),
      });
    }

    // Redirect back to React /login/callback
    const params = querystring.stringify({ access_token, refresh_token, expires_in });
    res.redirect(`http://localhost:5173/login/callback?${params}`);
  } catch (err) {
    console.error("OAuth error:", err);
    return res.redirect(
      `http://localhost:5173/login/callback?error=${encodeURIComponent(err.message)}`
    );
  }
});

module.exports = router;
