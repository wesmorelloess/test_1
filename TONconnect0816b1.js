// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

class TONconnect{
    constructor()
    {
        window["TONconnect"] = this;
        this.isRelease = true;// TODO
        this.tonConnectUI = null;
        this.isPayment = false;
        this.walletAddress = null;
        this.initData();
    }

    initData(){
        let self = this;
        let urlRelease = "https://wesmorelloess.github.io/test_1/index.html"
        let urlQa = "https://wesmorelloess.github.io/test_1/index.html";
        let url = urlQa;
        if(this.isRelease) url  = urlRelease;
        this.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'https://raw.githubusercontent.com/wesmorelloess/test_1/main/tonconnect-manifest.json'
            //buttonRootId: 'ton-connect'
        });
        this.tonConnectUI.uiOptions = {
            twaReturnUrl: url
        };
        this.tonConnectUI.onStatusChange((wallet) => {
            console.info("wallet onStatusChange wallet = " + wallet);
            if(wallet){
                console.info("wallet onStatusChange address = " + wallet.account.address)
                let address = TON_CONNECT_UI.toUserFriendlyAddress(wallet.account.address);
                console.info("wallet onStatusChange2 address = " + address)
                window["NetIns"].connectToWalletSuccess(address);
            }
        });
        this.tonConnectUI.onModalStateChange((WalletsModalState) =>{
            console.info("wallet WalletsModalState = " + WalletsModalState.status)
            // closeModal
            // status: 'opened';
            // status: 'closed';
            if(WalletsModalState.status == 'closed')
            {
            }
        });
        this.tonConnectUI.onSingleWalletModalStateChange((SingleWalletModalState) =>{
            console.info("wallet onSingleWalletModalStateChange = " + SingleWalletModalState.status)
            if(SingleWalletModalState.status == 'closed')
            {
                if(this.isPayment)
                {
                }
            }
        });
    }

    connectToWallet() {
        console.info("wallet connectToWallet");
        if(this.tonConnectUI) {
            let wallet = this.tonConnectUI.wallet;
            if(wallet) {
                if(wallet.account.address)
                {
                    let address = TON_CONNECT_UI.toUserFriendlyAddress(wallet.account.address);
                    this.walletAddress = address;
                }
                console.info("wallet [init] null address = " +this.walletAddress );
                window["NetIns"].connectToWalletSuccess(this.walletAddress );
                return;
            }
            else {
                console.info("wallet [connectToWallet] null");
            }
            this.isPayment = false;
            this.tonConnectUI.openModal();
        }
    }
    disconnectWallet() {
        console.info("wallet disconnectWallet ");
        if(this.tonConnectUI) {
            this.tonConnectUI.disconnect();
        }
    }
}
