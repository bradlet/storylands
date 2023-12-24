import { Program, web3 } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export function getStoryAddress(program: Program, coordinates: [number, number]): [web3.PublicKey, number] {
	const encoder = new TextEncoder();
	return PublicKey.findProgramAddressSync(
		[encoder.encode("gs"), new Uint8Array(coordinates)],
		program.programId
	);
}
