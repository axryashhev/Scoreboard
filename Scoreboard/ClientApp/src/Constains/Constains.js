export const RestApi = "https://localhost:5001/api";

export const TypeAction = {
    Player: "Player",
};

const basePlayer = `${RestApi}/${TypeAction.Player}`;

export const Action = {
    GET_DATA: {
        PLAYER: basePlayer,
    },
    DELETE: {
        PLAYER: `${basePlayer}/`,
    },
    ADD_DATA: {
        PLAYER: `${basePlayer}/Add`,
    },
    UPDATE: {
        PLAYER: `${basePlayer}/Edit`,
    },
};