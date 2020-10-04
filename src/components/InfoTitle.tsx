import React from 'react';

interface IInfoTitle {
    openings: number;
}

function InfoTitle({ openings }: IInfoTitle) {
    return (
        <h1>{`Openings: ${openings}`}</h1>
    )
}

export default React.memo(InfoTitle);