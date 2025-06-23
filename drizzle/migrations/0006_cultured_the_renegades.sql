CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`totalPrice` integer NOT NULL,
	`items` text NOT NULL,
	`orderStatus` text DEFAULT 'processing' NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
