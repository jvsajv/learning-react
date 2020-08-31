import React from 'react';
import './GameTab.css';

const GameTab = ({ userClass, name }) => (
    <h2 className="gameTab">
        Vc eh {userClass}, {name}
    </h2>
);

export default GameTab;