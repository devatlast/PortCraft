





//Hashed password
export async function hashPassword(pwd) {
    if (typeof pwd !== 'string') {
        throw new Error('Input must be a string');
    }
    if (pwd.length === 0) {
        throw new Error('Input cannot be empty');
    }
    try{
        const encoder = new TextEncoder();
        const data = encoder.encode(pwd);
        const hashedBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashedArray = Array.from(new Uint8Array(hashedBuffer));
        const hashedHex = hashedArray
        .map(byte => byte. toString(16).padStart(2, '0'))
        .join('');

        return hashedHex;
    } catch (err) {
        console.error('Hashing error:', error);
        throw new Error('Failed to compute SHA_256 hash (Web Crypto Api unavailable?');
    }
}


export function getUsers() {
    return JSON.parse(localStorage.getItem('PortBox: users')) || []
}

export function saveUsers(users) {
    localStorage.setItem('PortBox: users', JSON.stringify(users));
}




//portfolio bloc to get portfolio data

const KEY_PORTFOLIOS = 'PortBox_v1';

export  function getPortfolios() {
    try {
        const raw = localStorage.getItem(KEY_PORTFOLIOS);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.warn("Portfolios parse failed -> returning empty array", err);
        return [];
    }
}
//to save portfolio
export function savePortfolio(allPortfoliosofdata) {
    if (!Array.isArray(allPortfoliosofdata)) {
        console.warn("saveportfolios expects arrays");
        return false;
    }
   try {
    localStorage.setItem(KEY_PORTFOLIOS, JSON.stringify(allPortfoliosofdata));
    return true;
   } catch (err) {
    console.error("Failed to save portfolios", err);
    return false;
   }
}
// to register users
export async function registerUser(username, password) {
    const users = getUsers();
    if (users.some(u => u.username === username)) {
        throw new Error("Username taken");
    }
    const passwordHash = await hashPassword(password);
    const newUser = { username, passwordHash, createdAt: new Date().toISOString()};
    users.push(newUser);
    saveUsers(users);
    return newUser;
}

//to login users
export async function loginUser(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username.trim());

    if (!user) {
        throw new Error("User not found");
    }
    const inputHash = await hashPassword(password);
    if (inputHash !== user.passwordHash) {
        throw new Error("Incorrect password");
    }

    localStorage.setItem('PortBox_currentUser', JSON.stringify(user));
    return user;
}

