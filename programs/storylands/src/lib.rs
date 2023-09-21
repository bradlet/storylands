use anchor_lang::prelude::*;

declare_id!("2gYJ5iXaV5R8VisVa5iHcK1aijqZq13BkViCKjGecdyd");

#[program]
pub mod storylands {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[account]
#[derive(Default)]
pub struct GridSlot {
    data: u64,
}

#[derive(Accounts)]
pub struct Initialize {}
