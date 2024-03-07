import LayoutBase from "@/layouts/LayoutBase";
import {GameTile, type Position} from "@/composable/Pacman";

export default class ClassicLayout extends LayoutBase {

     getLayout(): Array<Array<GameTile>> {

         const builtLayout: Array<Array<GameTile>> = [];

         const wallIndexes = [
             ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
             ["X", " ", " ", " ", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", " ", " ", " ", "X"],
             ["X", " ", "X", " ", "X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X", " ", "X", " ", "X"],
             ["X", " ", " ", " ", " ", " ", " ", " ", "X", " ", " ", " ", " ", " ", "X", " ", " ", " ", " ", " ", " ", " ", "X"],
             ["X", "X", "X", " ", "X", " ", "X", " ", "X", " ", "X", "X", "X", " ", "X", " ", "X", " ", "X", " ", "X", "X", "X"],
             ["X", " ", " ", " ", "X", " ", "X", " ", "X", " ", "X", " ", "X", " ", "X", " ", "X", " ", "X", " ", " ", " ", "X"],
             ["X", " ", "X", " ", "X", " ", "X", " ", "X", " ", "X", "X", "X", " ", "X", " ", "X", " ", "X", " ", "X", " ", "X"],
             ["X", " ", " ", " ", "X", " ", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", " ", "X", " ", " ", " ", "X"],
             ["X", "X", "X", "X", "X", " ", "X", " ", "X", "X", "X", "X", "X", "X", "X", " ", "X", " ", "X", "X", "X", "X", "X"],
             ["X", " ", " ", " ", " ", " ", "X", " ", " ", " ", " ", " ", " ", " ", " ", " ", "X", " ", " ", " ", " ", " ", "X"],
             ["X", " ", "X", "X", "X", "X", "X", " ", "X", "X", "X", "B", "X", "X", "X", " ", "X", "X", "X", "X", "X", " ", "X"],
         ]

         for (let height = 0; height < 11; height++) {
            const row: GameTile[] = [];
             for (let width = 0; width < 23; width++) {
                if (wallIndexes[height][width] === "X") {
                    row.push(this.wallTile());
                } else if (wallIndexes[height][width] === "B") {
                    row.push(this.blankTile());
                } else {
                    row.push(this.foodTile());
                }
             }
             builtLayout.push(row);
         }

         builtLayout.push([...this.repeatFoodGameTile(8), this.wallTile(), ...this.repeatBlankTile(5), this.wallTile(), ...this.repeatFoodGameTile(8)])
         wallIndexes.reverse();

         wallIndexes[0][11] = "X";

         for (let height = 0; height < 11; height++) {
             const row: GameTile[] = [];
             for (let width = 0; width < 23; width++) {
                 if (wallIndexes[height][width] === "X") {
                     row.push(this.wallTile());
                     continue;
                 }
                 row.push(this.foodTile());
             }
             builtLayout.push(row);
         }

         return builtLayout;
    }

    getStartingPosition(): Position {
         return {x: 11, y: 15}
    }

}
