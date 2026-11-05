# Arnav Arya — Portfolio

A responsive single-page portfolio built with React, Tailwind CSS, Framer Motion and Lucide icons.

The Projects section reviews and ranks 22 GitHub projects. It includes score and tier badges, featured work, search, tier/focus/technology filters, score sorting and project detail modals with live demo links. Three additional projects described in the supplied CV appear in a separate section with source review pending. The complete source-based review is in `PROJECT_AUDIT.md` and is also served with the built site.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Personalize before publishing

- Contact email is configured in `src/App.jsx` (`CONTACT_EMAIL = 'arnavarya2004@gmail.com'`). The contact form delivers messages directly to Gmail via FormSubmit with automatic mail client fallback.
- Check `PROJECT_AUDIT.md` before updating project descriptions or scores. The Guidance repository is currently inaccessible at its supplied GitHub URL; its entry is marked provisional.
- Project cards use source-derived interface previews, with the repository-provided Helpdesk artwork clearly labeled. Detail views embed the live deployment when its host permits it.
- Update the editable milestone placeholders in `src/App.jsx` with verified achievements, certifications, competitions or workshops.
- Replace the concept interface previews with real screenshots when you have them.
- `public/resume.pdf` is the CV supplied for this portfolio. Keep the file updated when the CV changes.

The design uses CSS and Framer Motion for its interactions. It respects reduced-motion preferences and avoids invented project URLs, experience, statistics and contact details. Team contributions and unverified deployment behavior are called out in the audit rather than presented as independent or confirmed work.
