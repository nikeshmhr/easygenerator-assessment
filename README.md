## Setup and run

### Approach 1 (Docker)

- Create `.env` files for both `ui` and `backend` and use contents from respective `.env.example` files.
- Run command `docker compose up -d` and wait for couple minutes.
- UI should be running in port 3000 and backend in 8080

### Approach 2

- Setup a mongodb in either host machine or using docker itself
- Create `.env` files for both `ui` and `backend` and use contents from respective `.env.example` files.
- Run both ui and backend:
    - UI
        - `cd ui`
        - `yarn && yarn start`
    - Backend
        - `cd backend`
        - `yarn && yarn start:dev`