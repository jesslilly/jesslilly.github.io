class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene', active: true });
    }
    preload() {
        this.load.image('thePixieChord', 'assets/thePixieChord.png');
    }
    create() {
        this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0x444444, 1);

        this.add.text(0, 0, 'The Pixie Chord\nピクシーコード\nPikushīkōdo', { fill: '#fff' })
            .setFontSize(36);

        this.add.image(0, 100, 'thePixieChord').setOrigin(0, 0)
            .setScale(12);

        this.add.text(20, 600, 'New Game\n新しいゲーム\nAtarashī gēmu', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            // TODO better way to change scenes.
            .on('pointerdown', () => this.scene.sendToBack());
    }
}
class HowToPlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HowToPlayScene', active: true });
    }
    create() {
        this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0x001100, 1);

        // secret refresh
        this.add.rectangle(this.game.canvas.width, 0, 100, 100, 0xff0000, 0)
            .setInteractive()
            .on('pointerdown', () => window.location.reload(true));

        this.add.text(0, 0, 'How to play\n遊び方\nAsobikata', { fill: '#fff' })
            .setFontSize(36);

        this.add.text(0, 200, 'Walk around.\n歩き回る\nArukimawaru', { fill: '#fff' })
            .setFontSize(20);
        this.add.text(60, 280, 'Play music.\n音楽を再生\nOngaku o saisei', { fill: '#fff' })
            .setFontSize(20);
        this.add.text(120, 360, 'Collect pets.\nペットを集める\nPetto o atsumeru', { fill: '#fff' })
            .setFontSize(20);

        this.add.text(250, 600, 'Next\n次\nTsugi', { fill: '#fff' })
            .setFontSize(20)
            .setInteractive()
            // TODO better way to change scenes.
            .on('pointerdown', () => this.scene.sendToBack());
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
        this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0xeeeeee, 1);

        this.add.text(20, 80, 'Menu\nメニュー\nMenyū', { fill: '#000' })
            .setFontSize(20)
            .setInteractive()
            // TODO better way to change scenes.
            .on('pointerdown', () => {
                this.scene.sendToBack();
            });

        var bag = this.add.sprite(this.game.canvas.width * .8, this.game.canvas.height * .1, 'catchPet')
            .setFrame([3]).setInteractive()
            .setScale(2);

        this.petNameText = this.add.text(this.game.canvas.width * .15, this.game.canvas.height * .33, "", { fill: '#000' })
            .setFontSize(36);

        this.bubble = this.add.sprite(this.game.canvas.width * .50, this.game.canvas.height * .50, 'catchPet')
            .setFrame([0])
            .setScale(3);
            
        this.petSprite = this.add.sprite(this.game.canvas.width * .50, this.game.canvas.height * .50, 'petsX16')
            .setFrame(0)
            .setInteractive()
            .on('pointerdown', () => this.collectPet(this.pet))
            .setScale(6)
            .setVisible(false);

        var note = this.add.sprite(this.game.canvas.width * .29, this.game.canvas.height * .72, 'catchPet')
            .setFrame([1]).setInteractive()
            .setScale(3);

        this.notesPlayedText = this.add.text(this.game.canvas.width * .33, this.game.canvas.height * .70, "", { fill: '#000' })
            .setFontSize(36);

        this.createPianoKey(0, this.game.canvas.width * 1 / 5, this.game.canvas.height * .80, "F");
        this.createPianoKey(1, this.game.canvas.width * 2 / 5, this.game.canvas.height * .80, "A");
        this.createPianoKey(2, this.game.canvas.width * 3 / 5, this.game.canvas.height * .80, "C");
        this.createPianoKey(3, this.game.canvas.width * 4 / 5, this.game.canvas.height * .80, "F");

        this.createMessagePopup();
    }
    createMessagePopup() {
        // container.setInteractive is broken
        // https://github.com/photonstorm/phaser/issues/3722
        // Surprisingly this is less code, (but more code to show/hide)
        this.messageBackdrop = this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width, this.game.canvas.height, 0x000000, .5);    
        this.messageBackground = this.add.rectangle(this.game.canvas.width * .50, this.game.canvas.height * .50, this.game.canvas.width * .90, this.game.canvas.height * .50, 0xffdddd);
        this.messageText = this.add.text(this.game.canvas.width * .10, this.game.canvas.height * .30, "test", { fill: '#000' })
            .setFontSize(36);
        var button = {
            x: this.game.canvas.width * .50,
            y: this.game.canvas.height * .65, 
            width: this.game.canvas.width * .75,
            height: this.game.canvas.height * .10
        }
        this.messageButton = this.add.rectangle(button.x, button.y, button.width, button.height, 0xff2222, 1)
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
            navigator.geolocation.getCurrentPosition(function (location) {
                var latitude = location.coords.latitude;
                var longitude = location.coords.longitude;
                var encounter = self._getEncounter(latitude, longitude, dateTime, notesPlayed, inventory);
                callback(encounter);
            }, function () {
                // If geolocation fails, use a random location
                // https://stackoverflow.com/a/3885172/1804678
                var latitude = null;
                var longitude = null;
                var encounter = self._getEncounter(latitude, longitude, dateTime, notesPlayed, inventory);
                callback(encounter);
            }, { timeout: 10000 });
        } else {
            // If the browser does not support location, provide a random location.
            var latitude = null;
            var longitude = null;
            var encounter = self._getEncounter(latitude, longitude, dateTime, notesPlayed, inventory);
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
        const beBackInMinutes = 15;
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
    0, // lava!!!!!!!!!!!!!!!!!!!
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
    0, // lava!!!!!!!!!!!!!!!!!!!
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
    scene: [CatchPetsScene, HowToPlayScene, TitleScene]
};

var game = new Phaser.Game(config);