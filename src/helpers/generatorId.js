export const generatorId = (users = []) => {
    let id = ''

    for(let i = 0; i < 8; i++){
        id += Math.floor(Math.random() * 10)
    }

    if(users.some(user => user.id === id)){
        return generatorId(users)
    }
    return  id
}