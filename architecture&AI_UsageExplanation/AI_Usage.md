

## 1. Where I used AI

I used AI throughout the project as a support tool, especially when I needed to speed up development, validate ideas, and improve code quality. It was not used as a replacement for judgment or project understanding, but as a way to accelerate work and reduce repeated manual effort.

I used AI in several areas:

- Generating initial project code structure and frontend layout
- Writing reusable React component logic and page structure
- Helping design the Java Spring Boot backend architecture
- Suggesting API design patterns and data flow between frontend and backend
- Exploring possible database and architecture decisions
- Improving code readability, naming consistency, and implementation approach
- Reviewing technical decisions for scalability and maintainability
- Drafting architecture diagrams and documentation ideas

In simple terms, I used AI wherever I needed a good starting point, a second opinion, or a faster way to convert my requirement into working code.








## 2. How I used it

I used AI mainly in a guided way. I did not just ask it to write code blindly. Instead, I specified the exact requirement, the coding style, and the project structure I wanted.

sexample, I told it the project needed to be built like a real employee management system, with:

- a React frontend
- Java Spring Boot backend
- API-driven data flow
- login and authorization flow
- employee, leave, attendance, payroll, and reports modules
- clean and understandable code structure
- a practical production-oriented design

I also gave AI specific instructions such as:

- follow a clean project structure
- use Java for backend logic
- keep frontend and backend separate
- keep API response structure consistent
- avoid unnecessary features not required by this project
- focus on a simple but professional UI

This helped me get a useful starting draft instead of generic boilerplate code. I treated AI as a coding assistant, not as an independent decision-maker.

I also used AI to check whether the approach I was thinking about was actually the right one for this specific project. For example, I asked questions like:

- Is this the best approach for a small but professional employee management system?
- Should the frontend fetch data from a backend API or should mock data be used initially?
- Is a single backend service enough for this use case?
- Should the app use local session storage or a proper authentication flow?
- Would this architecture scale enough for a real AWS deployment?

This helped me compare my own ideas with a more structured technical viewpoint before I committed to implementation.










## 3. How I validated AI output

I did not accept AI output at face value. I validated it in multiple ways.

### a) By checking whether it matched the project requirement

I asked AI to explain whether the code it generated matched the actual business needs. For example, if it suggested a very complex architecture or extra features, I would question whether they were necessary for this project.

### b) By reading and testing the generated code

I reviewed the generated code carefully and checked:

- whether the logic was correct
- whether the API endpoints matched the frontend calls
- whether the frontend components rendered the expected data
- whether the app would compile without obvious bugs
- whether the design matched the required employee management modules



### c) By asking follow-up questions about the code

Instead of just trusting the code, I asked questions like:



- Why did you choose this API structure?
- Why this database approach?
- Is this code maintainable?
- Does this match the actual requirement or is it over-engineered?
- What are the limitations of this design?

This helped me understand whether the AI truly understood the requirement, not just produced a plausible answer.

### d) By validating through runtime behavior

I tested the application manually by logging in, checking pages, verifying API calls, and confirming the returned data. This was important because real app behavior matters more than whether the code "looks right".

For example, I validated

- login flow
- API responses from backend
- rendering of employee and leave pages
- data updates and dashboard values
- whether the app matched the user-facing requirement

This turned AI output into something practical and testable.












## 4. What changes I made to the AI-generated output



AI gave me a strong starting point, but I made several important changes to adapt it to the real project.

### a) Architecture level changes

AI suggested a standard architecture pattern, but I refined it to fit the actual use case. I changed or simplified things where needed based on the project size and business need.

Examples:

- I kept the project simple but production-oriented instead of adding unnecessary complexity
- I separated frontend and backend properly, instead of mixing logic in one place
- I used a practical API-driven structure rather than overcomplicating it with unnecessary services
- I defined clear responsibilities between frontend pages, backend controllers, and data layer logic

### b) Database level changes

AI often proposes database structures that are broad and scalable. I adjusted them to match the project requirement and avoid unnecessary tables or advanced design.

I focused on the core data this application actually needs, such as:

- employees
- departments
- attendance
- leave records
- payroll data
- user accounts and roles

I avoided adding features that were not required for this EMS project, because they would make the solution more complicated than necessary.

### c) Storage and data handling changes

AI-generated logic sometimes assumed a very advanced storage or state strategy. I simplified it based on the real requirement.

I changed the approach to something more suitable for this project, such as:

- using backend APIs as the source of truth instead of static mock data
- keeping the frontend logic focused on rendering and interaction
- using real response data from backend endpoints rather than overengineering state management
- making sure the system remains understandable and easy to maintain

### d) UI-level adjustments

AI suggested UI elements and design patterns that were sometimes too generic or too feature-heavy for this app. I removed or adjusted those suggestions to keep the UI professional but aligned with the actual EMS product.

I refined things like:

- page layout and hierarchy
- table structures and dashboard cards
- branding and naming consistency
- login flow and status messaging
- visibility of only the necessary modules

I also made sure the UI matched the requested business branding and naming, rather than blindly accepting AI suggestions.











## 5. Where I did not follow AI recommendations

There were several cases where I intentionally did not follow AI suggestions, and that was important.

### a) Extra features beyond the requirement

AI sometimes suggested additional modules or features that sounded useful, but were not necessary for this project. I rejected some of these because they would increase complexity without adding real value.

Examples:

- very advanced analytics dashboards beyond the actual need
- unnecessary integrations or services
- extra admin flows that were not requested
- microservice-style architecture when a simpler structure was enough
- too many UI widgets or over-styled components

I chose not to follow those recommendations because they went beyond the project scope and would increase maintenance effort.

### b) Over-engineered architecture suggestions

Some AI suggestions were technically valid, but not appropriate for the current use case. I avoided recommending or implementing architecture patterns that were too large or too complex for a moderate employee management system.

For example, I did not want to over-build the project with unnecessary layers, heavy abstraction, or large-scale infrastructure patterns before confirming the actual need.

### c) UI suggestions that looked good but were not practical

AI sometimes recommended design ideas that looked polished but were not aligned with the actual app workflow. I did not follow those when they made the interface less clear or too crowded.

I preferred:

- simple, readable layouts
- practical data tables
- clear navigation
- a user-friendly dashboard
- a minimal but professional visual language

### d) Suggestions that deviated from the actual client requirement

The project had specific requirements around the user identity, email domain, branding, and app behavior. Some AI suggestions did not align with those requirements exactly, so I corrected them manually.

For example, I changed:

- email domains to Gmail-based values where required
- user names and role structure
- branding text to match the requested naming
- backend credentials to match the actual requirement

This was a direct example of where human review was necessary.


