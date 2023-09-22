use anchor_lang::prelude::*;

declare_id!("2gYJ5iXaV5R8VisVa5iHcK1aijqZq13BkViCKjGecdyd");

#[program]
pub mod storylands {
    use super::*;

	pub fn save_story(ctx: Context<SaveStory>, data: GridSlot) -> Result<()> {
		ctx.accounts.grid_slot.set_inner(data);
		Ok(())
	}
}

#[account]
#[derive(Default)]
pub struct GridSlot {
	x: u8, // 1
	y: u8, // 1
	title: String, // Max size 100
	img: [[u8; 32]; 32], // 32x32 8-bit image = 1024
    body: String, // Max size 300
}

impl GridSlot {
	const MAX_SIZE: usize = 1 + 1 + 100 + (32 * 32) + 300;
}

#[derive(Accounts)]
pub struct SaveStory<'info> {
	#[account(init, payer = story_writer, space = 8 + GridSlot::MAX_SIZE)]
	pub grid_slot: Account<'info, GridSlot>,
	#[account(mut)]
    pub story_writer: Signer<'info>,
	pub system_program: Program<'info, System>
}
