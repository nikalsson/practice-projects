# HackerFest candidate processing app

The application is created for adding new candidates and selecting registered candidates various activities. The back-end is running on Node.js and front-end on React.

## Running the application
Back-end: *npm run demon* in candidates_api folder  
Front-end: *npm start* in candidates_app folder

## API requests

### POST - New candidate creation
/candidates -- Candidate is created via POST request to API. Send a JSON object that contains name, lastname, email, role, company, workshop, is_lecture, motivation

### GET - Candidate search with varying criteria
**Replace word with semicolon with search term**  
/candidates/lecture/:lecture -- Get candidates that have signed up for lecture or not, search options true or false

/candidates/workshop/:workshop -- Get candidates based on specific workshop #, search options 1-6

/candidates/workshop/:workshop/lecture/:lecture -- Get candidates using workshop and lecture

/candidates/workshop -- Get all candidates that have signed up for workshop

/candidates/lecture -- Get all candidates that have signed up for lecture

/candidates/positivedecision -- Get the count of all the candidates that have been accepted to lecture

/candidates/lists -- Download a an archive file that contains tables of users based on their workshop, lecture or rejection status

### PUT - Used for changing the status of candidate
**:email is used on all routes to find the specific candidate, email address is unique**  
/candidates/decision/mv_lec/:email -- Move a candidate, that has applied for a workshop, to just lecture

/candidates/decision/acc_wor/:email -- Accept the candidate to the workshop they applied to. The candidate is also accepted to the lecture.

/candidates/decision/acc_lec/:email -- Accept the candidate to the lecture. The candidate should not have applied for a workshop.

/candidates/decision/rej/:email -- Reject the candidate's application, whether it was to workshop or lecture. Rejected candidates can still be accepted to lecture or workshop later on.

## Specify names of workshops, front-end
candidates_app\src\AppConfig.js contains workshopFilterOptions, which has key-value pairs of the workshops and their names. The names of workshops can be updated here