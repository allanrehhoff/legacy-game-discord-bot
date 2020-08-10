/**
* Capitalize first letter of a string.
*/
String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
* Get's a random entry from an array
*/
Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
}