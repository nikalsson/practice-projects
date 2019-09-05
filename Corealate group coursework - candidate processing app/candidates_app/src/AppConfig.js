const APIAdress = 'http://localhost:5000/'

export const AppConfig = {
    fetchOptions: {
        put: {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        },
    },

    urls: {
        decision: APIAdress + 'candidates/decision/',
        positivedecision: APIAdress + 'candidates/positivedecision',
        lists: APIAdress + 'candidates/lists',
        candidates: {
            all: APIAdress + 'candidates/',
            lecture: APIAdress + 'candidates/lecture/',
            workshop: APIAdress + 'candidates/workshop/',
            post: APIAdress + 'candidates/'
        }
    },

    filterOptions: {
        workshopFilterOptions: [
            { value: "null", text: "-" },
            { value: 1, text: "1: Mega workshop", size: 16 },
            { value: 2, text: "2: OK workshop", size: 16 },
            { value: 3, text: "3: Interesting one", size: 16 },
            { value: 4, text: "4: Pro hacker", size: 16 },
            { value: 5, text: "5: Basic workshop", size: 16 },
            { value: 6, text: "6: DnD", size: 16 },
        ],
        lectureFilterOptions: [
            { value: "null", text: "-" },
            { value: "true", text: "Tak" },
            { value: "false", text: "Nie" }
        ]
    }
}