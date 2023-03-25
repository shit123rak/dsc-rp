# chrome-rpc
**Discord Rich Presence for Chrome**
## Sites:
1. Google
2. Youtube
3. Stackoverflow (w3schools, geeksforgeeks, quora, codepen)
4. Github
5. Reddit
6. Twitter
7. Discord
8. Facebook
9. Instagram
10. Wikipedia<br>
*etc*

## How to setup:
1. Download the project
2. Set up the extension in chrome (`extension directory`)
3. Navigate to `rich-presence` directory in cmd
4. `npm i`
5. `node server`
###
**You are all good, It would work**

## settings.json
allSites[] -> list of all default sites<br>
bannedSites[] -> default sites you don't wanna show<br>
extraSites[] -> some sites other than default ones you wanna show<br>
githubUsername -> your username in github (by default of creator)<br>
workingRepo -> if any, by default leads to all of your repos. (eg: "/my-project")<br>
noUrl -> a url for some cases (when site is not defined)<br>
