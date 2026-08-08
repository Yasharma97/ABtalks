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

REDESIGN ONLY: Landing Page (/)

Context:
ABTalks is a 60-day coding challenge for Indian college students. Students build something every day and submit GitHub + LinkedIn proof of work to maintain a public learning streak.

The current landing page is functional and visually polished, but at 390px it feels crowded and resembles a generic SaaS/hackathon landing page.

OBJECTIVE:
Create a distinctive, premium mobile-first landing page that makes ABTalks feel like a "60-night coding journey" rather than a generic coding platform.

CORE BRAND IDEA:

"60 NIGHTS.
60 PROOFS.
ONE VISIBLE TRANSFORMATION."

The page should communicate:
Build → Prove → Show → Become recruiter-visible.

IMPORTANT:
Do not simply add more cards, gradients, animations, or decorative elements.
The redesign must come primarily from better hierarchy, spacing, typography, storytelling, and composition.


1. BEFORE CODING
Inspect the existing Landing Page, components, CSS/design tokens, mock data, routing, and reusable components.

Reuse existing components and data where appropriate.

Do not modify:
- /dashboard
- /day/12
- Backend
- Existing routing

Only modify the Landing Page and landing-page-specific styles/components.

2. MOBILE-FIRST PRIORITY

Design for exactly 390px first.

Priority:
390px > 430px > 768px > 1024px

At 390px:
- Single-column layout
- 16–20px horizontal padding
- No horizontal scrolling
- No squeezed 3-column layouts
- Minimum ~44px touch targets
- Generous vertical spacing
- Short readable text
- Strong visual hierarchy
- Primary CTA visible without excessive scrolling

Do NOT design desktop first and then shrink it.

3. NEW PAGE STORY

Structure the landing page in this order:

01 — HERO
02 — THE 60-NIGHT JOURNEY
03 — BUILD → PROVE → SHOW
04 — CHOOSE YOUR TRACK
05 — YOUR WORK BECOMES VISIBLE
06 — LATE-NIGHT COMMUNITY
07 — ONE STUDENT STORY
08 — FINAL CTA

Every section must have one clear purpose.

4. HERO

Replace the existing generic SaaS hero.

Primary headline:

"60 NIGHTS.
60 PROOFS.
ONE VISIBLE TRANSFORMATION."

Supporting copy:

"Build something every day. Prove it with GitHub + LinkedIn. Turn consistency into recruiter-visible proof."

Primary CTA:
"Start Day 1 →"

Secondary CTA:
"Explore the Journey"

Add a minimal visual representing the 60-day journey.

Use:
- 60 small nodes/dots OR
- a thin glowing journey line
- milestone markers for Day 1, 15, 30, 45, 60

Do not create a complex chart.

The first viewport must immediately answer:
"What is ABTalks?"
"Why should I join?"

5. 60-NIGHT JOURNEY

Make this the visual centerpiece.

Show a vertical timeline on mobile:

DAY 01
Start

↓

DAY 15
Consistency

↓

DAY 30
Momentum

↓

DAY 45
Visibility

↓

DAY 60
Recruiter Ready

Use typography, a connecting line, and subtle neon milestone indicators.

Do not use five large cards.

6. BUILD → PROVE → SHOW

Replace the current three large cards with a compact connected sequence:

01 BUILD
Complete today's task.

02 PROVE
Submit your GitHub commit.

03 SHOW
Share your progress on LinkedIn.

Then:

"60 nights later → a visible body of work."

Use a timeline/process layout rather than separate large cards.

7. TRACK SELECTION

Keep the existing tracks but simplify them.

Show:

Frontend
Backend
DevOps

Use a stacked list/selector on mobile.

Each item should contain:
- Track name
- Short description
- Difficulty
- Arrow/CTA

Avoid large glass cards and excessive borders.

8. TRUST / OUTCOME

Create a simple section:

"YOUR WORK BECOMES VISIBLE."

Show only 2–3 meaningful metrics.

Prefer:
60
Days

60+
Proofs of Work

1
Public Learning Streak

Use only statistics already available in mockData.json.

Do not invent real-world claims or imply that fictional recruiter statistics are real.

9. LATE-NIGHT IDENTITY

Connect the landing page to ABTalks' late-night student experience.

Headline:

"While the campus sleeps,
your streak is still moving."

Show a subtle peer activity indicator:

"🌙 248 students coding tonight"

"Someone just completed Day 11."

Use the existing mock data where possible.

This should feel like ambient community presence, not another dashboard card.

10. SOCIAL PROOF

Use ONE strong student testimonial instead of multiple cards.

Example structure:

"I stopped saying I was learning development.
After 60 days, I had proof."

— Student Name
Backend Track

Keep it visually simple and credible.

11. FINAL CTA

End with:

"Your first proof starts tonight."

"Day 1 is waiting."

[ Start the 60-Day Challenge → ]

Make this a focused CTA, not another large dashboard-style card.

12. VISUAL DIRECTION

Keep the existing Cosmic Dark identity but make it more refined.

Use:
- Deep obsidian background
- Subtle cyan/violet accents
- Strong typography
- Thin journey lines
- Minimal glow
- Generous whitespace
- Small visual details

Reduce:
- Glassmorphism
- Card borders
- Neon glow
- Drop shadows
- Decorative gradients
- Repeated containers

IMPORTANT:
Not every section should look like a card.

Use typography, whitespace, lines, and composition as the primary design tools.

The result should feel like:

"Premium night-mode product + personal coding journey"

NOT:

"Generic AI SaaS landing page."

13. ANIMATION

Use only meaningful animations:

- Hero text entrance
- Journey line reveal
- Milestone illumination
- CTA press feedback
- Subtle peer activity fade-in

Avoid:
- Continuous floating animations
- Excessive particle effects
- Animating every card
- Large movements

Respect prefers-reduced-motion.

14. CONTENT RULES

Keep copy concise.

Avoid long paragraphs.

Use:
- Large headlines
- Short descriptions
- Small uppercase labels
- Clear CTAs

15. RESPONSIVE VALIDATION

After implementation, test:

390px — PRIMARY JUDGING VIEW
430px — MOBILE
768px — TABLET
1024px — DESKTOP

For each viewport verify:
- No horizontal overflow
- No clipped content
- No overlapping elements
- No broken typography
- No inaccessible buttons
- No excessive empty space
- No excessive content density
- Navigation remains usable

16. FUNCTIONAL VALIDATION

Verify:
- "/" loads correctly
- Start Day 1 CTA navigates correctly
- Dashboard navigation still works
- Existing mock data is preserved
- No console errors
- Existing routes are unaffected

17. FINAL SELF-REVIEW

After implementation, compare the new Landing Page with the previous version.

Report:
1. What was removed?
2. What was simplified?
3. What makes the new design distinctive?
4. How does it address the 390px congestion?
5. Which hackathon requirements are satisfied?

Do not redesign again after the review unless an actual issue is found.

make 02 milestone horizontal instead of verticle

DESIGN FEATURE: ABTalks "Aurora Constellation" Background System

Create a premium, subtle Aurora + Constellation background system for ABTalks.

CORE CONCEPT:

ABTalks is a 60-day coding challenge for college students who often build late at night.

The visual metaphor is:

AURORA = the late-night atmosphere
CONSTELLATION = the student's 60-day coding journey

The background should communicate:

"Everyone else is asleep.
I'm still building."

and

"Every completed day becomes another point in my journey."

IMPORTANT:
This is an atmospheric background system, not the main UI.

Do NOT create a generic space website, particle wallpaper, or overly futuristic interface.

1. BASE ATMOSPHERE

Use the existing ABTalks Cosmic Dark design system.

Base background:
#08080C

Create a very subtle night atmosphere using:

- Deep navy
- Electric cyan #00F2FE
- Neon violet #7F00FF
- Very subtle blue

Use large, soft radial gradients.

No hard gradient edges.
No bright neon blobs.
No excessive saturation.

2. AURORA

Create 2–3 large, blurred aurora layers.

The aurora should feel like soft Northern Lights appearing behind the interface.

Use:
- CSS radial/conic gradients
- pseudo-elements
- blur
- opacity

Suggested composition:

Top/hero:
subtle cyan atmospheric glow

Center:
very subtle cyan → violet transition

Lower page:
deep violet/blue atmospheric fade

The strongest glow should be around the hero/journey area.

Keep the area directly behind important text darker so readability remains excellent.

3. AURORA ANIMATION

Animate the aurora extremely slowly.

Use:
- slow opacity changes
- very slow transform movement
- subtle morphing

Target animation duration:
15–30 seconds.

The movement should be almost imperceptible.

DO NOT:
- rapidly pulse
- flash
- continuously change colors
- create moving waves across the screen
- use JavaScript animation loops

Prefer CSS transform and opacity for performance.

4. CONSTELLATION

Add a lightweight constellation system on top of the aurora.

Use approximately:
20–30 small points.

Do NOT create hundreds of stars.

Each point should be:
- tiny
- low opacity
- slightly varied in size
- mostly white/cyan
- occasionally violet

Connect only selected nearby points with extremely thin, low-opacity lines.

The constellation should feel organic and slightly irregular.

Do NOT make it look like:
- a graph
- a circuit board
- a neural network
- a geometric polygon

It should resemble a subtle night-sky constellation.

5. 60-DAY JOURNEY CONNECTION

Use the constellation as a metaphor for the 60-day journey.

Do NOT display all 60 days as labels.

Create approximately 5 brighter milestone nodes:

DAY 01
Start

DAY 15
Consistency

DAY 30
Momentum

DAY 45
Visibility

DAY 60
Recruiter Ready

The remaining points represent smaller daily steps.

Milestone nodes should have a slightly stronger glow.

6. LANDING PAGE HERO

The Aurora + Constellation should support the hero:

60 NIGHTS.
60 PROOFS.
ONE VISIBLE TRANSFORMATION.

Supporting text:

"Build something every day. Prove it with GitHub + LinkedIn. Turn consistency into recruiter-visible proof."

Primary CTA:
"Start Day 1 →"

Secondary CTA:
"Explore the Journey"

The constellation should subtly lead toward the hero rather than compete with it.

Keep the area immediately behind the headline relatively quiet.

7. JOURNEY VISUAL

If the Landing Page contains the 60-day journey timeline:

Connect it visually with the constellation.

For example:

DAY 01  ✦──────────✦──────────✦  DAY 15
              \
               ✦
                \
                 ✦ DAY 30

Do not create a complex visualization.

The user should understand:
"These points represent progress."

8. DASHBOARD CONNECTION

Reuse the same visual language on /dashboard.

The student's current progress should subtly affect the constellation.

Example:
If the student is on Day 12:

- First 12 points are slightly brighter
- Current Day 12 point has a subtle glow
- Future points remain dim
- Day 15 milestone is visible ahead

Do not create a large visualization.

Keep the dashboard focused on streak, task, progress, and achievements.

9. CHALLENGE DAY CONNECTION

On /day/12:

Keep the Aurora very subtle.

Highlight the current Day 12 constellation point.

Example:

DAY 12 / 60
───────✦────────────────────────

The background should reinforce the current journey position without distracting from:
- Task
- Instructions
- GitHub submission
- LinkedIn submission
- Submit button

10. VISUAL HIERARCHY

Strict priority:

1. Content
2. CTA / interactive controls
3. Journey milestones
4. Constellation
5. Aurora atmosphere

The background must NEVER compete with the interface.

If necessary, reduce opacity.

11. MOBILE-FIRST

390px is the primary viewport.

Optimize specifically for:

390px
430px
768px
1024px

At 390px:
- Keep constellation density low
- Keep aurora subtle
- Ensure text has strong contrast
- Prevent horizontal overflow
- Do not allow constellation lines to interfere with text
- Maintain comfortable page spacing

Do not simply scale the desktop effect down.

12. PERFORMANCE

This must be lightweight and mobile-friendly.

Prefer:
- CSS gradients
- CSS pseudo-elements
- SVG for constellation if appropriate
- transform
- opacity

Avoid:
- Canvas unless genuinely necessary
- WebGL
- Heavy particle libraries
- Large animation libraries
- Hundreds of DOM elements
- Continuous JavaScript animation loops

The effect should have minimal CPU and battery impact.

13. ACCESSIBILITY

Respect:

prefers-reduced-motion

When reduced motion is enabled:

- Disable aurora animation
- Disable constellation animation
- Keep a static constellation
- Preserve readability

The entire system is decorative and must not contain essential information.

14. RESPONSIVE DENSITY

Use different visual density depending on viewport.

390px:
Low density

430px:
Low-medium density

768px:
Medium density

1024px:
Medium density

Never increase the effect simply because more screen space is available.

The UI must remain the focus.

15. COLOR DISCIPLINE

Use cyan and violet as accents, not as dominant background colors.

Approximate visual balance:

80–90%:
Obsidian / dark navy

5–10%:
Atmospheric cyan/violet

Very small amount:
Bright constellation highlights

Avoid making the entire page cyan or purple.

16. ANIMATION DISCIPLINE

Only a small number of constellation points should animate.

Allowed:
- very subtle twinkle
- slow milestone glow
- slow constellation reveal on initial load
- very slow aurora movement

Not allowed:
- shooting stars
- flying particles
- rapid blinking
- bouncing nodes
- constantly moving constellation lines

The user should notice the atmosphere, not the animation.

17. IMPLEMENTATION CONSTRAINTS

Before modifying the code:

1. Inspect the existing design system.
2. Inspect existing Landing Page, Dashboard, and Challenge Day components.
3. Reuse existing CSS variables and components where possible.

Do not:
- change routes
- change application functionality
- change mock data structure
- remove existing features
- add unnecessary dependencies
- redesign the page structure unnecessarily

Only introduce the Aurora + Constellation visual system and the minimum integration required.

18. FINAL VALIDATION

After implementation:

Test:
/
/dashboard
/day/12

At:
390px
430px
768px
1024px

Verify:
- No horizontal overflow
- No text readability issues
- No visual obstruction
- No excessive animation
- No console errors
- Existing interactions still work
- Dashboard and Challenge Day remain usable
- Submission flow still works

Also verify prefers-reduced-motion.

proceed

IMPORTANT BUG FIX: Separate User Identity from Dashboard Edge-Case State

There is a data-model problem in the current dashboard implementation.

CURRENT BEHAVIOR:

When I sign in as a new user named "Rohit", the Dashboard state switcher shows different users:

- Newbie → "Anonymous Explorer"
- Steady → "Aarav Sharma, DTU" with an 18-day streak
- Missed Day → "Priyanka Patel" with an 11-day streak that becomes 0 after a missed day

This is incorrect for the signed-in user experience.

The three states were originally created to demonstrate edge cases, but they must NOT represent three different users.

CORE REQUIREMENT:

Separate:

USER IDENTITY

from

CHALLENGE / PROGRESS STATE.

The signed-in user must remain the same person across every dashboard state.

Example:

Signed-in user:
Rohit

State 1:
Rohit
New user
0-day streak
Day 1
No completed challenges

State 2:
Rohit
Steady
18-day streak
18 completed days
Relevant achievements unlocked

State 3:
Rohit
Missed Day
Previous streak: 11 days
Missed day: Day 12
Current streak: 0
Previous progress must remain visible

Do NOT change the user's:
- Name
- Avatar
- Email
- College
- Track
- Profile identity

when switching between edge-case states.


DATA MODEL

Refactor the mock data so that there is ONE currently signed-in user.

For example:

currentUser:
{
  "id": "user-001",
  "name": "Rohit Sharma",
  "college": "...",
  "track": "Backend",
  ...
}

Then keep challenge states separately:

challengeStates:
{
  "newUser": {...},
  "steady": {...},
  "missedDay": {...}
}

The state object should contain ONLY state-dependent information such as:

- streak
- currentDay
- completedDays
- missedDays
- achievements
- submission status
- progress

Do not duplicate user identity inside each state.


STATE SWITCHER


Keep the existing state switcher because it is useful for testing hackathon edge cases.

However, rename/reframe it as:

"Preview State"

Options:

○ New User
○ Active Streak
○ Missed Day

The switcher changes the challenge state of the CURRENT USER.

It must NOT change the current user.

Example:

Preview State: Active Streak

Rohit Sharma
🔥 18 day streak

Then:

Preview State: Missed Day

Rohit Sharma
⚠️ Missed Day
Current streak: 0

Then:

Preview State: New User

Rohit Sharma
🌱 Start your journey
Current streak: 0


STREAK LOGIC

Fix the streak model.

Do not simply replace the user's entire profile when changing states.

For the Missed Day state:

Example:

Previous streak:
11 days

Missed:
Day 12

Current streak:
0

The UI should make the distinction clear:

"Previous streak: 11 days"

"Current streak: 0 days"

Do not display the old 11-day streak as if it is still active.

If the application supports a Streak Rescue feature, show the rescue option separately.

SIGN-UP FLOW


When a user enters their name during the mock sign-up flow:

Example:

Rohit Sharma

store that as the current user.

All Dashboard states must use this same user.

Do not fall back to:
- Anonymous Explorer
- Aarav Sharma
- Priyanka Patel

unless those names are explicitly selected as a demo user.


EDGE CASE TESTING


Test the following:

1. New user signs up as Rohit.

Expected:
Rohit appears everywhere.

2. Switch to Active Streak.

Expected:
Rohit remains the user.
Only challenge/progress state changes.

3. Switch to Missed Day.

Expected:
Rohit remains the user.
Only challenge/progress state changes.

4. Switch back to New User.

Expected:
Rohit remains the user.

5. Refresh the page.

Expected:
The current mock user remains Rohit if the application currently persists mock state.


IMPORTANT


Do NOT remove edge-case testing.

Do NOT remove:
- New User state
- Active Streak state
- Missed Day state

Instead, make them different states of the SAME signed-in user.

Do NOT modify:
- Landing Page
- Challenge Day route
- Existing visual design
- Routing

Only fix the identity/state data model and any Dashboard logic necessary to support it.

After implementation, explain:

1. Why the different names appeared previously.
2. How user identity is now separated from challenge state.
3. How streak values are calculated/displayed.
4. Which files were changed.

proceed

CRITICAL DATA CONSISTENCY FIX:
MAKE USER PROGRESS A SINGLE SOURCE OF TRUTH

There is currently a contradiction in the Dashboard.

Example:

A new user named Rohit signs up.

New User state:
- Streak = 0

But when switching to Active Streak:
- Streak = 18

And Missed Day:
- Streak = 0
- Calendar shows 11 completed days + 1 missed day

This is mixing pre-populated demo/edge-case data with the actual signed-in user's progress.

FIX THE DATA MODEL.


1. REAL USER STATE

When Rohit signs up, initialize ONE real progress object:

{
  "currentDay": 1,
  "completedDays": [],
  "missedDays": [],
  "currentStreak": 0,
  "longestStreak": 0,
  "totalSubmissions": 0
}

This must be the source of truth for Rohit's actual account.

A newly registered user must ALWAYS start with:

0 completed days
0 current streak
0 missed days
0 submissions
empty progress calendar


2. SINGLE SOURCE OF TRUTH


Do NOT hardcode separate values for:

- streak widget
- progress calendar
- completion percentage
- current day
- missed days
- achievements

All Dashboard values must be derived from the same progress state.

For example:

completedDays = [1,2,3]

must automatically produce:

current progress = 3 days
calendar = Days 1,2,3 completed
completion = 3/60
streak = 3

Do not maintain independent conflicting values.


3. STREAK LOGIC


Implement logically consistent streak behavior.

Example:

New user:

completedDays = []
missedDays = []
currentStreak = 0

After completing Day 1:

completedDays = [1]
currentStreak = 1

After completing Day 2:

completedDays = [1,2]
currentStreak = 2

If Day 3 is missed:

completedDays = [1,2]
missedDays = [3]
currentStreak = 0

The calendar must reflect exactly the same information.


4. IMPORTANT: DEMO EDGE CASES


The hackathon requires handling:

- New user
- Active/steady user
- Missed day
- Empty profile

Keep these edge cases for testing.

BUT THEY MUST NOT BE CONFUSED WITH ROHIT'S REAL DATA.

Create a clearly separated:

"Preview State" / "Demo State"

with:

Real User
New User Demo
Active Streak Demo
Missed Day Demo

When "Real User" is selected:
Use Rohit's actual progress.

When a demo state is selected:
Use isolated demo progress data.

Do NOT overwrite Rohit's actual progress.


5. DEMO DATA


Demo states may contain:

Active Streak Demo:
completedDays = [1..18]
currentStreak = 18

Missed Day Demo:
completedDays = [1..11]
missedDays = [12]
currentStreak = 0

New User Demo:
completedDays = []
missedDays = []
currentStreak = 0

These are VALID as demo scenarios.

But they must NOT be treated as Rohit's actual account history.


6. CALENDAR CONSISTENCY

The calendar must always derive its status from:

completedDays
missedDays
currentDay

For example:

Active Demo:

Day 1 ✓
Day 2 ✓
...
Day 18 ✓

Missed Demo:

Day 1 ✓
...
Day 11 ✓
Day 12 ✕

New User:

Day 1 ○
Day 2 ○
...
Day 60 ○

Never allow the streak widget and calendar to display contradictory information.


7. STREAK CALCULATION


Do not simply store arbitrary values such as:

"streak": 18

while the calendar contains only 11 completed days.

Calculate current streak from the user's consecutive completed days.

The only exception should be an explicitly documented demo state.


8. SIGN-UP BEHAVIOR


When Rohit signs up:

Create:

currentUser = Rohit

actualProgress = empty/new-user progress

Do NOT copy:

Aarav's progress
Priyanka's progress
or any other demo profile

into Rohit's account.


9. UI LABELING


If the state switcher is retained for hackathon testing, make its purpose obvious.

Label it:

"Edge Case Preview"

or:

"Demo State"

Do not make it look like the user is changing their actual account.

Example:

Edge Case Preview:
[Real User] [New] [Active] [Missed]


10. REFRESH / PERSISTENCE


If the application uses localStorage for mock authentication/state:

Persist:

currentUser
actualProgress

Do not persist demo state over the real user's state.

On refresh, Rohit should still have the same actual progress.


11. VALIDATION TESTS


Test this exact sequence:

TEST 1:
Sign up as Rohit.

Expected:
Name = Rohit
Streak = 0
Completed = 0
Missed = 0
Calendar = empty

TEST 2:
Complete Day 1.

Expected:
Streak = 1
Completed = 1
Calendar Day 1 = ✓

TEST 3:
Complete Day 2.

Expected:
Streak = 2
Completed = 2
Calendar Day 1 = ✓
Calendar Day 2 = ✓

TEST 4:
Simulate missed Day 3.

Expected:
Streak = 0
Completed = 2
Missed = 1
Calendar:
Day 1 = ✓
Day 2 = ✓
Day 3 = ✕

TEST 5:
Open Active Streak Demo.

Expected:
Demo shows 18-day streak.

But Rohit's actual progress must remain unchanged.

TEST 6:
Return to Real User.

Expected:
Rohit's actual progress returns exactly as before.


IMPORTANT


Do NOT fix this by simply changing:

"Aarav Sharma" → "Rohit"
"Priyanka Patel" → "Rohit"

That would still leave inconsistent progress data.

The real fix is to separate:

USER IDENTITY
from
ACTUAL USER PROGRESS
from
DEMO EDGE-CASE STATES.

Use one source of truth for actual progress and derive the dashboard/calendar/streak from it.

After implementation, explain which files were changed and how the data flow now works.

Continue

CRITICAL DATA ARCHITECTURE FIX — ABTALKS MOCK USER + EDGE CASES

Context:
ABTalks is a 60-day coding challenge for college students.

The hackathon explicitly says:
- Authentication is out of scope.
- Real user accounts are out of scope.
- Production database is out of scope.
- Mock data is allowed.
- The application must still feel realistic.
- The application must handle real-world edge cases such as:
  1. First day with no streak
  2. Missed day
  3. Empty profile

The current implementation incorrectly mixes user identity with edge-case demo data.

CURRENT PROBLEM:

When a user signs up as "Rohit Sharma":
- New User shows Anonymous Explorer
- Active Streak shows Aarav Sharma with 18 days
- Missed Day shows Priyanka Patel
- Calendar and streak values can contradict each other

This is NOT the desired behavior.

CORE RULE

SEPARATE:

1. USER IDENTITY
2. ACTUAL USER PROGRESS
3. EDGE-CASE DEMO/TEST STATES

User identity must NEVER change when the challenge state changes.

If the signed-in user is Rohit Sharma, every state must still identify the user as Rohit Sharma.

Do NOT use Aarav, Priyanka, or Anonymous Explorer as alternate users.


1. CURRENT MOCK USER


Create one current mock user.

Example:

currentUser:

{
  "id": "user-001",
  "name": "Rohit Sharma",
  "email": "rohit@example.com",
  "college": "ABES Engineering College",
  "track": "Backend",
  "avatar": null
}

If the existing signup flow allows the user to enter their name, use that entered name instead of hardcoding Rohit.

The current user identity must be stored separately from progress.


2. ACTUAL USER PROGRESS


Create a separate actualProgress object.

For a newly signed-up user:

{
  "currentDay": 1,
  "completedDays": [],
  "missedDays": [],
  "currentStreak": 0,
  "longestStreak": 0,
  "totalSubmissions": 0
}

Therefore, immediately after signup:

User:
Rohit Sharma

Streak:
0

Completed:
0/60

Missed:
0

Calendar:
All days uncompleted.

DO NOT initialize a new user with 11 or 18 completed days.


3. SINGLE SOURCE OF TRUTH


The Dashboard must derive its information from the same progress state.

Do NOT independently hardcode:

- streak
- completion percentage
- completed days
- missed days
- current day
- calendar status

The following UI must all use the same progress data:

- Streak widget
- 60-day calendar
- Overall completion
- Current day
- Achievements
- Today's task
- Submission status

Example:

If:

completedDays = [1,2,3]

then the UI must automatically show:

Completed = 3/60
Current streak = 3
Day 1 = completed
Day 2 = completed
Day 3 = completed
Day 4 = upcoming


4. STREAK LOGIC


Implement logically consistent streak behavior.

New user:

completedDays = []
missedDays = []
currentStreak = 0

After Day 1 submission:

completedDays = [1]
currentStreak = 1

After Day 2 submission:

completedDays = [1,2]
currentStreak = 2

If Day 3 is missed:

completedDays = [1,2]
missedDays = [3]
currentStreak = 0

The UI should clearly distinguish:

Previous streak:
2 days

Current streak:
0 days

Do not display the previous streak as the current active streak.


5. EDGE CASE PREVIEW


KEEP edge-case testing because it is useful for the hackathon.

Create an optional "Edge Case Preview" control.

The preview must simulate different PROGRESS STATES for the SAME USER.

Options:

REAL USER
NEW USER
ACTIVE STREAK
MISSED DAY

Do not present these as different users.

Recommended UI label:

"Edge Case Preview"

or

"Demo State"

Make it clear that these are testing scenarios.


6. EDGE CASE DATA

New User Demo:

{
  "completedDays": [],
  "missedDays": [],
  "currentStreak": 0,
  "currentDay": 1
}

Active Streak Demo:

{
  "completedDays": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
  "missedDays": [],
  "currentStreak": 18,
  "currentDay": 19
}

Missed Day Demo:

{
  "completedDays": [1,2,3,4,5,6,7,8,9,10,11],
  "missedDays": [12],
  "currentStreak": 0,
  "currentDay": 13
}

IMPORTANT:

These are DEMO progress states.

They are NOT Rohit's actual history.


7. DEMO STATE MUST NOT DESTROY REAL STATE


Example:

Rohit's actual progress:

completedDays = [1,2]
currentStreak = 2

Switch to:

Edge Case Preview → Active Streak

UI temporarily displays:

18-day streak
18 completed days

Then switch back:

Edge Case Preview → Real User

UI must return to:

2-day streak
2 completed days

Do NOT overwrite actualProgress with demo data.

8. CALENDAR CONSISTENCY


The calendar must always be generated from:

completedDays
missedDays

Examples:

NEW USER:

Day 1 ○
Day 2 ○
Day 3 ○
...
Day 60 ○

ACTIVE STREAK:

Day 1 ✓
Day 2 ✓
...
Day 18 ✓
Day 19 ○

MISSED DAY:

Day 1 ✓
...
Day 11 ✓
Day 12 ✕
Day 13 ○

Never allow:

Streak = 18
while calendar shows only 11 completed days.

Never allow:

Current streak = 0
while the UI claims there is an active 11-day streak.

--------------------------------------------------
9. SIGNUP BEHAVIOR
--------------------------------------------------

When a new student signs up:

1. Create currentUser.
2. Create empty actualProgress.
3. Set currentDay = 1.
4. Set currentStreak = 0.
5. Set completedDays = [].
6. Set missedDays = [].
7. Show Dashboard using actualProgress.

Do NOT load another student's demo progress.


10. EXISTING USER BEHAVIOR


Because real authentication/database is out of scope, use localStorage or the existing mock-state mechanism.

On reload:

Load:
currentUser
actualProgress

If Rohit previously completed Day 1:

The next visit should still show:

Rohit
1 completed day
1-day streak
Day 2 as current/upcoming

Do not reset the user unexpectedly.


11. SUBMISSION FLOW


When the user submits GitHub + LinkedIn proof for today's task:

Update actualProgress.

Example:

Before:

completedDays = []
currentStreak = 0

After valid Day 1 submission:

completedDays = [1]
currentStreak = 1
totalSubmissions = 1

Update the dashboard and calendar automatically.

Do not hardcode the new streak value in the UI.

12. EMPTY PROFILE EDGE CASE


If the profile has no avatar, achievements, or optional information:

Do not invent another student.

Continue showing the current user's identity.

Use appropriate empty states such as:

"Complete your first challenge to unlock achievements."

13. REMOVE OLD BEHAVIOR

Remove or refactor any logic that causes:

Anonymous Explorer
Aarav Sharma
Priyanka Patel

to appear as different users when switching edge-case states.

Do not merely rename them to Rohit.

The underlying data architecture must be corrected.

Separate:

currentUser

from:

actualProgress

and:

edgeCasePreviewData

14. DASHBOARD DISPLAY

For the real user:

Show:

Rohit Sharma
Current actual streak
Actual completion
Actual calendar
Actual achievements
Actual today's task

For demo states:

Show the SAME user:

Rohit Sharma

but with simulated progress.

If useful, show a small development-only indicator:

"Preview: Active Streak"

Do not make demo state look like a real account switch.


15. ACCEPTANCE TESTS


TEST 1 — NEW SIGNUP

Sign up as Rohit.

Expected:

Rohit Sharma
0-day streak
0/60 completed
0 missed
Empty calendar

PASS only if all values agree.



TEST 2 — COMPLETE DAY 1

Submit GitHub + LinkedIn proof.

Expected:

Rohit Sharma
1-day streak
1/60 completed
Day 1 = ✓
Day 2 = current/upcoming


TEST 3 — ACTIVE DEMO

Select:

Edge Case Preview → Active Streak

Expected:

Rohit Sharma
18-day streak
Days 1–18 = ✓
Day 19 = upcoming

This must NOT modify Rohit's actual progress.


TEST 4 — MISSED DAY DEMO

Select:

Edge Case Preview → Missed Day

Expected:

Rohit Sharma
Current streak = 0
Previous streak = 11
Days 1–11 = ✓
Day 12 = ✕
Day 13 = upcoming



TEST 5 — RETURN TO REAL USER

Select:

Edge Case Preview → Real User

Expected:

Rohit's original actual progress is restored.

Demo data must not overwrite it.

16. IMPORTANT IMPLEMENTATION RULE


Do NOT solve this problem by changing:

"Aarav Sharma" → "Rohit"
"Priyanka Patel" → "Rohit"

That only hides the problem.

The actual architecture must be:

currentUser
      ↓
actualProgress
      ↓
Dashboard

and separately:

edgeCasePreview
      ↓
temporary simulated progress
      ↓
Dashboard

User identity remains constant.


17. FINAL REVIEW


After implementation:

- Inspect the mock data structure.
- Inspect signup flow.
- Inspect Dashboard state management.
- Inspect streak calculation.
- Inspect calendar generation.
- Inspect localStorage/mock persistence.
- Test all three edge cases.

Report:

1. What caused the previous inconsistency?
2. How user identity is separated from progress?
3. How actual progress is separated from demo states?
4. How streak and calendar now stay synchronized?
5. Which files were modified?

Do not modify / or /day/12 unless absolutely required for this data-flow fix.

analyze the output according to my problem statement and give me what is needs to be improve and what i need to change completely

Fix the dashboard's student-state architecture before making any visual changes.

IMPORTANT:
The currently logged-in/mock user must remain the SAME user across every dashboard state.

Example:
If the user signs up as "Rohit Sharma", every state must continue displaying:
- Rohit Sharma
- the same college
- the same selected track
- the same profile identity

Do NOT replace the user with Aarav, Priyanka, Rahul, or any other mock student when switching states.

The Edge Case Preview is ONLY a state simulator for the SAME user.

Implement these states:

1. REAL USER
Use the actual signed-in/mock account data.

2. NEW
Simulate the same user's first day:
- streak = 0
- completedDays = []
- missedDays = []
- currentDay = 1
- today's task = Day 1
- achievements = locked
- completion = 0%

3. ACTIVE
Simulate the SAME user after successfully completing 18 consecutive days:
- streak = 18
- completedDays = [1..18]
- missedDays = []
- currentDay = 19
- completion = 18/60
- achievements calculated from this state
- today's task = Day 19

4. MISSED
Simulate the SAME user after completing Days 1–11 and missing Day 12:
- previousStreak = 11
- currentStreak = 0
- completedDays = [1..11]
- missedDays = [12]
- currentDay = 13
- completion = 11/60
- today's task = Day 13

IMPORTANT DATA RULE:
Never hardcode unrelated student names into these states.

The only difference between New, Active and Missed should be the student's progress/state, not their identity.

Derive all dashboard values from ONE normalized student state:

student
├── identity
│   ├── name
│   ├── college
│   └── track
├── progress
│   ├── currentDay
│   ├── completedDays
│   ├── missedDays
│   ├── currentStreak
│   └── previousStreak
└── achievements

The calendar, streak widget, completion percentage, achievements, today's task, level/XP and progress indicators MUST all derive from the same state.

Do not allow contradictory values such as:
- streak = 0 while 11 days are marked completed and no missed day exists
- currentDay = 6 while the state says the user is on Day 19
- completion percentage not matching completedDays
- achievements that do not match the streak

After implementation, test all four states and verify that the identity remains Rohit Sharma while only the progress changes.

Do not redesign the UI yet.
Fix the data/state architecture only.

Continue

Now optimize ONLY /dashboard for the required 390px mobile viewport.

Do not change the underlying student-state logic.

GOAL:
The dashboard should feel like a focused "Tonight's Mission" screen, not a desktop dashboard compressed onto mobile.

At 390px:

1. TOP AREA
Show:
- student name
- track
- compact level/XP

Keep this area minimal.

2. PRIMARY FOCUS — TODAY'S MISSION
Make today's task the dominant element.

Show:
- Day number
- task title
- difficulty
- 1–2 line description
- primary CTA: "Start Today's Challenge"

This should be the first major action after the header.

3. STREAK
Place the streak directly below/near today's mission.

For example:

🔥 18 day streak
"You're on a roll. Keep tonight's proof alive."

For a new user:

🌱 Start your streak
"Complete Day 1 tonight."

For a missed user:

❄️ Streak paused
"Day 12 was missed. Complete today's task to restart."

4. PROGRESS
Replace the large desktop-style 60-day grid with a compact mobile-friendly progress visualization.

Show:
18 / 60 days
30% complete

Then provide a compact timeline/calendar that can be scanned without overwhelming the screen.

5. ACHIEVEMENTS
Show only the most relevant 2–3 achievements initially.

Example:
🏆 First Commit
🔥 7-Day Warrior
🔒 14-Day Overlord

Allow the rest to be revealed progressively rather than displaying a large wall of locked badges.

6. EDGE CASE PREVIEW
This is a developer/testing feature, not the student's main experience.

Move it into a clearly labeled:
"Demo / Edge Case Preview"

section or collapsible developer panel.

Do not let it dominate the dashboard screenshot.

7. LATE-NIGHT CO-WORKING
Keep the peer activity indicator compact.

Example:

● 248 students coding tonight
"Someone just completed Day 11."

It should reinforce the night-coding identity without becoming another large card.

8. BOTTOM NAVIGATION
Ensure the fixed bottom navigation never overlaps important content.

Add appropriate bottom safe-area/padding.

9. MOBILE RULES
At 390px:
- no horizontal overflow
- no desktop two-column layout
- no squeezed cards
- no overlapping elements
- minimum 44px touch targets
- 16–20px horizontal page padding
- readable text
- comfortable vertical spacing

10. IMPORTANT
Do not solve the problem by simply reducing font sizes.

Reorganize the information hierarchy for mobile.

After implementation, test at:
390px
430px
768px
1024px

Do not modify / or /day/12.

add the missing prompt in prompt.md
