# Fix PostgreSQL Permission Error

If you're getting `ERROR: permission denied for schema public`, follow these steps:

## Quick Fix

Connect to PostgreSQL and run these commands:

```bash
# Connect to PostgreSQL as postgres user
sudo -u postgres psql

# Or if you're already connected:
psql -U postgres
```

Then run these SQL commands:

```sql
-- Connect to your database
\c saasverified

-- Grant usage on the schema
GRANT USAGE ON SCHEMA public TO your_username;

-- Grant create privileges on the schema
GRANT CREATE ON SCHEMA public TO your_username;

-- Grant all privileges on all tables in the schema
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username;

-- Grant all privileges on all sequences in the schema
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_username;

-- Grant privileges on future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO your_username;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO your_username;

-- Exit
\q
```

**Replace `your_username` with your actual database username** (e.g., `saasverified_user` or `admin`).

## Complete Database Setup (Recommended)

If you're setting up from scratch, use this complete setup:

```bash
# Connect to PostgreSQL
sudo -u postgres psql
```

```sql
-- Create database
CREATE DATABASE saasverified;

-- Create user with password
CREATE USER saasverified_user WITH ENCRYPTED PASSWORD 'your_secure_password_here';

-- Grant database privileges
GRANT ALL PRIVILEGES ON DATABASE saasverified TO saasverified_user;

-- Connect to the database
\c saasverified

-- Grant schema privileges
GRANT USAGE ON SCHEMA public TO saasverified_user;
GRANT CREATE ON SCHEMA public TO saasverified_user;

-- Grant privileges on all existing tables and sequences
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO saasverified_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO saasverified_user;

-- Grant privileges on future tables and sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO saasverified_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO saasverified_user;

-- Make the user the owner (optional, but ensures full control)
ALTER DATABASE saasverified OWNER TO saasverified_user;
ALTER SCHEMA public OWNER TO saasverified_user;

-- Exit
\q
```

## Alternative: Make User Owner (Simplest)

If you want the simplest solution, make your user the owner:

```bash
sudo -u postgres psql
```

```sql
\c saasverified
ALTER DATABASE saasverified OWNER TO your_username;
ALTER SCHEMA public OWNER TO your_username;
\q
```

## Verify Permissions

After fixing, verify the permissions:

```bash
psql -U your_username -d saasverified
```

```sql
-- Check schema permissions
\dn+ public

-- Check your role
SELECT current_user, current_database();

-- Try creating a test table
CREATE TABLE test_permissions (id SERIAL PRIMARY KEY);
DROP TABLE test_permissions;
```

If the test table creation works, you're good to go!

## Then Run Prisma

After fixing permissions, run:

```bash
npm run db:push
```

Or:

```bash
npx prisma db push
```

## Common Issues

### Issue: "role does not exist"
- Make sure you created the user first
- Check the username spelling in your `.env` file

### Issue: "password authentication failed"
- Verify the password in your `.env` file matches the one you set
- Check your `DATABASE_URL` format:
  ```
  postgresql://username:password@localhost:5432/saasverified?schema=public
  ```

### Issue: Still getting permission errors
- Make sure you're connected to the correct database (`\c saasverified`)
- Try making the user the owner (see alternative method above)
- Check PostgreSQL version - if it's 15+, you need explicit schema permissions


