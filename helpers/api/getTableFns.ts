import type { NotionRow } from "types/Row";

const columns = ["Name", "Players", "Played", "Completed", "Filtered Out", "N/A", "Голосов"];

const data = [
	["Mothergunship", "2", "No", "No", "No", "No", "0"],
	["Children Of Morta", "2", "No", "No", "No", "No", "0"],
	["Aliens: fireteam elite", "3", "No", "No", "No", "No", "0"],
	["Escape Simulator", "3+~", "No", "No", "No", "No", "0"],
	["Warhammer 40000: Inquisitor - Martyr", "4", "No", "No", "No", "No", "0"],
	["Tiny Tina's Wonderland", "4", "No", "No", "No", "No", "0"],
	["Call to Arms - Gates of Hell: Ostfront", "4", "No", "No", "No", "No", "0"],
	["The Survivalists", "4", "No", "No", "No", "No", "0"],
	["Gunfire Reborn", "4", "No", "No", "No", "No", "0"],
	["State of Decay 2", "4", "No", "No", "No", "No", "0"],
	["Green Hell", "4", "No", "No", "No", "No", "0"],
	["Grounded", "4", "No", "No", "No", "No", "0"],
	["Dying Light 2", "4", "No", "No", "No", "No", "0"],
	["Helldivers", "4", "No", "No", "No", "No", "0"],
	["Earth Defence Force 5", "4", "Yes", "No", "No", "No", "0"],
	["Crossout", "4", "Yes", "No", "No", "No", "0"],
	["Snowrunner", "4", "Yes", "No", "No", "No", "0"],
	["Heroes of hammerwatch", "4", "Yes", "No", "No", "No", "0"],
	["War thunder", "4", "Yes", "No", "No", "No", "0"],
	["MechWarrior 5: Mercenaries", "4", "Yes", "No", "No", "No", "0"],
	["Borderlands 3", "4", "Yes", "No", "No", "No", "0"],
	["Evild Dead: The Game", "5", "No", "No", "No", "No", "0"],
	["Blackwake", "5", "No", "No", "No", "No", "0"],
	["Ready or Not", "5", "No", "No", "No", "No", "0"],
	["Terraforming Mars", "5", "Yes", "No", "No", "No", "0"],
	["Wolfpack", "5", "Yes", "No", "No", "No", "0"],
	["Farming Simulator 22", "5+", "No", "No", "No", "No", "0"],
	["Ai war 2", "5+", "No", "No", "No", "No", "0"],
	["Arma 3", "5+", "Yes", "No", "No", "No", "0"],
	["Space Engineers", "5+", "Yes", "No", "No", "No", "0"],
	["Stellaris", "5+", "Yes", "No", "No", "No", "0"],
	["Euro Truck Simulator 2", "5+", "Yes", "No", "No", "No", "0"],
	["The Forest", "5+", "Yes", "No", "No", "No", "0"],
	["Crusider Kings 3", "5+", "Yes", "No", "No", "No", "0"],
	["бабкa (gang beasts)", "5+", "Yes", "No", "No", "No", "0"],
	["Project Zomboid", "5+", "Yes", "No", "No", "No", "0"],
	["Insurgency (2) Sandstorm", "5+", "Yes", "No", "No", "No", "0"],
	["Trackmania", "5+", "Yes", "No", "No", "No", "0"],
	["Barotrauma", "5+", "Yes", "No", "No", "No", "0"],
	["Running with rifles", "5+", "Yes", "No", "No", "No", "0"],
	["	Minecraft", "5+", "Yes", "No", "No", "No", "0"],
	["Factorio", "5+", "Yes", "No", "No", "No", "0"],
	["HoI 4", "5+", "Yes", "No", "No", "No", "0"],
	["No Man’s Sky", "5+", "Yes", "No", "No", "No", "0"],
	["Superliminal", "4", "Yes", "Yes", "No", "No", "0"],
	["Destiny 2", "4", "Yes", "Yes", "No", "No", "0"],
	["Civilization 5", "5+", "Yes", "Yes", "No", "No", "0"],
	["Terraria", "5+", "Yes", "Yes", "No", "No", "0"],
	["Starbound", "5+", "Yes", "Yes", "No", "No", "0"],
	["Outriders", "3", "Yes", "No", "Yes", "No", "0"],
	["No More Room In Hell", "4", "No", "No", "Yes", "No", "0"],
	["Red saltise", "4", "Yes", "No", "Yes", "No", "0"],
	["The Elder Scrolls Online", "4", "Yes", "No", "Yes", "No", "0"],
	["Ghost Recon Breakpoint", "4", "Yes", "No", "Yes", "No", "0"],
	["Sea of thieves", "4", "Yes", "No", "Yes", "No", "0"],
	["Satisfactory", "5+", "Yes", "No", "Yes", "No", "0"],
	["Muck", "5+", "Yes", "No", "Yes", "No", "0"],
	["Killing Floor 2", "5+ (6)", "Yes", "No", "Yes", "No", "0"],
	["Astroneer", "4", "Yes", "Yes", "Yes", "No", "0"],
	["Warhammer: Vermintide 2", "4", "Yes", "Yes", "Yes", "No", "0"],
	["Risk of Rain 2", "4", "Yes", "Yes", "Yes", "No", "0"],
	["The Ship", "5+", "Yes", "Yes", "Yes", "No", "0"],
	["Path Of Exile 2", "4", "No", "No", "No", "Yes", "0"],
	["Baldur’s Gate 3", "4", "No", "No", "No", "Yes", "0"]
];

const getBoolean = (row: string[], property: string): boolean => getText(row, property) === "Yes";

const getText = (row: string[], property: string): string => row[columns.indexOf(property)];

const notionTable: NotionRow[] = data
	.filter((row) => !getBoolean(row, "N/A")) // only available
	.map((row) => ({
		played: getBoolean(row, "Played"),
		players: getText(row, "Players"),
		completed: getBoolean(row, "Completed"),
		name: getText(row, "Name")
	}));

export default notionTable;
