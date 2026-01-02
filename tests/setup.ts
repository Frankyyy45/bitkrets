import { afterAll, beforeAll } from "vitest";
import { DatabaseConnection } from "../src/backend/db";

// function that runs before all tests
// we use the same database connection for all our test suites 
beforeAll(async () => {
  try {
    // connect to database in testing mode
    await DatabaseConnection.connect(true);
  } catch (error) {
    console.log("Failed to connect to test database: ", error);
  }
});

// function that runs after all tests
afterAll(async () => {
  try {
    // close database
    await DatabaseConnection.close();
  } catch (error) {
    console.log("Failed to close test database connection: ", error);
  }
});
