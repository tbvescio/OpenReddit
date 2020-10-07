# OpenReddit

Reddit clone made with ReactJS, NodeJS, Express and MongoDB.

### Features:
* Frontpage (private, public)
* Subreddits
* Submitting comments / posts 
* Voting on posts / comments
* Subscribing
* Searching
* Profile pages
* Karma system
* Validation
* Login / Register
* Hash / salted passwords
* Delete post


### Usage
Client:
```sh
$ cd client
$ npm install 
$ npm start
```
Server:
```sh
$ cd server/src
$ npm install
$ npm start
```

### API Endpoints

| URl | METHOD | BODY| DETAILS  |
| ------ | ------ | ------|------|
| /api/auth/login | POST | username , password | |
| /api/auth/signup | POST |username , password | |
| /api/u/suscribe/:subreddit | PUT | | *auth|
| /api/u/unsuscribe/:subreddit | PUT || *auth|
| /api/u/:username/:subreddit | GET || check if is suscribed|
| /api/u/:username | GET || retrives user profile|
| /api/create-post | POST |subreddit , title , body| *auth|
| /api/vote-post | PUT |postId , isUpvote|*auth / isUpvote is boolean |
| /api/create-comment | POST |postId , body , username| *auth|
| /api/vote-comment | PUT |commentId ,  isUpvote| *auth / isUpvote is boolean|
| /api/r/:subreddit/:postId | GET || gets specific post |
| /api/search/:filter | GET || gets subreddits and profiles based on filter |
| /api/create-subreddit | POST |name , description|  *auth |
| /api/r/:subreddit | GET || |
| /api/frontpage | GET || *auth|
| /api/frontpage-public | GET || |
| /api/delete-post | DELETE |postId|*auth |

 *auth endpoints needs JWT token in Authorization header with this format: bearer (token) 