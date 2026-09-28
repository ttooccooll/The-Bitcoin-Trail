let toggleState = 0;
let usdPrice = null;
let blockHeight = null;
let satFee = null;

async function fetchPrice() {
	try {
		const response = await fetch('https://mempool.space/api/v1/prices');
		const data = await response.json();
		usdPrice = Number(data.USD.toFixed()).toLocaleString();
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchBlock() {
	try {
		const response = await fetch('https://mempool.space/api/blocks/tip/height');
		const data = await response.text();
		blockHeight = parseInt(data).toLocaleString();
	} catch (error) {
		console.error('Error fetching the block height:', error);
	}
}

async function fetchFee() {
	try {
		const response = await fetch('https://mempool.space/api/v1/fees/recommended');
		const data = await response.json();
		satFee = data.halfHourFee.toFixed();
	} catch (error) {
		console.error('Error fetching the fee:', error);
	}
}

async function togglePrice() {
	const pending = [];
	if (!usdPrice) pending.push(fetchPrice());
	if (!blockHeight) pending.push(fetchBlock());
	if (!satFee) pending.push(fetchFee());
	await Promise.all(pending);

	const button = document.getElementById('ticker');
	switch (toggleState) {
		case 0:
			button.textContent = `Block ${blockHeight || '?'}`;
			break;
		case 1:
			button.textContent = `${satFee || '?'} sat/vB`;
			break;
		case 2:
			button.textContent = `$${usdPrice || '?'}`;
			break;
		case 3:
			button.textContent = '1sat=1sat';
			break;
	}
	toggleState = (toggleState + 1) % 4;
}
