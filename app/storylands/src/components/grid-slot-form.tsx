import {
	AnchorProvider,
	Idl,
	Program,
	Wallet,
	setProvider,
} from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Dispatch, SetStateAction, useState } from "react";
import idl from "../../../../target/idl/storylands.json";
import { PROGRAM_ID } from "../App";
import { getStoryAddress } from "../util/grid-util";

export type GridSlotFormProps = {
	x: number;
	y: number;
	setEditing: Dispatch<SetStateAction<boolean>>;
};

export function GridSlotForm({ x, y, setEditing }: GridSlotFormProps) {
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
			console.log(`Wallet detected: ${wallet?.publicKey}`);

			const program = new Program(idl as Idl, PROGRAM_ID);
			const [gridSlotPda, gridSlotBump] = getStoryAddress(program, [
				x,
				y,
			]);

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
					bump: gridSlotBump,
					x: x,
					y: y,
					title: title,
					body: body,
					imgPreset: validImgPreset ? imgPreset : 0,
				})
				.accounts({
					gridSlot: gridSlotPda,
					storyWriter: wallet?.publicKey,
				})
				.rpc();
			// Note: If I want a delat on setting it for whatever reason...
			// setTimeout(() => {
			// 		coordinateSetter([x, y]);
			// }, 700);
			console.log(`https://explorer.solana.com/tx/${sig}?cluster=local`);
			console.log(`Saved new story at ${gridSlotPda}`);
			setEditing(false);
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
