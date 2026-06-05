# Survey Manager

Simple service created to calculate the Net Promoter Score by sending, via Email, a survey to the customers.

## Business Logic

The core features include:
- **Users**: Creating and managing users (`/users`).
- **Surveys**: Creating and listing surveys (`/surveys`).
- **Email Delivery**: Sending surveys via email to specific users (`/send-mail`).
- **Answers Collection**: Collecting user answers for the surveys from the links sent by email (`/answers/:value`).
- **NPS Calculation**: Computing the Net Promoter Score for a specific survey based on the collected answers (`/nps/:survey_id`).

## Tech Stack

- Node.js & TypeScript
- Express
- TypeORM (with SQLite)
- Nodemailer (for sending emails)
- Jest (for testing)

## How to Deploy Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd survey-manager
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run Database Migrations**:
   This will initialize the local SQLite database.
   ```bash
   yarn typeorm migration:run
   ```

4. **Start the Development Server**:
   ```bash
   yarn dev
   ```

5. **Run Tests**:
   ```bash
   yarn test
   ```
