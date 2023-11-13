# SoundProject

## Project Concept
We tried to find a balance between sound, visuals and interactivity, but it was difficult to pinpoint a specific idea since visuals and interactivity played a more potent role, and sound a subordinate role in the suggestions we brainstormed. We first clarified a specific genre: horror, since such a genre enables a prominent focus on sound. We decided our experience would take place in a haunted house and thus settled on a horror escape room concept. In this way, we could incorporate sound clips e.g., wind blowing, doors, floorboards creaking, water dripping etc., to further invoke the user to hyperfocus on sound. Through interacting with select objects, the main characters would be able to navigate through the setting to find necessary clues to escape. We added dialogues and necessary narrations to further aid users in their experience as well as to unfold a narrative. We deliberately placed clues so that it requires the user to explore every single room of the house. Without having explored the house and attempting to leave, it would unlock a special dialogue that would urge users to continue further their search for clues as a means to solve a riddle. 

## Team Members
- Jiho Choi => Drawing, Script Editing
- Diana Donatella => Sound Editing, Script Editing
- Sneheel Sarangi => Coding, Sound Mixing
- Jiacheng Xia => Coding, Script Editing

# Process
## Drawing 
Firstly visuals had to align with sounds, so we began to list important sounds relating to the furniture e.g., grandfather clock, mirror, telephone ringing, tv static etc. We didn't want to rely too much on visuals and thus kept the furniture count to a minimum. The drawing wasn't too much of an arduous process. The only thing that was challenging was drawing according to an established perspective. I used reference images from the videogame: "undertale" to aid this process. With regards to creating a horror ambience, we decided to exclude windows to further perpetuate claustrophobia and the notion that there is no escape. I used 3 key colours: red, black and white; black to embody absolute darkness, white for outlines of furniture and red for key furnitures. For example, the ripped portrait in the lobby, the telephone in the bedroom, the mirror in the bathroom and the exit door in the corridor are further spotlighted for emphasis using red. I saved each individual furniture as a separate png file and included images as reference for the positioning of these furnitures using code. With regards to character drawing, there was a strong preference for using silhouettes within the group. As such we decided to model our own characters using inspirations from the videogame: "limbo". I had to choose character colours that didn't collide with the background colours to ensure clarity and so decided to fill them with varying shades of grey. I saved these as one png file and reflected it to create another png file (characters facing left and right).

## Sound Editing 
### Tools used
- Zoom H5 Recorder or H4
- SD 8GB or 16GB
- Rode NTG1/NTG2/NTG3B Shotgun Mic
- 6.5ft Straight XLR Cable
- Eneloop AA Rechargeable Batteries
- Headphones

### Cast For Recording Dialogues/ Narration
- Jiho Choi => Sophia
- Diana Donatella => Dracula, Narrator
- Sneheel Sarangi => Oliver
- Jiacheng Xia => Ethan

Thankfully, I had a background in sound design as a result of my music major and so was able to implement my knowledge on sound production for film from my previous classes. Thus, there weren't many difficulties when sound editing. The main softwares I used were PRO TOOLS, LOGIC and SOUNDLY. The first 2 were wonderful platforms for editing audio clips derived directly from Soundly, which is a software for film containing thousands of different sound samples e.g., footsteps, wind, white noise, door slamming etc. I was able to explore through various sounds within the Soundly sound library and import them into our project in Logic and Pro Tools. 
With regards to our choices of sound clips, and as previously mentioned, our group based our concept around horror and so naturally our focus was centered around eerie, unsettling noises to cause the users to feel uneasy. Hence, I used various sound clips: creaky doors, water running, wind, low droning noises, in addition to the dialogue that was pre-recorded by our group. 

### Creating the Script & Recording
We first generated a script that included various responses to specific events that occur within our sound experience. However, we found that our initial script was too long (nearly 4-5pgs) and so we really cut down on unecessary dialogue so that the script was mere 2 pages. We made sure not to exclude too much narration since again, the experience is centered around sound. We included dialogue for specific instances. For example, if the user had not explored all rooms in the house before attempting to leave, a specific dialogue would be triggered. If the user had explored thoroughly and so was able to find out the answer to the riddle, a special ending dialogue would be triggered. Once we had finalized the script, we began recording on Thursday. We had our trial script run recorded as a potential backup and then recorded our actual dialogue. 

### Sound Mixing

We used audacity for the final sound mixing of our project. Though we didn't employ more advanced sound editing techniques such as fades etc., we made sure to make our audio is clear and clean as possible. Due to the interactive nature of the project, we were working with several audio files at the same time, makign the whole process tedious and prone to error, thsu requiring meticulous effort on that front.

## Coding 
For the coding part, we used several techniques. Aside from the simple implementations such as inserting audio or doing the layouts, we used many other techniques to create this webpage. For the characters, they should trigger sound cues, dialogues, or narration when they reach certain areas in the page. For their movement, we used addListener() to keys on the keyboard so when some keys are pressed, it will trigger the listener and make the characters move my changing its left value. We used the MutationObserver() method in JavaScript to monitor the changes in the x-axis coordinates of the characters. Therefore, when they approach a certain interaction point of the environment, I could force their movements to stop and play the dialogues to let people know what exactly is happening. We also oriented the visual pieces on the canvas so that they align with the audio cue triggers and made it seem like the characters are stopping when they see the elements in the room. The project is mainly constructed of six scenes in three separate webpages. The main webpage holds four scenes: the cover, the living room (lobby), the hallway, and the end-cover. They are aligned in a sequential order, and when characters arrive in a new scene on this page, they can’t turn back. The other two webpages are hidden behind the two doors where when the user reaches the door and presses the up button, they will be redirected to the other webpages. These webpages each holds one scene, which is the bedroom and the bathroom. When they leave the room, they just have to move in the opposite direction. And they will return to the main webpage. The user’s progress is recorded using session storage, which is a temporary storage that will only be cleared when the browser is closed. Therefore, they won’t lose their progress when they are directed to another webpage and back.

Additionally, we have taken care to ensure that there are flags that ensure the dialogues don't overlap with each other. This stops the user from moving the characters when there is dialogue playing, and cuasing unnecessary confusion.

## Overall Evaluation 
Overall, we were very pleased with the final end result, even more so since the code implementation was an incredibly tedious process and so we were all the more happy with how everything came together. Whilst we felt our concept ideas were solid and that we didn't stray too far from our original plans, we felt as though we should've limited the effects of the visuals even more to place greater emphasis on the important role of sound. To do so perhaps we could've made the entire scene a dark screen with only the characters in view. Everytime the characters' x value overlaps with furnitures placed at a specific x value, subsequent objects would be illuminated. This way, it would force the users to hyperfocus and rely on sound rather than sight to navigate through the house setup. It would also aid our horror genre since our deliberately planned jumpscares would prove to be more effective. It would essentially facilitate the subordinate role of visuals to sound, although of course, this would be a challenging feat to accomplish through code. However, it's one that we would like to explore further. 
