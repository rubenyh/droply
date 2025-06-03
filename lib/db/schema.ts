import { pgTable, text, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files = pgTable("files",{
    id: uuid("id").defaultRandom().primaryKey(),

    //basic file/folder formation
    name: text("name").notNull(),
    path: text("path").notNull(), //document/project/resum
    size: integer("size").notNull(),
    type: text("type").notNull(), // "folder"

    //stroage information
    fileUrl: text("file_url").notNull(), //url access file
    thumbnailUrl : text("thumbnail_url"),

    //Owner
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"), //Parent folder id (null for root items)

    // file/foler flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
})

// each file/folder can have one parent folder
// each folder can have many child files/folder

export const filesRelation = relations(files, ({one, many}) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),

    //relatinship to child file/folder
    children: many(files)
}))

// type definitions
export const File = typeof files.$inferSelect;
export const NewFile = typeof files.$inferSelect;