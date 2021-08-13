
function changeStateTo(state){
    if(state === 'active') return 'inactive'
    return 'active'
}

function createP(text){
    let p = document.createElement('p');
        p.innerHTML = text + '   ';
        console.log(p)
        return p
}

function createLi(user){
    let li = document.createElement('li');
        li.setAttribute('id', user.id)
        li.setAttribute('href', `/edit-user.html`);
        li.setAttribute('class', 'list-group-item list-group-item');
        let firstName = createP(user.firstName);
        let lastName = createP(user.lastName);
        let email = createP(user.email);
        let state = createP(user.state)
        li.append(firstName);
        li.append(lastName);
        li.append(email);
        li.append(state);

        return li
}

function createUserObj(user){
    return {
        id : user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        state: user.state
    }
}

async function handleClick(e){
    console.log(e.target.id)
    let res = await axios.get(`/users/${e.target.id}`);
    let user = res.data
    console.log(user.state)

    let userObj = createUserObj(user)
    console.log(userObj)

    if(user.state === 'pending'){
        userObj.state = 'active'
        let res = axios.put(`http://localhost:3000/users/${user.id}`, userObj)
    } else if(user.state === 'active'){
        userObj.state = 'inactive'
        let res = axios.put(`http://localhost:3000/users/${user.id}`, userObj)
    }
    else{
        userObj.state = 'active'
        let res = axios.put(`http://localhost:3000/users/${user.id}`, userObj)
    }
    console.log(user.state)
}

function createButton(user){
    let button = document.createElement('button');
        button.innerHTML = `set to ${changeStateTo(user.state)}`;
        button.setAttribute('class', 'btn btn-secondary')
        button.setAttribute('id', user.id)

        button.addEventListener('click',handleClick)
        return button
}

async function getUsers(){
    //use axios to retrieve user data from node server
    let res = await axios.get('http://localhost:3000/users');
    let users = res.data;

    //create list variable from ul id
    let list = document.getElementById('users-list');
    
    for(let i = 0; i < users.length; i++){
        //store current user for easier access/use 
        let user = users[i];
        //create an li element for each user is users array
        let li = createLi(user);

        let button = createButton(user)
        button.innerHTML = `set to ${changeStateTo(user.state)}`;
        li.append(button);
        list.append(li);
        
    }
}

getUsers();