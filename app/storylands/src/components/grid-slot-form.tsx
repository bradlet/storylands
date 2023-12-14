import {
	AnchorProvider,
	Idl,
	Program,
	Wallet,
	setProvider,
	web3,
} from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Dispatch, SetStateAction, useState } from "react";
import idl from "../../../../target/idl/storylands.json";
import { PROGRAM_ID } from "../App";
import { PublicKey } from "@solana/web3.js";

export type GridSlotFormProps = {
	x: number;
	y: number;
	setSlotAccountId: Dispatch<SetStateAction<PublicKey | null>>;
};

export function GridSlotForm({ x, y, setSlotAccountId }: GridSlotFormProps) {
	const [title, setTitle] = useState("");
	const [imgPreset, setImgPreset] = useState(0);
	const [body, setBody] = useState("");

	const { connection } = useConnection();
	const wallet = useAnchorWallet();
	const provider = new AnchorProvider(connection, wallet as Wallet, {});
	setProvider(provider);

	function safeSetImgPreset(value: string) {
		const parsed = parseInt(value) || 0;
		setImgPreset(parsed);
	}

	async function saveStory() {
		try {
			if (wallet === undefined) {
				throw Error("No wallet connection detected.");
			}
			const storySlotKeypair = web3.Keypair.generate();
			const program = new Program(idl as Idl, PROGRAM_ID);
			console.log(`Wallet detected: ${wallet?.publicKey}`);

			const validImgPreset =
				typeof imgPreset === "number" &&
				imgPreset >= 0 &&
				imgPreset < 256;
			console.log(
				validImgPreset ? "Valid" : "Invalid",
				`Image preset: ${imgPreset} `
			);

			const sig = await program.methods
				.saveStory({
					x: x,
					y: y,
					title: title,
					body: body,
					imgPreset: validImgPreset ? imgPreset : 0,
				})
				.accounts({
					gridSlot: storySlotKeypair.publicKey,
					storyWriter: wallet?.publicKey,
				})
				.signers([storySlotKeypair])
				.rpc();
			setSlotAccountId(storySlotKeypair.publicKey);
			console.log(`https://explorer.solana.com/tx/${sig}?cluster=local`);
			console.log(`Saved new story at ${storySlotKeypair.publicKey}`);
		} catch (e: unknown) {
			console.error("Failed to save story: ", e);
		}
	}

	return (
		<>
			<div>
				({x}, {y})
			</div>
			<div>
				<h2>Title</h2>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<h2>Select An Image</h2>
				<input
					type="number"
					value={imgPreset}
					onChange={(e) => safeSetImgPreset(e.target.value)}
				/>
				<h2>Story</h2>
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
			</div>
			<button onClick={saveStory}>Submit</button>
		</>
	);
}
