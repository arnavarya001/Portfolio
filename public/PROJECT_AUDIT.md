# Portfolio Project Audit & Ranking

**Review date:** 3 November 2026  
**Scope:** 22 repositories and their supplied live deployments and packages. Source was reviewed where public repository access allowed; deployed interfaces and extensions were inspected.

## Method

Each score uses the same 100-point rubric. Points reflect inspected code and observed deployment state; README claims alone do not earn points. Authentication, database security, validation, functionality and deployment are scored based on available evidence. A live page opening does not imply every gated or write action was exercised.

| Criterion | Weight |
|---|---:|
| Architecture & code quality | 15 |
| Backend & API | 15 |
| Database & data management | 10 |
| Features & business logic | 15 |
| Authentication & security | 10 |
| Frontend & UI/UX | 10 |
| Problem solving & usefulness | 10 |
| Error handling & validation | 5 |
| Deployment & working functionality | 5 |
| Maintainability & scalability | 5 |

Tier thresholds: **S 85–100**, **A 70–84**, **B 50–69**, **C below 50**. Projects are ordered by total score; ties retain the original project number. No project reached S tier under this evidence-based bar.

## Ranking at a glance

**22 projects · 0 S-tier · 6 A-tier · 9 B-tier · 7 C-tier · 4 featured in the portfolio**

| Rank | Project | Score | Tier | Difficulty |
|---:|---|---:|:---:|---|
| 1 | BookMyShow Clone | 82/100 | A | Advanced |
| 2 | Cloudgram | 77/100 | A | Advanced |
| 3 | Lab Equipment Issue & Return Tracker | 77/100 | A | Advanced |
| 4 | RepoRead AI — Auto README Updater | 77/100 | A | Intermediate |
| 5 | Parking Management & Slot Booking | 71/100 | A | Advanced |
| 6 | StudyFlow | 71/100 | A | Intermediate |
| 7 | Complaint & Helpdesk Ticket System | 69/100 | B | Advanced |
| 8 | YojanaSetu · Sahay Setu | 67/100 | B | Advanced |
| 9 | Vehicle Management System | 66/100 | B | Intermediate |
| 10 | Zyntra | 63/100 | B | Advanced |
| 11 | SpendSmart | 62/100 | B | Intermediate |
| 12 | Mobile Store Inventory | 59/100 | B | Intermediate |
| 13 | ToDo List | 55/100 | B | Intermediate |
| 14 | QuickQR | 52/100 | B | Intermediate |
| 15 | GitHub Profile Explorer | 51/100 | B | Intermediate |
| 16 | Mocktail Menu | 45/100 | C | Beginner |
| 17 | Truck Driver Playlist Radio | 41/100 | C | Intermediate |
| 18 | Weather Station | 33/100 | C | Beginner |
| 19 | The Guidance · BSEB Learning Hub | 31/100 | C | Unverified |
| 20 | Snake Game | 31/100 | C | Beginner |
| 21 | DreamHomes Housing Website | 26/100 | C | Beginner |
| 22 | Calculator with Dark Mode | 25/100 | C | Beginner |

## Project reviews

### 01. BookMyShow Clone

**Tagline:** A cinema booking flow from show selection to a digital ticket.  
**Score / tier / difficulty:** 82/100 · A-Tier · Advanced

**Short description:** An Express/MongoDB application with movie, theatre, show, seat, snack, booking, review and watchlist workflows.

**Overview:** The MVC app uses EJS pages and Mongoose models for catalog and booking data. Its booking controller checks already-booked seats, calculates ticket/snack fees, creates a Razorpay order when keys are configured and verifies payment signatures; a mock checkout path also exists.

**Problem addressed:** Moviegoers need one guided flow to compare screenings, choose seats and keep their booking details.

**Implemented features:**
- Movie catalog and filters
- Theatre/showtime selection
- Seat matrix with price tiers
- Snack add-ons and total calculation
- Razorpay order/signature code plus demo checkout
- Digital QR ticket, history and cancellation
- Reviews, watchlist and local Passport authentication

**Confirmed stack:** Node.js, Express, EJS, MongoDB, Mongoose, Passport.js, Razorpay, Leaflet, Cloudinary, Sessions

**Frontend:** EJS, ejs-mate, CSS, Bootstrap, browser JavaScript, Leaflet

**Backend:** Node.js, Express 5, Passport Local, sessions, Razorpay SDK, Cloudinary/Multer

**Database:** MongoDB/Mongoose with Mongo-backed session storage

**Architecture:** MVC monolith with Movie, Theatre, Show, Booking, Review and User models.

**Technical review:**
- Payment provider code is present, but actual payment processing was not verified. The controller includes a mock order/demo mode, so a finished checkout alone must not be presented as a real payment.
- Seat availability is checked before booking; atomic reservation behavior under concurrent requests was not verified.

**Score breakdown:**
- Architecture & code quality: 12/15
- Backend & API: 14/15
- Database & data management: 9/10
- Features & business logic: 14/15
- Authentication & security: 6/10
- Frontend & UI/UX: 9/10
- Problem solving & usefulness: 9/10
- Error handling & validation: 4/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, dependencies, booking/show models, payment controller, routes and seat-selection source inspected. Live movie catalog loaded; checkout was not attempted.

**GitHub:** [https://github.com/arnavarya001/bookmyshow](https://github.com/arnavarya001/bookmyshow)  
**Live deployment:** [https://bookmyshow-psi-woad.vercel.app/movies](https://bookmyshow-psi-woad.vercel.app/movies)

### 02. Cloudgram

**Tagline:** A cloud-drive interface backed by Telegram storage and MongoDB metadata.  
**Score / tier / difficulty:** 77/100 · A-Tier · Advanced

**Short description:** A server-rendered file manager that authenticates Telegram users, organizes folders and streams file content through Telegram infrastructure.

**Overview:** The Express/EJS application stores user and folder metadata in MongoDB while routing file bytes through Telegram Bot API or a GramJS MTProto provider. Auth verification, authenticated file routes, ownership checks and temporary upload cleanup are present in source.

**Problem addressed:** A personal cloud-drive experience can be built without keeping uploaded files permanently on the application server.

**Implemented features:**
- Telegram Login Widget HMAC verification and replay-age check
- Nested folders and per-user file metadata
- Multi-file uploads and cleanup of temporary files
- Bot API and MTProto storage providers
- File listing, search, stats and streamed downloads/previews
- MongoDB-backed sessions

**Confirmed stack:** Node.js, Express, EJS, MongoDB, Mongoose, Telegram Bot API, GramJS, Multer, Sessions

**Frontend:** EJS, HTML, CSS and vanilla JavaScript

**Backend:** Node.js, Express 5, Telegram Bot API, GramJS/MTProto, Multer

**Database:** MongoDB/Mongoose metadata and connect-mongo sessions

**Architecture:** Storage service selects Telegram transport while Mongo stores ownership, folders and Telegram references.

**Technical review:**
- The design has substantial external-service and credential/configuration dependencies; the live public page opened, but Telegram sign-in and file transfer were not exercised.

**Score breakdown:**
- Architecture & code quality: 12/15
- Backend & API: 13/15
- Database & data management: 8/10
- Features & business logic: 13/15
- Authentication & security: 6/10
- Frontend & UI/UX: 8/10
- Problem solving & usefulness: 9/10
- Error handling & validation: 3/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, dependencies, auth, file routes, storage providers and models inspected. Live landing page opened; authenticated flows unverified.

**GitHub:** [https://github.com/arnavarya001/Cloudgram](https://github.com/arnavarya001/Cloudgram)  
**Live deployment:** [https://cloudgram-gamma.vercel.app/](https://cloudgram-gamma.vercel.app/)

### 03. Lab Equipment Issue & Return Tracker

**Tagline:** A role-based inventory workflow for borrowing, issuing and returning lab assets.  
**Score / tier / difficulty:** 77/100 · A-Tier · Advanced

**Short description:** An institutional asset-management app with separate requester, lab-in-charge and admin workflows, stock guards and return-condition records.

**Overview:** Express routes and Mongoose models track equipment quantities and request states from pending through approved, issued and returned. Session authentication protects role-specific routes; overdue items are calculated against expected return dates, and asset records include maintenance logs.

**Problem addressed:** Paper checkout logs make equipment availability, overdue returns and asset condition hard to reconcile.

**Implemented features:**
- Role-based session login for requester, lab in-charge and admin
- Asset catalog and admin CRUD
- Requests with purpose, quantity and due date
- Approve/reject, issue and return transitions
- Stock availability checks and overdue flags
- OK/damaged/lost return condition and maintenance logs

**Confirmed stack:** Node.js, Express, EJS, MongoDB, Mongoose, Sessions, bcryptjs

**Frontend:** EJS templates, HTML, CSS and vanilla JavaScript

**Backend:** Node.js, Express 4, sessions, bcryptjs

**Database:** MongoDB Atlas with Mongoose; Mongo-backed sessions

**Architecture:** Server-rendered application with role-protected route groups and Asset/Request/User models.

**Technical review:**
- Workflow and stock transitions are implemented in route code; concurrent issue requests are not guarded with a transaction in the inspected paths.
- The live deployment opened the login page; authenticated role dashboards were not tested.

**Score breakdown:**
- Architecture & code quality: 11/15
- Backend & API: 12/15
- Database & data management: 8/10
- Features & business logic: 13/15
- Authentication & security: 7/10
- Frontend & UI/UX: 7/10
- Problem solving & usefulness: 9/10
- Error handling & validation: 4/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 4/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README feature matrix, dependencies, models and role-protected admin/requester/lab-in-charge routes inspected. Live login page opened.

**GitHub:** [https://github.com/arnavarya001/Lab-Equipment-Asset-Issue-Return-Tracking-System](https://github.com/arnavarya001/Lab-Equipment-Asset-Issue-Return-Tracking-System)  
**Live deployment:** [https://lab-equipment-asset-issue-return-tr.vercel.app/](https://lab-equipment-asset-issue-return-tr.vercel.app/)

### 04. Parking Management & Slot Booking

**Tagline:** Time-based parking reservations with an admin operations view.  
**Score / tier / difficulty:** 71/100 · A-Tier · Advanced

**Short description:** A React and Express application for browsing parking slots, checking time overlap, managing zones and reviewing bookings.

**Overview:** The backend stores users, zones, slots and bookings in MongoDB. Booking creation checks valid time order, blocked slots and overlapping active reservations; users can view/cancel their own bookings and admins can inspect all reservations.

**Problem addressed:** Facilities need to coordinate slot availability across vehicle types, zones and reservation times.

**Implemented features:**
- JWT login and admin role guard
- Slot and zone CRUD
- Vehicle type/location filters
- Start/end-time bookings with overlap lookup
- My bookings and cancellation
- Admin booking and occupancy views

**Confirmed stack:** React, Vite, React Router, Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

**Frontend:** React 19, Vite, React Router 7, CSS

**Backend:** Node.js, Express 5, JWT, bcryptjs

**Database:** MongoDB with Mongoose

**Architecture:** React client, Express API and User/Zone/ParkingSlot/Booking collections.

**Technical review:**
- The overlap check is a read followed by insert; concurrent requests can race without a transaction or database-level conflict guard.
- The live deep link redirected to login, so booking behavior was not exercised.

**Score breakdown:**
- Architecture & code quality: 10/15
- Backend & API: 11/15
- Database & data management: 8/10
- Features & business logic: 12/15
- Authentication & security: 5/10
- Frontend & UI/UX: 7/10
- Problem solving & usefulness: 9/10
- Error handling & validation: 4/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, manifests, Booking/Slot models, auth middleware and booking routes inspected. Live site redirected to its login screen.

**GitHub:** [https://github.com/arnavarya001/Parking-Management-Slot-Booking-System](https://github.com/arnavarya001/Parking-Management-Slot-Booking-System)  
**Live deployment:** [https://parking-management-slot-booking-sys.vercel.app/slots](https://parking-management-slot-booking-sys.vercel.app/slots)

### 05. StudyFlow

**Tagline:** A student task planner with Supabase Auth and PostgreSQL row policies.  
**Score / tier / difficulty:** 71/100 · A-Tier · Intermediate

**Short description:** A static JavaScript task manager with per-user RLS, task CRUD, completion, priorities, due dates, subject tags, search and sorting.

**Overview:** The SQL schema enables RLS on tasks and defines select/insert/update/delete policies using auth.uid() = user_id. The browser app calls Supabase Auth and queries the user's task data; the live deployment opened at an auth view with a project setup notice, so connected persistence was not confirmed.

**Problem addressed:** Students need a lightweight way to organize assignments by due date, subject and priority.

**Implemented features:**
- Email/password auth
- Task add/edit/delete/complete
- Priority, due date and subject tags
- Search, sorting and dashboard statistics
- PostgreSQL checks for priority/status
- RLS policies scoped to authenticated user_id

**Confirmed stack:** HTML, CSS, JavaScript, Supabase Auth, PostgreSQL, Row Level Security

**Frontend:** HTML, CSS, vanilla JavaScript and Supabase JS client

**Backend:** Supabase Auth and PostgREST services

**Database:** PostgreSQL via Supabase, with RLS policies and indexes

**Architecture:** Static client directly accesses a user-scoped tasks table through Supabase.

**Technical review:**
- Schema and RLS are strong for a small client app. Live sign-in and database connectivity were not verified.

**Score breakdown:**
- Architecture & code quality: 10/15
- Backend & API: 7/15
- Database & data management: 9/10
- Features & business logic: 11/15
- Authentication & security: 9/10
- Frontend & UI/UX: 7/10
- Problem solving & usefulness: 8/10
- Error handling & validation: 4/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 4/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, browser app source and SQL schema/RLS policies inspected. Live auth view opened; connected data flow unverified.

**GitHub:** [https://github.com/arnavarya001/StudyFlow-supabase-student-task-manager-](https://github.com/arnavarya001/StudyFlow-supabase-student-task-manager-)  
**Live deployment:** [https://arnavarya001.github.io/StudyFlow-supabase-student-task-manager-/](https://arnavarya001.github.io/StudyFlow-supabase-student-task-manager-/)

### 06. Complaint & Helpdesk Ticket System

**Tagline:** A clear workflow for raising, routing and resolving support tickets.  
**Score / tier / difficulty:** 69/100 · B-Tier · Advanced

**Short description:** An individual MERN coursework project with customer and admin views for ticket intake, department assignment, discussions and resolution metrics.

**Overview:** Customers can submit categorized tickets, follow status changes and comment on an issue. Admin routes support triage, department assignment and dashboard summaries. The README identifies this as an individual Assignment 6 project.

**Problem addressed:** Email and manual complaint logs make ownership, status and response timing difficult to track.

**Implemented features:**
- Customer registration and login
- Ticket create, search and status/priority filters
- Open-ticket edit/delete and one-time reopen workflow
- Admin status and department assignment
- Ticket discussion threads
- Dashboard counts and average resolution time

**Confirmed stack:** React, Vite, React Router, Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

**Frontend:** React 19, Vite, React Router 7, CSS

**Backend:** Node.js, Express 5 REST API, JWT, bcryptjs

**Database:** MongoDB with Mongoose

**Architecture:** Separate React client and Express API; User, Ticket, Comment and Department models.

**Technical review:**
- The public registration controller accepts a role from the request body, and the user schema permits admin; role escalation needs to be fixed before real use.
- The live deployment reached login, but the supplied demo login remained on its loading state, so the protected dashboards were not verified.

**Score breakdown:**
- Architecture & code quality: 10/15
- Backend & API: 11/15
- Database & data management: 8/10
- Features & business logic: 13/15
- Authentication & security: 2/10
- Frontend & UI/UX: 7/10
- Problem solving & usefulness: 9/10
- Error handling & validation: 4/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 3/5

**Preview:** Repository-provided thumbnail artwork. The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, manifests and core auth/ticket/model files inspected. Live login page opened; dashboard access unverified.

**GitHub:** [https://github.com/arnavarya001/Complaint-Helpdesk-Ticket-System](https://github.com/arnavarya001/Complaint-Helpdesk-Ticket-System)  
**Live deployment:** [https://complaint-helpdesk-ticket-system.vercel.app/admin/dashboard](https://complaint-helpdesk-ticket-system.vercel.app/admin/dashboard)

### 07. YojanaSetu · Sahay Setu

**Tagline:** An explainable scheme-guidance concept for the NSFDC ecosystem.  
**Score / tier / difficulty:** 67/100 · B-Tier · Advanced

**Short description:** A React/TypeScript project combining deterministic scheme checks, EMI calculations, partner routing and an optional AI assistant with cited policy snippets.

**Overview:** The source contains an eligibility engine, recommendation/scoring logic, calculator, Leaflet partner routing, multilingual UI and OpenAI tool loop with an offline deterministic fallback. Its current Storage class initializes seeded arrays in process memory, and the README's ₹3 lakh eligibility description conflicts with ₹5 lakh statements in the RAG prompt/data.

**Problem addressed:** Beneficiaries can have trouble finding relevant schemes, understanding preliminary criteria and locating an official channel partner.

**Implemented features:**
- Deterministic eligibility criteria with missing-field explanations
- Scheme match scores and recommendations
- EMI calculator with repayment schedule
- Geospatial channel-partner routing
- Hindi/English UI and Web Speech API hooks
- Optional OpenAI tool agent with local fallback and curated RAG chunks
- Admin routes and in-memory audit/version records

**Confirmed stack:** React, TypeScript, Vite, Tailwind CSS, Express, OpenAI API, RAG, Leaflet, i18next, Web Speech API

**Frontend:** React, TypeScript, Vite, Tailwind, React Router, i18next, React Leaflet, Web Speech API

**Backend:** Node.js, Express, TypeScript, Zod, OpenAI SDK, JWT, Helmet, rate limiter

**Database:** Current Storage class uses seeded in-memory arrays; no durable database adapter was confirmed in the inspected storage module

**Architecture:** Shared TypeScript types, REST API, deterministic domain services and optional LLM/tool orchestration.

**Technical review:**
- The README and eligibility comments cite a ₹3 lakh ceiling while the AI system prompt and RAG data say ₹5 lakh. This policy mismatch should be resolved before presenting recommendations as reliable.
- The data store inspected is in-memory, so scheme edits, audit records and conversations are not durable across restarts.
- No SIH award claim is made; the README associates the work with problem statement 26092.

**Score breakdown:**
- Architecture & code quality: 11/15
- Backend & API: 10/15
- Database & data management: 1/10
- Features & business logic: 14/15
- Authentication & security: 4/10
- Frontend & UI/UX: 8/10
- Problem solving & usefulness: 10/10
- Error handling & validation: 4/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, manifests, core eligibility/recommendation/AI/RAG/storage modules and tests directory inspected. Live Render URL showed its waking service screen; app response not verified.

**GitHub:** [https://github.com/arnavarya001/SIH-Problem](https://github.com/arnavarya001/SIH-Problem)  
**Live deployment:** [https://yojanasetu-nsfdc.onrender.com/](https://yojanasetu-nsfdc.onrender.com/)

### 08. Vehicle Management System

**Tagline:** A fleet register with role-gated vehicle maintenance.  
**Score / tier / difficulty:** 66/100 · B-Tier · Intermediate

**Short description:** A team-built MERN system for recording vehicles, searching fleet records and tracking insurance dates and operational status.

**Overview:** The React client talks to an Express API backed by MongoDB/Mongoose. The README lists team Neural Nexus and Arnav as a member; it does not assign an individual feature ownership.

**Problem addressed:** Fleet operators need one place to find vehicle records and spot maintenance or insurance follow-ups.

**Implemented features:**
- Vehicle create, edit and delete routes restricted to admins
- Search by vehicle number, model or owner
- Type and status filters
- Insurance expiry and operational status fields
- JWT authentication and bcrypt password hashing
- Fleet, login, registration and vehicle forms

**Confirmed stack:** React, Vite, React Router, Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs

**Frontend:** React 19, Vite, React Router 7

**Backend:** Node.js, Express 5, JWT, bcryptjs

**Database:** MongoDB with Mongoose

**Architecture:** Separate client/API; User and Vehicle models with protected admin write routes.

**Technical review:**
- Vehicle list/detail GET routes are public in the inspected router and return records that include owner and insurance fields; review exposure before using real fleet data.
- The live page rendered its filters but remained on 'Loading vehicles…' during the check.

**Score breakdown:**
- Architecture & code quality: 10/15
- Backend & API: 11/15
- Database & data management: 7/10
- Features & business logic: 11/15
- Authentication & security: 5/10
- Frontend & UI/UX: 6/10
- Problem solving & usefulness: 8/10
- Error handling & validation: 3/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, manifests, vehicle model/controller, auth middleware and routes inspected. Live page opened; API data load not confirmed. README identifies this as a team project.

**GitHub:** [https://github.com/arnavarya001/fullstack-backend-frontend](https://github.com/arnavarya001/fullstack-backend-frontend)  
**Live deployment:** [https://fullstack-backend-frontend.vercel.app/](https://fullstack-backend-frontend.vercel.app/)

### 09. Zyntra

**Tagline:** A profile-discovery and messaging app built around shared aesthetics.  
**Score / tier / difficulty:** 63/100 · B-Tier · Advanced

**Short description:** A React/TypeScript frontend and Express API implement registration, protected discovery, profile management, requests, matches and messaging.

**Overview:** The source contains protected React routes, JWT-backed auth context, image upload handling, database initialization for PostgreSQL in production and a local SQLite fallback, plus API handlers for users and messages. The README is still the default Vite template; the live landing page identifies the product as an Instagram-aesthetic matching app.

**Problem addressed:** People looking for new connections want a way to discover profiles with compatible interests and continue conversations.

**Implemented features:**
- Registration/login and protected client routes
- Profile details and image uploads
- Preference-based profile discovery
- Requests and mutual matches
- Messages and profile views
- PostgreSQL/SQLite database setup in the backend

**Confirmed stack:** React, TypeScript, Vite, Node.js, Express, PostgreSQL, SQLite, JWT, bcryptjs, Multer

**Frontend:** React, TypeScript, Vite, React Router

**Backend:** Node.js, Express, JWT, bcryptjs, Multer

**Database:** PostgreSQL in production; SQLite fallback is described in source

**Architecture:** SPA plus REST API and SQL tables for users, requests, matches and messages.

**Technical review:**
- The backend uses a hard-coded fallback JWT secret and permissive CORS in the inspected server entry; configure secrets and origins explicitly before real-user deployment.
- Live landing page loaded. Protected discovery, messaging and persistence were not exercised.

**Score breakdown:**
- Architecture & code quality: 10/15
- Backend & API: 10/15
- Database & data management: 7/10
- Features & business logic: 11/15
- Authentication & security: 3/10
- Frontend & UI/UX: 8/10
- Problem solving & usefulness: 6/10
- Error handling & validation: 3/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, package manifest, auth context, discovery/messages/requests pages and backend server inspected. README is a Vite template. Live landing page opened.

**GitHub:** [https://github.com/arnavarya001/Zyntra](https://github.com/arnavarya001/Zyntra)  
**Live deployment:** [https://zyntra-ruby.vercel.app/](https://zyntra-ruby.vercel.app/)

### 10. SpendSmart

**Tagline:** A per-user expense ledger built on Firebase Authentication and Firestore.  
**Score / tier / difficulty:** 62/100 · B-Tier · Intermediate

**Short description:** A static JavaScript app for recording income and expenses, with Firebase sign-in and Firestore rules scoped to the authenticated user.

**Overview:** The client initializes Firebase Auth and Firestore, then handles transaction add/edit/delete and category/type filtering. Firestore rules compare transaction userId against the signed-in UID. The live page showed its auth view; a successful backend session was not verified.

**Problem addressed:** Personal transactions need a simple ledger that persists across sessions and separates each user's records.

**Implemented features:**
- Email/password sign-in and account creation
- Firestore transaction collection
- Income/expense and category fields
- Add/update/delete operations
- Per-user read/write/delete rule checks
- Dashboard and category summaries in the UI

**Confirmed stack:** HTML, CSS, JavaScript, Firebase Auth, Cloud Firestore, Firestore Security Rules

**Frontend:** HTML, CSS, vanilla JavaScript and Firebase Web SDK

**Backend:** Firebase Authentication and Firestore client services

**Database:** Cloud Firestore with userId-scoped security rules

**Architecture:** Static browser app calling Firebase directly; no custom server.

**Technical review:**
- The live deployment presented its login/configuration view; successful Firebase sign-in and transaction persistence were not confirmed.

**Score breakdown:**
- Architecture & code quality: 9/15
- Backend & API: 5/15
- Database & data management: 7/10
- Features & business logic: 10/15
- Authentication & security: 8/10
- Frontend & UI/UX: 7/10
- Problem solving & usefulness: 8/10
- Error handling & validation: 3/5
- Deployment & working functionality: 2/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, app source and Firestore rules inspected. Live auth view opened; data workflows unverified.

**GitHub:** [https://github.com/arnavarya001/-SpendSmart-Firebase-Smart-Expense-Tracker](https://github.com/arnavarya001/-SpendSmart-Firebase-Smart-Expense-Tracker)  
**Live deployment:** [https://arnavarya001.github.io/-SpendSmart-Firebase-Smart-Expense-Tracker/](https://arnavarya001.github.io/-SpendSmart-Firebase-Smart-Expense-Tracker/)

### 11. Mobile Store Inventory

**Tagline:** A server-rendered catalog for recording and searching phone stock.  
**Score / tier / difficulty:** 59/100 · B-Tier · Intermediate

**Short description:** An EJS inventory app deployed through Netlify Functions with Netlify Database/PostgreSQL and Drizzle ORM.

**Overview:** The serverless route renders inventory and form pages, searches by brand and handles create/edit/update/delete actions. The table stores brand, model, RAM, storage and price. No authentication, customer cart, checkout or payment flow was found, so this is an inventory manager rather than a complete e-commerce app.

**Problem addressed:** A small shop needs a basic record of phone models, specifications and prices.

**Implemented features:**
- Inventory listing
- Search by brand
- Add and edit mobile records
- Update and delete actions
- PostgreSQL/Netlify Database schema with Drizzle
- Server-rendered EJS forms and pages

**Confirmed stack:** Node.js, Express, Netlify Functions, EJS, PostgreSQL, Drizzle ORM

**Frontend:** EJS, HTML and CSS

**Backend:** Node.js, Express local adapter and Netlify Functions

**Database:** Netlify Database/PostgreSQL through Drizzle ORM

**Architecture:** Serverless handler routes to EJS views and a Drizzle-backed mobiles table.

**Technical review:**
- Inventory routes have no authentication or authorization in the inspected handler; they should not be used for private stock data as-is.
- Live home page opened; database-backed listing and mutations were not exercised.

**Score breakdown:**
- Architecture & code quality: 9/15
- Backend & API: 8/15
- Database & data management: 8/10
- Features & business logic: 9/15
- Authentication & security: 2/10
- Frontend & UI/UX: 7/10
- Problem solving & usefulness: 6/10
- Error handling & validation: 3/5
- Deployment & working functionality: 3/5
- Maintainability & scalability: 4/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, package manifest, Netlify function, Drizzle schema and EJS pages inspected. Live home page opened.

**GitHub:** [https://github.com/arnavarya001/Mobile_Shop](https://github.com/arnavarya001/Mobile_Shop)  
**Live deployment:** [https://bespoke-kataifi-f49f73.netlify.app/](https://bespoke-kataifi-f49f73.netlify.app/)

### 12. ToDo List

**Tagline:** A small serverless task list with persistent database CRUD.  
**Score / tier / difficulty:** 55/100 · B-Tier · Intermediate

**Short description:** A static HTML/JavaScript interface calls Netlify Functions backed by PostgreSQL/Drizzle to list, create, complete and delete tasks.

**Overview:** The API validates UUIDs and task length, stores task status and timestamps, and returns the updated list after each operation. The UI renders Add, Complete and Delete; its visible Completed/Pending/Delete Completed buttons are not wired in the inspected browser script, and the API has no user identity or per-user isolation.

**Problem addressed:** A simple task list should keep tasks between page loads and allow completion/deletion.

**Implemented features:**
- List tasks
- Create task with length validation
- Toggle completion
- Delete task
- UUID primary keys and created timestamps
- Serverless PostgreSQL/Drizzle persistence

**Confirmed stack:** HTML, CSS, JavaScript, Axios, Netlify Functions, PostgreSQL, Drizzle ORM

**Frontend:** HTML, CSS, vanilla JavaScript and Axios

**Backend:** Netlify Functions with Express local development adapter

**Database:** Netlify Database/PostgreSQL through Drizzle ORM

**Architecture:** Static client calls REST-like function endpoints backed by a todos table.

**Technical review:**
- Tasks are shared by the API rather than scoped to a signed-in user. The visible filter/delete-completed buttons are not connected to the script.

**Score breakdown:**
- Architecture & code quality: 8/15
- Backend & API: 9/15
- Database & data management: 8/10
- Features & business logic: 8/15
- Authentication & security: 2/10
- Frontend & UI/UX: 4/10
- Problem solving & usefulness: 6/10
- Error handling & validation: 3/5
- Deployment & working functionality: 4/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, package manifest, Netlify function, database schema and frontend script inspected. Live task page opened; no task was created or changed.

**GitHub:** [https://github.com/arnavarya001/ToDo_List](https://github.com/arnavarya001/ToDo_List)  
**Live deployment:** [https://fascinating-tulumba-d53697.netlify.app/](https://fascinating-tulumba-d53697.netlify.app/)

### 13. QuickQR

**Tagline:** A customizable QR generator that works entirely in the browser.  
**Score / tier / difficulty:** 52/100 · B-Tier · Intermediate

**Short description:** A static JavaScript utility that validates web links, draws QR codes and exports image/vector files without a backend.

**Overview:** The page uses a bundled QR library and client-side JavaScript for URL normalization, QR generation, color and error-correction controls, PNG/SVG exports, clipboard copying, theme preference and local recent history.

**Problem addressed:** People need a quick, printable QR code that points to a clean web URL and can match a chosen brand palette.

**Implemented features:**
- URL validation and protocol normalization
- Live QR generation
- Foreground/background colors and error-correction settings
- PNG and SVG downloads
- Clipboard copy
- Local history and persistent theme preference

**Confirmed stack:** HTML, CSS, JavaScript, QRCode library, Clipboard API, Canvas, Local Storage

**Frontend:** HTML5, CSS and vanilla JavaScript

**Backend:** None

**Database:** None; recent links/theme use localStorage

**Architecture:** Static page with bundled qrcode library and browser Clipboard/Canvas APIs.

**Technical review:**
- No server or account layer is present; browser permission and clipboard behavior can vary by browser.

**Score breakdown:**
- Architecture & code quality: 8/15
- Backend & API: 1/15
- Database & data management: 0/10
- Features & business logic: 10/15
- Authentication & security: 7/10
- Frontend & UI/UX: 8/10
- Problem solving & usefulness: 8/10
- Error handling & validation: 4/5
- Deployment & working functionality: 3/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, package manifest and generator source inspected. Live generator page opened; generated exports were not downloaded.

**GitHub:** [https://github.com/arnavarya001/QuickQR](https://github.com/arnavarya001/QuickQR)  
**Live deployment:** [https://quickqr-inky.vercel.app/](https://quickqr-inky.vercel.app/)

### 14. GitHub Profile Explorer

**Tagline:** A terminal-inspired browser for public GitHub profiles and repositories.  
**Score / tier / difficulty:** 51/100 · B-Tier · Intermediate

**Short description:** A single-file frontend app that fetches a GitHub user and up to six non-fork repositories, then sorts those repositories by stars.

**Overview:** The inline JavaScript calls the public GitHub REST user and repositories endpoints, displays profile counts and join date, and renders the selected repositories. Unauthenticated requests are subject to GitHub's public rate limit.

**Problem addressed:** A quick profile view can make public developer activity easier to scan without visiting several GitHub pages.

**Implemented features:**
- Username lookup
- Public profile information
- Repository list from GitHub REST API
- Non-fork top repositories sorted by stars
- Not-found and API error handling
- Rate-limit notice in the UI

**Confirmed stack:** HTML, CSS, JavaScript, GitHub REST API, Fetch API

**Frontend:** Single HTML page with inline CSS and JavaScript

**Backend:** None; direct GitHub REST API calls

**Database:** None

**Architecture:** Browser fetches public user/repository endpoints and renders results client-side.

**Technical review:**
- Direct unauthenticated API usage is limited by GitHub's per-IP rate cap; no caching or backend token layer is present.
- Live terminal-style page loaded; no profile lookup was submitted.

**Score breakdown:**
- Architecture & code quality: 8/15
- Backend & API: 5/15
- Database & data management: 0/10
- Features & business logic: 8/15
- Authentication & security: 6/10
- Frontend & UI/UX: 8/10
- Problem solving & usefulness: 7/10
- Error handling & validation: 3/5
- Deployment & working functionality: 3/5
- Maintainability & scalability: 3/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree and full HTML/inline script inspected. Live page shell opened; API lookup not run.

**GitHub:** [https://github.com/arnavarya001/github-profile-explorer](https://github.com/arnavarya001/github-profile-explorer)  
**Live deployment:** [https://github-profile-viewer2235.netlify.app/](https://github-profile-viewer2235.netlify.app/)

### 15. Mocktail Menu

**Tagline:** A lightweight browser for alcohol-free drink recipes.  
**Score / tier / difficulty:** 45/100 · C-Tier · Beginner

**Short description:** A React app that fetches non-alcoholic drinks from TheCocktailDB and opens ingredient and preparation details by drink ID.

**Overview:** React Router separates the home, drinks list and recipe detail views. The list filters fetched drink names in the browser; the detail view requests one recipe and renders its ingredients and instructions.

**Problem addressed:** People looking for alcohol-free drink ideas need a simple way to browse recipes and ingredient lists.

**Implemented features:**
- Non-alcoholic drink listing from TheCocktailDB
- Client-side name search
- Recipe details by API ID
- Ingredient, measure and instruction display
- React Router navigation and not-found route

**Confirmed stack:** React, Vite, React Router, TheCocktailDB API, JavaScript

**Frontend:** React 19, Vite, React Router 7

**Backend:** None; browser calls TheCocktailDB directly

**Database:** None

**Architecture:** Single-page client with list and detail requests to TheCocktailDB.

**Technical review:**
- The list and detail requests have loading UI, but source code has no explicit network/error state handling.

**Score breakdown:**
- Architecture & code quality: 9/15
- Backend & API: 2/15
- Database & data management: 0/10
- Features & business logic: 8/15
- Authentication & security: 5/10
- Frontend & UI/UX: 7/10
- Problem solving & usefulness: 7/10
- Error handling & validation: 2/5
- Deployment & working functionality: 3/5
- Maintainability & scalability: 2/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, package manifest and all route components inspected. Live home page opened; API-backed list flow not verified in this audit.

**GitHub:** [https://github.com/arnavarya001/ps8-mocktail-menu](https://github.com/arnavarya001/ps8-mocktail-menu)  
**Live deployment:** [https://ps8-mocktail-menu.vercel.app/](https://ps8-mocktail-menu.vercel.app/)

### 16. Truck Driver Playlist Radio

**Tagline:** A Hindi truck-themed player wrapped around a YouTube playlist.  
**Score / tier / difficulty:** 41/100 · C-Tier · Intermediate

**Short description:** A static player UI uses the YouTube IFrame API for playlist controls and includes a separate optional Express audio-proxy server.

**Overview:** The client exposes play/pause, next/previous, shuffle and seek controls around a configured playlist. The repository's optional @distube/ytdl-core proxy is not part of the static Netlify client and the README warns it is fragile and outside YouTube's terms.

**Problem addressed:** A themed radio-player interface gives long-haul drivers a playlist-oriented listening surface.

**Implemented features:**
- YouTube playlist player integration
- Play/pause, next/previous and shuffle controls
- Seek/progress UI
- Truck horn button and rotating background references
- Optional Express audio proxy in a separate server folder

**Confirmed stack:** HTML, CSS, JavaScript, YouTube IFrame API, Node.js, Express, ytdl-core

**Frontend:** HTML, CSS, vanilla JavaScript and YouTube IFrame API

**Backend:** Optional Node.js/Express proxy using @distube/ytdl-core

**Database:** None

**Architecture:** Static client embeds YouTube; optional proxy streams audio separately and is not verified in deployment.

**Technical review:**
- Live player UI loaded but showed 0:00 playback time; audio playback was not tested. The unofficial audio proxy is a fragile dependency and README flags the terms issue.

**Score breakdown:**
- Architecture & code quality: 5/15
- Backend & API: 4/15
- Database & data management: 0/10
- Features & business logic: 8/15
- Authentication & security: 4/10
- Frontend & UI/UX: 8/10
- Problem solving & usefulness: 5/10
- Error handling & validation: 2/5
- Deployment & working functionality: 3/5
- Maintainability & scalability: 2/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, README, player source and optional server source inspected. Live player page opened; playback not verified.

**GitHub:** [https://github.com/arnavarya001/Truck-Driver-Playlist-Music-player](https://github.com/arnavarya001/Truck-Driver-Playlist-Music-player)  
**Live deployment:** [https://calm-salmiakki-331c2a.netlify.app/](https://calm-salmiakki-331c2a.netlify.app/)

### 17. Weather Station

**Tagline:** A one-page current-conditions lookup by city.  
**Score / tier / difficulty:** 33/100 · C-Tier · Beginner

**Short description:** A vanilla JavaScript client requests current weather from OpenWeatherMap and displays temperature, condition, wind and humidity.

**Overview:** The page has a city input and search form, loading/error cards and a temperature gauge. The source calls the current-weather endpoint; no forecast path or server is present.

**Problem addressed:** Users want a quick current-weather snapshot for a named city.

**Implemented features:**
- City search
- Current temperature and condition
- Wind and humidity
- Empty-input message
- Not-found and fetch-error states

**Confirmed stack:** HTML, CSS, JavaScript, OpenWeatherMap API, Fetch API

**Frontend:** HTML, CSS and vanilla JavaScript

**Backend:** None; direct OpenWeatherMap request

**Database:** None

**Architecture:** Static browser page calls the current-weather endpoint and renders a result card.

**Technical review:**
- Only current conditions are implemented. The API credential is embedded in browser JavaScript; restrict or rotate it and avoid publishing an unrestricted key.
- The live search form loaded; a weather result was not requested during this audit.

**Score breakdown:**
- Architecture & code quality: 5/15
- Backend & API: 2/15
- Database & data management: 0/10
- Features & business logic: 5/15
- Authentication & security: 2/10
- Frontend & UI/UX: 6/10
- Problem solving & usefulness: 6/10
- Error handling & validation: 2/5
- Deployment & working functionality: 3/5
- Maintainability & scalability: 2/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, HTML and weather.js inspected. Live search page opened; API result not tested.

**GitHub:** [https://github.com/arnavarya001/weather](https://github.com/arnavarya001/weather)  
**Live deployment:** [https://weather2134rds.netlify.app/](https://weather2134rds.netlify.app/)

### 18. The Guidance · BSEB Learning Hub

**Tagline:** A Bihar Board learning portal presented in Hindi and English.  
**Score / tier / difficulty:** 31/100 · C-Tier · Unverified · provisional

**Short description:** The live site presents navigation for syllabus, notes, video lessons, test series, previous papers, daily quizzes and an AI tutor.

**Overview:** The homepage opened and exposed a BSEB coaching/board-preparation interface. The listed GitHub repository returned 404, so its framework, APIs, authentication, data model and the behavior behind these links could not be audited.

**Problem addressed:** Students preparing for Bihar Board exams need a single place to reach study material and practice tools.

**Implemented features:**
- Observed on the live homepage: syllabus, notes, videos, test series, PYQ papers, daily quiz, AI Guru, login and registration links
- Feature internals and data provenance not verified

**Confirmed stack:** Not verified

**Frontend:** Not verified; repository unavailable

**Backend:** Not verified

**Database:** Not verified

**Architecture:** Live UI only; no source-code architecture could be confirmed.

**Technical review:**
- Score and tier are provisional and deliberately limited to the visible homepage; no source claims are being inferred from project naming or marketing copy.

**Score breakdown:**
- Architecture & code quality: 0/15
- Backend & API: 0/15
- Database & data management: 0/10
- Features & business logic: 8/15
- Authentication & security: 0/10
- Frontend & UI/UX: 8/10
- Problem solving & usefulness: 9/10
- Error handling & validation: 2/5
- Deployment & working functionality: 4/5
- Maintainability & scalability: 0/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Live site opened and visible navigation reviewed. GitHub URL returned 404; repository and deeper behavior require verification.

**GitHub:** [https://github.com/arnavarya001/the_guidance](https://github.com/arnavarya001/the_guidance)  
**Live deployment:** [https://the-guidance.vercel.app/#home](https://the-guidance.vercel.app/#home)

### 19. Snake Game

**Tagline:** A canvas-based snake game controlled by arrow keys.  
**Score / tier / difficulty:** 31/100 · C-Tier · Beginner

**Short description:** A compact JavaScript game loop moves a grid-based snake, places food and stops on wall or self-collision.

**Overview:** The game uses Canvas 2D rendering, keyboard direction changes, food generation, an internal score and a speed increase every five points. Game over uses an alert and resets the state; the score is not shown in the page UI.

**Problem addressed:** A browser game is a focused exercise in movement, collision checks and timed rendering.

**Implemented features:**
- Canvas grid rendering
- Arrow-key movement with reverse-turn prevention
- Random food placement
- Wall and self-collision detection
- Internal score and speed-up
- Start button and alert/reset on game over

**Confirmed stack:** HTML, CSS, JavaScript, Canvas

**Frontend:** HTML, CSS, vanilla JavaScript and Canvas 2D

**Backend:** None

**Database:** None

**Architecture:** Single browser script owns game state and schedules movement with setTimeout.

**Technical review:**
- There is no visible score display, touch input or separate restart treatment after game over; the start button can begin another run.

**Score breakdown:**
- Architecture & code quality: 4/15
- Backend & API: 0/15
- Database & data management: 0/10
- Features & business logic: 5/15
- Authentication & security: 5/10
- Frontend & UI/UX: 5/10
- Problem solving & usefulness: 4/10
- Error handling & validation: 2/5
- Deployment & working functionality: 4/5
- Maintainability & scalability: 2/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree and snake.js inspected. Live game start screen opened; gameplay was not started.

**GitHub:** [https://github.com/arnavarya001/Snake-Game](https://github.com/arnavarya001/Snake-Game)  
**Live deployment:** [https://arnavarya001.github.io/Snake-Game/](https://arnavarya001.github.io/Snake-Game/)

### 20. DreamHomes Housing Website

**Tagline:** A static real-estate landing page with residence cards and contact content.  
**Score / tier / difficulty:** 26/100 · C-Tier · Beginner

**Short description:** An HTML/CSS showcase for property listings; no backend, booking or payment flow is present in the repository.

**Overview:** The page contains a hero search field, residence cards, value section and contact details with static image assets. The associated main.js is empty, so search/filter behavior is not implemented in the inspected source.

**Problem addressed:** A property landing page can present example homes and a contact route in one responsive layout.

**Implemented features:**
- Home, residences, value and contact navigation
- Static property cards and images
- Search input/button visual only
- Contact and call-to-action sections
- Responsive CSS layout

**Confirmed stack:** HTML, CSS, JavaScript (empty entry file), Boxicons

**Frontend:** HTML, CSS, Google Fonts and Boxicons

**Backend:** None

**Database:** None

**Architecture:** Static marketing page; main.js is empty and there are no property APIs or booking routes.

**Technical review:**
- Displayed market/customer/award counts and sample contact details are page copy, not verified service metrics. Search has no implementation in the source.

**Score breakdown:**
- Architecture & code quality: 2/15
- Backend & API: 0/15
- Database & data management: 0/10
- Features & business logic: 3/15
- Authentication & security: 5/10
- Frontend & UI/UX: 5/10
- Problem solving & usefulness: 4/10
- Error handling & validation: 1/5
- Deployment & working functionality: 4/5
- Maintainability & scalability: 2/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, HTML, CSS and empty main.js inspected. Live landing page opened and rendered residence cards.

**GitHub:** [https://github.com/arnavarya001/housing](https://github.com/arnavarya001/housing)  
**Live deployment:** [https://arnavarya001.github.io/housing/](https://arnavarya001.github.io/housing/)

### 21. Calculator with Dark Mode

**Tagline:** A basic arithmetic keypad with a manual theme toggle.  
**Score / tier / difficulty:** 25/100 · C-Tier · Beginner

**Short description:** A small HTML/CSS/JavaScript calculator that appends keypad input, evaluates it on demand and toggles a dark body class.

**Overview:** The script uses eval for the expression and catches syntax errors. Clear works, but percent and memory buttons are appended as text rather than implementing distinct calculator semantics; theme state is not persisted.

**Problem addressed:** A small browser calculator is useful for quick arithmetic and demonstrates event handling.

**Implemented features:**
- Digit and arithmetic button input
- Clear and equals
- Error display for invalid expressions
- Dark/light body-class toggle

**Confirmed stack:** HTML, CSS, JavaScript

**Frontend:** HTML, CSS and vanilla JavaScript

**Backend:** None

**Database:** None

**Architecture:** Static keypad page with client-side expression string and theme class toggle.

**Technical review:**
- eval() is used on the expression string; avoid accepting arbitrary text if the input becomes user-editable. Percent and memory controls do not have separate logic.

**Score breakdown:**
- Architecture & code quality: 3/15
- Backend & API: 0/15
- Database & data management: 0/10
- Features & business logic: 4/15
- Authentication & security: 3/10
- Frontend & UI/UX: 6/10
- Problem solving & usefulness: 3/10
- Error handling & validation: 1/5
- Deployment & working functionality: 3/5
- Maintainability & scalability: 2/5

**Preview:** Source-derived interface preview (not a screenshot). The portfolio also provides an embedded live deployment where the host permits it.

**Verification:** Repository tree, index.html and script.js inspected. Live calculator page opened; arithmetic interaction not submitted.

**GitHub:** [https://github.com/arnavarya001/calculator-with-dark-mode](https://github.com/arnavarya001/calculator-with-dark-mode)  
**Live deployment:** [https://dashing-cobbler-b9b8b2.netlify.app/](https://dashing-cobbler-b9b8b2.netlify.app/)

### 22. RepoRead AI — Auto README Updater

**Tagline:** 1-click Chrome extension popup that scans codebases and auto-commits polished READMEs.  
**Score / tier / difficulty:** 77/100 · A-Tier · Intermediate

**Short description:** A Manifest V3 browser extension built with React 18, Vite 6 and Lucide icons that reads active browser GitHub repositories, extracts tech stacks, generates grounded Markdown documentation, and commits directly to GitHub via the GitHub REST API.

**Architecture & stack:**
- **Frontend / Popup:** React 18, Vite 6, Lucide React, React-Markdown, Remark-GFM
- **Extension API:** Chrome Extension Manifest V3, background service worker, `chrome.tabs`, `chrome.storage.local`
- **Integrations:** GitHub REST API (trees, commits, blobs) with 1-click pre-filled token generation

**Score breakdown:**
- Architecture & code quality: 11/15
- Backend & API: 9/15
- Database & data management: 7/10
- Features & business logic: 12/15
- Authentication & security: 8/10
- Frontend & UI/UX: 8/10
- Problem solving & usefulness: 10/10
- Error handling & validation: 4/5
- Deployment & working functionality: 4/5
- Maintainability & scalability: 4/5

**Preview:** Source-derived interface preview (`public/projects/reporead-ai.svg`).

**Verification:** Manifest V3 manifests, React components, and GitHub API direct commit service verified from source repository. Pre-packaged extension zip inspected.

**GitHub:** [https://github.com/arnavarya001/RepoRead-Ai-extension](https://github.com/arnavarya001/RepoRead-Ai-extension)  
**Distribution ZIP:** [https://github.com/arnavarya001/RepoRead-Ai-extension/raw/main/reporead-ai-extension.zip](https://github.com/arnavarya001/RepoRead-Ai-extension/raw/main/reporead-ai-extension.zip)

## Verification limits

- All 21 supplied live deployment URLs were opened at the page/UI level. Interactive flows that change data, require sign-in, use external APIs, or involve checkout were not run unless the project review explicitly says so. This avoids creating accounts, sending data, or submitting purchases during a source audit.
- The Guidance (project 09) deployment is a Hindi/English BSEB learning hub and its visible navigation was reviewed. Its supplied GitHub repository URL returned 404 during this audit, so its implementation, stack, data, authentication and source quality remain unverified. Its C-tier score is deliberately provisional and conservative.
- YojanaSetu (project 10) is associated with Smart India Hackathon Problem Statement 26092 in the repository materials. No award or win is claimed. The reviewed eligibility rule has conflicting income thresholds across code/docs; resolve this before relying on eligibility outcomes.
- Repository thumbnails and source-derived interface previews are identified as such. A preview is not represented as a captured screenshot. Live frames in the portfolio may be blank when a deployment disallows embedding; the direct demo link remains available.
- The source review identified security or reliability issues in some projects, recorded in their engineering notes. Do not treat the scores as a security certification or production-readiness claim.

## Featured projects

The portfolio highlights the four highest-scoring projects by default:
- **BookMyShow Clone** — 82/100 (A-Tier)
- **Cloudgram** — 77/100 (A-Tier)
- **Lab Equipment Issue & Return Tracker** — 77/100 (A-Tier)
- **Parking Management & Slot Booking** — 71/100 (A-Tier)

All 22 remain available through tier, focus-area, technology and text filters.

## Additional CV projects (pending source verification)

The supplied CV describes three additional projects that are not represented by a separately verifiable repository or demo URL. They appear in the portfolio in their own section and are not included in the 22-project score, tier counts or ranking.

- **YBS Contracts Pvt. Ltd. Portfolio Website:** freelance client website described as built with HTML, CSS and JavaScript, with Netlify or Vercel deployment. No repository or live URL was supplied.
- **Expense Tracker Android App:** Kotlin and Android SDK app described with OCR bill scanning, monthly expense tracking, bill splitting, shared balances and SQLite. No repository, demo or app-store URL was supplied.
- **Student Management System:** Node.js, Express, MongoDB/Mongoose and EJS CRUD app described with MongoDB Atlas. No repository or live URL was supplied.

Two other CV project names correspond to projects already reviewed in the 22: **Zyntra Dating - Full Website** is represented by project 09, **Zyntra**. The CV's shorter feature and technology description does not replace the repository review. **Mobile Store Management System** corresponds to project 11, **Mobile Store Inventory**. Its CV lists MongoDB/Mongoose, while the inspected repository uses PostgreSQL/Netlify Database with Drizzle ORM; the source review is the basis for the portfolio's stack, score and technical findings. Both existing entries remain single entries in the reviewed 21.
