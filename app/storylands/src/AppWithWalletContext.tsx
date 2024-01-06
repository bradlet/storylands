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
import styled from "styled-components";
import App from "./App";
import "@solana/wallet-adapter-react-ui/styles.css";

const StyledWalletBar = styled.div`
	width: 50%;
	height: 5vh;
	display: flex;
	justify-content: space-between;
`;

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AppWithWalletContext: FC = () => {
	const wallets = [new PhantomWalletAdapter()];
	return (
		<ConnectionProvider endpoint={LOCAL_NET}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<AppContainer>
						<StyledWalletBar>
							<WalletDisconnectButton />
							<WalletMultiButton style={{}} />
						</StyledWalletBar>
						<App />
					</AppContainer>
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export default AppWithWalletContext;
