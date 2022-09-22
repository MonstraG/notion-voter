import type { NotionRow } from "types/Row";

const columns = ["Name", "Players", "Played", "Completed", "Filtered Out", "N/A"];

type DataRow = [string, string, boolean, boolean, boolean, boolean];

const data: DataRow[] = [
	["Mothergunship", "2", false, false, false, false],
	["Children Of Morta", "2", false, false, false, false],
	["Aliens: fireteam elite", "3", false, false, false, false],
	["Escape Simulator", "3+~", false, false, false, false],
	["Warhammer 40000: Inquisitor - Martyr", "4", false, false, false, false],
	["Tiny Tina's Wonderland", "4", false, false, false, false],
	["Call to Arms - Gates of Hell: Ostfront", "4", false, false, false, false],
	["The Survivalists", "4", false, false, false, false],
	["Gunfire Reborn", "4", false, false, false, false],
	["State of Decay 2", "4", false, false, false, false],
	["Green Hell", "4", false, false, false, false],
	["Grounded", "4", false, false, false, false],
	["Dying Light 2", "4", false, false, false, false],
	["Helldivers", "4", false, false, false, false],
	["Earth Defence Force 5", "4", true, false, false, false],
	["Crossout", "4", true, false, false, false],
	["Snowrunner", "4", true, false, false, false],
	["Heroes of hammerwatch", "4", true, false, false, false],
	["War thunder", "4", true, false, false, false],
	["MechWarrior 5: Mercenaries", "4", true, false, false, false],
	["Borderlands 3", "4", true, false, false, false],
	["Evild Dead: The Game", "5", false, false, false, false],
	["Blackwake", "5", false, false, false, false],
	["Ready or Not", "5", false, false, false, false],
	["Terraforming Mars", "5", true, false, false, false],
	["Wolfpack", "5", true, false, false, false],
	["Farming Simulator 22", "5+", false, false, false, false],
	["Ai war 2", "5+", false, false, false, false],
	["Arma 3", "5+", true, false, false, false],
	["Space Engineers", "5+", true, false, false, false],
	["Stellaris", "5+", true, false, false, false],
	["Euro Truck Simulator 2", "5+", true, false, false, false],
	["The Forest", "5+", true, false, false, false],
	["Crusider Kings 3", "5+", true, false, false, false],
	["бабкa (gang beasts)", "5+", true, false, false, false],
	["Project Zomboid", "5+", true, false, false, false],
	["Insurgency (2) Sandstorm", "5+", true, false, false, false],
	["Trackmania", "5+", true, false, false, false],
	["Barotrauma", "5+", true, false, false, false],
	["Running with rifles", "5+", true, false, false, false],
	["	Minecraft", "5+", true, false, false, false],
	["Factorio", "5+", true, false, false, false],
	["HoI 4", "5+", true, false, false, false],
	["No Man’s Sky", "5+", true, false, false, false],
	["Superliminal", "4", true, true, false, false],
	["Destiny 2", "4", true, true, false, false],
	["Civilization 5", "5+", true, true, false, false],
	["Terraria", "5+", true, true, false, false],
	["Starbound", "5+", true, true, false, false],
	["Outriders", "3", true, false, true, false],
	["No More Room In Hell", "4", false, false, true, false],
	["Red saltise", "4", true, false, true, false],
	["The Elder Scrolls Online", "4", true, false, true, false],
	["Ghost Recon Breakpoint", "4", true, false, true, false],
	["Sea of thieves", "4", true, false, true, false],
	["Satisfactory", "5+", true, false, true, false],
	["Muck", "5+", true, false, true, false],
	["Killing Floor 2", "5+ (6)", true, false, true, false],
	["Astroneer", "4", true, true, true, false],
	["Warhammer: Vermintide 2", "4", true, true, true, false],
	["Risk of Rain 2", "4", true, true, true, false],
	["The Ship", "5+", true, true, true, false],
	["Path Of Exile 2", "4", false, false, false, true],
	["Baldur’s Gate 3", "4", false, false, false, true]
];

const getBoolean = (row: DataRow, property: string): boolean => getText(row, property) === true;

const getText = (row: DataRow, property: string): DataRow[number] => row[columns.indexOf(property)];

const notionTable: NotionRow[] = data
	.filter((row) => !getBoolean(row, "N/A")) // only available
	.map((row) => ({
		played: getBoolean(row, "Played"),
		players: getText(row, "Players") as string,
		completed: getBoolean(row, "Completed"),
		name: getText(row, "Name") as string
	}));

export default notionTable;
