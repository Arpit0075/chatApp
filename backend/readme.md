This is backend code source for Group Chat Application . In this app, we can register users, they can login and they can group chat.
This app is using MERN Stack with socket.io for instant data transmission for chats.

Here are the end ponts for the backend:

get, "https://chatapp978.herokuapp.com/" , it gives us the welcome message.
post, "https://chatapp978.herokuapp.com/users/register" , it is the end point for user registeration
post, "https://chatapp978.herokuapp.com/users/login" , it is the end point for user login

These are protected routes:
get, "https://chatapp978.herokuapp.com/chats/getChats" , it gives us all chat messages
post, "https://chatapp978.herokuapp.com/chats/postChat , it allows us to save chat messages
