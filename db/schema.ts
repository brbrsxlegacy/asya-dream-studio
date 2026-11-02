import {sqliteTable,text,integer,uniqueIndex,index} from 'drizzle-orm/sqlite-core';
export const dreamRooms=sqliteTable('dream_rooms',{
 code:text('code').primaryKey(),creator:text('creator').notNull(),createdAt:integer('created_at').notNull(),expiresAt:integer('expires_at').notNull()
},t=>[index('dream_rooms_creator_time').on(t.creator,t.createdAt)]);
export const dreamPlayers=sqliteTable('dream_players',{
 id:text('id').primaryKey(),roomCode:text('room_code').notNull(),sessionHash:text('session_hash').notNull(),nickname:text('nickname').notNull(),avatar:text('avatar').notNull(),seenAt:integer('seen_at').notNull(),joinedAt:integer('joined_at').notNull()
},t=>[uniqueIndex('dream_players_room_session').on(t.roomCode,t.sessionHash),index('dream_players_room_seen').on(t.roomCode,t.seenAt)]);
export const dreamMessages=sqliteTable('dream_messages',{
 id:text('id').primaryKey(),roomCode:text('room_code').notNull(),playerId:text('player_id').notNull(),nickname:text('nickname').notNull(),message:text('message').notNull(),createdAt:integer('created_at').notNull()
},t=>[index('dream_messages_room_time').on(t.roomCode,t.createdAt)]);
