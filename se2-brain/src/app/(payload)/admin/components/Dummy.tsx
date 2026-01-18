'use client';

import React from 'react';

export const DummyClient = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: 'yellow', border: '5px solid black', color: 'black' }}>
            <h1>DUMMY COMPONENT LOADED</h1>
            <p>If you see this, the mapping and RootPage work. The issue was CreateFirstUserClient imports.</p>
        </div>
    );
};
