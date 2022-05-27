import React from 'react';

                            // Desestruturação do title
export default function Header({ title, children })
{
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
}