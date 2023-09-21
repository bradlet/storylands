# storylands

Monorepo for all frontend and on-chain code for the storylands ecosystem.

## What is storylands?

Storylands is a dynamic text-based community world-building game. Creators
can claim ownership of a given slot in the grid and control the fate of
that story. The stories represent a region of some kind. This is a loose
restriction, as the goal of this game is for the community members who
interact with the storylands universe to decide the layout of the story.

## Blockchain why?

This game uses the Solana blockchain to hold onto the state of stories,
as well as to manage story ownership. A blockchain is used pragmatically
to handle transactions between users; exchanging ownership of slots on
the grid. It is also used to give the stories long life; the frontend is
a convenience and all interactions can be achieved without it. When you
own a slot on the grid, you know that your story will exist, be accessible,
and only be configurable by you, for the life of the Solana blockchain.

# Development
To run the frontend locally in a development environment, run the anchor
command:
```shell
anchor run dev-app
```