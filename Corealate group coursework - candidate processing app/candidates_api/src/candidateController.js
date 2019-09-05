const { queryHandler } = require('./queryHandler');
const userName = require('os').userInfo().username;
const {
    errorMessages,
    successMessages
 } = require('../appconfig.js')

async function addNewCandidate(name, lastname, email, role, company, workshop, is_lecture, motivation,response) {
    try {
        await queryHandler("INSERT INTO candidates (name, lastname, email, role, company, corealate_member_name, workshop, is_lecture, motivation, decision) " 
        + "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [name, lastname, email, role, company, userName, workshop, is_lecture, motivation, null]);
        response.status(201).send(successMessages.candidateAdded)
    }
    catch(error){
        console.log(error.stack)
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else if (error === "duplicate key value violates unique constraint \"candidates_email_key\"") {
            response.status(403).send(errorMessages.duplicateEmailError);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function getAllCandidates(response) {
    try {
        return await queryHandler("SELECT name, lastname, email, role, company, workshop, is_lecture, decision, motivation " 
        + "FROM candidates WHERE corealate_member_name = $1", [userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function getCandidatesByLecture(param,response) {
    try {
        return await queryHandler("SELECT name, lastname, email, role, company, workshop, is_lecture, decision, motivation " 
        + "FROM candidates WHERE is_lecture = $1 AND corealate_member_name = $2", [param, userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function getCandidatesByWorkshop(param,response) {
    try {
        return await queryHandler("SELECT name, lastname, email, role, company, workshop, is_lecture, decision, motivation " 
        + "FROM candidates WHERE workshop = $1 AND corealate_member_name = $2", [param, userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function getAllCandidatesForWorkshop(response) {
    try {
        return await queryHandler("SELECT name, lastname, email, role, company, workshop, is_lecture, decision, motivation " 
        + "FROM candidates WHERE workshop IS NOT NULL AND corealate_member_name = $1", [userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function getAllCandidatesForLecture(response) {
    try {
        return await queryHandler("SELECT name, lastname, email, role, company, workshop, is_lecture, decision, motivation " 
        + "FROM candidates WHERE is_lecture = true AND corealate_member_name = $1", [userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function getCandidatesByWorkshopAndLecture(workshop,lecture,response) {
    console.log(workshop,lecture)
    try {
        return await queryHandler("SELECT name, lastname, email, role, company, workshop, is_lecture, decision, motivation " 
        + "FROM candidates WHERE workshop = $1 AND is_lecture = $2 AND corealate_member_name = $3 ", [workshop, lecture,userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function getCandidateByEmail(email,response) {
    try {
        return await queryHandler("SELECT name, lastname, email, role, company, workshop, is_lecture, decision, motivation "
        + "FROM candidates WHERE email = $1 AND corealate_member_name = $2", [email, userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function putCandidateDecision(email, decision, response) {
    try {
        return await queryHandler("UPDATE candidates SET decision = $2 WHERE email = $1 AND corealate_member_name = $3", [email, decision, userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function countCandidatesWithDecision(response) {
    try {
        const data = await queryHandler("SELECT COUNT(*) FROM candidates WHERE " + 
        "corealate_member_name = $1 AND decision IS NOT NULL AND decision != 'REJ'", [userName, ])
        return data[0]
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}

async function getCandidateLists(response) {
    try {
        return await queryHandler("SELECT name, lastname, email, workshop, decision, is_lecture " 
        + "FROM candidates WHERE corealate_member_name = $1 AND decision IS NOT NULL", [userName])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}


async function getWorkshopAttendantsCount(workshop, response) {
    try{
        return await queryHandler("SELECT COUNT(*) FROM candidates WHERE corealate_member_name = $1 AND decision ='ACC_WOR' AND workshop =$2 ", [userName, workshop])
    }
    catch(error){
        if (error.code === "ENOTFOUND") {
            console.log(error.stack)
            response.status(404).send(errorMessages.connectionErrorMessage);
        }
        else {
            console.log(error.stack);
            response.status(404).send(errorMessages.unknownErrorMessage);
        }
    }
}


module.exports = {
    addNewCandidate,
    getAllCandidates,
    getCandidatesByLecture,
    getCandidatesByWorkshop,
    getCandidateByEmail,
    getCandidatesByWorkshopAndLecture,
    putCandidateDecision,
    getAllCandidatesForLecture,
    getAllCandidatesForWorkshop,
    countCandidatesWithDecision,
    getCandidateLists,
    getWorkshopAttendantsCount
}