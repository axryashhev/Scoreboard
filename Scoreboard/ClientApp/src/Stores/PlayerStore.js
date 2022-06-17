import { action, makeObservable, observable } from "mobx";
import React from "react";

class PlayerStore {
    players = [];

    constructor() {
        makeObservable(this, {
            players: observable,
            add: action
        });
    }
    
    add(player) {
        this.players.push(player);
    }
}

const playerStore = new PlayerStore();
// Create a React Context with the counter store instance.
export const PlayerStoreContext = React.createContext(playerStore);
export const usePlayerStore = () => React.useContext(PlayerStoreContext);
