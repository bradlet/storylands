import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Storylands } from "../target/types/storylands";
import { expect } from "chai";
import { PublicKey } from "@solana/web3.js";

describe("storylands", () => {
	// Configure the client to use the local cluster.
	anchor.setProvider(anchor.AnchorProvider.env());

	const program = anchor.workspace.Storylands as Program<Storylands>;

	it("can save a story", async () => {
		const target_x = 0;
		const target_y = 1;

		const [gridSlotPDA, gridSlotBump] = PublicKey.findProgramAddressSync(
			[anchor.utils.bytes.utf8.encode("gs"), new Uint8Array([target_x, target_y])],
			program.programId
		);
		const storyWriter = (program.provider as anchor.AnchorProvider).wallet;

		await program.methods
			.saveStory({
				bump: gridSlotBump,
				x: target_x,
				y: target_y,
				title: "Hello World",
				body: "Lorem ipsum",
				imgPreset: 1,
			})
			.accounts({
				gridSlot: gridSlotPDA,
				storyWriter: storyWriter.publicKey,
			})
			.rpc();

		let story = await program.account.gridSlot.fetch(gridSlotPDA);
		expect(story.bump).to.equal(gridSlotBump);
		expect(story.x).to.equal(0);
		expect(story.y).to.equal(1);
		expect(story.title).to.equal("Hello World");
		expect(story.imgPreset).to.equal(1);
		expect(story.body).to.equal("Lorem ipsum");

		// Confirm that we can't find some other slot yet
		// const [uninitializedSlotPDA, _] = PublicKey.findProgramAddressSync(
		// 	[anchor.utils.bytes.utf8.encode("grid_slot[1,1]")],
		// 	program.programId
		// )
		// let uninitializedSlot = await program.account.gridSlot.fetch(gridSlotPDA);
		// expect(uninitializedSlot).to.throw
	});
});
