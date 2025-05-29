# SpotifyConnect

# Project Description
The purpose of the app is to keep users engaged with Spotify by allowing them to view their top artists and songs, create a profile that other users can view, post in message boards, and message other users. 

# Table of Contents
1. [Installation](#Installation)
2. [Login](#How Login Works)
3. [Major Components and Features](#Major Components and Features)
4. [Tech Stack](#Tech Stack)
5. [Credits](#Credits)

# Installation 
Cd into the backend folder and type the command `npm install`, 
Follow the instructions in this GitHub repository to download the `test-spotify-site.local-key. pem ` and to host your server on `https://test-spotify-site.local:5050`: 
Contact one of the members in order to gain access to the .env files and permissions.json file
Run `npm start` in your backend file to run your server
Cd into the spotifysocialapp folder
Run `Npm install` to install the dependencies
Finally, run "npm run dev" to start the Vite app and open your localhost port to access the webpage.
# How Login Works
User clicks “Sign in” to sign in with their Spotify account
App sends you to the server’s /login route
Server gets your access token and saves it in Firebase.
User gets sent to the profile page, using their tokens to fetch your data.

# Major Components and Features
Library Page with a sidebar to 3 pages
Liked Songs Page where user’s 50 most recently liked songs are shown. 
Top Artists Page which displays the user’s most listened to artists of All Time, Last Year, Last Month. 
Top Songs Page which displays the user’s most listened to songs of All Time, Last Year, Last Month. 
User profile page where their Spotify information is shown
Discover page that shows users' profiles and allows you to message them
Inbox page that shows your chats with other users
Forum page that displays all of the discussion boards, which users can click on to access the posts

# How to use the Project


# Tech Stack
React
JavaScript

# Credits:
Spotify Web API
ChakraUI
Aiden Ha
Julia Rieger
Mehnaz Tasnim
David Villon

