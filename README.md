## CSGO Observer Custom HUD

A HUD to replace the current default CSGO one. Listening to the CS API to retrieve game information and broadcast this into a cleaner overlay for specialised broadcasts using a browser input.

### Project Setup and Use

- Clone repo
- In root directory run ```npm install```
- Put ```gamestate_integration_observerspectator.cfg``` into CSGO cfg folder

#### Startup

- Launch CSGO
- In root directory:
    - ```npm run dev``` (Listens for updates to code for live development)
    ** OR **
    - ```npm run build``` & ```npm run start``` (Builds and serves static view of overlay for use)
- Join CSGO match or demo as spectator
    - Run ```exec observer.cfg``` in ingame console to remove all unnecessary components of HUD

#### OBS Setup (For recording and streaming)

- Make Browser Source for Custom HUD with URL ```http://localhost:3000/``` and width/height ```1920x1080```.
- Make Game Capture for CSGO


#### Example (Current Status)

<img src="HUD_Example.png"></img>


### Project Structure

- ```server.ts```: Entry point for overlay, serves the html composing the hud and creates a http server for the game to send live updates to which will be parsed and displayed in real time on HUD
- ```gamestate_integration_observerspectator.cfg```: Tells CSGO what information to send and where to send it so server can recieve it
- ```observer.cfg```: In game settings for best observer experience
- ```\public```: Contains all front end assets, html, and styling which compose the HUD

#### How does it work?

This custom overlay works by recieving gamestate updates every tenth of a second (specificed by ```gamestate_integration_observerspectator.cfg```) to an http server created by the application on port 1337. This server then uses Socket.IO to send specific portions of this game state to the front end on port 1338. The front end then uses this information to make live updates to the various information blocks on the HUD like the health of each player, the utility they have, etc. 