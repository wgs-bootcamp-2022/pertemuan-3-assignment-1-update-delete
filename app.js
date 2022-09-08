const { command, demandOption } = require("yargs");
const yargs = require("yargs");
const { saveContact, listContact, getDetailContact, deleteContact, updateContact } = require("./functions");

yargs.command({
    command:"add",
    describe:"Add Contact",
    builder:{
        name:{
            desciribe:"Contact Name",
            demandOption:true,
            type:"string"
        },
        number:{
            desciribe:"Contact Number",
            demandOption:true,
            type:"string"
        },
        email:{
            desciribe:"Contact Email",
            demandOption:false,
            type:"string"
        }
    },
    handler(argv){
        saveContact(argv.name,argv.number,argv.email)
    }
})
yargs.command({
    command:'list',
    describe:'see contact list',
    handler(){
        listContact()
    }
})

yargs.command({
    command:'detail',
    describe:"See detail contact",
    builder:{
        name:{
            desciribe:"Contact Name",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        getDetailContact(argv.name)
    }
})

yargs.command({
    command:'delete',
    describe:"Delete Contact",
    builder:{
        number:{
            desciribe:"Contact Name",
            demandOption:true,
            type:"string"
        }
    },
    handler(argv){
        deleteContact(argv.number)
    }
})

yargs.command({
    command:"update",
    describe:"Update Contact",
    builder:{
        key:{
            desciribe:"Key",
            demandOption:true,
            type:"string"
        },
        name:{
            desciribe:"Contact Name",
            demandOption:false,
            type:"string"
        },
        number:{
            desciribe:"Contact Number",
            demandOption:false,
            type:"string"
        },
        email:{
            desciribe:"Contact Email",
            demandOption:false,
            type:"string"
        }
    },
    handler(argv){
        updateContact(argv.key, argv.name,argv.number,argv.email)
    }
})
yargs.parse()
