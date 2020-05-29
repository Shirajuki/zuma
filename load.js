assetLoad = 0;
const oImg = new Image();
oImg.src = 'img/zuma.jpg';
oImg.onload = () => {
	assetLoad++;
	checkAssetLoaded();
}
const bgImg = new Image();
bgImg.src = 'level1.jpg';
bgImg.onload = () => {
	assetLoad++;
	checkAssetLoaded();
}
function checkAssetLoaded() {
	if (assetLoad == 2) {
		startGame();
		console.log("[LOAD]: Asset load complete, starting...")
	}
}
