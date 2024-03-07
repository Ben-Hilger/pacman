import {ref} from "vue";
import type LayoutBase from "@/layouts/LayoutBase";
import _ from "lodash";

export type Position = {
    x: number,
    y: number
}

export type Dimensions = {
    width: number,
    height: number
}

export class Ghost {

    constructor(
        public position: Position,
        public color: string
    ) {}

}

export class GameTile {

    constructor(
        public item: "food"|"cherry"|"wall"|"blank",
        public canNavigateTo: boolean = false,
        public spaceOccupied: 'user'|'none'|Ghost = 'none',
    ) {}
}

export default function usePacman() {

    const dimensions = ref<Dimensions>();

    const gridLayout = ref<Array<Array<GameTile>>>([])

    const position = ref<Position>();

    const ghostPositions = ref<Array<Ghost>>([])

    function setup(layout: LayoutBase) {
        position.value = layout.getStartingPosition();
        gridLayout.value = layout.getLayout();

        ghostPositions.value = layout.getGhosts();

        dimensions.value = {height: gridLayout.value.length, width: gridLayout.value[0].length}
        gridLayout.value[position.value.y][position.value.x].spaceOccupied = 'user'
        populateBoard();

        setInterval(function () {
            gameTick()
        }, 1000)
    }

    function populateBoard() {
        ghostPositions.value.forEach((ghost) => {
            gridLayout.value[ghost.position.y][ghost.position.x].spaceOccupied = ghost;
        });
    }

    function canMoveToPosition(position: Position): Position|undefined {

        const currentDimensions = dimensions.value;
        if (currentDimensions?.width === undefined || currentDimensions?.height === undefined) {
            console.error("The current dimensions aren't set correctly")
            return
        }
        const isValidNewYPosition = position.y >= 0 && position.y < currentDimensions.height;

        if (!isValidNewYPosition) {
            return undefined;
        }

        if (position.x < 0 && gridLayout.value[position.y][currentDimensions.width - 1].canNavigateTo) {
            position.x = currentDimensions.width - 1;
        } else if (position.x >= currentDimensions.width && gridLayout.value[position.y][0].canNavigateTo) {
            position.x = 0;
        }

        const isValidNewXPosition = position.x >= 0 && position.x < currentDimensions.width;

        return isValidNewXPosition &&
            isValidNewYPosition &&
            gridLayout.value[position.y][position.x].canNavigateTo ? position : undefined

    }

    function moveGhost(ghost: Ghost) {
        const positions = _.shuffle([
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0]
        ])

        for (let i = 0; i < positions.length; i++) {
            const [x, y] = positions[i];
            if (tryMoveToPosition(ghost.position, {x: x + ghost.position.x, y: y + ghost.position.y}, ghost)) {
                break
            }
        }
    }

    function gameTick() {
        ghostPositions.value.forEach((ghost: Ghost) => {
            moveGhost(ghost)
        })
    }

    function move(xDelta: number, yDelta: number) {
        const currentPosition = position.value;
        if (currentPosition === undefined) {
            console.error("Make sure the position and dimensions are set before trying to move")
            return
        }

        if (currentPosition?.x === undefined || currentPosition?.y === undefined) {
            console.error("The current position isn't set correctly")
            return
        }

        const newX = currentPosition.x + xDelta;
        const newY = currentPosition.y + yDelta;

        const newPosition = canMoveToPosition({x: newX, y: newY});
        if (newPosition) {
            gridLayout.value[currentPosition.y][currentPosition.x].spaceOccupied = 'none';
            gridLayout.value[newY][newX].spaceOccupied = 'user';
        }
    }

    function tryMoveToPosition(oldPosition: Position, newPosition: Position, type: 'user'|Ghost) {
        const validPosition = canMoveToPosition(newPosition);
        if (validPosition) {
            gridLayout.value[oldPosition.y][oldPosition.x].spaceOccupied = 'none';
            gridLayout.value[validPosition.y][validPosition.x].spaceOccupied = type;

            if (type instanceof Ghost) {
                type.position = newPosition;
            }

            return true;
        }
        return false;
    }

    return { position, gridLayoutRef: gridLayout, move, dimensions, setup }
}