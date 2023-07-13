import React, { useState } from "react";
const Tutorial = (props: any) => {

    const {setTutorial, tutorialStep, setTutorialStep} = props;

    let directions = ''
    let tutorialLocation = 'tutorial_box_middle'

    switch (tutorialStep) {
        case 0:
            directions = ''
            break;
        case 1:
            directions = 'Name your new world and upload your world map image, click submit when finished'
            break;
        case 2:
            tutorialLocation = 'tutorial_box_low'
            directions = 'next click create a icon'
            break;
        case 3:
            tutorialLocation = 'tutorial_box_low'
            directions = `Click "choose file" to upload an image. This is what a clickable city will look like. It's best to use a PNG with a transparent background. Click submit once you have chosen a image.`
            break;   
        case 4:
            tutorialLocation = 'tutorial_box_low'
            directions = 'Add that icon to your map by clicking the plus sign next to your new icon.'
            break; 
        case 5:
            tutorialLocation = 'tutorial_box_low'
            directions = 'Drag and drop that icon anywhere on you map. Name your clickable and upload the image that you want the icon to bring you to. Click submit when complete. WARNING larger images will take longer to upload.'
            break; 
        case 6:
            tutorialLocation = 'tutorial_box_low'
            directions = 'Click on your new icon and it will take you to its map'
            break;
        case 7:
            tutorialLocation = 'tutorial_box_low'
            directions = 'You can create as many of these as you want, there is no limit to how deep you can go by adding more clickables.'
            break;
        case 8:
            tutorialLocation = 'tutorial_box_low'
            directions = 'Click the back arrow on the top left of the map area to return to the previous map.'
            break;
        case 9:
            tutorialLocation = 'tutorial_box_low'
            directions = 'Click the hamburger icon at the top right of the map area to open and close the menu.'
            break;   
        case 10:
            tutorialLocation = 'tutorial_box_low'
            directions = 'Click the icons at the top of the menu to change the contents. click the world icon to bring you to the world edit page.'
            break;
        case 11:
            tutorialLocation = 'tutorial_box_low'
            directions = 'Here you can change the world you are in and can switch to edit mode. Click the toggle to swicth to edit mode.'
            break;
        case 12:
            tutorialLocation = 'tutorial_box_low'
            directions = 'Clicking on an icon while in edit mode will select the icon. You can now click the arrows to change the size of the icon. You can also drag and drop the icon in another spot on the map. These changes automaticly apply. you can also delete icons by droping them in the trash that appears at the bottom right when you are in edit mode. Click the toggle to exit edit mode.'
            break;
        case 13:
            tutorialLocation = 'tutorial_box_low'
            directions = 'The gear menu icon will take you to the options menu.'
            break;
        case 14:
            tutorialLocation = 'tutorial_box_low'
            directions = `That's all, have fun!`
            break;   
        case 15:
            setTutorial(false)    
            break;
        default:
            break;
    }
    

    return(
        
        <div className={tutorialLocation}>
            { tutorialStep === 0 ?
            <div>
            <h2 className="centered">would you like to start the tutorial?</h2>
            <div className="flex align-items-centered">
              <button className="upload-button">
                <div className="border" onClick={() => {setTutorialStep(tutorialStep + 1)}}>
                  <h2>yes</h2>
                </div>
              </button>
              <button className="upload-button">
                <div className="border" onClick={() => {setTutorial(false)}}>
                  <h2>no</h2>
                </div>
              </button>
            </div>
            </div>
            : 
            <div>
                <h2>{directions}</h2>
                { tutorialStep === 7 || tutorialStep === 14 ?
                <button className="upload-button">
                  <div className="border" onClick={() => {setTutorialStep(tutorialStep + 1)}}>
                  <h2>next</h2>
                  </div>
                </button>
                : null}
            </div>
            }
        </div>
    )
}

export default Tutorial