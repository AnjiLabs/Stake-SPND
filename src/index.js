const stakeWidgetCss = require('./stake-card.css'),
    widgetHTML = require('./card.html'),
    widgetLocation = document.getElementById('spnd-bmbo-staking'),
    pandaContractABI = require('./assets/safepanda_api.json').result,
    bambooContractABI = require('./assets/bamboo_abi.json'),
    pandaContractAddress = "0x75e3CF3DC6748ff6c92FE77646bE7d2fdFdFA623",
    bambooContractAddress = "0x4510e3ac69574f3dfdb43139e97773b542c386e1"; // Update to be the new Bamboo Contract Address

if (widgetLocation) {
    widgetLocation.innerHTML = widgetHTML.default;
} else {
    console.error('Error finding the #spnd-bmbo-staking widget wrapper');
    return;
}

/**
 * The above needs regenerating Bamboo once finalised and Panda once done example one used for now.
 */

if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
        window.ethereum.enable().then(function () {});
    } catch (e) {}
} else if (window.web3) {
    web3 = new Web3(web3.currentProvider);
} else {
    alert('Please connect your wallet via Web3 with apps such as Trust Wallet or MetaMask.');
}
const BN = web3.utils.BN;

var pandaTokenContract = new web3.eth.Contract(JSON.parse(pandaContractABI), pandaContractAddress);
var bambooContract = new web3.eth.Contract(bambooContractABI, bambooContractAddress);
var pandaTokenBalance;
var pandaTokenDecimals;
var stakedPanda;
var pandaLeftToStake;
var pandaLeftToStakeString;
var bambooTokenBalance;
var bambooTokenDecimals;
var earnedBamboo;
var slashedReward;
var pandaApproval;
var percentOfPool;
var slashedRewardString;
var stakedPandaString;
async function getPandaBalance() {
    pandaTokenBalance = await pandaTokenContract.methods.balanceOf(account).call();
    pandaTokenDecimals = await pandaTokenContract.methods.decimals().call();
    var balanceWeiString = pandaTokenBalance.toString();
    var balanceWeiBN = new BN(balanceWeiString);
    var decimalsBN = new BN(pandaTokenDecimals);
    var divisor = new BN(10).pow(decimalsBN);
    var beforeDecimal = balanceWeiBN.div(divisor);
    var afterDecimal = balanceWeiBN.mod(divisor);
    afterDecimal = afterDecimal.toString();
    var s = "00000000" + afterDecimal;
    afterDecimal = s.substr(s.length - 9);
    document.getElementById("panda_balance").innerText = Number(beforeDecimal).toLocaleString();
}
async function getPandaApproval() {
    pandaApproval = await pandaTokenContract.methods.allowance(account, bambooContractAddress).call();
}
async function getBambooBalance() {
    bambooTokenBalance = await bambooContract.methods.balanceOf(account).call();
    bambooTokenDecimals = await bambooContract.methods.decimals().call();
    var balanceWeiString = bambooTokenBalance.toString();
    var balanceWeiBN = new BN(balanceWeiString);
    var decimalsBN = new BN(bambooTokenDecimals);
    var divisor = new BN(10).pow(decimalsBN);
    var beforeDecimal = balanceWeiBN.div(divisor).toString();
    var afterDecimal = balanceWeiBN.mod(divisor);
    afterDecimal = afterDecimal.toString();
    var s = "00000000" + afterDecimal;
    afterDecimal = s.substr(s.length - 9);
    document.getElementById("bamboo_balance").innerText = Number(beforeDecimal).toLocaleString();
}
async function getMaxLeftToStake() {
    pandaLeftToStake = await bambooContract.methods._maxLeftToStake().call({
        from: account
    });
    pandaTokenDecimals = await pandaTokenContract.methods.decimals().call();
    var balanceWeiString = pandaLeftToStake.toString();
    var balanceWeiBN = new BN(balanceWeiString);
    var decimalsBN = new BN(pandaTokenDecimals);
    var divisor = new BN(10).pow(decimalsBN);
    var beforeDecimal = balanceWeiBN.div(divisor).toString();
    var afterDecimal = balanceWeiBN.mod(divisor);
    afterDecimal = afterDecimal.toString();
    var s = "00000000" + afterDecimal;
    afterDecimal = s.substr(s.length - 9);
    pandaLeftToStakeString = beforeDecimal + "." + afterDecimal;
    document.getElementById("max_left_to_stake").innerText = Number(beforeDecimal).toLocaleString();
}
async function getStakedPanda() {
    stakedPanda = await bambooContract.methods._addressStakedSafePanda(account).call({
        from: account
    });
    pandaTokenDecimals = await pandaTokenContract.methods.decimals().call();
    var balanceWeiString = stakedPanda.toString();
    var balanceWeiBN = new BN(balanceWeiString);
    var decimalsBN = new BN(pandaTokenDecimals);
    var divisor = new BN(10).pow(decimalsBN);
    var beforeDecimal = balanceWeiBN.div(divisor).toString();
    var afterDecimal = balanceWeiBN.mod(divisor);
    afterDecimal = afterDecimal.toString();
    var s = "00000000" + afterDecimal;
    afterDecimal = s.substr(s.length - 9);
    stakedPandaString = beforeDecimal + "." + afterDecimal;
    document.getElementById("stake").innerText = Number(beforeDecimal).toLocaleString();
}
async function getPercentOfPool() {
    percentOfPool = await bambooContract.methods['_percentageOfStakePool(address)'](account).call({
        from: account
    });
    var balanceWeiString = percentOfPool.toString();
    var balanceWeiBN = new BN(balanceWeiString);
    var divisor = new BN(100);
    var beforeDecimal = balanceWeiBN.div(divisor).toString();
    var afterDecimal = balanceWeiBN.mod(divisor);
    afterDecimal = afterDecimal.toString();
    var s = "0" + afterDecimal;
    afterDecimal = s.substr(s.length - 2);
    var percentOfPoolString = beforeDecimal + "." + afterDecimal;
    if (percentOfPoolString == "0.00") {
        percentOfPoolString = "<0.01";
    }
    document.getElementById("percent").innerText = percentOfPoolString;
}
async function getEarnedBamboo() {
    earnedBamboo = await bambooContract.methods._currentRewards(account).call({
        from: account
    });
    bambooTokenDecimals = await bambooContract.methods.decimals().call();
    var balanceWeiString = earnedBamboo.toString();
    var balanceWeiBN = new BN(balanceWeiString);
    var decimalsBN = new BN(bambooTokenDecimals);
    var divisor = new BN(10).pow(decimalsBN);
    var beforeDecimal = balanceWeiBN.div(divisor).toString();
    var afterDecimal = balanceWeiBN.mod(divisor);
    afterDecimal = afterDecimal.toString();
    var s = "00000000" + afterDecimal;
    afterDecimal = s.substr(s.length - 9);
    document.getElementById("earnings").innerText = Number(beforeDecimal).toLocaleString() + "." + afterDecimal;
}
async function getSlashedReward() {
    slashedReward = await bambooContract.methods._calculateReward(account).call({
        from: account
    });
    bambooTokenDecimals = await bambooContract.methods.decimals().call();
    var balanceWeiString = slashedReward.toString();
    var balanceWeiBN = new BN(balanceWeiString);
    var decimalsBN = new BN(bambooTokenDecimals);
    var divisor = new BN(10).pow(decimalsBN);
    var beforeDecimal = balanceWeiBN.div(divisor).toString();
    var afterDecimal = balanceWeiBN.mod(divisor);
    afterDecimal = afterDecimal.toString();
    var s = "00000000" + afterDecimal;
    afterDecimal = s.substr(s.length - 9);
    slashedRewardString = beforeDecimal + "." + afterDecimal;
}

function approvePanda() {
    if (window.confirm(
            "This is a one-time approval transaction, this requires a Gas fee in order to allow you to stake your Panda. Note: No Panda is being staked for this transaction, Staking will be a seperate transaction."
        ) && !window.ethereum.isTrust) {
        pandaTokenContract.methods.approve(bambooContractAddress,
            "1000000000000000000000000000000000000000000000000000").send({
            from: account
        });
    }
    if (window.ethereum.isTrust) {
        pandaTokenContract.methods.approve(bambooContractAddress,
            "1000000000000000000000000000000000000000000000000000").send({
            from: account
        });
    }
}

function stakePanda() {
    var stakeValue = document.getElementById("stakeAmount").value.toString();
    var splitString = stakeValue.split('.');
    var integerPart = splitString[0];
    var decimalPart = splitString[1];
    if (decimalPart == undefined) {
        decimalPart = (0).toString();
    }
    if (decimalPart.length > 9) {
        decimalPart = decimalPart.slice(0, 9);
    }
    while (decimalPart.length < 9) {
        decimalPart = decimalPart + '0';
    }
    var stakeValue = integerPart + decimalPart;
    bambooContract.methods.stakeSafePanda(stakeValue).send({
        from: account
    });
}

function unstakeAll() {
    if (slashWillOccur) {
        if (window.confirm("WARNING, IF YOU UNSTAKE, YOUR REWARDS WILL BE SLAHSED UNLESS YOU HAVE AT LEAST " +
                stakedPandaString + " PANDA IN YOUR WALLET!") && !window.ethereum.isTrust) {
            bambooContract.methods._unstakeAll().send({
                from: account
            });
        }
        if (window.ethereum.isTrust) {
            bambooContract.methods._unstakeAll().send({
                from: account
            });
        }
    } else {
        bambooContract.methods._unstakeAll().send({
            from: account
        });
    }
}

function claimBamboo() {
    bambooContract.methods._claimAllBamboo().send({
        from: account
    });
}
var tooBigValue = false;

function valueGreaterThanMax() {
    var stakeValue = document.getElementById("stakeAmount").value.toString();
    var splitString = stakeValue.split('.');
    var integerPart = splitString[0];
    var decimalPart = splitString[1];
    if (decimalPart == undefined) {
        decimalPart = (0).toString();
    }
    if (decimalPart.length > 9) {
        decimalPart = decimalPart.slice(0, 9);
    }
    while (decimalPart.length < 9) {
        decimalPart = decimalPart + '0';
    }
    var stakeValue = integerPart.toString() + decimalPart.toString();
    if (BigInt(stakeValue.toString()) > BigInt(pandaLeftToStake.toString())) tooBigValue = true;
    else tooBigValue = false;
}
var notEnoughApproval = false;

function checkApproval() {
    var stakeValue = document.getElementById("stakeAmount").value.toString();
    var splitString = stakeValue.split('.');
    var integerPart = splitString[0];
    var decimalPart = splitString[1];
    if (decimalPart == undefined) {
        decimalPart = (0).toString();
    }
    if (decimalPart.length > 9) {
        decimalPart = decimalPart.slice(0, 9);
    }
    while (decimalPart.length < 9) {
        decimalPart = decimalPart + '0';
    }
    var stakeValue = integerPart.toString() + decimalPart.toString();
    if (BigInt(stakeValue.toString()) > BigInt(pandaApproval.toString())) notEnoughApproval = true;
    else notEnoughApproval = false;
}
var slashWillOccur = false;
async function checkSlash() {
    slashWillOccur = await bambooContract.methods._slashWillOccur(account).call({
        from: account
    });
}
var incorrectChain = false;

function checkChain() {
    if (!window.ethereum && !window.ethereum.isTrust) {
        incorrectChain = true;
    } else incorrectChain = false;
}
if (window.ethereum && !window.ethereum.isTrust) {
    var account = window.ethereum.selectedAddress;
    var accountInterval = setInterval(function () {
        account = window.ethereum.selectedAddress;
    }, 100);
    var balanceInterval = setInterval(function () {
        getPandaBalance();
        getBambooBalance();
        getMaxLeftToStake();
        getStakedPanda();
        getEarnedBamboo();
        valueGreaterThanMax();
        getPandaApproval().then(checkApproval());
        getPercentOfPool();
        checkSlash();
        updateSite();
    }, 100);
} else if (window.ethereum && window.ethereum.isTrust) {
    var accountInterval = setInterval(function () {
        account = window.ethereum.address;
    }, 100);
    var balanceInterval = setInterval(function () {
        getPandaBalance();
        getBambooBalance();
        getMaxLeftToStake();
        getStakedPanda();
        getEarnedBamboo();
        valueGreaterThanMax();
        getPandaApproval().then(checkApproval());
        getPercentOfPool();
        checkSlash();
        updateSite();
    }, 100);
} else if (window.web3) {
    var account = web3.eth.accounts[0];
    var accountInterval = setInterval(function () {
        if (web3.eth.accounts[0] !== account) {
            account = web3.eth.accounts[0];
            document.getElementById("address").innerText = account;
        }
    }, 100);
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode != 46 && (charCode < 48 || charCode > 57))) return false;
    return true;
}

function setMaxStake() {
    getPandaApproval().then(checkApproval()).then(updateSite());
    document.getElementById("stakeAmount").value = pandaLeftToStakeString;
}

function updateSite() {
    var approveButton = document.getElementById("approvebutton");
    var approvedText = document.getElementById('approvedText');
    var stakeButton = document.getElementById("stakebutton");
    var warningBanner = document.getElementById("warning");
    if (notEnoughApproval) {
        approveButton.style.display = "block";
        approvedText.style.display = 'none';
        stakeButton.style.visibility = "hidden";
    }
    if (tooBigValue) {
        stakeButton.style.visibility = "hidden";
    }
    if (!tooBigValue && !notEnoughApproval) {
        approveButton.style.display = "none";
        approvedText.style.display = 'block';
        stakeButton.style.visibility = "visible";
    }
    if (slashWillOccur) {
        getSlashedReward();
        if (warningBanner) {
            warningBanner.style.display = "block";
        }
        document.getElementById("avoidamount").innerText = stakedPandaString;
        document.getElementById("slashedreward").innerText = slashedRewardString;
        document.getElementById("claimbutton").style.display = "none";
        document.getElementById("claimbutton").style.visibility = "hidden";
    } else {
        if (warningBanner) {
            warningBanner.style.display = "none";
        }
        document.getElementById("claimbutton").style.display = "block";
        document.getElementById("claimbutton").style.visibility = "visible";
    }
}

// Allow global ugly functions
window.approvePanda = approvePanda;
window.claimBamboo = claimBamboo;
window.isNumberKey = isNumberKey;
window.setMaxStake = setMaxStake;
window.stakePanda = stakePanda;
window.unstakeAll = unstakeAll;
