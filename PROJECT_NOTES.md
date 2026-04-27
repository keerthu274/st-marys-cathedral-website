# Project Notes

This project is for St Mary's Cathedral website. I built a public website and an admin dashboard so the cathedral can manage website content more easily.

## Public Website

- The public website shows cathedral information, events, news, newsletters, parish council members, and contact details.
- Events come from the backend. Published future events show as upcoming events.
- Published old events show in the Past Events section, so they do not disappear completely.
- The contact form saves messages for the admin dashboard.
- The phone number is required in the contact form because staff may need to reply quickly.

## Admin Dashboard

- The main admin can manage events, news, newsletters, registrations, contact messages, groups, admin accounts, and parish council members.
- Group admins can manage their own group events, group members, and contact messages linked to their group.
- A group admin can add a contact message sender into their group, but the system blocks the same person from being added twice to the same group.
- Group admins can update group details for members, but only the main admin can edit personal details.
- Alerts and recent activity are shown from the top navigation bar.
- Alerts and recent activity can be cleared one by one or all together. Old items are hidden after one week.

## Content Rules

- Published events and news are visible on the public website.
- Draft events stay inside the admin dashboard until they are ready.
- Event images and news images are uploaded to the backend and displayed through protected or public image routes.
- Newsletter uploads are stored as PDF files.
- Parish council sort order starts at 1. The person with sort order 1 appears first on the public website.
- Child records are highlighted when the child is 18 or close to 18, so the admin can review the family record.

## Validation

- I use frontend validation to guide the admin while filling in forms.
- I also use backend validation so the database is protected even if the frontend is bypassed.
- Admin account passwords use the same strong password rules as user sign up.
- Required fields such as names, emails, dates, and phone numbers are checked before saving.

## How The Code Is Split

- React handles the public pages and the admin dashboard screens.
- Laravel handles routes, validation, database updates, file uploads, and API responses.
- Laravel resources format backend data before React uses it.
- CSS files control the dashboard layout, cards, forms, filters, and responsive styling.

## What I Would Explain

- I connected the admin dashboard to backend data instead of using static content.
- I added permissions so the main admin and group admins have different access.
- I added filters and search tools to make the dashboard easier to use.
- I added warning dialogs for important actions like delete, logout, and removing children.
- I kept the design consistent across tabs so the dashboard feels like one system.
