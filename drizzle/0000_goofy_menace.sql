CREATE TABLE `dream_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`room_code` text NOT NULL,
	`player_id` text NOT NULL,
	`nickname` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `dream_messages_room_time` ON `dream_messages` (`room_code`,`created_at`);--> statement-breakpoint
CREATE TABLE `dream_players` (
	`id` text PRIMARY KEY NOT NULL,
	`room_code` text NOT NULL,
	`session_hash` text NOT NULL,
	`nickname` text NOT NULL,
	`avatar` text NOT NULL,
	`seen_at` integer NOT NULL,
	`joined_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dream_players_room_session` ON `dream_players` (`room_code`,`session_hash`);--> statement-breakpoint
CREATE INDEX `dream_players_room_seen` ON `dream_players` (`room_code`,`seen_at`);--> statement-breakpoint
CREATE TABLE `dream_rooms` (
	`code` text PRIMARY KEY NOT NULL,
	`creator` text NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `dream_rooms_creator_time` ON `dream_rooms` (`creator`,`created_at`);