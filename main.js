/* Moralis init code */
const serverUrl = "https://erqncsglvhlj.usemoralis.com:2053/server";
const appId = "fOtRalpIawZSov3mH68ZxecXYjYqNhacRxGICSh0";
Moralis.start({ serverUrl, appId });

const CONTRACTADDRESS = "0xb492dAb3Ab7820ae1CB32e91E6213A887E50E0B3";
const ABI = [
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendFundToContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "random",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let winner;

async function enterLottery() {
	const web3 = await Moralis.enableWeb3({});
	// sending 0.1 ETH
	let options = {
		contractAddress: CONTRACTADDRESS,
		functionName: "enter",
		abi: ABI,
		msgValue: Moralis.Units.ETH("0.1")
	}
	const transaction = await Moralis.executeFunction(options);
	console.log(transaction.hash);
	alert("Entering the Lottery, Please wait...");

	const result = await transaction.wait();
	console.log(result);
	if (result != "undefined") {
		alert("Congrats, Entered the lottery");
	}
	document.getElementById("winnerId").innerHTML = "To Be Announced";
}

async function pickWinner() {
	const web3 = await Moralis.enableWeb3({});
	let options = {
		contractAddress: CONTRACTADDRESS,
		functionName: "pickWinner",
		abi: ABI
	}
	try {
		const transaction = await Moralis.executeFunction(options);
		console.log(transaction.hash);
		const result = await transaction.wait();
		console.log(result);
		WinnerAddress();
	}
	catch (err) {
		alert("Only Admins can call this function")
	}

}

async function WinnerAddress() {
	const web3 = await Moralis.enableWeb3({});
	let options = {
		contractAddress: CONTRACTADDRESS,
		functionName: "getWinner",
		abi: ABI
	}
	winner = await Moralis.executeFunction(options);
	console.log(winner);
	updateWinner();
}

function updateWinner() {
	document.getElementById("winnerId").innerHTML = winner.toString();
}


document.getElementById("enter").onclick = enterLottery;
document.getElementById("pickWinner").onclick = pickWinner;