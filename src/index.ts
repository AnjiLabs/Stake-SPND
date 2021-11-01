import Web3 from 'web3';

export class Bamboo {
    element: HTMLDivElement;
    _web3: Web3;

    panda_address = '0x75e3CF3DC6748ff6c92FE77646bE7d2fdFdFA623';
    bnb_contract = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52';
    bnb_network: string = 'https://data-seed-prebsc-1-s1.binance.org:8545';
    win: any;

    constructor () {
        this.element = document.createElement('div');
        this.element.innerHTML = '<h1>Hello World</h1>';

        this.attach();
    }

    get bambooWrapperEle(): HTMLDivElement {
        return document.getElementById('bamboo-stake-wrapper') as HTMLDivElement;
    }

    get totalEle(): HTMLSpanElement {
        return this.bambooWrapperEle.getElementsByClassName('bamboo-stake-total')[0] as HTMLSpanElement;
    }

    get web3(): Web3 {
        if (this._web3) {
            return this._web3;
        }

        this._web3 = this.setupWeb3();

        return this._web3;
    }

    private attach () {
        this.web3.eth.getBalance(this.bnb_contract).then(console.log)
        document.body.appendChild(this.element);
    }

    private setupWeb3(): Web3 {
        const win = window as any;
        let web3: Web3;

        if (win.ethereum) {
            web3 = new win.Web3(win.ethereum);
            try {
                // Request account access if needed
                console.log('win.ethereum');
                win.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.log('looks like user denied access no bamboo :(')
            }
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }

        return web3;
    }
}

new Bamboo();
