const calculateLastDay = (fromDate: Date) => {
	if (!fromDate) return;
	const msDiff = new Date().getTime() - new Date(fromDate).getTime();
	return Math.floor(msDiff / (1000 * 60 * 60 * 24));
};

export { calculateLastDay };
