# SpotifyConnect


https://github.com/user-attachments/assets/c7b5c7dc-6ccb-4357-8ff0-89a282b7cabb

[Spotify Connect Proposal.pdf](https://github.com/user-attachments/files/20535879/Spotify.Connect.Proposal.pdf)


# Project Description

The purpose of the app is to keep users engaged with Spotify by allowing them to view their top artists and songs, create a profile that other users can view, post in message boards, and message other users.

# Table of Contents

1. ### [Installation](https://github.com/3amBEANS/SpotifySocial/blob/main/README.md#installation-1)
2. ### [How Login Works](https://github.com/3amBEANS/SpotifySocial/blob/main/README.md#how-login-works-1)
3. ### [Major Components and Features](https://github.com/3amBEANS/SpotifySocial/blob/main/README.md#major-components-and-features-1)
4. ### [Tech Stack](https://github.com/3amBEANS/SpotifySocial/blob/main/README.md#tech-stack-1)
5. ### Credits

# Installation 
Cd into the backend folder and type the command `npm install`, 
Follow the instructions in this GitHub repository to download the `test-spotify-site.local-key. pem ' and to host your server on https://test-spotify-site.local:5050: https://github.com/swe-instructors-forge25/spotify-demo 

Contact one of the members in order to gain access to the .env files and permissions.json files
Run `npm start` in your backend file to run your server

Cd into the spotifysocialapp folder
Run `Npm install` to install the dependencies
Finally, run `npm run dev` to start the Vite app and open your localhost port to access the webpage.

# How Login Works

User clicks “Sign in” to sign in with their Spotify account
App sends you to the server’s /login route
Server gets your access token and saves it in Firebase.
User gets sent to the profile page, using their tokens to fetch your data.

# Major Components and Features

* Library Page with a sidebar to 3 pages
* Liked Songs Page where user’s 50 most recently liked songs are shown.
* Top Artists Page which displays the user’s most listened to artists of All Time, Last Year, Last Month.
* Top Songs Page which displays the user’s most listened to songs of All Time, Last Year, Last Month.
* User profile page where their Spotify information is shown
* Discover page that shows users' profiles and allows you to message them
* Inbox page that shows your chats with other users
* Forum page that displays all of the discussion boards, which users can click on to access the posts

# How to use the Project

See Above Demo video

# Tech Stack

React Frontend
Express Backend
Firebase Data Storage

### Technologies

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Chakra UI](https://chakra-ui.com/)
- [Firebase Firestore](https://firebase.google.com/)

### Developers

- [Aiden Ha](https://github.com/3amBEANS)
- [Julia Rieger](https://github.com/jvrieger)
- [Mehnaz Tasnim](https://github.com/Mehnaz300)
- [David Villon](https://github.com/davidvillon04)
