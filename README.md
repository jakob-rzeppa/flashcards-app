# Flashcards-App

## Requirements

### Cards

- A way to learn the cards on browser and moblie
- Create, update and delete Cards (front and back)
- Learn cards for short term memory (learn every card -> then all that were wrong -> repeat until all right)
- Learn cards for long term memory (prev method, but after getting a card right repeat later (0.5 days -> 1 day -> 2 days -> ...))

### Stacks

- Create, update, delete Stacks (title, description)
- Progress display (long term memory)

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
- cards (id, front, back, stack_id -> stacks.id)
- stacks (id, name, description)
- card_levels (user_id -> auth.user, card_id -> cards.id, level, last_changed)

### Stacks / Stack organisation

- Search for stack name (Spotify clone search)
- Order stacks
