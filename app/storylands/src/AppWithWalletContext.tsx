import {
	ConnectionProvider,
	WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
	WalletDisconnectButton,
	WalletModalProvider,
	WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { LOCAL_NET } from "./main";
import { FC } from "react";
import App from "./App";
import "@solana/wallet-adapter-react-ui/styles.css";

const AppWithWalletContext: FC = () => {
	const wallets = [new PhantomWalletAdapter()];
	return (
		<ConnectionProvider endpoint={LOCAL_NET}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<WalletMultiButton />
					<WalletDisconnectButton />
					<App />
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export default AppWithWalletContext;
