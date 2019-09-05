const {
    putCandidateDecision,
    getWorkshopAttendantsCount
} = require('./candidateController')

const {
    shouldStatusChangeToACC_LEC,
    shouldStatusChangeToACC_WOR,
    shouldStatusChangeToMV_LEC,
    shouldStatusChangeToREJ,
    maxWorkshopAttendantsCountExceeded
} = require('./choiceLogic')

const { 
    errorMessages,
    successMessages,
    maximumWorkshopCandidatesNumber
 } = require('../appconfig')

async function moveToLecture(candidate, response) {
    if (candidate === undefined) {
        response.status(404).send(errorMessages.candidateWithGivenEmailNotFound);
        return;
    }

    if (shouldStatusChangeToMV_LEC(candidate)) {
        await putCandidateDecision(candidate.email, "MV_LEC", response);
        response.status(202).send(successMessages.candidateDecisionChange);
    }
    else {
        response.status(403).send(errorMessages.candidateDecisionChangeForbidden);
    }
}

async function acceptWorkshop(candidate, response) {
    if (candidate === undefined) {
        response.status(404).send(errorMessages.candidateWithGivenEmailNotFound);
        return;
    }
    const numberOfAttendants = await getWorkshopAttendantsCount(candidate.workshop, response)
    if (maxWorkshopAttendantsCountExceeded(numberOfAttendants[0].count, maximumWorkshopCandidatesNumber)){
        response.status(403).send(errorMessages.maximumCandidatesForWorkshopExceeded);
        return;
    }

    if (shouldStatusChangeToACC_WOR(candidate)) {
        await putCandidateDecision(candidate.email, "ACC_WOR", response);
        response.status(202).send(successMessages.candidateDecisionChange);
    }
    else {
        response.status(403).send(errorMessages.candidateDecisionChangeForbidden);
    }
}

async function acceptLecture(candidate, response) {
    if (candidate === undefined) {
        response.status(404).send(errorMessages.candidateWithGivenEmailNotFound);
        return;
    }

    if (shouldStatusChangeToACC_LEC(candidate)) {
        await putCandidateDecision(candidate.email, "ACC_LEC", response);
        response.status(202).send(successMessages.candidateDecisionChange);
    }
    else {
        response.status(403).send(errorMessages.candidateDecisionChangeForbidden);
    }
}

async function reject(candidate, response) {
    if (candidate === undefined) {
        response.status(404).send(errorMessages.candidateWithGivenEmailNotFound);
        return;
    }

    if (shouldStatusChangeToREJ(candidate)) {
        await putCandidateDecision(candidate.email, "REJ", response);
        response.status(202).send(successMessages.candidateDecisionChange);
    }
    else {
        response.status(403).send(errorMessages.candidateDecisionChangeForbidden);
    }
}



module.exports = {
    moveToLecture,
    acceptWorkshop,
    acceptLecture,
    reject
}