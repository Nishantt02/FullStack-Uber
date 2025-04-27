import React, { createContext, useState } from 'react';

// Create the context
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    // Initialize user state
    const [user, setUser] = useState({ // Renamed 'User' to 'user'
        email: '',
        fullname: '',
        _id:'', // Initialize _id with null to indicate no value initially
        
    });

    return (
        <div>
            {/* Wrap children inside the Provider */}
            <UserDataContext.Provider value={{ user, setUser }}> {/* Updated 'User' to 'user' */}
                {children}
            </UserDataContext.Provider>
        </div>
    );
};

export default UserContext;
