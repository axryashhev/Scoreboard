import React, { useCallback, useMemo, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import {usePlayerStore} from "../Stores/PlayerStore";

const Player = observer(() => {
    // edit player state
    const [player, setPlayer] = useState(undefined);

    const [playerUpdateForm, setPlayerUpdateForm] = useState(false);
    const { deletePlayer, players, updatePlayer } = usePlayerStore();

    // player delete handle
    const handleDelete = useCallback(
        (id) => {
            deletePlayer(id);
        },
        [deletePlayer]
    );

    // handle player edit
    const handlePlayerEdit = useCallback(localPlayer => {
        setPlayerUpdateForm(true);
        setPlayer(localPlayer);
    }, []);

    /// Form Submit Handler
    const handleFormSubmit = useCallback(e => {
            e.preventDefault();

            if (player) {
                updatePlayer(player);
            } else {
                alert("player не найден");
            }
            setPlayerUpdateForm(false);
        },
        [player, updatePlayer]
    );

    const onChange = useCallback(e => {
            if (player) {
                const localPlayer = player;
                localPlayer.name = e.target.value;
                setPlayer(localPlayer);
            }
        },
        [player]
    );

    const renderEdit = useMemo(
        () =>
            playerUpdateForm && (
                <>
                    <h3>Edit player data</h3>
                    <hr />
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group my={3}>
                            <Form.Control
                                type="tex"
                                value={player?.name}
                                onChange={onChange}
                                placeholder="player Name"
                            />
                        </Form.Group>
                        <br />
                        <Form.Group my={3}>
                            <Button type="submit" className="btn btn-sm btn-success">
                                Update
                            </Button>
                        </Form.Group>
                    </Form>
                </>
            ),
        [handleFormSubmit, onChange, player?.name, playerUpdateForm]
    );

    return (
        <>
            <h1>Players</h1>
            <hr />
            <Link className="btn btn-primary btn-sm" to="/admin/add-player">
                Create new player
            </Link>
            <hr />
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>score</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {players.map((data, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{data.name}</td>
                        <td>
                            <Button
                                variant="warning"
                                onClick={() => handlePlayerEdit(data)}
                                className="btn-sm"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(data.id)}
                                className="btn-sm"
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {renderEdit}
        </>
    );
});

export default Player;
