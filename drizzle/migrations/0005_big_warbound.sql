CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	`available` integer NOT NULL,
	`discount` integer NOT NULL,
	`category` text NOT NULL,
	`thumbnail` text NOT NULL,
	`isArchived` text,
	`images` text,
	`sizes` text,
	`colors` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
