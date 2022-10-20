/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

interface ShowTopics {
  showTopics: boolean;
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })
	
	
    WA.room.area.onEnter('area1').subscribe(() => {
        console.log('YOU ARE IN AREA 1');
		
		WA.state.saveVariable('showTopics', {
		    'showTopics': true
		}).catch(e => console.error('Something went wrong while saving variable', e));		
		
    })	
	
    WA.room.area.onEnter('area2').subscribe(() => {
        console.log('YOU ARE IN AREA 2');
		
		WA.state.saveVariable('showTopics', {
		    'showTopics': false
		}).catch(e => console.error('Something went wrong while saving variable', e));		
		
    })		

	
	
	
	WA.state.onVariableChange('showTopics').subscribe((value) => {
		console.log('Variable "showTopics" changed. New value: ', value);
		
		if (value.showTopics === true) {
			WA.room.showLayer("topics");		
		} else {
			WA.room.hideLayer("topics");		
		}
	});	

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
