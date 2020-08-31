const users = [];

const addUser = ({ id, name, room, userClass }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    userClass = 'aldeao';

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(!name || !room) return { error: 'Username and room are required.' };
    if(existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room, userClass };

    users.push(user);

    console.log(`Adding ${user.id}`)

    console.log(users)

    addClass(id)

    console.log(user)

    return { user };
}
const addClass = (id) => {
    const index = users.findIndex((user) => user.id === id);
    console.log(index)

    users[index].userClass = 'lobo'
    console.log(`Adding class to user with the index ${index}`)
}

const getClass = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users[index].userClass;

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, addClass, getClass, removeUser, getUser, getUsersInRoom };