const fs = require('fs')
const { default: validator } = require('validator')
const filepath = './data/contact.json'
const existFolder = fs.existsSync('./data')
const existFile = fs.existsSync(filepath)

if (!existFolder){
    fs.mkdirSync('./data')
}

if(!existFile){
    fs.writeFileSync(filepath,'[]')
}

const saveContact = (name, number, email)=> {
    const contact = {name, number, email}
    const file = fs.readFileSync(filepath, 'utf-8')
    const contacts = JSON.parse(file)

    const duplicate = contacts.find((cont) => cont.name === name)
    const duplicateEmail = contacts.find((cont) => cont.email === email)
    const duplicateNumber = contacts.find((cont) => cont.number === number)

    const valEmail = validator.isEmail(email)
    const valNumber = validator.isMobilePhone(number,'id-ID')

    if(duplicate){
        console.log('Contact Name is already recorded')
        return false
    }

    if(!email || valEmail==false || duplicateEmail){
        console.log('Email format is not valid or Contact Email is already recorded')
        return false
    }

    if(valNumber==false || duplicateNumber){
        console.log('Mobile Number format is not valid or Contact Number is already recorded')
        return false
    }

    contacts.push(contact)
    fs.writeFileSync(filepath, JSON.stringify(contacts))
    console.log('Contact has been added')
}

const getAllContact = ()=> {
    const file = fs.readFileSync(filepath,'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

const listContact = ()=>{
    const contacts = getAllContact()
    contacts.forEach((contact,i)=>{
        console.log(`${i+1}.${contact.name} - ${contact.number}`)
    })
}

const getDetailContact = (name) => {
    const contacts = getAllContact()
    console.log('Detail Contact')
    const detailContact = contacts.find((cont) => cont.name === name)
    console.log(`${detailContact.name}\n${detailContact.number}\n${detailContact.email}`)
}

const deleteContact = (number) => {
    const contacts = getAllContact()
    const deleteContact = contacts.filter(user => user.number != number);
    fs.writeFileSync(filepath, JSON.stringify(deleteContact))
    console.log('Contact has been deleted')
}

const updateContact = (key, name, number, email) => {
    const contacts = getAllContact()
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name === key || contacts[i].number === key || contacts[i].email === key ) {
            if(name && number && email) {
                contacts[i].name = name
                contacts[i].number = number
                contacts[i].email = email
            }
            if (name){
                contacts[i].name = name
            }
            if (number){
                contacts[i].number = number
            }
            if (email){
                contacts[i].email = email
            }
            if(name && email){
                contacts[i].name = name
                contacts[i].email = email
            }
            if (name && number){
                contacts[i].name = name
                contacts[i].number = number
            }
            if (email && number){
                contacts[i].email = email
                contacts[i].number = number
            }
        }
      }
    fs.writeFileSync(filepath, JSON.stringify(contacts))
    console.log('Contact has been updated')

}

module.exports = {saveContact, listContact, getDetailContact, deleteContact, updateContact}