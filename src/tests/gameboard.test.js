import gameBoard from "../gameboard";
import ship from "../ship";
const newGameBoard = gameBoard();
const newShip = ship(3, "ac");
const newShipB = ship(3, "bc")

test("ship placed in specified coordinate along x axis", () => {
    expect(newGameBoard.placeShip(0, 0, newShip, "horizontal")).toEqual(["ac", "ac", "ac"])

});
test("ship placed in specified coordinate along y axis", () => {
    expect(newGameBoard.placeShip(1, 1, newShipB, "vertical")).toEqual(["bc", "bc", "bc"])

});
test("check if attack hit a ship in horizontal axis", () => {
    expect(newGameBoard.receiveAttack(0, 0)).toBe(true);
    expect(newGameBoard.receiveAttack(0, 1)).toBe(true);
    expect(newGameBoard.receiveAttack(0, 2)).toBe(true);
});
test("check if attack hit a ship in vertical axis", () => {
    expect(newGameBoard.receiveAttack(1, 1)).toBe(true);
    expect(newGameBoard.receiveAttack(2, 1)).toBe(true);
    expect(newGameBoard.receiveAttack(3, 1)).toBe(true);
});

test("check if attack did not hit ship based on given coordinates", () => {
    expect(newGameBoard.receiveAttack(1, 2)).toBe(false);
    expect(newGameBoard.receiveAttack(2, 2)).toBe(false);
    expect(newGameBoard.receiveAttack(3, 2)).toBe(false);
});

test("check number of ships made", () => {
    const sGameBoard = gameBoard();
    const ship1 = ship(3, "x");
    const ship2 = ship(3, "bc");
    sGameBoard.placeShip(0, 0, ship1, "horizontal");
    sGameBoard.placeShip(1, 1, ship2, "horizontal");
    expect(sGameBoard.getNumOfShipsPlaced()).toBe(2)
});

test("check if all ship objects are stored", () => {
    const sGameBoard = gameBoard();
    const ship1 = ship(3, "x");
    const ship2 = ship(3, "bc");
    sGameBoard.placeShip(0, 0, ship1, "horizontal");
    sGameBoard.placeShip(1, 1, ship2, "horizontal");
    expect(sGameBoard.getShipsPlaced()).toEqual([ship1, ship2]);
});

test("check if all ships from gameboard are destroyed", () => {
    const sGameBoard = gameBoard();
    const ship1 = ship(2, "d");
    const ship2 = ship(2, "k");
    sGameBoard.placeShip(0, 0, ship1, "horizontal");
    sGameBoard.receiveAttack(0, 0);
    sGameBoard.receiveAttack(0, 1);
    sGameBoard.placeShip(1, 1, ship2, "vertical");
    sGameBoard.receiveAttack(1, 1);
    sGameBoard.receiveAttack(2, 1);
    expect(sGameBoard.allShipsDestroyed()).toBe(true)
});
test("check if all ships from gameboard are not destroyed", () => {
    const sGameBoard = gameBoard();
    const ship1 = ship(2, "d");
    const ship2 = ship(2, "k");
    sGameBoard.placeShip(0, 0, ship1, "horizontal");
    sGameBoard.receiveAttack(0, 0);
    sGameBoard.receiveAttack(0, 1);
    sGameBoard.placeShip(1, 1, ship2, "vertical");
    sGameBoard.receiveAttack(1, 1);
    expect(sGameBoard.allShipsDestroyed()).toBe(false)
});
test("check if missed shots are correct ", () => {
    const sGameBoard = gameBoard();
    const ship1 = ship(2, "a");
    const ship2 = ship(2, "c");
    sGameBoard.placeShip(0, 0, ship1, "horizontal");
    sGameBoard.placeShip(1, 1, ship2, "vertical");
    sGameBoard.receiveAttack(2, 2);
    sGameBoard.receiveAttack(2, 3);
    sGameBoard.receiveAttack(1, 5);
    sGameBoard.receiveAttack(2, 5);
    expect(sGameBoard.getMissedAttacks()).toEqual(["22", "23", "15", "25"])
});

