import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const station = pgTable('station', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  streamingUrl: text('streamingUrl'),
  imageSrc: text('imageSrc'),
  genreId: integer("genreId").references(() => genre.id),
})

export const genre = pgTable('genre', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
})