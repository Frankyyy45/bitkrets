import * as mongoDB from "mongodb";
// https://typegoose.github.io/mongodb-memory-server/docs/guides/quick-start-guide
import { MongoMemoryServer } from "mongodb-memory-server";
import type { BlogPost, User } from "../types/bitkrets";

// not so useful info: https://www.mongodb.com/resources/products/compatibilities/using-typescript-with-mongodb-tutorial#adding-schema-validation-with-the-mongodb-nodejs-driver

export const collections: {
  // https://www.mongodb.com/docs/drivers/node/current/typescript/#working-with-the-_id-field
  blogPosts?: mongoDB.Collection<mongoDB.OptionalId<BlogPost>>;
  users?: mongoDB.Collection<mongoDB.OptionalId<User>>;
} = {};

// class that connects to db and load collections
// allows manual close specifically for test runs
// we later switch to use this in our server code as well
// for now it is only for testing
export class DatabaseConnection {
  static isTesting: boolean;
  static connectionString: string;
  // testing database deamon
  static mongod: MongoMemoryServer;
  // production database client
  static client: mongoDB.MongoClient;
  // testing and production database instance
  static db: mongoDB.Db;

  // collections:
  static posts: mongoDB.Collection<mongoDB.OptionalId<BlogPost>>;
  static users: mongoDB.Collection<mongoDB.OptionalId<User>>;

  static async connect(isTesting: boolean, connectionString?: string) {
    // function to connect to the database
    // check if testing (no need to provide connection string, testing deamon provides one)
    this.isTesting = isTesting;

    console.log(
      `Connecting to database with ${
        isTesting ? "testing" : "production"
      } connectionString...`
    );

    if (!isTesting && connectionString) {
      // if not testing, assign provided connections string
      this.connectionString = connectionString;
    } else if (isTesting) {
      // else start testing deamon 
      const mongod = await MongoMemoryServer.create({
        instance: {
          dbName: "bitkrets",
        },
      });
      // assign the testing database deamon to allow manual closing
      this.mongod = mongod;
      // assign the testing deamon provided connection string
      this.connectionString = mongod.getUri();
    }

    // create a mongodb client
    this.client = new mongoDB.MongoClient(this.connectionString);
    // assign the db instance
    this.db = this.client.db("bitkrets");

    // assign db collections
    this.posts = this.db.collection<mongoDB.OptionalId<BlogPost>>("posts");
    this.users = this.db.collection<mongoDB.OptionalId<User>>("users");

    console.log(
      `Successfully connected to ${
        isTesting ? "testing" : "production"
      } database!`
    );
  }

  static async close() {
    // function to manually close the database connection
    console.log("Closing database connection...");
    if (!this.isTesting) {
      // if not testing, close production database
      await this.client.close();
    } else {
      // else, close testing database 
      await this.mongod.stop();
    }
    console.log(
      `Successfully closed ${
        this.isTesting ? "testing" : "production"
      } database connection!`
    );
  }
}

export async function connectToDatabase(isTesting: boolean) {
  // if test use mongo-memory-server
  let connectionString;
  if (isTesting) {
    const mongod = await MongoMemoryServer.create({
      instance: {
        dbName: "bitkrets",
      },
    });
    connectionString = mongod.getUri();
  } else {
    connectionString = "mongodb://localhost:27017"; // process.env.MONGODB_CONNECTION_STRING
  }
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
  await client.connect();
  const db: mongoDB.Db = client.db("bitkrets");
  const blogCollection = db.collection<mongoDB.OptionalId<BlogPost>>("posts");
  const userCollection = db.collection<mongoDB.OptionalId<User>>("users");

  collections.blogPosts = blogCollection;
  collections.users = userCollection;
  console.log(
    "succefully connected to database with mongoDB client and app collections..."
  );
}