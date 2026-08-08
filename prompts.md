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

Now , Build  the landing page . Requirements:                                                          -Mobile first                                                                   -Hero section                                                              -value proposition                                                      -Recruiter trust section                                        -Track selector                                                                       -Testimonials                                                                       -statistics                                                                        -CTA                                                                        -Smooth animations                                                                 Follow the approved design system.Do not start Dashoard.

now the dashboard layout. Include :                              -Header                                                                        -Current streak                                                                      -Progress                                                                     -Today's challenge                                                                  -Achievement section                                                 -Active peers widget                                                  -Bottom navigation                                                               Do not implement edge cases yet

Now Extend the dashboard. Handle:                            -New student                                                           -Missed day                                                            -Empty profile                                                         -Locked achievements                                                        Allow switching between these states using mock data.

Now in challenge Day Build /day/12. Include:                                                                       -Challenge title                                                            -Description                                                                 -Objectives                                                                        -Difficulty                                                                       -Estimated duration                                                   -Resources                                                            -checklist                                                                      -Github submission                                                    -LinkedIn submisiion                                                  -Submit button                                                           Use reusable components

convert index.html into index.jsp also change its content syntax accordingly

Implement the mock submission workflow. Requiremnets:                                                          -Validate fields                                                            -Store submission in local state                                        -Update challenge status                                                    -Update streak                                                               -Trigger succes animation                                           No backend.

Build an interactive 60-day challenge grid. Requirements:                                                             -Completed                                                            -Current                                                                      -Upcoming                                                                      -Missed                                                                     Clicking a day should naviagte to: /day/{dayNumber}. for this use mock data

Implement the "Late Night Co-working Space" so that the existed user can see that 248 studens are live and what they have completed . Requirements:                                                                    -Floating peer activity widget                                  -Random realistic messages like abc have completed day 12 from aktu or aman from IMS completed today tasks etc.                                -Smooth animation                                                          -Non-intrusive design                                               Integrate naturally into Dashboard.I want this thing under 248 indian students are coding right now

Polish the ABTalks application with purposeful, lightweight micro-interactions and animations.

Goal:
Make the experience feel alive, motivating, and premium without distracting students or hurting performance on mobile devices.

Apply animations only where they improve feedback, hierarchy, or motivation.

Requirements:

1. Page Transitions
- Add subtle fade/slide transitions between /, /dashboard, and /day/12.
- Keep transitions short (approximately 150–300ms).
- Avoid heavy or continuous animations.

2. Card Entrance
- Animate important dashboard/task cards when they first appear.
- Use subtle opacity + translateY transitions.
- Avoid animating every element individually.

3. Button Feedback
- Add lightweight hover, focus, and active states.
- On mobile, prioritize tap feedback rather than hover effects.
- Include a subtle scale/opacity response when a button is pressed.
- Do not use excessive bouncing effects.

4. Progress Animation
- Animate progress bars and streak indicators when they enter the viewport.
- The animation should communicate progress rather than simply decorate the UI.
- Respect reduced-motion preferences.

5. Submission Success / Confetti
- When the student successfully submits both GitHub and LinkedIn proof on /day/12, show a short celebratory confetti effect.
- Display a clear success state such as:
  "Day 12 Complete!"
  "12-day streak maintained 🔥"
- Keep confetti lightweight and limited to approximately 1–2 seconds.
- Do not trigger confetti on page load or every interaction.

6. Landing Page Hero
- Add subtle entrance animation to the hero heading, supporting text, CTA, and key visual.
- Use staggered animation with short delays.
- Avoid large movement or distracting effects.

7. Accessibility
- Respect the user's prefers-reduced-motion setting.
- Disable or significantly reduce non-essential animations when reduced motion is enabled.
- Ensure animations never prevent interaction or readability.

8. Performance
- Optimize for a 390px mobile viewport.
- Prefer CSS transforms and opacity for animations.
- Avoid expensive layout-triggering animations.
- Do not add a heavy animation library unless it is already installed and necessary.
- Avoid continuous animations that consume CPU/battery.
- Keep animations smooth on low-end mobile devices.

9. Consistency
- Use the existing ABTalks Cosmic design tokens.
- Use consistent easing and duration values.
- Do not change the existing layout, content, routing, or functionality unnecessarily.

Before modifying the code:
1. Inspect the existing components and animation utilities.
2. Reuse existing styles/components where possible.
3. Implement the animations.
4. Verify that /, /dashboard, and /day/12 still work correctly.
5. Verify the application at 390px width.

As imagine that i have not registered on ABtalks so display only "/" page after i sign up or register on ABtalks show me "/dashboard" or "/day/12" page

Audit and optimize the complete ABTalks application for responsive behavior.

Primary goal:
The application must be designed mobile-first, with 390px as the most important viewport because the hackathon judges will capture screenshots at exactly 390px width.

Before making changes:
1. Inspect all existing pages and reusable components.
2. Identify current responsive breakpoints and layout rules.
3. Check for horizontal overflow, clipped content, overlapping elements, excessive spacing, unreadable text, and unusable controls.

Test these viewport widths:
- 390px — PRIMARY / JUDGE VIEW
- 430px — mobile
- 768px — tablet
- 1024px — desktop

Test all required routes:
- /
- /dashboard
- /day/12

For each route verify:
- No horizontal scrolling
- No content is clipped
- Text remains readable
- Buttons and inputs are fully visible and easy to tap
- Cards fit naturally within the viewport
- Navigation remains usable
- Images/icons do not overflow
- Progress indicators remain readable
- Modals/popups remain within the viewport
- Animations do not cause layout shifts
- Bottom navigation does not cover important content
- Safe spacing is maintained around mobile edges

Mobile-first requirements:
- Treat 390px as the design baseline.
- Do not simply shrink the desktop layout.
- Stack content vertically where appropriate.
- Use touch-friendly controls (minimum ~44px touch targets).
- Avoid fixed widths that can cause overflow.
- Use responsive typography and spacing.
- Keep the cosmic visual design intact.

At 768px and 1024px:
- Introduce wider layouts only where they improve usability.
- Convert appropriate sections from single-column to multi-column.
- Preserve visual hierarchy and consistency.
- Do not unnecessarily redesign the mobile experience.

Implementation rules:
- Fix only genuine responsive/layout issues.
- Reuse existing components and design tokens.
- Do not change the application's functionality, routes, mock data, or overall visual identity.
- Avoid unnecessary dependencies.
- Prefer CSS media queries, flexbox, grid, max-width, min-width, and responsive units.
- Avoid hardcoded viewport-specific hacks.

After fixing:
1. Re-test all three routes at all four viewport widths.
2. Check browser console for errors.
3. Check for horizontal overflow.
4. Verify interactive elements still work.
5. Verify the /day/12 submission flow still works.
6. Verify the Dashboard state variations still work.
7. Summarize the responsive issues found and the fixes made.

Final priority:
390px > 430px > 768px > 1024px.
