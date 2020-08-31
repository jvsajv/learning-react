import React from 'react';

import './TextContainer.css';

const TextContainer = ({users}) => (
    <div className="textContainer">
        {
            users
                ? (
                    <div className="activeContainer">
                        <h2>
                            Online Users:
                            {users.map(({name}) => (
                                <div key={name} className="activeItem">
                                    <div className="name">{name}</div>
                                </div>
                            ))}
                        </h2>
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;