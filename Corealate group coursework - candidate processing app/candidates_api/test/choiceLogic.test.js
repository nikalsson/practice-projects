const {
    shouldStatusChangeToACC_LEC,
    shouldStatusChangeToACC_WOR,
    shouldStatusChangeToREJ,
    shouldStatusChangeToMV_LEC,
    maxWorkshopAttendantsCountExceeded
} = require('../src/choiceLogic')

describe("shouldStatusChangeToACC_WOR", () => {
    test("is supposed to return true when candidate decision is null and he workshop is defined", () => {
        //given
        const candidates = { "decision": null, "workshop": 1, "email": "test@test.pl" }
        //when
        const status = shouldStatusChangeToACC_WOR(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return true when candidate decision is 'REJ' workshop is defined", () => {
        //given
        const candidates = { "decision": "REJ", "workshop": 1, "email": "test@test.pl" }
        //when
        const status = shouldStatusChangeToACC_WOR(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return true when candidate decision is 'MV_LEC' and workshop is defined", () => {
        //given
        const candidates = { "decision": "MV_LEC", "workshop": 1, "email": "test@test.pl" }
        //when
        const status = shouldStatusChangeToACC_WOR(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return false when candidate decision is 'ACC_LEC' and workshop is defined", () => {
        //given
        const candidates = { "decision": "ACC_LEC", "workshop": 1, "email": "test@test.pl" }
        //when
        const status = shouldStatusChangeToACC_WOR(candidates)
        //then
        expect(status).toBe(false)
    })

    test("is supposed to return false when candidate decision is 'ACC_LEC' and he workshop is not defined", () => {
        const candidates = { "decision": "MV_LEC", "workshop": null, "email": "test@test.pl" }
        //when
        const status = shouldStatusChangeToACC_WOR(candidates)
        //then
        expect(status).toBe(false)
    })

})

describe("shouldStatusChangeToACC_LEC", () => {
    test("is supposed to return true when candidate decision is null, workshop is null and lecture is chosen", () => {
        //given
        const candidates = { "decision": null, "workshop": null, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToACC_LEC(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return true when candidate decision is 'REJ', workshop is null and lecture is chosen", () => {
        //given
        const candidates = { "decision": "REJ", "workshop": null, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToACC_LEC(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return false when candidate decision is 'REJ', workshop is defined and lecture is chosen", () => {
        //given
        const candidates = { "decision": "REJ", "workshop": 1, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToACC_LEC(candidates)
        //then
        expect(status).toBe(false)
    })

    test("is supposed to return false when candidate decision is 'MV_LEC', workshop is null and lecture is chosen", () => {
        //given
        const candidates = { "decision": "MV_LEC", "workshop": null, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToACC_LEC(candidates)
        //then
        expect(status).toBe(false)
    })

    test("is supposed to return false when candidate decision is 'REJ', workshop is null and lecture is not chosen", () => {
        //given
        const candidates = { "decision": "REJ", "workshop": null, "email": "test@test.pl", "is_lecture": false }
        //when
        const status = shouldStatusChangeToACC_LEC(candidates)
        //then
        expect(status).toBe(false)
    })
})

describe("shouldStatusChangeToMV_LEC", () => {
    test("is supposed to return true when candidate decision is null, workshop is defined and lecture is chosen", () => {
        //given
        const candidates = { "decision": null, "workshop": 1, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToMV_LEC(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return true when candidate decision is 'ACC_WOR', workshop is defined and lecture is chosen", () => {
        //given
        const candidates = { "decision": "ACC_WOR", "workshop": 1, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToMV_LEC(candidates)
        //then
        expect(status).toBe(true)
    })


    test("is supposed to return false when candidate decision is 'ACC_WOR', workshop is defined and lecture is not chosen", () => {
        //given
        const candidates = { "decision": "ACC_WOR", "workshop": 1, "email": "test@test.pl", "is_lecture": false }
        //when
        const status = shouldStatusChangeToMV_LEC(candidates)
        //then
        expect(status).toBe(false)
    })

    test("is supposed to return true when candidate decision is 'REJ', workshop is defined and lecture is chosen", () => {
        //given
        const candidates = { "decision": "REJ", "workshop": 1, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToMV_LEC(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return false when candidate decision is 'ACC_WOR', workshop is null and lecture is chosen", () => {
        //given
        const candidates = { "decision": "ACC_WOR", "workshop": null, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToMV_LEC(candidates)
        //then
        expect(status).toBe(false)
    })

    test("is supposed to return false when candidate decision is 'ACC_LEC', workshop is defined and lecture is chosen", () => {
        //given
        const candidates = { "decision": "ACC_LEC", "workshop": 1, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToMV_LEC(candidates)
        //then
        expect(status).toBe(false)
    })
})

describe("shouldStatusChangeToREJ", () => {
    test("is supposed to return true when candidate decision is 'ACC_LEC', workshop is null and lecture is chosen", () => {
        //given
        const candidates = { "decision": "ACC_LEC", "workshop": null, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToREJ(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return false when candidate decision is 'ACC_LEC', workshop is defined and lecture is chosen", () => {
        //given
        const candidates = { "decision": "ACC_LEC", "workshop": 1, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToREJ(candidates)
        //then
        expect(status).toBe(false)
    })

    test("is supposed to return true when candidate decision is 'ACC_WOR', workshop is defined and lecture is chosen", () => {
        //given
        const candidates = { "decision": "ACC_WOR", "workshop": 1, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToREJ(candidates)
        //then
        expect(status).toBe(true)
    })


    test("is supposed to return false when candidate decision is 'ACC_WOR', workshop is null and lecture is chosen", () => {
        //given
        const candidates = { "decision": "ACC_WOR", "workshop": null, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToREJ(candidates)
        //then
        expect(status).toBe(false)
    })

    test("is supposed to return true when candidate decision is 'MV_LEC', workshop is defined and lecture is chosen", () => {
        //given
        const candidates = { "decision": "MV_LEC", "workshop": 1, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToREJ(candidates)
        //then
        expect(status).toBe(true)
    })

    test("is supposed to return false when candidate decision is 'MV_LEC', workshop is null and lecture is chosen", () => {
        //given
        const candidates = { "decision": "MV_LEC", "workshop": null, "email": "test@test.pl", "is_lecture": true }
        //when
        const status = shouldStatusChangeToREJ(candidates)
        //then
        expect(status).toBe(false)
    })

    test("is supposed to return true when candidate decision is null", () => {
        //given
        const candidates = { "decision": null, "email": "test@test.pl" }
        //when
        const status = shouldStatusChangeToREJ(candidates)
        //then
        expect(status).toBe(true)
    })
})

describe("maxWorkshopAttendantsCountExceeded", () =>{
    test("Should return false when number of attendants exceeds maximum number of attendants", () => {
        //given
        const maximumNumberOfAttendants = 3;
        const numberOfAttendants = 6;
        //when
        const result = maxWorkshopAttendantsCountExceeded(numberOfAttendants, maximumNumberOfAttendants)
        //then
        expect(result).toBe(true)
    })

    test("Should return true when number of attendants does not exceed maximum number of attendants", () => {
        //given
        const maximumNumberOfAttendants = 10;
        const numberOfAttendants = 6;
        //when
        const result = maxWorkshopAttendantsCountExceeded(numberOfAttendants, maximumNumberOfAttendants)
        //then
        expect(result).toBe(false)
    })
    
    test("Should return false when number of attendants is equal to maximum number of attendants", () => {
        //given
        const maximumNumberOfAttendants = 3;
        const numberOfAttendants = 3;
        //when
        const result = maxWorkshopAttendantsCountExceeded(numberOfAttendants, maximumNumberOfAttendants)
        //then
        expect(result).toBe(true)
    })
})


