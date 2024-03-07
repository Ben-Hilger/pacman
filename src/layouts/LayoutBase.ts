import {GameTile, Ghost, type Position} from "@/composable/Pacman";
import { cloneDeep } from "lodash";

export default abstract class LayoutBase {

    abstract getLayout(): Array<Array<GameTile>>;

    abstract getStartingPosition(): Position;

    getGhosts(): Ghost[] {
        return [
            new Ghost({x: 11, y: 11}, 'bg-blue-400'),
            new Ghost({x: 11, y: 10}, 'bg-red-800'),
            new Ghost({x: 12, y: 11}, 'bg-pink-800'),
            new Ghost({x: 10, y: 11}, 'bg-orange-800'),
        ]
    }

    protected repeatFoodGameTile(occurrences: number) {
        return this.repeatGameTile(this.foodTile(), occurrences)
    }

    protected repeatBlankTile(occurrences: number) {
        return this.repeatGameTile(this.blankTile(), occurrences)
    }

    protected repeatWallGameTile(occurrences: number) {
        return this.repeatGameTile(this.wallTile(), occurrences)
    }

    private repeatGameTile(gameTile: GameTile, occurrences: number): GameTile[] {
        const results: GameTile[] = [];

        for (let i = 0; i < occurrences; i++) {
            results.push(cloneDeep(gameTile));
        }

        return results;
    }

    protected blankTile() {
        return new GameTile("blank", true);
    }

    protected wallTile() {
        return new GameTile("wall");
    }

    protected foodTile() {
        return new GameTile("food", true);
    }

    protected cherryTile() {
        return new GameTile("cherry", true);
    }
}
