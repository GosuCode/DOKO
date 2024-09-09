import {pgTable, serial} from "drizzle-orm/pg-core";

export const variable_name = pgTable("table_name", {
  id: serial ("id").primaryKey(),
})
