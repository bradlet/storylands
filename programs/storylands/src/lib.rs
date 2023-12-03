use anchor_lang::prelude::*;

declare_id!("EJF8SF4uBXdwVXjHWZumW52kvJjymgjihv9MsVRcyJfP");

#[program]
pub mod storylands {
    use super::*;

	pub fn save_story(ctx: Context<SaveStory>, data: GridSlot) -> Result<()> {
		ctx.accounts.grid_slot.set_inner(data);
		Ok(())
	}
}

// Note: Solana transaction limit: 1232 bytes.
#[account]
#[derive(Default)]
pub struct GridSlot {
	x: u8, // 1
	y: u8, // 1
	title: String, // Max size 100
    body: String, // Max size 300
	img_preset: u8 // 1; presets select a provided image to display in the frontend. To forego a preset, select 0.
}

impl GridSlot {
	const MAX_SIZE: usize = 1 + 1 + 100 + 300 + 1;
}

#[derive(Accounts)]
pub struct SaveStory<'info> {
	#[account(init, payer = story_writer, space = 8 + GridSlot::MAX_SIZE)]
	pub grid_slot: Account<'info, GridSlot>,
	#[account(mut)]
    pub story_writer: Signer<'info>,
	pub system_program: Program<'info, System>
}
