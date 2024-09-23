import { relations } from "drizzle-orm"
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"

export const users = pgTable("an_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
 
export const accounts = pgTable(
  "an_account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("an_session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "an_verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const products = pgTable("an_product", {
  id: serial ("id").primaryKey(),
  userId: text("userId")
  .notNull()
  .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  image: text("image").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  avgRating: integer("avgRating").default(0),
  availability: text("availability").default("In Stock"),
  discount: integer("discount").default(0).notNull(),
  categories: text("categories").notNull().default(""),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
})

export const cart = pgTable("an_cart", {
  id: serial("id").primaryKey(),
  userId: text("userId")
  .notNull()
  .references(() => users.id, { onDelete: "cascade" }),
  productId: integer("productId")
  .notNull()
  .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  subtotal: integer("subtotal").notNull(),
})

export const orders = pgTable("an_order", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  totalAmount: integer("totalAmount").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export const orderItems = pgTable("an_order_item", {
  id: serial("id").primaryKey(),
  orderId: integer("orderId")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
});

export const reviews = pgTable("an_review", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  userId: text("user_id").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
}, (table) => ({
  uniqueUserProductReview: uniqueIndex('unique_user_product_review').on(table.userId, table.productId),
}));

export const cartRelations = relations(cart, ({ one }) => ({
  products: one(products, {
    fields: [cart.productId],
    references: [products.id],
  }),
}));


export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  products: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
  users: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export type ANProduct = typeof products.$inferSelect;
export type ANCart = typeof cart.$inferSelect;
export type ANCartWithProduct = typeof cart.$inferSelect & {
  products: ANProduct;
};
export type ANOrders = typeof orders.$inferSelect;
export type ANOrderItems = typeof orderItems.$inferSelect;
export type ANOrdersWithOrderItems = typeof orders.$inferSelect & {
  orderItems: ANOrderItems[];
};
export type ANReviews = typeof reviews.$inferSelect;
export type ANReviewsWithProduct = typeof reviews.$inferSelect & {
  products: ANProduct;
};