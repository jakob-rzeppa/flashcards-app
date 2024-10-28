A browser application to learn a. o. vocabulary.
Uses Next.js (frontend) and Supabase (backend).

## Requirements

### Cards

- A way to learn the cards on browser and moblie
- Create, update and delete Cards (front and back)
- Learn cards for short term memory (learn every card -> then all that were wrong -> repeat until all right)
- Learn cards for long term memory (prev method, but after getting a card right repeat later (0.5 days -> 1 day -> 2 days -> ...))

### Stacks

- Create, update, delete Stacks (name, description)
- Progress display (long term memory)

### Folders

- Create, update, delete Folders (name)

### User

- Authentication
- User specific progress

### Main page

- Recent Stacks
- Overall progress

## Design

### Database

Supabase

- supabase user (from supabase)
- cards (id, front, back, stack_id -> stacks.id, user_id -> auth.user)
- stacks (id, name, description, user_id -> auth.user)
- folder (id, name, parent_folder (can be NULL), user_id -> auth.user)
- card_levels (user_id -> auth.user, card_id -> cards.id, level, last_changed)

For more information see ./supabase.ts

### Library / Folder / Stacks

- Folder / Stack structure (collapsable folders and links to stacks)
- A folder can be nested (if no parent at the root of the library)
- Add folders and stacks in library

### Cards

- Learn Cards long and short term memory

#### short term memory

- Learn all cards and repeat the wrong ones until done
- Like Quizlet

#### long term memory

- Like short term memory
- Only the cards where a certain amount of time has passed (based on the level of the card)

## TODO / Ideas

- Update and Delete Folders
- Create Folders in other places than root
- Learn cards on mobile
- General mobile view
