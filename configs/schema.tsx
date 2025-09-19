import { integer, pgTable, varchar, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const sessionChatTable = pgTable("sessionChatTable", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    sessionId: varchar({ length: 255 }).notNull(),
    notes: text().notNull(),
    conversation: jsonb(),
    report: jsonb(),
    createdBy: varchar().notNull(),
    createdOn: timestamp().defaultNow().notNull(),
    selectedCounselor: jsonb('selectedCounselor'),
    user: varchar().notNull().references(() => usersTable.email),
});
