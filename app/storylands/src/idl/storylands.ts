export type Storylands = {
  "version": "0.1.0",
  "name": "storylands",
  "instructions": [
    {
      "name": "saveStory",
      "accounts": [
        {
          "name": "gridSlot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "storyWriter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": {
            "defined": "GridSlot"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "gridSlot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "x",
            "type": "u8"
          },
          {
            "name": "y",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "imgPreset",
            "type": "u8"
          }
        ]
      }
    }
  ]
};

export const IDL: Storylands = {
  "version": "0.1.0",
  "name": "storylands",
  "instructions": [
    {
      "name": "saveStory",
      "accounts": [
        {
          "name": "gridSlot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "storyWriter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "data",
          "type": {
            "defined": "GridSlot"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "gridSlot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "x",
            "type": "u8"
          },
          {
            "name": "y",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          },
          {
            "name": "imgPreset",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
