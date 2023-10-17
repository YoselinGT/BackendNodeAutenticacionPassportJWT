import jwt from 'jsonwebtoken'

const secret = 'myCat';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5NzQxNzQyMn0.TSl_FW5tVZjy0VstGhXOx8Fvfc9wmiAHw6iiViTYs0g";


const verifyToken = (token,secret) => {
    return jwt.verify(token,secret)
}

const payload = verifyToken(token,secret);
console.log(payload)