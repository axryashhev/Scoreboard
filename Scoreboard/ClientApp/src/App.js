import React, {useEffect} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
// import {Home} from './components/Home';
// import {FetchData} from './components/FetchData';
// import {Counter} from './components/Counter';

import './custom.css'
import { observer } from "mobx-react";
import Controller from "./Controller/Controller";
import {Action} from "./Constains/Constains";
import {usePlayerStore} from "./Stores/PlayerStore";
import Player from "./Screen/Player";
import AddPlayer from "./Screen/AddPlayer";

const dataPlayer$ = new Controller().loadDataRX(Action.GET_DATA.PLAYER);

const App = observer(() => {
    const {add} = usePlayerStore();

    useEffect(() => {
        const sub = dataPlayer$.subscribe((data) => {
            add(data);
        });

        return () => sub.unsubscribe();
    }, [add]);
    
    return (
        <Layout>
            <Route exact path='/' element={<Player />}/>
            <Route path="/Player" element={<Player />} />
            <Route path="addPlayer" element={<AddPlayer />} />
        </Layout>
    );
});

App.displayName = App.name

export default App;
