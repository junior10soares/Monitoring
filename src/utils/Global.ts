export const isEmpty = function (str: string) {
	if (
		str === null ||
		str === "" ||
		str === undefined ||
		`${str}`.trim() === ""
	) {
		return true;
	}
	return false;
};
