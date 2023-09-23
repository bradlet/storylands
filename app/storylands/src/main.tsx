import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Storylands } from "../../../target/types/storylands";

anchor.setProvider(anchor.AnchorProvider.env());

export const program = anchor.workspace.Storylands as Program<Storylands>;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
