function shouldStatusChangeToACC_WOR(candidate) {
    return ["MV_LEC",null,"REJ"].includes(candidate.decision) && candidate.workshop !== null
}

function shouldStatusChangeToACC_LEC(candidate) {
    return [null,"REJ"].includes(candidate.decision) && candidate.workshop === null && candidate.is_lecture === true
}

function shouldStatusChangeToMV_LEC(candidate) {
    return [null,"REJ","ACC_WOR"].includes(candidate.decision) && candidate.workshop !== null  && candidate.is_lecture === true
}

function shouldStatusChangeToREJ(candidate) {
    if (candidate.decision === "ACC_LEC" && candidate.workshop === null && candidate.is_lecture === true) {
        return true
    }
    else if (["ACC_WOR","MV_LEC"].includes(candidate.decision) && candidate.workshop !== null) {
        return true
    }
    else if (candidate.decision === null) {
        return true
    }
    else return false
}

function maxWorkshopAttendantsCountExceeded(numberOfAttendants, maximumNumberOfAttendants) {
    if (numberOfAttendants >= maximumNumberOfAttendants){
        return true
    } 
    else return false
}

module.exports = {
    shouldStatusChangeToACC_LEC,
    shouldStatusChangeToACC_WOR,
    shouldStatusChangeToMV_LEC,
    shouldStatusChangeToREJ,
    maxWorkshopAttendantsCountExceeded
}