First of all make a file prompts.md in which you need to store every prompt i will give you just store the prompt only

Redesign ABTalks
Reimagine the platform you're standing on.

The Situation
ABTalks runs a 60-day coding challenge for Indian college students.

Students pick a track, build something every day, and maintain a public learning streak by submitting:

A GitHub commit
A LinkedIn post
This daily proof of work helps them build consistency and become visible to recruiters.

Most students use the platform on their phones, late at night after college.

The product works.

It has never been designed.

Ship at Minimum
Design and build the following three screens.

1. Landing Page (/)
The first experience for a student who has never heard of ABTalks.

Show enough trust, clarity, and motivation that they're willing to commit to a 60-day challenge.

2. Student Dashboard (/dashboard)
The home screen after logging in.

Include essentials such as:

Current streak
Today's task
Progress through the challenge
Overall completion
Student standing or achievements
3. Challenge Day (/day/12)
The complete experience of a single challenge day.

A student should be able to:

Read the day's task
Understand what needs to be built
Submit proof of work
GitHub repository/commit
LinkedIn post
Submission
Along with your repository and live deployment URL, include a Route Map.

Provide the three routes below, one per line, in this exact order:

/
/dashboard
/day/12
We'll open every submission at 390px width (mobile viewport) and automatically capture screenshots of these routes.

Providing the route map ensures we don't have to guess your URLs.

What We're Looking For
Your redesign should:

Be designed mobile-first (390px), with desktop as a secondary consideration.
Be understandable to a student who has never heard of ABTalks.
Handle real-world edge cases such as:
First day with no streak
A missed day
An empty profile
Introduce at least one thoughtful idea that improves the student experience.
Out of Scope
You do not need to build:

Authentication
Real user accounts
A production database
Use mocked data instead.

A simple JSON file (written by you or generated using AI) is sufficient as long as the interface feels realistic.

Also out of scope:

Recruiter dashboard
Admin panel
Matching ABTalks' current tech stack
Build using any framework or technology your AI workflow is most productive with.Analyze this hackathon problem statement and all requirements,constrainst,edge cases.Break it into milestones. Suggest a mobile-first UI architecture and compenent hierarchy . do not generate code yet

now the requirement to build the project :                     -keep Spring boot as the backend                                 -Create a separaye react+vite frontend inside the project

Now i want complete design system for this application requirements are listed below:           -Mobile-first 390px                                                -cosmic dark theme                                            -Typography                                                                                 -Spacing Scale                                                                    -Border Radius                                                            -Shadows                                                                       -Glassmorphism utilities                                                     -glow effects                                                             -button varients                                                         -card varients                                                            -Animation Variables                                                     Donot build any page. Only create reusable design tokens and global CSS

now create a controller class which will print hello world through getmapping

now implement appliaction routing through apis create exactly these routes:                                  /                                                                                    /dashboard                                                                                    /day/12

Continue

dont call / /dasboard /day/12 api inside one geeting request make diffent for each as we have different functionality

Now Generate realistic mock data for the application. Create:                                                       -60 challenge days                                                    -3 student profiles                                                                    -           New student                                                           -            Active streak student                                        -            Missed streak student                                   - Achivements                                                          -Recruiter statistics                                                 -Testimonials                                                              -Tracks                                                                       -Github submissions                                                  -LinkedIn submissions                                                 Use clean JSON only.                                                     do not genertae UI
