import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Storylands } from "../target/types/storylands";
import { expect } from "chai";

describe("storylands", () => {
	// Configure the client to use the local cluster.
	anchor.setProvider(anchor.AnchorProvider.env());

	const program = anchor.workspace.Storylands as Program<Storylands>;

	it("can save a story", async () => {
		const gridSlotKeypair = anchor.web3.Keypair.generate();
		console.log(`Test data saved at: ${gridSlotKeypair.publicKey}`)
		const storyWriter = (program.provider as anchor.AnchorProvider).wallet;

		await program.methods
			.saveStory({
				x: 0,
				y: 1,
				title: "Hello World",
				body: "Lorem ipsum",
				imgPreset: 1,
			})
			.accounts({
				gridSlot: gridSlotKeypair.publicKey,
				storyWriter: storyWriter.publicKey,
			})
			.signers([gridSlotKeypair])
			.rpc();

		let story = await program.account.gridSlot.fetch(
			gridSlotKeypair.publicKey
		);
		expect(story.x).to.equal(0);
		expect(story.y).to.equal(1);
		expect(story.title).to.equal("Hello World");
		expect(story.imgPreset).to.equal(1);
		expect(story.body).to.equal("Lorem ipsum");
	});
});
