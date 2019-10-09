class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene', active: true });
    }
    preload() {
        this.load.image('thePixieChord', 'assets/thePixieChord.png');
    }
    create() {
        this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0x444444, 1)
           .setInteractive(); // to prevent click-through from one sceen to a scene behind it.

        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .05, 'The Pixie Chord\nピクシーコード\nPikushīkōdo', { fill: '#fff' })
            .setFontSize(36);

        this.add.sprite(this.game.canvas.width * .50, this.game.canvas.height * .48, 'thePixieChord')
            .setDisplaySize(this.game.canvas.width, this.game.canvas.width);

        var textPadPercent = 0.01;

        this.add.rectangle(this.game.canvas.width * .05, this.game.canvas.height * .80, this.game.canvas.width *.38, this.game.canvas.height * .10, 0x991111, 1)
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerdown', () => this.scene.bringToTop('HowToPlayScene'));

        this.add.text(this.game.canvas.width * (.05 + textPadPercent), this.game.canvas.height * (.80 + textPadPercent), 'New Game\n新しいゲーム\nAtarashī gēmu', { fill: '#fff' })
            .setFontSize(20);
        
        this.add.rectangle(this.game.canvas.width * .47, this.game.canvas.height * .80, this.game.canvas.width *.49, this.game.canvas.height * .10, 0x119911, 1)
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerdown', () => this.scene.bringToTop('HowToPlayScene'));

        this.add.text(this.game.canvas.width * (.47 + textPadPercent), this.game.canvas.height * (.80 + textPadPercent), 'Continue Game\nゲームを続ける\nGēmu o tsudzukeru', { fill: '#fff' })
            .setFontSize(20);
    }
}
class HowToPlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HowToPlayScene', active: true });
        this.debugCount = 0;
    }
    create() {
        this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0x001100, 1)
            .setInteractive(); // to prevent click-through from one sceen to a scene behind it.

        // secret refresh
        this.add.rectangle(this.game.canvas.width * .90, this.game.canvas.height * .20, this.game.canvas.width * .20, this.game.canvas.height * .40, 0xff0000, 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.debugCount++;
                if (this.debugCount >= 3) {
                    this.debugCount = 0;
                    this.scene.bringToTop('DebugScene');
                }
            });

        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .05, 'How to play\n遊び方\nAsobikata', { fill: '#fff' })
            .setFontSize(36);

        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .25, 'Walk around.\n歩き回る\nArukimawaru', { fill: '#fff' })
            .setFontSize(20);
        this.add.text(this.game.canvas.width * .25, this.game.canvas.height * .40, 'Play music.\n音楽を再生\nOngaku o saisei', { fill: '#fff' })
            .setFontSize(20);
        this.add.text(this.game.canvas.width * .40, this.game.canvas.height * .55, 'Collect pixies.\nピクシーを集める\nPikushī o atsumeru', { fill: '#fff' })
            .setFontSize(20);
        
        this.add.rectangle(this.game.canvas.width * .75, this.game.canvas.height * .80, this.game.canvas.width *.45, this.game.canvas.height * .10, 0x119911, 1)
            .setInteractive()
            .on('pointerdown', () => this.scene.bringToTop('CatchPetsScene'));            
        this.add.text(250, 610, 'Next\n次\nTsugi', { fill: '#fff' })
            .setFontSize(20);
    }
}
class DebugScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DebugScene', active: true });
        this.errorIndex = 0;
    }
    create() {
        this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0x551111, 1)
            .setInteractive(); // to prevent click-through from one sceen to a scene behind it.

        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .05, 'DEBUG MENU', { fill: '#f00' })
            .setFontSize(36);   

        this.add.rectangle(this.game.canvas.width * .75, this.game.canvas.height * .20, this.game.canvas.width *.10, this.game.canvas.width *.10, 0x119911, 1)   
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.bringToTop('TitleScene');
            });
        this.add.text(this.game.canvas.width * .75 - 10, this.game.canvas.height * .20 - 20, 'x', { fill: '#fff' })
            .setFontSize(36);   
                    
        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .25, 'Refresh from server.', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            .on('pointerdown', () => window.location.reload(true));    
                    
        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .30, 'Clear pet inventory.', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            .on('pointerdown', () => inventory.pets = []);    
                    
        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .35, 'Vibrate 100ms (90ms pause) 100ms', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            .on('pointerdown', () => navigator.vibrate([100, 90, 100])); 
                    
        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .40, 'Vibrate 500ms', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            .on('pointerdown', () => navigator.vibrate(500)); 
                    
        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .45, 'Create Phaser 3 error+ (test logging)', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            .on('pointerdown', () => this.add.sprite(0,0,'invalid spritesheet name').functionThatDoesNotExist()); 

        var latLongText = this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .50, 'Show LAT/LONG', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            .on('pointerdown', () => this.getPosition(text => {
                console.log(text);
                latLongText.text = text;
            })); 

        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .55, 'Add commons to inventory', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            .on('pointerdown', () => this.addCommonsToInventory()); 
                    
        this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .60, 'Create JS error (test logging)', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            .on('pointerdown', () => functionThatDoesNotExist()); 
 
        this.add.rectangle(0, this.game.canvas.height * .75, this.game.canvas.width, this.game.canvas.height * .20, 0x331111, 1)
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerdown', () => {
                this.errorIndex = (this.errorIndex < console2.errors.length - 1) ? this.errorIndex + 1 : 0;
                consoleText.text = console2.errors[this.errorIndex];
            });

        var consoleText = this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .75, "Tap to show errors", { fill: '#fff', wordWrap: { width: this.game.canvas.width * .80} })
            .setFontSize(12)
            .setInteractive();
    }
    getPosition(callback) {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                callback(latitude + "," + longitude);
            }, function (positionError) {
                console.error(positionError);
                callback("Error");
            }, { timeout: 2000, maximumAge: 5000, enableHighAccuracy: true });
        } else {
            callback("No GPS support");
        }
    }
    addCommonsToInventory() {

        for (var nsIndex = 0; nsIndex < nsCommonData.length; nsIndex++) {
            var petIndex = nsCommonData[nsIndex];
            var pet = new Pet(petIndex);
            inventory.addPet(pet);
        }

        for (var esIndex = 0; esIndex < esCommonData.length; esIndex++) {
            var petIndex = esCommonData[esIndex];
            var pet = new Pet(petIndex);
            inventory.addPet(pet);
        }
    }
}
class PetNamePlate {
    constructor(bubbleSprite, petSprite, nameText, quantityText) {
        this.bubbleSprite = bubbleSprite;
        this.petSprite = petSprite;
        this.nameText = nameText;
        this.quantityText = quantityText;        
    }
}
class InventoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InventoryScene', active: true });
        this.petNamePlates = [];
        this.headingText;
        this.currentPetGroupIndex = 0;
    }
    preload() {
        this.load.spritesheet('catchPet', 'assets/catchPet.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('petsX16', 'assets/petsX16.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('petsX24', 'assets/petsX24.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('petsX8', 'assets/petsX8.png', { frameWidth: 8, frameHeight: 8 });
    }
    create() {
        this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0x5551155, 1)
            .setInteractive(); // to prevent click-through from one sceen to a scene behind it.
            
        this.add.rectangle(this.game.canvas.width * .75, this.game.canvas.height * .20, this.game.canvas.width *.10, this.game.canvas.width *.10, 0x119911, 1)   
            .setInteractive()
            .setOrigin(0,0)
            .on('pointerdown', () => {
                this.scene.bringToTop('CatchPetsScene');
            });
        var textPadPercent = 0.01;
        this.add.text(this.game.canvas.width * (.75 + .02), this.game.canvas.height * (.20 + textPadPercent), 'x', { fill: '#fff' })
            .setFontSize(32);

        this.headingText = this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .20, 'NS Commons\n普通の NS\nFutsū no NS', { fill: '#fff' }).setFontSize(20);

        var textPadPercent = 0.01;

        this.prevButton = this.add.rectangle(this.game.canvas.width * .05, this.game.canvas.height * .80, this.game.canvas.width *.40, this.game.canvas.height * .10, 0x119911, 1)
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerdown', () => { this.assignPetNameplates(--this.currentPetGroupIndex); });
        this.add.text(this.game.canvas.width * (.05 + textPadPercent), this.game.canvas.height * (.80 + textPadPercent), 'Pervious\n前\nMae', { fill: '#fff' })
            .setFontSize(20);

        // todo a lot of this button nonsense could go in a base class.
        this.nextButton = this.add.rectangle(this.game.canvas.width * .55, this.game.canvas.height * .80, this.game.canvas.width *.40, this.game.canvas.height * .10, 0x119911, 1)
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerdown', () => { this.assignPetNameplates(++this.currentPetGroupIndex); });            
        this.add.text(this.game.canvas.width * (.55 + textPadPercent), this.game.canvas.height * (.80 + textPadPercent), 'Next\n次\nTsugi', { fill: '#fff' })
            .setFontSize(20);

        this.addPetNameplates();
    }
    addPetNameplates() {
        var xincrement = this.game.canvas.width * .33;
        var yIncrement = this.game.canvas.width * .29;
        var startingX = this.game.canvas.width * .10;

        var y = this.game.canvas.height * .29;
        for (var yIndex = 0; yIndex < 3; yIndex++) {

            var x = startingX;
            for (var xIndex = 0; xIndex < 3; xIndex++) {
                this.addPetNameplate(x, y)

                x = x + xincrement;
            }

            y = y + yIncrement;
        }
        this.addPetNameplate(startingX, y);
    }
    addPetNameplate(x, y) {
        var scale = 4;
        // todo bubble with hidden / visible toggle.
        var bubbleSprite = this.add.sprite(x, y, 'catchPet')
            .setFrame(0)
            .setOrigin(0,0)
            .setScale(scale);
        var petSprite = this.add.sprite(x, y, 'petsX16')
            .setFrame(0)
            .setOrigin(0,0)
            .setScale(scale)
            .setVisible(false);
        var scaledHeight = petSprite.height * scale;
        var quantityText = this.add.text(x, y, '0', { fill: '#fff', fontWeight: 'bold' })
            .setFontSize(16)
            .setShadow(2, 2, 'rgba(0,0,0,1)', 0);
        var nameText = this.add.text(x, y + scaledHeight, '? ? ? ?', { fill: '#fff' })
            .setFontSize(16);
        var namePlate = new PetNamePlate(bubbleSprite, petSprite, nameText, quantityText);
        this.petNamePlates.push(namePlate);
    }
    assignPetNameplates(petGroupIndex) {

        this.nextButton.setFillStyle(0x119911).setInteractive();
        this.prevButton.setFillStyle(0x119911).setInteractive();
        if (this.currentPetGroupIndex == 0) {
            this.prevButton.setFillStyle(0x888888).disableInteractive();
        }
        if (this.currentPetGroupIndex == petGroupsData.length - 1) {
            this.nextButton.setFillStyle(0x888888).disableInteractive();
        }

        this.currentPetGroupIndex = petGroupIndex;

        var viewModel = inventory.getInventoryViewModel(petGroupIndex);

        if (viewModel.pets.length === 0) {
            return;
        }
        this.headingText.text = viewModel.groupName;

        for (let index = 0; index < viewModel.pets.length; index++) {
            var pet = viewModel.pets[index];
            this.assignPetNameplate(index, pet);
        }
    }
    assignPetNameplate(nameplateIndex, pet) {
        var namePlate = this.petNamePlates[nameplateIndex];
        if (pet.quantity <= 0) {
            namePlate.bubbleSprite.setVisible(true);
            namePlate.petSprite.setVisible(false);
            namePlate.nameText.text = "? ? ? ?";
            namePlate.quantityText.text = pet.quantity;    
        }
        else {
            namePlate.bubbleSprite.setVisible(false);
            namePlate.petSprite.setFrame(pet.petIndex).setVisible(true);
            namePlate.nameText.text = pet.name;
            namePlate.quantityText.text = pet.quantity;    
        }
    }
}
class CatchPetsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CatchPetsScene', active: true });
        this.pianoKeys = [4];
        this.notesPlayedText;
        this.petNameText;
        this.bubble;
        this.petSprite;
        this.pet; // : Pet

        this.messageBackdrop;  
        this.messageBackground;
        this.messageText;
        this.messageButton;
        this.messageButtonText;
    }
    preload() {
        this.load.spritesheet('catchPet', 'assets/catchPet.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('petsX16', 'assets/petsX16.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('petsX24', 'assets/petsX24.png', { frameWidth: 24, frameHeight: 24 });
        this.load.spritesheet('petsX8', 'assets/petsX8.png', { frameWidth: 8, frameHeight: 8 });
    }
    create() {
        this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0xeeeeee, 1)
            .setInteractive(); // to prevent click-through from one sceen to a scene behind it.

        this.petNameText = this.add.text(this.game.canvas.width * .15, this.game.canvas.height * .33, "", { fill: '#000' })
            .setFontSize(36);

        this.bubble = this.add.sprite(this.game.canvas.width * .50, this.game.canvas.height * .50, 'catchPet')
            .setFrame([0])
            .setInteractive()
            .on('pointerdown', () => this.reset())
            .setScale(3);
            
        this.petSprite = this.add.sprite(this.game.canvas.width * .50, this.game.canvas.height * .50, 'petsX16')
            .setFrame(0)
            .setInteractive()
            .on('pointerdown', () => this.collectPet(this.pet))
            .setScale(6)
            .setVisible(false);

        var note = this.add.sprite(this.game.canvas.width * .29, this.game.canvas.height * .72, 'catchPet')
            .setFrame([1])
            .setScale(3);

        this.notesPlayedText = this.add.text(this.game.canvas.width * .33, this.game.canvas.height * .70, "", { fill: '#000' })
            .setFontSize(36);

        this.createPianoKey(0, this.game.canvas.width * 1 / 5, this.game.canvas.height * .80, "F");
        this.createPianoKey(1, this.game.canvas.width * 2 / 5, this.game.canvas.height * .80, "A");
        this.createPianoKey(2, this.game.canvas.width * 3 / 5, this.game.canvas.height * .80, "C");
        this.createPianoKey(3, this.game.canvas.width * 4 / 5, this.game.canvas.height * .80, "F");

        this.add.rectangle(this.game.canvas.width * .25, this.game.canvas.height * .20, this.game.canvas.width *.33, this.game.canvas.height * .10, 0x000, .5)    
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.bringToTop('TitleScene');
            });
        this.add.text(50, 130, 'Menu\nメニュー\nMenyū', { fill: '#000' })
            .setFontSize(20);

        var bag = this.add.sprite(this.game.canvas.width * .75, this.game.canvas.height * .20, 'catchPet')
            .setFrame([3])
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.get('InventoryScene').assignPetNameplates(0);
                this.scene.bringToTop('InventoryScene');
            })
            .setScale(2);

        this.createMessagePopup();
    }
    createMessagePopup() {
        // container.setInteractive is broken
        // https://github.com/photonstorm/phaser/issues/3722
        // Surprisingly this is less code, (but more code to show/hide)
        this.messageBackdrop = this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0x000000, .5);    
        this.messageBackground = this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width * .90, this.game.canvas.height * .50, 0xffdddd);
        this.messageText = this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .30, "test", { fill: '#000' })
            .setFontSize(28);
        var button = {
            x: this.game.canvas.width * .50,
            y: this.game.canvas.height * .65, 
            width: this.game.canvas.width * .75,
            height: this.game.canvas.height * .10
        }
        this.messageButton = this.add.rectangle(button.x, button.y, button.width, button.height, 0x991111, 1)
            .setInteractive()
            .on('pointerdown', () => {
                    this.toggleMessagePopup(false);
                    this.reset();
                });
        this.messageButtonText = this.add.text(button.x - 20, button.y - 10, 'OK', { fill: '#fff' })
            .setFontSize(36);
        this.toggleMessagePopup(false);
    }
    createPianoKey(index, x, y, label) {
        this.pianoKeys[index] = this.add.sprite(x, y, 'catchPet')
            .setFrame([2]).setInteractive()
            .on('pointerdown', () => this.onPianoKeyPress(index))
            .setScale(3);
        var text = this.add.text(x - 6, y - 8, label, { fill: '#000' })
            .setFontSize(20);
        this.pianoKeys[index].text = text;
        this.pianoKeys[index].label = label;
        return this.pianoKeys[index];
    }
    onPianoKeyPress(index) {
        console.log("onPianoKeyPress " + index + " lebel " + this.pianoKeys[index].label);

        if (this.notesPlayedText.text.length < 4) {
            this.notesPlayedText.text = this.notesPlayedText.text + this.pianoKeys[index].label;
        }
        if (this.notesPlayedText.text.length != 4) {
            return;
        }
        var self = this;
        var encounterFactory = new EncounterFactory();
        encounterFactory.getEncounter(this.notesPlayedText.text, inventory, function (encounter) {
            self.displayEncounter(encounter);
        });
    }
    displayEncounter(encounter) {
        switch (encounter.encounterType) {
            case EncounterType.Pet:
                return this.displayPetEncounter(encounter);
            case EncounterType.Message:
                return this.displayMessageEncounter(encounter);
            case EncounterType.Terrain:
                return this.displayTerrainEncounter(encounter);
        }
    }
    displayPetEncounter(encounter) {

        // this.pet is passed into collectPet
        this.pet = encounter.encounteredThing;

        this.enablePianoKeys(false);

        console.log("Summon " + this.pet.toString());

        this.petNameText.text = this.pet.name;

        this.bubble.setVisible(false);

        this.petSprite.setFrame([this.pet.spritesheetFrame])
            .setVisible(true);
    }
    displayMessageEncounter(encounter) {
        this.messageText.text = encounter.encounteredThing;
        this.toggleMessagePopup(true);
    }
    toggleMessagePopup(show) {
        this.messageBackdrop.setVisible(show);  
        this.messageBackground.setVisible(show);
        this.messageText.setVisible(show);
        this.messageButton.setVisible(show);
        this.messageButtonText.setVisible(show);
        this.enablePianoKeys(!show);
    }
    collectPet(pet) {
        // TODO: Some day I may use something other than globals.  Find window.
        inventory.addPet(pet);
        this.reset();
    }
    reset() {
        this.enablePianoKeys(true);
        this.notesPlayedText.text = "";
        this.petNameText.text = "";
        this.bubble.setVisible(true);
        this.petSprite.setVisible(false);
    }
    enablePianoKeys(enabled) {
        for (var keyIndex = 0; keyIndex < this.pianoKeys.length; keyIndex++) {
            if (enabled) {
                this.pianoKeys[keyIndex].setInteractive();
            } else {
                this.pianoKeys[keyIndex].disableInteractive();
            }
        }
    }
}
class Pet {
    constructor(petIndex) {
        this.petIndex = petIndex;
        this.collectedDateTime = new Date();
    }
    get name() {
        return petData[this.petIndex].name;
    }
    get spritesheetName() {
        return petData[this.petIndex].spritesheetName;
    }
    get spritesheetFrame() {
        return petData[this.petIndex].spritesheetFrame;
    }
    get composerId() {
        return petData[this.petIndex].composerId;
    }
    toString() {
        return "Pet Name " + this.name + " sheet " + this.spritesheetName + " [" + this.spritesheetFrame + "]";
    }
}
var EncounterType = {
    Pet: 1,
    Message: 2,
    Terrain: 3
};
class Encounter {
    constructor(encounterType, encounteredThing) {
        this.encounterType = encounterType;
        this.encounteredThing = encounteredThing;
    }
}
class EncounterFactory {
    constructor() {
    }
    // A convenient wrapper for getPetIndex.
    getEncounter(notesPlayed, inventory, callback) {

        var dateTime = new Date();
        var self = this;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var encounter = self._getEncounter(latitude, longitude, dateTime, notesPlayed, inventory);
                callback(encounter);
            }, function (positionError) {
                console.error(positionError);
                var encounter = new Encounter(EncounterType.Message, positionError.message);
                callback(encounter);
            }, { timeout: 2000, maximumAge: 5000, enableHighAccuracy: true });
        } else {
            var encounter = new Encounter(EncounterType.Message, "Your browser does not support GPS.");
            callback(encounter);
        }
    }
    // This is a good method to unit test b/c all of the inputs are defined.
    _getEncounter(latitude, longitude, dateTime, notesPlayed, inventory) {

        var lat10 = this.toQuarterMileIncrement(latitude, 10);
        var lon10 = this.toQuarterMileIncrement(longitude, 10);

        var petIndex = 0;

        var coinFlip = (Math.random() > .5);

        petIndex = this.getCommon(lat10, lon10, coinFlip);

        if (this.collectedRecently(petIndex, inventory, dateTime)) {
            petIndex = this.getCommon(lat10, lon10, !coinFlip);
        }

        if (this.collectedRecently(petIndex, inventory, dateTime)) {
            var notHomeMessage = "No one is here.\n誰もいない\nDaremoinai\n\nWalk around.\n歩き回る\nArukimawaru";
            return (new Encounter(EncounterType.Message, notHomeMessage));
        }

        var pet = new Pet(petIndex);
        return (new Encounter(EncounterType.Pet, pet));
    }
    getCommon(lat10, lon10, coinFlip) {
        if (coinFlip) {
            return this.getEsCommon(lon10);
        }
        else {
            return this.getNsCommon(lat10);
        }
    }
    getNsCommon(lat10) {
        return nsCommonData[lat10];
    }
    getEsCommon(lon10) {
        return esCommonData[lon10];
    }
    collectedRecently(petIndex, inventory, dateTime) {
        const beBackInMinutes = 5;
        var dateCheck = this.addMinutes(dateTime, - beBackInMinutes);

        var collectedRecently = inventory.pets.some(function (pet) {
            console.log(pet.petIndex + " " + petIndex + " " + pet.collectedDateTime + " " + dateCheck)
            return pet.petIndex == petIndex && pet.collectedDateTime > dateCheck;
        });
        return collectedRecently;
    }
    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }
    toQuarterMileIncrement(geocoord, increments) {
        // Normally increments is 10.

        // https://gis.stackexchange.com/questions/142326/calculating-longitude-length-in-miles
        // Each degree of latitude is approximately 69 miles (111 kilometers) apart.
        // At 40° north or south the distance between a degree of longitude is 53 miles (85 km)
        // ----------------------
        // 1 lat = 69 m
        // 1/10 = .1 lat = 6.9 m
        // 1/100 = .01 lat = .69 m
        // 1/300 = .0033 lat = .23 m
        // 44.466166 - 44.462988 = 0.003177 = ~ .25 m (1/4 mile)
        // With 300 (and an extra 10 so I can mod 10), I can break up a quarter mile into 10 sections!
        var geo10 = 0;
        if (geocoord != null) {
            geo10 = geocoord * 3000 % increments;
            geo10 = Math.abs(Math.floor(geo10));
        }
        else {
            geo10 = this.getRandomInt(10); // 0-9;
        }
        return geo10;
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
class Inventory {
    constructor() {
        this.items = [];
        this.pets = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    addPet(pet) {
        this.pets.push(pet);
    }
    getInventoryViewModel(petGroupIndex) {

        var viewModel = new InventoryViewModel();
        viewModel.groupName = petGroupsData[petGroupIndex].name;

        var group = petGroupsData[petGroupIndex].group;

        group.forEach(petIndex => {
            var pet = petData[petIndex];
            var petViewModel = new PetInventoryViewModel();
            var quantity = inventory.pets.filter(x => x.petIndex == petIndex).length;
            petViewModel.petIndex = petIndex;
            petViewModel.name = pet.name;
            petViewModel.quantity = quantity;
            petViewModel.spritesheetName = pet.spritesheetName;
            viewModel.pets.push(petViewModel);
        });

        return viewModel;
    }
}
class InventoryViewModel {
    constructor(petInventoryViewModels, petGroupName) {
        this.pets = petInventoryViewModels || [];
        this.petGroupName = petGroupName;
    }
}
class PetInventoryViewModel {
    constructor(petIndex, name, quantity, spritesheetName) {
        this.petIndex = petIndex;
        this.name = name;
        this.quantity = quantity;
        this.spritesheetName = spritesheetName;
    }
}
class Console2 {
    constructor() {
        this.errors = [];
        (function(self){
            var oldFunction = console.error;
            console.error = function (message) {
                oldFunction.apply(console, arguments);
                self.errors.push(message);
            };
        })(this);
        (function(self){
            var oldFunction = console.warn;
            console.warn = function (message) {
                oldFunction.apply(console, arguments);
                self.errors.push(message);
            };
        })(this);
        window.onerror = function(error, url, line) {
            console.error('ERR:'+error+' L:'+line);
        };        
    }
}
var petData = [
    { name: "Mr. Who Knows", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 0 },
    { name: "Money Man", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 1 },
    { name: "Mr. Wormhole", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 2 },
    { name: "Herp Derp", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 3 },
    { name: "Ninja Waffle", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 4 },
    { name: "Mr. Happy", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 5 },
    //
    { name: "Lightning Guy", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 6 },
    { name: "Mr. Muffin", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 7 },
    { name: "Weird Moana Wave", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 8 },
    { name: "Poetion", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 9 },
    { name: "Shakey", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 10 },
    { name: "Glowy Kittie", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 11 },
    //
    { name: "Achoo!", composerId: 2, spritesheetName: 'petsX16', spritesheetFrame: 12 },
    { name: "THE Watermelon", composerId: 2, spritesheetName: 'petsX16', spritesheetFrame: 13 },
    { name: "Abe Lincoln Hat", composerId: 2, spritesheetName: 'petsX16', spritesheetFrame: 14 },
    { name: "Roundoso ", composerId: 2, spritesheetName: 'petsX16', spritesheetFrame: 15 },
    { name: "Mitty Merfow", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 16 },
    { name: "Th'nana", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 17 },
    //
    { name: "Peet Limuh", composerId: 6, spritesheetName: 'petsX16', spritesheetFrame: 18 },
    { name: "N-Type", composerId: 6, spritesheetName: 'petsX16', spritesheetFrame: 19 },
    { name: "Mookauk", composerId: 7, spritesheetName: 'petsX16', spritesheetFrame: 20 },
    { name: "Hovering Mookauk ", composerId: 7, spritesheetName: 'petsX16', spritesheetFrame: 21 },
    { name: "Mr. Stinker", composerId: 8, spritesheetName: 'petsX16', spritesheetFrame: 22 },
    { name: "Manstein ", composerId: 8, spritesheetName: 'petsX16', spritesheetFrame: 23 },
    //
    { name: "Hot dog", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 24 },
    { name: "Mr. Sundae", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 25 },
    { name: "Random Dude", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 26 },
    { name: "Mouse in a Bottle", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 27 },
    { name: "Scriblins ", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 28 },
    { name: "Derpy Hammer", composerId: 1, spritesheetName: 'petsX16', spritesheetFrame: 29 },
    //
    { name: "Randall Elf", composerId: 12, spritesheetName: 'petsX16', spritesheetFrame: 30 },
    { name: "Moana", composerId: 12, spritesheetName: 'petsX16', spritesheetFrame: 31 },
    { name: "JEFFREY", composerId: 12, spritesheetName: 'petsX16', spritesheetFrame: 32 },
    { name: "MIZZ KITTEH", composerId: 12, spritesheetName: 'petsX16', spritesheetFrame: 33 },
    { name: "RICHARD", composerId: 12, spritesheetName: 'petsX16', spritesheetFrame: 34 },
    { name: "RACHEL", composerId: 12, spritesheetName: 'petsX16', spritesheetFrame: 35 },
    //
    { name: "Twindle", composerId: 13, spritesheetName: 'petsX16', spritesheetFrame: 36 },
    { name: "Balloon Maestro ", composerId: 13, spritesheetName: 'petsX16', spritesheetFrame: 37 },
    { name: "Fancy Nance", composerId: 13, spritesheetName: 'petsX16', spritesheetFrame: 38 },
    { name: "Pineapple Jimmy", composerId: 13, spritesheetName: 'petsX16', spritesheetFrame: 39 },
    { name: "Sprizter", composerId: 13, spritesheetName: 'petsX16', spritesheetFrame: 40 },
    { name: "Yogurt", composerId: 13, spritesheetName: 'petsX16', spritesheetFrame: 41 },
    //
    { name: "Dr. Weird", composerId: 10, spritesheetName: 'petsX16', spritesheetFrame: 42 },
    { name: "Mr. McWiggles", composerId: 10, spritesheetName: 'petsX16', spritesheetFrame: 43 },
    { name: "Mr. Blob", composerId: 10, spritesheetName: 'petsX16', spritesheetFrame: 44 },
    { name: "Mrs. Blob", composerId: 10, spritesheetName: 'petsX16', spritesheetFrame: 45 },
    { name: "Cubie ", composerId: 10, spritesheetName: 'petsX16', spritesheetFrame: 46 },
    { name: "Mr. Mutant", composerId: 10, spritesheetName: 'petsX16', spritesheetFrame: 47 },
    //
    { name: "Hapfo", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 48 },
    { name: "Duck", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 49 },
    { name: "Rrakerfunshuck", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 50 },
    { name: "Twister", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 51 },
    { name: "Mr. Shapership", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 52 },
    { name: "Treeman", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 53 },
    //
    { name: "Blubble Blobble", composerId: 5, spritesheetName: 'petsX16', spritesheetFrame: 54 },
    { name: "CABC", composerId: 5, spritesheetName: 'petsX16', spritesheetFrame: 55 },
    { name: "Mr. Zezo", composerId: 5, spritesheetName: 'petsX16', spritesheetFrame: 56 },
    { name: "Blankoot", composerId: 5, spritesheetName: 'petsX16', spritesheetFrame: 57 },
    { name: "Wormy", composerId: 5, spritesheetName: 'petsX16', spritesheetFrame: 58 },
    { name: "Apoo Sauce", composerId: 5, spritesheetName: 'petsX16', spritesheetFrame: 59 },
    //
    { name: "Smoker", composerId: 8, spritesheetName: 'petsX16', spritesheetFrame: 60 },
    { name: "Nuggle ", composerId: 9, spritesheetName: 'petsX16', spritesheetFrame: 61 },
    { name: "Thernifuh", composerId: 9, spritesheetName: 'petsX16', spritesheetFrame: 62 },
    { name: "Shentuh ", composerId: 9, spritesheetName: 'petsX16', spritesheetFrame: 63 },
    //
    { name: "Crazy-nazy ", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 64 },
    { name: "Bobomoo ", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 65 },
    { name: "Gaga ", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 66 },
    { name: "Â¥XJÄ™RBÂ¡'Å‚Ä¯Ã¸Ã¦ÃŸÄ", composerId: 3, spritesheetName: 'petsX16', spritesheetFrame: 67 },
    //
    { name: "Baby Mister", composerId: 4, spritesheetName: 'petsX16', spritesheetFrame: 68 },
    { name: "Mighty Footer", composerId: 4, spritesheetName: 'petsX16', spritesheetFrame: 69 },
    { name: "Nolr ", composerId: 4, spritesheetName: 'petsX16', spritesheetFrame: 70 },
    { name: "Smix ", composerId: 4, spritesheetName: 'petsX16', spritesheetFrame: 71 },
    //
    { name: "Moos`e", composerId: 2, spritesheetName: 'petsX24', spritesheetFrame: 72 },
    { name: "Squog", composerId: 2, spritesheetName: 'petsX24', spritesheetFrame: 1 },
    { name: "Dr. Witchy Joe", composerId: 3, spritesheetName: 'petsX24', spritesheetFrame: 2 },
    { name: "Bobby Joe ", composerId: 3, spritesheetName: 'petsX24', spritesheetFrame: 3 },
    { name: "Selly Joe", composerId: 3, spritesheetName: 'petsX24', spritesheetFrame: 4 },
    { name: "Jelly Jelloo", composerId: 3, spritesheetName: 'petsX24', spritesheetFrame: 5 },
    //
    { name: "Mooky Pucky", composerId: 6, spritesheetName: 'petsX24', spritesheetFrame: 6 },
    { name: "Meep Zorp!", composerId: 6, spritesheetName: 'petsX24', spritesheetFrame: 7 },
    { name: "Oxion-o", composerId: 6, spritesheetName: 'petsX24', spritesheetFrame: 8 },
    { name: "Glober", composerId: 9, spritesheetName: 'petsX24', spritesheetFrame: 9 },
    { name: "Mrs. Fluffy", composerId: 8, spritesheetName: 'petsX24', spritesheetFrame: 10 },
    { name: "Mr. Haedayse ", composerId: 8, spritesheetName: 'petsX24', spritesheetFrame: 11 },
    //
    { name: "Glanuf ", composerId: 9, spritesheetName: 'petsX24', spritesheetFrame: 12 },
    { name: "Jelber ", composerId: 9, spritesheetName: 'petsX24', spritesheetFrame: 13 },
    { name: "Burning Tails", composerId: 3, spritesheetName: 'petsX24', spritesheetFrame: 14 },
    { name: "Poochkin", composerId: 11, spritesheetName: 'petsX24', spritesheetFrame: 15 },
    { name: "Robozoid", composerId: 11, spritesheetName: 'petsX24', spritesheetFrame: 16 },
    //
    { name: "Mini-pic", composerId: 6, spritesheetName: 'petsX8', spritesheetFrame: 0 },
    { name: "Kegando", composerId: 6, spritesheetName: 'petsX8', spritesheetFrame: 1 },
    { name: "Invisi-pic", composerId: 6, spritesheetName: 'petsX8', spritesheetFrame: 2 },
    { name: "Biv", composerId: 6, spritesheetName: 'petsX8', spritesheetFrame: 3 },
    { name: "Crabic ", composerId: 6, spritesheetName: 'petsX8', spritesheetFrame: 4 },
    { name: "Gondo ", composerId: 6, spritesheetName: 'petsX8', spritesheetFrame: 5 },
    { name: "Oofouwch", composerId: 3, spritesheetName: 'petsX8', spritesheetFrame: 6 },
    { name: "Arhgy ", composerId: 3, spritesheetName: 'petsX8', spritesheetFrame: 7 },
    { name: "Mbando", composerId: 3, spritesheetName: 'petsX8', spritesheetFrame: 8 },
    { name: "Mr. Potato Sack", composerId: 3, spritesheetName: 'petsX8', spritesheetFrame: 9 },
    { name: "Kyeeno ", composerId: 3, spritesheetName: 'petsX8', spritesheetFrame: 10 },
    { name: "Vramselder ", composerId: 3, spritesheetName: 'petsX8', spritesheetFrame: 11 },
];
var nsCommonData = [
    5, // Mr. Happy
    2, // Mr. Wormhole
    20, // Mookauk
    17, // Th'nana
    31, // Moana
    46, // Cubie
    48, // Hapfo
    58, // Wormy
    61, // Nuggle
    10, // Shakey
];
var esCommonData = [
    62, // Thernifuh
    66, // Gaga
    54, // Blubble Blobble
    41, // Yogurt
    15, // Roundoso
    60, // Smoker
    43, // Mr. McWiggles
    69, // Mighty Footer
    49, // Duck
    12, // Achoo!
];
var petGroupsData = [
    {
        name: "NS Commons\n普通の NS\nFutsū no NS",
        group: nsCommonData
    },
    {
        name: "ES Commons\n普通の ES\nFutsū no ES",
        group: esCommonData
    },
];
var composerData = [
    "No one. Because arrays start at zero and composerId starts at 1.",
    "Joe, Caller of Beasts",
    "Rosie",
    "D.J. Doctor Jimian Junior",
    "Wilma 'The Phenomenon'",
    "Miranin",
    "Jessemon Galacticon",
    "AMoose",
    "Bademo",
    "Nootch the Awesome",
    "Ace",
    "Sam",
    "Raekel",
    "Teelorj",
    "Ezra, Hero of Pickles",
];
var inventory = new Inventory();

var config = {
    type: Phaser.AUTO,
    pixelArt: true, // Prevents image anti-alias when scaling up.  Also messes up default font.
    // I could reduce the game size and user ScaleManger to zoom in.  BTW, zoom is not a real config setting.  
    width: 450, // 9*50 = 450
    height: 800, // 16*50 = 800
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    // Order here matters.  The first scene is listed last.
    scene: [DebugScene, InventoryScene, CatchPetsScene, HowToPlayScene, TitleScene]
};

var console2 = new Console2();

var game = new Phaser.Game(config);
