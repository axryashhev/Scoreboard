import React, { useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import {usePlayerStore} from "../Stores/PlayerStore";

const AddPlayer = observer(() => {
    const [name, setName] = useState("");
    const [score, setScore] = useState(0);
    const { players, add } = usePlayerStore();

    const handleSubmit = useCallback(() => {
        add({ id: players[players.length - 1].id + 1, name: name });
    }, [add, name, players]);

    return (
        <>
            <h1>Players</h1>
            <hr />
            <Link className="btn btn-primary btn-sm" to="/admin/tag">
                All Players
            </Link>
            <hr />
            <Form onSubmit={handleSubmit}>
                <Form.Group my={3}>
                    <Form.Control
                        type="tex"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tag Name"
                    />
                </Form.Group>
                <Form.Group my={3}>
                    <Form.Control
                        type="tex"
                        value={score}
                        onChange={(e) => setScore(parseInt(e.target.value))}
                        placeholder="Tag Name"
                    />
                </Form.Group>
                <br />
                <Form.Group my={3}>
                    <Button type="submit" className="btn btn-sm btn-success">
                        Add
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
});

export default AddPlayer;
