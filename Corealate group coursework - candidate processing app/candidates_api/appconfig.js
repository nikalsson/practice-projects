errorMessages = {
    unknownErrorMessage: "Wystąpił niezindetifikowany problem. Spróbuj ponownie później. Jeżeli problem będzie się powtarzał, proszę skontaktuj się z nami w celu uzyskania pomocy",
    connectionErrorMessage: "Wystąpił błąd połączenia, spróbuj ponownie później.",
    duplicateEmailError: "Użytkownik z takim emailem został już zarejstrowany.",
    candidateByCriteriaNotFound: "Nie znaleziono kandydatów o podanych kryteriach.",
    candidateWithGivenEmailNotFound: "Nie znaleziono kandydata z takim emailem.",
    candidateDecisionChangeForbidden: "Nie można zmienić decyzji kandydata w ten sposób.",
    maximumCandidatesForWorkshopExceeded: "Osiągnięto maksymalną ilość kandydatów na warsztat"
}

successMessages = {
    candidateDesicionChange: "Zmienionio status kandydata.",
    candidateAdded: "Dokonałeś rejestracji. Czekaj na email z potwierdzeniem od nas. Do zobaczenia! :)"
}

tempFilespath = __dirname + '/src/temp'

maximumWorkshopCandidatesNumber = 16;

module.exports = {
    errorMessages,
    successMessages,
    maximumWorkshopCandidatesNumber
}